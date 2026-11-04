'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MergeHeader, TabType } from './MergeHeader';
import { Sidebar } from './Sidebar';
import { UpcomingGroup } from './UpcomingGroup';
import { TheoryWorkspace } from './TheoryWorkspace';
import { SynthesisSkeleton } from './SynthesisSkeleton';
import { SynthesisErrorBoundary } from './SynthesisErrorBoundary';
import { ScienceDossierModal, DossierData, CompoundDossier, ElementDossier } from './ScienceDossierModal';
import { ExploreWorkspace } from './ExploreWorkspace';
import { CurriculumData, CompoundData, ElementData } from '../../../../shared-data';

interface BuildWorkspaceInstance {
  open: () => void;
  close: () => void;
  session: unknown;
  root: HTMLElement;
}

interface ReactionWorkspaceInstance {
  open: () => void;
  close: () => void;
  root: HTMLElement;
}

declare global {
  interface Window {
    buildWorkspace?: (
      catalog: unknown,
      handlers?: Record<string, unknown>,
      container?: HTMLElement | null
    ) => BuildWorkspaceInstance;
    reactionWorkspace?: (
      catalog: unknown,
      container?: HTMLElement | null
    ) => ReactionWorkspaceInstance;
  }
}

interface CatalogData {
  elements: ElementDossier[];
  compounds: CompoundDossier[];
  reactions?: unknown[];
  curriculum?: CurriculumData;
}

export function MergeWorkspace() {
  const [mounted, setMounted] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string>('cau-tao-chat');
  const [activeTab, setActiveTab] = useState<TabType>('build');
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Dossier Modal State
  const [dossierData, setDossierData] = useState<DossierData | null>(null);
  const [showDossier, setShowDossier] = useState(false);

  // Catalog Data Ref
  const [catalog, setCatalog] = useState<CatalogData | null>(null);
  const catalogRef = useRef<CatalogData | null>(null);

  // Instances
  const workspaceInstanceRef = useRef<BuildWorkspaceInstance | null>(null);
  const reactionInstanceRef = useRef<ReactionWorkspaceInstance | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fullscreen toggle handler
  const handleToggleFullscreen = () => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Initialize Reaction Workspace when switching to 'react' tab
  const initReactionWorkspace = useCallback(async () => {
    if (!catalogRef.current) return;
    const cat = catalogRef.current;

    if (typeof window.reactionWorkspace !== 'function') {
      try {
        // @ts-expect-error browser dynamic import
        const mod = await import(/* webpackIgnore: true */ '/sites/merge/js/reaction-workspace.js');
        if (mod && typeof mod.reactionWorkspace === 'function') {
          window.reactionWorkspace = mod.reactionWorkspace;
        }
      } catch (e) {
        console.error('Lỗi khi nạp dynamic import reaction-workspace.js:', e);
      }
    }

    if (typeof window.reactionWorkspace === 'function') {
      const mountNode = document.getElementById('reaction-mount');
      if (mountNode && !reactionInstanceRef.current) {
        mountNode.innerHTML = '';
        const instance = window.reactionWorkspace(cat, mountNode);
        reactionInstanceRef.current = instance;
        if (instance && typeof instance.open === 'function') {
          instance.open();
        }
      } else if (reactionInstanceRef.current) {
        reactionInstanceRef.current.open();
      }
    }
  }, []);

  // Handle Tab Switch
  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);

    if (tab === 'build') {
      if (reactionInstanceRef.current) {
        reactionInstanceRef.current.close();
      }
      if (typeof document !== 'undefined') {
        document.dispatchEvent(new Event('chemistry-reaction-close'));
      }
      if (workspaceInstanceRef.current && typeof workspaceInstanceRef.current.open === 'function') {
        workspaceInstanceRef.current.open();
      }
    } else if (tab === 'react') {
      if (workspaceInstanceRef.current) {
        workspaceInstanceRef.current.close();
      }
      if (typeof document !== 'undefined') {
        document.dispatchEvent(new Event('chemistry-builder-close'));
      }
      initReactionWorkspace();
    } else {
      // 'explore' or 'theory'
      if (workspaceInstanceRef.current) {
        workspaceInstanceRef.current.close();
      }
      if (reactionInstanceRef.current) {
        reactionInstanceRef.current.close();
      }
      if (typeof document !== 'undefined') {
        document.dispatchEvent(new Event('chemistry-builder-close'));
        document.dispatchEvent(new Event('chemistry-reaction-close'));
      }
    }
  }, [initReactionWorkspace]);

  // Initialize Data & Workspaces
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        setLoading(true);

        const res = await fetch('/sites/merge/data/catalog.json');
        if (!res.ok) {
          throw new Error('Không thể tải catalog.json');
        }
        const data: CatalogData = await res.json();
        if (!isMounted) return;

        setCatalog(data);
        catalogRef.current = data;

        // Load buildWorkspace script if not ready
        if (typeof window.buildWorkspace !== 'function') {
          try {
            // @ts-expect-error browser dynamic import
            const mod = await import(/* webpackIgnore: true */ '/sites/merge/js/build-workspace.js');
            if (mod && typeof mod.buildWorkspace === 'function') {
              window.buildWorkspace = mod.buildWorkspace;
            }
          } catch (e) {
            console.error('Lỗi khi nạp dynamic import build-workspace.js:', e);
          }
        }

        // Initialize build workspace
        if (typeof window.buildWorkspace === 'function') {
          const mountNode = document.getElementById('build-mount');
          if (mountNode) {
            mountNode.innerHTML = '';

            const handlers = {
              selectElement: (symbol: string) => {
                console.log('Selected element in build:', symbol);
              },
              showCompound: (compound: { id: string; name: string }) => {
                console.log('Formed compound in build:', compound.name);
              },
              inspect: (compound: { id: string; name: string }) => {
                // User clicked "Hồ sơ khoa học ↗"
                const found = catalogRef.current?.compounds?.find(
                  (c) => c.id === compound.id || c.name === compound.name
                );
                if (found) {
                  setDossierData({ type: 'compound', data: found });
                } else {
                  setDossierData({
                    type: 'compound',
                    data: {
                      id: compound.id,
                      name: compound.name,
                      physical: 'Hợp chất hóa học đã tổng hợp trong xưởng ghép chất.',
                      explain: 'Cấu tạo từ các liên kết nguyên tử tương ứng.',
                      solubility: 'soluble',
                      molar_mass: 0,
                    },
                  });
                }
                setShowDossier(true);
              },
              visibility: (open: boolean) => {
                console.log('Workspace visibility:', open);
              },
              exit: () => {
                console.log('Exit/Reset clicked');
              },
            };

            const instance = window.buildWorkspace(data, handlers, mountNode);
            workspaceInstanceRef.current = instance;

            if (instance && typeof instance.open === 'function') {
              instance.open();
            }
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Lỗi khởi tạo workspace:', err);
        if (isMounted) setLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
      if (workspaceInstanceRef.current && typeof workspaceInstanceRef.current.close === 'function') {
        try {
          workspaceInstanceRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Listen to external events for opening dossier
  useEffect(() => {
    const handleOpenInfo = (event: Event) => {
      const custom = event as CustomEvent<{ compound?: CompoundDossier; symbol?: string }>;
      if (custom.detail?.compound) {
        setDossierData({ type: 'compound', data: custom.detail.compound });
        setShowDossier(true);
      } else if (custom.detail?.symbol) {
        const found = catalogRef.current?.elements?.find(
          (e) => e.symbol === custom.detail?.symbol
        );
        if (found) {
          setDossierData({ type: 'element', data: found });
          setShowDossier(true);
        }
      }
    };

    window.addEventListener('chemistry-open-information', handleOpenInfo);
    window.addEventListener('chemistry-render-element-dossier', handleOpenInfo);
    return () => {
      window.removeEventListener('chemistry-open-information', handleOpenInfo);
      window.removeEventListener('chemistry-render-element-dossier', handleOpenInfo);
    };
  }, []);

  const handleSelectGroup = (id: string) => {
    setActiveGroup(id);
    if (id === 'cau-tao-chat') {
      if (activeTab === 'build') {
        if (workspaceInstanceRef.current && typeof workspaceInstanceRef.current.open === 'function') {
          workspaceInstanceRef.current.open();
        }
      } else if (activeTab === 'react') {
        initReactionWorkspace();
      }
    } else {
      if (workspaceInstanceRef.current && typeof workspaceInstanceRef.current.close === 'function') {
        workspaceInstanceRef.current.close();
      }
      if (reactionInstanceRef.current && typeof reactionInstanceRef.current.close === 'function') {
        reactionInstanceRef.current.close();
      }
    }
  };

  // If not mounted yet (SSR), render fallback
  if (!mounted || typeof document === 'undefined') {
    return <SynthesisSkeleton />;
  }

  // Anti-black-screen: React Portal directly into body with fixed inset: 0
  return createPortal(
    <div
      id="ct99-app-root"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'row',
        minHeight: 0,
        minWidth: 0,
        backgroundColor: '#030712',
        color: '#f8fafc',
      }}
      className="fixed inset-0 z-10 flex flex-row overflow-hidden bg-[#030712] text-slate-100"
    >
      {/* CỘT TRÁI: SIDEBAR 8 NHÓM */}
      <Sidebar
        activeGroup={activeGroup}
        onSelectGroup={handleSelectGroup}
      />

      {/* CỘT PHẢI: HEADER + VÙNG NỘI DUNG */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden bg-[#030712]">
        
        {/* Header 4 tabs */}
        <MergeHeader
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          activeTab={activeTab}
          onSelectTab={handleTabChange}
        />

        {/* Content Area */}
        <main className="flex-1 min-h-0 min-w-0 overflow-y-auto relative bg-[#030712]">
          {/* Upcoming Group Screen (toggled by display to prevent destroying DOM nodes) */}
          <div
            id="upcoming-wrapper"
            style={{
              display: activeGroup !== 'cau-tao-chat' ? 'block' : 'none',
              height: '100%',
            }}
          >
            <UpcomingGroup
              groupId={activeGroup}
              onBackToMain={() => handleSelectGroup('cau-tao-chat')}
            />
          </div>

          {/* Main Studio (Always preserved in DOM so #build-mount and Three.js canvas are not destroyed) */}
          <div
            id="studio-wrapper"
            style={{
              display: activeGroup === 'cau-tao-chat' ? 'block' : 'none',
              height: '100%',
            }}
          >
            <SynthesisErrorBoundary>
              {loading && <SynthesisSkeleton />}

              {/* TAB 1: KHÁM PHÁ (Explore Workspace) */}
              <div
                id="explore-mount"
                className="w-full flex-1 relative"
                style={{ display: activeTab === 'explore' ? 'block' : 'none' }}
              >
                {catalog && (
                  <ExploreWorkspace
                    catalog={catalog}
                    onOpenDossier={(d) => {
                      setDossierData(d);
                      setShowDossier(true);
                    }}
                    isActive={activeTab === 'explore'}
                  />
                )}
              </div>

              {/* TAB 2: GHÉP CHẤT (Build Workspace) */}
              <div
                id="build-mount"
                className="w-full flex-1 relative min-h-[750px]"
                style={{
                  minHeight: '750px',
                  display: activeTab === 'build' ? 'block' : 'none',
                }}
              />

              {/* TAB 3: PHẢN ỨNG HÓA HỌC (Reaction Workspace) */}
              <div
                id="reaction-mount"
                className="w-full flex-1 relative min-h-[750px]"
                style={{
                  minHeight: '750px',
                  display: activeTab === 'react' ? 'block' : 'none',
                }}
              />

              {/* TAB 4: LÝ THUYẾT (Theory Workspace Lớp 7-12) */}
              <div
                id="theory-mount"
                className="w-full flex-1 relative h-full"
                style={{
                  height: '100%',
                  display: activeTab === 'theory' ? 'block' : 'none',
                }}
              >
                {catalog?.curriculum && (
                  <TheoryWorkspace
                    curriculum={catalog.curriculum}
                    compounds={(catalog.compounds as unknown as CompoundData[]) || []}
                    elements={(catalog.elements as unknown as ElementData[]) || []}
                    onOpenDossier={(d) => {
                      setDossierData(d);
                      setShowDossier(true);
                    }}
                  />
                )}
              </div>
            </SynthesisErrorBoundary>
          </div>
        </main>
      </div>

      {/* Modal Hồ Sơ Khoa Học */}
      <ScienceDossierModal
        isOpen={showDossier}
        onClose={() => setShowDossier(false)}
        dossier={dossierData}
        elements={(catalog?.elements as unknown as ElementDossier[]) || []}
      />
    </div>,
    document.body
  );
}
