'use client';

import React, { useEffect, useState } from 'react';
import { 
  X, 
  FlaskConical, 
  Sparkles, 
  Atom, 
  Droplets, 
  FileText, 
  ExternalLink, 
  Layers, 
  Scale, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { Chemistry3DViewer } from './Chemistry3DViewer';

export interface CompoundDossier {
  id: string;
  name: string;
  atoms?: Record<string, number>;
  kind?: string;
  shape?: string;
  solubility?: string;
  explain?: string;
  physical?: string;
  category?: string;
  grades?: number[];
  extension?: boolean;
  molar_mass?: number;
  sources?: string[];
  aliases?: string[];
  applications?: Array<{
    icon?: string;
    title: string;
    kind?: string;
    detail: string;
    source?: string;
  }>;
  representation_note?: string;
  crystal?: {
    name?: string;
    code?: string;
    source?: string;
    space_group?: string;
    year?: string;
  };
}

export interface ElementDossier {
  z: number;
  symbol: string;
  name: string;
  english?: string;
  mass: number;
  period?: number;
  group?: number | string;
  category?: string;
  state?: string;
  configuration?: string;
  shells?: number[];
  color?: string;
  detail?: string;
  uses?: string;
  history?: {
    year?: string | number;
    who?: string;
    event?: string;
    sources?: string[];
  };
  applications?: Array<{
    title: string;
    detail: string;
    source?: string;
  }>;
  sources?: string[];
}

export type DossierData = 
  | { type: 'compound'; data: CompoundDossier }
  | { type: 'element'; data: ElementDossier };

interface ScienceDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossier: DossierData | null;
  elements?: ElementDossier[];
}

const solubilityLabels: Record<string, string> = {
  soluble: 'Tan tốt trong nước (dung dịch ở nhiệt độ thường)',
  low: 'Ít tan trong nước (độ tan nhỏ ở nhiệt độ thường)',
  insoluble: 'Không tan hoặc thực tế không tan trong nước',
  gas: 'Chất khí (ít tan hoặc tan tùy chất)',
  reacts: 'Phản ứng với nước (không tồn tại dạng dung dịch bền)',
  decomposes: 'Bị nước phân hủy',
  solution: 'Dung dịch',
};

const kindLabels: Record<string, string> = {
  ionic: 'Hợp chất ion (Mạng tinh thể / Đơn vị công thức)',
  covalent: 'Hợp chất cộng hóa trị (Phân tử)',
  network: 'Mạng cộng hóa trị mở rộng',
  metal: 'Kim loại / Mạng kim loại',
};

const categoryLabels: Record<string, string> = {
  acid: 'Acid (Axit)',
  base: 'Base (Bazơ)',
  oxide: 'Oxide (Oxit)',
  salt: 'Muối',
  nonmetal: 'Phi kim',
  metal: 'Kim loại',
  organic: 'Hợp chất hữu cơ',
};

function formatFormula(str: string) {
  // Convert numbers in formulas to subscripts
  const parts = str.split(/(\d+)/);
  return (
    <span>
      {parts.map((p, i) =>
        /^\d+$/.test(p) ? <sub key={i} className="text-[0.75em] bottom-[-0.2em]">{p}</sub> : p
      )}
    </span>
  );
}

export function ScienceDossierModal({ isOpen, onClose, dossier, elements }: ScienceDossierModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'apps'>('overview');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !dossier) return null;

  const isCompound = dossier.type === 'compound';
  const compound = isCompound ? dossier.data : null;
  const element = !isCompound ? dossier.data : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#090d16] border border-rose-500/40 rounded-2xl shadow-2xl shadow-rose-950/80 overflow-hidden text-slate-100 animate-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-900 border-b border-rose-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-rose-600/30 flex-shrink-0">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-black tracking-widest text-rose-400 uppercase bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  HỒ SƠ KHOA HỌC
                </span>
                <span className="text-xs text-slate-400 font-medium">CT99 Chemistry 4.0</span>
              </div>
              <h2 id="dossier-modal-title" className="text-lg font-bold text-white flex items-center gap-2">
                <span>{isCompound ? compound?.name : element?.name}</span>
                <span className="text-rose-400 font-mono text-base font-black">
                  ({formatFormula(isCompound ? compound?.id || '' : element?.symbol || '')})
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white bg-slate-800/60 hover:bg-rose-600/30 border border-slate-700/60 hover:border-rose-500/50 transition-all"
            title="Đóng hồ sơ (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-800/80 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 text-xs md:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Tổng quan & Cấu tạo
          </button>
          <button
            onClick={() => setActiveTab('apps')}
            className={`pb-2.5 px-3 text-xs md:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'apps'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Ứng dụng & Nguồn tài liệu
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5 text-sm custom-scrollbar">
          {activeTab === 'overview' ? (
            <>
              {/* Quick Hero Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/30 to-slate-900 border border-rose-500/20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-mono text-2xl font-black shadow-inner">
                    {formatFormula(isCompound ? compound?.id || '' : element?.symbol || '')}
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">
                      {isCompound ? compound?.name : `${element?.name} · ${element?.english || ''}`}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {isCompound ? (
                        <>
                          <span className="text-rose-400 font-medium">
                            {categoryLabels[compound?.category || ''] || compound?.category || 'Hợp chất'}
                          </span>
                          {' · '}
                          <span>{kindLabels[compound?.kind || ''] || compound?.kind || 'Cấu trúc'}</span>
                        </>
                      ) : (
                        <>
                          <span>Số hiệu: <b className="text-rose-400">{element?.z}</b></span>
                          {' · '}
                          <span>Chu kỳ: <b>{element?.period}</b> · Nhóm: <b>{element?.group}</b></span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isCompound && compound?.molar_mass && (
                    <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/60 text-right">
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Khối lượng mol</div>
                      <div className="font-mono text-xs font-bold text-rose-300">
                        ≈ {compound.molar_mass} g/mol
                      </div>
                    </div>
                  )}
                  {!isCompound && element?.mass && (
                    <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/60 text-right">
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Khối lượng nguyên tử</div>
                      <div className="font-mono text-xs font-bold text-rose-300">
                        {element.mass} u
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* KHUNG HIỂN THỊ MÔ HÌNH 3D (CPK & MeshPhysicalMaterial) */}
              <div 
                id="dossier-3d-box"
                className="rounded-2xl overflow-hidden border border-rose-500/30 bg-slate-950/70 shadow-xl shadow-black/40"
              >
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/60">
                  <div className="flex items-center gap-2">
                    <Atom className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      MÔ HÌNH 3D {isCompound ? 'PHÂN TỬ' : 'NGUYÊN TỬ'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold">
                      Chuẩn CPK · Glass Sphere
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                    Xoay 360° · Thu phóng tương tác
                  </span>
                </div>
                <div className="p-3">
                  <Chemistry3DViewer
                    id="dossier-modal-3d-viewer"
                    data={dossier.data}
                    type={dossier.type}
                    elements={elements}
                    height="h-[280px] sm:h-[320px]"
                    autoSpin={true}
                    showControls={true}
                  />
                </div>
              </div>

              {/* Grid 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. TÍNH CHẤT VẬT LÝ */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/30 transition-all flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Tính chất vật lí</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed text-xs md:text-sm">
                    {isCompound ? (
                      compound?.physical || 'Dữ liệu chất tinh khiết; dạng hydrate, dung dịch và pha tinh thể được phân biệt.'
                    ) : (
                      <>
                        <p>{element?.detail || 'Trạng thái chuẩn và tính chất vật lí cơ bản.'}</p>
                        <p className="mt-1 text-slate-400">Trạng thái: <b className="text-slate-200">{element?.state === 'solid' ? 'Chất rắn' : element?.state === 'liquid' ? 'Chất lỏng' : 'Chất khí'}</b></p>
                      </>
                    )}
                  </div>
                </div>

                {/* 2. TÍNH TAN TRONG NƯỚC (Đối với Compound) HOẶC CẤU HÌNH ELECTRON (Đối với Element) */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/30 transition-all flex flex-col gap-2">
                  {isCompound ? (
                    <>
                      <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                        <Droplets className="w-4 h-4" />
                        <span>Tính tan trong nước (25 °C)</span>
                      </div>
                      <div className="text-slate-300 leading-relaxed text-xs md:text-sm">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/30 font-medium mb-1.5 text-xs">
                          {compound?.solubility ? solubilityLabels[compound.solubility] || compound.solubility : 'Chưa có thông tin'}
                        </span>
                        <p className="text-xs text-slate-400">
                          Dữ liệu định tính ở 25 °C, gần 1 atm; điều kiện nhiệt độ hoặc dung môi khác chưa hỗ trợ.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                        <Layers className="w-4 h-4" />
                        <span>Cấu hình electron</span>
                      </div>
                      <div className="text-slate-300 leading-relaxed text-xs md:text-sm">
                        <div className="font-mono text-sm font-bold text-rose-300 bg-black/40 px-3 py-1.5 rounded-lg border border-slate-800">
                          {element?.configuration || 'Chưa có dữ liệu'}
                        </div>
                        {element?.shells && (
                          <p className="mt-1.5 text-xs text-slate-400">
                            Phân bố các lớp e: <b className="text-slate-200">{element.shells.join(' · ')}</b>
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* 3. THÀNH PHẦN NGUYÊN TỐ */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/30 transition-all flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                    <Atom className="w-4 h-4" />
                    <span>Thành phần nguyên tố</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed text-xs md:text-sm">
                    {isCompound && compound?.atoms ? (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {Object.entries(compound.atoms).map(([sym, count]) => (
                          <span
                            key={sym}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-mono"
                          >
                            <span className="font-bold text-rose-400">{sym}</span>
                            <span className="text-slate-400">× {count}</span>
                          </span>
                        ))}
                        <span className="text-xs text-slate-400 self-center pl-1">
                          ({Object.keys(compound.atoms).length} loại nguyên tố)
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-300">
                        Đơn chất nguyên chất số hiệu {element?.z}, khối lượng {element?.mass} u.
                      </p>
                    )}
                  </div>
                </div>

                {/* 4. CẤU TẠO & LIÊN KẾT */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/30 transition-all flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                    <Scale className="w-4 h-4" />
                    <span>Cấu tạo & liên kết</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed text-xs md:text-sm">
                    {isCompound ? (
                      <>
                        <p>{compound?.explain || 'Mô hình minh họa cấu tạo liên kết giữa các nguyên tử.'}</p>
                        {compound?.representation_note && (
                          <p className="mt-1.5 text-xs text-slate-400 italic">
                            * {compound.representation_note}
                          </p>
                        )}
                      </>
                    ) : (
                      <p>{element?.uses || 'Tham gia tạo nên các hợp chất và phân tử trong tự nhiên.'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Crystal Lattice Info if present */}
              {isCompound && compound?.crystal && (
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400">
                  <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-rose-400" />
                    <span>Dữ liệu ô mạng tinh thể: {compound.crystal.name}</span>
                  </div>
                  <p>Nhóm không gian: {compound.crystal.space_group} · Mã COD: {compound.crystal.code}</p>
                  {compound.crystal.source && (
                    <a
                      href={compound.crystal.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-400 hover:underline mt-1 inline-flex items-center gap-1"
                    >
                      Xem cơ sở dữ liệu COD ↗
                    </a>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Applications & Sources Tab */}
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-wider font-semibold text-rose-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ứng dụng thực tế đời sống & công nghiệp</span>
                </div>

                {/* Applications list */}
                {((isCompound ? compound?.applications : element?.applications) || []).length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {((isCompound ? compound?.applications : element?.applications) || []).map((app, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-rose-500/30 transition-all"
                      >
                        <h4 className="font-bold text-white text-sm mb-1">{app.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{app.detail}</p>
                        {app.source && (
                          <a
                            href={app.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-rose-400 hover:underline mt-2 font-mono"
                          >
                            Tài liệu minh chứng <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    Chất được sử dụng trong nghiên cứu khoa học, giảng dạy và thực nghiệm hóa học.
                  </p>
                )}

                {/* Sources list */}
                <div className="pt-3 border-t border-slate-800">
                  <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Nguồn dữ liệu đối chiếu khoa học</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {((isCompound ? compound?.sources : element?.sources) || []).map((src, i) => (
                      <a
                        key={i}
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-xs text-slate-300 hover:text-white border border-slate-700/60 hover:border-rose-500/40 transition-all font-mono"
                      >
                        <span>{src.replace(/^https?:\/\//, '').split('/')[0]}</span>
                        <ExternalLink className="w-3 h-3 text-rose-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-rose-400" />
            <span>Biên soạn bởi TRƯƠNG CÔNG TIẾN · CT99 Chemistry</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs shadow-md shadow-rose-950 transition-all"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
