export const showcaseProducts = [
  {
    id: 'gpu-fe',
    name: 'NVIDIA GeForce RTX 4080 Super',
    tagline: 'Hourglass metal shroud. Striking design.',
    category: 'Graphics',
    specs: '16GB GDDR6X, Ada Lovelace Architecture, 3rd Gen Ray Tracing Cores. Finished in matte obsidian and bead-blasted aluminum frame styled closely to the Founders Edition layout.',
    marketPrice: 320000,
    nagiPrice: 310000,
    colorTheme: 'from-gray-100 to-gray-200',
    svgPreview: (
      <svg viewBox="0 0 200 120" className="w-40 h-28 drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="25" width="170" height="70" rx="10" fill="#1e1e20" stroke="#8e8e93" strokeWidth="4" />
        <path d="M 15 25 L 100 60 L 185 25" stroke="#a1a1a6" strokeWidth="3" />
        <path d="M 15 95 L 100 60 L 185 95" stroke="#a1a1a6" strokeWidth="3" />
        <circle cx="60" cy="60" r="22" fill="#0c0c0d" stroke="#333" strokeWidth="2" />
        <circle cx="60" cy="60" r="6" fill="#8e8e93" />
        <circle cx="140" cy="60" r="22" fill="#0c0c0d" stroke="#333" strokeWidth="2" />
        <circle cx="140" cy="60" r="6" fill="#8e8e93" />
        <rect x="50" y="95" width="100" height="4" fill="#d4af37" />
      </svg>
    )
  },
  {
    id: 'cpu-ryzen',
    name: 'AMD Ryzen 7 7800X3D',
    tagline: "The world's premier gaming processor.",
    category: 'Processors',
    specs: '8 Cores, 16 Threads, 5.0GHz Boost Clock. Built with AMD 3D V-Cache technology for unmatched gaming performance with a structural design matching AM5 standards.',
    marketPrice: 115000,
    nagiPrice: 105000,
    colorTheme: 'from-zinc-100 to-zinc-200',
    svgPreview: (
      <svg viewBox="0 0 200 120" className="w-40 h-28 drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="45" y="10" width="110" height="100" rx="8" fill="#155e27" stroke="#2e7d32" strokeWidth="3" />
        <circle cx="55" cy="20" r="2" fill="#f59e0b" />
        <circle cx="145" cy="20" r="2" fill="#f59e0b" />
        <circle cx="55" cy="100" r="2" fill="#f59e0b" />
        <circle cx="145" cy="100" r="2" fill="#f59e0b" />
        <rect x="60" y="25" width="80" height="70" rx="12" fill="#d1d5db" stroke="#9ca3af" strokeWidth="4" />
        <rect x="75" y="45" width="50" height="15" rx="3" fill="#e5e7eb" />
        <line x1="80" y1="75" x2="120" y2="75" stroke="#9ca3af" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 'display-nagi',
    name: 'Nagi Pro Display XDR Studio',
    tagline: 'More dynamic than reality.',
    category: 'Displays',
    specs: '27-inch Retina 5K Display. 600 nits of brightness, P3 wide color gamut, and support for one billion colors. Comes with a space-grade aluminum tilt-adjustable stand.',
    marketPrice: 85000,
    nagiPrice: 75000,
    colorTheme: 'from-slate-100 to-slate-200',
    svgPreview: (
      <svg viewBox="0 0 200 120" className="w-40 h-28 drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="15" width="160" height="85" rx="6" fill="#1c1c1e" stroke="#e5e7eb" strokeWidth="3" />
        <path d="M 22 17 L 110 17 L 22 85 Z" fill="white" fillOpacity="0.05" />
        <path d="M 100 100 L 100 115 L 120 115" stroke="#d1d5db" strokeWidth="8" strokeLinecap="round" />
        <rect x="75" y="114" width="50" height="3" rx="1" fill="#9ca3af" />
      </svg>
    )
  }
];
