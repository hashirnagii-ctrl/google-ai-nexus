import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import { googleAiData, googleAiHistory } from './data/googleAiData';
import { NexusRing } from './components/canvas/NexusRing';
import { Check, X, ArrowRight, Zap, History, LayoutDashboard, Music, Play, Pause, Volume2, Disc } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('fleet'); // 'fleet', 'history', or 'music'
  const [activeIdx, setActiveIdx] = useState(0);
  const [historyIdx, setHistoryIdx] = useState(0);

  // Audio Engine State
  const [isPlaying, setIsPlaying] = useState(false);
  const [panValue, setPanValue] = useState(0); // Live visual helper for panning indicator
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const pannerRef = useRef(null);

  const activeTool = googleAiData[activeIdx];
  const activeHistoryEvent = googleAiHistory[historyIdx];

  // Colors based on current selected tab/item
  const getThemeColor = () => {
    if (activeTab === 'fleet') return activeTool.color;
    if (activeTab === 'history') return '#4285F4';
    return '#f43f5e'; // Deep rose/crimson for Music Lab
  };

  const themeColor = getThemeColor();

  // Web Audio API 8D Spatial Node Setup
  const handleTogglePlay = () => {
    if (!audioCtxRef.current) {
      // Browsers block audio context initialization until direct user interaction
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaElementSource(audioRef.current);
      const panner = ctx.createStereoPanner();
      pannerRef.current = panner;

      source.connect(panner);
      panner.connect(ctx.destination);
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Continuous Sinusoidal Panning Animation
  useEffect(() => {
    let animationId;
    const animatePan = () => {
      if (isPlaying && pannerRef.current) {
        // Smoothly oscillate between -1 (full left) and 1 (full right) over a 5 second period
        const speed = 0.0012;
        const currentPan = Math.sin(Date.now() * speed);
        pannerRef.current.pan.value = currentPan;
        setPanValue(currentPan);
      }
      animationId = requestAnimationFrame(animatePan);
    };
    animatePan();
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying]);

  return (
    <div className="relative w-screen h-screen bg-[#030303] text-white overflow-hidden font-sans select-none">

      {/* Hidden Native Audio Element */}
      {/* Note: Save your Naazni MP3 file inside public/audio/naazni.mp3 */}
      <audio
        ref={audioRef}
        src="/audio/naazni.mp3"
        loop
        crossOrigin="anonymous"
      />

      {/* 1. PERSISTENT FLOATING BRANDING HEADER WITH GOOGLE LOGO */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-5 flex justify-between items-center bg-gradient-to-b from-[#030303]/90 to-transparent backdrop-blur-xs border-b border-white/5">
        <div className="flex items-center gap-3">
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

        {/* BRAGGING SIGNATURE */}
        <div className="text-center">
          <h1 className="font-mono text-[11px] sm:text-xs font-black tracking-[0.35em] text-white/90 uppercase">
            CODED BY HASHIR NAGI
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase">Acoustic Lab</span>
        </div>
      </header>

      {/* 2. THE 3D BACKGROUND CANVAS */}
      <div className="absolute top-0 left-0 w-[55vw] h-full z-10 pointer-events-none md:pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <NexusRing activeTool={
            activeTab === 'fleet'
              ? activeTool
              : activeTab === 'history'
              ? { color: '#4285F4', rotation: [0.8, -0.8, 0.4] }
              : { color: '#f43f5e', rotation: [isPlaying ? Date.now() * 0.0005 : 0.2, 1.5, 0.8] }
          } />
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* 3. DYNAMIC GLOW BACKDROP */}
      <div
        className="absolute -left-[10%] top-[20%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 transition-all duration-1000 pointer-events-none"
        style={{ backgroundColor: themeColor }}
      />

      {/* 4. CONTENT WRAPPER */}
      <main className="relative z-20 w-full h-full flex flex-col md:flex-row justify-end items-center px-6 md:px-16 pt-24 pb-12">
        <div className="w-full md:w-[42vw] h-full flex flex-col justify-center gap-6">

          {/* TAB BAR (FLEET VS HISTORY VS MUSIC BY HASHIR NAGI) */}
          <div className="flex border-b border-white/10 pb-1 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('fleet')}
              className={`flex items-center gap-2 pb-3 px-3 shrink-0 font-mono text-[11px] tracking-wider uppercase transition-all duration-300 relative ${
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
              className={`flex items-center gap-2 pb-3 px-3 shrink-0 font-mono text-[11px] tracking-wider uppercase transition-all duration-300 relative ${
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
              onClick={() => setActiveTab('music')}
              className={`flex items-center gap-2 pb-3 px-3 shrink-0 font-mono text-[11px] tracking-wider uppercase transition-all duration-300 relative ${
                activeTab === 'music' ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Music className="w-3.5 h-3.5 animate-pulse" />
              <span>8D Audio Lab</span>
              {activeTab === 'music' && (
                <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
              )}
            </button>
          </div>

          {/* DYNAMIC CONTENT CONTAINER */}
          <div className="min-h-[460px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {activeTab === 'fleet' && (
                <motion.div
                  key="fleet-tab"
                  initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col gap-6"
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
                    <Zap className="w-5 h-5" style={{ color: activeTool.color }} />
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
              )}

              {activeTab === 'history' && (
                <motion.div
                  key="history-tab"
                  initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col gap-6"
                >
                  {/* Timeline Selection Bar */}
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
                    <History className="w-5 h-5 text-blue-400" />
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
              )}

              {activeTab === 'music' && (
                /* TAB 3: SPATIAL 8D ACOUSTICS BY HASHIR NAGI */
                <motion.div
                  key="music-tab"
                  initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col gap-6 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400">
                        Acoustic Engine Engaged
                      </span>
                      <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mt-3">
                        Naazni (8D Spatial)
                      </h2>
                      <p className="text-xs text-gray-500 font-mono mt-1">
                        Artist: Aashir Wajahat & Annural Khalid
                      </p>
                    </div>
                    {/* Spinning Vinyl Visualizer */}
                    <motion.div
                      animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      className="p-1 rounded-full border border-rose-500/30 bg-rose-500/5 shrink-0"
                    >
                      <Disc className="w-10 h-10 text-rose-400" />
                    </motion.div>
                  </div>

                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    Experience dynamic physical 3D panning. Our system captures the audio signal and pans it across the stereofield in a continuous wave. <strong className="text-white">Use headphones for full spatialization.</strong>
                  </p>

                  {/* 8D SPATIAL LIVE CHANNEL VISUALIZER */}
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex justify-between font-mono text-[9px] text-gray-500">
                      <span>LEFT EAR</span>
                      <span>ACTIVE BALANCE</span>
                      <span>RIGHT EAR</span>
                    </div>

                    {/* Channel Bar Visualizer */}
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute top-0 bottom-0 w-4 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e]"
                        style={{ left: `calc(50% + (${panValue * 45}% - 8px))` }}
                        transition={{ type: 'just' }}
                      />
                    </div>
                  </div>

                  {/* MUSIC CONTROLLER INTERFACE */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
                    <button
                      onClick={handleTogglePlay}
                      className="flex items-center gap-3 px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 fill-white" />
                          <span>Pause Session</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-white" />
                          <span>Play in 8D</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2 text-gray-500">
                      <Volume2 className="w-4 h-4" />
                      <span className="font-mono text-[10px] tracking-widest uppercase">Auto Spatializer</span>
                    </div>
                  </div>

                  <div className="text-right text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                    Acoustic pipeline by Hashir Nagi
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ACTION FOOTER BUTTONS */}
            <div className="flex justify-between items-center mt-6">
              <span className="font-mono text-[11px] text-gray-600">
                {activeTab === 'fleet' ? (
                  `0${activeIdx + 1} // 0${googleAiData.length}`
                ) : activeTab === 'history' ? (
                  `0${historyIdx + 1} // 0${googleAiHistory.length}`
                ) : (
                  "8D AUDIO DEPLOYED"
                )}
              </span>

              {activeTab !== 'music' && (
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
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
