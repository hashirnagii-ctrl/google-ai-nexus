import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, PerspectiveCamera, Environment } from '@react-three/drei';
import { ShoppingCart, ShoppingBag, X, Trash2, Shield, Zap, Cpu, Award } from 'lucide-react';

// ==========================================
// 1. PROCEDURAL 3D HARDWARE COMPONENTS
// ==========================================

// Custom Rotating Cooling Fan component
function CoolingFan({ position }) {
  const fanRef = useRef();

  useFrame((state, delta) => {
    if (fanRef.current) {
      fanRef.current.rotation.z -= delta * 8;
    }
  });

  return (
    <group position={position}>
      {/* Central Fan Hub */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.15, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Dynamic Blades */}
      <group ref={fanRef}>
        {[...Array(9)].map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4.5]}>
            <boxGeometry args={[0.08, 0.6, 0.02]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Procedural 3D GPU Component (No external GLB model needed!)
function ProceduralGPU() {
  const gpuRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    gpuRef.current.rotation.y = Math.sin(t * 0.2) * 0.2;
    gpuRef.current.rotation.x = Math.cos(t * 0.15) * 0.1;
  });

  return (
    <group ref={gpuRef}>
      {/* Base PCB Board */}
      <mesh position={[0, 0, -0.15]}>
        <boxGeometry args={[3.4, 1.8, 0.1]} />
        <meshStandardMaterial color="#064e3b" roughness={0.9} />
      </mesh>

      {/* Gold-plated PCIe Connector Pins */}
      <mesh position={[0, -0.95, -0.05]}>
        <boxGeometry args={[2.8, 0.1, 0.05]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Main Aluminum Heatsink Base */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[3.2, 1.6, 0.3]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Heatsink Cooling Fins (Procedural Ribbing) */}
      {[...Array(24)].map((_, i) => (
        <mesh key={i} position={[-1.45 + i * 0.125, 0, 0.3]}>
          <boxGeometry args={[0.03, 1.4, 0.1]} />
          <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}

      {/* Outer Protective GPU Shroud */}
      <mesh position={[0, 0, 0.35]}>
        <boxGeometry args={[3.3, 1.7, 0.05]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      {/* Rotating Dual Fans */}
      <CoolingFan position={[-0.8, 0, 0.38]} />
      <CoolingFan position={[0.8, 0, 0.38]} />

      {/* Copper Heatpipes */}
      <mesh position={[0, 0.5, 0.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 2.8, 16]} />
        <meshStandardMaterial color="#ea580c" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.5, 0.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 2.8, 16]} />
        <meshStandardMaterial color="#ea580c" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Glowing RGB Cyberpunk Light Strip */}
      <mesh position={[0, 0.75, 0.38]}>
        <boxGeometry args={[2.0, 0.05, 0.02]} />
        <meshBasicMaterial color="#3b82f6" toneMapped={false} />
      </mesh>
    </group>
  );
}

// Procedural CPU/TPU Component
function ProceduralCPU() {
  const cpuRef = useRef();

  useFrame((state) => {
    cpuRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <group ref={cpuRef} rotation={[0.5, 0.5, 0]}>
      {/* CPU Substrate (PCB Plate) */}
      <mesh>
        <boxGeometry args={[2, 2, 0.1]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      {/* Metallic Heatspreader (IHS) */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[1.5, 1.5, 0.15]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Golden Engravings & Outer Core Accents */}
      <mesh position={[0, 0, 0.18]}>
        <boxGeometry args={[1.0, 1.0, 0.02]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Procedural High-End display Component
function ProceduralDisplay() {
  const displayRef = useRef();

  useFrame((state) => {
    displayRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
  });

  return (
    <group ref={displayRef}>
      {/* Screen Frame */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3.2, 1.8, 0.1]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
      {/* Screen Display Face */}
      <mesh position={[0, 0.5, 0.06]}>
        <planeGeometry args={[3.0, 1.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Stand Bracket */}
      <mesh position={[0, -0.5, -0.2]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.2, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Base Plate */}
      <mesh position={[0, -1.1, -0.2]}>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

function ProductModel({ type }) {
  return (
    <>
      {type === 'gpu' && <ProceduralGPU />}
      {type === 'cpu' && <ProceduralCPU />}
      {type === 'display' && <ProceduralDisplay />}
    </>
  );
}

// ==========================================
// 2. MAIN E-COMMERCE SHOPPING APPLICATION
// ==========================================

const PRODUCTS_DATA = [
  {
    id: 'gpu-x1',
    name: 'Nexus AI GPU Core X1',
    tagline: 'Unmatched Power for Edge Inference & Neural Training',
    price: 1499.0,
    rating: '4.9 (142 reviews)',
    specs: ['24GB GDDR7 Dedicated Memory', 'Twin Turbo Active Fluid Cooling', 'Procedural Tensor Accelerator Cores'],
    details: 'Engage extreme workloads with the Nexus X1. Outfitted with deep metallic cooling arrays, dynamic high-velocity cooling fans, and dedicated hardware-level acceleration pathways, it redefines the benchmark for desktop workstation graphics processing.',
    type: 'gpu'
  },
  {
    id: 'tpu-tensor',
    name: 'Nexus Tensor Processing Unit (TPU)',
    tagline: 'Dedicated AI Training and Real-Time Matrix Engines',
    price: 899.0,
    rating: '4.8 (89 reviews)',
    specs: ['128 Tensor Cores', 'Ultra-low latency Matrix Math pipelines', 'Brushed aluminum custom Integrated Heat Spreader'],
    details: 'Specifically designed for deep learning operations. The IHS maximizes thermal dynamics ensuring zero-throttling matrix calculations under continuous computational heavy stress.',
    type: 'cpu'
  },
  {
    id: 'display-pro',
    name: 'Nexus Ultrawide Studio Display',
    tagline: 'Color-Accurate Spatial Interactive Panel',
    price: 1299.0,
    rating: '4.7 (104 reviews)',
    specs: ['32-inch Dual UHD Resolution', '99.9% DCI-P3 Color Accuracy', 'Fully adjustable aluminum tilt stand'],
    details: 'Engineered for designers and 3D creators. The hyper-thin panel is backed by solid industrial slate framing with dynamic hardware synchronization for tear-free graphic edits.',
    type: 'display'
  }
];

export default function NexusStore() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activePreviewProduct, setActivePreviewProduct] = useState(null);

  // Cart Functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="h-full overflow-y-auto bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">

      {/* 1. HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-center border-b border-slate-900/60">
          <span className="text-[10px] uppercase tracking-[0.35em] font-black text-emerald-400">
            Coded and Designed by Hashir Nagi
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2 rounded-lg text-slate-950 font-bold text-xl">
              GN
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                GOOGLE AI NEXUS
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-medium">Hardware Lab</span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full hover:bg-slate-900 transition-colors group"
          >
            <ShoppingCart className="w-6 h-6 text-slate-300 group-hover:text-emerald-400 transition-colors" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden py-20 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
            <Zap className="w-3.5 h-3.5" /> Next-Gen Hardware Available Now
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Equip Your Workstation with <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Unrivaled 3D Hardware Core Compute
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 md:text-lg mb-8">
            Step beyond simple video showcase setups. Interact with our hardware in true 3D space, build your custom developer rigs, and experience real-time rendering power.
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* 3. PRODUCT CATALOG GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRODUCTS_DATA.map((product) => (
            <div key={product.id} className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-2xl p-6 transition-all flex flex-col justify-between group">
              <div>
                {/* Visual Placeholder / Theme Card Header */}
                <div className="relative aspect-[4/3] w-full rounded-xl bg-slate-950 border border-slate-900 overflow-hidden mb-6 flex items-center justify-center group-hover:border-slate-800 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 to-slate-950/90 pointer-events-none z-10" />

                  {/* Miniature canvas preview inside cards */}
                  <div className="w-full h-full">
                    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                      <Environment preset="city" />
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[5, 5, 5]} intensity={1.5} />
                      <pointLight position={[-5, -5, -5]} intensity={0.5} />
                      <Center>
                        <ProductModel type={product.type} />
                      </Center>
                    </Canvas>
                  </div>

                  <span className="absolute top-3 left-3 z-20 inline-flex items-center gap-1 bg-slate-900/80 border border-slate-800 text-[10px] uppercase font-semibold text-slate-400 px-2.5 py-1 rounded-md">
                    Interactive 3D Demo
                  </span>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">{product.name}</h3>
                  <span className="text-xl font-black text-slate-200">${product.price.toLocaleString()}</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">{product.tagline}</p>

                <ul className="space-y-2 mb-6">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-900">
                <button
                  onClick={() => setActivePreviewProduct(product)}
                  className="py-2.5 px-4 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Inspect in 3D
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. DETAILS FEATURES IN STORE */}
      <section className="bg-slate-900/20 border-t border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl h-fit text-emerald-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base mb-1">3-Year Factory Warranty</h4>
              <p className="text-xs text-slate-500">Every single compute node is thoroughly diagnostic graded prior to packaging & shipping.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl h-fit text-emerald-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base mb-1">Elite Engineering Standards</h4>
              <p className="text-xs text-slate-500">Each rendering architecture component utilizes raw optimized geometry arrays built for the Web.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl h-fit text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base mb-1">Certified Evaluation Build</h4>
              <p className="text-xs text-slate-500">Verified components match AI matrix guidelines ensuring max execution and stability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DYNAMIC FULLSCREEN 3D LIGHTBOX MODAL */}
      {activePreviewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[600px]">

            {/* Left Column: Huge 3D Canvas rendering */}
            <div className="flex-1 relative bg-slate-950 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />

              <Canvas className="w-full h-full cursor-grab active:cursor-grabbing">
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                <Environment preset="city" />
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 10]} intensity={2.0} castShadow />
                <directionalLight position={[-10, -10, -10]} intensity={0.5} />
                <pointLight position={[0, 3, 2]} intensity={1.5} color="#3b82f6" />

                <Center>
                  <ProductModel type={activePreviewProduct.type} />
                </Center>

                <OrbitControls enableZoom={true} maxDistance={8} minDistance={2.5} />
              </Canvas>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-full text-center text-xs text-slate-400 pointer-events-none">
                Drag to rotate 360° | Scroll to Zoom
              </div>
            </div>

            {/* Right Column: Detailed Product Specs / Context */}
            <div className="w-full md:w-[400px] p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 bg-slate-900">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-black leading-tight text-white">{activePreviewProduct.name}</h2>
                    <span className="text-xs text-emerald-400 mt-1 inline-block">{activePreviewProduct.rating}</span>
                  </div>
                  <button
                    onClick={() => setActivePreviewProduct(null)}
                    className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6">{activePreviewProduct.details}</p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Key Integration specs</h4>
                <div className="space-y-3">
                  {activePreviewProduct.specs.map((spec, i) => (
                    <div key={i} className="flex gap-2.5 items-start text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/60">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-slate-400 font-semibold">Total Price</span>
                  <span className="text-3xl font-black text-emerald-400">${activePreviewProduct.price.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => {
                    addToCart(activePreviewProduct);
                    setActivePreviewProduct(null);
                  }}
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" /> Add to Order
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 6. SLIDE-OUT SHOPPING CART PANEL */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 flex flex-col justify-between shadow-2xl">

              {/* Cart Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingCart className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-lg text-white">Your Workspace Build</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Products List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="bg-slate-950 p-4 rounded-full text-slate-600 mb-4 border border-slate-900">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <p className="font-bold text-slate-300">Your shopping cart is empty</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs">Looks like you haven't loaded any elite hardware modules to your order list yet!</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-slate-950 border border-slate-900 hover:border-slate-800 transition-colors">
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm text-white leading-tight">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 rounded hover:bg-slate-900 text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">${item.price.toLocaleString()} each</p>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border border-slate-800 rounded-lg bg-slate-900 overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2.5 py-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-xs font-bold text-white bg-slate-950">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2.5 py-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-extrabold text-sm text-slate-300">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              <div className="p-6 border-t border-slate-800 bg-slate-950/60">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Shipping fee</span>
                    <span className="text-emerald-400 uppercase tracking-widest font-bold">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm text-slate-400">Estimated Subtotal</span>
                    <span className="text-2xl font-black text-white">${cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Simulating checkout routing!')}
                  disabled={cart.length === 0}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-extrabold rounded-xl text-center transition-all shadow-lg shadow-emerald-500/10 uppercase tracking-wider text-xs"
                >
                  Proceed to Secure Checkout
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
