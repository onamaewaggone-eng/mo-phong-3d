export interface GasCatalogItem {
  id: string;
  name: string;
  short: string;
  formula: string;
  color?: string;
}

export interface IndicatorCatalogItem {
  id: string;
  name: string;
}

export interface OrganicCatalogItem {
  id: string;
  name: string;
  short: string;
  formula: string;
  color: string;
  alpha: number;
}

export interface SolidCatalogItem {
  id: string;
  name: string;
  short: string;
  formula: string;
  color: string;
  kind: string;
}

export const GASES_CATALOG: GasCatalogItem[] = [
  {
    "id": "CO2",
    "name": "Khí Cacbon đioxit (CO₂ sục)",
    "short": "Khí CO₂",
    "formula": "CO2"
  },
  {
    "id": "SO2",
    "name": "Khí Lưu huỳnh đioxit (SO₂ mùi hắc)",
    "short": "Khí SO₂",
    "formula": "SO2"
  },
  {
    "id": "Cl2",
    "name": "Khí Clo (Cl₂ vàng lục)",
    "short": "Khí Cl₂",
    "formula": "Cl2",
    "color": "#e6ee9c"
  },
  {
    "id": "NH3_gas",
    "name": "Khí Amoniac (NH₃ mùi khai)",
    "short": "Khí NH₃",
    "formula": "NH3"
  },
  {
    "id": "H2S",
    "name": "Khí Hiđro sunfua (H₂S mùi trứng thối)",
    "short": "Khí H₂S",
    "formula": "H2S"
  },
  {
    "id": "H2_gas",
    "name": "Khí Hiđro (H₂)",
    "short": "Khí H₂",
    "formula": "H2"
  },
  {
    "id": "O2_gas",
    "name": "Khí Oxi (O₂)",
    "short": "Khí O₂",
    "formula": "O2"
  },
  {
    "id": "NO2_gas",
    "name": "Khí Nitơ đioxit (NO₂ nâu đỏ)",
    "short": "Khí NO₂",
    "formula": "NO2",
    "color": "#8d4a1a"
  }
];
export const INDICATORS_CATALOG: IndicatorCatalogItem[] = [
  {
    "id": "quy",
    "name": "Quỳ tím"
  },
  {
    "id": "pp",
    "name": "Phenolphtalein"
  },
  {
    "id": "mo",
    "name": "Metyl da cam"
  },
  {
    "id": "cabbage",
    "name": "Nước bắp cải tím (KHTN 8)"
  }
];
export const METALS_CATALOG: string[] = [
  "Li",
  "Na",
  "K",
  "Ba",
  "Ca",
  "Mg",
  "Al",
  "Zn",
  "Cr",
  "Fe",
  "Ni",
  "Sn",
  "Pb",
  "Cu",
  "Ag",
  "Pt",
  "Au"
];
export const ORGANICS_CATALOG: OrganicCatalogItem[] = [
  {
    "id": "benzene",
    "name": "Benzen (C₆H₆)",
    "short": "Benzen",
    "formula": "C6H6",
    "color": "#cfe8ff",
    "alpha": 0.2
  },
  {
    "id": "toluene",
    "name": "Toluen (C₆H₅CH₃)",
    "short": "Toluen",
    "formula": "C6H5CH3",
    "color": "#cfe8ff",
    "alpha": 0.2
  },
  {
    "id": "styrene",
    "name": "Stiren (C₆H₅CH=CH₂)",
    "short": "Stiren",
    "formula": "C6H5CH=CH2",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "phenol",
    "name": "Phenol (C₆H₅OH nhũ tương)",
    "short": "Phenol",
    "formula": "C6H5OH",
    "color": "#f5f0eb",
    "alpha": 0.5
  },
  {
    "id": "aniline",
    "name": "Anilin (C₆H₅NH₂)",
    "short": "Anilin",
    "formula": "C6H5NH2",
    "color": "#ded7c5",
    "alpha": 0.45
  },
  {
    "id": "methane",
    "name": "Khí Mêtan (CH₄ sục)",
    "short": "Khí Mêtan (CH₄)",
    "formula": "CH4",
    "color": "#cfe8ff",
    "alpha": 0.2
  },
  {
    "id": "ethene",
    "name": "Khí Etilen (C₂H₄ sục)",
    "short": "C₂H₄",
    "formula": "C2H4",
    "color": "#cfe8ff",
    "alpha": 0.2
  },
  {
    "id": "acetylene",
    "name": "Khí Axetilen (C₂H₂ sục)",
    "short": "C₂H₂",
    "formula": "C2H2",
    "color": "#cfe8ff",
    "alpha": 0.2
  },
  {
    "id": "hexane",
    "name": "Hexan (C₆H₁₄ ankan lỏng)",
    "short": "Hexan (C₆H₁₄)",
    "formula": "C6H14",
    "color": "#cfe8ff",
    "alpha": 0.2
  },
  {
    "id": "ch3oh",
    "name": "Metanol (CH₃OH cồn gỗ)",
    "short": "Metanol",
    "formula": "CH3OH",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "c2h5oh",
    "name": "Cồn etylic (C₂H₅OH 96°)",
    "short": "C₂H₅OH",
    "formula": "C2H5OH",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "glycol",
    "name": "Etylen glycol (C₂H₄(OH)₂)",
    "short": "Etylen glycol",
    "formula": "C2H4(OH)2",
    "color": "#cfe8ff",
    "alpha": 0.3
  },
  {
    "id": "glycerol",
    "name": "Glixerol (C₃H₅(OH)₃)",
    "short": "Glixerol",
    "formula": "C3H5(OH)3",
    "color": "#cfe8ff",
    "alpha": 0.35
  },
  {
    "id": "hcooh",
    "name": "Axit fomic (HCOOH)",
    "short": "Axit fomic",
    "formula": "HCOOH",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "ch3cooh",
    "name": "Axit axetic (CH₃COOH)",
    "short": "CH₃COOH",
    "formula": "CH3COOH",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "oxalic",
    "name": "Axit oxalic ((COOH)₂)",
    "short": "Axit oxalic",
    "formula": "H2C2O4",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "ethyl_acetate",
    "name": "Etyl axetat (CH₃COOC₂H₅)",
    "short": "Etyl axetat",
    "formula": "CH3COOC2H5",
    "color": "#cfe8ff",
    "alpha": 0.2
  },
  {
    "id": "fat",
    "name": "Dầu ăn / Chất béo",
    "short": "Chất béo",
    "formula": "(RCOO)3C3H5",
    "color": "#fae67a",
    "alpha": 0.6
  },
  {
    "id": "glucose",
    "name": "Dung dịch Glucozơ (C₆H₁₂O₆)",
    "short": "Glucozơ",
    "formula": "C6H12O6",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "fructose",
    "name": "Dung dịch Fructozơ (C₆H₁₂O₆)",
    "short": "Fructozơ",
    "formula": "C6H12O6",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "sucrose",
    "name": "Dung dịch Saccarozơ (C₁₂H₂₂O₁₁)",
    "short": "Saccarozơ",
    "formula": "C12H22O11",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "maltose",
    "name": "Dung dịch Mantozơ (C₁₂H₂₂O₁₁)",
    "short": "Mantozơ",
    "formula": "C12H22O11",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "starch",
    "name": "Hồ tinh bột",
    "short": "Hồ tinh bột",
    "formula": "(C6H10O5)n",
    "color": "#f7f6f0",
    "alpha": 0.5
  },
  {
    "id": "cellulose",
    "name": "Xenlulozơ / Bông gòn",
    "short": "Xenlulozơ",
    "formula": "(C6H10O5)n",
    "color": "#fafaf6",
    "alpha": 0.6
  },
  {
    "id": "egg",
    "name": "Lòng trắng trứng (Protein)",
    "short": "Lòng trắng trứng",
    "formula": "Protein",
    "color": "#f6f1dc",
    "alpha": 0.55
  },
  {
    "id": "hcho",
    "name": "Fomanđehit / Fomalin (HCHO)",
    "short": "Fomalin (HCHO)",
    "formula": "HCHO",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "ch3cho",
    "name": "Anđehit axetic (CH₃CHO)",
    "short": "CH₃CHO",
    "formula": "CH3CHO",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "acetone",
    "name": "Axeton (CH₃COCH₃)",
    "short": "Axeton",
    "formula": "CH3COCH3",
    "color": "#cfe8ff",
    "alpha": 0.2
  },
  {
    "id": "methylamine",
    "name": "Dung dịch Metylamin (CH₃NH₂)",
    "short": "CH₃NH₂",
    "formula": "CH3NH2",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "glycine",
    "name": "Glyxin (H₂N-CH₂-COOH amino axit)",
    "short": "Glyxin",
    "formula": "H2NCH2COOH",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "glutamic",
    "name": "Axit glutamic (axit hóa quỳ đỏ)",
    "short": "Axit glutamic",
    "formula": "C5H9NO4",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "lysine",
    "name": "Lysin (bazơ hóa quỳ xanh)",
    "short": "Lysin",
    "formula": "C6H14N2O2",
    "color": "#cfe8ff",
    "alpha": 0.25
  },
  {
    "id": "bromine_water",
    "name": "Nước brom (Br₂ da cam)",
    "short": "Nước brom",
    "formula": "Br2 (nước)",
    "color": "#e08a30",
    "alpha": 0.65
  },
  {
    "id": "kmno4_sol",
    "name": "Dung dịch Thuốc tím (KMnO₄)",
    "short": "Thuốc tím",
    "formula": "KMnO4",
    "color": "#8e24aa",
    "alpha": 0.75
  },
  {
    "id": "tollens",
    "name": "Thuốc thử Tollens (AgNO₃/NH₃)",
    "short": "Tollens",
    "formula": "[Ag(NH3)2]OH",
    "color": "#cfe8ff",
    "alpha": 0.3
  },
  {
    "id": "cuoh2_fresh",
    "name": "Cu(OH)₂ mới điều chế (xanh lơ)",
    "short": "Cu(OH)₂",
    "formula": "Cu(OH)2",
    "color": "#7fb8f0",
    "alpha": 0.7
  },
  {
    "id": "iodine_sol",
    "name": "Dung dịch Iot (I₂/KI vàng nâu)",
    "short": "Dung dịch I₂",
    "formula": "I2 (dd KI)",
    "color": "#8d4a1a",
    "alpha": 0.7
  }
];
export const SOLUTIONS_CATALOG: string[] = [
  "HCl",
  "H2SO4",
  "HNO3",
  "CH3COOH",
  "H3PO4",
  "HF",
  "HBr",
  "HI",
  "HClO4",
  "NaOH",
  "KOH",
  "Ba(OH)2",
  "Ca(OH)2",
  "NH3",
  "NaCl",
  "KCl",
  "KNO3",
  "Na2SO4",
  "K2SO4",
  "Na2CO3",
  "NaHCO3",
  "Na2SO3",
  "K2CO3",
  "Na2S",
  "Na3PO4",
  "Na2SiO3",
  "BaCl2",
  "Ba(NO3)2",
  "CaCl2",
  "MgCl2",
  "MgSO4",
  "AgNO3",
  "CuSO4",
  "CuCl2",
  "Cu(NO3)2",
  "FeCl3",
  "FeCl2",
  "FeSO4",
  "Fe(NO3)3",
  "Fe2(SO4)3",
  "AlCl3",
  "Al2(SO4)3",
  "Al(NO3)3",
  "NaAlO2",
  "ZnSO4",
  "ZnCl2",
  "Zn(NO3)2",
  "Pb(NO3)2",
  "NH4Cl",
  "(NH4)2SO4",
  "NH4NO3",
  "NaBr",
  "KI",
  "CH3COONa",
  "NiSO4",
  "MnSO4",
  "CrCl3",
  "Ca(HCO3)2",
  "Ba(HCO3)2",
  "NaHSO4",
  "KHSO4",
  "KMnO4",
  "K2Cr2O7",
  "K2CrO4",
  "H2O2",
  "NaClO",
  "KSCN"
];
export const SOLIDS_CATALOG: SolidCatalogItem[] = [
  {
    "id": "CaO",
    "name": "Canxi oxit (Vôi sống - CaO bột trắng)",
    "short": "CaO (Vôi sống)",
    "formula": "CaO",
    "color": "#f6f6f0",
    "kind": "oxide"
  },
  {
    "id": "CuO",
    "name": "Đồng(II) oxit (CuO bột đen)",
    "short": "CuO bột đen",
    "formula": "CuO",
    "color": "#1a1a1a",
    "kind": "oxide"
  },
  {
    "id": "Fe2O3",
    "name": "Sắt(III) oxit (Fe₂O₃ bột đỏ nâu)",
    "short": "Fe₂O₃ bột đỏ",
    "formula": "Fe2O3",
    "color": "#8b3a1a",
    "kind": "oxide"
  },
  {
    "id": "Fe3O4",
    "name": "Oxit sắt từ (Fe₃O₄ bột đen)",
    "short": "Fe₃O₄ bột đen",
    "formula": "Fe3O4",
    "color": "#1e1e1e",
    "kind": "oxide"
  },
  {
    "id": "FeO",
    "name": "Sắt(II) oxit (FeO bột đen)",
    "short": "FeO bột đen",
    "formula": "FeO",
    "color": "#212121",
    "kind": "oxide"
  },
  {
    "id": "MnO2",
    "name": "Mangan đioxit (MnO₂ bột đen xúc tác)",
    "short": "MnO₂ bột đen",
    "formula": "MnO2",
    "color": "#151515",
    "kind": "oxide"
  },
  {
    "id": "Al2O3",
    "name": "Nhôm oxit (Al₂O₃ bột trắng lưỡng tính)",
    "short": "Al₂O₃ bột trắng",
    "formula": "Al2O3",
    "color": "#f5f5f5",
    "kind": "oxide"
  },
  {
    "id": "ZnO",
    "name": "Kẽm oxit (ZnO bột trắng lưỡng tính)",
    "short": "ZnO bột trắng",
    "formula": "ZnO",
    "color": "#f5f5f5",
    "kind": "oxide"
  },
  {
    "id": "SiO2",
    "name": "Silic đioxit (Cát thạch anh - SiO₂)",
    "short": "SiO₂ cát",
    "formula": "SiO2",
    "color": "#f0ede6",
    "kind": "oxide"
  },
  {
    "id": "CaCO3",
    "name": "Canxi cacbonat (Đá vôi - CaCO₃)",
    "short": "CaCO₃ đá vôi",
    "formula": "CaCO3",
    "color": "#faf9f6",
    "kind": "salt"
  },
  {
    "id": "BaCO3",
    "name": "Bari cacbonat (BaCO₃ bột trắng)",
    "short": "BaCO₃ bột trắng",
    "formula": "BaCO3",
    "color": "#f6f6f0",
    "kind": "salt"
  },
  {
    "id": "KClO3",
    "name": "Kali clorat (KClO₃ bột trắng nhiệt phân ra O₂)",
    "short": "KClO₃ tinh thể",
    "formula": "KClO3",
    "color": "#f5f5f5",
    "kind": "salt"
  },
  {
    "id": "KMnO4_cr",
    "name": "Thuốc tím tinh thể rắn (KMnO₄)",
    "short": "KMnO₄ tinh thể",
    "formula": "KMnO4",
    "color": "#4a148c",
    "kind": "salt"
  },
  {
    "id": "NaCl_cr",
    "name": "Muối ăn hạt / tinh thể (NaCl)",
    "short": "NaCl hạt",
    "formula": "NaCl",
    "color": "#ffffff",
    "kind": "salt"
  },
  {
    "id": "NaHCO3_pw",
    "name": "Bột nở Baking soda (NaHCO₃)",
    "short": "NaHCO₃ bột",
    "formula": "NaHCO3",
    "color": "#fafafa",
    "kind": "salt"
  },
  {
    "id": "NH4Cl_cr",
    "name": "Amoni clorua (NH₄Cl tinh thể trắng)",
    "short": "NH₄Cl tinh thể",
    "formula": "NH4Cl",
    "color": "#f0f4f8",
    "kind": "salt"
  },
  {
    "id": "Alum_cr",
    "name": "Phèn chua (KAl(SO₄)₂·12H₂O làm trong nước)",
    "short": "Phèn chua",
    "formula": "KAl(SO4)2",
    "color": "#e8f0fe",
    "kind": "salt"
  },
  {
    "id": "P_red",
    "name": "Photpho đỏ (P bột đỏ)",
    "short": "Photpho đỏ (P)",
    "formula": "P",
    "color": "#b71c1c",
    "kind": "nonmetal"
  },
  {
    "id": "S_powder",
    "name": "Lưu huỳnh (S bột vàng)",
    "short": "Lưu huỳnh (S)",
    "formula": "S",
    "color": "#fdd835",
    "kind": "nonmetal"
  },
  {
    "id": "C_powder",
    "name": "Than bột / Cacbon (C đen)",
    "short": "Than bột (C)",
    "formula": "C",
    "color": "#212121",
    "kind": "nonmetal"
  },
  {
    "id": "Fe_powder",
    "name": "Bột sắt (Fe xám tác dụng với S)",
    "short": "Bột sắt (Fe)",
    "formula": "Fe",
    "color": "#616161",
    "kind": "nonmetal"
  },
  {
    "id": "flame_burner",
    "name": "Đèn cồn / Que thử ngọn lửa 🔥 (Flame Test nhận biết ion)",
    "short": "Đèn cồn 🔥 (Flame Test)",
    "formula": "Flame",
    "color": "#ff9800",
    "kind": "nonmetal"
  }
];
