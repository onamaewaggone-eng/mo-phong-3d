'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Atom, 
  Sparkles, 
  Calculator, 
  ExternalLink, 
  Layers, 
  Bookmark, 
  CheckCircle2, 
  FlaskConical,
  Play,
  Pause,
  RotateCcw,
  Box
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonData, CurriculumData, CompoundData, ElementData } from '../../../../shared-data';
import { DossierData, CompoundDossier, ElementDossier } from './ScienceDossierModal';
import { Chemistry3DViewer } from './Chemistry3DViewer';

interface TheoryWorkspaceProps {
  curriculum: CurriculumData;
  compounds: CompoundData[];
  elements: ElementData[];
  onOpenDossier: (dossier: DossierData) => void;
}

// Scientific constants from learning-tools.js
export function bohrValues(n: number) {
  if (!Number.isInteger(n) || n < 1 || n > 4) {
    n = Math.max(1, Math.min(4, Math.round(n)));
  }
  return {
    n,
    radius: 0.05291772109 * n * n, // nm
    speed: 2187691.263 / n,         // m/s
    energy: -13.605693123 / (n * n) // eV
  };
}

export function calculateStudy(kind: string, a: number, b: number) {
  if (!Number.isFinite(a) || !Number.isFinite(b) || a < 0 || b <= 0) {
    throw new Error('Vui lòng nhập số hữu hạn: lượng không âm, mẫu số lớn hơn 0.');
  }
  if (kind === 'mol') {
    return {
      value: a / b,
      unit: 'mol',
      secondary: (a / b) * 24.79,
      note: 'V khí ở 25 °C, 1 bar (L) theo chuẩn SGK mới. Áp dụng khi chất ở thể khí.'
    };
  }
  if (kind === 'percent') {
    if (a > b) {
      throw new Error('Khối lượng chất tan không được lớn hơn khối lượng dung dịch.');
    }
    return {
      value: (100 * a) / b,
      unit: '%',
      note: 'C% = (m chất tan / m dung dịch) × 100%.'
    };
  }
  if (kind === 'molarity') {
    return {
      value: a / b,
      unit: 'mol/L',
      note: 'Cₘ = n chất tan / V dung dịch (V tính bằng L).'
    };
  }
  if (kind === 'density') {
    return {
      value: a / b,
      unit: 'lần',
      note: 'd(A/B) = M(A) / M(B), so sánh ở cùng điều kiện nhiệt độ và áp suất.'
    };
  }
  throw new Error('Chưa có phép tính này.');
}

/**
 * Interactive Bohr Model Canvas Component
 * Real HTML5 canvas simulating Bohr's atomic quantization, orbits n=1..4,
 * electron animation, energy levels, radius, speed and photon emission.
 */
function BohrModelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nLevel, setNLevel] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [photonAnimation, setPhotonAnimation] = useState<{ active: boolean; fromN: number; toN: number; progress: number } | null>(null);

  const bohrData = useMemo(() => bohrValues(nLevel), [nLevel]);

  // Handle quantum transition
  const handleSelectN = (nextN: number) => {
    if (nextN !== nLevel) {
      setPhotonAnimation({ active: true, fromN: nLevel, toN: nextN, progress: 0 });
      setNLevel(nextN);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const baseRadii = [28, 54, 85, 120]; // proportional to n^2 visualization
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Space background grid
      ctx.save();
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 2. Draw 4 Bohr Orbit rings
      baseRadii.forEach((r, idx) => {
        const currentN = idx + 1;
        const isCurrent = currentN === nLevel;

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        
        if (isCurrent) {
          ctx.strokeStyle = '#38bdf8'; // Sky 400
          ctx.lineWidth = 2.5;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 12;
        } else {
          ctx.strokeStyle = 'rgba(100, 116, 139, 0.35)'; // Slate 500
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
        }
        ctx.stroke();

        // Label orbit ring (n=1, n=2, etc.)
        ctx.fillStyle = isCurrent ? '#7dd3fc' : '#64748b';
        ctx.font = '9px monospace';
        ctx.fillText(`n=${currentN}`, centerX + r + 4, centerY - 2);
        ctx.restore();
      });

      // 3. Draw Central Nucleus
      ctx.save();
      // Nucleus Glow
      const grad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, 18);
      grad.addColorStop(0, '#f43f5e'); // Rose 500
      grad.addColorStop(0.5, '#e11d48');
      grad.addColorStop(1, 'rgba(225, 29, 72, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
      ctx.fill();

      // Core sphere
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+Z', centerX, centerY);
      ctx.restore();

      // 4. Draw Orbiting Electron on active n level
      const currentRadius = baseRadii[nLevel - 1];
      const electronX = centerX + currentRadius * Math.cos(angle);
      const electronY = centerY + currentRadius * Math.sin(angle);

      ctx.save();
      // Electron glow
      const eGrad = ctx.createRadialGradient(electronX, electronY, 1, electronX, electronY, 10);
      eGrad.addColorStop(0, '#38bdf8');
      eGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = eGrad;
      ctx.beginPath();
      ctx.arc(electronX, electronY, 10, 0, Math.PI * 2);
      ctx.fill();

      // Electron core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(electronX, electronY, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Label "e⁻"
      ctx.fillStyle = '#bae6fd';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText('e⁻', electronX + 8, electronY - 6);
      ctx.restore();

      // 5. Draw Photon Emission / Absorption if transitioning
      if (photonAnimation && photonAnimation.active) {
        ctx.save();
        const pProgress = photonAnimation.progress;
        const photonDist = currentRadius + pProgress * 80;
        const photonAngle = angle + Math.PI / 4;
        const px = centerX + photonDist * Math.cos(photonAngle);
        const py = centerY + photonDist * Math.sin(photonAngle);

        ctx.strokeStyle = photonAnimation.fromN > photonAnimation.toN ? '#facc15' : '#a855f7'; // yellow for emission, purple for absorption
        ctx.lineWidth = 2;
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        // Draw wavy photon packet
        for (let t = -12; t <= 12; t += 2) {
          const waveX = px + t * Math.cos(photonAngle) + 4 * Math.sin(t * 0.8) * Math.sin(photonAngle);
          const waveY = py + t * Math.sin(photonAngle) - 4 * Math.sin(t * 0.8) * Math.cos(photonAngle);
          if (t === -12) ctx.moveTo(waveX, waveY);
          else ctx.lineTo(waveX, waveY);
        }
        ctx.stroke();

        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('hν (Photon)', px + 10, py - 4);
        ctx.restore();

        photonAnimation.progress += 0.03;
        if (photonAnimation.progress > 1) {
          setPhotonAnimation(null);
        }
      }

      // Update angle based on Bohr velocity: higher n = slower velocity
      if (isRunning) {
        const angularSpeed = (0.045 / Math.sqrt(nLevel));
        angle += angularSpeed;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [nLevel, isRunning, photonAnimation]);

  return (
    <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Atom className="w-4 h-4 text-sky-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            MÔ PHỎNG TƯƠNG TÁC · MÔ HÌNH NGUYÊN TỬ BOHR (H)
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
          HTML5 Canvas 2D
        </span>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4">
        {/* Canvas Display */}
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[#020617] to-[#0b0f19] border border-slate-800 shadow-inner flex items-center justify-center p-2">
          <canvas
            ref={canvasRef}
            id="bohr-canvas"
            width={340}
            height={260}
            className="w-full max-w-[340px] h-[260px] block"
          />
          <div className="absolute top-2 left-2 text-[10px] text-slate-400 font-mono bg-black/50 px-2 py-0.5 rounded">
            Quỹ đạo n = {nLevel} ({nLevel === 1 ? 'Lớp K' : nLevel === 2 ? 'Lớp L' : nLevel === 3 ? 'Lớp M' : 'Lớp N'})
          </div>
        </div>

        {/* Real physics data & controls */}
        <div className="flex-1 space-y-3 w-full">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
              Chọn mức lượng tử (Lớp electron n):
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  id={`bohr-btn-n${n}`}
                  type="button"
                  onClick={() => handleSelectN(n)}
                  className={cn(
                    "py-2 px-1 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer flex flex-col items-center justify-center",
                    nLevel === n
                      ? "bg-sky-600 text-white border-sky-400 shadow-md shadow-sky-950 scale-105"
                      : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700/80"
                  )}
                >
                  <span className="text-sm">n = {n}</span>
                  <small className="text-[9px] opacity-75">
                    {n === 1 ? 'Lớp K' : n === 2 ? 'Lớp L' : n === 3 ? 'Lớp M' : 'Lớp N'}
                  </small>
                </button>
              ))}
            </div>
          </div>

          {/* Physics parameters readout */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5 font-mono">
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">Bán kính dừng rₙ:</span>
              <b className="text-sky-300">{bohrData.radius.toFixed(4)} nm</b>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">Vận tốc electron vₙ:</span>
              <b className="text-amber-300">{(bohrData.speed / 1e6).toFixed(3)} × 10⁶ m/s</b>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">Mức năng lượng Eₙ:</span>
              <b className="text-rose-400">{bohrData.energy.toFixed(3)} eV</b>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="bohr-toggle-motion"
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all cursor-pointer"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isRunning ? 'Tạm dừng chuyển động' : 'Tiếp tục chuyển động'}</span>
            </button>
            <button
              id="bohr-reset-n"
              type="button"
              onClick={() => handleSelectN(1)}
              className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-all cursor-pointer"
              title="Về trạng thái cơ bản n=1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TheoryWorkspace({
  curriculum,
  compounds,
  elements,
  onOpenDossier,
}: TheoryWorkspaceProps) {
  const lessons = useMemo(() => curriculum?.lessons || [], [curriculum]);

  // Active lesson state
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    lessons[0]?.id || '7-atom'
  );

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Expanded grades in the accordion
  const [expandedGrades, setExpandedGrades] = useState<Record<string, boolean>>({
    '7': true,
    '8': true,
    '9': true,
    '10': true,
    '11': true,
    '12': true,
    'extra': true,
  });

  const toggleGrade = (gradeKey: string) => {
    setExpandedGrades((prev) => ({
      ...prev,
      [gradeKey]: !prev[gradeKey],
    }));
  };

  // Group lessons by grade
  const groupedLessons = useMemo(() => {
    const map: Record<string, LessonData[]> = {
      '7': [],
      '8': [],
      '9': [],
      '10': [],
      '11': [],
      '12': [],
      'extra': [],
    };

    const q = searchQuery.toLowerCase().trim();

    lessons.forEach((lesson) => {
      const matchSearch =
        !q ||
        lesson.title.toLowerCase().includes(q) ||
        lesson.focus?.toLowerCase().includes(q) ||
        lesson.id.toLowerCase().includes(q) ||
        lesson.substances?.some((s) => s.toLowerCase().includes(q));

      if (matchSearch) {
        if (lesson.extension) {
          map.extra.push(lesson);
        } else {
          const key = String(lesson.grade);
          if (map[key]) {
            map[key].push(lesson);
          } else {
            map.extra.push(lesson);
          }
        }
      }
    });

    return map;
  }, [lessons, searchQuery]);

  // Current active lesson
  const activeLesson = useMemo(() => {
    return lessons.find((l) => l.id === selectedLessonId) || lessons[0];
  }, [lessons, selectedLessonId]);

  // Active 3D substance selection within current lesson
  const [overrideSubstance3D, setOverrideSubstance3D] = useState<string | null>(null);

  // Derived selected 3D substance: user pick if valid for current lesson, else first substance
  const selectedSubstance3D = useMemo(() => {
    if (overrideSubstance3D && activeLesson?.substances?.includes(overrideSubstance3D)) {
      return overrideSubstance3D;
    }
    return activeLesson?.substances?.[0] || null;
  }, [overrideSubstance3D, activeLesson]);

  const activeSubstanceData = useMemo(() => {
    if (!selectedSubstance3D) return null;
    const c = compounds.find((cp) => cp.id === selectedSubstance3D);
    if (c) {
      return { type: 'compound' as const, data: c as unknown as CompoundDossier };
    }
    const e = elements.find((el) => el.symbol === selectedSubstance3D);
    if (e) {
      return { type: 'element' as const, data: e as unknown as ElementDossier };
    }
    return {
      type: 'compound' as const,
      data: {
        id: selectedSubstance3D,
        name: selectedSubstance3D,
        kind: 'covalent',
        solubility: 'soluble',
        atoms: {},
      } as unknown as CompoundDossier,
    };
  }, [selectedSubstance3D, compounds, elements]);

  // Interactive Calculator State (Curriculum Tools)
  const [calcType, setCalcType] = useState<'mol' | 'percent' | 'molarity' | 'density'>('mol');
  const [valA, setValA] = useState<number>(18);
  const [valB, setValB] = useState<number>(18);
  const [phScale, setPhScale] = useState<number>(7);

  // Compute calculation using useMemo
  const calcResult = useMemo(() => {
    try {
      const r = calculateStudy(calcType, valA, valB);
      return `${Number(r.value.toPrecision(6))} ${r.unit}${r.secondary !== undefined ? ` · ${Number(r.secondary.toPrecision(6))} L khí (25°C, 1 bar)` : ''}. ${r.note}`;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return `Lỗi: ${err.message}`;
      }
      return 'Lỗi tính toán.';
    }
  }, [calcType, valA, valB]);

  const handleCalculate = () => {};

  // Dynamic input labels
  const calcLabels = useMemo(() => {
    switch (calcType) {
      case 'mol':
        return { a: 'Khối lượng chất tan m (g)', b: 'Khối lượng mol M (g/mol)' };
      case 'percent':
        return { a: 'Khối lượng chất tan m (g)', b: 'Khối lượng dung dịch m_dd (g)' };
      case 'molarity':
        return { a: 'Số mol chất tan n (mol)', b: 'Thể tích dung dịch V (L)' };
      case 'density':
        return { a: 'Khối lượng mol khí A (g/mol)', b: 'Khối lượng mol khí B (g/mol)' };
    }
  }, [calcType]);

  // pH description
  const phDescription = useMemo(() => {
    if (phScale < 7) {
      return { text: 'Môi trường Acid (pH < 7)', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
    }
    if (phScale > 7) {
      return { text: 'Môi trường Kiềm / Base (pH > 7)', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/30' };
    }
    return { text: 'Môi trường Trung tính ở 25 °C (pH = 7)', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
  }, [phScale]);

  // Substance click handler -> opens 3D dossier
  const handleSubstanceClick = (id: string) => {
    const compound = compounds.find((c) => c.id === id);
    if (compound) {
      onOpenDossier({
        type: 'compound',
        data: compound as unknown as CompoundDossier,
      });
      return;
    }

    const element = elements.find((e) => e.symbol === id);
    if (element) {
      onOpenDossier({
        type: 'element',
        data: element as unknown as ElementDossier,
      });
      return;
    }

    onOpenDossier({
      type: 'compound',
      data: {
        id,
        name: id,
        physical: 'Hợp chất hóa học trong chương trình giáo dục phổ thông.',
        explain: 'Cấu tạo phân tử hoặc tinh thể tương ứng.',
        solubility: 'soluble',
        molar_mass: 0,
      },
    });
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row overflow-hidden bg-[#030712] text-slate-100">
      
      {/* CỘT TRÁI: ACCORDION DANH MỤC BÀI HỌC LỚP 7-12 */}
      <aside 
        id="theory-sidebar"
        className="w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-slate-800/80 bg-slate-950/60 flex flex-col min-h-0 overflow-hidden"
        aria-label="Danh mục chương trình bài học Hóa học 7-12"
      >
        {/* Search header */}
        <div className="p-3 border-b border-slate-800/80 bg-slate-950/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-rose-400 font-mono flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Chương trình Hóa học 7–12</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold">
              {lessons.length} bài học
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="theory-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm bài học, chất, công thức..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Tree Accordion of Grades */}
        <div className="flex-1 min-h-0 overflow-y-auto p-2.5 space-y-2 custom-scrollbar">
          {[
            { key: '7', title: 'LỚP 7 (KHTN - Chất & Cấu tạo)', count: groupedLessons['7'].length },
            { key: '8', title: 'LỚP 8 (KHTN - Biến đổi & Phản ứng)', count: groupedLessons['8'].length },
            { key: '9', title: 'LỚP 9 (KHTN - Kim loại & Hợp chất)', count: groupedLessons['9'].length },
            { key: '10', title: 'LỚP 10 (Hóa học - Nguyên tử & Liên kết)', count: groupedLessons['10'].length },
            { key: '11', title: 'LỚP 11 (Hóa học - Cân bằng & Hữu cơ)', count: groupedLessons['11'].length },
            { key: '12', title: 'LỚP 12 (Hóa học - Ester, Polyme & Kim loại)', count: groupedLessons['12'].length },
            { key: 'extra', title: 'CHUYÊN ĐỀ MỞ RỘNG', count: groupedLessons.extra.length },
          ].map(({ key, title, count }) => {
            const isExpanded = expandedGrades[key];
            const gradeLessons = groupedLessons[key] || [];

            if (gradeLessons.length === 0 && searchQuery) return null;

            return (
              <div 
                key={key} 
                data-grade-block={key}
                className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleGrade(key)}
                  className="w-full flex items-center justify-between p-2.5 text-left bg-slate-900/60 hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-rose-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span className="text-xs font-bold text-slate-200">
                      {title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold">
                    {count}
                  </span>
                </button>

                {isExpanded && (
                  <div className="p-1 space-y-0.5 bg-slate-950/30">
                    {gradeLessons.map((l) => {
                      const isSelected = l.id === selectedLessonId;
                      return (
                        <button
                          key={l.id}
                          type="button"
                          id={`theory-lesson-btn-${l.id}`}
                          data-lesson-id={l.id}
                          onClick={() => setSelectedLessonId(l.id)}
                          className={cn(
                            "w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex items-start gap-2 cursor-pointer",
                            isSelected
                              ? "bg-rose-600 text-white font-bold shadow-md shadow-rose-950/60"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                          )}
                        >
                          <Bookmark className={cn(
                            "w-3.5 h-3.5 mt-0.5 flex-shrink-0",
                            isSelected ? "text-white" : "text-slate-500"
                          )} />
                          <div className="min-w-0 flex-1">
                            <div className="line-clamp-2 leading-snug">
                              {l.title}
                            </div>
                            {l.chapter && (
                              <div className={cn(
                                "text-[10px] font-mono mt-0.5",
                                isSelected ? "text-rose-200" : "text-slate-500"
                              )}>
                                Chương {l.chapter}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* CỘT PHẢI: NỘI DUNG LÝ THUYẾT CHI TIẾT & CÔNG CỤ TƯƠNG TÁC */}
      <main 
        id="theory-content-pane"
        className="flex-1 min-h-0 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-gradient-to-b from-[#030712] via-slate-950 to-[#030712] custom-scrollbar"
        aria-label="Chi tiết nội dung bài học lý thuyết"
      >
        {activeLesson ? (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header của bài học */}
            <div className="bg-slate-900/70 backdrop-blur-xl border border-rose-500/30 rounded-2xl p-5 sm:p-6 shadow-xl shadow-rose-950/30">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-rose-600 text-white uppercase tracking-wider">
                  {activeLesson.extension ? 'CHUYÊN ĐỀ MỞ RỘNG' : `LỚP ${activeLesson.grade}`}
                </span>
                {activeLesson.chapter && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    Chương {activeLesson.chapter}
                  </span>
                )}
                <span className="text-xs font-mono text-slate-400">
                  Mã bài: {activeLesson.id}
                </span>
              </div>

              <h1 id="lesson-detail-title" className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight mb-3">
                {activeLesson.title}
              </h1>

              {/* Trọng tâm bài học */}
              <div className="flex items-start gap-3 bg-rose-950/30 border border-rose-500/30 rounded-xl p-3.5 text-rose-100 text-sm">
                <Sparkles className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-rose-300 mr-1.5 font-bold">Trọng tâm:</strong>
                  {activeLesson.focus}
                </div>
              </div>
            </div>

            {/* MÔ HÌNH BOHR TƯƠNG TÁC (CANVAS 2D) */}
            <BohrModelCanvas />

            {/* Các chất & nguyên tố liên quan với mô hình 3D tương tác */}
            {activeLesson.substances && activeLesson.substances.length > 0 && (
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Atom className="w-4 h-4 text-rose-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      CHẤT & PHÂN TỬ TRONG BÀI HỌC (MÔ HÌNH 3D)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold">
                    {activeLesson.substances.length} chất · Chuẩn CPK
                  </span>
                </div>

                {/* Danh sách các chất dưới dạng thẻ tương tác */}
                <div className="flex flex-wrap gap-2">
                  {activeLesson.substances.map((substanceId) => {
                    const c = compounds.find((cp) => cp.id === substanceId);
                    const e = elements.find((el) => el.symbol === substanceId);
                    const label = c ? `${c.display_formula || c.id} · ${c.name}` : e ? `${e.symbol} · ${e.name}` : substanceId;
                    const isSelected = selectedSubstance3D === substanceId;

                    return (
                      <div
                        key={substanceId}
                        className={cn(
                          "inline-flex items-center rounded-xl border transition-all text-xs font-medium overflow-hidden shadow-sm",
                          isSelected
                            ? "border-rose-500 bg-rose-950/40 text-white ring-1 ring-rose-500/50"
                            : "border-slate-700/80 bg-slate-800/80 text-slate-300 hover:border-slate-600 hover:bg-slate-800"
                        )}
                      >
                        <button
                          type="button"
                          id={`theory-substance-btn-${substanceId}`}
                          data-lesson-substance={substanceId}
                          data-view-3d={substanceId}
                          onClick={() => setOverrideSubstance3D(substanceId)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-2 cursor-pointer transition-colors",
                            isSelected ? "text-rose-200 font-bold" : "hover:text-white"
                          )}
                          title={`Xem mô hình 3D của ${label}`}
                        >
                          <FlaskConical className={cn(
                            "w-3.5 h-3.5",
                            isSelected ? "text-rose-400 scale-110" : "text-slate-400"
                          )} />
                          <span>{label}</span>
                          <span className={cn(
                            "text-[10px] font-mono px-1.5 py-0.2 rounded ml-1",
                            isSelected ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : "bg-slate-900 text-slate-400"
                          )}>
                            3D
                          </span>
                        </button>

                        <button
                          type="button"
                          id={`theory-dossier-btn-${substanceId}`}
                          data-dossier-modal={substanceId}
                          onClick={() => handleSubstanceClick(substanceId)}
                          className="px-2 py-2 border-l border-slate-700/80 hover:bg-rose-600/30 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title={`Mở hồ sơ khoa học chi tiết của ${label}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* KHUNG MÔ HÌNH 3D TRONG BÀI HỌC */}
                {activeSubstanceData && (
                  <div 
                    id="theory-3d-stage-box"
                    className="rounded-2xl border border-rose-500/30 bg-slate-950/90 overflow-hidden shadow-2xl space-y-3 p-3.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Box className="w-4 h-4 text-rose-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          MÔ PHỎNG 3D:
                        </span>
                        <span className="font-mono text-sm font-black text-rose-300">
                          {activeSubstanceData.type === 'compound'
                            ? (activeSubstanceData.data as CompoundDossier).id
                            : (activeSubstanceData.data as ElementDossier).symbol}
                        </span>
                        <span className="text-xs text-slate-300">
                          {activeSubstanceData.type === 'compound'
                            ? (activeSubstanceData.data as CompoundDossier).name
                            : (activeSubstanceData.data as ElementDossier).name}
                        </span>
                      </div>

                      <button
                        type="button"
                        id="theory-open-dossier-btn"
                        onClick={() => selectedSubstance3D && handleSubstanceClick(selectedSubstance3D)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
                      >
                        <span>Mở Hồ sơ khoa học (3D Modal)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Three.js Interactive 3D Viewer */}
                    <div className="w-full">
                      <Chemistry3DViewer
                        id="theory-lesson-viewer-canvas"
                        data={activeSubstanceData.data}
                        type={activeSubstanceData.type}
                        elements={elements as unknown as ElementDossier[]}
                        height="h-[280px] sm:h-[340px]"
                        autoSpin={true}
                        showControls={true}
                        onOpenDossier={() => selectedSubstance3D && handleSubstanceClick(selectedSubstance3D)}
                      />
                    </div>

                    {/* Metadata strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                      {activeSubstanceData.type === 'compound' && (
                        <>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-mono">Dạng hình học:</span>
                            <span className="font-semibold text-rose-300 capitalize">
                              {(activeSubstanceData.data as CompoundDossier).shape || 'Phân tử'}
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-mono">Loại liên kết:</span>
                            <span className="font-semibold text-sky-300 capitalize">
                              {(activeSubstanceData.data as CompoundDossier).kind || 'Cộng hóa trị'}
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-mono">Khối lượng mol:</span>
                            <span className="font-mono font-bold text-amber-300">
                              {(activeSubstanceData.data as CompoundDossier).molar_mass ? `≈ ${(activeSubstanceData.data as CompoundDossier).molar_mass} g/mol` : 'Đang cập nhật'}
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-mono">Tính tan (25°C):</span>
                            <span className="font-semibold text-emerald-300 capitalize truncate block">
                              {(activeSubstanceData.data as CompoundDossier).solubility || 'Tan tốt'}
                            </span>
                          </div>
                        </>
                      )}
                      {activeSubstanceData.type === 'element' && (
                        <>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-mono">Số hiệu Z:</span>
                            <span className="font-mono font-bold text-rose-300">
                              {(activeSubstanceData.data as ElementDossier).z}
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-mono">Khối lượng:</span>
                            <span className="font-mono font-bold text-amber-300">
                              {(activeSubstanceData.data as ElementDossier).mass} u
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-mono">Cấu hình e:</span>
                            <span className="font-mono font-bold text-sky-300 truncate block">
                              {(activeSubstanceData.data as ElementDossier).configuration || 'N/A'}
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-mono">Trạng thái:</span>
                            <span className="font-semibold text-emerald-300 capitalize">
                              {(activeSubstanceData.data as ElementDossier).state || 'Khí'}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Ghi nhớ cốt lõi */}
            {activeLesson.remember && (
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    GHI NHỚ CỐT LÕI
                  </h3>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                  {activeLesson.remember}
                </p>
              </div>
            )}

            {/* Hoạt động thực hành & Khám phá */}
            {activeLesson.activity && (
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    HOẠT ĐỘNG THỰC HÀNH & MÔ HÌNH HÓA
                  </h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                  {activeLesson.activity}
                </p>
              </div>
            )}

            {/* Tool Hóa Học Tích Hợp: Máy Tính Mol, Dung Dịch & Thước Đo pH */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-rose-400" />
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    MÁY TÍNH HÓA HỌC · MOL & DUNG DỊCH · PH (INPUT TƯƠNG TÁC)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold">
                  Công cụ số
                </span>
              </div>

              {/* Calculator Form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="calculation-kind" className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Chọn phép tính
                  </label>
                  <select
                    id="calculation-kind"
                    value={calcType}
                    onChange={(e) => setCalcType(e.target.value as 'mol' | 'percent' | 'molarity' | 'density')}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                  >
                    <option value="mol">n = m / M (Tính số mol & thể tích)</option>
                    <option value="percent">C% = (m_ct / m_dd) × 100%</option>
                    <option value="molarity">Cₘ = n / V (Nồng độ mol)</option>
                    <option value="density">d(A/B) = M_A / M_B (Tỉ khối khí)</option>
                  </select>
                </div>

                <div>
                  <label id="calculation-a-label" htmlFor="calculation-a" className="block text-[11px] font-semibold text-slate-400 mb-1">
                    {calcLabels.a}
                  </label>
                  <input
                    id="calculation-a"
                    type="number"
                    min="0"
                    step="any"
                    value={valA}
                    onChange={(e) => setValA(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 font-mono focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label id="calculation-b-label" htmlFor="calculation-b" className="block text-[11px] font-semibold text-slate-400 mb-1">
                    {calcLabels.b}
                  </label>
                  <input
                    id="calculation-b"
                    type="number"
                    min="0.001"
                    step="any"
                    value={valB}
                    onChange={(e) => setValB(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 font-mono focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  id="calculate-study"
                  type="button"
                  onClick={handleCalculate}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-950 transition-all cursor-pointer"
                >
                  Tính kết quả
                </button>
              </div>

              {/* Calculator Output */}
              <div 
                id="calculation-result"
                className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/20 text-rose-300 font-mono text-xs font-bold leading-relaxed"
              >
                {calcResult}
              </div>

              {/* Interactive pH Visualizer */}
              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Thước mô phỏng pH ở 25 °C:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">pH =</span>
                    <output id="ph-value" className="font-mono font-black text-sm text-rose-400">
                      {phScale}
                    </output>
                  </div>
                </div>

                <input
                  id="ph-scale"
                  type="range"
                  min="0"
                  max="14"
                  step="0.1"
                  value={phScale}
                  onChange={(e) => setPhScale(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                />

                <div 
                  id="ph-result"
                  className={cn("p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all", phDescription.bg)}
                >
                  <span className={phDescription.color}>
                    {phDescription.text}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {phScale < 7 ? '[H⁺] > 10⁻⁷ M' : phScale === 7 ? '[H⁺] = [OH⁻] = 10⁻⁷ M' : '[OH⁻] > 10⁻⁷ M'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Thanh pH là mô hình màu chuẩn giáo dục theo thang đổi màu chỉ thị ở 25 °C.
                </p>
              </div>
            </div>

            {/* Nguồn tài liệu & Chương trình */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-1.5">
                <span>Chương trình:</span>
                <span className="text-slate-300 font-semibold">
                  {curriculum.basis || 'GDPT 2018 & SGK Kết nối tri thức'}
                </span>
              </div>
              {activeLesson.source && (
                <a
                  href={activeLesson.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <span>{activeLesson.source_label || 'Tài liệu chuẩn Bộ GDĐT'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

          </div>
        ) : (
          <div className="text-center p-12 text-slate-400">
            Chọn một bài học từ danh mục bên trái để xem nội dung chi tiết.
          </div>
        )}
      </main>
    </div>
  );
}
