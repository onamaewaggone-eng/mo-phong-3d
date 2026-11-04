export interface IupacElementItem {
  z: number
  sym: string
  iupac: string
  vi: string
  read: string
  cat: string
}

export interface IupacCompoundItem {
  formula: string
  iupac: string
  vi: string
  kind: string
  kindLabel: string
  read?: string
  rule?: string
  smiles?: string
  note?: string
}

export interface IupacRuleItem {
  title: string
  desc: string
  formulaPattern: string
  examples: [string, string, string][]
}

export interface MoleculeCatalogGroup {
  id: string
  name: string
  items: [string, string, string?][]
}

export const IUPAC_ELEMENTS_118: IupacElementItem[] = [
  {
    "z": 1,
    "sym": "H",
    "iupac": "Hydrogen",
    "vi": "Hiđro",
    "read": "hai-đrơ-giân",
    "cat": "Phi kim"
  },
  {
    "z": 2,
    "sym": "He",
    "iupac": "Helium",
    "vi": "Heli",
    "read": "hi-li-ơm",
    "cat": "Khí hiếm"
  },
  {
    "z": 3,
    "sym": "Li",
    "iupac": "Lithium",
    "vi": "Liti",
    "read": "li-thi-ơm",
    "cat": "Kim loại kiềm"
  },
  {
    "z": 4,
    "sym": "Be",
    "iupac": "Beryllium",
    "vi": "Beri",
    "read": "bơ-ri-li-ơm",
    "cat": "Kim loại kiềm thổ"
  },
  {
    "z": 5,
    "sym": "B",
    "iupac": "Boron",
    "vi": "Bo",
    "read": "bo-ron",
    "cat": "Á kim"
  },
  {
    "z": 6,
    "sym": "C",
    "iupac": "Carbon",
    "vi": "Cacbon",
    "read": "ca-bơn",
    "cat": "Phi kim"
  },
  {
    "z": 7,
    "sym": "N",
    "iupac": "Nitrogen",
    "vi": "Nitơ",
    "read": "nai-trơ-giân",
    "cat": "Phi kim"
  },
  {
    "z": 8,
    "sym": "O",
    "iupac": "Oxygen",
    "vi": "Oxi",
    "read": "oc-si-giân",
    "cat": "Phi kim"
  },
  {
    "z": 9,
    "sym": "F",
    "iupac": "Fluorine",
    "vi": "Flo",
    "read": "phlu-o-rin",
    "cat": "Halogen"
  },
  {
    "z": 10,
    "sym": "Ne",
    "iupac": "Neon",
    "vi": "Neon",
    "read": "ne-on",
    "cat": "Khí hiếm"
  },
  {
    "z": 11,
    "sym": "Na",
    "iupac": "Sodium",
    "vi": "Natri",
    "read": "sô-đi-ơm",
    "cat": "Kim loại kiềm"
  },
  {
    "z": 12,
    "sym": "Mg",
    "iupac": "Magnesium",
    "vi": "Magie",
    "read": "méc-ni-zi-ơm",
    "cat": "Kim loại kiềm thổ"
  },
  {
    "z": 13,
    "sym": "Al",
    "iupac": "Aluminium",
    "vi": "Nhôm",
    "read": "a-lu-mi-ni-ơm",
    "cat": "Kim loại sau chuyển tiếp"
  },
  {
    "z": 14,
    "sym": "Si",
    "iupac": "Silicon",
    "vi": "Silic",
    "read": "si-li-cơn",
    "cat": "Á kim"
  },
  {
    "z": 15,
    "sym": "P",
    "iupac": "Phosphorus",
    "vi": "Photpho",
    "read": "phos-phơ-rơs",
    "cat": "Phi kim"
  },
  {
    "z": 16,
    "sym": "S",
    "iupac": "Sulfur",
    "vi": "Lưu huỳnh",
    "read": "sơl-phơ",
    "cat": "Phi kim"
  },
  {
    "z": 17,
    "sym": "Cl",
    "iupac": "Chlorine",
    "vi": "Clo",
    "read": "clo-rin",
    "cat": "Halogen"
  },
  {
    "z": 18,
    "sym": "Ar",
    "iupac": "Argon",
    "vi": "Agon",
    "read": "a-gơn",
    "cat": "Khí hiếm"
  },
  {
    "z": 19,
    "sym": "K",
    "iupac": "Potassium",
    "vi": "Kali",
    "read": "pơ-tét-si-ơm",
    "cat": "Kim loại kiềm"
  },
  {
    "z": 20,
    "sym": "Ca",
    "iupac": "Calcium",
    "vi": "Canxi",
    "read": "can-si-ơm",
    "cat": "Kim loại kiềm thổ"
  },
  {
    "z": 21,
    "sym": "Sc",
    "iupac": "Scandium",
    "vi": "Scandi",
    "read": "scen-đi-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 22,
    "sym": "Ti",
    "iupac": "Titanium",
    "vi": "Titan",
    "read": "tai-tê-ni-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 23,
    "sym": "V",
    "iupac": "Vanadium",
    "vi": "Vanadi",
    "read": "vơ-nê-đi-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 24,
    "sym": "Cr",
    "iupac": "Chromium",
    "vi": "Crom",
    "read": "crô-mi-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 25,
    "sym": "Mn",
    "iupac": "Manganese",
    "vi": "Mangan",
    "read": "măng-gơ-niz",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 26,
    "sym": "Fe",
    "iupac": "Iron",
    "vi": "Sắt",
    "read": "ai-ơn",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 27,
    "sym": "Co",
    "iupac": "Cobalt",
    "vi": "Coban",
    "read": "cô-ban",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 28,
    "sym": "Ni",
    "iupac": "Nickel",
    "vi": "Niken",
    "read": "ni-kơn",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 29,
    "sym": "Cu",
    "iupac": "Copper",
    "vi": "Đồng",
    "read": "cop-pơ",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 30,
    "sym": "Zn",
    "iupac": "Zinc",
    "vi": "Kẽm",
    "read": "zinh-c",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 31,
    "sym": "Ga",
    "iupac": "Gallium",
    "vi": "Gali",
    "read": "gơ-li-ơm",
    "cat": "Kim loại sau chuyển tiếp"
  },
  {
    "z": 32,
    "sym": "Ge",
    "iupac": "Germanium",
    "vi": "Gecmani",
    "read": "giơ-mê-ni-ơm",
    "cat": "Á kim"
  },
  {
    "z": 33,
    "sym": "As",
    "iupac": "Arsenic",
    "vi": "Asen",
    "read": "a-sơ-nic",
    "cat": "Á kim"
  },
  {
    "z": 34,
    "sym": "Se",
    "iupac": "Selenium",
    "vi": "Selen",
    "read": "sơ-li-ni-ơm",
    "cat": "Phi kim"
  },
  {
    "z": 35,
    "sym": "Br",
    "iupac": "Bromine",
    "vi": "Brom",
    "read": "brô-min",
    "cat": "Halogen"
  },
  {
    "z": 36,
    "sym": "Kr",
    "iupac": "Krypton",
    "vi": "Kripton",
    "read": "crip-tơn",
    "cat": "Khí hiếm"
  },
  {
    "z": 37,
    "sym": "Rb",
    "iupac": "Rubidium",
    "vi": "Rubidi",
    "read": "ru-bi-đi-ơm",
    "cat": "Kim loại kiềm"
  },
  {
    "z": 38,
    "sym": "Sr",
    "iupac": "Strontium",
    "vi": "Stronti",
    "read": "stron-ti-ơm",
    "cat": "Kim loại kiềm thổ"
  },
  {
    "z": 39,
    "sym": "Y",
    "iupac": "Yttrium",
    "vi": "Ytri",
    "read": "it-tri-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 40,
    "sym": "Zr",
    "iupac": "Zirconium",
    "vi": "Zirconi",
    "read": "zơ-cô-ni-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 41,
    "sym": "Nb",
    "iupac": "Niobium",
    "vi": "Niobi",
    "read": "nai-ô-bi-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 42,
    "sym": "Mo",
    "iupac": "Molybdenum",
    "vi": "Molipđen",
    "read": "mơ-lip-đơ-nơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 43,
    "sym": "Tc",
    "iupac": "Technetium",
    "vi": "Tecneti",
    "read": "tec-nê-si-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 44,
    "sym": "Ru",
    "iupac": "Ruthenium",
    "vi": "Rutheni",
    "read": "ru-thê-ni-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 45,
    "sym": "Rh",
    "iupac": "Rhodium",
    "vi": "Rođi",
    "read": "rô-đi-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 46,
    "sym": "Pd",
    "iupac": "Palladium",
    "vi": "Paladi",
    "read": "pơ-lê-đi-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 47,
    "sym": "Ag",
    "iupac": "Silver",
    "vi": "Bạc",
    "read": "sil-vơ",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 48,
    "sym": "Cd",
    "iupac": "Cadmium",
    "vi": "Cađimi",
    "read": "cát-mi-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 49,
    "sym": "In",
    "iupac": "Indium",
    "vi": "Indi",
    "read": "in-đi-ơm",
    "cat": "Kim loại sau chuyển tiếp"
  },
  {
    "z": 50,
    "sym": "Sn",
    "iupac": "Tin",
    "vi": "Thiếc",
    "read": "tin",
    "cat": "Kim loại sau chuyển tiếp"
  },
  {
    "z": 51,
    "sym": "Sb",
    "iupac": "Antimony",
    "vi": "Antimon",
    "read": "en-ti-mơ-ni",
    "cat": "Á kim"
  },
  {
    "z": 52,
    "sym": "Te",
    "iupac": "Tellurium",
    "vi": "Telu",
    "read": "te-lu-ri-ơm",
    "cat": "Á kim"
  },
  {
    "z": 53,
    "sym": "I",
    "iupac": "Iodine",
    "vi": "Iot",
    "read": "ai-ơ-đin",
    "cat": "Halogen"
  },
  {
    "z": 54,
    "sym": "Xe",
    "iupac": "Xenon",
    "vi": "Xenon",
    "read": "ze-non",
    "cat": "Khí hiếm"
  },
  {
    "z": 55,
    "sym": "Cs",
    "iupac": "Caesium",
    "vi": "Xesi",
    "read": "si-zi-ơm",
    "cat": "Kim loại kiềm"
  },
  {
    "z": 56,
    "sym": "Ba",
    "iupac": "Barium",
    "vi": "Bari",
    "read": "be-ri-ơm",
    "cat": "Kim loại kiềm thổ"
  },
  {
    "z": 57,
    "sym": "La",
    "iupac": "Lanthanum",
    "vi": "Lantan",
    "read": "len-thơ-nơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 58,
    "sym": "Ce",
    "iupac": "Cerium",
    "vi": "Xeri",
    "read": "si-ri-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 59,
    "sym": "Pr",
    "iupac": "Praseodymium",
    "vi": "Praseođym",
    "read": "prê-zi-ô-đi-mi-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 60,
    "sym": "Nd",
    "iupac": "Neodymium",
    "vi": "Neođym",
    "read": "nê-ô-đi-mi-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 61,
    "sym": "Pm",
    "iupac": "Promethium",
    "vi": "Prometi",
    "read": "prơ-mê-thi-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 62,
    "sym": "Sm",
    "iupac": "Samarium",
    "vi": "Samari",
    "read": "sơ-me-ri-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 63,
    "sym": "Eu",
    "iupac": "Europium",
    "vi": "Europi",
    "read": "du-rô-pi-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 64,
    "sym": "Gd",
    "iupac": "Gadolinium",
    "vi": "Gađolini",
    "read": "gát-đơ-li-ni-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 65,
    "sym": "Tb",
    "iupac": "Terbium",
    "vi": "Terbi",
    "read": "tơ-bi-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 66,
    "sym": "Dy",
    "iupac": "Dysprosium",
    "vi": "Đisprosi",
    "read": "đis-prô-zi-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 67,
    "sym": "Ho",
    "iupac": "Holmium",
    "vi": "Honmi",
    "read": "hôn-mi-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 68,
    "sym": "Er",
    "iupac": "Erbium",
    "vi": "Erbi",
    "read": "ơ-bi-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 69,
    "sym": "Tm",
    "iupac": "Thulium",
    "vi": "Tuli",
    "read": "thiu-li-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 70,
    "sym": "Yb",
    "iupac": "Ytterbium",
    "vi": "Yterbi",
    "read": "i-tơ-bi-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 71,
    "sym": "Lu",
    "iupac": "Lutetium",
    "vi": "Luteti",
    "read": "lu-ti-si-ơm",
    "cat": "Họ Lantan"
  },
  {
    "z": 72,
    "sym": "Hf",
    "iupac": "Hafnium",
    "vi": "Hafni",
    "read": "hép-ni-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 73,
    "sym": "Ta",
    "iupac": "Tantalum",
    "vi": "Tantan",
    "read": "ten-tơ-lơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 74,
    "sym": "W",
    "iupac": "Tungsten",
    "vi": "Vonfram",
    "read": "tơng-stơn",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 75,
    "sym": "Re",
    "iupac": "Rhenium",
    "vi": "Reni",
    "read": "ri-ni-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 76,
    "sym": "Os",
    "iupac": "Osmium",
    "vi": "Osmi",
    "read": "oz-mi-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 77,
    "sym": "Ir",
    "iupac": "Iridium",
    "vi": "Iriđi",
    "read": "ai-ri-đi-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 78,
    "sym": "Pt",
    "iupac": "Platinum",
    "vi": "Bạch kim",
    "read": "plét-ti-nơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 79,
    "sym": "Au",
    "iupac": "Gold",
    "vi": "Vàng",
    "read": "gô-ld",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 80,
    "sym": "Hg",
    "iupac": "Mercury",
    "vi": "Thủy ngân",
    "read": "mơ-kiu-ri",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 81,
    "sym": "Tl",
    "iupac": "Thallium",
    "vi": "Tali",
    "read": "the-li-ơm",
    "cat": "Kim loại sau chuyển tiếp"
  },
  {
    "z": 82,
    "sym": "Pb",
    "iupac": "Lead",
    "vi": "Chì",
    "read": "led",
    "cat": "Kim loại sau chuyển tiếp"
  },
  {
    "z": 83,
    "sym": "Bi",
    "iupac": "Bismuth",
    "vi": "Bismut",
    "read": "biz-mơth",
    "cat": "Kim loại sau chuyển tiếp"
  },
  {
    "z": 84,
    "sym": "Po",
    "iupac": "Polonium",
    "vi": "Poloni",
    "read": "pơ-lô-ni-ơm",
    "cat": "Kim loại sau chuyển tiếp"
  },
  {
    "z": 85,
    "sym": "At",
    "iupac": "Astatine",
    "vi": "Astatin",
    "read": "es-tơ-tin",
    "cat": "Halogen"
  },
  {
    "z": 86,
    "sym": "Rn",
    "iupac": "Radon",
    "vi": "Rađon",
    "read": "rê-đon",
    "cat": "Khí hiếm"
  },
  {
    "z": 87,
    "sym": "Fr",
    "iupac": "Francium",
    "vi": "Franxi",
    "read": "phren-si-ơm",
    "cat": "Kim loại kiềm"
  },
  {
    "z": 88,
    "sym": "Ra",
    "iupac": "Radium",
    "vi": "Rađi",
    "read": "rê-đi-ơm",
    "cat": "Kim loại kiềm thổ"
  },
  {
    "z": 89,
    "sym": "Ac",
    "iupac": "Actinium",
    "vi": "Actini",
    "read": "ec-ti-ni-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 90,
    "sym": "Th",
    "iupac": "Thorium",
    "vi": "Tori",
    "read": "tho-ri-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 91,
    "sym": "Pa",
    "iupac": "Protactinium",
    "vi": "Protactini",
    "read": "prô-tec-ti-ni-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 92,
    "sym": "U",
    "iupac": "Uranium",
    "vi": "Urani",
    "read": "du-rê-ni-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 93,
    "sym": "Np",
    "iupac": "Neptunium",
    "vi": "Neptuni",
    "read": "nep-tiu-ni-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 94,
    "sym": "Pu",
    "iupac": "Plutonium",
    "vi": "Plutoni",
    "read": "plu-tô-ni-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 95,
    "sym": "Am",
    "iupac": "Americium",
    "vi": "Americi",
    "read": "ơ-me-ri-si-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 96,
    "sym": "Cm",
    "iupac": "Curium",
    "vi": "Curi",
    "read": "kiu-ri-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 97,
    "sym": "Bk",
    "iupac": "Berkelium",
    "vi": "Berpheli",
    "read": "bơ-ki-li-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 98,
    "sym": "Cf",
    "iupac": "Californium",
    "vi": "Californi",
    "read": "ca-li-pho-ni-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 99,
    "sym": "Es",
    "iupac": "Einsteinium",
    "vi": "Ensteni",
    "read": "ain-stai-ni-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 100,
    "sym": "Fm",
    "iupac": "Fermium",
    "vi": "Fecmi",
    "read": "phơ-mi-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 101,
    "sym": "Md",
    "iupac": "Mendelevium",
    "vi": "Menđelevi",
    "read": "men-đơ-lê-vi-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 102,
    "sym": "No",
    "iupac": "Nobelium",
    "vi": "Nobeli",
    "read": "nô-be-li-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 103,
    "sym": "Lr",
    "iupac": "Lawrencium",
    "vi": "Larenxi",
    "read": "lo-ren-si-ơm",
    "cat": "Họ Actini"
  },
  {
    "z": 104,
    "sym": "Rf",
    "iupac": "Rutherfordium",
    "vi": "Rơtfodi",
    "read": "rơ-thơ-pho-đi-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 105,
    "sym": "Db",
    "iupac": "Dubnium",
    "vi": "Đubni",
    "read": "đúp-ni-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 106,
    "sym": "Sg",
    "iupac": "Seaborgium",
    "vi": "Sibogi",
    "read": "si-bo-gi-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 107,
    "sym": "Bh",
    "iupac": "Bohrium",
    "vi": "Bori",
    "read": "bo-ri-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 108,
    "sym": "Hs",
    "iupac": "Hassium",
    "vi": "Hasi",
    "read": "hát-si-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 109,
    "sym": "Mt",
    "iupac": "Meitnerium",
    "vi": "Mâyteri",
    "read": "mait-nơ-ri-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 110,
    "sym": "Ds",
    "iupac": "Darmstadtium",
    "vi": "Đacmstati",
    "read": "đam-stát-ti-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 111,
    "sym": "Rg",
    "iupac": "Roentgenium",
    "vi": "Rơnơgơni",
    "read": "rơn-ghen-ni-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 112,
    "sym": "Cn",
    "iupac": "Copernicium",
    "vi": "Copenixi",
    "read": "cô-pơ-ni-si-ơm",
    "cat": "Kim loại chuyển tiếp"
  },
  {
    "z": 113,
    "sym": "Nh",
    "iupac": "Nihonium",
    "vi": "Nihoni",
    "read": "ni-hô-ni-ơm",
    "cat": "Kim loại sau chuyển tiếp"
  },
  {
    "z": 114,
    "sym": "Fl",
    "iupac": "Flerovium",
    "vi": "Flerovi",
    "read": "phle-rô-vi-ơm",
    "cat": "Kim loại sau chuyển tiếp"
  },
  {
    "z": 115,
    "sym": "Mc",
    "iupac": "Moscovium",
    "vi": "Moxcovi",
    "read": "mót-scô-vi-ơm",
    "cat": "Kim loại sau chuyển tiếp"
  },
  {
    "z": 116,
    "sym": "Lv",
    "iupac": "Livermorium",
    "vi": "Livermori",
    "read": "li-vơ-mo-ri-ơm",
    "cat": "Kim loại sau chuyển tiếp"
  },
  {
    "z": 117,
    "sym": "Ts",
    "iupac": "Tennessine",
    "vi": "Tenesi",
    "read": "ten-nơ-sin",
    "cat": "Halogen"
  },
  {
    "z": 118,
    "sym": "Og",
    "iupac": "Oganesson",
    "vi": "Oganexon",
    "read": "o-ga-ne-son",
    "cat": "Khí hiếm"
  }
];

export const IUPAC_INORGANIC_60: IupacCompoundItem[] = [
  {
    "formula": "HCl",
    "iupac": "Hydrochloric acid",
    "vi": "Axit clohiđric",
    "kind": "acid",
    "kindLabel": "Acid (Axit)",
    "rule": "Hydro- + chlor- + -ic acid (dạng dung dịch)"
  },
  {
    "formula": "HBr",
    "iupac": "Hydrobromic acid",
    "vi": "Axit bromhiđric",
    "kind": "acid",
    "kindLabel": "Acid (Axit)",
    "rule": "Hydro- + brom- + -ic acid"
  },
  {
    "formula": "HI",
    "iupac": "Hydroiodic acid",
    "vi": "Axit iot hiđric",
    "kind": "acid",
    "kindLabel": "Acid (Axit)",
    "rule": "Hydro- + iod- + -ic acid"
  },
  {
    "formula": "HF",
    "iupac": "Hydrofluoric acid",
    "vi": "Axit flohiđric",
    "kind": "acid",
    "kindLabel": "Acid (Axit)",
    "rule": "Hydro- + fluor- + -ic acid (ăn mòn thủy tinh)"
  },
  {
    "formula": "H₂S",
    "iupac": "Hydrosulfuric acid",
    "vi": "Axit sunfuhidric (khí: Hydrogen sulfide)",
    "kind": "acid",
    "kindLabel": "Acid (Axit)",
    "rule": "Khí: hydrogen sulfide; dung dịch: hydrosulfuric acid"
  },
  {
    "formula": "H₂SO₄",
    "iupac": "Sulfuric acid",
    "vi": "Axit sunfuric",
    "kind": "acid",
    "kindLabel": "Acid (Axit)",
    "rule": "Sulfur + -ic acid (axit nhiều oxi)"
  },
  {
    "formula": "H₂SO₃",
    "iupac": "Sulfurous acid",
    "vi": "Axit sunfurơ",
    "kind": "acid",
    "kindLabel": "Acid (Axit)",
    "rule": "Sulfur + -ous acid (axit ít oxi)"
  },
  {
    "formula": "HNO₃",
    "iupac": "Nitric acid",
    "vi": "Axit nitric",
    "kind": "acid",
    "kindLabel": "Acid (Axit)",
    "rule": "Nitr- + -ic acid"
  },
  {
    "formula": "HNO₂",
    "iupac": "Nitrous acid",
    "vi": "Axit nitrơ",
    "kind": "acid",
    "kindLabel": "Acid (Axit)",
    "rule": "Nitr- + -ous acid"
  },
  {
    "formula": "H₃PO₄",
    "iupac": "Phosphoric acid",
    "vi": "Axit photphoric",
    "kind": "acid",
    "kindLabel": "Acid (Axit)",
    "rule": "Phosphor- + -ic acid"
  },
  {
    "formula": "H₂CO₃",
    "iupac": "Carbonic acid",
    "vi": "Axit cacbonic",
    "kind": "acid",
    "kindLabel": "Acid (Axit)",
    "rule": "Carbon- + -ic acid"
  },
  {
    "formula": "CH₃COOH",
    "iupac": "Acetic acid / Ethanoic acid",
    "vi": "Axit axetic (giấm ăn)",
    "kind": "acid",
    "kindLabel": "Acid (Axit)",
    "rule": "Tên IUPAC thay thế: ethanoic acid"
  },
  {
    "formula": "NaOH",
    "iupac": "Sodium hydroxide",
    "vi": "Natri hiđroxit (xút ăn da)",
    "kind": "base",
    "kindLabel": "Hydroxide (Bazơ)",
    "rule": "Tên kim loại (sodium) + hydroxide"
  },
  {
    "formula": "KOH",
    "iupac": "Potassium hydroxide",
    "vi": "Kali hiđroxit (xút ăn da)",
    "kind": "base",
    "kindLabel": "Hydroxide (Bazơ)",
    "rule": "Tên kim loại (potassium) + hydroxide"
  },
  {
    "formula": "Ca(OH)₂",
    "iupac": "Calcium hydroxide",
    "vi": "Canxi hiđroxit (nước vôi trong)",
    "kind": "base",
    "kindLabel": "Hydroxide (Bazơ)",
    "rule": "Tên kim loại (calcium) + hydroxide"
  },
  {
    "formula": "Ba(OH)₂",
    "iupac": "Barium hydroxide",
    "vi": "Bari hiđroxit",
    "kind": "base",
    "kindLabel": "Hydroxide (Bazơ)",
    "rule": "Tên kim loại (barium) + hydroxide"
  },
  {
    "formula": "Fe(OH)₂",
    "iupac": "Iron(II) hydroxide",
    "vi": "Sắt(II) hiđroxit (trắng xanh)",
    "kind": "base",
    "kindLabel": "Hydroxide (Bazơ)",
    "rule": "Tên kim loại + hóa trị La Mã (II) + hydroxide"
  },
  {
    "formula": "Fe(OH)₃",
    "iupac": "Iron(III) hydroxide",
    "vi": "Sắt(III) hiđroxit (nâu đỏ)",
    "kind": "base",
    "kindLabel": "Hydroxide (Bazơ)",
    "rule": "Tên kim loại + hóa trị La Mã (III) + hydroxide"
  },
  {
    "formula": "Cu(OH)₂",
    "iupac": "Copper(II) hydroxide",
    "vi": "Đồng(II) hiđroxit (xanh lơ)",
    "kind": "base",
    "kindLabel": "Hydroxide (Bazơ)",
    "rule": "Tên kim loại + hóa trị La Mã (II) + hydroxide"
  },
  {
    "formula": "Al(OH)₃",
    "iupac": "Aluminium hydroxide",
    "vi": "Nhôm hiđroxit (keo trắng, lưỡng tính)",
    "kind": "base",
    "kindLabel": "Hydroxide (Bazơ)",
    "rule": "Tên kim loại (aluminium) + hydroxide"
  },
  {
    "formula": "Zn(OH)₂",
    "iupac": "Zinc hydroxide",
    "vi": "Kẽm hiđroxit (kết tủa trắng, lưỡng tính)",
    "kind": "base",
    "kindLabel": "Hydroxide (Bazơ)",
    "rule": "Tên kim loại (zinc) + hydroxide"
  },
  {
    "formula": "CaO",
    "iupac": "Calcium oxide",
    "vi": "Canxi oxit (vôi sống)",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Kim loại một hóa trị + oxide"
  },
  {
    "formula": "FeO",
    "iupac": "Iron(II) oxide",
    "vi": "Sắt(II) oxit",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Kim loại nhiều hóa trị kèm hóa trị (II) + oxide"
  },
  {
    "formula": "Fe₂O₃",
    "iupac": "Iron(III) oxide",
    "vi": "Sắt(III) oxit (nâu đỏ)",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Kim loại nhiều hóa trị kèm hóa trị (III) + oxide"
  },
  {
    "formula": "Fe₃O₄",
    "iupac": "Iron(II,III) oxide",
    "vi": "Sắt từ oxit / oxit sắt từ",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Tên hệ thống: iron(II,III) oxide hoặc triiron tetroxide"
  },
  {
    "formula": "CuO",
    "iupac": "Copper(II) oxide",
    "vi": "Đồng(II) oxit (đen)",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Copper kèm hóa trị (II) + oxide"
  },
  {
    "formula": "Cu₂O",
    "iupac": "Copper(I) oxide",
    "vi": "Đồng(I) oxit (đỏ gạch)",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Copper kèm hóa trị (I) + oxide"
  },
  {
    "formula": "Al₂O₃",
    "iupac": "Aluminium oxide",
    "vi": "Nhôm oxit (lưỡng tính)",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Aluminium + oxide"
  },
  {
    "formula": "CO",
    "iupac": "Carbon monoxide",
    "vi": "Cacbon monoxit (khí than)",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Phi kim + tiền tố chỉ số O (monoxide)"
  },
  {
    "formula": "CO₂",
    "iupac": "Carbon dioxide",
    "vi": "Cacbon đioxit (khí cacbonic)",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Phi kim + tiền tố chỉ số O (dioxide)"
  },
  {
    "formula": "SO₂",
    "iupac": "Sulfur dioxide",
    "vi": "Lưu huỳnh đioxit (khí sunfurơ)",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Phi kim + tiền tố chỉ số O (dioxide)"
  },
  {
    "formula": "SO₃",
    "iupac": "Sulfur trioxide",
    "vi": "Lưu huỳnh trioxit",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Phi kim + tiền tố chỉ số O (trioxide)"
  },
  {
    "formula": "NO",
    "iupac": "Nitrogen monoxide",
    "vi": "Nitơ monoxit",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Nitrogen + monoxide"
  },
  {
    "formula": "NO₂",
    "iupac": "Nitrogen dioxide",
    "vi": "Nitơ đioxit (khí màu nâu đỏ)",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Nitrogen + dioxide"
  },
  {
    "formula": "N₂O",
    "iupac": "Dinitrogen monoxide",
    "vi": "Đinitơ monoxit (khí cười)",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Tiền tố chỉ số N (dinitrogen) + monoxide"
  },
  {
    "formula": "P₂O₅",
    "iupac": "Diphosphorus pentoxide",
    "vi": "Điphotpho pentaoxit",
    "kind": "oxide",
    "kindLabel": "Oxide (Oxit)",
    "rule": "Diphosphorus + pentoxide (thực tế tồn tại P₄O₁₀)"
  },
  {
    "formula": "NaCl",
    "iupac": "Sodium chloride",
    "vi": "Natri clorua (muối ăn)",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Tên cation (sodium) + anion (chloride)"
  },
  {
    "formula": "KCl",
    "iupac": "Potassium chloride",
    "vi": "Kali clorua (phân kali)",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Tên cation (potassium) + anion (chloride)"
  },
  {
    "formula": "CaCl₂",
    "iupac": "Calcium chloride",
    "vi": "Canxi clorua",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Tên cation (calcium) + anion (chloride)"
  },
  {
    "formula": "FeCl₂",
    "iupac": "Iron(II) chloride",
    "vi": "Sắt(II) clorua",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Iron(II) + chloride"
  },
  {
    "formula": "FeCl₃",
    "iupac": "Iron(III) chloride",
    "vi": "Sắt(III) clorua",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Iron(III) + chloride"
  },
  {
    "formula": "CuSO₄",
    "iupac": "Copper(II) sulfate",
    "vi": "Đồng(II) sunfat (phèn xanh)",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Copper(II) + sulfate"
  },
  {
    "formula": "FeSO₄",
    "iupac": "Iron(II) sulfate",
    "vi": "Sắt(II) sunfat",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Iron(II) + sulfate"
  },
  {
    "formula": "Fe₂(SO₄)₃",
    "iupac": "Iron(III) sulfate",
    "vi": "Sắt(III) sunfat",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Iron(III) + sulfate"
  },
  {
    "formula": "BaSO₄",
    "iupac": "Barium sulfate",
    "vi": "Bari sunfat (kết tủa trắng tinh)",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Barium + sulfate"
  },
  {
    "formula": "AgNO₃",
    "iupac": "Silver nitrate",
    "vi": "Bạc nitrat (thuốc thử nhận biết halogen)",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Silver + nitrate"
  },
  {
    "formula": "KNO₃",
    "iupac": "Potassium nitrate",
    "vi": "Kali nitrat (diêm tiêu)",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Potassium + nitrate"
  },
  {
    "formula": "CaCO₃",
    "iupac": "Calcium carbonate",
    "vi": "Canxi cacbonat (đá vôi)",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Calcium + carbonate"
  },
  {
    "formula": "NaHCO₃",
    "iupac": "Sodium hydrogencarbonate",
    "vi": "Natri hidrocacbonat (baking soda)",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Sodium + hydrogencarbonate (muối axit)"
  },
  {
    "formula": "Na₂CO₃",
    "iupac": "Sodium carbonate",
    "vi": "Natri cacbonat (soda công nghiệp)",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Sodium + carbonate"
  },
  {
    "formula": "KMnO₄",
    "iupac": "Potassium permanganate",
    "vi": "Kali pemanganat (thuốc tím)",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Potassium + permanganate"
  },
  {
    "formula": "K₂Cr₂O₇",
    "iupac": "Potassium dichromate",
    "vi": "Kali đicromat (da cam)",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Potassium + dichromate"
  },
  {
    "formula": "K₂CrO₄",
    "iupac": "Potassium chromate",
    "vi": "Kali cromat (vàng)",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Potassium + chromate"
  },
  {
    "formula": "Ca₃(PO₄)₂",
    "iupac": "Calcium phosphate",
    "vi": "Canxi photphat (quặng apatit/photphorit)",
    "kind": "salt",
    "kindLabel": "Salt (Muối)",
    "rule": "Calcium + phosphate"
  },
  {
    "formula": "H₂",
    "iupac": "Hydrogen",
    "vi": "Khí hiđro",
    "kind": "gas",
    "kindLabel": "Khí & Đơn chất",
    "rule": "Hydrogen gas (nhẹ nhất vũ trụ)"
  },
  {
    "formula": "O₂",
    "iupac": "Oxygen",
    "vi": "Khí oxi",
    "kind": "gas",
    "kindLabel": "Khí & Đơn chất",
    "rule": "Oxygen gas (duy trì sự sống)"
  },
  {
    "formula": "O₃",
    "iupac": "Ozone",
    "vi": "Khí ozon",
    "kind": "gas",
    "kindLabel": "Khí & Đơn chất",
    "rule": "Dạng thù hình của oxygen, cản tia cực tím"
  },
  {
    "formula": "N₂",
    "iupac": "Nitrogen",
    "vi": "Khí nitơ",
    "kind": "gas",
    "kindLabel": "Khí & Đơn chất",
    "rule": "Nitrogen gas (chiếm 78% thể tích không khí)"
  },
  {
    "formula": "Cl₂",
    "iupac": "Chlorine",
    "vi": "Khí clo (vàng lục)",
    "kind": "gas",
    "kindLabel": "Khí & Đơn chất",
    "rule": "Chlorine gas (tính oxi hóa mạnh)"
  },
  {
    "formula": "NH₃",
    "iupac": "Ammonia",
    "vi": "Khí amoniac (mùi khai)",
    "kind": "gas",
    "kindLabel": "Khí & Đơn chất",
    "rule": "Ammonia (tính bazơ yếu)"
  }
];

export const IUPAC_ORGANIC_51: IupacCompoundItem[] = [
  {
    "formula": "CH₄",
    "iupac": "Methane",
    "vi": "Metan (khí bùn ao, khí mỏ dầu)",
    "kind": "organic",
    "kindLabel": "Alkane",
    "rule": "Meth- + -ane (1C no)",
    "smiles": "C"
  },
  {
    "formula": "C₂H₆",
    "iupac": "Ethane",
    "vi": "Etan",
    "kind": "organic",
    "kindLabel": "Alkane",
    "rule": "Eth- + -ane (2C no)",
    "smiles": "CC"
  },
  {
    "formula": "C₃H₈",
    "iupac": "Propane",
    "vi": "Propan (khí gas LPG)",
    "kind": "organic",
    "kindLabel": "Alkane",
    "rule": "Prop- + -ane (3C no)",
    "smiles": "CCC"
  },
  {
    "formula": "C₄H₁₀",
    "iupac": "Butane",
    "vi": "Butan (gas bật lửa)",
    "kind": "organic",
    "kindLabel": "Alkane",
    "rule": "But- + -ane (4C no)",
    "smiles": "CCCC"
  },
  {
    "formula": "CH(CH₃)₃",
    "iupac": "2-Methylpropane",
    "vi": "Isobutan",
    "kind": "organic",
    "kindLabel": "Alkane",
    "rule": "Mạch chính 3C: propane, vị trí 2 có nhánh methyl",
    "smiles": "CC(C)C"
  },
  {
    "formula": "C₂H₄",
    "iupac": "Ethene (Ethylene)",
    "vi": "Etilen (kích thích quả chín)",
    "kind": "organic",
    "kindLabel": "Alkene",
    "rule": "Eth- + -ene (1 liên kết C=C)",
    "smiles": "C=C"
  },
  {
    "formula": "C₃H₆",
    "iupac": "Propene (Propylene)",
    "vi": "Propilen",
    "kind": "organic",
    "kindLabel": "Alkene",
    "rule": "Prop- + -ene",
    "smiles": "CC=C"
  },
  {
    "formula": "C₂H₂",
    "iupac": "Ethyne (Acetylene)",
    "vi": "Axetilen (hàn xì gió đá)",
    "kind": "organic",
    "kindLabel": "Alkyne",
    "rule": "Eth- + -yne (1 liên kết C≡C)",
    "smiles": "C#C"
  },
  {
    "formula": "CH₂=CH–CH=CH₂",
    "iupac": "Buta-1,3-diene",
    "vi": "Buta-1,3-đien (đivinyl)",
    "kind": "organic",
    "kindLabel": "Alkadiene",
    "rule": "Mạch 4C (buta) + 2 liên kết đôi ở vị trí 1 và 3 (-1,3-diene)",
    "smiles": "C=CC=C"
  },
  {
    "formula": "CH₂=C(CH₃)–CH=CH₂",
    "iupac": "2-Methylbuta-1,3-diene",
    "vi": "Isopren (trùng hợp thành cao su)",
    "kind": "organic",
    "kindLabel": "Alkadiene",
    "rule": "Nhánh methyl ở C2 + buta-1,3-diene",
    "smiles": "C=CC(C)=C"
  },
  {
    "formula": "C₆H₆",
    "iupac": "Benzene",
    "vi": "Benzen",
    "kind": "organic",
    "kindLabel": "Arene",
    "rule": "Vòng thơm 6 cạnh liên hợp",
    "smiles": "c1ccccc1"
  },
  {
    "formula": "C₆H₅–CH₃",
    "iupac": "Toluene (Methylbenzene)",
    "vi": "Toluen",
    "kind": "organic",
    "kindLabel": "Arene",
    "rule": "Nhánh methyl gắn vào vòng benzene",
    "smiles": "Cc1ccccc1"
  },
  {
    "formula": "C₆H₅–CH=CH₂",
    "iupac": "Styrene (Vinylbenzene)",
    "vi": "Stiren (monome sản xuất xốp PS)",
    "kind": "organic",
    "kindLabel": "Arene",
    "rule": "Nhánh vinyl (ethenyl) gắn vào vòng benzene",
    "smiles": "C=Cc1ccccc1"
  },
  {
    "formula": "C₁₀H₈",
    "iupac": "Naphthalene",
    "vi": "Naphtalen (băng phiến)",
    "kind": "organic",
    "kindLabel": "Arene",
    "rule": "2 vòng benzene ngưng tụ",
    "smiles": "c1ccc2ccccc2c1"
  },
  {
    "formula": "CH₃OH",
    "iupac": "Methanol",
    "vi": "Ancol metylic (cồn công nghiệp, rất độc)",
    "kind": "organic",
    "kindLabel": "Alcohol",
    "rule": "Methane + -ol = methanol",
    "smiles": "CO"
  },
  {
    "formula": "C₂H₅OH",
    "iupac": "Ethanol",
    "vi": "Ancol etylic (rượu nếp, cồn y tế 70°)",
    "kind": "organic",
    "kindLabel": "Alcohol",
    "rule": "Ethane + -ol = ethanol",
    "smiles": "CCO"
  },
  {
    "formula": "CH₃CH₂CH₂OH",
    "iupac": "Propan-1-ol",
    "vi": "Ancol propylic",
    "kind": "organic",
    "kindLabel": "Alcohol",
    "rule": "Mạch 3C, nhóm OH ở C1",
    "smiles": "CCCO"
  },
  {
    "formula": "CH₃CH(OH)CH₃",
    "iupac": "Propan-2-ol (Isopropanol)",
    "vi": "Ancol isopropylic",
    "kind": "organic",
    "kindLabel": "Alcohol",
    "rule": "Mạch 3C, nhóm OH ở C2",
    "smiles": "CC(O)C"
  },
  {
    "formula": "CH₂OH–CH₂OH",
    "iupac": "Ethane-1,2-diol (Ethylene glycol)",
    "vi": "Etylen glicol (chất chống đông)",
    "kind": "organic",
    "kindLabel": "Polyol",
    "rule": "Ethane + 2 nhóm OH ở 1,2 (-1,2-diol)",
    "smiles": "OCCO"
  },
  {
    "formula": "CH₂OH–CHOH–CH₂OH",
    "iupac": "Propane-1,2,3-triol (Glycerol)",
    "vi": "Glixerol (thành phần chất béo)",
    "kind": "organic",
    "kindLabel": "Polyol",
    "rule": "Propane + 3 nhóm OH (-1,2,3-triol)",
    "smiles": "OCC(O)CO"
  },
  {
    "formula": "C₆H₅OH",
    "iupac": "Phenol",
    "vi": "Phenol (axit cacbolic, diệt khuẩn)",
    "kind": "organic",
    "kindLabel": "Phenol",
    "rule": "Nhóm –OH đính trực tiếp vào vòng benzene",
    "smiles": "Oc1ccccc1"
  },
  {
    "formula": "HCHO",
    "iupac": "Methanal (Formaldehyde)",
    "vi": "Fomanđehit (dung dịch focmon 37%)",
    "kind": "organic",
    "kindLabel": "Aldehyde",
    "rule": "Methane + -al = methanal",
    "smiles": "C=O"
  },
  {
    "formula": "CH₃CHO",
    "iupac": "Ethanal (Acetaldehyde)",
    "vi": "Axetanđehit",
    "kind": "organic",
    "kindLabel": "Aldehyde",
    "rule": "Ethane + -al = ethanal",
    "smiles": "CC=O"
  },
  {
    "formula": "CH₃COCH₃",
    "iupac": "Propan-2-one (Acetone)",
    "vi": "Axeton (nước rửa móng)",
    "kind": "organic",
    "kindLabel": "Ketone",
    "rule": "Propane + nhóm carbonyl >C=O ở C2 (-2-one)",
    "smiles": "CC(=O)C"
  },
  {
    "formula": "HCOOH",
    "iupac": "Methanoic acid (Formic acid)",
    "vi": "Axit fomic (axit kiến cắn)",
    "kind": "organic",
    "kindLabel": "Carboxylic acid",
    "rule": "Methan- + -oic acid",
    "smiles": "C(=O)O"
  },
  {
    "formula": "CH₃COOH",
    "iupac": "Ethanoic acid (Acetic acid)",
    "vi": "Axit axetic (giấm ăn 3-5%)",
    "kind": "organic",
    "kindLabel": "Carboxylic acid",
    "rule": "Ethan- + -oic acid",
    "smiles": "CC(=O)O"
  },
  {
    "formula": "HOOC–COOH",
    "iupac": "Ethanedioic acid (Oxalic acid)",
    "vi": "Axit oxalic (chua trong khế)",
    "kind": "organic",
    "kindLabel": "Carboxylic acid",
    "rule": "Ethane + 2 nhóm –COOH (-dioic acid)",
    "smiles": "O=C(O)C(=O)O"
  },
  {
    "formula": "C₆H₅COOH",
    "iupac": "Benzoic acid",
    "vi": "Axit benzoic (chất bảo quản)",
    "kind": "organic",
    "kindLabel": "Carboxylic acid",
    "rule": "Vòng benzene + -carboxylic acid",
    "smiles": "O=C(O)c1ccccc1"
  },
  {
    "formula": "CH₃COOC₂H₅",
    "iupac": "Ethyl acetate (Ethyl ethanoate)",
    "vi": "Etyl axetat (mùi thơm táo/lê)",
    "kind": "organic",
    "kindLabel": "Ester",
    "rule": "Tên gốc alkyl (ethyl) + tên gốc axit (ethanoate/acetate)",
    "smiles": "CCOC(=O)C"
  },
  {
    "formula": "HCOOCH₃",
    "iupac": "Methyl formate (Methyl methanoate)",
    "vi": "Metyl fomat",
    "kind": "organic",
    "kindLabel": "Ester",
    "rule": "Methyl + methanoate",
    "smiles": "COC=O"
  },
  {
    "formula": "CH₃COOCH₂C₆H₅",
    "iupac": "Benzyl acetate",
    "vi": "Benzyl axetat (mùi thơm hoa nhài)",
    "kind": "organic",
    "kindLabel": "Ester",
    "rule": "Benzyl + acetate",
    "smiles": "CC(=O)OCc1ccccc1"
  },
  {
    "formula": "(C₁₇H₃₅COO)₃C₃H₅",
    "iupac": "Tristearin (Glyceryl tristearate)",
    "vi": "Tristearin (chất béo no, mỡ động vật)",
    "kind": "organic",
    "kindLabel": "Lipid (Triglyceride)",
    "rule": "Triglyceride của stearic acid và glycerol",
    "smiles": "O=C(OCC(COC(=O)CCCCCCCCCCCCCCCCC)OC(=O)CCCCCCCCCCCCCCCCC)CCCCCCCCCCCCCCCCC"
  },
  {
    "formula": "(C₁₇H₃₃COO)₃C₃H₅",
    "iupac": "Triolein (Glyceryl trioleate)",
    "vi": "Triolein (chất béo không no, dầu thực vật)",
    "kind": "organic",
    "kindLabel": "Lipid (Triglyceride)",
    "rule": "Triglyceride của oleic acid và glycerol"
  },
  {
    "formula": "CH₃NH₂",
    "iupac": "Methanamine (Methylamine)",
    "vi": "Metylamin (khí mùi khai tanh)",
    "kind": "organic",
    "kindLabel": "Amine",
    "rule": "Methan- + -amine (amine bậc 1)",
    "smiles": "CN"
  },
  {
    "formula": "(CH₃)₂NH",
    "iupac": "N-Methylmethanamine (Dimethylamine)",
    "vi": "Đimetylamin",
    "kind": "organic",
    "kindLabel": "Amine",
    "rule": "Amine bậc 2 có 2 nhóm methyl",
    "smiles": "CNC"
  },
  {
    "formula": "(CH₃)₃N",
    "iupac": "N,N-Dimethylmethanamine (Trimethylamine)",
    "vi": "Trimetylamin (mùi cá ươn)",
    "kind": "organic",
    "kindLabel": "Amine",
    "rule": "Amine bậc 3",
    "smiles": "CN(C)C"
  },
  {
    "formula": "C₆H₅NH₂",
    "iupac": "Benzenamine (Aniline)",
    "vi": "Anilin (ít tan trong nước, độc)",
    "kind": "organic",
    "kindLabel": "Amine",
    "rule": "Amine thơm, gốc phenyl gắn –NH₂",
    "smiles": "Nc1ccccc1"
  },
  {
    "formula": "H₂N–CH₂–COOH",
    "iupac": "2-Aminoethanoic acid (Glycine)",
    "vi": "Glyxin (Gly)",
    "kind": "organic",
    "kindLabel": "Amino acid",
    "rule": "Amino acid đơn giản nhất, không có C bất đối",
    "smiles": "NCC(=O)O"
  },
  {
    "formula": "CH₃–CH(NH₂)–COOH",
    "iupac": "2-Aminopropanoic acid (Alanine)",
    "vi": "Alanin (Ala)",
    "kind": "organic",
    "kindLabel": "Amino acid",
    "rule": "Mạch 3C, nhóm amino ở C2",
    "smiles": "CC(N)C(=O)O"
  },
  {
    "formula": "(CH₃)₂CH–CH(NH₂)–COOH",
    "iupac": "2-Amino-3-methylbutanoic acid (Valine)",
    "vi": "Valin (Val)",
    "kind": "organic",
    "kindLabel": "Amino acid",
    "rule": "Amino acid thiết yếu",
    "smiles": "CC(C)C(N)C(=O)O"
  },
  {
    "formula": "C₆H₁₂O₆",
    "iupac": "Glucose",
    "vi": "Glucozơ (đường nho, 0,1% trong máu)",
    "kind": "organic",
    "kindLabel": "Monosaccharide",
    "rule": "Monosaccharide dạng polyhydroxy aldehyde"
  },
  {
    "formula": "C₆H₁₂O₆",
    "iupac": "Fructose",
    "vi": "Fructozơ (đường mật ong 40%)",
    "kind": "organic",
    "kindLabel": "Monosaccharide",
    "rule": "Monosaccharide dạng polyhydroxy ketone"
  },
  {
    "formula": "C₁₂H₂₂O₁₁",
    "iupac": "Sucrose (Saccharose)",
    "vi": "Saccarozơ (đường mía, đường củ cải)",
    "kind": "organic",
    "kindLabel": "Disaccharide",
    "rule": "Disaccharide liên kết α-1,2-glycosidic giữa glucose và fructose"
  },
  {
    "formula": "C₁₂H₂₂O₁₁",
    "iupac": "Maltose",
    "vi": "Mantozơ (đường mạch nha)",
    "kind": "organic",
    "kindLabel": "Disaccharide",
    "rule": "Disaccharide liên kết α-1,4-glycosidic giữa 2 gốc glucose"
  },
  {
    "formula": "(C₆H₁₀O₅)ₙ",
    "iupac": "Starch",
    "vi": "Tinh bột (gồm amylose và amylopectin)",
    "kind": "organic",
    "kindLabel": "Polysaccharide",
    "rule": "Polysaccharide dự trữ năng lượng ở thực vật"
  },
  {
    "formula": "(C₆H₁₀O₅)ₙ",
    "iupac": "Cellulose",
    "vi": "Xenlulozơ (thành tế bào thực vật, sợi bông)",
    "kind": "organic",
    "kindLabel": "Polysaccharide",
    "rule": "Polysaccharide mạch kéo dài liên kết β-1,4-glycosidic"
  },
  {
    "formula": "(–CH₂–CH₂–)ₙ",
    "iupac": "Polyethylene (PE)",
    "vi": "Polietilen (nhựa PE màng bọc)",
    "kind": "organic",
    "kindLabel": "Polymer",
    "rule": "Poly + tên monome (ethylene)"
  },
  {
    "formula": "(–CH₂–CH(CH₃)–)ₙ",
    "iupac": "Polypropylene (PP)",
    "vi": "Polipropilen (nhựa PP hộp cơm)",
    "kind": "organic",
    "kindLabel": "Polymer",
    "rule": "Poly + propylene"
  },
  {
    "formula": "(–CH₂–CH(Cl)–)ₙ",
    "iupac": "Poly(vinyl chloride) (PVC)",
    "vi": "Poli(vinyl clorua) (ống nước PVC)",
    "kind": "organic",
    "kindLabel": "Polymer",
    "rule": "Poly + vinyl chloride"
  },
  {
    "formula": "(–CH₂–CH(C₆H₅)–)ₙ",
    "iupac": "Polystyrene (PS)",
    "vi": "Polistiren (hộp xốp, khay cách nhiệt)",
    "kind": "organic",
    "kindLabel": "Polymer",
    "rule": "Poly + styrene"
  },
  {
    "formula": "(–NH–[CH₂]₆–NH–CO–[CH₂]₄–CO–)ₙ",
    "iupac": "Nylon-6,6 (Poly(hexamethylene adipamide))",
    "vi": "Nilon-6,6 (tơ sợi tổng hợp dệt vải)",
    "kind": "organic",
    "kindLabel": "Polyamide",
    "rule": "Trùng ngưng hexamethylenediamine và adipic acid"
  }
];

export const IUPAC_RULES_6: IupacRuleItem[] = [
  {
    "title": "1. Quy tắc gọi tên Nguyên tố Hóa học & Đơn chất",
    "desc": "Theo GDPT 2018, tên tất cả 118 nguyên tố được viết theo danh pháp IUPAC bằng tiếng Anh chuẩn quốc tế. Không còn dùng các tên phiên âm kiểu cũ như Sắt, Đồng, Nhôm, Chì, Lưu huỳnh, Hiđro, Oxi, Nitơ trong các công thức và thuật ngữ chuyên ngành.",
    "formulaPattern": "[Tên tiếng Anh IUPAC chuẩn]",
    "examples": [
      [
        "Fe",
        "Iron",
        "Sắt (trước đây gọi Sắt)"
      ],
      [
        "Cu",
        "Copper",
        "Đồng (trước đây gọi Đồng)"
      ],
      [
        "Al",
        "Aluminium",
        "Nhôm (trước đây gọi Nhôm)"
      ],
      [
        "Ag",
        "Silver",
        "Bạc (trước đây gọi Bạc)"
      ],
      [
        "Au",
        "Gold",
        "Vàng (trước đây gọi Vàng)"
      ],
      [
        "Pb",
        "Lead",
        "Chì (trước đây gọi Chì)"
      ],
      [
        "Sn",
        "Tin",
        "Thiếc (trước đây gọi Thiếc)"
      ],
      [
        "Na",
        "Sodium",
        "Natri (trước đây gọi Natri)"
      ],
      [
        "K",
        "Potassium",
        "Kali (trước đây gọi Kali)"
      ],
      [
        "N",
        "Nitrogen",
        "Nitơ (trước đây gọi Nitơ)"
      ],
      [
        "O",
        "Oxygen",
        "Oxi (trước đây gọi Oxi)"
      ],
      [
        "H",
        "Hydrogen",
        "Hiđro (trước đây gọi Hiđro)"
      ],
      [
        "S",
        "Sulfur",
        "Lưu huỳnh (trước đây gọi Lưu huỳnh)"
      ]
    ]
  },
  {
    "title": "2. Quy tắc gọi tên Oxide (Oxit)",
    "desc": "Tên oxide = Tên nguyên tố + (Hóa trị nếu kim loại nhiều hóa trị) + oxide. Với oxide của phi kim, dùng tiền tố chỉ số lượng (mono, di, tri, tetra, penta...) trước tên nguyên tố và trước từ oxide.",
    "formulaPattern": "Kim loại: [Tên KL] + (Hóa trị La Mã) + oxide | Phi kim: (Tiền tố) + [Tên PK] + (Tiền tố) + oxide",
    "examples": [
      [
        "CaO",
        "Calcium oxide",
        "Canxi oxit"
      ],
      [
        "CuO",
        "Copper(II) oxide",
        "Đồng(II) oxit"
      ],
      [
        "Fe₂O₃",
        "Iron(III) oxide",
        "Sắt(III) oxit"
      ],
      [
        "CO",
        "Carbon monoxide",
        "Cacbon monoxit"
      ],
      [
        "CO₂",
        "Carbon dioxide",
        "Cacbon đioxit"
      ],
      [
        "SO₂",
        "Sulfur dioxide",
        "Lưu huỳnh đioxit"
      ],
      [
        "SO₃",
        "Sulfur trioxide",
        "Lưu huỳnh trioxit"
      ],
      [
        "N₂O₅",
        "Dinitrogen pentoxide",
        "Đinitơ pentaoxit"
      ]
    ]
  },
  {
    "title": "3. Quy tắc gọi tên Hydroxide (Bazơ)",
    "desc": "Tên hydroxide = Tên kim loại + (Hóa trị La Mã nếu có nhiều hóa trị) + hydroxide.",
    "formulaPattern": "[Tên kim loại] + (Hóa trị) + hydroxide",
    "examples": [
      [
        "NaOH",
        "Sodium hydroxide",
        "Natri hiđroxit"
      ],
      [
        "KOH",
        "Potassium hydroxide",
        "Kali hiđroxit"
      ],
      [
        "Ba(OH)₂",
        "Barium hydroxide",
        "Bari hiđroxit"
      ],
      [
        "Fe(OH)₂",
        "Iron(II) hydroxide",
        "Sắt(II) hiđroxit"
      ],
      [
        "Fe(OH)₃",
        "Iron(III) hydroxide",
        "Sắt(III) hiđroxit"
      ],
      [
        "Cu(OH)₂",
        "Copper(II) hydroxide",
        "Đồng(II) hiđroxit"
      ],
      [
        "Al(OH)₃",
        "Aluminium hydroxide",
        "Nhôm hiđroxit"
      ]
    ]
  },
  {
    "title": "4. Quy tắc gọi tên Acid (Axit)",
    "desc": "• Axit không có oxi: Hydro- + tên gốc phi kim + -ic acid.\n• Axit có oxi nhiều oxi: Tên gốc phi kim + -ic acid.\n• Axit có oxi ít oxi: Tên gốc phi kim + -ous acid.",
    "formulaPattern": "Không có O: Hydro + [gốc PK] + ic acid | Có nhiều O: [gốc PK] + ic acid | Có ít O: [gốc PK] + ous acid",
    "examples": [
      [
        "HCl",
        "Hydrochloric acid",
        "Axit clohiđric"
      ],
      [
        "HBr",
        "Hydrobromic acid",
        "Axit bromhiđric"
      ],
      [
        "H₂S",
        "Hydrosulfuric acid",
        "Axit sunfuhidric"
      ],
      [
        "H₂SO₄",
        "Sulfuric acid",
        "Axit sunfuric"
      ],
      [
        "H₂SO₃",
        "Sulfurous acid",
        "Axit sunfurơ"
      ],
      [
        "HNO₃",
        "Nitric acid",
        "Axit nitric"
      ],
      [
        "HNO₂",
        "Nitrous acid",
        "Axit nitrơ"
      ],
      [
        "H₃PO₄",
        "Phosphoric acid",
        "Axit photphoric"
      ]
    ]
  },
  {
    "title": "5. Quy tắc gọi tên Muối (Salt)",
    "desc": "Tên muối = Tên kim loại/cation (kèm hóa trị nếu cần) + Tên anion gốc axit (đuôi -ide cho axit không có O; đuôi -ate cho axit nhiều O; đuôi -ite cho axit ít O). Nếu có hiđro axit, thêm hydrogen- trước tên gốc.",
    "formulaPattern": "[Tên Cation] + (Hóa trị) + [Tên Anion gốc axit đuôi -ide / -ate / -ite]",
    "examples": [
      [
        "NaCl",
        "Sodium chloride",
        "Natri clorua"
      ],
      [
        "CuSO₄",
        "Copper(II) sulfate",
        "Đồng(II) sunfat"
      ],
      [
        "FeSO₄",
        "Iron(II) sulfate",
        "Sắt(II) sunfat"
      ],
      [
        "FeCl₃",
        "Iron(III) chloride",
        "Sắt(III) clorua"
      ],
      [
        "AgNO₃",
        "Silver nitrate",
        "Bạc nitrat"
      ],
      [
        "CaCO₃",
        "Calcium carbonate",
        "Canxi cacbonat"
      ],
      [
        "NaHCO₃",
        "Sodium hydrogencarbonate",
        "Natri hidrocacbonat (baking soda)"
      ],
      [
        "Ca₃(PO₄)₂",
        "Calcium phosphate",
        "Canxi photphat"
      ],
      [
        "KMnO₄",
        "Potassium permanganate",
        "Kali pemanganat"
      ]
    ]
  },
  {
    "title": "6. Quy tắc gọi tên Hợp chất Hữu cơ",
    "desc": "Tên IUPAC thay thế = [Vị trí nhánh]-[Tên nhánh] + [Tên mạch chính C] + [Vị trí liên kết bội/nhóm chức]-[Hậu tố chức].\n• Alkane: đuôi -ane (methane, ethane, propane, butane...)\n• Alkene: đuôi -ene (ethene, propene, but-1-ene...)\n• Alkyne: đuôi -yne (ethyne, propyne, but-1-yne...)\n• Alcohol: đuôi -ol (methanol, ethanol, propan-1-ol...)\n• Aldehyde: đuôi -al (methanal, ethanal...)\n• Carboxylic acid: axit đuôi -oic acid (methanoic acid, ethanoic acid...)\n• Ester: Tên gốc R′ + tên gốc carboxylate (ethyl acetate, methyl formate...).",
    "formulaPattern": "[Vị trí nhánh]-[Tiền tố nhánh] + [Mạch C chính] + [Vị trí chức]-[Hậu tố chức]",
    "examples": [
      [
        "CH₄",
        "Methane",
        "Metan"
      ],
      [
        "C₂H₄",
        "Ethene",
        "Etilen"
      ],
      [
        "C₂H₂, CH≡CH",
        "Ethyne",
        "Axetilen"
      ],
      [
        "C₂H₅OH",
        "Ethanol",
        "Ancol etylic"
      ],
      [
        "CH₃CHO",
        "Ethanal",
        "Axetanđehit"
      ],
      [
        "CH₃COOH",
        "Ethanoic acid",
        "Axit axetic"
      ],
      [
        "CH₃COOC₂H₅",
        "Ethyl acetate / Ethyl ethanoate",
        "Etyl axetat"
      ],
      [
        "CH₃NH₂",
        "Methanamine",
        "Metylamin"
      ],
      [
        "H₂NCH₂COOH",
        "Glycine",
        "Glyxin"
      ]
    ]
  }
];

export const IUPAC_CHAIN_PREFIXES: [number, string, string][] = [
  [
    1,
    "meth- (met)",
    "mono"
  ],
  [
    2,
    "eth- (et)",
    "di / đi"
  ],
  [
    3,
    "prop- (prop)",
    "tri"
  ],
  [
    4,
    "but- (but)",
    "tetra"
  ],
  [
    5,
    "pent- (pent)",
    "penta"
  ],
  [
    6,
    "hex- (hex)",
    "hexa"
  ],
  [
    7,
    "hept- (hept)",
    "hepta"
  ],
  [
    8,
    "oct- (oct)",
    "octa"
  ],
  [
    9,
    "non- (non)",
    "nona"
  ],
  [
    10,
    "dec- (đec)",
    "deca / đeca"
  ],
  [
    11,
    "undec- (unđec)",
    "undeca"
  ],
  [
    12,
    "dodec- (đođec)",
    "dodeca"
  ],
  [
    15,
    "pentadec- (pentađec)",
    ""
  ],
  [
    16,
    "hexadec- (hexađec)",
    ""
  ],
  [
    18,
    "octadec- (octađec)",
    ""
  ],
  [
    20,
    "icos- (eicos)",
    ""
  ]
];

export const IUPAC_RADICALS: [string, string, string][] = [
  [
    "CH₃–",
    "methyl (metyl)",
    "gốc alkyl (ankyl)"
  ],
  [
    "C₂H₅–",
    "ethyl (etyl)",
    ""
  ],
  [
    "CH₃CH₂CH₂–",
    "propyl",
    ""
  ],
  [
    "(CH₃)₂CH–",
    "isopropyl (propan-2-yl)",
    ""
  ],
  [
    "CH₃CH₂CH₂CH₂–",
    "butyl",
    ""
  ],
  [
    "CH₃CH₂CH(CH₃)–",
    "sec-butyl (butan-2-yl)",
    ""
  ],
  [
    "(CH₃)₂CHCH₂–",
    "isobutyl (2-methylpropyl)",
    ""
  ],
  [
    "(CH₃)₃C–",
    "tert-butyl",
    ""
  ],
  [
    "CH₂=CH–",
    "vinyl (ethenyl)",
    "gốc không no"
  ],
  [
    "CH₂=CH–CH₂–",
    "allyl (anlyl)",
    ""
  ],
  [
    "C₆H₅–",
    "phenyl",
    "gốc thơm"
  ],
  [
    "C₆H₅CH₂–",
    "benzyl",
    ""
  ],
  [
    "–OH",
    "hydroxy (hiđroxi)",
    "nhóm thế / nhóm chức"
  ],
  [
    "–NH₂",
    "amino",
    ""
  ],
  [
    "–NO₂",
    "nitro",
    ""
  ],
  [
    "–COOH",
    "carboxyl (cacboxyl)",
    ""
  ],
  [
    "–CHO",
    "formyl (fomyl / anđehit)",
    ""
  ],
  [
    "–CO–",
    "carbonyl (cacbonyl / xeton)",
    ""
  ]
];

export const IUPAC_ACID_ANIONS: [string, string, string, string][] = [
  [
    "HCl",
    "Cl⁻",
    "hydrochloric acid (chloride / clorua)",
    "mạnh"
  ],
  [
    "HBr",
    "Br⁻",
    "hydrobromic acid (bromide / bromua)",
    "mạnh"
  ],
  [
    "HI",
    "I⁻",
    "hydroiodic acid (iodide / iođua)",
    "mạnh"
  ],
  [
    "HF",
    "F⁻",
    "hydrofluoric acid (fluoride / florua)",
    "yếu"
  ],
  [
    "HNO₃",
    "NO₃⁻",
    "nitric acid (nitrate / nitrat)",
    "mạnh"
  ],
  [
    "HNO₂",
    "NO₂⁻",
    "nitrous acid (nitrite / nitrit)",
    "yếu"
  ],
  [
    "H₂SO₄",
    "SO₄²⁻ / HSO₄⁻",
    "sulfuric acid (sulfate / hydrogen sulfate)",
    "mạnh"
  ],
  [
    "H₂SO₃",
    "SO₃²⁻ / HSO₃⁻",
    "sulfurous acid (sulfite / hydrogen sulfite)",
    "trung bình"
  ],
  [
    "H₂S",
    "S²⁻ / HS⁻",
    "hydrosulfuric acid (sulfide / hydrogen sulfide)",
    "yếu"
  ],
  [
    "H₂CO₃",
    "CO₃²⁻ / HCO₃⁻",
    "carbonic acid (carbonate / hydrogen carbonate)",
    "yếu"
  ],
  [
    "H₃PO₄",
    "PO₄³⁻ / HPO₄²⁻ / H₂PO₄⁻",
    "phosphoric acid (phosphate / hydrogen phosphate)",
    "trung bình"
  ],
  [
    "H₂SiO₃",
    "SiO₃²⁻",
    "silicic acid (silicate / silicat)",
    "rất yếu"
  ],
  [
    "HClO",
    "ClO⁻",
    "hypochlorous acid (hypochlorite)",
    "yếu"
  ],
  [
    "HClO₃",
    "ClO₃⁻",
    "chloric acid (chlorate)",
    "mạnh"
  ],
  [
    "HClO₄",
    "ClO₄⁻",
    "perchloric acid (perchlorate)",
    "rất mạnh"
  ],
  [
    "HMnO₄",
    "MnO₄⁻",
    "permanganic acid (permanganate)",
    "mạnh"
  ],
  [
    "H₂CrO₄",
    "CrO₄²⁻",
    "chromic acid (chromate)",
    "mạnh"
  ],
  [
    "H₂Cr₂O₇",
    "Cr₂O₇²⁻",
    "dichromic acid (dichromate)",
    "mạnh"
  ],
  [
    "CH₃COOH",
    "CH₃COO⁻",
    "acetic acid / ethanoic acid (acetate)",
    "yếu"
  ],
  [
    "HCOOH",
    "HCOO⁻",
    "formic acid / methanoic acid (formate)",
    "yếu"
  ],
  [
    "H₂C₂O₄",
    "C₂O₄²⁻",
    "oxalic acid (oxalate / oxalat)",
    "yếu"
  ],
  [
    "HCN",
    "CN⁻",
    "hydrocyanic acid (cyanide / xianua)",
    "rất yếu"
  ],
  [
    "HSCN",
    "SCN⁻",
    "thiocyanic acid (thiocyanate)",
    "mạnh"
  ]
];

export const MOLECULE_CATALOG_V12: MoleculeCatalogGroup[] = [
  {
    "id": "vc1",
    "name": "Phân tử vô cơ đơn giản",
    "items": [
      [
        "Water (Nước) H₂O",
        "O",
        "AX₂E₂: gấp khúc, 104,5°, lai hóa sp³, phân cực"
      ],
      [
        "Hydrogen peroxide (Hiđro peoxit / Nước oxy già) H₂O₂",
        "OO",
        "Hai nhóm –OH nối O–O, không phẳng"
      ],
      [
        "Ammonia (Amoniac) NH₃",
        "N",
        "AX₃E: chóp tam giác, ≈107°, sp³, phân cực"
      ],
      [
        "Methane (Metan) CH₄",
        "C",
        "AX₄: tứ diện đều, 109,5°, sp³, không phân cực"
      ],
      [
        "Carbon dioxide (Cacbon đioxit) CO₂",
        "O=C=O",
        "AX₂: thẳng 180°, sp, không phân cực"
      ],
      [
        "Carbon monoxide (Cacbon monoxit) CO",
        "[C-]#[O+]",
        "Liên kết ba, có liên kết cho–nhận"
      ],
      [
        "Sulfur dioxide (Lưu huỳnh đioxit) SO₂",
        "O=S=O",
        "AX₂E: gấp khúc ≈119°, sp², phân cực"
      ],
      [
        "Sulfur trioxide (Lưu huỳnh trioxit) SO₃",
        "O=S(=O)=O",
        "AX₃: tam giác phẳng 120°, sp², không phân cực"
      ],
      [
        "Hydrogen sulfide (Hiđro sunfua) H₂S",
        "S",
        "AX₂E₂: gấp khúc ≈92°"
      ],
      [
        "Ozone (Khí ozon) O₃",
        "[O-][O+]=O",
        "AX₂E: gấp khúc 117°"
      ],
      [
        "Nitrogen (Khí nitơ) N₂",
        "N#N",
        "Liên kết ba bền, không phân cực"
      ],
      [
        "Oxygen (Khí oxi) O₂",
        "O=O",
        "Liên kết đôi (thuận từ, hai e độc thân)"
      ],
      [
        "Chlorine (Khí clo) Cl₂",
        "ClCl"
      ],
      [
        "Hydrogen chloride (Hiđro clorua) HCl",
        "Cl"
      ],
      [
        "Hydrogen fluoride (Hiđro florua) HF",
        "F",
        "Liên kết hiđro mạnh"
      ],
      [
        "Nitric acid (Axit nitric) HNO₃",
        "O[N+](=O)[O-]"
      ],
      [
        "Sulfuric acid (Axit sunfuric) H₂SO₄",
        "OS(=O)(=O)O"
      ],
      [
        "Phosphoric acid (Axit photphoric) H₃PO₄",
        "OP(=O)(O)O"
      ],
      [
        "Silane (Silan) SiH₄",
        "[SiH4]"
      ],
      [
        "Phosphine (Photphin) PH₃",
        "P"
      ]
    ]
  },
  {
    "id": "vc2",
    "name": "VSEPR: bảng AXₙEₘ",
    "items": [
      [
        "Beryllium chloride BeCl₂ (AX₂)",
        "Cl[Be]Cl",
        "Thẳng 180°, sp"
      ],
      [
        "Boron trifluoride BF₃ (AX₃)",
        "FB(F)F",
        "Tam giác phẳng 120°, sp²"
      ],
      [
        "Methane CH₄ (AX₄)",
        "C",
        "Tứ diện 109,5°"
      ],
      [
        "Phosphorus trichloride PCl₃ (AX₃E)",
        "ClP(Cl)Cl",
        "Chóp tam giác ≈100°"
      ],
      [
        "Water H₂O (AX₂E₂)",
        "O"
      ],
      [
        "Phosphorus pentachloride PCl₅ (AX₅)",
        "ClP(Cl)(Cl)(Cl)Cl",
        "Lưỡng chóp tam giác: 90° và 120°"
      ],
      [
        "Sulfur tetrafluoride SF₄ (AX₄E)",
        "FS(F)(F)F",
        "Bập bênh"
      ],
      [
        "Chlorine trifluoride ClF₃ (AX₃E₂)",
        "FCl(F)F",
        "Hình chữ T"
      ],
      [
        "Xenon difluoride XeF₂ (AX₂E₃)",
        "F[Xe]F",
        "Thẳng 180°"
      ],
      [
        "Sulfur hexafluoride SF₆ (AX₆)",
        "FS(F)(F)(F)(F)F",
        "Bát diện đều 90°"
      ],
      [
        "Bromine pentafluoride BrF₅ (AX₅E)",
        "F[Br](F)(F)(F)F",
        "Chóp vuông"
      ],
      [
        "Xenon tetrafluoride XeF₄ (AX₄E₂)",
        "F[Xe](F)(F)F",
        "Vuông phẳng"
      ]
    ]
  },
  {
    "id": "ion",
    "name": "Ion đa nguyên tử",
    "items": [
      [
        "Ammonium (Amoni) NH₄⁺",
        "[NH4+]",
        "Tứ diện"
      ],
      [
        "Hydronium (Hiđronium) H₃O⁺",
        "[OH3+]",
        "Chóp tam giác"
      ],
      [
        "Nitrate (Nitrat) NO₃⁻",
        "O=[N+]([O-])[O-]",
        "Tam giác phẳng, liên hợp"
      ],
      [
        "Carbonate (Cacbonat) CO₃²⁻",
        "[O-]C(=O)[O-]",
        "Tam giác phẳng"
      ],
      [
        "Sulfate (Sunfat) SO₄²⁻",
        "[O-]S(=O)(=O)[O-]",
        "Tứ diện"
      ],
      [
        "Phosphate (Photphat) PO₄³⁻",
        "[O-]P(=O)([O-])[O-]",
        "Tứ diện"
      ],
      [
        "Hydroxide (Hiđroxit) OH⁻",
        "[OH-]"
      ],
      [
        "Chlorate (Clorat) ClO₃⁻",
        "O=Cl(=O)[O-]",
        "Chóp tam giác"
      ],
      [
        "Perchlorate (Peclorat) ClO₄⁻",
        "[O-][Cl](=O)(=O)=O",
        "Tứ diện"
      ]
    ]
  },
  {
    "id": "ankan",
    "name": "Alkane (Hiđrocacbon no)",
    "items": [
      [
        "Methane (Metan) C1H4",
        "C"
      ],
      [
        "Ethane (Etan) C2H6",
        "CC"
      ],
      [
        "Propane (Propan) C3H8",
        "CCC"
      ],
      [
        "Butane (Butan) C4H10",
        "CCCC"
      ],
      [
        "Pentane (Pentan) C5H12",
        "CCCCC"
      ],
      [
        "Hexane (Hexan) C6H14",
        "CCCCCC"
      ],
      [
        "Heptane (Heptan) C7H16",
        "CCCCCCC"
      ],
      [
        "Octane (Octan) C8H18",
        "CCCCCCCC"
      ],
      [
        "Nonane (Nonan) C9H20",
        "CCCCCCCCC"
      ],
      [
        "Decane (Đecan) C10H22",
        "CCCCCCCCCC"
      ],
      [
        "2-Methylpropane (Isobutane / Isobutan)",
        "CC(C)C"
      ],
      [
        "2-Methylbutane (Isopentane / Isopentan)",
        "CCC(C)C"
      ],
      [
        "2,2-Dimethylpropane (Neopentane / Neopentan)",
        "CC(C)(C)C"
      ],
      [
        "2,2,4-Trimethylpentane (Isooctane / Isooctan)",
        "CC(C)CC(C)(C)C",
        "Chuẩn chỉ số octan = 100"
      ],
      [
        "Cyclopropane (Xiclopropan)",
        "C1CC1"
      ],
      [
        "Cyclobutane (Xiclobutan)",
        "C1CCC1"
      ],
      [
        "Cyclopentane (Xiclopentan)",
        "C1CCCC1"
      ],
      [
        "Cyclohexane (Xiclohexan)",
        "C1CCCCC1",
        "Dạng ghế trong thực tế"
      ]
    ]
  },
  {
    "id": "anken",
    "name": "Alkene, Alkyne, Alkadiene",
    "items": [
      [
        "Ethene (Ethylene / Etilen) C₂H₄",
        "C=C",
        "sp², phẳng, 120°"
      ],
      [
        "Propene (Propylene / Propilen) C₃H₆",
        "CC=C"
      ],
      [
        "But-1-ene (But-1-en)",
        "CCC=C"
      ],
      [
        "But-2-ene (But-2-en)",
        "CC=CC",
        "Có đồng phân hình học cis/trans"
      ],
      [
        "2-Methylpropene (Isobutylene / Isobutilen)",
        "CC(C)=C"
      ],
      [
        "Pent-1-ene (Pent-1-en)",
        "CCCC=C"
      ],
      [
        "Buta-1,3-diene (Buta-1,3-đien)",
        "C=CC=C",
        "Hệ liên hợp, điều chế cao su buna"
      ],
      [
        "2-Methylbuta-1,3-diene (Isoprene / Isopren)",
        "C=CC(C)=C",
        "Monome cao su isopren"
      ],
      [
        "Ethyne (Acetylene / Axetilen) C₂H₂",
        "C#C",
        "sp, thẳng 180°"
      ],
      [
        "Propyne (Propin)",
        "CC#C"
      ],
      [
        "But-1-yne (But-1-in)",
        "CCC#C"
      ],
      [
        "But-2-yne (But-2-in)",
        "CC#CC"
      ],
      [
        "Vinylacetylene (Vinylaxetilen)",
        "C=CC#C"
      ]
    ]
  },
  {
    "id": "aren",
    "name": "Arene (Hiđrocacbon thơm)",
    "items": [
      [
        "Benzene (Benzen) C₆H₆",
        "c1ccccc1",
        "Vòng phẳng, 6 e π liên hợp"
      ],
      [
        "Toluene (Methylbenzene / Toluen)",
        "Cc1ccccc1"
      ],
      [
        "o-Xylene (1,2-Dimethylbenzene / o-Xilen)",
        "Cc1ccccc1C"
      ],
      [
        "m-Xylene (1,3-Dimethylbenzene / m-Xilen)",
        "Cc1cccc(C)c1"
      ],
      [
        "p-Xylene (1,4-Dimethylbenzene / p-Xilen)",
        "Cc1ccc(C)cc1"
      ],
      [
        "Ethylbenzene (Etylbenzen)",
        "CCc1ccccc1"
      ],
      [
        "Styrene (Vinylbenzene / Stiren)",
        "C=Cc1ccccc1",
        "Monome polistiren"
      ],
      [
        "Cumene (Isopropylbenzene / Cumen)",
        "CC(C)c1ccccc1"
      ],
      [
        "Naphthalene (Naphtalen / Băng phiến)",
        "c1ccc2ccccc2c1"
      ],
      [
        "Anthracene (Anthracen)",
        "c1ccc2cc3ccccc3cc2c1"
      ]
    ]
  },
  {
    "id": "halo",
    "name": "Halogenoalkane (Dẫn xuất halogen)",
    "items": [
      [
        "Chloromethane (Methyl chloride / Metyl clorua) CH₃Cl",
        "CCl"
      ],
      [
        "Dichloromethane (Methylene chloride / Điclometan) CH₂Cl₂",
        "ClCCl"
      ],
      [
        "Trichloromethane (Chloroform / Cloroform) CHCl₃",
        "ClC(Cl)Cl"
      ],
      [
        "Tetrachloromethane (Carbon tetrachloride) CCl₄",
        "ClC(Cl)(Cl)Cl",
        "Tứ diện đều, không phân cực"
      ],
      [
        "Bromoethane (Ethyl bromide / Etyl bromua)",
        "CCBr"
      ],
      [
        "Chloroethene (Vinyl chloride / Vinyl clorua)",
        "C=CCl",
        "Monome PVC"
      ],
      [
        "3-Chloroprop-1-ene (Allyl chloride / Anlyl clorua)",
        "C=CCCl"
      ],
      [
        "Chlorobenzene (Clobenzen)",
        "Clc1ccccc1"
      ],
      [
        "(Chloromethyl)benzene (Benzyl chloride / Benzyl clorua)",
        "ClCc1ccccc1"
      ],
      [
        "Dichlorodifluoromethane (Freon-12) CCl₂F₂",
        "FC(F)(Cl)Cl"
      ],
      [
        "Triiodomethane (Iodoform) CHI₃",
        "IC(I)I"
      ]
    ]
  },
  {
    "id": "ancol",
    "name": "Alcohol – Phenol – Ether",
    "items": [
      [
        "Methanol (Ancol metylic)",
        "CO"
      ],
      [
        "Ethanol (Ancol etylic / Rượu nếp) C₂H₅OH",
        "CCO"
      ],
      [
        "Propan-1-ol (Ancol propylic)",
        "CCCO"
      ],
      [
        "Propan-2-ol (Isopropanol / Ancol isopropylic)",
        "CC(C)O"
      ],
      [
        "Butan-1-ol (Ancol butylic)",
        "CCCCO"
      ],
      [
        "Butan-2-ol (sec-Butanol)",
        "CCC(C)O"
      ],
      [
        "2-Methylpropan-2-ol (tert-Butanol)",
        "CC(C)(C)O"
      ],
      [
        "Ethane-1,2-diol (Ethylene glycol / Etylen glicol)",
        "OCCO",
        "Ancol hai chức kề nhau"
      ],
      [
        "Propane-1,2,3-triol (Glycerol / Glixerol)",
        "OCC(O)CO",
        "Ancol ba chức, hòa tan Cu(OH)₂"
      ],
      [
        "Prop-2-en-1-ol (Allyl alcohol / Ancol anlylic)",
        "C=CCO"
      ],
      [
        "Phenylmethanol (Benzyl alcohol / Ancol benzylic)",
        "OCc1ccccc1"
      ],
      [
        "Phenol C₆H₅OH",
        "Oc1ccccc1",
        "Tính axit yếu, tạo kết tủa trắng với nước brom"
      ],
      [
        "2-Methylphenol (o-Cresol / o-Crezol)",
        "Cc1ccccc1O"
      ],
      [
        "Methoxymethane (Dimethyl ether / Đimetyl ete)",
        "COC"
      ],
      [
        "Ethoxyethane (Diethyl ether / Đietyl ete)",
        "CCOCC"
      ],
      [
        "Methoxybenzene (Anisole / Anisol)",
        "COc1ccccc1"
      ]
    ]
  },
  {
    "id": "andehit",
    "name": "Aldehyde – Ketone",
    "items": [
      [
        "Methanal (Formaldehyde / Fomanđehit) HCHO",
        "C=O"
      ],
      [
        "Ethanal (Acetaldehyde / Axetanđehit) CH₃CHO",
        "CC=O"
      ],
      [
        "Propanal (Propionaldehyde)",
        "CCC=O"
      ],
      [
        "Butanal (Butyraldehyde)",
        "CCCC=O"
      ],
      [
        "Prop-2-enal (Acrolein / Propenal)",
        "C=CC=O"
      ],
      [
        "Benzaldehyde (Benzanđehit)",
        "O=Cc1ccccc1"
      ],
      [
        "Ethanedial (Glyoxal / Anđehit oxalic)",
        "O=CC=O"
      ],
      [
        "Propan-2-one (Acetone / Axeton)",
        "CC(C)=O"
      ],
      [
        "Butan-2-one (Methyl ethyl ketone / MEK)",
        "CCC(C)=O"
      ],
      [
        "Pentan-3-one (Diethyl ketone)",
        "CCC(=O)CC"
      ],
      [
        "Cyclohexanone (Xiclohexanon)",
        "O=C1CCCCC1"
      ],
      [
        "1-Phenylethan-1-one (Acetophenone / Axetophenon)",
        "CC(=O)c1ccccc1"
      ]
    ]
  },
  {
    "id": "axit",
    "name": "Carboxylic acid (Axit hữu cơ)",
    "items": [
      [
        "Methanoic acid (Formic acid / Axit fomic) HCOOH",
        "OC=O"
      ],
      [
        "Ethanoic acid (Acetic acid / Axit axetic) CH₃COOH",
        "CC(O)=O"
      ],
      [
        "Propanoic acid (Propionic acid / Axit propionic)",
        "CCC(O)=O"
      ],
      [
        "Butanoic acid (Butyric acid / Axit butiric)",
        "CCCC(O)=O"
      ],
      [
        "Propenoic acid (Acrylic acid / Axit acrylic)",
        "C=CC(O)=O"
      ],
      [
        "2-Methylpropenoic acid (Methacrylic acid / Axit metacrylic)",
        "CC(=C)C(O)=O"
      ],
      [
        "Ethanedioic acid (Oxalic acid / Axit oxalic)",
        "OC(=O)C(O)=O"
      ],
      [
        "Propanedioic acid (Malonic acid / Axit malonic)",
        "OC(=O)CC(O)=O"
      ],
      [
        "Hexanedioic acid (Adipic acid / Axit ađipic)",
        "OC(=O)CCCCC(O)=O",
        "Monome nilon-6,6"
      ],
      [
        "Benzoic acid (Axit benzoic)",
        "OC(=O)c1ccccc1"
      ],
      [
        "Terephthalic acid (Axit terephtalic)",
        "OC(=O)c1ccc(cc1)C(O)=O",
        "Monome tơ lapsan"
      ],
      [
        "2-Hydroxypropanoic acid (Lactic acid / Axit lactic)",
        "CC(O)C(O)=O"
      ],
      [
        "Citric acid (Axit xitric)",
        "OC(=O)CC(O)(CC(O)=O)C(O)=O"
      ],
      [
        "Palmitic acid (Axit panmitic) C₁₅H₃₁COOH",
        "CCCCCCCCCCCCCCCC(O)=O"
      ],
      [
        "Stearic acid (Axit stearic) C₁₇H₃₅COOH",
        "CCCCCCCCCCCCCCCCCC(O)=O"
      ],
      [
        "Oleic acid (Axit oleic) C₁₇H₃₃COOH (cis)",
        "CCCCCCCCC=CCCCCCCCC(O)=O"
      ],
      [
        "Linoleic acid (Axit linoleic)",
        "CCCCCC=CCC=CCCCCCCCC(O)=O"
      ],
      [
        "2-Hydroxybenzoic acid (Salicylic acid / Axit salixylic)",
        "OC(=O)c1ccccc1O"
      ]
    ]
  },
  {
    "id": "este",
    "name": "Ester – Lipid (Chất béo)",
    "items": [
      [
        "Methyl methanoate (Methyl formate / Metyl fomat)",
        "COC=O"
      ],
      [
        "Ethyl methanoate (Ethyl formate / Etyl fomat)",
        "CCOC=O"
      ],
      [
        "Methyl ethanoate (Methyl acetate / Metyl axetat)",
        "COC(C)=O"
      ],
      [
        "Ethyl ethanoate (Ethyl acetate / Etyl axetat)",
        "CCOC(C)=O"
      ],
      [
        "Propyl ethanoate (Propyl acetate / Propyl axetat)",
        "CCCOC(C)=O"
      ],
      [
        "3-Methylbutyl acetate (Isoamyl acetate / Dầu chuối)",
        "CC(C)CCOC(C)=O"
      ],
      [
        "Ethenyl acetate (Vinyl acetate / Vinyl axetat)",
        "CC(=O)OC=C"
      ],
      [
        "Methyl propenoate (Methyl acrylate / Metyl acrylat)",
        "COC(=O)C=C"
      ],
      [
        "Methyl 2-methylpropenoate (Methyl methacrylate / Metyl metacrylat)",
        "COC(=O)C(C)=C",
        "Monome thủy tinh hữu cơ"
      ],
      [
        "Phenyl acetate (Phenyl axetat)",
        "CC(=O)Oc1ccccc1"
      ],
      [
        "Benzyl acetate (Benzyl axetat)",
        "CC(=O)OCc1ccccc1"
      ],
      [
        "Acetylsalicylic acid (Aspirin)",
        "CC(=O)Oc1ccccc1C(O)=O"
      ],
      [
        "Tripalmitin (Glyceryl tripalmitate / Tripanmitin)",
        "CCCCCCCCCCCCCCCC(=O)OCC(OC(=O)CCCCCCCCCCCCCCC)OC(=O)CCCCCCCCCCCCCCC"
      ],
      [
        "Tristearin (Glyceryl tristearate / Tristearin)",
        "CCCCCCCCCCCCCCCCCC(=O)OCC(OC(=O)CCCCCCCCCCCCCCCCC)OC(=O)CCCCCCCCCCCCCCCCC"
      ]
    ]
  },
  {
    "id": "nito",
    "name": "Amine – Amino acid – Peptide",
    "items": [
      [
        "Methanamine (Methylamine / Metylamin)",
        "CN"
      ],
      [
        "Ethanamine (Ethylamine / Etylamin)",
        "CCN"
      ],
      [
        "N-Methylmethanamine (Dimethylamine / Đimetylamin)",
        "CNC"
      ],
      [
        "N,N-Dimethylmethanamine (Trimethylamine / Trimetylamin)",
        "CN(C)C"
      ],
      [
        "Benzenamine (Aniline / Anilin) C₆H₅NH₂",
        "Nc1ccccc1"
      ],
      [
        "Hexane-1,6-diamine (Hexamethylenediamine)",
        "NCCCCCCN"
      ],
      [
        "Ethane-1,2-diamine (Ethylenediamine)",
        "NCCN"
      ],
      [
        "Glycine (Glyxin / Gly)",
        "NCC(O)=O"
      ],
      [
        "Alanine (Alanin / Ala)",
        "CC(N)C(O)=O"
      ],
      [
        "Valine (Valin / Val)",
        "CC(C)C(N)C(O)=O"
      ],
      [
        "Lysine (Lysin / Lys)",
        "NCCCCC(N)C(O)=O"
      ],
      [
        "Glutamic acid (Axit glutamic / Glu)",
        "NC(CCC(O)=O)C(O)=O"
      ],
      [
        "Phenylalanine (Phe)",
        "NC(Cc1ccccc1)C(O)=O"
      ],
      [
        "Cysteine (Xistein / Cys)",
        "NC(CS)C(O)=O"
      ],
      [
        "Gly-Ala (Dipeptide)",
        "NCC(=O)NC(C)C(O)=O",
        "Liên kết peptit –CO–NH–"
      ],
      [
        "Gly-Gly-Gly (Tripeptide)",
        "NCC(=O)NCC(=O)NCC(O)=O"
      ],
      [
        "Urea (Ure) (NH₂)₂CO",
        "NC(N)=O"
      ],
      [
        "Acetamide (Axetamit)",
        "CC(N)=O"
      ],
      [
        "Nitrobenzene (Nitrobenzen)",
        "O=[N+]([O-])c1ccccc1"
      ],
      [
        "Pyridine (Piriđin)",
        "c1ccncc1"
      ],
      [
        "Acetonitrile (Axetonitrin)",
        "CC#N"
      ]
    ]
  },
  {
    "id": "cacbo",
    "name": "Carbohydrate (Cacbohiđrat)",
    "items": [
      [
        "Glucose (Glucozơ - mạch hở)",
        "OCC(O)C(O)C(O)C(O)C=O",
        "Aldehyde + 5 nhóm –OH"
      ],
      [
        "Glucose (Glucozơ - vòng pyranose)",
        "OCC1OC(O)C(O)C(O)C1O"
      ],
      [
        "Fructose (Fructozơ - mạch hở)",
        "OCC(O)C(O)C(O)C(=O)CO"
      ],
      [
        "Sucrose (Saccharose / Saccarozơ)",
        "OCC1OC(CO)(OC2OC(CO)C(O)C(O)C2O)C(O)C1O",
        "Glucose + Fructose"
      ],
      [
        "Maltose (Mantozơ)",
        "OCC1OC(OC2C(O)C(O)C(O)OC2CO)C(O)C(O)C1O"
      ],
      [
        "Gluconic acid (Axit gluconic)",
        "OCC(O)C(O)C(O)C(O)C(O)=O"
      ],
      [
        "Sorbitol (Sobitol)",
        "OCC(O)C(O)C(O)C(O)CO"
      ]
    ]
  },
  {
    "id": "polime",
    "name": "Polymer (Polime) & Monome",
    "items": [
      [
        "Polyethylene (PE / Polietilen) (4 mắt xích)",
        "CCCCCCCC"
      ],
      [
        "Poly(vinyl chloride) (PVC) (3 mắt xích)",
        "ClCCC(Cl)CC(Cl)C"
      ],
      [
        "Caprolactam (Monome nilon-6)",
        "O=C1CCCCCN1"
      ],
      [
        "6-Aminohexanoic acid (Axit ε-aminocaproic)",
        "NCCCCCC(O)=O"
      ],
      [
        "Poly(ethylene terephthalate) (PET / Tơ lapsan)",
        "O=C(OCCO)c1ccc(cc1)C(=O)OCCO"
      ],
      [
        "Polytetrafluoroethylene (PTFE / Teflon)",
        "FC(F)C(F)(F)C(F)(F)C(F)F"
      ],
      [
        "Acrylonitrile (Vinyl cyanide / Monome tơ nitron)",
        "C=CC#N"
      ],
      [
        "Chloroprene (Cloropren / Monome cao su cloropren)",
        "C=CC(Cl)=C"
      ]
    ]
  },
  {
    "id": "khac",
    "name": "Hóa sinh & dược phẩm",
    "items": [
      [
        "Caffeine (Cafein)",
        "Cn1cnc2c1c(=O)n(C)c(=O)n2C"
      ],
      [
        "Nicotine (Nicotin)",
        "CN1CCCC1c1cccnc1"
      ],
      [
        "Paracetamol (Acetaminophen)",
        "CC(=O)Nc1ccc(O)cc1"
      ],
      [
        "Vitamin C (Ascorbic acid / Axit ascorbic)",
        "OCC(O)C1OC(=O)C(O)=C1O"
      ],
      [
        "Aspirin (Acetylsalicylic acid)",
        "CC(=O)Oc1ccccc1C(O)=O"
      ],
      [
        "Menthol",
        "CC(C)C1CCC(C)CC1O"
      ],
      [
        "Urea (Ure)",
        "NC(N)=O"
      ],
      [
        "Capsaicin (Chất cay ớt)",
        "COc1cc(CNC(=O)CCCCC=CC(C)C)ccc1O"
      ]
    ]
  }
];
