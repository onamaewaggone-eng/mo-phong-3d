'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { RotateCcw, Sparkles, Loader2, Maximize2 } from 'lucide-react';
import { CompoundDossier, ElementDossier } from './ScienceDossierModal';
import compoundsDataRaw from '../../../../shared-data/compounds.json';
import elementsDataRaw from '../../../../shared-data/elements.json';

const compoundsData = compoundsDataRaw as unknown as CompoundDossier[];
const elementsData = elementsDataRaw as unknown as ElementDossier[];

export interface Chemistry3DViewerProps {
  id?: string;
  data: CompoundDossier | ElementDossier;
  type: 'compound' | 'element';
  elements?: ElementDossier[];
  height?: string;
  className?: string;
  autoSpin?: boolean;
  showControls?: boolean;
  onOpenDossier?: () => void;
}

interface ChemistryViewerInstance {
  atom: (e: ElementDossier) => void;
  molecule: (c: unknown) => void;
  resetView: () => void;
  pauseElectrons?: (paused: boolean) => void;
  suspendDrawing: (suspend: boolean) => void;
  spin?: boolean;
  clouds?: boolean;
  resize?: () => void;
  dispose: () => void;
}

export function Chemistry3DViewer({
  id = 'chemistry-3d-viewer',
  data,
  type,
  elements,
  height = 'h-72',
  className = '',
  autoSpin = true,
  showControls = true,
  onOpenDossier,
}: Chemistry3DViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<ChemistryViewerInstance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(autoSpin);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Merge full data from catalog to ensure 3D viewer has complete coordinates/atoms
  const resolvedCompound = useMemo(() => {
    if (type !== 'compound') return null;
    const compData = data as CompoundDossier;
    const match = compoundsData.find((c) => c.id === compData.id);
    return { ...match, ...compData };
  }, [data, type]);

  const resolvedElement = useMemo(() => {
    if (type !== 'element') return null;
    const elemData = data as ElementDossier;
    const match = elementsData.find((e) => e.symbol === elemData.symbol);
    return { ...match, ...elemData };
  }, [data, type]);

  const effectiveElements = useMemo(() => {
    return elements && elements.length > 0 ? elements : elementsData;
  }, [elements]);

  // Initialize ChemistryViewer instance
  useEffect(() => {
    let isMounted = true;

    const initViewer = async () => {
      if (!mountRef.current) return;
      try {
        setIsLoading(true);
        setLoadError(null);

        // Dynamically import client viewer script
        // @ts-expect-error browser dynamic import
        const mod = await import(/* webpackIgnore: true */ '/sites/merge/js/viewer.js');
        if (!isMounted || !mountRef.current) return;

        if (!mod?.ChemistryViewer) {
          throw new Error('Không tìm thấy ChemistryViewer trong viewer.js');
        }

        // Clean previous children if any
        if (!viewerRef.current) {
          mountRef.current.replaceChildren();
          const viewer = new mod.ChemistryViewer(mountRef.current, effectiveElements, {
            transparentStage: true,
          }) as ChemistryViewerInstance;

          viewer.spin = autoSpin;
          viewerRef.current = viewer;
        }

        // Render target substance
        if (type === 'compound' && resolvedCompound) {
          viewerRef.current.molecule(resolvedCompound);
        } else if (type === 'element' && resolvedElement) {
          viewerRef.current.atom(resolvedElement);
        }

        // Force resize update to adapt container bounds
        setTimeout(() => {
          if (viewerRef.current?.resize) {
            viewerRef.current.resize();
          }
        }, 80);

        setIsLoading(false);
      } catch (err: unknown) {
        console.error('Lỗi khởi tạo Chemistry3DViewer:', err);
        if (isMounted) {
          setLoadError(err instanceof Error ? err.message : 'Không thể nạp mô hình 3D.');
          setIsLoading(false);
        }
      }
    };

    initViewer();

    return () => {
      isMounted = false;
    };
  }, [autoSpin, effectiveElements, resolvedCompound, resolvedElement, type]);

  // Update molecule or element when data or type changes on existing viewer
  useEffect(() => {
    if (!viewerRef.current) return;

    try {
      if (type === 'compound' && resolvedCompound) {
        viewerRef.current.molecule(resolvedCompound);
      } else if (type === 'element' && resolvedElement) {
        viewerRef.current.atom(resolvedElement);
      }
      viewerRef.current.resetView();
      if (viewerRef.current.resize) {
        viewerRef.current.resize();
      }
    } catch (err) {
      console.warn('Lỗi cập nhật mô hình 3D:', err);
    }
  }, [resolvedCompound, resolvedElement, type]);

  // Clean up WebGL viewer on complete unmount
  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.dispose();
        } catch (e) {
          console.warn('Lỗi giải phóng viewer 3D:', e);
        }
        viewerRef.current = null;
      }
    };
  }, []);

  // Handlers
  const handleToggleSpin = () => {
    if (!viewerRef.current) return;
    const next = !isSpinning;
    setIsSpinning(next);
    viewerRef.current.spin = next;
  };

  const handleResetView = () => {
    if (!viewerRef.current) return;
    viewerRef.current.resetView();
  };

  const currentLabel = type === 'compound' 
    ? (resolvedCompound?.name || resolvedCompound?.id || '')
    : (resolvedElement?.name || resolvedElement?.symbol || '');

  const currentFormula = type === 'compound'
    ? (resolvedCompound?.id || '')
    : (resolvedElement?.symbol || '');

  return (
    <div
      id={id}
      data-testid="chemistry-3d-container"
      className={`relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#050811] via-[#090f1d] to-[#04060c] border border-rose-500/30 shadow-xl ${height} ${className} flex flex-col`}
    >
      {/* 3D Top Info Header */}
      <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs font-black text-rose-300">
            {currentFormula}
          </span>
          <span className="text-slate-400 text-xs truncate max-w-[140px] sm:max-w-[200px]">
            {currentLabel}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
            3D CPK
          </span>
        </div>

        {showControls && (
          <div className="flex items-center gap-1 pointer-events-auto bg-slate-950/80 backdrop-blur-md p-1 rounded-lg border border-slate-800 shadow-md">
            <button
              type="button"
              onClick={handleToggleSpin}
              className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                isSpinning
                  ? 'bg-rose-600/30 text-rose-300 border border-rose-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={isSpinning ? 'Tạm dừng xoay' : 'Bật tự động xoay 360°'}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetView}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Đặt lại góc nhìn mô hình"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            {onOpenDossier && (
              <button
                type="button"
                onClick={onOpenDossier}
                className="p-1.5 rounded-md text-slate-400 hover:text-rose-300 hover:bg-rose-500/20 transition-colors cursor-pointer"
                title="Mở hồ sơ khoa học chi tiết"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* WebGL Mount Container */}
      <div
        ref={mountRef}
        data-stage="three-canvas"
        className="w-full h-full flex-1 cursor-grab active:cursor-grabbing overflow-hidden"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm z-20 pointer-events-none">
          <Loader2 className="w-7 h-7 text-rose-400 animate-spin mb-2" />
          <span className="text-xs text-slate-300 font-medium">Đang dựng mô hình 3D...</span>
        </div>
      )}

      {/* Error State */}
      {loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-950/90 z-20 text-center">
          <p className="text-xs text-rose-400 mb-2">{loadError}</p>
          <button
            type="button"
            onClick={() => {
              setLoadError(null);
              setIsLoading(true);
            }}
            className="px-3 py-1 rounded bg-slate-800 text-xs text-slate-200 hover:bg-slate-700"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Bottom Hint */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center pointer-events-none z-10 text-[10px] text-slate-400 px-1 font-mono">
        <span className="bg-slate-950/60 backdrop-blur-sm px-2 py-0.5 rounded">
          Kéo để xoay · Cuộn để thu phóng
        </span>
        <span className="bg-slate-950/60 backdrop-blur-sm px-2 py-0.5 rounded text-rose-400 font-semibold">
          MeshPhysicalMaterial
        </span>
      </div>
    </div>
  );
}
