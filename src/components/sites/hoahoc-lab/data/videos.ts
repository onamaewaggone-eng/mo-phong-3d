export interface LabVideo {
  id: string;
  expId?: string;
  title: string;
  grade: number;
  category: string;
  categoryName: string;
  youtubeId: string;
  duration: string;
  channel: string;
  eq: string;
  observe: string;
  highlights: string[];
  searchFallback: string;
}

export const VIDEOS_23: LabVideo[] = [
  {
    "id": "vid-toluene-kmno4",
    "expId": "toluene-kmno4",
    "title": "Oxi hóa Toluen bằng KMnO₄ (khi đun nóng)",
    "grade": 11,
    "category": "arene",
    "categoryName": "Arene & Dẫn xuất thơm",
    "youtubeId": "Z42m-1_kFpA",
    "duration": "02:45",
    "channel": "Thí nghiệm Hóa học SGK",
    "eq": "C₆H₅CH₃ + 2KMnO₄ → C₆H₅COOK + 2MnO₂↓ + KOH + H₂O",
    "observe": "Ở nhiệt độ thường KMnO₄ không mất màu (phân lớp). Khi đun nóng cách thủy, màu tím mất dần và tạo kết tủa MnO₂ nâu đen lắng xuống.",
    "highlights": [
      "Nhận biết nhánh ankyl của aren",
      "Cần đun nóng mới phản ứng",
      "MnO₂ kết tủa nâu đen"
    ],
    "searchFallback": "thí nghiệm toluen tác dụng KMnO4 đun nóng"
  },
  {
    "id": "vid-benzene-bromine",
    "expId": "benzene-bromine-ext",
    "title": "Benzen với nước brom: Hiện tượng chiết brom (không phản ứng thế)",
    "grade": 11,
    "category": "arene",
    "categoryName": "Arene & Dẫn xuất thơm",
    "youtubeId": "i_yZqXwB6yE",
    "duration": "02:10",
    "channel": "Hóa học THPT",
    "eq": "Không có PTHH (hiện tượng vật lý chiết phân lớp)",
    "observe": "Benzen không làm mất màu nước brom ở điều kiện thường. Lắc đều rồi để yên, benzen hòa tan brom tạo lớp chất lỏng màu da cam đậm nổi lên trên lớp nước.",
    "highlights": [
      "Benzen bền vững, không phản ứng với nước brom",
      "Chiết lỏng - lỏng",
      "Lớp trên da cam đậm do brom tan tốt trong benzen"
    ],
    "searchFallback": "thí nghiệm benzen và nước brom chiết"
  },
  {
    "id": "vid-styrene-bromine",
    "expId": "styrene-bromine",
    "title": "Stiren tác dụng với dung dịch brom (mất màu ngay ở t° thường)",
    "grade": 11,
    "category": "arene",
    "categoryName": "Arene & Dẫn xuất thơm",
    "youtubeId": "v8P2p_i_1x4",
    "duration": "01:50",
    "channel": "Hóa học Phổ thông",
    "eq": "C₆H₅CH=CH₂ + Br₂ → C₆H₅CHBr-CH₂Br",
    "observe": "Nhỏ nước brom vào stiren và lắc nhẹ, màu da cam của dung dịch brom bị mất màu nhanh chóng ở nhiệt độ thường (cộng vào liên kết đôi ngoài nhánh).",
    "highlights": [
      "Liên kết đôi C=C ngoài nhánh phản ứng nhanh",
      "Phân biệt stiren với benzen và toluen",
      "Mất màu ngay t° thường"
    ],
    "searchFallback": "thí nghiệm stiren tác dụng nước brom"
  },
  {
    "id": "vid-phenol-bromine",
    "expId": "phenol-br2",
    "title": "Phenol tác dụng với nước brom (kết tủa trắng 2,4,6-tribromophenol)",
    "grade": 11,
    "category": "arene",
    "categoryName": "Arene & Dẫn xuất thơm",
    "youtubeId": "L8EwqQpYq8Q",
    "duration": "02:15",
    "channel": "Royal Society of Chemistry / SGK",
    "eq": "C₆H₅OH + 3Br₂ → C₆H₂Br₃OH↓ + 3HBr",
    "observe": "Nhỏ nước brom vào dung dịch phenol trong suốt, màu da cam biến mất và lập tức xuất hiện kết tủa trắng đục 2,4,6-tribromophenol.",
    "highlights": [
      "Nhóm -OH hoạt hóa vòng thơm cực mạnh",
      "Thế 3 vị trí ortho và para đồng thời",
      "Thuốc thử đặc trưng nhận biết phenol"
    ],
    "searchFallback": "thí nghiệm phenol tác dụng nước brom kết tủa trắng"
  },
  {
    "id": "vid-phenol-naoh",
    "expId": "phenol-naoh",
    "title": "Phenol tác dụng với dung dịch kiềm NaOH (tính axit của phenol)",
    "grade": 11,
    "category": "arene",
    "categoryName": "Arene & Dẫn xuất thơm",
    "youtubeId": "d6R9Wq5l8zM",
    "duration": "02:05",
    "channel": "Thí nghiệm Hóa học",
    "eq": "C₆H₅OH + NaOH → C₆H₅ONa + H₂O",
    "observe": "Nhũ tương phenol vẩn đục trong nước khi nhỏ dung dịch NaOH vào thì tan hoàn toàn, tạo dung dịch trong suốt đồng nhất của muối natri phenolat.",
    "highlights": [
      "Tính axit yếu của phenol (axit cacbolic)",
      "Tạo muối natri phenolat tan tốt",
      "Sục CO₂ vào lại vẩn đục trở lại"
    ],
    "searchFallback": "thí nghiệm phenol tác dụng NaOH"
  },
  {
    "id": "vid-phenol-fecl3",
    "expId": "phenol-fecl3",
    "title": "Nhận biết Phenol bằng dung dịch FeCl₃ (phức màu tím)",
    "grade": 11,
    "category": "arene",
    "categoryName": "Arene & Dẫn xuất thơm",
    "youtubeId": "W3_rP8W5e60",
    "duration": "01:40",
    "channel": "Thí nghiệm Định tính Hóa học",
    "eq": "FeCl₃ + 6C₆H₅OH → [Fe(OC₆H₅)₆]³⁻ (phức tím) + 3H⁺ + 3Cl⁻",
    "observe": "Nhỏ dung dịch FeCl₃ màu vàng nâu vào dung dịch phenol loãng, dung dịch lập tức chuyển sang màu tím thẫm đặc trưng của phức phenolat sắt(III).",
    "highlights": [
      "Phản ứng màu đặc trưng nhận biết nhóm OH phenol",
      "Tạo phức chelate tím sẫm",
      "Khác biệt hoàn toàn với ancol thông thường"
    ],
    "searchFallback": "thí nghiệm phenol tác dụng FeCl3 phức tím"
  },
  {
    "id": "vid-aniline-bromine",
    "expId": "aniline-br2",
    "title": "Anilin tác dụng với nước brom (kết tủa trắng 2,4,6-tribromanilin)",
    "grade": 12,
    "category": "arene",
    "categoryName": "Arene & Dẫn xuất thơm",
    "youtubeId": "X4o_tP3wE7c",
    "duration": "02:30",
    "channel": "Hóa học THPT Quốc gia",
    "eq": "C₆H₅NH₂ + 3Br₂ → C₆H₂Br₃NH₂↓ + 3HBr",
    "observe": "Nhỏ nước brom vào nhũ tương anilin trong nước, màu brom mất đi và kết tủa trắng 2,4,6-tribromanilin lắng xuống.",
    "highlights": [
      "Nhóm -NH₂ đẩy electron làm giàu mật độ electron ở vòng",
      "Thế 3 nguyên tử Br không cần xúc tác",
      "Dùng nhận biết anilin"
    ],
    "searchFallback": "thí nghiệm anilin tác dụng nước brom kết tủa trắng"
  },
  {
    "id": "vid-aniline-hcl",
    "expId": "aniline-hcl",
    "title": "Anilin tác dụng với axit clohiđric HCl (tính bazơ của amin)",
    "grade": 12,
    "category": "arene",
    "categoryName": "Arene & Dẫn xuất thơm",
    "youtubeId": "B7o9E0s1v8k",
    "duration": "02:00",
    "channel": "Thí nghiệm Amin Hóa 12",
    "eq": "C₆H₅NH₂ + HCl → C₆H₅NH₃Cl",
    "observe": "Anilin ít tan trong nước lắng xuống đáy tạo vẩn đục; khi nhỏ HCl vào lắc đều thì tan hoàn toàn tạo dung dịch muối phenylamoni clorua trong suốt.",
    "highlights": [
      "Tính bazơ yếu của amin thơm",
      "Tạo muối amoni tan tốt trong nước",
      "Nhỏ kiềm NaOH vào lại xuất hiện anilin vẩn đục"
    ],
    "searchFallback": "thí nghiệm anilin tác dụng axit HCl"
  },
  {
    "id": "vid-ethanol-na",
    "expId": "ethanol-na",
    "title": "Etanol tác dụng với Natri (sinh khí H₂)",
    "grade": 11,
    "category": "huuco",
    "categoryName": "Hóa Hữu cơ kinh điển",
    "youtubeId": "N9yKj6eE6YQ",
    "duration": "02:10",
    "channel": "Periodic Videos / SGK",
    "eq": "2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑",
    "observe": "Mẩu Na chìm dưới đáy ống nghiệm chứa etanol khan, sủi nhiều bọt khí H₂ không màu đều đặn và chậm hơn nhiều so với phản ứng giữa Na và nước.",
    "highlights": [
      "Hiđro linh động trong nhóm -OH ancol",
      "Phản ứng êm dịu, không bốc cháy như với nước",
      "Tạo natri etylat"
    ],
    "searchFallback": "thí nghiệm etanol tác dụng natri sinh khí hidro"
  },
  {
    "id": "vid-ethanol-cuo",
    "expId": "ethanol-cuo",
    "title": "Oxi hóa Etanol bằng CuO nung nóng (điều chế anđehit axetic)",
    "grade": 11,
    "category": "huuco",
    "categoryName": "Hóa Hữu cơ kinh điển",
    "youtubeId": "m4m9Vw1o7vI",
    "duration": "02:20",
    "channel": "Thí nghiệm Ancol",
    "eq": "C₂H₅OH + CuO (đen, t°) → CH₃CHO + Cu (đỏ) + H₂O",
    "observe": "Dây đồng nung đỏ đen (CuO) khi nhúng vào ống nghiệm chứa cồn etanol lập tức chuyển lại thành màu đỏ sáng của đồng kim loại, ngửi thấy mùi sốc của anđehit.",
    "highlights": [
      "Oxi hóa không hoàn toàn ancol bậc 1",
      "Màu đen CuO hóa đỏ Cu kim loại",
      "Tạo anđehit axetic mùi đặc trưng"
    ],
    "searchFallback": "thí nghiệm oxi hóa etanol bằng CuO nóng"
  },
  {
    "id": "vid-tollens-silver",
    "expId": "tollens",
    "title": "Phản ứng tráng bạc của anđehit / glucozơ (Tollens test)",
    "grade": 11,
    "category": "huuco",
    "categoryName": "Hóa Hữu cơ kinh điển",
    "youtubeId": "n_2kH3D2f4o",
    "duration": "03:15",
    "channel": "NileRed / SGK Hóa",
    "eq": "CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag↓ + 3NH₃ + H₂O",
    "observe": "Đun nóng nhẹ hỗn hợp anđehit/glucozơ và thuốc thử Tollens, lớp bạc kim loại sáng lấp lánh như gương bám đều lên thành trong của ống nghiệm.",
    "highlights": [
      "Tạo gương bạc kim loại sáng bóng",
      "Tính khử của nhóm -CHO",
      "Ứng dụng tráng ruột phích, tráng gương"
    ],
    "searchFallback": "thí nghiệm phản ứng tráng bạc tráng gương tollens"
  },
  {
    "id": "vid-glucose-cuoh2",
    "expId": "glucose-cuoh2",
    "title": "Glucozơ tác dụng với Cu(OH)₂ (tạo phức xanh lam rồi đun tạo kết tủa Cu₂O đỏ gạch)",
    "grade": 12,
    "category": "huuco",
    "categoryName": "Hóa Hữu cơ kinh điển",
    "youtubeId": "h8sP1M5wN3Q",
    "duration": "02:50",
    "channel": "Thí nghiệm Hóa học THPT",
    "eq": "C₅H₁₁O₅-CHO + 2Cu(OH)₂ + NaOH (t°) → C₅H₁₁O₅-COONa + Cu₂O↓ (đỏ gạch) + 3H₂O",
    "observe": "Ở nhiệt độ thường: Cu(OH)₂ tan tạo dung dịch xanh lam thẫm (tính chất ancol đa chức). Khi đun nóng: xuất hiện kết tủa màu đỏ gạch của Cu₂O.",
    "highlights": [
      "Chứng minh glucozơ có nhiều nhóm -OH kề nhau",
      "Chứng minh glucozơ có nhóm chức anđehit -CHO",
      "Kết tủa đỏ gạch Cu₂O đặc trưng"
    ],
    "searchFallback": "thí nghiệm glucozo tác dụng Cu(OH)2 đun nóng đỏ gạch"
  },
  {
    "id": "vid-starch-iodine",
    "expId": "starch-iodine",
    "title": "Hồ tinh bột tác dụng với dung dịch iot (xanh tím thuận nghịch theo nhiệt độ)",
    "grade": 12,
    "category": "huuco",
    "categoryName": "Hóa Hữu cơ kinh điển",
    "youtubeId": "5zP7M377g-w",
    "duration": "01:55",
    "channel": "Science Experiments / SGK",
    "eq": "Tinh bột + I₂ ⇌ Hợp chất màu xanh tím",
    "observe": "Nhỏ dung dịch iot vào hồ tinh bột hóa xanh tím ngay lập tức. Đun nóng: dung dịch mất màu. Để nguội: màu xanh tím xuất hiện trở lại.",
    "highlights": [
      "Hấp phụ phân tử I₂ vào lòng ống xoắn amilozơ",
      "Biến đổi màu sắc thuận nghịch theo nhiệt độ",
      "Nhận biết tinh bột và iot"
    ],
    "searchFallback": "thí nghiệm hồ tinh bột tác dụng iot xanh tím đun nóng"
  },
  {
    "id": "vid-biuret-egg",
    "expId": "biuret",
    "title": "Phản ứng màu biure của protein (Lòng trắng trứng + CuSO₄/NaOH)",
    "grade": 12,
    "category": "huuco",
    "categoryName": "Hóa Hữu cơ kinh điển",
    "youtubeId": "4sH_eD8o0F4",
    "duration": "02:10",
    "channel": "Biology & Chemistry Lab",
    "eq": "Protein + Cu(OH)₂/NaOH → Phức chất màu tím đặc trưng",
    "observe": "Cho dung dịch NaOH vào lòng trắng trứng, nhỏ vài giọt CuSO₄, dung dịch xuất hiện màu tím hoặc tím hoa cà đặc trưng của phức đồng - peptit.",
    "highlights": [
      "Đặc trưng cho hợp chất có từ 2 liên kết peptit trở lên",
      "Đipeptit không có phản ứng này",
      "Màu tím hoa cà rất rõ nét"
    ],
    "searchFallback": "thí nghiệm phản ứng màu biure protein lòng trắng trứng"
  },
  {
    "id": "vid-esterification",
    "expId": "esterification",
    "title": "Điều chế Etyl Axetat (Phản ứng este hóa giữa CH₃COOH và C₂H₅OH)",
    "grade": 11,
    "category": "huuco",
    "categoryName": "Hóa Hữu cơ kinh điển",
    "youtubeId": "B3P1M9tK7wE",
    "duration": "03:40",
    "channel": "Thí nghiệm Hóa học SGK",
    "eq": "CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O (H₂SO₄ đặc, t°)",
    "observe": "Đun cách thủy hỗn hợp, dẫn hơi este ngưng tụ vào ống nghiệm chứa dung dịch NaCl bão hòa. Lớp este etyl axetat không màu, nhẹ hơn nước, có mùi thơm hoa quả nổi lên trên.",
    "highlights": [
      "Phản ứng thuận nghịch có H₂SO₄ đặc xúc tác và hút nước",
      "Este nhẹ hơn nước, ít tan trong nước",
      "Mùi thơm đặc trưng của este"
    ],
    "searchFallback": "thí nghiệm điều chế etyl axetat este hóa"
  },
  {
    "id": "vid-saponification",
    "expId": "saponification",
    "title": "Xà phòng hóa chất béo (Dầu ăn + dung dịch NaOH đun nóng)",
    "grade": 12,
    "category": "huuco",
    "categoryName": "Hóa Hữu cơ kinh điển",
    "youtubeId": "F1k8L3yP9vU",
    "duration": "04:15",
    "channel": "Khoa học Thực nghiệm",
    "eq": "(RCOO)₃C₃H₅ + 3NaOH → 3RCOONa (xà phòng) + C₃H₅(OH)₃",
    "observe": "Đun sôi hỗn hợp dầu ăn và dung dịch kiềm, khuấy đều. Rót thêm dung dịch NaCl bão hòa vào thì xà phòng nổi lên thành một khối màu trắng ngà.",
    "highlights": [
      "Thủy phân chất béo trong môi trường kiềm",
      "Tách xà phòng bằng dung dịch NaCl bão hòa",
      "Sản phẩm phụ là glixerol"
    ],
    "searchFallback": "thí nghiệm xà phòng hóa chất béo dầu ăn"
  },
  {
    "id": "vid-sugar-dehydration",
    "title": "Đường saccarozơ tác dụng với H₂SO₄ đặc (Hiện tượng than hóa dâng trào cột than)",
    "grade": 10,
    "category": "huuco",
    "categoryName": "Hóa Hữu cơ kinh điển",
    "youtubeId": "xK4z_YMTGzk",
    "duration": "02:30",
    "channel": "Periodic Videos / NileRed",
    "eq": "C₁₂H₂₂O₁₁ → 12C + 11H₂O ; C + 2H₂SO₄ → CO₂↑ + 2SO₂↑ + 2H₂O",
    "observe": "Đường cát trắng tiếp xúc với H₂SO₄ đặc chuyển sang vàng rồi đen kịt, tỏa lượng nhiệt cực lớn, hỗn hợp khí đẩy cột than xốp xốc ngược dâng cao khỏi miệng cốc kèm khói mù mịt.",
    "highlights": [
      "Tính háo nước mãnh liệt của H₂SO₄ đặc",
      "Phản ứng oxi hóa cacbon sinh khí CO₂ và SO₂",
      "Hiện tượng thị giác cực kỳ ấn tượng"
    ],
    "searchFallback": "thí nghiệm đường saccarozo tác dụng H2SO4 đặc than hóa"
  },
  {
    "id": "vid-fe-cl2",
    "expId": "fe-cl2",
    "title": "Sắt cháy trong khí clo (Tạo khói nâu đỏ FeCl₃)",
    "grade": 10,
    "category": "voco",
    "categoryName": "Vô cơ & Phản ứng cháy",
    "youtubeId": "aK85PZX2xNE",
    "duration": "01:45",
    "channel": "Periodic Videos",
    "eq": "2Fe + 3Cl₂ (t°) → 2FeCl₃",
    "observe": "Đưa dây sắt nung nóng đỏ vào bình chứa khí clo màu vàng lục: sắt bốc cháy sáng chói, bắn tia lửa và sinh ra khói đặc màu nâu đỏ của sắt(III) clorua.",
    "highlights": [
      "Tính oxi hóa rất mạnh của khí clo",
      "Đưa Fe lên mức oxi hóa cao nhất +3",
      "Khói nâu đỏ FeCl₃ hòa tan ra dung dịch vàng nâu"
    ],
    "searchFallback": "thí nghiệm sắt cháy trong khí clo"
  },
  {
    "id": "vid-sodium-water",
    "title": "Kim loại Natri tác dụng mãnh liệt với nước (Phenolphtalein hóa hồng)",
    "grade": 10,
    "category": "voco",
    "categoryName": "Vô cơ & Phản ứng cháy",
    "youtubeId": "dmcCa8LKFX4",
    "duration": "02:05",
    "channel": "Periodic Videos",
    "eq": "2Na + 2H₂O → 2NaOH + H₂↑",
    "observe": "Mẩu natri vo tròn thành viên bi bạc chạy lướt nhanh trên mặt nước, sủi bọt khí H₂ mãnh liệt, tỏa nhiệt làm nóng chảy Na và có thể bốc cháy ngọn lửa màu vàng. Dung dịch hóa hồng.",
    "highlights": [
      "Kim loại kiềm có tính khử cực mạnh",
      "Nhiệt độ nóng chảy thấp",
      "Dung dịch bazơ kiềm làm phenolphtalein hóa hồng"
    ],
    "searchFallback": "thí nghiệm natri tác dụng với nước"
  },
  {
    "id": "vid-cu-hno3-dac",
    "expId": "cu-hno3-dac",
    "title": "Đồng tác dụng với axit nitric HNO₃ đặc (Sinh khí NO₂ màu nâu đỏ)",
    "grade": 11,
    "category": "voco",
    "categoryName": "Vô cơ & Phản ứng cháy",
    "youtubeId": "dhy_bT-F7E8",
    "duration": "02:15",
    "channel": "Chemical Experiments THPT",
    "eq": "Cu + 4HNO₃ (đặc) → Cu(NO₃)₂ + 2NO₂↑ (nâu đỏ) + 2H₂O",
    "observe": "Lá đồng tan nhanh, dung dịch chuyển từ không màu sang xanh lục rồi xanh lam thẫm, khí NO₂ màu nâu đỏ đậm thoát ra cuồn cuộn.",
    "highlights": [
      "Axit có tính oxi hóa mạnh do ion NO₃⁻ trong môi trường H⁺",
      "Khí NO₂ độc màu nâu đỏ",
      "Đồng bị oxi hóa lên Cu²⁺"
    ],
    "searchFallback": "thí nghiệm đồng tác dụng axit nitric HNO3 đặc"
  },
  {
    "id": "vid-na2s2o3-h2so4",
    "expId": "na2s2o3-h2so4",
    "title": "Ảnh hưởng của nồng độ đến tốc độ phản ứng (Na₂S₂O₃ + H₂SO₄ loãng)",
    "grade": 10,
    "category": "voco",
    "categoryName": "Vô cơ & Phản ứng cháy",
    "youtubeId": "BleaPU74u-M",
    "duration": "02:30",
    "channel": "Chemistry Kinetics Lab",
    "eq": "Na₂S₂O₃ + H₂SO₄ → Na₂SO₄ + S↓ (vàng đục) + SO₂↑ + H₂O",
    "observe": "Sau khi trộn hai dung dịch, lưu huỳnh sinh ra dạng hạt keo làm dung dịch chuyển từ trong suốt sang mờ đục dần cho đến khi che khuất hoàn toàn dấu chữ thập (+) bên dưới đáy cốc.",
    "highlights": [
      "Bài thực hành tốc độ phản ứng kinh điển SGK Lớp 10",
      "Nồng độ càng cao thời gian xuất hiện kết tủa càng ngắn",
      "Đo đạc định lượng tốc độ"
    ],
    "searchFallback": "thí nghiệm ảnh hưởng nồng độ tốc độ phản ứng Na2S2O3 H2SO4"
  },
  {
    "id": "vid-flame-tests",
    "title": "Thử màu ngọn lửa của các ion kim loại kiềm & kiềm thổ (Na, K, Ca, Ba, Cu)",
    "grade": 12,
    "category": "nhanbiet",
    "categoryName": "Nhận biết & Thuốc thử",
    "youtubeId": "1EXr_L73tx8",
    "duration": "03:10",
    "channel": "Chemistry Flame Spectrum",
    "eq": "Mⁿ⁺ + E(nhiệt) → M* → Mⁿ⁺ + hν (ánh sáng màu đặc trưng)",
    "observe": "Dây platin nhúng muối đưa vào ngọn lửa không màu: Natri cho ngọn lửa vàng tươi, Kali ngọn lửa tím hồng, Canxi đỏ gạch, Bari lục vàng, Đồng lục xanh lộng lẫy.",
    "highlights": [
      "Hiện tượng phát xạ quang phổ đặc trưng",
      "Ứng dụng trong pháo hoa",
      "Nhận biết nhanh các kim loại kiềm và kiềm thổ"
    ],
    "searchFallback": "thí nghiệm thử màu ngọn lửa kim loại kiềm kiềm thổ"
  },
  {
    "id": "vid-electrolysis-cucl2",
    "expId": "elec-cucl2",
    "title": "Điện phân dung dịch CuCl₂ (Điện cực than chì)",
    "grade": 12,
    "category": "voco",
    "categoryName": "Vô cơ & Phản ứng cháy",
    "youtubeId": "qN4b_M21x_Q",
    "duration": "02:40",
    "channel": "Electrochemistry SGK",
    "eq": "CuCl₂ → Cu↓ (catot) + Cl₂↑ (anot)",
    "observe": "Tại catot (−) có lớp kim loại đồng màu đỏ bám vào điện cực; tại anot (+) sủi bọt khí clo màu vàng lục có mùi hắc tẩy màu.",
    "highlights": [
      "Bản chất quá trình điện phân dung dịch",
      "Catot xảy ra quá trình khử Cu²⁺ + 2e → Cu",
      "Anot xảy ra quá trình oxi hóa 2Cl⁻ → Cl₂ + 2e"
    ],
    "searchFallback": "thí nghiệm điện phân dung dịch CuCl2"
  }
];
