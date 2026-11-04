export interface LabVisualTimeline {
  vessel?: string;
  scene?: string;
  duration: number;
  baseLevel?: number;
  level?: Array<{ t: number; v: number }>;
  liquid?: Array<{ t: number; c: string; a: number }>;
  pours?: Array<{ t0: number; t1: number; color: string; label?: string; kind?: string }>;
  precip?: Array<{ t0: number; t1: number; color: string; amount: number; milky?: number }>;
  bubbles?: Array<{ t0: number; t1: number; rate: number; size?: number; escapeColor?: string; fromSolid?: boolean }>;
  solid?: unknown;
  heat?: unknown;
  flame?: unknown;
  smoke?: unknown;
  sparks?: unknown;
  metals?: unknown;
  indicatorBar?: unknown;
  layers?: unknown;
  mirror?: unknown;
  litmus?: unknown;
  temp?: Array<{ t: number; v: number }>;
  caption?: Array<{ t: number; text: string }>;
  [key: string]: unknown;
}

export interface LabExperiment {
  id: string;
  grade: number;
  topic: string;
  title: string;
  cond?: string;
  safety?: string;
  chem: string[];
  steps: string[];
  eq: string[];
  observe: string[];
  explain: string;
  v: LabVisualTimeline;
}

export const EXPERIMENTS_85: LabExperiment[] = [
  {
    "id": "cuso4-naoh",
    "grade": 11,
    "topic": "Phản ứng trao đổi ion",
    "title": "CuSO₄ + NaOH → Cu(OH)₂↓ xanh lơ",
    "chem": [
      "Dung dịch CuSO₄ 0,1M",
      "Dung dịch NaOH 1M"
    ],
    "steps": [
      "Rót 2 mL dung dịch CuSO₄ vào ống nghiệm.",
      "Nhỏ từ từ dung dịch NaOH vào."
    ],
    "eq": [
      "CuSO4 + 2NaOH → Cu(OH)2 + Na2SO4"
    ],
    "observe": [
      "Dung dịch xanh lam xuất hiện kết tủa xanh lơ (keo) Cu(OH)₂."
    ],
    "explain": "Ion Cu²⁺ kết hợp với OH⁻ tạo hiđroxit không tan: Cu²⁺ + 2OH⁻ → Cu(OH)₂↓.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.35,
      "level": [
        {
          "t": 0,
          "v": 0.35
        },
        {
          "t": 3,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#2f86e0",
          "a": 0.5
        },
        {
          "t": 5,
          "c": "#7fb8f0",
          "a": 0.45
        },
        {
          "t": 9,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "NaOH 1M",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 2,
          "t1": 7,
          "color": "#4aa8ff",
          "amount": 0.7,
          "milky": 0.35
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Ống nghiệm chứa CuSO₄ (xanh lam)"
        },
        {
          "t": 2,
          "text": "Nhỏ NaOH → kết tủa xanh lơ Cu(OH)₂"
        },
        {
          "t": 8,
          "text": "Kết tủa lắng xuống đáy"
        }
      ]
    }
  },
  {
    "id": "fecl3-naoh",
    "grade": 11,
    "topic": "Phản ứng trao đổi ion",
    "title": "FeCl₃ + NaOH → Fe(OH)₃↓ nâu đỏ",
    "chem": [
      "Dung dịch FeCl₃ 0,1M",
      "Dung dịch NaOH 1M"
    ],
    "steps": [
      "Nhỏ NaOH vào ống nghiệm chứa FeCl₃."
    ],
    "eq": [
      "FeCl3 + 3NaOH → Fe(OH)3 + 3NaCl"
    ],
    "observe": [
      "Dung dịch vàng nâu xuất hiện kết tủa nâu đỏ Fe(OH)₃."
    ],
    "explain": "Fe³⁺ + 3OH⁻ → Fe(OH)₃↓ (nâu đỏ).",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.58
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#d9a441",
          "a": 0.55
        },
        {
          "t": 6,
          "c": "#e8c98a",
          "a": 0.4
        },
        {
          "t": 9,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "NaOH",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 2,
          "t1": 7,
          "color": "#8b3a1a",
          "amount": 0.9,
          "milky": 0.2
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "FeCl₃ (vàng nâu)"
        },
        {
          "t": 2.5,
          "text": "Kết tủa nâu đỏ Fe(OH)₃"
        },
        {
          "t": 8,
          "text": "Kết tủa lắng"
        }
      ]
    }
  },
  {
    "id": "feso4-naoh",
    "grade": 12,
    "topic": "Sắt",
    "title": "FeSO₄ + NaOH → Fe(OH)₂↓ trắng xanh hóa nâu",
    "chem": [
      "Dung dịch FeSO₄ mới pha",
      "Dung dịch NaOH"
    ],
    "steps": [
      "Nhỏ NaOH vào FeSO₄ và để ngoài không khí."
    ],
    "eq": [
      "FeSO4 + 2NaOH → Fe(OH)2 + Na2SO4",
      "4Fe(OH)2 + O2 + 2H2O → 4Fe(OH)3"
    ],
    "observe": [
      "Kết tủa trắng xanh Fe(OH)₂, để ngoài không khí hóa nâu đỏ dần thành Fe(OH)₃."
    ],
    "explain": "Fe(OH)₂ bị oxi không khí oxi hóa thành Fe(OH)₃ nâu đỏ.",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.58
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#a9cfa0",
          "a": 0.45
        },
        {
          "t": 6,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "NaOH",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 2,
          "t1": 5,
          "color": "#cfe0c0",
          "amount": 0.7,
          "milky": 0.25
        },
        {
          "t0": 8,
          "t1": 11,
          "color": "#8b3a1a",
          "amount": 0.6
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "FeSO₄ (lục nhạt)"
        },
        {
          "t": 3,
          "text": "Fe(OH)₂ trắng xanh"
        },
        {
          "t": 8,
          "text": "Hóa nâu đỏ trong không khí: Fe(OH)₃"
        }
      ]
    }
  },
  {
    "id": "alcl3-naoh",
    "grade": 12,
    "topic": "Nhôm",
    "title": "AlCl₃ + NaOH: kết tủa keo rồi tan trong kiềm dư",
    "chem": [
      "Dung dịch AlCl₃",
      "Dung dịch NaOH"
    ],
    "steps": [
      "Nhỏ từ từ NaOH vào AlCl₃.",
      "Tiếp tục nhỏ NaOH dư."
    ],
    "eq": [
      "AlCl3 + 3NaOH → Al(OH)3 + 3NaCl",
      "Al(OH)3 + NaOH → Na[Al(OH)4]"
    ],
    "observe": [
      "Xuất hiện kết tủa keo trắng Al(OH)₃.",
      "Nhỏ NaOH dư kết tủa tan dần, dung dịch trong suốt."
    ],
    "explain": "Al(OH)₃ lưỡng tính: tan trong dung dịch bazơ mạnh dư tạo aluminat.",
    "v": {
      "vessel": "tube",
      "duration": 13,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 4,
          "v": 0.55
        },
        {
          "t": 9,
          "v": 0.7
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 4,
          "color": "#cfe8ff",
          "label": "NaOH vừa đủ",
          "kind": "drops"
        },
        {
          "t0": 6.5,
          "t1": 9,
          "color": "#cfe8ff",
          "label": "NaOH dư",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 2,
          "t1": 5,
          "color": "#f6f6f0",
          "amount": 0.8,
          "milky": 0.6
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "AlCl₃ không màu"
        },
        {
          "t": 3,
          "text": "Kết tủa keo trắng Al(OH)₃"
        },
        {
          "t": 9.5,
          "text": "NaOH dư: kết tủa tan"
        }
      ]
    }
  },
  {
    "id": "bacl2-na2so4",
    "grade": 11,
    "topic": "Phản ứng trao đổi ion",
    "title": "BaCl₂ + Na₂SO₄ → BaSO₄↓ trắng",
    "chem": [
      "Dung dịch BaCl₂",
      "Dung dịch Na₂SO₄"
    ],
    "steps": [
      "Nhỏ BaCl₂ vào Na₂SO₄."
    ],
    "eq": [
      "BaCl2 + Na2SO4 → BaSO4 + 2NaCl"
    ],
    "observe": [
      "Kết tủa trắng BaSO₄ không tan trong axit."
    ],
    "explain": "Ba²⁺ + SO₄²⁻ → BaSO₄↓. Dùng nhận biết ion sunfat.",
    "v": {
      "vessel": "tube",
      "duration": 9,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "BaCl₂",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 1.8,
          "t1": 6,
          "color": "#fafafa",
          "amount": 0.7,
          "milky": 0.5
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Na₂SO₄ không màu"
        },
        {
          "t": 2,
          "text": "Kết tủa trắng BaSO₄"
        }
      ]
    }
  },
  {
    "id": "agno3-nacl",
    "grade": 10,
    "topic": "Halogen",
    "title": "AgNO₃ + NaCl → AgCl↓ trắng (nhận biết Cl⁻)",
    "chem": [
      "Dung dịch AgNO₃",
      "Dung dịch NaCl"
    ],
    "steps": [
      "Nhỏ AgNO₃ vào dung dịch NaCl."
    ],
    "eq": [
      "AgNO3 + NaCl → AgCl + NaNO3"
    ],
    "observe": [
      "Kết tủa trắng dạng sữa AgCl, hóa xám ngoài ánh sáng."
    ],
    "explain": "Ag⁺ + Cl⁻ → AgCl↓ (không tan trong HNO₃, tan trong NH₃).",
    "v": {
      "vessel": "tube",
      "duration": 9,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "AgNO₃",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 1.5,
          "t1": 6,
          "color": "#f8f8f8",
          "amount": 0.55,
          "milky": 0.7
        }
      ],
      "caption": [
        {
          "t": 2,
          "text": "Kết tủa trắng AgCl (dạng sữa)"
        }
      ]
    }
  },
  {
    "id": "agno3-nai",
    "grade": 10,
    "topic": "Halogen",
    "title": "AgNO₃ + NaI → AgI↓ vàng đậm",
    "chem": [
      "Dung dịch AgNO₃",
      "Dung dịch NaI"
    ],
    "steps": [
      "Nhỏ AgNO₃ vào NaI."
    ],
    "eq": [
      "AgNO3 + NaI → AgI + NaNO3"
    ],
    "observe": [
      "Kết tủa vàng đậm AgI."
    ],
    "explain": "Dãy AgCl (trắng), AgBr (vàng nhạt), AgI (vàng đậm).",
    "v": {
      "vessel": "tube",
      "duration": 9,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "AgNO₃",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 1.5,
          "t1": 6,
          "color": "#e6c619",
          "amount": 0.7,
          "milky": 0.55
        }
      ],
      "caption": [
        {
          "t": 2,
          "text": "Kết tủa vàng đậm AgI"
        }
      ]
    }
  },
  {
    "id": "na2s-pbno3",
    "grade": 11,
    "topic": "Phản ứng trao đổi ion",
    "title": "Pb(NO₃)₂ + Na₂S → PbS↓ đen",
    "chem": [
      "Dung dịch Pb(NO₃)₂",
      "Dung dịch Na₂S"
    ],
    "steps": [
      "Nhỏ Na₂S vào Pb(NO₃)₂."
    ],
    "eq": [
      "Pb(NO3)2 + Na2S → PbS + 2NaNO3"
    ],
    "observe": [
      "Kết tủa đen PbS."
    ],
    "explain": "Pb²⁺ + S²⁻ → PbS↓ (đen). Dùng nhận biết H₂S bằng giấy tẩm Pb(NO₃)₂.",
    "v": {
      "vessel": "tube",
      "duration": 9,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "Na₂S",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 1.5,
          "t1": 6,
          "color": "#111",
          "amount": 0.8,
          "milky": 0.15
        }
      ],
      "caption": [
        {
          "t": 2,
          "text": "Kết tủa đen PbS"
        }
      ]
    }
  },
  {
    "id": "na2co3-hcl",
    "grade": 11,
    "topic": "Phản ứng trao đổi ion",
    "title": "Na₂CO₃ + HCl → sủi bọt khí CO₂",
    "chem": [
      "Dung dịch Na₂CO₃",
      "Dung dịch HCl"
    ],
    "steps": [
      "Nhỏ HCl vào Na₂CO₃."
    ],
    "eq": [
      "Na2CO3 + 2HCl → 2NaCl + CO2 + H2O"
    ],
    "observe": [
      "Sủi bọt khí không màu CO₂, làm đục nước vôi trong."
    ],
    "explain": "CO₃²⁻ + 2H⁺ → CO₂↑ + H₂O.",
    "v": {
      "vessel": "tube",
      "duration": 9,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.5
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "HCl",
          "kind": "drops"
        }
      ],
      "bubbles": [
        {
          "t0": 1.5,
          "t1": 7,
          "rate": 22,
          "size": 3.2
        }
      ],
      "caption": [
        {
          "t": 2,
          "text": "Sủi bọt mạnh: CO₂"
        }
      ]
    }
  },
  {
    "id": "caco3-hcl",
    "grade": 11,
    "topic": "Cacbon – Silic",
    "title": "CaCO₃ + HCl → CO₂ và đá vôi tan",
    "chem": [
      "Đá vôi CaCO₃",
      "Dung dịch HCl 2M"
    ],
    "steps": [
      "Cho viên đá vôi vào ống nghiệm chứa HCl."
    ],
    "eq": [
      "CaCO3 + 2HCl → CaCl2 + CO2 + H2O"
    ],
    "observe": [
      "Sủi bọt khí mạnh, viên đá vôi tan dần."
    ],
    "explain": "Axit mạnh đẩy axit yếu H₂CO₃ (phân hủy thành CO₂ và H₂O).",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.5,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "metals": [
        {
          "t0": 1,
          "shape": "chunk",
          "color": "#ebe6dd",
          "dissolveStart": 3,
          "dissolveEnd": 11,
          "label": "CaCO₃"
        }
      ],
      "bubbles": [
        {
          "t0": 2,
          "t1": 10,
          "rate": 24,
          "size": 3.4,
          "fromSolid": true
        }
      ],
      "caption": [
        {
          "t": 1,
          "text": "Thả đá vôi vào HCl"
        },
        {
          "t": 3,
          "text": "Khí CO₂ thoát ra, đá vôi tan"
        }
      ]
    }
  },
  {
    "id": "co2-limewater",
    "grade": 11,
    "topic": "Cacbon – Silic",
    "title": "CO₂ + nước vôi trong: đục rồi trong",
    "chem": [
      "Nước vôi trong Ca(OH)₂",
      "Khí CO₂ (sục)"
    ],
    "steps": [
      "Sục từ từ CO₂ vào nước vôi trong.",
      "Tiếp tục sục CO₂ dư."
    ],
    "eq": [
      "CO2 + Ca(OH)2 → CaCO3 + H2O",
      "CaCO3 + CO2 + H2O → Ca(HCO3)2"
    ],
    "observe": [
      "Nước vôi trong hóa đục (CaCO₃).",
      "Sục CO₂ dư: kết tủa tan, dung dịch trong trở lại."
    ],
    "explain": "CO₂ dư hòa tan CaCO₃ thành Ca(HCO₃)₂ tan.",
    "v": {
      "vessel": "cylinder",
      "duration": 15,
      "baseLevel": 0.6,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "bubbles": [
        {
          "t0": 1,
          "t1": 13,
          "rate": 12,
          "size": 3
        }
      ],
      "precip": [
        {
          "t0": 1.5,
          "t1": 6,
          "color": "#fafafa",
          "amount": 0.3,
          "milky": 0.85
        }
      ],
      "caption": [
        {
          "t": 1,
          "text": "Sục CO₂"
        },
        {
          "t": 4,
          "text": "Dung dịch hóa đục: CaCO₃↓"
        },
        {
          "t": 10,
          "text": "CO₂ dư: kết tủa tan, trong lại"
        }
      ]
    }
  },
  {
    "id": "nh4cl-naoh",
    "grade": 11,
    "topic": "Nitơ – Photpho",
    "title": "NH₄Cl + NaOH (đun nóng) → NH₃ mùi khai",
    "chem": [
      "Dung dịch NH₄Cl",
      "Dung dịch NaOH",
      "Quỳ tím ẩm"
    ],
    "steps": [
      "Trộn NH₄Cl với NaOH, đun nhẹ.",
      "Đưa giấy quỳ tím ẩm lên miệng ống."
    ],
    "eq": [
      "NH4Cl + NaOH → NaCl + NH3 + H2O"
    ],
    "cond": "t°",
    "observe": [
      "Có khí mùi khai bay ra, làm giấy quỳ tím ẩm hóa xanh."
    ],
    "explain": "NH₄⁺ + OH⁻ → NH₃↑ + H₂O. Dùng nhận biết ion amoni.",
    "safety": "NH₃ độc, làm thí nghiệm trong tủ hút.",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.4,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "heat": [
        {
          "t0": 1.5,
          "t1": 11
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 6,
          "v": 70
        },
        {
          "t": 11,
          "v": 85
        }
      ],
      "bubbles": [
        {
          "t0": 3,
          "t1": 11,
          "rate": 10,
          "size": 2.6,
          "escapeColor": "#e9f7ff"
        }
      ],
      "caption": [
        {
          "t": 1.5,
          "text": "Đun nóng hỗn hợp"
        },
        {
          "t": 4,
          "text": "Khí NH₃ thoát ra, mùi khai"
        }
      ]
    }
  },
  {
    "id": "fe3-kscn",
    "grade": 12,
    "topic": "Sắt",
    "title": "Fe³⁺ + SCN⁻ → dung dịch đỏ máu",
    "chem": [
      "Dung dịch FeCl₃",
      "Dung dịch KSCN"
    ],
    "steps": [
      "Nhỏ KSCN vào dung dịch Fe³⁺."
    ],
    "eq": [
      "FeCl3 + 3KSCN → Fe(SCN)3 + 3KCl"
    ],
    "observe": [
      "Dung dịch xuất hiện màu đỏ máu."
    ],
    "explain": "Tạo phức Fe(SCN)₃ màu đỏ máu — thuốc thử nhận biết Fe³⁺.",
    "v": {
      "vessel": "tube",
      "duration": 8,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.52
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#f0e0a0",
          "a": 0.45
        },
        {
          "t": 3,
          "c": "#b01a1a",
          "a": 0.75
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "KSCN",
          "kind": "drops"
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Fe³⁺ vàng nhạt"
        },
        {
          "t": 3,
          "text": "Đỏ máu Fe(SCN)₃"
        }
      ]
    }
  },
  {
    "id": "chromate",
    "grade": 12,
    "topic": "Crom",
    "title": "K₂CrO₄ ⇄ K₂Cr₂O₇: đổi màu theo pH",
    "chem": [
      "Dung dịch K₂CrO₄ (vàng)",
      "Dung dịch H₂SO₄ loãng",
      "Dung dịch NaOH"
    ],
    "steps": [
      "Thêm H₂SO₄ vào K₂CrO₄.",
      "Thêm NaOH vào lại."
    ],
    "eq": [
      "2K2CrO4 + H2SO4 → K2Cr2O7 + K2SO4 + H2O",
      "K2Cr2O7 + 2NaOH → K2CrO4 + Na2CrO4 + H2O"
    ],
    "observe": [
      "Vàng → da cam khi axit hóa.",
      "Da cam → vàng khi kiềm hóa."
    ],
    "explain": "2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O. Cân bằng chuyển dịch theo pH.",
    "v": {
      "vessel": "tube",
      "duration": 14,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 5,
          "v": 0.5
        },
        {
          "t": 11,
          "v": 0.6
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#f4d92a",
          "a": 0.65
        },
        {
          "t": 5,
          "c": "#f57c00",
          "a": 0.7
        },
        {
          "t": 7,
          "c": "#f57c00",
          "a": 0.7
        },
        {
          "t": 11,
          "c": "#f4d92a",
          "a": 0.65
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 4,
          "color": "#cfe8ff",
          "label": "H₂SO₄",
          "kind": "drops"
        },
        {
          "t0": 8,
          "t1": 10.5,
          "color": "#cfe8ff",
          "label": "NaOH",
          "kind": "drops"
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "CrO₄²⁻ vàng"
        },
        {
          "t": 5,
          "text": "Cr₂O₇²⁻ da cam (môi trường axit)"
        },
        {
          "t": 11,
          "text": "Về lại vàng (môi trường kiềm)"
        }
      ]
    }
  },
  {
    "id": "indicators",
    "grade": 10,
    "topic": "Axit – bazơ",
    "title": "Chất chỉ thị: quỳ tím & phenolphtalein",
    "chem": [
      "Dung dịch HCl 0,1M",
      "Quỳ tím",
      "Phenolphtalein",
      "Dung dịch NaOH 0,1M"
    ],
    "steps": [
      "Nhỏ quỳ vào HCl → đỏ.",
      "Nhỏ NaOH từ từ đến trung tính rồi dư → xanh."
    ],
    "eq": [
      "HCl + NaOH → NaCl + H2O"
    ],
    "observe": [
      "Quỳ: đỏ → tím → xanh khi tăng pH."
    ],
    "explain": "Quỳ tím: đỏ (pH<5), tím (≈7), xanh (pH>8). Phenolphtalein hồng khi pH>8,2.",
    "v": {
      "vessel": "beaker",
      "duration": 12,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 10,
          "v": 0.62
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#e53935",
          "a": 0.6
        },
        {
          "t": 5,
          "c": "#8e44ad",
          "a": 0.6
        },
        {
          "t": 9,
          "c": "#2979ff",
          "a": 0.65
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 10,
          "color": "#cfe8ff",
          "label": "NaOH 0,1M",
          "kind": "drops"
        }
      ],
      "indicatorBar": {
        "t0": 1,
        "t1": 10,
        "fromPH": 1,
        "toPH": 12
      },
      "caption": [
        {
          "t": 0,
          "text": "HCl + quỳ tím: đỏ"
        },
        {
          "t": 5,
          "text": "Gần trung tính: tím"
        },
        {
          "t": 9,
          "text": "Dư NaOH: xanh"
        }
      ]
    }
  },
  {
    "id": "phenolphthalein",
    "grade": 10,
    "topic": "Axit – bazơ",
    "title": "Phenolphtalein: hồng trong kiềm, mất màu khi trung hòa",
    "chem": [
      "Dung dịch NaOH",
      "Phenolphtalein",
      "Dung dịch HCl"
    ],
    "steps": [
      "Nhỏ phenolphtalein vào NaOH.",
      "Nhỏ HCl đến khi mất màu."
    ],
    "eq": [
      "NaOH + HCl → NaCl + H2O"
    ],
    "observe": [
      "Dung dịch hồng tím, nhỏ HCl đến khi mất màu."
    ],
    "explain": "Điểm kết thúc chuẩn độ: màu hồng biến mất khi pH < 8,2.",
    "v": {
      "vessel": "beaker",
      "duration": 12,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 10,
          "v": 0.62
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 2,
          "c": "#ff3d9a",
          "a": 0.6
        },
        {
          "t": 8,
          "c": "#ff3d9a",
          "a": 0.6
        },
        {
          "t": 9.5,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 0.5,
          "t1": 2,
          "color": "#ffd0e8",
          "label": "Phenolphtalein",
          "kind": "drops"
        },
        {
          "t0": 4,
          "t1": 9.5,
          "color": "#cfe8ff",
          "label": "HCl",
          "kind": "drops"
        }
      ],
      "indicatorBar": {
        "t0": 4,
        "t1": 9.5,
        "fromPH": 12,
        "toPH": 6
      },
      "caption": [
        {
          "t": 2,
          "text": "Môi trường bazơ: hồng"
        },
        {
          "t": 9.5,
          "text": "Trung hòa: mất màu"
        }
      ]
    }
  },
  {
    "id": "zn-hcl",
    "grade": 12,
    "topic": "Kim loại",
    "title": "Zn + HCl → ZnCl₂ + H₂",
    "chem": [
      "Kẽm hạt",
      "Dung dịch HCl 2M"
    ],
    "steps": [
      "Thả viên kẽm vào ống nghiệm chứa HCl."
    ],
    "eq": [
      "Zn + 2HCl → ZnCl2 + H2"
    ],
    "observe": [
      "Kẽm tan dần, sủi bọt khí H₂ không màu."
    ],
    "explain": "E°(Zn²⁺/Zn) = −0,76 V < E°(2H⁺/H₂) = 0 nên Zn khử được H⁺.",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.55,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "metals": [
        {
          "t0": 1,
          "shape": "granule",
          "color": "#b0b8c0",
          "dissolveStart": 3,
          "dissolveEnd": 11,
          "label": "Zn"
        }
      ],
      "bubbles": [
        {
          "t0": 2,
          "t1": 11,
          "rate": 18,
          "size": 3,
          "fromSolid": true
        }
      ],
      "caption": [
        {
          "t": 1,
          "text": "Thả kẽm vào HCl"
        },
        {
          "t": 3,
          "text": "Bọt khí H₂ thoát ra từ viên kẽm"
        }
      ]
    }
  },
  {
    "id": "mg-hcl",
    "grade": 12,
    "topic": "Kim loại",
    "title": "Mg + HCl: phản ứng mạnh, tỏa nhiệt",
    "chem": [
      "Mảnh magie",
      "Dung dịch HCl 2M"
    ],
    "steps": [
      "Cho dải Mg vào HCl."
    ],
    "eq": [
      "Mg + 2HCl → MgCl2 + H2"
    ],
    "observe": [
      "Sủi bọt mãnh liệt, ống nghiệm nóng lên, Mg tan nhanh."
    ],
    "explain": "Mg hoạt động mạnh hơn Zn; phản ứng tỏa nhiều nhiệt.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.55,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "metals": [
        {
          "t0": 1,
          "shape": "strip",
          "color": "#c9ced4",
          "dissolveStart": 2,
          "dissolveEnd": 8,
          "label": "Mg"
        }
      ],
      "bubbles": [
        {
          "t0": 1.5,
          "t1": 8,
          "rate": 40,
          "size": 3.4,
          "fromSolid": true
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 6,
          "v": 62
        },
        {
          "t": 10,
          "v": 55
        }
      ],
      "glow": [
        {
          "t": 0,
          "v": 0,
          "color": "#ffd27f"
        },
        {
          "t": 5,
          "v": 0.25,
          "color": "#ffd27f"
        },
        {
          "t": 10,
          "v": 0,
          "color": "#ffd27f"
        }
      ],
      "caption": [
        {
          "t": 1.5,
          "text": "Phản ứng rất mạnh, tỏa nhiệt"
        }
      ]
    }
  },
  {
    "id": "fe-cuso4",
    "grade": 12,
    "topic": "Kim loại",
    "title": "Fe + CuSO₄ → FeSO₄ + Cu (đinh sắt bọc đồng)",
    "chem": [
      "Đinh sắt sạch",
      "Dung dịch CuSO₄ 0,5M"
    ],
    "steps": [
      "Nhúng đinh sắt vào dung dịch CuSO₄ vài phút."
    ],
    "eq": [
      "Fe + CuSO4 → FeSO4 + Cu"
    ],
    "observe": [
      "Có lớp đồng đỏ bám ngoài đinh sắt; dung dịch nhạt dần màu xanh, chuyển sang lục nhạt."
    ],
    "explain": "E°(Fe²⁺/Fe) = −0,44 V < E°(Cu²⁺/Cu) = +0,34 V nên Fe khử Cu²⁺ thành Cu.",
    "v": {
      "vessel": "beaker",
      "duration": 14,
      "baseLevel": 0.6,
      "liquid": [
        {
          "t": 0,
          "c": "#2f86e0",
          "a": 0.55
        },
        {
          "t": 12,
          "c": "#9ccfa6",
          "a": 0.45
        }
      ],
      "metals": [
        {
          "t0": 1,
          "shape": "wire",
          "color": "#8f9aa5",
          "coating": {
            "color": "#c8643b",
            "t0": 3,
            "t1": 12
          },
          "label": "Đinh Fe"
        }
      ],
      "caption": [
        {
          "t": 1,
          "text": "Nhúng đinh sắt"
        },
        {
          "t": 6,
          "text": "Cu đỏ bám lên đinh"
        },
        {
          "t": 12,
          "text": "Dung dịch nhạt xanh → lục nhạt"
        }
      ]
    }
  },
  {
    "id": "cu-agno3",
    "grade": 12,
    "topic": "Kim loại",
    "title": "Cu + AgNO₃ → Cu(NO₃)₂ + Ag (cây bạc)",
    "chem": [
      "Dây đồng",
      "Dung dịch AgNO₃ 0,1M"
    ],
    "steps": [
      "Nhúng dây đồng vào AgNO₃."
    ],
    "eq": [
      "Cu + 2AgNO3 → Cu(NO3)2 + 2Ag"
    ],
    "observe": [
      "Bạc trắng sáng bám quanh dây đồng, dung dịch dần xanh lam."
    ],
    "explain": "E°(Cu²⁺/Cu) = 0,34 V < E°(Ag⁺/Ag) = 0,80 V nên Cu khử Ag⁺.",
    "v": {
      "vessel": "beaker",
      "duration": 14,
      "baseLevel": 0.6,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 12,
          "c": "#5aa5ea",
          "a": 0.5
        }
      ],
      "metals": [
        {
          "t0": 1,
          "shape": "wire",
          "color": "#c8643b",
          "coating": {
            "color": "#e8edf2",
            "t0": 3,
            "t1": 12
          },
          "label": "Dây Cu"
        }
      ],
      "caption": [
        {
          "t": 1,
          "text": "Nhúng dây Cu"
        },
        {
          "t": 7,
          "text": "Bạc kết tinh quanh dây"
        },
        {
          "t": 12,
          "text": "Dung dịch xanh lam của Cu²⁺"
        }
      ]
    }
  },
  {
    "id": "na-h2o",
    "grade": 12,
    "topic": "Kim loại kiềm",
    "title": "Na + H₂O (phenolphtalein): chạy trên mặt nước",
    "chem": [
      "Mẩu natri nhỏ",
      "Nước + phenolphtalein"
    ],
    "steps": [
      "Thả mẩu Na nhỏ vào cốc nước có phenolphtalein."
    ],
    "eq": [
      "2Na + 2H2O → 2NaOH + H2"
    ],
    "observe": [
      "Na nóng chảy thành giọt tròn chạy trên mặt nước, có khí H₂, dung dịch hóa hồng."
    ],
    "explain": "Na khử H₂O mạnh, phản ứng tỏa nhiệt làm Na nóng chảy; NaOH tạo thành làm phenolphtalein hồng.",
    "safety": "Chỉ dùng mẩu Na bằng hạt đậu, đeo kính bảo hộ, che chắn.",
    "v": {
      "vessel": "beaker",
      "duration": 11,
      "baseLevel": 0.6,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 2,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 9,
          "c": "#ff3d9a",
          "a": 0.55
        }
      ],
      "metals": [
        {
          "t0": 1,
          "shape": "ball",
          "color": "#d9dde2",
          "skitter": true,
          "dissolveStart": 3,
          "dissolveEnd": 9,
          "label": "Na"
        }
      ],
      "bubbles": [
        {
          "t0": 2,
          "t1": 9,
          "rate": 8,
          "size": 2.6
        }
      ],
      "sparks": [
        {
          "t0": 2,
          "t1": 7,
          "color": "#ffdd55"
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 8,
          "v": 40
        }
      ],
      "caption": [
        {
          "t": 1,
          "text": "Thả Na vào nước"
        },
        {
          "t": 4,
          "text": "Na chạy, tỏa khí H₂"
        },
        {
          "t": 9,
          "text": "Phenolphtalein hóa hồng: NaOH"
        }
      ]
    }
  },
  {
    "id": "k-h2o",
    "grade": 12,
    "topic": "Kim loại kiềm",
    "title": "K + H₂O: cháy ngọn lửa tím",
    "chem": [
      "Mẩu kali nhỏ",
      "Nước"
    ],
    "steps": [
      "Thả mẩu K nhỏ vào nước."
    ],
    "eq": [
      "2K + 2H2O → 2KOH + H2"
    ],
    "observe": [
      "K phản ứng mãnh liệt hơn Na, H₂ tự bốc cháy với ngọn lửa tím."
    ],
    "explain": "K hoạt động mạnh hơn Na; nhiệt tỏa ra đốt cháy H₂ với muối kali cho lửa tím.",
    "safety": "Rất nguy hiểm — chỉ minh họa; dùng mẩu rất nhỏ trong tủ hút.",
    "v": {
      "vessel": "beaker",
      "duration": 10,
      "baseLevel": 0.6,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "metals": [
        {
          "t0": 1,
          "shape": "ball",
          "color": "#cfd3d8",
          "skitter": true,
          "dissolveStart": 2.5,
          "dissolveEnd": 8,
          "label": "K"
        }
      ],
      "sparks": [
        {
          "t0": 2,
          "t1": 8,
          "color": "#b388ff"
        }
      ],
      "bubbles": [
        {
          "t0": 2,
          "t1": 8,
          "rate": 12,
          "size": 2.6
        }
      ],
      "glow": [
        {
          "t": 0,
          "v": 0,
          "color": "#b388ff"
        },
        {
          "t": 4,
          "v": 0.45,
          "color": "#b388ff"
        },
        {
          "t": 9,
          "v": 0,
          "color": "#b388ff"
        }
      ],
      "caption": [
        {
          "t": 2,
          "text": "Cháy ngọn lửa tím"
        }
      ]
    }
  },
  {
    "id": "ca-h2o",
    "grade": 12,
    "topic": "Kim loại kiềm thổ",
    "title": "Ca + H₂O → Ca(OH)₂ (nước vôi đục)",
    "chem": [
      "Mẩu canxi",
      "Nước"
    ],
    "steps": [
      "Thả mẩu Ca vào nước."
    ],
    "eq": [
      "Ca + 2H2O → Ca(OH)2 + H2"
    ],
    "observe": [
      "Sủi bọt khí H₂, Ca tan, dung dịch đục (Ca(OH)₂ ít tan)."
    ],
    "explain": "Ca khử nước ở nhiệt độ thường; Ca(OH)₂ ít tan tạo đục.",
    "v": {
      "vessel": "beaker",
      "duration": 11,
      "baseLevel": 0.6,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 9,
          "c": "#e8e8e0",
          "a": 0.5
        }
      ],
      "metals": [
        {
          "t0": 1,
          "shape": "chunk",
          "color": "#bfc3c8",
          "dissolveStart": 2.5,
          "dissolveEnd": 9,
          "label": "Ca"
        }
      ],
      "bubbles": [
        {
          "t0": 2,
          "t1": 9,
          "rate": 20,
          "size": 3,
          "fromSolid": true
        }
      ],
      "precip": [
        {
          "t0": 3,
          "t1": 9,
          "color": "#f5f5f0",
          "amount": 0.3,
          "milky": 0.4
        }
      ],
      "caption": [
        {
          "t": 2,
          "text": "Ca tan, khí H₂ thoát ra"
        },
        {
          "t": 9,
          "text": "Dung dịch đục: Ca(OH)₂"
        }
      ]
    }
  },
  {
    "id": "al-naoh",
    "grade": 12,
    "topic": "Nhôm",
    "title": "Al + NaOH + H₂O → Na[Al(OH)₄] + H₂",
    "chem": [
      "Mảnh nhôm",
      "Dung dịch NaOH đặc"
    ],
    "steps": [
      "Cho nhôm vào dung dịch NaOH."
    ],
    "eq": [
      "2Al + 2NaOH + 6H2O → 2Na[Al(OH)4] + 3H2"
    ],
    "observe": [
      "Nhôm tan dần, sủi bọt khí H₂."
    ],
    "explain": "Màng Al₂O₃ tan trong kiềm, Al khử H₂O trong môi trường bazơ tạo aluminat.",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.55,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "metals": [
        {
          "t0": 1,
          "shape": "strip",
          "color": "#c3cad2",
          "dissolveStart": 3,
          "dissolveEnd": 11,
          "label": "Al"
        }
      ],
      "bubbles": [
        {
          "t0": 2,
          "t1": 11,
          "rate": 20,
          "size": 3,
          "fromSolid": true
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 8,
          "v": 55
        }
      ],
      "caption": [
        {
          "t": 2,
          "text": "Al tan trong kiềm, khí H₂"
        }
      ]
    }
  },
  {
    "id": "cu-hno3-dac",
    "grade": 11,
    "topic": "Nitơ – Photpho",
    "title": "Cu + HNO₃ đặc → NO₂ nâu đỏ",
    "chem": [
      "Mảnh đồng",
      "Dung dịch HNO₃ đặc"
    ],
    "steps": [
      "Cho Cu vào HNO₃ đặc."
    ],
    "eq": [
      "Cu + 4HNO3 → Cu(NO3)2 + 2NO2 + 2H2O"
    ],
    "observe": [
      "Cu tan, dung dịch xanh lam, khí NO₂ màu nâu đỏ bay ra."
    ],
    "explain": "HNO₃ đặc oxi hóa Cu thành Cu²⁺, bản thân bị khử thành NO₂.",
    "safety": "NO₂ rất độc; làm trong tủ hút.",
    "v": {
      "vessel": "flask",
      "duration": 12,
      "baseLevel": 0.45,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 8,
          "c": "#3a8be0",
          "a": 0.55
        }
      ],
      "metals": [
        {
          "t0": 1,
          "shape": "chunk",
          "color": "#c8643b",
          "dissolveStart": 3,
          "dissolveEnd": 11
        }
      ],
      "bubbles": [
        {
          "t0": 2,
          "t1": 11,
          "rate": 22,
          "size": 3.4,
          "fromSolid": true,
          "escapeColor": "#c0502a"
        }
      ],
      "caption": [
        {
          "t": 2,
          "text": "Khí nâu đỏ NO₂ thoát ra"
        },
        {
          "t": 9,
          "text": "Dung dịch xanh lam Cu(NO₃)₂"
        }
      ]
    }
  },
  {
    "id": "cu-hno3-loang",
    "grade": 11,
    "topic": "Nitơ – Photpho",
    "title": "Cu + HNO₃ loãng → NO (hóa nâu trong không khí)",
    "chem": [
      "Mảnh đồng",
      "Dung dịch HNO₃ loãng"
    ],
    "steps": [
      "Cho Cu vào HNO₃ loãng."
    ],
    "eq": [
      "3Cu + 8HNO3 → 3Cu(NO3)2 + 2NO + 4H2O",
      "2NO + O2 → 2NO2"
    ],
    "observe": [
      "Cu tan, khí không màu NO thoát ra rồi hóa nâu đỏ trong không khí."
    ],
    "explain": "HNO₃ loãng bị khử thành NO; NO bị O₂ không khí oxi hóa thành NO₂ nâu đỏ.",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.5,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 9,
          "c": "#3a8be0",
          "a": 0.5
        }
      ],
      "metals": [
        {
          "t0": 1,
          "shape": "chunk",
          "color": "#c8643b",
          "dissolveStart": 3,
          "dissolveEnd": 11
        }
      ],
      "bubbles": [
        {
          "t0": 2,
          "t1": 11,
          "rate": 12,
          "size": 3,
          "fromSolid": true,
          "escapeColor": "#c0502a"
        }
      ],
      "caption": [
        {
          "t": 2,
          "text": "NO không màu"
        },
        {
          "t": 5,
          "text": "Hóa nâu đỏ khi gặp không khí: NO₂"
        }
      ]
    }
  },
  {
    "id": "cu-h2so4",
    "grade": 10,
    "topic": "Lưu huỳnh",
    "title": "Cu + H₂SO₄ đặc, nóng → SO₂",
    "chem": [
      "Mảnh đồng",
      "Dung dịch H₂SO₄ đặc"
    ],
    "steps": [
      "Đun nóng nhẹ Cu với H₂SO₄ đặc."
    ],
    "eq": [
      "Cu + 2H2SO4 → CuSO4 + SO2 + 2H2O"
    ],
    "cond": "t°",
    "observe": [
      "Cu tan, dung dịch xanh, khí SO₂ mùi hắc làm mất màu dung dịch brom."
    ],
    "explain": "H₂SO₄ đặc nóng là chất oxi hóa mạnh: S⁺⁶ → S⁺⁴.",
    "safety": "SO₂ độc; làm trong tủ hút.",
    "v": {
      "vessel": "tube",
      "duration": 13,
      "baseLevel": 0.45,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 10,
          "c": "#2f86e0",
          "a": 0.55
        }
      ],
      "metals": [
        {
          "t0": 1,
          "shape": "strip",
          "color": "#c8643b",
          "dissolveStart": 4,
          "dissolveEnd": 12
        }
      ],
      "heat": [
        {
          "t0": 2,
          "t1": 12
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 6,
          "v": 110
        },
        {
          "t": 12,
          "v": 140
        }
      ],
      "bubbles": [
        {
          "t0": 4,
          "t1": 12,
          "rate": 14,
          "size": 3,
          "fromSolid": true,
          "escapeColor": "#e9efe9"
        }
      ],
      "caption": [
        {
          "t": 2,
          "text": "Đun nóng"
        },
        {
          "t": 5,
          "text": "Khí SO₂ thoát ra"
        }
      ]
    }
  },
  {
    "id": "sugar-h2so4",
    "grade": 10,
    "topic": "Lưu huỳnh",
    "title": "Đường + H₂SO₄ đặc → than hóa, trào bọt",
    "chem": [
      "Đường saccarozơ",
      "H₂SO₄ đặc"
    ],
    "steps": [
      "Cho H₂SO₄ đặc vào cốc chứa đường."
    ],
    "eq": [
      "C12H22O11 → 12C + 11H2O"
    ],
    "cond": "H₂SO₄ đặc",
    "observe": [
      "Đường hóa đen, phồng lên trào ra khỏi cốc, tỏa nhiệt, có khí mùi hắc (CO₂, SO₂)."
    ],
    "explain": "H₂SO₄ đặc hút nước, than hóa đường; C bị H₂SO₄ đặc oxi hóa tạo CO₂ và SO₂ làm xốp khối than.",
    "safety": "Axit đặc ăn mòn; dùng lượng nhỏ, tủ hút.",
    "v": {
      "vessel": "beaker",
      "duration": 13,
      "baseLevel": 0.2,
      "solid": {
        "color": "#f4efe6",
        "colorKeys": [
          {
            "t": 0,
            "c": "#f4efe6"
          },
          {
            "t": 3,
            "c": "#f4efe6"
          },
          {
            "t": 7,
            "c": "#111111"
          }
        ],
        "mass": 0.9,
        "t0": 0
      },
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.12
        }
      ],
      "bubbles": [
        {
          "t0": 3,
          "t1": 11,
          "rate": 16,
          "size": 4,
          "fromSolid": true,
          "escapeColor": "#aaaaaa"
        }
      ],
      "smoke": {
        "t0": 4,
        "t1": 12,
        "color": "#888",
        "rate": 8
      },
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#d8c070",
          "label": "H₂SO₄ đặc",
          "kind": "liquid"
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 8,
          "v": 110
        }
      ],
      "caption": [
        {
          "t": 1,
          "text": "Rót H₂SO₄ đặc"
        },
        {
          "t": 5,
          "text": "Than hóa, phồng lên"
        }
      ]
    }
  },
  {
    "id": "mg-burn",
    "grade": 10,
    "topic": "Oxi – lưu huỳnh",
    "title": "Mg cháy sáng chói trong không khí",
    "chem": [
      "Dải Mg",
      "Đèn cồn"
    ],
    "steps": [
      "Đốt dải Mg trên ngọn lửa đèn cồn."
    ],
    "eq": [
      "2Mg + O2 → 2MgO"
    ],
    "observe": [
      "Mg cháy với ánh sáng trắng chói, tạo chất rắn trắng MgO."
    ],
    "explain": "Phản ứng oxi hóa – khử tỏa nhiều nhiệt và ánh sáng.",
    "safety": "Không nhìn trực tiếp ánh sáng chói.",
    "v": {
      "vessel": "beaker",
      "duration": 9,
      "baseLevel": 0.05,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0
        }
      ],
      "metals": [
        {
          "t0": 1,
          "shape": "strip",
          "color": "#c9ced4",
          "dissolveStart": 3,
          "dissolveEnd": 7,
          "floats": true,
          "colorTo": "#f5f5ee"
        }
      ],
      "sparks": [
        {
          "t0": 3,
          "t1": 7,
          "color": "#ffffff"
        }
      ],
      "glow": [
        {
          "t": 0,
          "v": 0,
          "color": "#ffffff"
        },
        {
          "t": 4,
          "v": 0.9,
          "color": "#ffffff"
        },
        {
          "t": 8,
          "v": 0.1,
          "color": "#ffffff"
        }
      ],
      "caption": [
        {
          "t": 3,
          "text": "Ánh sáng chói: MgO"
        }
      ]
    }
  },
  {
    "id": "kmno4-heat",
    "grade": 10,
    "topic": "Oxi – lưu huỳnh",
    "title": "Nhiệt phân KMnO₄ điều chế O₂",
    "chem": [
      "KMnO₄ rắn",
      "Đèn cồn",
      "Que đóm còn tàn đỏ"
    ],
    "steps": [
      "Đun KMnO₄ trong ống nghiệm.",
      "Đưa que đóm tàn đỏ vào miệng ống."
    ],
    "eq": [
      "2KMnO4 → K2MnO4 + MnO2 + O2"
    ],
    "cond": "t°",
    "observe": [
      "Chất rắn tím đen, khí O₂ thoát ra làm que đóm bùng cháy."
    ],
    "explain": "KMnO₄ bị nhiệt phân tạo O₂ — nhận biết O₂ bằng que đóm tàn đỏ bùng cháy.",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.02,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0
        }
      ],
      "solid": {
        "color": "#6a1b9a",
        "colorKeys": [
          {
            "t": 0,
            "c": "#7b1fa2"
          },
          {
            "t": 7,
            "c": "#2e1a35"
          }
        ],
        "mass": 0.7,
        "t0": 0
      },
      "heat": [
        {
          "t0": 1,
          "t1": 11
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 8,
          "v": 300
        }
      ],
      "bubbles": [
        {
          "t0": 4,
          "t1": 11,
          "rate": 8,
          "size": 2,
          "escapeColor": "#f2f7ff"
        }
      ],
      "glow": [
        {
          "t": 9,
          "v": 0,
          "color": "#ffd27f"
        },
        {
          "t": 10,
          "v": 0.5,
          "color": "#ffd27f"
        },
        {
          "t": 11.5,
          "v": 0,
          "color": "#ffd27f"
        }
      ],
      "caption": [
        {
          "t": 1,
          "text": "Đun nóng KMnO₄"
        },
        {
          "t": 9.5,
          "text": "Que đóm bùng cháy: có O₂"
        }
      ]
    }
  },
  {
    "id": "cl2-ki",
    "grade": 10,
    "topic": "Halogen",
    "title": "Cl₂ + KI → I₂ (nâu), hồ tinh bột hóa xanh",
    "chem": [
      "Nước clo",
      "Dung dịch KI",
      "Hồ tinh bột"
    ],
    "steps": [
      "Nhỏ nước clo vào dung dịch KI.",
      "Thêm hồ tinh bột."
    ],
    "eq": [
      "Cl2 + 2KI → 2KCl + I2"
    ],
    "observe": [
      "Dung dịch chuyển nâu (I₂); thêm hồ tinh bột → xanh tím."
    ],
    "explain": "Cl₂ có tính oxi hóa mạnh hơn I₂ nên đẩy I₂ ra khỏi muối.",
    "v": {
      "vessel": "tube",
      "duration": 11,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.52
        },
        {
          "t": 7,
          "v": 0.6
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 3,
          "c": "#a0561e",
          "a": 0.65
        },
        {
          "t": 6,
          "c": "#a0561e",
          "a": 0.65
        },
        {
          "t": 9,
          "c": "#2a1650",
          "a": 0.85
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#d8e8a0",
          "label": "Nước clo",
          "kind": "drops"
        },
        {
          "t0": 6,
          "t1": 8,
          "color": "#fffbe6",
          "label": "Hồ tinh bột",
          "kind": "drops"
        }
      ],
      "caption": [
        {
          "t": 3,
          "text": "Tạo I₂ màu nâu"
        },
        {
          "t": 9,
          "text": "Xanh tím với hồ tinh bột"
        }
      ]
    }
  },
  {
    "id": "kmno4-feso4",
    "grade": 12,
    "topic": "Sắt",
    "title": "KMnO₄ + FeSO₄ + H₂SO₄: mất màu tím",
    "chem": [
      "Dung dịch KMnO₄",
      "Dung dịch FeSO₄ axit hóa"
    ],
    "steps": [
      "Nhỏ KMnO₄ vào FeSO₄ có H₂SO₄."
    ],
    "eq": [
      "2KMnO4 + 10FeSO4 + 8H2SO4 → K2SO4 + 2MnSO4 + 5Fe2(SO4)3 + 8H2O"
    ],
    "observe": [
      "Màu tím của KMnO₄ biến mất cho đến khi hết Fe²⁺."
    ],
    "explain": "MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O. Dùng chuẩn độ Fe²⁺.",
    "v": {
      "vessel": "beaker",
      "duration": 12,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 9,
          "v": 0.6
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#d8e8c8",
          "a": 0.4
        },
        {
          "t": 3,
          "c": "#e8d9a0",
          "a": 0.45
        },
        {
          "t": 9,
          "c": "#e8d9a0",
          "a": 0.45
        },
        {
          "t": 11,
          "c": "#c46ad0",
          "a": 0.55
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 9,
          "color": "#7b1fa2",
          "label": "KMnO₄ (tím)",
          "kind": "drops"
        }
      ],
      "caption": [
        {
          "t": 1.5,
          "text": "Mỗi giọt tím mất màu ngay"
        },
        {
          "t": 10.5,
          "text": "Hết Fe²⁺: màu hồng bền"
        }
      ]
    }
  },
  {
    "id": "nh3-hcl",
    "grade": 11,
    "topic": "Nitơ – Photpho",
    "title": "NH₃ + HCl → khói trắng NH₄Cl",
    "chem": [
      "Dung dịch NH₃ đặc",
      "Dung dịch HCl đặc"
    ],
    "steps": [
      "Đưa hai đũa thủy tinh nhúng NH₃ và HCl lại gần nhau."
    ],
    "eq": [
      "NH3 + HCl → NH4Cl"
    ],
    "observe": [
      "Xuất hiện khói trắng NH₄Cl."
    ],
    "explain": "Hai khí gặp nhau tạo muối amoni clorua dạng hạt rắn mịn.",
    "v": {
      "vessel": "beaker",
      "duration": 9,
      "baseLevel": 0,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0
        }
      ],
      "smoke": {
        "t0": 1,
        "t1": 8,
        "color": "#f2f2f2",
        "rate": 14
      },
      "caption": [
        {
          "t": 1,
          "text": "NH₃ gặp HCl: khói trắng NH₄Cl"
        }
      ]
    }
  },
  {
    "id": "mno2-hcl",
    "grade": 10,
    "topic": "Halogen",
    "title": "MnO₂ + HCl đặc (đun) → Cl₂ vàng lục",
    "chem": [
      "MnO₂",
      "HCl đặc"
    ],
    "steps": [
      "Đun MnO₂ với HCl đặc."
    ],
    "eq": [
      "MnO2 + 4HCl → MnCl2 + Cl2 + 2H2O"
    ],
    "cond": "t°",
    "observe": [
      "Khí vàng lục Cl₂ thoát ra, mùi hắc."
    ],
    "explain": "HCl đặc bị MnO₂ oxi hóa thành Cl₂ — cách điều chế Cl₂ trong phòng thí nghiệm.",
    "safety": "Cl₂ độc; làm trong tủ hút.",
    "v": {
      "vessel": "flask",
      "duration": 12,
      "baseLevel": 0.4,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 8,
          "c": "#e0d9b0",
          "a": 0.4
        }
      ],
      "solid": {
        "color": "#222",
        "mass": 0.5,
        "t0": 0,
        "dissolveEnd": 11
      },
      "heat": [
        {
          "t0": 1.5,
          "t1": 11
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 7,
          "v": 90
        }
      ],
      "bubbles": [
        {
          "t0": 3,
          "t1": 11,
          "rate": 14,
          "size": 3,
          "fromSolid": true,
          "escapeColor": "#b7d94c"
        }
      ],
      "caption": [
        {
          "t": 3,
          "text": "Khí Cl₂ vàng lục"
        }
      ]
    }
  },
  {
    "id": "cuoh2-heat",
    "grade": 11,
    "topic": "Đồng – Nhiệt phân",
    "title": "Nhiệt phân Cu(OH)₂ (xanh lơ → CuO đen)",
    "chem": [
      "Cu(OH)₂ mới điều chế trong ống nghiệm",
      "Đèn cồn"
    ],
    "steps": [
      "Đun nóng đáy ống nghiệm chứa kết tủa Cu(OH)₂ trên ngọn lửa đèn cồn."
    ],
    "eq": [
      "Cu(OH)2 → CuO + H2O"
    ],
    "cond": "t°",
    "observe": [
      "Kết tủa xanh lơ chuyển dần sang màu đen của CuO; thành ống nghiệm đọng hơi nước."
    ],
    "explain": "Hiđroxit không tan bị phân hủy bởi nhiệt thành oxit kim loại tương ứng và hơi nước.",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.38,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.25
        }
      ],
      "precip": [
        {
          "t0": 0,
          "t1": 1,
          "color": "#4aa8ff",
          "amount": 0.65
        },
        {
          "t0": 4,
          "t1": 9,
          "color": "#111111",
          "amount": 0.65
        }
      ],
      "heat": [
        {
          "t0": 1.5,
          "t1": 11
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 5,
          "v": 110
        },
        {
          "t": 10,
          "v": 220
        }
      ],
      "smoke": {
        "t0": 3,
        "t1": 10,
        "color": "#eef6ff",
        "rate": 6
      },
      "glow": [
        {
          "t": 4,
          "v": 0,
          "color": "#ff9800"
        },
        {
          "t": 8,
          "v": 0.35,
          "color": "#ff9800"
        },
        {
          "t": 11,
          "v": 0.1,
          "color": "#ff9800"
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Cu(OH)₂ kết tủa xanh lơ"
        },
        {
          "t": 2,
          "text": "Đun nóng trên ngọn lửa đèn cồn"
        },
        {
          "t": 6,
          "text": "Chuyển thành CuO màu đen, hơi nước thoát ra"
        },
        {
          "t": 10,
          "text": "Phản ứng nhiệt phân hoàn toàn"
        }
      ]
    }
  },
  {
    "id": "caco3-heat",
    "grade": 11,
    "topic": "Cacbon – Nhiệt phân",
    "title": "Nhiệt phân đá vôi CaCO₃ (nung vôi)",
    "chem": [
      "Mẩu đá vôi nhỏ CaCO₃",
      "Ống nghiệm chịu nhiệt",
      "Đèn cồn / đèn xì"
    ],
    "steps": [
      "Nung nóng mẩu đá vôi ở nhiệt độ cao."
    ],
    "eq": [
      "CaCO3 → CaO + CO2"
    ],
    "cond": "1000 °C",
    "observe": [
      "Mẩu đá vôi nóng đỏ rực rỡ, thoát ra khí CO₂; chất rắn thu được là vôi sống CaO."
    ],
    "explain": "Phản ứng nung vôi thu nhiệt mạnh: CaCO₃ bị phân hủy thành CaO và khí CO₂.",
    "v": {
      "vessel": "tube",
      "duration": 13,
      "baseLevel": 0.05,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0
        }
      ],
      "solid": {
        "color": "#ded7c8",
        "colorKeys": [
          {
            "t": 0,
            "c": "#ded7c8"
          },
          {
            "t": 4,
            "c": "#ff7043"
          },
          {
            "t": 8,
            "c": "#ffe0b2"
          }
        ],
        "mass": 0.75,
        "t0": 0
      },
      "heat": [
        {
          "t0": 1,
          "t1": 11
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 4,
          "v": 450
        },
        {
          "t": 8,
          "v": 950
        },
        {
          "t": 11,
          "v": 1000
        }
      ],
      "bubbles": [
        {
          "t0": 3,
          "t1": 10.5,
          "rate": 10,
          "size": 2.8,
          "fromSolid": true,
          "escapeColor": "#e0e0e0"
        }
      ],
      "glow": [
        {
          "t": 0,
          "v": 0,
          "color": "#ff5722"
        },
        {
          "t": 5,
          "v": 0.5,
          "color": "#ff5722"
        },
        {
          "t": 8,
          "v": 0.8,
          "color": "#ffeb3b"
        },
        {
          "t": 11,
          "v": 0.3,
          "color": "#ff9800"
        }
      ],
      "caption": [
        {
          "t": 1,
          "text": "Nung đá vôi CaCO₃ ở nhiệt độ cao"
        },
        {
          "t": 5,
          "text": "Đá vôi nóng đỏ rực, khí CO₂ thoát ra"
        },
        {
          "t": 9,
          "text": "Tạo vôi sống CaO (tôi vôi tỏa nhiệt)"
        }
      ]
    }
  },
  {
    "id": "nahco3-heat",
    "grade": 11,
    "topic": "Cacbon – Muối cacbonat",
    "title": "Nhiệt phân muối nở NaHCO₃ (bột nở)",
    "chem": [
      "Bột NaHCO₃",
      "Ống nghiệm có nút và ống dẫn khí",
      "Nước vôi trong"
    ],
    "steps": [
      "Đun nóng NaHCO₃, dẫn khí sinh ra vào cốc nước vôi trong."
    ],
    "eq": [
      "2NaHCO3 → CO2 + H2O + Na2CO3"
    ],
    "cond": "t°",
    "observe": [
      "Khí CO₂ thoát ra làm đục nước vôi trong; thành ống nghiệm đọng giọt nước."
    ],
    "explain": "Muối hiđrocacbonat kém bền nhiệt, bị phân hủy khi đun nhẹ. Ứng dụng làm bột nở làm bánh xốp.",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.05,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0
        }
      ],
      "solid": {
        "color": "#f5f5f5",
        "mass": 0.6,
        "t0": 0
      },
      "heat": [
        {
          "t0": 1.5,
          "t1": 11
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 5,
          "v": 120
        },
        {
          "t": 10,
          "v": 180
        }
      ],
      "bubbles": [
        {
          "t0": 3,
          "t1": 10.5,
          "rate": 16,
          "size": 3,
          "fromSolid": true,
          "escapeColor": "#e8f4fd"
        }
      ],
      "smoke": {
        "t0": 3.5,
        "t1": 10,
        "color": "#f0f4f8",
        "rate": 7
      },
      "caption": [
        {
          "t": 1.5,
          "text": "Đun nóng bột nở NaHCO₃"
        },
        {
          "t": 4,
          "text": "Khí CO₂ và hơi nước bốc lên mạnh"
        },
        {
          "t": 9,
          "text": "Phân hủy thành muối Na₂CO₃"
        }
      ]
    }
  },
  {
    "id": "c2h5oh-burn",
    "grade": 11,
    "topic": "Ancol – Sự cháy",
    "title": "Đốt cháy cồn etylic C₂H₅OH (ngọn lửa xanh lam)",
    "chem": [
      "Cồn etylic 96° (C₂H₅OH)",
      "Đĩa sứ / đèn cồn"
    ],
    "steps": [
      "Cho một ít cồn vào đĩa sứ hoặc đèn cồn, châm lửa."
    ],
    "eq": [
      "C2H5OH + 3O2 → 2CO2 + 3H2O"
    ],
    "cond": "t°",
    "observe": [
      "Cồn bốc cháy mạnh với ngọn lửa màu xanh lam nhạt, tỏa nhiều nhiệt, không có khói đen hay muội than."
    ],
    "explain": "Etanol cháy hoàn toàn trong oxi không khí tạo CO₂ và hơi nước, là nhiên liệu sinh học sạch.",
    "v": {
      "vessel": "beaker",
      "duration": 11,
      "baseLevel": 0.25,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 8,
          "c": "#cfe8ff",
          "a": 0.1
        },
        {
          "t": 11,
          "c": "#cfe8ff",
          "a": 0
        }
      ],
      "heat": [
        {
          "t0": 1,
          "t1": 10
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 4,
          "v": 180
        },
        {
          "t": 9,
          "v": 350
        }
      ],
      "sparks": [
        {
          "t0": 1.5,
          "t1": 9.5,
          "color": "#64b5f6"
        }
      ],
      "glow": [
        {
          "t": 0,
          "v": 0,
          "color": "#2979ff"
        },
        {
          "t": 3,
          "v": 0.6,
          "color": "#2979ff"
        },
        {
          "t": 9,
          "v": 0.6,
          "color": "#2979ff"
        },
        {
          "t": 11,
          "v": 0.2,
          "color": "#2979ff"
        }
      ],
      "caption": [
        {
          "t": 1,
          "text": "Châm lửa đốt cồn C₂H₅OH"
        },
        {
          "t": 3,
          "text": "Ngọn lửa xanh lam đặc trưng, tỏa nhiệt mạnh"
        },
        {
          "t": 8,
          "text": "Cồn cạn dần, cháy hoàn toàn"
        }
      ]
    }
  },
  {
    "id": "ch4-burn",
    "grade": 11,
    "topic": "Hiđrocacbon – Sự cháy",
    "title": "Đốt cháy khí metan CH₄ (khí biogas)",
    "chem": [
      "Khí metan CH₄ dẫn qua ống vuốt nhọn",
      "Ống nghiệm khô úp trên ngọn lửa"
    ],
    "steps": [
      "Đốt dòng khí metan ở đầu ống vuốt nhọn.",
      "Quan sát ngọn lửa và hơi nước ngưng tụ."
    ],
    "eq": [
      "CH4 + 2O2 → 2H2O + CO2"
    ],
    "cond": "t°",
    "observe": [
      "Metan cháy với ngọn lửa màu xanh sáng, tỏa nhiều nhiệt; thành ống nghiệm có giọt nước đọng."
    ],
    "explain": "Metan cháy tạo CO₂ và hơi nước. Phản ứng tỏa nhiều nhiệt, là thành phần chính của khí thiên nhiên và khí biogas.",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.05,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0
        }
      ],
      "heat": [
        {
          "t0": 1,
          "t1": 8
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 4,
          "v": 300
        },
        {
          "t": 8,
          "v": 450
        }
      ],
      "bubbles": [
        {
          "t0": 1,
          "t1": 8,
          "rate": 12,
          "size": 2.5,
          "escapeColor": "#e3f2fd"
        }
      ],
      "sparks": [
        {
          "t0": 1.2,
          "t1": 8,
          "color": "#42a5f5"
        }
      ],
      "glow": [
        {
          "t": 1,
          "v": 0,
          "color": "#29b6f6"
        },
        {
          "t": 3,
          "v": 0.65,
          "color": "#29b6f6"
        },
        {
          "t": 8,
          "v": 0.65,
          "color": "#29b6f6"
        }
      ],
      "smoke": {
        "t0": 2,
        "t1": 8.5,
        "color": "#e8f4fd",
        "rate": 5
      },
      "caption": [
        {
          "t": 1,
          "text": "Metan CH₄ cháy ngọn lửa xanh sáng"
        },
        {
          "t": 4,
          "text": "Thành ống nghiệm đọng hơi nước H₂O"
        },
        {
          "t": 8,
          "text": "Tỏa nhiệt mãnh liệt"
        }
      ]
    }
  },
  {
    "id": "glucose-cuoh2",
    "grade": 12,
    "topic": "Cacbohiđrat",
    "title": "Glucozơ + Cu(OH)₂: phức xanh lam; đun → Cu₂O đỏ gạch",
    "chem": [
      "Dung dịch glucozơ",
      "Cu(OH)₂ mới điều chế",
      "Đèn cồn"
    ],
    "steps": [
      "Cho glucozơ vào Cu(OH)₂ lắc nhẹ.",
      "Đun nóng dung dịch."
    ],
    "eq": [
      "2C6H12O6 + Cu(OH)2 → (C6H11O6)2Cu + 2H2O",
      "C5H11O5CHO + 2Cu(OH)2 + NaOH → C5H11O5COONa + Cu2O + 3H2O"
    ],
    "cond": "t°",
    "observe": [
      "Cu(OH)₂ tan tạo dung dịch xanh lam thẫm (nhiều nhóm –OH kề nhau).",
      "Đun nóng xuất hiện kết tủa đỏ gạch Cu₂O (nhóm –CHO)."
    ],
    "explain": "Glucozơ vừa là ancol đa chức (hòa tan Cu(OH)₂), vừa có nhóm anđehit (khử Cu(OH)₂ thành Cu₂O).",
    "v": {
      "vessel": "tube",
      "duration": 15,
      "baseLevel": 0.45,
      "liquid": [
        {
          "t": 0,
          "c": "#8fbaf0",
          "a": 0.35
        },
        {
          "t": 3,
          "c": "#0b3fa8",
          "a": 0.7
        },
        {
          "t": 9,
          "c": "#0b3fa8",
          "a": 0.7
        },
        {
          "t": 13,
          "c": "#b04a1e",
          "a": 0.6
        }
      ],
      "heat": [
        {
          "t0": 6,
          "t1": 14
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 6,
          "v": 30
        },
        {
          "t": 12,
          "v": 95
        }
      ],
      "precip": [
        {
          "t0": 9,
          "t1": 13,
          "color": "#c0431a",
          "amount": 0.8,
          "milky": 0.1
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Cu(OH)₂ xanh lơ"
        },
        {
          "t": 3,
          "text": "Tạo phức xanh lam thẫm"
        },
        {
          "t": 10,
          "text": "Đun nóng: Cu₂O đỏ gạch"
        }
      ]
    }
  },
  {
    "id": "tollens",
    "grade": 11,
    "topic": "Anđehit – xeton",
    "title": "Phản ứng tráng bạc (Tollens)",
    "chem": [
      "Dung dịch AgNO₃/NH₃",
      "Dung dịch anđehit/glucozơ",
      "Nước nóng 70 °C"
    ],
    "steps": [
      "Cho dung dịch AgNO₃/NH₃ vào ống nghiệm sạch.",
      "Thêm anđehit, ngâm vào nước nóng."
    ],
    "eq": [
      "CH3CHO + 2AgNO3 + 3NH3 + H2O → CH3COONH4 + 2Ag + 2NH4NO3"
    ],
    "cond": "t°",
    "observe": [
      "Lớp bạc kim loại sáng bóng bám thành ống nghiệm (gương bạc)."
    ],
    "explain": "Nhóm –CHO khử Ag⁺ thành Ag. Dùng nhận biết anđehit, glucozơ.",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.45,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 8,
          "c": "#d0d6dc",
          "a": 0.35
        }
      ],
      "heat": [
        {
          "t0": 3,
          "t1": 11
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 6,
          "v": 70
        }
      ],
      "precip": [
        {
          "t0": 5,
          "t1": 11,
          "color": "#e4e8ec",
          "amount": 0.5,
          "milky": 0.25
        }
      ],
      "caption": [
        {
          "t": 3,
          "text": "Ngâm nước nóng"
        },
        {
          "t": 9,
          "text": "Bạc kim loại bám thành ống"
        }
      ]
    }
  },
  {
    "id": "phenol-br2",
    "grade": 11,
    "topic": "Phenol",
    "title": "Phenol + nước brom → 2,4,6-tribromphenol↓ trắng",
    "chem": [
      "Dung dịch phenol",
      "Nước brom"
    ],
    "steps": [
      "Nhỏ nước brom vào dung dịch phenol."
    ],
    "eq": [
      "C6H5OH + 3Br2 → C6H2Br3OH + 3HBr"
    ],
    "observe": [
      "Nước brom mất màu, xuất hiện kết tủa trắng."
    ],
    "explain": "Nhóm –OH hoạt hóa vòng thơm: thế ba nguyên tử Br ở vị trí o, p.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 5,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 2,
          "c": "#f0b07a",
          "a": 0.4
        },
        {
          "t": 5,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 5,
          "color": "#e08a30",
          "label": "Nước brom",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 2.5,
          "t1": 7,
          "color": "#f8f8f4",
          "amount": 0.55,
          "milky": 0.7
        }
      ],
      "caption": [
        {
          "t": 2,
          "text": "Brom mất màu"
        },
        {
          "t": 4,
          "text": "Kết tủa trắng"
        }
      ]
    }
  },
  {
    "id": "aniline-br2",
    "grade": 12,
    "topic": "Amin",
    "title": "Anilin + nước brom → 2,4,6-tribromanilin↓ trắng",
    "chem": [
      "Anilin",
      "Nước brom"
    ],
    "steps": [
      "Nhỏ nước brom vào anilin."
    ],
    "eq": [
      "C6H5NH2 + 3Br2 → C6H2Br3NH2 + 3HBr"
    ],
    "observe": [
      "Mất màu nước brom, kết tủa trắng."
    ],
    "explain": "Nhóm –NH₂ hoạt hóa mạnh vòng benzen.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 5,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 2,
          "c": "#f0b07a",
          "a": 0.4
        },
        {
          "t": 5,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 5,
          "color": "#e08a30",
          "label": "Nước brom",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 2.5,
          "t1": 7,
          "color": "#f6f6f0",
          "amount": 0.55,
          "milky": 0.7
        }
      ],
      "caption": [
        {
          "t": 4,
          "text": "Kết tủa trắng"
        }
      ]
    }
  },
  {
    "id": "ethene-br2",
    "grade": 11,
    "topic": "Anken",
    "title": "Etilen làm mất màu dung dịch brom",
    "chem": [
      "Dung dịch brom",
      "Khí C₂H₄"
    ],
    "steps": [
      "Sục C₂H₄ vào dung dịch brom."
    ],
    "eq": [
      "C2H4 + Br2 → C2H4Br2"
    ],
    "observe": [
      "Dung dịch brom da cam mất màu."
    ],
    "explain": "Phản ứng cộng vào liên kết đôi C=C. Nhận biết anken, ankin.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.5,
      "liquid": [
        {
          "t": 0,
          "c": "#e2792a",
          "a": 0.65
        },
        {
          "t": 7,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "bubbles": [
        {
          "t0": 1,
          "t1": 8,
          "rate": 12,
          "size": 2.6
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Dung dịch brom (da cam)"
        },
        {
          "t": 7,
          "text": "Mất màu: C₂H₄Br₂"
        }
      ]
    }
  },
  {
    "id": "acetylene-agno3",
    "grade": 11,
    "topic": "Ankin",
    "title": "Axetilen + AgNO₃/NH₃ → Ag–C≡C–Ag↓ vàng",
    "chem": [
      "Khí C₂H₂",
      "Dung dịch AgNO₃/NH₃"
    ],
    "steps": [
      "Sục C₂H₂ vào AgNO₃/NH₃."
    ],
    "eq": [
      "C2H2 + 2AgNO3 + 2NH3 → C2Ag2 + 2NH4NO3"
    ],
    "observe": [
      "Xuất hiện kết tủa vàng nhạt bạc axetilua."
    ],
    "explain": "Ankin-1 có H linh động ở C≡C–H bị thay bởi Ag.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.45,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "bubbles": [
        {
          "t0": 1,
          "t1": 7,
          "rate": 10,
          "size": 2.6
        }
      ],
      "precip": [
        {
          "t0": 2,
          "t1": 7,
          "color": "#e8dc8a",
          "amount": 0.55,
          "milky": 0.4
        }
      ],
      "caption": [
        {
          "t": 3,
          "text": "Kết tủa vàng nhạt"
        }
      ]
    }
  },
  {
    "id": "glucose-silver",
    "grade": 12,
    "topic": "Cacbohiđrat",
    "title": "Phản ứng tráng bạc của glucozơ (AgNO₃/NH₃, t°)",
    "chem": [
      "Dung dịch glucozơ 1%",
      "Dung dịch AgNO₃ 1%",
      "Dung dịch NH₃ 5%",
      "Cốc nước nóng / đèn cồn"
    ],
    "steps": [
      "Cho AgNO₃ vào ống nghiệm, nhỏ NH₃ đến khi tan hết kết tủa.",
      "Thêm glucozơ, ngâm ống nghiệm trong nước nóng hoặc đun nhẹ."
    ],
    "eq": [
      "C6H12O6 + Ag2O → C6H12O7 + 2Ag"
    ],
    "cond": "NH₃, t°",
    "observe": [
      "Thành ống nghiệm sáng bóng như gương do lớp bạc kim loại bám vào."
    ],
    "explain": "Nhóm –CHO của glucozơ bị oxi hóa thành axit gluconic (C₆H₁₂O₇), ion Ag⁺ bị khử thành Ag kim loại bám lên thành ống nghiệm.",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.45,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.35
        },
        {
          "t": 4,
          "c": "#e8eef5",
          "a": 0.5
        },
        {
          "t": 10,
          "c": "#bcc5cf",
          "a": 0.7
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3.5,
          "color": "#e0f0ff",
          "label": "Glucozơ",
          "kind": "drops"
        }
      ],
      "heat": [
        {
          "t0": 4,
          "t1": 11
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 5,
          "v": 65
        },
        {
          "t": 9,
          "v": 80
        }
      ],
      "precip": [
        {
          "t0": 5,
          "t1": 11,
          "color": "#e2e8f0",
          "amount": 0.5,
          "milky": 0.3
        }
      ],
      "caption": [
        {
          "t": 1,
          "text": "Dung dịch phức bạc amoniac"
        },
        {
          "t": 5,
          "text": "Đun nóng nhẹ"
        },
        {
          "t": 9,
          "text": "Bạc bám sáng bóng lên thành ống nghiệm"
        }
      ]
    }
  },
  {
    "id": "starch-iodine",
    "grade": 12,
    "topic": "Cacbohiđrat",
    "title": "Hồ tinh bột + I₂ → xanh tím",
    "chem": [
      "Hồ tinh bột",
      "Dung dịch iot"
    ],
    "steps": [
      "Nhỏ dung dịch iot vào hồ tinh bột.",
      "Đun nóng, sau đó làm nguội."
    ],
    "eq": [],
    "observe": [
      "Xuất hiện màu xanh tím; đun nóng mất màu, để nguội màu xuất hiện lại."
    ],
    "explain": "Tinh bột hấp phụ I₂ trong cấu trúc xoắn amilozơ tạo hợp chất màu xanh tím.",
    "v": {
      "vessel": "tube",
      "duration": 13,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.5
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#f4f1e0",
          "a": 0.35
        },
        {
          "t": 3,
          "c": "#251b6e",
          "a": 0.85
        },
        {
          "t": 7,
          "c": "#251b6e",
          "a": 0.85
        },
        {
          "t": 9,
          "c": "#e6d9b0",
          "a": 0.35
        },
        {
          "t": 12,
          "c": "#251b6e",
          "a": 0.85
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#a05a1e",
          "label": "I₂",
          "kind": "drops"
        }
      ],
      "heat": [
        {
          "t0": 6,
          "t1": 9
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 6,
          "v": 40
        },
        {
          "t": 9,
          "v": 85
        },
        {
          "t": 13,
          "v": 30
        }
      ],
      "caption": [
        {
          "t": 3,
          "text": "Xanh tím"
        },
        {
          "t": 8,
          "text": "Đun nóng: mất màu"
        },
        {
          "t": 12,
          "text": "Nguội: màu trở lại"
        }
      ]
    }
  },
  {
    "id": "biuret",
    "grade": 12,
    "topic": "Protein",
    "title": "Phản ứng màu biure: protein + Cu(OH)₂ → tím",
    "chem": [
      "Lòng trắng trứng",
      "NaOH",
      "CuSO₄"
    ],
    "steps": [
      "Cho lòng trắng trứng, NaOH rồi vài giọt CuSO₄."
    ],
    "eq": [],
    "observe": [
      "Dung dịch xuất hiện màu tím đặc trưng."
    ],
    "explain": "Liên kết peptit tạo phức màu tím với Cu²⁺ trong kiềm. Đipeptit không có phản ứng này.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 4,
          "v": 0.5
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#f6f1dc",
          "a": 0.4
        },
        {
          "t": 4,
          "c": "#8e4bc8",
          "a": 0.75
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 4,
          "color": "#4aa3ff",
          "label": "CuSO₄",
          "kind": "drops"
        }
      ],
      "caption": [
        {
          "t": 4,
          "text": "Màu tím đặc trưng"
        }
      ]
    }
  },
  {
    "id": "esterification",
    "grade": 11,
    "topic": "Este",
    "title": "Điều chế etyl axetat (phản ứng este hóa)",
    "chem": [
      "CH₃COOH",
      "C₂H₅OH",
      "H₂SO₄ đặc (xúc tác)",
      "Dung dịch NaCl bão hòa"
    ],
    "steps": [
      "Trộn axit axetic, etanol, vài giọt H₂SO₄ đặc.",
      "Đun nhẹ, rót vào dung dịch NaCl bão hòa."
    ],
    "eq": [
      "CH3COOH + C2H5OH → CH3COOC2H5 + H2O"
    ],
    "cond": "H₂SO₄ đặc, t°",
    "observe": [
      "Có lớp chất lỏng nhẹ mùi thơm nổi lên trên."
    ],
    "explain": "Phản ứng thuận nghịch; este nhẹ hơn nước, ít tan nên nổi lên mặt.",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.45,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "heat": [
        {
          "t0": 1.5,
          "t1": 10
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 5,
          "v": 70
        },
        {
          "t": 10,
          "v": 78
        }
      ],
      "bubbles": [
        {
          "t0": 4,
          "t1": 10,
          "rate": 5,
          "size": 2
        }
      ],
      "smoke": {
        "t0": 5,
        "t1": 11,
        "color": "#e8f4ff",
        "rate": 4
      },
      "caption": [
        {
          "t": 2,
          "text": "Đun nóng hỗn hợp"
        },
        {
          "t": 8,
          "text": "Etyl axetat mùi thơm bay hơi"
        }
      ]
    }
  },
  {
    "id": "saponification",
    "grade": 12,
    "topic": "Chất béo",
    "title": "Xà phòng hóa chất béo",
    "chem": [
      "Dầu ăn/mỡ",
      "Dung dịch NaOH 40%",
      "Etanol"
    ],
    "steps": [
      "Đun hỗn hợp chất béo, NaOH, etanol.",
      "Cho dung dịch NaCl bão hòa."
    ],
    "eq": [
      "(C17H35COO)3C3H5 + 3NaOH → 3C17H35COONa + C3H5(OH)3"
    ],
    "cond": "t°",
    "observe": [
      "Hỗn hợp đồng nhất; thêm NaCl, xà phòng nổi lên trên."
    ],
    "explain": "Chất béo thủy phân trong kiềm tạo muối của axit béo (xà phòng) và glixerol.",
    "v": {
      "vessel": "beaker",
      "duration": 14,
      "baseLevel": 0.5,
      "liquid": [
        {
          "t": 0,
          "c": "#f0dc8a",
          "a": 0.45
        },
        {
          "t": 7,
          "c": "#f5e9b8",
          "a": 0.4
        }
      ],
      "heat": [
        {
          "t0": 1,
          "t1": 9
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 6,
          "v": 90
        },
        {
          "t": 12,
          "v": 60
        }
      ],
      "precip": [
        {
          "t0": 9,
          "t1": 13,
          "color": "#faf6e8",
          "amount": 0.3,
          "milky": 0.4
        }
      ],
      "bubbles": [
        {
          "t0": 3,
          "t1": 9,
          "rate": 8,
          "size": 2.6
        }
      ],
      "caption": [
        {
          "t": 3,
          "text": "Đun, khuấy đều"
        },
        {
          "t": 10,
          "text": "Thêm NaCl: xà phòng tách ra"
        }
      ]
    }
  },
  {
    "id": "toluene-kmno4",
    "grade": 11,
    "topic": "Hiđrocacbon thơm",
    "title": "Oxi hóa Toluen bằng KMnO₄ (khi đun nóng)",
    "chem": [
      "Toluen (C₆H₅CH₃)",
      "Dung dịch KMnO₄ 1%",
      "Đèn cồn"
    ],
    "steps": [
      "Cho 1 mL toluen và 2 mL dd KMnO₄ vào ống nghiệm, lắc đều (ở t° thường không đổi màu).",
      "Đun nóng nhẹ ống nghiệm trên ngọn lửa đèn cồn."
    ],
    "eq": [
      "C6H5CH3 + 2KMnO4 → C6H5COOK + 2MnO2 + KOH + H2O"
    ],
    "cond": "t°",
    "observe": [
      "Ở nhiệt độ thường: dung dịch tím phân lớp, không mất màu.",
      "Khi đun nóng: màu tím của KMnO₄ mất dần, xuất hiện kết tủa nâu đen MnO₂ lắng xuống."
    ],
    "explain": "Vòng benzen bền với chất oxi hóa; nhóm metyl (-CH₃) đính vào vòng benzen bị oxi hóa bởi KMnO₄ khi đun nóng tạo kali benzoat và MnO₂.",
    "v": {
      "vessel": "tube",
      "duration": 12,
      "baseLevel": 0.45,
      "liquid": [
        {
          "t": 0,
          "c": "#8e24aa",
          "a": 0.7
        },
        {
          "t": 5,
          "c": "#b06ab3",
          "a": 0.5
        },
        {
          "t": 9,
          "c": "#cfe8ff",
          "a": 0.25
        }
      ],
      "heat": [
        {
          "t0": 2,
          "t1": 9
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 4,
          "v": 75
        },
        {
          "t": 9,
          "v": 95
        }
      ],
      "precip": [
        {
          "t0": 4,
          "t1": 9,
          "color": "#3d2b1f",
          "amount": 0.65,
          "milky": 0.3
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Toluen + KMnO₄ (phân lớp tím)"
        },
        {
          "t": 3,
          "text": "Đun nóng ống nghiệm"
        },
        {
          "t": 8,
          "text": "Mất màu tím, tạo kết tủa nâu đen MnO₂"
        }
      ]
    }
  },
  {
    "id": "benzene-bromine-ext",
    "grade": 11,
    "topic": "Hiđrocacbon thơm",
    "title": "Benzen với nước brom: Phân lớp & chiết brom (không phản ứng)",
    "chem": [
      "Benzen (C₆H₆)",
      "Nước brom (Br₂ loãng da cam)"
    ],
    "steps": [
      "Cho 1 mL benzen vào ống nghiệm chứa 2 mL nước brom.",
      "Lắc mạnh rồi để yên ống nghiệm trên giá."
    ],
    "eq": [],
    "observe": [
      "Chất lỏng tách thành 2 lớp rõ rệt: lớp trên (benzen hòa tan brom) có màu da cam đậm, lớp nước bên dưới trở nên nhạt màu hoặc không màu."
    ],
    "explain": "Benzen không tác dụng với nước brom ở điều kiện thường (không có Fe, t°). Brom tan trong benzen tốt hơn nhiều so với trong nước nên bị chiết lên lớp trên.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.6
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#f58220",
          "a": 0.5
        },
        {
          "t": 5,
          "c": "#ff7700",
          "a": 0.6
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "Benzen",
          "kind": "stream"
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Nước brom (da cam)"
        },
        {
          "t": 2,
          "text": "Thêm benzen vào lắc đều"
        },
        {
          "t": 6,
          "text": "Chiết: lớp trên da cam đậm, không có phản ứng thế"
        }
      ]
    }
  },
  {
    "id": "styrene-bromine",
    "grade": 11,
    "topic": "Hiđrocacbon thơm",
    "title": "Stiren tác dụng với dung dịch brom (mất màu ở t° thường)",
    "chem": [
      "Stiren (C₆H₅-CH=CH₂)",
      "Dung dịch Brom trong CCl₄ hoặc nước brom"
    ],
    "steps": [
      "Cho 1 mL stiren vào ống nghiệm.",
      "Nhỏ từng giọt dung dịch brom vào và lắc nhẹ."
    ],
    "eq": [
      "C8H8 + Br2 → C8H8Br2"
    ],
    "observe": [
      "Màu da cam của dung dịch brom bị mất màu nhanh chóng ngay ở nhiệt độ thường."
    ],
    "explain": "Stiren có liên kết đôi C=C ở nhánh mạch hở nên dễ dàng tham gia phản ứng cộng brom tương tự anken: C₆H₅CH=CH₂ + Br₂ → C₆H₅CHBr-CH₂Br.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.35,
      "level": [
        {
          "t": 0,
          "v": 0.35
        },
        {
          "t": 4,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 3,
          "c": "#ffb380",
          "a": 0.4
        },
        {
          "t": 6,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 4,
          "color": "#ff6600",
          "label": "Nước brom",
          "kind": "drops"
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Stiren không màu"
        },
        {
          "t": 2,
          "text": "Nhỏ dung dịch brom vào"
        },
        {
          "t": 6,
          "text": "Mất màu ngay ở nhiệt độ thường (cộng vào C=C)"
        }
      ]
    }
  },
  {
    "id": "styrene-kmno4",
    "grade": 11,
    "topic": "Hiđrocacbon thơm",
    "title": "Stiren làm mất màu dung dịch KMnO₄ ở nhiệt độ thường",
    "chem": [
      "Stiren",
      "Dung dịch KMnO₄ 1%"
    ],
    "steps": [
      "Cho 1 mL stiren vào 2 mL dung dịch thuốc tím KMnO₄, lắc đều ở nhiệt độ thường."
    ],
    "eq": [],
    "observe": [
      "Màu tím của KMnO₄ mất nhanh chóng ngay ở nhiệt độ thường, xuất hiện kết tủa nâu đen MnO₂."
    ],
    "explain": "Nhờ liên kết đôi ngoài nhánh (-CH=CH₂), stiren làm mất màu KMnO₄ ngay nhiệt độ thường (khác với benzen không phản ứng, toluen chỉ phản ứng khi đun nóng).",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#8e24aa",
          "a": 0.7
        },
        {
          "t": 4,
          "c": "#b570c9",
          "a": 0.4
        },
        {
          "t": 7,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "Stiren",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 3,
          "t1": 8,
          "color": "#3d2b1f",
          "amount": 0.6,
          "milky": 0.25
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Dung dịch KMnO₄ tím"
        },
        {
          "t": 2,
          "text": "Nhỏ stiren vào, lắc đều"
        },
        {
          "t": 6,
          "text": "Mất màu tím ở t° thường, sinh MnO₂ nâu đen"
        }
      ]
    }
  },
  {
    "id": "glycerol-cuoh2",
    "grade": 11,
    "topic": "Ancol",
    "title": "Glixerol hòa tan Cu(OH)₂ (dung dịch phức xanh lam thẫm)",
    "chem": [
      "Glixerol (C₃H₅(OH)₃)",
      "Dung dịch CuSO₄ 5%",
      "Dung dịch NaOH 10%"
    ],
    "steps": [
      "Tạo Cu(OH)₂ kết tủa xanh lơ trong ống nghiệm.",
      "Cho 1 mL glixerol vào, lắc đều."
    ],
    "eq": [
      "2C3H8O3 + Cu(OH)2 → (C3H7O3)2Cu + 2H2O"
    ],
    "observe": [
      "Kết tủa xanh lơ Cu(OH)₂ tan dần tạo dung dịch màu xanh lam thẫm đặc trưng của phức đồng(II) glixerat."
    ],
    "explain": "Các ancol có từ 2 nhóm -OH kề nhau có tính chất đặc trưng hòa tan Cu(OH)₂ ở nhiệt độ thường tạo phức chất màu xanh lam thẫm.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.35,
      "level": [
        {
          "t": 0,
          "v": 0.35
        },
        {
          "t": 4,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#4aa3ff",
          "a": 0.4
        },
        {
          "t": 4,
          "c": "#0d47a1",
          "a": 0.85
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 4,
          "color": "#cfe8ff",
          "label": "Glixerol",
          "kind": "drops"
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Cu(OH)₂ kết tủa xanh lơ"
        },
        {
          "t": 2,
          "text": "Nhỏ glixerol vào lắc đều"
        },
        {
          "t": 5,
          "text": "Tan tạo phức đồng-glixerol xanh lam thẫm"
        }
      ]
    }
  },
  {
    "id": "phenol-naoh",
    "grade": 11,
    "topic": "Dẫn xuất thơm",
    "title": "Phenol tác dụng với dung dịch kiềm NaOH (tính axit yếu)",
    "chem": [
      "Phenol đục trong nước",
      "Dung dịch NaOH 1M"
    ],
    "steps": [
      "Cho một ít phenol vào nước (hỗn hợp vẩn đục dạng nhũ tương).",
      "Nhỏ từ từ dung dịch NaOH vào ống nghiệm, lắc đều."
    ],
    "eq": [
      "C6H5OH + NaOH → C6H5ONa + H2O"
    ],
    "observe": [
      "Nhũ tương phenol vẩn đục chuyển thành dung dịch trong suốt đồng nhất."
    ],
    "explain": "Phenol có tính axit yếu (axit cacbolic), tác dụng với bazơ NaOH tạo muối natri phenolat tan tốt trong nước: C₆H₅OH + NaOH → C₆H₅ONa + H₂O.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.58
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#f0f3f5",
          "a": 0.6
        },
        {
          "t": 5,
          "c": "#cfe8ff",
          "a": 0.25
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "NaOH 1M",
          "kind": "drops"
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Phenol vẩn đục trong nước"
        },
        {
          "t": 2,
          "text": "Nhỏ dung dịch NaOH vào"
        },
        {
          "t": 6,
          "text": "Nhũ tương tan hoàn toàn thành dd C₆H₅ONa trong suốt"
        }
      ]
    }
  },
  {
    "id": "phenol-fecl3",
    "grade": 11,
    "topic": "Dẫn xuất thơm",
    "title": "Nhận biết Phenol bằng dung dịch FeCl₃ (phức tím)",
    "chem": [
      "Dung dịch phenol loãng",
      "Dung dịch FeCl₃ 1%"
    ],
    "steps": [
      "Cho 1 mL dung dịch phenol vào ống nghiệm.",
      "Nhỏ vài giọt dung dịch FeCl₃ vào."
    ],
    "eq": [],
    "observe": [
      "Dung dịch lập tức chuyển sang màu tím thẫm đặc trưng của phức chất sắt(III) phenolat."
    ],
    "explain": "Phenol tạo phức chelate phối trí màu tím đặc trưng với ion Fe³⁺: [Fe(OC₆H₅)₆]³⁻, dùng để định tính nhận biết hợp chất nhóm phenol.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.35,
      "level": [
        {
          "t": 0,
          "v": 0.35
        },
        {
          "t": 3,
          "v": 0.52
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 3,
          "c": "#6a1b9a",
          "a": 0.75
        },
        {
          "t": 8,
          "c": "#4a148c",
          "a": 0.85
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#d9a441",
          "label": "FeCl₃ 1%",
          "kind": "drops"
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Dung dịch phenol"
        },
        {
          "t": 2,
          "text": "Nhỏ vài giọt FeCl₃"
        },
        {
          "t": 5,
          "text": "Dung dịch chuyển màu tím đặc trưng của phức Fe-phenol"
        }
      ]
    }
  },
  {
    "id": "alcl3-nh3",
    "grade": 12,
    "topic": "Nhôm",
    "title": "AlCl₃ tác dụng với dung dịch NH₃ dư (kết tủa không tan trong NH₃ dư)",
    "chem": [
      "Dung dịch AlCl₃",
      "Dung dịch NH₃ 2M"
    ],
    "steps": [
      "Nhỏ từ từ dung dịch NH₃ vào ống nghiệm chứa AlCl₃.",
      "Tiếp tục nhỏ NH₃ đến dư."
    ],
    "eq": [
      "AlCl3 + 3NH3 + 3H2O → Al(OH)3 + 3NH4Cl"
    ],
    "observe": [
      "Xuất hiện kết tủa keo trắng Al(OH)₃, khi nhỏ NH₃ đến dư kết tủa vẫn không tan (khác với khi dùng dung dịch NaOH)."
    ],
    "explain": "Dung dịch NH₃ là bazơ yếu, không đủ mạnh để hòa tan hiđroxit lưỡng tính Al(OH)₃; ion Al³⁺ cũng không tạo phức tan với NH₃.",
    "v": {
      "vessel": "tube",
      "duration": 11,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.55
        },
        {
          "t": 7,
          "v": 0.7
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "NH₃ vừa đủ",
          "kind": "drops"
        },
        {
          "t0": 5.5,
          "t1": 8,
          "color": "#cfe8ff",
          "label": "NH₃ dư",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 2,
          "t1": 6,
          "color": "#f6f6f0",
          "amount": 0.8,
          "milky": 0.6
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Dung dịch AlCl₃"
        },
        {
          "t": 2.5,
          "text": "Tạo kết tủa keo trắng Al(OH)₃"
        },
        {
          "t": 7,
          "text": "NH₃ dư: kết tủa không tan"
        }
      ]
    }
  },
  {
    "id": "aniline-hcl",
    "grade": 12,
    "topic": "Amin",
    "title": "Anilin tác dụng với axit clohiđric (tính bazơ của amin thơm)",
    "chem": [
      "Anilin ít tan trong nước",
      "Dung dịch HCl 2M"
    ],
    "steps": [
      "Cho vài giọt anilin vào ống nghiệm chứa nước (vẩn đục/chìm đáy).",
      "Nhỏ từng giọt dung dịch HCl vào, lắc đều."
    ],
    "eq": [
      "C6H5NH2 + HCl → C6H5NH3Cl"
    ],
    "observe": [
      "Hỗn hợp anilin vẩn đục tan hoàn toàn, tạo dung dịch trong suốt đồng nhất."
    ],
    "explain": "Anilin có đôi e tự do trên nitơ thể hiện tính bazơ yếu, nhận proton từ HCl tạo muối phenylamoni clorua (C₆H₅NH₃Cl) tan tốt trong nước.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.35,
      "level": [
        {
          "t": 0,
          "v": 0.35
        },
        {
          "t": 3,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#e4e8eb",
          "a": 0.55
        },
        {
          "t": 5,
          "c": "#cfe8ff",
          "a": 0.25
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "HCl 2M",
          "kind": "drops"
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Anilin vẩn đục (ít tan)"
        },
        {
          "t": 2,
          "text": "Nhỏ HCl vào, lắc đều"
        },
        {
          "t": 6,
          "text": "Tan hoàn toàn thành dd muối phenylamoni clorua trong suốt"
        }
      ]
    }
  },
  {
    "id": "ethanol-na",
    "grade": 11,
    "topic": "Ancol",
    "title": "Etanol tác dụng với kim loại Natri (sinh khí H₂)",
    "chem": [
      "Etanol khan (C₂H₅OH)",
      "Mẩu kim loại Na nhỏ"
    ],
    "steps": [
      "Cho 2 mL etanol nguyên chất vào ống nghiệm khô.",
      "Thả mẩu natri nhỏ đã cạo sạch lớp dầu bảo quản vào."
    ],
    "eq": [
      "2C2H5OH + 2Na → 2C2H5ONa + H2"
    ],
    "observe": [
      "Mẩu Na chìm dần xuống dưới etanol, sủi bọt khí H₂ đều đặn, phản ứng êm dịu hơn so với Na tác dụng với nước."
    ],
    "explain": "Nguyên tử H linh động của nhóm hiđroxyl (-OH) trong ancol bị thay thế bởi kim loại kiềm giải phóng khí H₂.",
    "v": {
      "vessel": "tube",
      "duration": 11,
      "baseLevel": 0.45,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "bubbles": [
        {
          "t0": 2,
          "t1": 9,
          "rate": 8,
          "size": 2.2
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Etanol khan"
        },
        {
          "t": 1.5,
          "text": "Thả mẩu Na vào"
        },
        {
          "t": 3,
          "text": "Khí H₂ sủi bọt êm dịu, tạo natri etylat"
        }
      ]
    }
  },
  {
    "id": "ethanol-cuo",
    "grade": 11,
    "topic": "Ancol",
    "title": "Oxi hóa Etanol bằng CuO nung nóng (điều chế anđehit axetic)",
    "chem": [
      "Dây đồng uốn lò xo",
      "Cồn etanol",
      "Đèn cồn"
    ],
    "steps": [
      "Nung nóng dây đồng trên ngọn lửa đèn cồn đến khi hóa đen (tạo CuO).",
      "Nhúng nhanh cuộn dây đồng nóng đen vào ống nghiệm chứa etanol."
    ],
    "eq": [
      "C2H5OH + CuO → CH3CHO + Cu + H2O"
    ],
    "cond": "t°",
    "observe": [
      "Cuộn đồng từ màu đen của CuO chuyển lại thành màu đỏ sáng của kim loại Cu, dung dịch có mùi hắc đặc trưng của anđehit axetic."
    ],
    "explain": "Ancol bậc một bị oxi hóa không hoàn toàn bởi đồng(II) oxit nung nóng tạo anđehit tương ứng và kim loại Cu.",
    "v": {
      "vessel": "tube",
      "duration": 11,
      "baseLevel": 0.45,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "heat": [
        {
          "t0": 1,
          "t1": 6
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 4,
          "v": 80
        },
        {
          "t": 9,
          "v": 45
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Etanol trong ống nghiệm"
        },
        {
          "t": 2,
          "text": "Nhúng CuO nung đỏ đen vào"
        },
        {
          "t": 5,
          "text": "Dây đồng sáng đỏ trở lại (Cu), sinh CH₃CHO"
        }
      ]
    }
  },
  {
    "id": "acetic-acid-caco3",
    "grade": 11,
    "topic": "Axit cacboxylic",
    "title": "Axit axetic tác dụng với CaCO₃ (sinh khí CO₂)",
    "chem": [
      "Dung dịch CH₃COOH 10%",
      "Mẩu đá vôi hoặc bột CaCO₃"
    ],
    "steps": [
      "Cho một ít vụn CaCO₃ vào ống nghiệm.",
      "Rót 2 mL dung dịch axit axetic vào."
    ],
    "eq": [
      "2CH3COOH + CaCO3 → (CH3COO)2Ca + CO2 + H2O"
    ],
    "observe": [
      "Mẩu đá vôi tan dần, sủi bọt khí CO₂ mạnh mẽ làm đục nước vôi trong."
    ],
    "explain": "Axit axetic có đầy đủ tính chất của một axit, mạnh hơn axit cacbonic nên đẩy được CO₂ ra khỏi muối cacbonat.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.45,
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "bubbles": [
        {
          "t0": 1.5,
          "t1": 8,
          "rate": 12,
          "size": 2.5
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Vụn CaCO₃ trong ống nghiệm"
        },
        {
          "t": 1.5,
          "text": "Rót CH₃COOH vào"
        },
        {
          "t": 3,
          "text": "Sủi bọt khí CO₂ mạnh mẽ, đá vôi tan"
        }
      ]
    }
  },
  {
    "id": "acetone-iodoform",
    "grade": 11,
    "topic": "Anđehit – xeton",
    "title": "Phản ứng iođofom của axeton (kết tủa vàng CHI₃)",
    "chem": [
      "Axeton (CH₃COCH₃)",
      "Dung dịch I₂ trong KI",
      "Dung dịch NaOH 10%"
    ],
    "steps": [
      "Cho 1 mL axeton vào ống nghiệm, thêm 2 mL dung dịch iot (dung dịch có màu nâu).",
      "Nhỏ từ từ từng giọt NaOH vào đến khi dung dịch mất màu nâu."
    ],
    "eq": [],
    "observe": [
      "Màu nâu của iot biến mất, ngay sau đó xuất hiện kết tủa màu vàng nhạt có mùi sát trùng đặc trưng của iođofom (CHI₃)."
    ],
    "explain": "Các hợp chất chứa nhóm metyl xeton CH₃-C=O tham gia phản ứng iođofom với I₂/NaOH tạo kết tủa CHI₃ màu vàng, dùng để nhận biết axeton.",
    "v": {
      "vessel": "tube",
      "duration": 11,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 3,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#8d4a1a",
          "a": 0.6
        },
        {
          "t": 4,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3.5,
          "color": "#cfe8ff",
          "label": "NaOH 10%",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 4,
          "t1": 8,
          "color": "#fff176",
          "amount": 0.7,
          "milky": 0.4
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Axeton + dd I₂ (nâu)"
        },
        {
          "t": 2,
          "text": "Nhỏ NaOH đến mất màu nâu"
        },
        {
          "t": 5,
          "text": "Xuất hiện kết tủa vàng iođofom CHI₃"
        }
      ]
    }
  },
  {
    "id": "fecl2-kmno4",
    "grade": 12,
    "topic": "Sắt",
    "title": "Dung dịch FeSO₄ khử KMnO₄ trong môi trường axit H₂SO₄",
    "chem": [
      "Dung dịch FeSO₄ mới pha",
      "Dung dịch KMnO₄ 0,05M",
      "Dung dịch H₂SO₄ loãng"
    ],
    "steps": [
      "Cho 2 mL dung dịch FeSO₄ và 1 mL H₂SO₄ loãng vào ống nghiệm.",
      "Nhỏ từng giọt dung dịch KMnO₄ vào."
    ],
    "eq": [
      "10FeSO4 + 2KMnO4 + 8H2SO4 → 5Fe2(SO4)3 + K2SO4 + 2MnSO4 + 8H2O"
    ],
    "observe": [
      "Màu tím của dung dịch KMnO₄ mất ngay khi nhỏ vào, dung dịch dần chuyển sang màu vàng nhạt của muối sắt(III)."
    ],
    "explain": "Ion Fe²⁺ có tính khử mạnh, khử ion MnO₄⁻ (tím) thành Mn²⁺ (không màu) trong môi trường axit: 5Fe²⁺ + MnO₄⁻ + 8H⁺ → 5Fe³⁺ + Mn²⁺ + 4H₂O.",
    "v": {
      "vessel": "tube",
      "duration": 11,
      "baseLevel": 0.4,
      "level": [
        {
          "t": 0,
          "v": 0.4
        },
        {
          "t": 4,
          "v": 0.6
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#a9cfa0",
          "a": 0.4
        },
        {
          "t": 4,
          "c": "#fff3e0",
          "a": 0.4
        },
        {
          "t": 8,
          "c": "#d9a441",
          "a": 0.5
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 4,
          "color": "#8e24aa",
          "label": "KMnO₄",
          "kind": "drops"
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "FeSO₄ + H₂SO₄ loãng"
        },
        {
          "t": 2,
          "text": "Nhỏ KMnO₄ tím vào"
        },
        {
          "t": 6,
          "text": "KMnO₄ mất màu ngay, sinh Fe³⁺ vàng nhạt"
        }
      ]
    }
  },
  {
    "id": "ethene-kmno4",
    "grade": 11,
    "topic": "Hiđrocacbon không no",
    "title": "Khí etilen làm mất màu dung dịch KMnO₄ (tạo etylen glicol)",
    "chem": [
      "Khí etilen (C₂H₄)",
      "Dung dịch KMnO₄ loãng"
    ],
    "steps": [
      "Dẫn luồng khí etilen sục từ từ vào ống nghiệm chứa dung dịch KMnO₄ loãng."
    ],
    "eq": [
      "3C2H4 + 2KMnO4 + 4H2O → 3C2H4(OH)2 + 2MnO2 + 2KOH"
    ],
    "observe": [
      "Màu tím của dung dịch KMnO₄ nhạt dần rồi mất màu hoàn toàn, xuất hiện kết tủa nâu đen MnO₂ lắng xuống."
    ],
    "explain": "Liên kết đôi C=C của anken kém bền, bị chất oxi hóa mạnh như KMnO₄ oxi hóa không hoàn toàn thành ancol đa chức (etylen glicol) và MnO₂.",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.45,
      "liquid": [
        {
          "t": 0,
          "c": "#8e24aa",
          "a": 0.7
        },
        {
          "t": 4,
          "c": "#a569bd",
          "a": 0.45
        },
        {
          "t": 7,
          "c": "#cfe8ff",
          "a": 0.25
        }
      ],
      "bubbles": [
        {
          "t0": 1,
          "t1": 8,
          "rate": 9,
          "size": 2.4
        }
      ],
      "precip": [
        {
          "t0": 3,
          "t1": 8,
          "color": "#3d2b1f",
          "amount": 0.7,
          "milky": 0.3
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Dung dịch KMnO₄ (tím)"
        },
        {
          "t": 2,
          "text": "Sục khí C₂H₄ vào"
        },
        {
          "t": 6,
          "text": "Mất màu tím, kết tủa nâu đen MnO₂"
        }
      ]
    }
  },
  {
    "id": "fe-cl2",
    "grade": 10,
    "topic": "Halogen",
    "title": "Sắt cháy trong khí clo (tạo khói nâu đỏ FeCl₃)",
    "chem": [
      "Dây sắt quấn lò xo có gắn mẩu than",
      "Bình chứa khí clo (vàng lục)"
    ],
    "steps": [
      "Đốt nóng đỏ đầu dây sắt rồi đưa nhanh vào bình chứa khí clo."
    ],
    "eq": [
      "2Fe + 3Cl2 → 2FeCl3"
    ],
    "cond": "t°",
    "observe": [
      "Sắt cháy sáng chói, khói màu nâu đỏ tạo thành bám vào thành bình, để nguội thêm nước hòa tan tạo dung dịch màu vàng nâu."
    ],
    "explain": "Khí clo là chất oxi hóa rất mạnh, oxi hóa sắt trực tiếp lên mức oxi hóa cao nhất là Fe(+3).",
    "v": {
      "vessel": "flask",
      "duration": 11,
      "baseLevel": 0.2,
      "liquid": [
        {
          "t": 0,
          "c": "#d4e157",
          "a": 0.35
        },
        {
          "t": 7,
          "c": "#d9a441",
          "a": 0.6
        }
      ],
      "smoke": {
        "t0": 2,
        "t1": 8,
        "color": "#8d5524",
        "rate": 10
      },
      "caption": [
        {
          "t": 0,
          "text": "Bình khí Cl₂ màu vàng lục"
        },
        {
          "t": 2,
          "text": "Đưa sắt nóng đỏ vào: cháy sáng chói"
        },
        {
          "t": 5,
          "text": "Khói nâu đỏ FeCl₃ phủ kín bình"
        }
      ]
    }
  },
  {
    "id": "na2s2o3-h2so4",
    "grade": 10,
    "topic": "Tốc độ phản ứng",
    "title": "Ảnh hưởng nồng độ đến tốc độ phản ứng (Na₂S₂O₃ + H₂SO₄ loãng)",
    "chem": [
      "Dung dịch Na₂S₂O₃ 0,1M",
      "Dung dịch H₂SO₄ 0,1M",
      "Tờ giấy có đánh dấu chữ thập (+)"
    ],
    "steps": [
      "Đặt cốc đựng dung dịch Na₂S₂O₃ lên dấu (+).",
      "Rót dung dịch H₂SO₄ vào, bấm đồng hồ giây và quan sát dấu (+) từ trên xuống."
    ],
    "eq": [
      "Na2S2O3 + H2SO4 → Na2SO4 + S + SO2 + H2O"
    ],
    "observe": [
      "Dung dịch từ trong suốt chuyển dần sang mờ đục do lưu huỳnh (S) sinh ra dạng hạt keo, sau một thời gian dấu (+) biến mất hoàn toàn."
    ],
    "explain": "Phản ứng tạo lưu huỳnh tự do dạng phân tán keo làm mờ đục dung dịch; nồng độ chất phản ứng càng cao thì dấu (+) biến mất càng nhanh.",
    "v": {
      "vessel": "beaker",
      "duration": 11,
      "baseLevel": 0.35,
      "level": [
        {
          "t": 0,
          "v": 0.35
        },
        {
          "t": 3,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.25
        },
        {
          "t": 4,
          "c": "#fffde7",
          "a": 0.5
        },
        {
          "t": 8,
          "c": "#fff59d",
          "a": 0.8
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "H₂SO₄ loãng",
          "kind": "stream"
        }
      ],
      "precip": [
        {
          "t0": 3,
          "t1": 8,
          "color": "#ffee58",
          "amount": 0.75,
          "milky": 0.85
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Na₂S₂O₃ trên dấu (+)"
        },
        {
          "t": 2,
          "text": "Rót H₂SO₄ vào bấm giờ"
        },
        {
          "t": 6,
          "text": "Lưu huỳnh S kết tủa keo che khuất dấu (+)"
        }
      ]
    }
  },
  {
    "id": "c-h2so4-dac",
    "grade": 10,
    "topic": "Oxi - Lưu huỳnh",
    "title": "Cacbon tác dụng với H₂SO₄ đặc nóng (tạo hỗn hợp khí CO₂ và SO₂)",
    "chem": [
      "Bột than gỗ (C)",
      "Axit H₂SO₄ đặc 98%",
      "Đèn cồn"
    ],
    "steps": [
      "Cho bột than gỗ vào ống nghiệm chứa 2 mL H₂SO₄ đặc.",
      "Đun nóng nhẹ ống nghiệm trên ngọn lửa đèn cồn."
    ],
    "eq": [
      "C + 2H2SO4 → CO2 + 2SO2 + 2H2O"
    ],
    "cond": "đặc, t°",
    "observe": [
      "Bột than tan dần, sủi nhiều bọt khí không màu (hỗn hợp CO₂ và SO₂ có mùi hắc đặc trưng)."
    ],
    "explain": "Axit sunfuric đặc khi đun nóng có tính oxi hóa rất mạnh, oxi hóa C lên số oxi hóa +4 (CO₂) và bị khử xuống +4 (SO₂).",
    "v": {
      "vessel": "tube",
      "duration": 11,
      "baseLevel": 0.4,
      "liquid": [
        {
          "t": 0,
          "c": "#424242",
          "a": 0.5
        },
        {
          "t": 7,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "heat": [
        {
          "t0": 1,
          "t1": 8
        }
      ],
      "temp": [
        {
          "t": 0,
          "v": 25
        },
        {
          "t": 5,
          "v": 95
        }
      ],
      "bubbles": [
        {
          "t0": 2,
          "t1": 8,
          "rate": 10,
          "size": 2.5
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Than gỗ + H₂SO₄ đặc"
        },
        {
          "t": 2,
          "text": "Đun nóng ống nghiệm"
        },
        {
          "t": 5,
          "text": "Sủi nhiều bọt khí CO₂ và SO₂ mùi hắc"
        }
      ]
    }
  },
  {
    "id": "fe2-agno3",
    "grade": 12,
    "topic": "Sắt",
    "title": "Muối Sắt(II) tác dụng với dung dịch AgNO₃ (quy tắc α)",
    "chem": [
      "Dung dịch Fe(NO₃)₂",
      "Dung dịch AgNO₃ 0,1M"
    ],
    "steps": [
      "Cho 1 mL dung dịch Fe(NO₃)₂ vào ống nghiệm.",
      "Nhỏ từng giọt dung dịch AgNO₃ vào."
    ],
    "eq": [
      "AgNO3 + Fe(NO3)2 → Fe(NO3)3 + Ag"
    ],
    "observe": [
      "Xuất hiện chất rắn màu xám trắng hoặc xám bạc của bạc kim loại (Ag) lắng xuống đáy ống nghiệm."
    ],
    "explain": "Cặp oxi hóa khử Ag⁺/Ag có thế điện cực chuẩn lớn hơn Fe³⁺/Fe²⁺ (+0,80V > +0,77V), nên ion Ag⁺ oxi hóa được Fe²⁺ lên Fe³⁺ và bị khử thành Ag kim loại (quy tắc α).",
    "v": {
      "vessel": "tube",
      "duration": 10,
      "baseLevel": 0.35,
      "level": [
        {
          "t": 0,
          "v": 0.35
        },
        {
          "t": 3,
          "v": 0.55
        }
      ],
      "liquid": [
        {
          "t": 0,
          "c": "#a9cfa0",
          "a": 0.4
        },
        {
          "t": 4,
          "c": "#fff3e0",
          "a": 0.35
        },
        {
          "t": 8,
          "c": "#d9a441",
          "a": 0.5
        }
      ],
      "pours": [
        {
          "t0": 1,
          "t1": 3,
          "color": "#cfe8ff",
          "label": "AgNO₃",
          "kind": "drops"
        }
      ],
      "precip": [
        {
          "t0": 2,
          "t1": 7,
          "color": "#b0bec5",
          "amount": 0.65,
          "milky": 0.3
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Dung dịch Fe²⁺ (lục nhạt)"
        },
        {
          "t": 2,
          "text": "Nhỏ AgNO₃ vào"
        },
        {
          "t": 6,
          "text": "Kết tủa bạc Ag xám kim loại, dd hóa vàng nhạt (Fe³⁺)"
        }
      ]
    }
  },
  {
    "id": "zn-cuso4",
    "grade": 12,
    "topic": "Kim loại",
    "title": "Kẽm đẩy Đồng ra khỏi dung dịch muối (ăn mòn kim loại)",
    "chem": [
      "Lá kẽm (Zn) cạo sạch",
      "Dung dịch CuSO₄ 0,5M"
    ],
    "steps": [
      "Nhúng thanh lá kẽm vào cốc thủy tinh đựng dung dịch CuSO₄."
    ],
    "eq": [
      "Zn + CuSO4 → ZnSO4 + Cu"
    ],
    "observe": [
      "Màu xanh lam của dung dịch CuSO₄ nhạt dần, trên bề mặt thanh kẽm có một lớp kim loại màu đỏ bám vào (Cu)."
    ],
    "explain": "Kẽm có tính khử mạnh hơn đồng (đứng trước Cu trong dãy điện hóa), khử ion Cu²⁺ thành Cu kim loại bám ngoài thanh kẽm.",
    "v": {
      "vessel": "beaker",
      "duration": 11,
      "baseLevel": 0.45,
      "liquid": [
        {
          "t": 0,
          "c": "#2f86e0",
          "a": 0.65
        },
        {
          "t": 5,
          "c": "#7fb8f0",
          "a": 0.4
        },
        {
          "t": 9,
          "c": "#cfe8ff",
          "a": 0.25
        }
      ],
      "precip": [
        {
          "t0": 2,
          "t1": 8,
          "color": "#b7410e",
          "amount": 0.6,
          "milky": 0.2
        }
      ],
      "caption": [
        {
          "t": 0,
          "text": "Dung dịch CuSO₄ (xanh lam)"
        },
        {
          "t": 2,
          "text": "Nhúng thanh kẽm vào"
        },
        {
          "t": 6,
          "text": "Cu đỏ bám vào thanh Zn, dung dịch nhạt màu dần"
        }
      ]
    }
  },
  {
    "id": "flame-li",
    "grade": 12,
    "topic": "Nhận biết ion",
    "title": "Thử màu ngọn lửa Li⁺: đỏ tía",
    "chem": [
      "Muối của liti",
      "Dây platin",
      "Đèn khí"
    ],
    "steps": [
      "Nhúng dây Pt vào dung dịch muối liti rồi đưa vào ngọn lửa không màu."
    ],
    "eq": [],
    "observe": [
      "Ngọn lửa có màu đỏ tía."
    ],
    "explain": "Electron bị kích thích khi nhận nhiệt, khi trở về trạng thái cơ bản phát ra ánh sáng có bước sóng đặc trưng của từng nguyên tố.",
    "v": {
      "vessel": "tube",
      "duration": 8,
      "scene": "flame",
      "liquid": [],
      "flame": {
        "t0": 1.5,
        "t1": 7,
        "color": "#e0245e",
        "wire": true
      },
      "caption": [
        {
          "t": 0,
          "text": "Ngọn lửa đèn khí"
        },
        {
          "t": 2,
          "text": "Màu đỏ tía — Li⁺"
        }
      ]
    }
  },
  {
    "id": "flame-na",
    "grade": 12,
    "topic": "Nhận biết ion",
    "title": "Thử màu ngọn lửa Na⁺: vàng",
    "chem": [
      "Muối của natri",
      "Dây platin",
      "Đèn khí"
    ],
    "steps": [
      "Nhúng dây Pt vào dung dịch muối natri rồi đưa vào ngọn lửa không màu."
    ],
    "eq": [],
    "observe": [
      "Ngọn lửa có màu vàng."
    ],
    "explain": "Electron bị kích thích khi nhận nhiệt, khi trở về trạng thái cơ bản phát ra ánh sáng có bước sóng đặc trưng của từng nguyên tố.",
    "v": {
      "vessel": "tube",
      "duration": 8,
      "scene": "flame",
      "liquid": [],
      "flame": {
        "t0": 1.5,
        "t1": 7,
        "color": "#ffd400",
        "wire": true
      },
      "caption": [
        {
          "t": 0,
          "text": "Ngọn lửa đèn khí"
        },
        {
          "t": 2,
          "text": "Màu vàng — Na⁺"
        }
      ]
    }
  },
  {
    "id": "flame-k",
    "grade": 12,
    "topic": "Nhận biết ion",
    "title": "Thử màu ngọn lửa K⁺: tím",
    "chem": [
      "Muối của kali",
      "Dây platin",
      "Đèn khí"
    ],
    "steps": [
      "Nhúng dây Pt vào dung dịch muối kali rồi đưa vào ngọn lửa không màu."
    ],
    "eq": [],
    "observe": [
      "Ngọn lửa có màu tím."
    ],
    "explain": "Electron bị kích thích khi nhận nhiệt, khi trở về trạng thái cơ bản phát ra ánh sáng có bước sóng đặc trưng của từng nguyên tố.",
    "v": {
      "vessel": "tube",
      "duration": 8,
      "scene": "flame",
      "liquid": [],
      "flame": {
        "t0": 1.5,
        "t1": 7,
        "color": "#b388ff",
        "wire": true
      },
      "caption": [
        {
          "t": 0,
          "text": "Ngọn lửa đèn khí"
        },
        {
          "t": 2,
          "text": "Màu tím — K⁺"
        }
      ]
    }
  },
  {
    "id": "flame-ca",
    "grade": 12,
    "topic": "Nhận biết ion",
    "title": "Thử màu ngọn lửa Ca²⁺: đỏ gạch",
    "chem": [
      "Muối của canxi",
      "Dây platin",
      "Đèn khí"
    ],
    "steps": [
      "Nhúng dây Pt vào dung dịch muối canxi rồi đưa vào ngọn lửa không màu."
    ],
    "eq": [],
    "observe": [
      "Ngọn lửa có màu đỏ gạch."
    ],
    "explain": "Electron bị kích thích khi nhận nhiệt, khi trở về trạng thái cơ bản phát ra ánh sáng có bước sóng đặc trưng của từng nguyên tố.",
    "v": {
      "vessel": "tube",
      "duration": 8,
      "scene": "flame",
      "liquid": [],
      "flame": {
        "t0": 1.5,
        "t1": 7,
        "color": "#e8622b",
        "wire": true
      },
      "caption": [
        {
          "t": 0,
          "text": "Ngọn lửa đèn khí"
        },
        {
          "t": 2,
          "text": "Màu đỏ gạch — Ca²⁺"
        }
      ]
    }
  },
  {
    "id": "flame-sr",
    "grade": 12,
    "topic": "Nhận biết ion",
    "title": "Thử màu ngọn lửa Sr²⁺: đỏ son",
    "chem": [
      "Muối của stronti",
      "Dây platin",
      "Đèn khí"
    ],
    "steps": [
      "Nhúng dây Pt vào dung dịch muối stronti rồi đưa vào ngọn lửa không màu."
    ],
    "eq": [],
    "observe": [
      "Ngọn lửa có màu đỏ son."
    ],
    "explain": "Electron bị kích thích khi nhận nhiệt, khi trở về trạng thái cơ bản phát ra ánh sáng có bước sóng đặc trưng của từng nguyên tố.",
    "v": {
      "vessel": "tube",
      "duration": 8,
      "scene": "flame",
      "liquid": [],
      "flame": {
        "t0": 1.5,
        "t1": 7,
        "color": "#e31b3a",
        "wire": true
      },
      "caption": [
        {
          "t": 0,
          "text": "Ngọn lửa đèn khí"
        },
        {
          "t": 2,
          "text": "Màu đỏ son — Sr²⁺"
        }
      ]
    }
  },
  {
    "id": "flame-ba",
    "grade": 12,
    "topic": "Nhận biết ion",
    "title": "Thử màu ngọn lửa Ba²⁺: lục vàng",
    "chem": [
      "Muối của bari",
      "Dây platin",
      "Đèn khí"
    ],
    "steps": [
      "Nhúng dây Pt vào dung dịch muối bari rồi đưa vào ngọn lửa không màu."
    ],
    "eq": [],
    "observe": [
      "Ngọn lửa có màu lục vàng."
    ],
    "explain": "Electron bị kích thích khi nhận nhiệt, khi trở về trạng thái cơ bản phát ra ánh sáng có bước sóng đặc trưng của từng nguyên tố.",
    "v": {
      "vessel": "tube",
      "duration": 8,
      "scene": "flame",
      "liquid": [],
      "flame": {
        "t0": 1.5,
        "t1": 7,
        "color": "#9bd13c",
        "wire": true
      },
      "caption": [
        {
          "t": 0,
          "text": "Ngọn lửa đèn khí"
        },
        {
          "t": 2,
          "text": "Màu lục vàng — Ba²⁺"
        }
      ]
    }
  },
  {
    "id": "flame-cu",
    "grade": 12,
    "topic": "Nhận biết ion",
    "title": "Thử màu ngọn lửa Cu²⁺: lục xanh",
    "chem": [
      "Muối của đồng",
      "Dây platin",
      "Đèn khí"
    ],
    "steps": [
      "Nhúng dây Pt vào dung dịch muối đồng rồi đưa vào ngọn lửa không màu."
    ],
    "eq": [],
    "observe": [
      "Ngọn lửa có màu lục xanh."
    ],
    "explain": "Electron bị kích thích khi nhận nhiệt, khi trở về trạng thái cơ bản phát ra ánh sáng có bước sóng đặc trưng của từng nguyên tố.",
    "v": {
      "vessel": "tube",
      "duration": 8,
      "scene": "flame",
      "liquid": [],
      "flame": {
        "t0": 1.5,
        "t1": 7,
        "color": "#27c9a4",
        "wire": true
      },
      "caption": [
        {
          "t": 0,
          "text": "Ngọn lửa đèn khí"
        },
        {
          "t": 2,
          "text": "Màu lục xanh — Cu²⁺"
        }
      ]
    }
  },
  {
    "id": "elec-cucl2",
    "grade": 12,
    "topic": "Điện phân",
    "title": "Điện phân dung dịch CuCl₂ (điện cực than chì)",
    "chem": [
      "Dung dịch CuCl₂",
      "Hai điện cực than chì",
      "Nguồn một chiều"
    ],
    "steps": [
      "Nối điện, quan sát hai điện cực."
    ],
    "eq": [
      "CuCl2 → Cu + Cl2"
    ],
    "cond": "điện phân",
    "observe": [
      "Catot (−): Cu đỏ bám vào điện cực.",
      "Anot (+): khí Cl₂ vàng lục thoát ra."
    ],
    "explain": "Catot: Cu²⁺ + 2e → Cu. Anot: 2Cl⁻ → Cl₂ + 2e.",
    "v": {
      "vessel": "beaker",
      "duration": 13,
      "scene": "electro",
      "liquid": [
        {
          "t": 0,
          "c": "#4d9fe0",
          "a": 0.5
        },
        {
          "t": 12,
          "c": "#8bc4e8",
          "a": 0.4
        }
      ],
      "electro": {
        "anode": "C",
        "cathode": "C",
        "gasA": "#b7d94c",
        "depositC": "#c8643b",
        "labelA": "Cl₂↑",
        "labelC": "Cu",
        "rodA": "#3a3d42",
        "rodC": "#3a3d42"
      },
      "caption": [
        {
          "t": 1,
          "text": "Catot: Cu²⁺ + 2e → Cu"
        },
        {
          "t": 6,
          "text": "Anot: 2Cl⁻ → Cl₂ + 2e"
        }
      ]
    }
  },
  {
    "id": "elec-nacl",
    "grade": 12,
    "topic": "Điện phân",
    "title": "Điện phân dung dịch NaCl có màng ngăn",
    "chem": [
      "Dung dịch NaCl bão hòa",
      "Điện cực trơ",
      "Phenolphtalein"
    ],
    "steps": [
      "Điện phân có màng ngăn xốp."
    ],
    "eq": [
      "2NaCl + 2H2O → 2NaOH + H2 + Cl2"
    ],
    "cond": "điện phân, có màng ngăn",
    "observe": [
      "Catot: khí H₂, dung dịch hóa hồng (phenolphtalein).",
      "Anot: khí Cl₂ vàng lục."
    ],
    "explain": "Catot: 2H₂O + 2e → H₂ + 2OH⁻. Anot: 2Cl⁻ → Cl₂ + 2e. Sản xuất xút – clo.",
    "v": {
      "vessel": "beaker",
      "duration": 14,
      "scene": "electro",
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        },
        {
          "t": 6,
          "c": "#f5a0c8",
          "a": 0.4
        },
        {
          "t": 13,
          "c": "#ff3d9a",
          "a": 0.5
        }
      ],
      "electro": {
        "anode": "C",
        "cathode": "C",
        "gasA": "#b7d94c",
        "gasC": "#f4f8ff",
        "labelA": "Cl₂↑",
        "labelC": "H₂↑ + OH⁻",
        "rodA": "#3a3d42",
        "rodC": "#3a3d42"
      },
      "caption": [
        {
          "t": 2,
          "text": "Catot: H₂ và dung dịch hồng"
        },
        {
          "t": 8,
          "text": "Anot: Cl₂"
        }
      ]
    }
  },
  {
    "id": "elec-water",
    "grade": 12,
    "topic": "Điện phân",
    "title": "Điện phân nước (H₂SO₄ loãng): V(H₂) : V(O₂) = 2 : 1",
    "chem": [
      "Dung dịch H₂SO₄ loãng",
      "Điện cực Pt"
    ],
    "steps": [
      "Nối điện một chiều."
    ],
    "eq": [
      "2H2O → 2H2 + O2"
    ],
    "cond": "điện phân",
    "observe": [
      "Catot: khí H₂ nhiều gấp đôi anot: khí O₂."
    ],
    "explain": "Catot: 2H⁺ + 2e → H₂. Anot: 2H₂O → O₂ + 4H⁺ + 4e.",
    "v": {
      "vessel": "beaker",
      "duration": 12,
      "scene": "electro",
      "liquid": [
        {
          "t": 0,
          "c": "#cfe8ff",
          "a": 0.3
        }
      ],
      "electro": {
        "anode": "Pt",
        "cathode": "Pt",
        "gasA": "#f4f8ff",
        "gasC": "#f4f8ff",
        "labelA": "O₂↑",
        "labelC": "H₂↑ (gấp đôi)",
        "rodA": "#9aa3ad",
        "rodC": "#9aa3ad"
      },
      "caption": [
        {
          "t": 2,
          "text": "H₂ : O₂ = 2 : 1"
        }
      ]
    }
  },
  {
    "id": "elec-plating",
    "grade": 12,
    "topic": "Điện phân",
    "title": "Mạ đồng: anot Cu tan, Cu bám catot",
    "chem": [
      "Dung dịch CuSO₄",
      "Anot: tấm Cu",
      "Catot: vật cần mạ"
    ],
    "steps": [
      "Nối vật cần mạ với cực âm."
    ],
    "eq": [
      "Cu → Cu^2+ + 2e",
      "Cu^2+ + 2e → Cu"
    ],
    "cond": "điện phân",
    "observe": [
      "Anot (Cu) mòn dần; Cu bám lên catot; nồng độ Cu²⁺ không đổi."
    ],
    "explain": "Anot tan: Cu → Cu²⁺ + 2e. Catot: Cu²⁺ + 2e → Cu.",
    "v": {
      "vessel": "beaker",
      "duration": 13,
      "scene": "electro",
      "liquid": [
        {
          "t": 0,
          "c": "#2f86e0",
          "a": 0.5
        }
      ],
      "electro": {
        "anode": "Cu",
        "cathode": "Fe",
        "depositC": "#c8643b",
        "labelA": "Cu → Cu²⁺",
        "labelC": "Cu bám",
        "rodA": "#c8643b",
        "rodC": "#8f9aa5"
      },
      "caption": [
        {
          "t": 4,
          "text": "Lớp đồng dày dần trên catot"
        }
      ]
    }
  },
  {
    "id": "pin-zn-cu",
    "grade": 12,
    "topic": "Pin điện hóa",
    "title": "Pin Ganvani Zn–Cu (Daniell): E° = 1,10 V",
    "chem": [
      "Hai cốc dung dịch muối",
      "Hai điện cực kim loại",
      "Cầu muối KNO₃",
      "Vôn kế"
    ],
    "steps": [
      "Nối hai điện cực với vôn kế, nối hai cốc bằng cầu muối."
    ],
    "eq": [
      "Cu^2+ + Zn → Cu + Zn^2+"
    ],
    "observe": [
      "Vôn kế chỉ suất điện động; điện cực âm tan dần, điện cực dương dày lên."
    ],
    "explain": "Zn (E° = −0,76 V) là anot bị oxi hóa; Cu²⁺ bị khử ở catot. E°pin = 0,34 − (−0,76) = 1,10 V.",
    "v": {
      "vessel": "beaker",
      "duration": 12,
      "scene": "galvanic",
      "liquid": [],
      "galvanic": {
        "left": "#d8e6f5",
        "leftIon": "ZnSO₄",
        "leftMetal": "#9aa3ad",
        "rightMetal": "#c8643b",
        "right": "#4d9fe0",
        "rightIon": "CuSO₄",
        "E": 1.1,
        "leftLabel": "Zn | Zn²⁺",
        "rightLabel": "Cu | Cu²⁺",
        "leftDissolves": true
      },
      "caption": [
        {
          "t": 1,
          "text": "Electron chạy từ anot (−) sang catot (+) qua dây dẫn"
        }
      ]
    }
  },
  {
    "id": "pin-fe-cu",
    "grade": 12,
    "topic": "Pin điện hóa",
    "title": "Pin Fe–Cu: E° = 0,78 V",
    "chem": [
      "Hai cốc dung dịch muối",
      "Hai điện cực kim loại",
      "Cầu muối KNO₃",
      "Vôn kế"
    ],
    "steps": [
      "Nối hai điện cực với vôn kế, nối hai cốc bằng cầu muối."
    ],
    "eq": [
      "Cu^2+ + Fe → Cu + Fe^2+"
    ],
    "observe": [
      "Vôn kế chỉ suất điện động; điện cực âm tan dần, điện cực dương dày lên."
    ],
    "explain": "E°pin = 0,34 − (−0,44) = 0,78 V.",
    "v": {
      "vessel": "beaker",
      "duration": 12,
      "scene": "galvanic",
      "liquid": [],
      "galvanic": {
        "left": "#d9ecd8",
        "leftIon": "FeSO₄",
        "leftMetal": "#8f9aa5",
        "rightMetal": "#c8643b",
        "right": "#4d9fe0",
        "rightIon": "CuSO₄",
        "E": 0.78,
        "leftLabel": "Fe | Fe²⁺",
        "rightLabel": "Cu | Cu²⁺",
        "leftDissolves": true
      },
      "caption": [
        {
          "t": 1,
          "text": "Electron chạy từ anot (−) sang catot (+) qua dây dẫn"
        }
      ]
    }
  },
  {
    "id": "pin-cu-ag",
    "grade": 12,
    "topic": "Pin điện hóa",
    "title": "Pin Cu–Ag: E° = 0,46 V",
    "chem": [
      "Hai cốc dung dịch muối",
      "Hai điện cực kim loại",
      "Cầu muối KNO₃",
      "Vôn kế"
    ],
    "steps": [
      "Nối hai điện cực với vôn kế, nối hai cốc bằng cầu muối."
    ],
    "eq": [
      "2Ag^+ + Cu → 2Ag + Cu^2+"
    ],
    "observe": [
      "Vôn kế chỉ suất điện động; điện cực âm tan dần, điện cực dương dày lên."
    ],
    "explain": "E°pin = 0,80 − 0,34 = 0,46 V.",
    "v": {
      "vessel": "beaker",
      "duration": 12,
      "scene": "galvanic",
      "liquid": [],
      "galvanic": {
        "left": "#4d9fe0",
        "leftIon": "CuSO₄",
        "leftMetal": "#c8643b",
        "rightMetal": "#d7dde3",
        "right": "#e6eaee",
        "rightIon": "AgNO₃",
        "E": 0.46,
        "leftLabel": "Cu | Cu²⁺",
        "rightLabel": "Ag | Ag⁺",
        "leftDissolves": true
      },
      "caption": [
        {
          "t": 1,
          "text": "Electron chạy từ anot (−) sang catot (+) qua dây dẫn"
        }
      ]
    }
  },
  {
    "id": "pin-mg-ag",
    "grade": 12,
    "topic": "Pin điện hóa",
    "title": "Pin Mg–Ag: E° = 3,17 V",
    "chem": [
      "Hai cốc dung dịch muối",
      "Hai điện cực kim loại",
      "Cầu muối KNO₃",
      "Vôn kế"
    ],
    "steps": [
      "Nối hai điện cực với vôn kế, nối hai cốc bằng cầu muối."
    ],
    "eq": [
      "2Ag^+ + Mg → 2Ag + Mg^2+"
    ],
    "observe": [
      "Vôn kế chỉ suất điện động; điện cực âm tan dần, điện cực dương dày lên."
    ],
    "explain": "E°pin = 0,80 − (−2,37) = 3,17 V.",
    "v": {
      "vessel": "beaker",
      "duration": 12,
      "scene": "galvanic",
      "liquid": [],
      "galvanic": {
        "left": "#e6eef7",
        "leftIon": "Mg(NO₃)₂",
        "leftMetal": "#c9ced4",
        "rightMetal": "#d7dde3",
        "right": "#e6eaee",
        "rightIon": "AgNO₃",
        "E": 3.17,
        "leftLabel": "Mg | Mg²⁺",
        "rightLabel": "Ag | Ag⁺",
        "leftDissolves": true
      },
      "caption": [
        {
          "t": 1,
          "text": "Electron chạy từ anot (−) sang catot (+) qua dây dẫn"
        }
      ]
    }
  }
];
