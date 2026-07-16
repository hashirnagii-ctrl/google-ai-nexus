import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import { googleAiData, googleAiHistory } from './data/googleAiData';
import { NexusRing } from './components/canvas/NexusRing';
import { Check, X, ArrowRight, Zap, History, LayoutDashboard, Boxes, Store } from 'lucide-react';
import { ProductShowcase } from './components/showcase/ProductShowcase';
import NexusStore from './components/store/NexusStore';

export default function App() {
  const [activeTab, setActiveTab] = useState('fleet'); // 'fleet' | 'history' | 'showcase' | 'store'
  const [activeIdx, setActiveIdx] = useState(0);
  const [historyIdx, setHistoryIdx] = useState(0);

  const activeTool = googleAiData[activeIdx];
  const activeHistoryEvent = googleAiHistory[historyIdx];

  // Fluid transition colors
  const themeColor = activeTab === 'fleet' ? activeTool.color : '#4285F4';

  return (
    <div className="relative w-screen h-screen bg-[#030303] text-white overflow-hidden font-sans select-none">
      
      {/* 1. PERSISTENT FLOATING BRANDING HEADER WITH GOOGLE LOGO */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-5 flex justify-between items-center bg-gradient-to-b from-[#030303]/90 to-transparent backdrop-blur-xs border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* GOOGLE LOGO WITH GLOW */}
          <div className="relative group cursor-pointer">
            <svg viewBox="0 0 24 24" className="w-6 h-6 transition-transform duration-500 group-hover:rotate-[360deg]">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.51-2.51 3.5l3.5 2.71c2.05-1.89 3.23-4.67 3.23-7.07z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.5-2.71c-1.12.75-2.55 1.19-4.43 1.19-3.41 0-6.3-2.3-7.33-5.41L1.08 17c2.03 4.04 6.21 6.8 10.92 6.8z"/>
              <path fill="#FBBC05" d="M4.67 14.16a7.19 7.19 0 0 1 0-4.32L1.08 7.14a12.013 12.013 0 0 0 0 9.72l3.59-2.7z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.93 1.19 15.24 0 12 0 7.29 0 3.11 2.76 1.08 6.8l3.59 2.7c1.03-3.11 3.92-5.41 7.33-5.41z"/>
            </svg>
            <div className="absolute inset-0 bg-white/20 blur-md rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-gray-400 uppercase hidden sm:inline-block">
            Google AI Nexus
          </span>
        </div>

        {/* SIGNATURE */}
        <div className="text-center">
          <h1 className="font-mono text-[11px] sm:text-xs font-black tracking-[0.35em] text-white/90 uppercase">
            CODED AND DESIGNED BY HASHIR NAGI
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase">SYS_ACTIVE</span>
        </div>
      </header>

      {/* 2. 3D WEBGL BACKGROUND CANVAS */}
      <div className="absolute top-0 left-0 w-[55vw] h-full z-10 pointer-events-none md:pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <NexusRing activeTool={activeTab === 'fleet' ? activeTool : { color: '#4285F4', rotation: [0.8, -0.8, 0.4] }} />
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* 3. DYNAMIC BACKGROUND GLOW */}
      <div 
        className="absolute -left-[10%] top-[20%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 transition-all duration-1000 pointer-events-none"
        style={{ backgroundColor: themeColor }}
      />

      {/* 4. CONTENT INTERFACE */}
      <main className="relative z-20 w-full h-full flex flex-col md:flex-row justify-end items-center px-6 md:px-16 pt-24 pb-12">
        <div className={`h-full flex flex-col justify-center gap-6 transition-all duration-500 ${activeTab === 'showcase' || activeTab === 'store' ? 'w-full' : 'w-full md:w-[42vw]'}`}>
          
          {/* TAB CONTROLS */}
          <div className="flex border-b border-white/10 pb-1">
            <button
              onClick={() => setActiveTab('fleet')}
              className={`flex items-center gap-2 pb-3 px-4 font-mono text-xs tracking-widest uppercase transition-all duration-300 relative ${
                activeTab === 'fleet' ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>AI Active Fleet</span>
              {activeTab === 'fleet' && (
                <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 pb-3 px-4 font-mono text-xs tracking-widest uppercase transition-all duration-300 relative ${
                activeTab === 'history' ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>AI History</span>
              {activeTab === 'history' && (
                <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('showcase')}
              className={`flex items-center gap-2 pb-3 px-4 font-mono text-xs tracking-widest uppercase transition-all duration-300 relative ${
                activeTab === 'showcase' ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>3D Showcase</span>
              {activeTab === 'showcase' && (
                <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('store')}
              className={`flex items-center gap-2 pb-3 px-4 font-mono text-xs tracking-widest uppercase transition-all duration-300 relative ${
                activeTab === 'store' ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Hardware Store</span>
              {activeTab === 'store' && (
                <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
              )}
            </button>
          </div>

          {/* DYNAMIC CARD CONTENT */}
          <div className={`flex flex-col justify-between ${activeTab === 'showcase' || activeTab === 'store' ? 'flex-1 min-h-0' : 'min-h-[460px]'}`}>
            <AnimatePresence mode="wait">
              {activeTab === 'fleet' ? (
                <motion.div
                  key="fleet-tab"
                  initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-6"
                >
                  {/* Selector Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {googleAiData.map((tool, index) => (
                      <button
                        key={tool.id}
                        onClick={() => setActiveIdx(index)}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider border transition-all duration-200 ${
                          activeIdx === index ? 'text-white border-white/40' : 'text-gray-500 border-white/5 hover:text-gray-300'
                        }`}
                        style={activeIdx === index ? { backgroundColor: `${tool.color}15`, borderColor: tool.color } : {}}
                      >
                        {tool.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest rounded-md bg-white/5 border border-white/10" style={{ color: activeTool.color }}>
                        {activeTool.badge}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mt-3">{activeTool.name}</h2>
                    </div>
                    <Zap className="w-5 h-5 animate-pulse" style={{ color: activeTool.color }} />
                  </div>

                  <p className="text-sm text-gray-400 font-light leading-relaxed">{activeTool.description}</p>

                  {/* PROS & CONS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-5 mt-2">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase flex items-center gap-1.5 mb-2">
                        <span className="w-1 h-1 rounded-full bg-emerald-400" /> Pros
                      </span>
                      <ul className="flex flex-col gap-1.5">
                        {activeTool.pros.map((pro, i) => (
                          <li key={i} className="text-xs text-gray-300 flex items-start gap-2 leading-tight">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-rose-400 uppercase flex items-center gap-1.5 mb-2">
                        <span className="w-1 h-1 rounded-full bg-rose-400" /> Cons
                      </span>
                      <ul className="flex flex-col gap-1.5">
                        {activeTool.cons.map((con, i) => (
                          <li key={i} className="text-xs text-gray-300 flex items-start gap-2 leading-tight">
                            <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : activeTab === 'history' ? (
                <motion.div
                  key="history-tab"
                  initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-6"
                >
                  {/* Timeline Selector */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {googleAiHistory.map((hist, index) => (
                      <button
                        key={hist.year}
                        onClick={() => setHistoryIdx(index)}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider border transition-all duration-200 ${
                          historyIdx === index ? 'text-white border-blue-500 bg-blue-500/10' : 'text-gray-500 border-white/5 hover:text-gray-300'
                        }`}
                      >
                        {hist.year}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400">
                        Milestone: {activeHistoryEvent.year}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mt-3">
                        {activeHistoryEvent.title}
                      </h2>
                    </div>
                    <History className="w-5 h-5 text-blue-400 animate-pulse" />
                  </div>

                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {activeHistoryEvent.description}
                  </p>

                  <div className="border-t border-white/5 pt-5 mt-2">
                    <span className="text-[10px] font-mono tracking-wider text-blue-400 uppercase flex items-center gap-1.5 mb-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400" /> Historical Impact
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">
                      {activeHistoryEvent.impact}
                    </p>
                  </div>

                  <div className="text-right text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-2">
                    History curated by Hashir Nagi
                  </div>
                </motion.div>
              ) : activeTab === 'showcase' ? (
                <motion.div
                  key="showcase-tab"
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 min-h-0 overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <ProductShowcase />
                </motion.div>
              ) : (
                <motion.div
                  key="store-tab"
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 min-h-0 overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <NexusStore />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ACTION FOOTER BUTTONS */}
            {activeTab !== 'showcase' && activeTab !== 'store' && (
            <div className="flex justify-between items-center mt-6">
              <span className="font-mono text-[11px] text-gray-600">
                {activeTab === 'fleet' ? (
                  `0${activeIdx + 1} // 0${googleAiData.length}`
                ) : (
                  `0${historyIdx + 1} // 0${googleAiHistory.length}`
                )}
              </span>
              <button
                onClick={() => {
                  if (activeTab === 'fleet') {
                    setActiveIdx((prev) => (prev + 1) % googleAiData.length);
                  } else {
                    setHistoryIdx((prev) => (prev + 1) % googleAiHistory.length);
                  }
                }}
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-white/90 hover:scale-105 active:scale-95"
              >
                <span>Next Era</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
