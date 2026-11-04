'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { 
  Atom, 
  RotateCcw, 
  Play, 
  Pause, 
  Layers, 
  Sparkles, 
  Eye, 
  Search,
  FlaskConical,
  Beaker
} from 'lucide-react';
import { ElementDossier, CompoundDossier, DossierData } from './ScienceDossierModal';

interface ExploreWorkspaceProps {
  catalog: {
    elements: ElementDossier[];
    compounds: CompoundDossier[];
  };
  onOpenDossier: (dossier: DossierData) => void;
  isActive: boolean;
}

interface ChemistryViewerInstance {
  atom: (e: ElementDossier) => void;
  molecule?: (c: unknown) => void;
  resetView: () => void;
  pauseElectrons?: (paused: boolean) => void;
  setQuality?: (q: string) => void;
  suspendDrawing: (suspend: boolean) => void;
  spin?: boolean;
  clouds?: boolean;
  atomClouds?: boolean;
  nucleus?: boolean;
  clear: () => void;
}

const COMMON_SYMBOLS = new Set([
  'H', 'He', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 
  'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Cr', 'Mn', 'Fe', 
  'Cu', 'Zn', 'Br', 'Ag', 'Ba', 'Pt', 'Au', 'Hg', 'Pb'
]);

const METAL_SERIES = ['K', 'Na', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'Ni', 'Sn', 'Pb', 'H', 'Cu', 'Hg', 'Ag', 'Pt', 'Au'];

const POPULAR_COMPOUNDS = [
  'LiOH', 'H2O', 'CO2', 'NaCl', 'CH4', 'NaOH', 'Ca(OH)2', 'HCl', 'H2SO4', 'CaCO3', 'NH3', 'Fe2O3'
];

const CATEGORY_COLORS: Record<string, string> = {
  alkali: 'border-amber-500/50 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20',
  alkaline: 'border-yellow-500/50 text-yellow-300 bg-yellow-500/10 hover:bg-yellow-500/20',
  transition: 'border-sky-500/50 text-sky-300 bg-sky-500/10 hover:bg-sky-500/20',
  post_transition: 'border-emerald-500/50 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20',
  metalloid: 'border-teal-500/50 text-teal-300 bg-teal-500/10 hover:bg-teal-500/20',
  nonmetal: 'border-rose-400/50 text-rose-300 bg-rose-500/10 hover:bg-rose-500/20',
  halogen: 'border-purple-400/50 text-purple-300 bg-purple-500/10 hover:bg-purple-500/20',
  noble: 'border-indigo-400/50 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20',
  lanthanide: 'border-pink-500/50 text-pink-300 bg-pink-500/10 hover:bg-pink-500/20',
  actinide: 'border-red-500/50 text-red-300 bg-red-500/10 hover:bg-red-500/20',
};

function getElementCategory(e: ElementDossier): string {
  const c = (e.category || '').toLowerCase();
  if (c.includes('alkali') && !c.includes('earth')) return 'alkali';
  if (c.includes('earth') || c.includes('alkaline')) return 'alkaline';
  if (c.includes('transition')) return 'transition';
  if (c.includes('post') || c.includes('kim loại yếu')) return 'post_transition';
  if (c.includes('metalloid') || c.includes('á kim')) return 'metalloid';
  if (c.includes('halogen')) return 'halogen';
  if (c.includes('noble') || c.includes('hiếm')) return 'noble';
  if (c.includes('lanthan')) return 'lanthanide';
  if (c.includes('actin')) return 'actinide';
  return 'nonmetal';
}

export function ExploreWorkspace({ catalog, onOpenDossier, isActive }: ExploreWorkspaceProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<ChemistryViewerInstance | null>(null);
  
  // Selection state
  const [activeKind, setActiveKind] = useState<'element' | 'compound'>('element');
  const [selectedElement, setSelectedElement] = useState<ElementDossier | null>(null);
  const [selectedCompound, setSelectedCompound] = useState<CompoundDossier | null>(null);
  
  // View mode for list: elements table vs compounds list
  const [viewMode, setViewMode] = useState<'elements' | 'compounds'>('elements');

  const [searchQuery, setSearchQuery] = useState('');
  const [onlyCommon, setOnlyCommon] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isElectronsRunning, setIsElectronsRunning] = useState(true);
  const [showClouds, setShowClouds] = useState(false);
  const [showNucleus, setShowNucleus] = useState(false);

  // Default selected element is Oxygen (z: 8)
  useEffect(() => {
    if (catalog?.elements?.length > 0 && !selectedElement && activeKind === 'element') {
      const oxygen = catalog.elements.find(e => e.symbol === 'O') || catalog.elements[0];
      setSelectedElement(oxygen);
    }
  }, [catalog, selectedElement, activeKind]);

  // Initialize ChemistryViewer for 3D rendering
  useEffect(() => {
    let isMounted = true;
    const initViewer = async () => {
      if (!mountRef.current || viewerRef.current) return;
      try {
        // @ts-expect-error browser dynamic import
        const mod = await import(/* webpackIgnore: true */ '/sites/merge/js/viewer.js');
        if (isMounted && mod?.ChemistryViewer && mountRef.current) {
          const v = new mod.ChemistryViewer(mountRef.current, catalog.elements, {
            transparentStage: true,
          });
          viewerRef.current = v;
          const initialElem = catalog.elements.find(e => e.symbol === 'O') || catalog.elements[0];
          if (initialElem) {
            v.atom(initialElem);
          }
        }
      } catch (err) {
        console.error('Không thể nạp ChemistryViewer:', err);
      }
    };

    if (isActive) {
      initViewer();
    }

    return () => {
      isMounted = false;
      if (viewerRef.current) {
        viewerRef.current.suspendDrawing(true);
      }
    };
  }, [isActive, catalog]);

  // Handle tab visibility suspend/resume
  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.suspendDrawing(!isActive);
    }
  }, [isActive]);

  // Select Element Handler
  const handleSelectElement = (elem: ElementDossier) => {
    setActiveKind('element');
    setSelectedElement(elem);
    setSelectedCompound(null);
    if (viewerRef.current) {
      viewerRef.current.atom(elem);
    }
  };

  // Select Compound Handler (e.g. LiOH)
  const handleSelectCompound = (c: CompoundDossier) => {
    setActiveKind('compound');
    setSelectedCompound(c);
    setSelectedElement(null);
    if (viewerRef.current?.molecule) {
      viewerRef.current.molecule(c);
    }
  };

  // View Controls Handlers
  const handleToggleSpin = () => {
    if (!viewerRef.current) return;
    const next = !isSpinning;
    setIsSpinning(next);
    viewerRef.current.spin = next;
  };

  const handleToggleElectrons = () => {
    if (!viewerRef.current || !viewerRef.current.pauseElectrons) return;
    const next = !isElectronsRunning;
    setIsElectronsRunning(next);
    viewerRef.current.pauseElectrons(!next);
  };

  const handleToggleClouds = () => {
    if (!viewerRef.current) return;
    const next = !showClouds;
    setShowClouds(next);
    viewerRef.current.atomClouds = next;
    viewerRef.current.clouds = next;
    if (activeKind === 'element' && selectedElement) {
      viewerRef.current.atom(selectedElement);
    } else if (activeKind === 'compound' && selectedCompound && viewerRef.current.molecule) {
      viewerRef.current.molecule(selectedCompound);
    }
  };

  const handleToggleNucleus = () => {
    if (!viewerRef.current || activeKind !== 'element' || !selectedElement) return;
    const next = !showNucleus;
    setShowNucleus(next);
    viewerRef.current.nucleus = next;
    viewerRef.current.atom(selectedElement);
  };

  const handleResetView = () => {
    if (!viewerRef.current) return;
    viewerRef.current.resetView();
  };

  // Filtered elements for search
  const filteredElements = useMemo(() => {
    return (catalog?.elements || []).filter(e => {
      if (onlyCommon && !COMMON_SYMBOLS.has(e.symbol)) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        e.symbol.toLowerCase().includes(q) ||
        e.name.toLowerCase().includes(q) ||
        String(e.z) === q ||
        (e.english && e.english.toLowerCase().includes(q))
      );
    });
  }, [catalog?.elements, onlyCommon, searchQuery]);

  // Filtered compounds for search
  const filteredCompounds = useMemo(() => {
    const list = (catalog?.compounds as unknown as CompoundDossier[]) || [];
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(c => 
      c.id.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q)
    );
  }, [catalog?.compounds, searchQuery]);

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto">
      
      {/* 3D Model Explorer Stage */}
      <section className="relative w-full rounded-2xl bg-slate-900/60 border border-rose-500/20 backdrop-blur-xl shadow-xl shadow-black/40 overflow-hidden flex flex-col lg:flex-row min-h-[500px]">
        
        {/* Left Side: Identity & Controls */}
        <div className="p-5 md:p-6 lg:w-80 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-slate-950/40 z-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[10px] font-black tracking-widest text-rose-400 uppercase bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                KHÔNG GIAN 3D
              </span>
              <span className="text-xs text-slate-400">
                {activeKind === 'element' ? 'Nguyên Tử 3D' : 'Phân Tử / Hợp Chất 3D'}
              </span>
            </div>

            {/* Element Identity Display */}
            {activeKind === 'element' && selectedElement && (
              <div className="space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-black font-mono text-rose-400">
                    {selectedElement.symbol}
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-white">{selectedElement.name}</h3>
                    <p className="text-xs text-slate-400">{selectedElement.english || ''} · Số hiệu: <b className="text-rose-400">{selectedElement.z}</b></p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Khối lượng nguyên tử:</span>
                    <span className="font-mono font-bold text-white">{selectedElement.mass} u</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cấu hình e:</span>
                    <span className="font-mono font-bold text-rose-300">{selectedElement.configuration || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Vị trí:</span>
                    <span className="text-slate-200">Chu kỳ {selectedElement.period} · Nhóm {selectedElement.group}</span>
                  </div>
                </div>

                {/* Inspect Button - Opens Hồ sơ khoa học Modal */}
                <button
                  id="explore-element-dossier-btn"
                  onClick={() => selectedElement && onOpenDossier({ type: 'element', data: selectedElement })}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs md:text-sm shadow-md shadow-rose-950 transition-all border border-rose-400/30 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Hồ sơ khoa học {selectedElement.symbol} ↗</span>
                </button>
              </div>
            )}

            {/* Compound Identity Display (e.g. LiOH) */}
            {activeKind === 'compound' && selectedCompound && (
              <div className="space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-black font-mono text-sky-400">
                    {selectedCompound.id}
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-white">{selectedCompound.name}</h3>
                    <p className="text-xs text-slate-400">
                      {selectedCompound.kind === 'ionic' ? 'Hợp chất ion' : 'Hợp chất hóa học'}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Khối lượng mol M:</span>
                    <span className="font-mono font-bold text-white">{selectedCompound.molar_mass || 24} g/mol</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Loại cấu tạo:</span>
                    <span className="font-mono font-bold text-sky-300">
                      {selectedCompound.kind === 'ionic' ? 'Mạng ion (Li⁺ + OH⁻)' : 'Cộng hóa trị'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Độ tan:</span>
                    <span className="text-slate-200">{selectedCompound.solubility === 'soluble' ? 'Tan trong nước' : 'Ít tan / không tan'}</span>
                  </div>
                </div>

                {/* Inspect Button - Opens Hồ sơ khoa học Modal */}
                <button
                  id="explore-compound-dossier-btn"
                  onClick={() => selectedCompound && onOpenDossier({ type: 'compound', data: selectedCompound })}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs md:text-sm shadow-md shadow-sky-950 transition-all border border-sky-400/30 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Hồ sơ khoa học {selectedCompound.id} ↗</span>
                </button>
              </div>
            )}
          </div>

          {/* 3D Action Controls */}
          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-2">
              Điều khiển mô hình 3D
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleToggleSpin}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  isSpinning
                    ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSpinning ? 'Dừng xoay' : 'Tự xoay'}</span>
              </button>

              <button
                onClick={handleToggleElectrons}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  !isElectronsRunning
                    ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {isElectronsRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isElectronsRunning ? 'Dừng e' : 'Chạy e'}</span>
              </button>

              <button
                onClick={handleToggleClouds}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  showClouds
                    ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Mây e</span>
              </button>

              <button
                onClick={handleToggleNucleus}
                disabled={activeKind !== 'element'}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  showNucleus
                    ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
              >
                <Atom className="w-3.5 h-3.5" />
                <span>Hạt nhân</span>
              </button>
            </div>

            <button
              onClick={handleResetView}
              className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đưa góc nhìn về mặc định</span>
            </button>
          </div>
        </div>

        {/* Right Side: WebGL Canvas Container */}
        <div className="flex-1 relative min-h-[420px] lg:min-h-[500px] bg-radial from-slate-900 via-[#030712] to-black flex items-center justify-center">
          <div
            ref={mountRef}
            id="explore-three-mount"
            className="w-full h-full min-h-[420px] lg:min-h-[500px]"
          />
          <div className="absolute bottom-3 right-4 text-[11px] text-slate-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full pointer-events-none border border-slate-800">
            Kéo chuột để xoay · Cuộn để thu phóng · Mô hình Three.js quả cầu bóng kính
          </div>
        </div>
      </section>

      {/* Popular Compounds Bar (Quick Selection including LiOH) */}
      <section className="w-full rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-xl p-4 md:p-5 shadow-xl shadow-black/30">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Beaker className="w-4 h-4 text-sky-400" />
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              HỢP CHẤT PHỔ BIẾN (BẤM XEM 3D CPK CHUẨN)
            </h4>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('elements')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'elements'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              118 Nguyên Tố
            </button>
            <button
              onClick={() => setViewMode('compounds')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'compounds'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Kho Hợp Chất
            </button>
          </div>
        </div>

        {/* Popular chips */}
        <div className="flex flex-wrap items-center gap-2">
          {POPULAR_COMPOUNDS.map((compId) => {
            const comp = catalog?.compounds?.find(c => c.id === compId) || {
              id: compId,
              name: compId === 'LiOH' ? 'Liti hidroxit' : compId,
              kind: compId === 'LiOH' || compId === 'NaCl' || compId === 'NaOH' || compId === 'Ca(OH)2' || compId === 'CaCO3' ? 'ionic' : 'covalent',
              solubility: 'soluble',
              molar_mass: compId === 'LiOH' ? 24 : 18,
            };
            const isSelected = activeKind === 'compound' && selectedCompound?.id === compId;

            return (
              <button
                key={compId}
                id={compId === 'LiOH' ? 'explore-select-lioh' : undefined}
                data-compound-select={compId}
                onClick={() => handleSelectCompound(comp as CompoundDossier)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-black border transition-all cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-400 ring-2 ring-sky-400 scale-105'
                    : 'bg-slate-950/80 text-slate-300 border-slate-700/80 hover:border-sky-500 hover:text-white hover:bg-slate-800'
                }`}
                title={`Xem mô hình 3D của ${compId} - ${comp.name}`}
              >
                <span>{compId}</span>
                {compId === 'LiOH' && <span className="ml-1.5 text-[10px] text-pink-300 font-sans">🌸 Liti hidroxit</span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Browse Section: Periodic Table OR Full Compounds Grid */}
      <section className="w-full rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-xl p-4 md:p-6 shadow-xl shadow-black/30">
        
        {/* Table Top Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <span>{viewMode === 'elements' ? 'Bảng tuần hoàn các nguyên tố hóa học' : 'Kho hợp chất hóa học (Compounds)'}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                {viewMode === 'elements' ? '118 NGUYÊN TỐ' : `${filteredCompounds.length} HỢP CHẤT`}
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {viewMode === 'elements' 
                ? 'Bấm chọn nguyên tố để xem mô hình 3D nguyên tử và mở Hồ sơ khoa học'
                : 'Bấm chọn hợp chất để xem mô hình 3D liên kết và mở Hồ sơ khoa học'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="explore-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên, kí hiệu, LiOH..."
                className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700/60 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500/60 w-48 md:w-60"
              />
            </div>

            {viewMode === 'elements' && (
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyCommon}
                  onChange={(e) => setOnlyCommon(e.target.checked)}
                  className="rounded border-slate-700 text-rose-600 focus:ring-rose-500 w-3.5 h-3.5 bg-slate-900"
                />
                <span>Thường học</span>
              </label>
            )}
          </div>
        </div>

        {/* View Mode: Elements */}
        {viewMode === 'elements' && (
          <>
            <div className="overflow-x-auto pb-2 custom-scrollbar">
              <div className="min-w-[760px] grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 lg:grid-cols-18 gap-1.5">
                {filteredElements.map((elem) => {
                  const isSelected = activeKind === 'element' && selectedElement?.symbol === elem.symbol;
                  const catClass = CATEGORY_COLORS[getElementCategory(elem)] || 'border-slate-700/60 text-slate-300 bg-slate-800/40';
                  return (
                    <button
                      key={elem.symbol}
                      onClick={() => handleSelectElement(elem)}
                      className={`flex flex-col items-center justify-between p-1.5 rounded-lg border transition-all text-center h-16 cursor-pointer ${catClass} ${
                        isSelected
                          ? 'ring-2 ring-rose-500 bg-rose-600/30 scale-105 z-10 shadow-lg shadow-rose-950'
                          : ''
                      }`}
                      title={`${elem.z} · ${elem.name} (${elem.symbol})\nKhối lượng: ${elem.mass} u\nCấu hình: ${elem.configuration || 'Chưa có'}`}
                    >
                      <span className="text-[10px] font-mono opacity-60 self-start">{elem.z}</span>
                      <b className="text-sm font-black font-mono leading-none">{elem.symbol}</b>
                      <small className="text-[9px] truncate max-w-full opacity-80">{elem.name}</small>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reference Metal Activity Series */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider font-mono mr-2">
                  Dãy hoạt động kim loại:
                </span>
                {METAL_SERIES.map((sym) => {
                  const el = catalog.elements.find(e => e.symbol === sym);
                  return (
                    <button
                      key={sym}
                      onClick={() => el && handleSelectElement(el)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border transition-all cursor-pointer ${
                        sym === 'H'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : activeKind === 'element' && selectedElement?.symbol === sym
                            ? 'bg-rose-600 text-white border-rose-500'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700/60'
                      }`}
                      title={el?.name || sym}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* View Mode: Compounds */}
        {viewMode === 'compounds' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-[420px] overflow-y-auto p-1 custom-scrollbar">
            {filteredCompounds.map((comp) => {
              const isSelected = activeKind === 'compound' && selectedCompound?.id === comp.id;
              return (
                <button
                  key={comp.id}
                  data-compound-select={comp.id}
                  onClick={() => handleSelectCompound(comp)}
                  className={`flex flex-col p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-600/30 border-sky-400 ring-2 ring-sky-400 scale-[1.02] shadow-lg shadow-sky-950'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-mono font-black text-sm text-white">{comp.id}</span>
                    <FlaskConical className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <small className="text-[11px] text-slate-300 truncate w-full">{comp.name}</small>
                  <span className="text-[9px] font-mono text-slate-500 mt-1">
                    {comp.kind === 'ionic' ? 'Ion' : 'Phân tử'}
                  </span>
                </button>
              );
            })}
          </div>
        )}

      </section>

    </div>
  );
}
