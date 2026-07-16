import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { showcaseProducts } from '../../data/showcaseData';
import { showcaseModelById } from './ShowcaseModels';

function ModelStage({ productId, autoRotate, draggingRef, rotationRef }) {
  const groupRef = useRef();
  const Model = showcaseModelById[productId];

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    if (autoRotate && !draggingRef.current) {
      rotationRef.current.y += delta * 0.28;
      rotationRef.current.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.06;
    }
    g.rotation.y = rotationRef.current.y;
    g.rotation.x = rotationRef.current.x;
  });

  if (!Model) return null;

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-5, 3, 2]} intensity={0.4} />
      <directionalLight position={[0, -4, 0]} intensity={0.3} />
      <group ref={groupRef}>
        <Model />
      </group>
      {/* Soft-cast drop shadow plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.08} />
      </mesh>
    </>
  );
}

function ProductModal({ product, onClose }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const draggingRef = useRef(false);
  const rotationRef = useRef({ x: 0, y: 0 });
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = useCallback((e) => {
    draggingRef.current = true;
    setAutoRotate(false);
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;
    rotationRef.current.y += dx * 0.007;
    rotationRef.current.x = Math.max(
      -Math.PI / 4,
      Math.min(Math.PI / 4, rotationRef.current.x + dy * 0.007)
    );
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const discount = product.marketPrice - product.nagiPrice;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-[#1d1d1f]/40 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-[32px] w-full max-w-5xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[600px] shadow-2xl border border-white/40 relative"
      >
        {/* Interactive 3D viewport */}
        <div className="relative flex-1 bg-[#f5f5f7] h-1/2 md:h-full border-b md:border-b-0 md:border-r border-gray-100">
          <div
            className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <Canvas
              shadows
              camera={{ position: [0, 1.8, 4.5], fov: 40 }}
              dpr={[1, 2]}
              style={{ background: '#f5f5f7' }}
            >
              <ModelStage
                productId={product.id}
                autoRotate={autoRotate}
                draggingRef={draggingRef}
                rotationRef={rotationRef}
              />
            </Canvas>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center pointer-events-none">
            <span className="text-[11px] font-medium tracking-wide bg-white/90 border border-gray-200/50 px-4 py-2 rounded-full text-[#86868b] backdrop-blur-md shadow-sm">
              🖱️ Drag to rotate 360°
            </span>
            <button
              onClick={() => setAutoRotate((r) => !r)}
              className="pointer-events-auto bg-[#1d1d1f] hover:bg-black text-white px-4 py-2 rounded-full text-[11px] font-semibold tracking-wide transition shadow-sm"
            >
              {autoRotate ? 'Pause Spin' : 'Auto Rotate'}
            </button>
          </div>
        </div>

        {/* Product details */}
        <div className="w-full md:w-[380px] p-8 md:p-10 flex flex-col justify-between h-1/2 md:h-full bg-white overflow-y-auto">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#86868b]">
                {product.category}
              </span>
              <button
                onClick={onClose}
                className="md:hidden text-[#86868b] hover:text-[#1d1d1f] font-bold text-lg"
              >
                ×
              </button>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] mt-2 leading-tight">
              {product.name}
            </h2>
            <p className="text-sm font-medium text-[#0066cc] mt-2">{product.tagline}</p>
            <p className="text-xs text-[#86868b] font-normal leading-relaxed mt-5 border-t border-gray-100 pt-5">
              {product.specs}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6 mt-6">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <p className="text-xs text-[#86868b] line-through">
                  Market: Rs. {product.marketPrice.toLocaleString()}
                </p>
                <p className="text-3xl font-black text-[#1d1d1f] tracking-tight">
                  Rs. {product.nagiPrice.toLocaleString()}
                </p>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                SAVE RS. {discount.toLocaleString()}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3.5 bg-[#f5f5f7] hover:bg-gray-200 text-[#1d1d1f] rounded-full font-semibold text-xs tracking-wider transition"
              >
                Close Gallery
              </button>
              <button className="flex-1 py-3.5 bg-[#0066cc] hover:bg-blue-700 text-white rounded-full font-semibold text-xs tracking-wider transition shadow-lg shadow-blue-500/10">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState(null);

  return (
    <div className="w-full h-full overflow-y-auto bg-[#f5f5f7] text-[#1d1d1f] rounded-3xl">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#86868b]">
            Inventory Matrix
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mt-3">
            Power, <span className="text-[#86868b] font-light">sculpted.</span>
          </h1>
          <p className="mt-4 text-sm md:text-base text-[#86868b] max-w-xl leading-relaxed font-light">
            We bypass local distributor layers. Select an item below to inspect its detailed
            specifications and rotate its dynamic 3D structural model in full 360°.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => setActiveProduct(p)}
              className="group relative bg-white rounded-[28px] border border-gray-200/60 p-7 flex flex-col justify-between transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl hover:shadow-gray-200/80 cursor-pointer"
            >
              <div>
                <div
                  className={`relative w-full h-44 rounded-[20px] overflow-hidden bg-gradient-to-b ${p.colorTheme} flex items-center justify-center p-6 border border-gray-100 mb-6`}
                >
                  {p.svgPreview}
                  <span className="absolute bottom-3 right-3 text-[10px] font-bold text-[#86868b] bg-white/90 border border-gray-100 px-3 py-1 rounded-full shadow-sm">
                    View Interactive 3D
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block mb-1">
                  {p.category}
                </span>
                <h3 className="text-xl font-bold tracking-tight leading-snug">{p.name}</h3>
                <p className="text-xs text-[#86868b] font-medium mt-1 leading-snug">{p.tagline}</p>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-5">
                <div className="flex items-baseline justify-between mb-5">
                  <div>
                    <p className="text-[10px] text-[#86868b] line-through">
                      Market: Rs. {p.marketPrice.toLocaleString()}
                    </p>
                    <p className="text-xl font-extrabold tracking-tight">
                      Rs. {p.nagiPrice.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                    Save Rs. {(p.marketPrice - p.nagiPrice).toLocaleString()}
                  </span>
                </div>

                <div className="w-full py-3 bg-[#1d1d1f] group-hover:bg-[#0066cc] text-white text-center rounded-full font-semibold text-xs tracking-wide transition-all duration-300">
                  View details in 3D
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProduct && (
          <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
