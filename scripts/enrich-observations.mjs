import fs from 'fs';

const extraObservations = {
  'calcium-water': "r('calcium-water','Ca|H2O','Ca(OH)2|H2','Nước lỏng, nhiệt độ thường.',{phases:['s','g'],type:'Thế',observation:'Calcium tan sủi bọt khí không màu (H₂), dung dịch vẩn đục trắng do Ca(OH)₂ ít tan sinh ra.'})",
  'magnesium-hydroxide': "r('magnesium-hydroxide','MgCl2|NaOH','Mg(OH)2|NaCl','Trộn hai dung dịch.',{phases:['ppt','aq'],type:'Kết tủa',observation:'Xuất hiện kết tủa trắng dạng keo xốp của magnesium hydroxide (Mg(OH)₂).'})",
  'aluminium-hydroxide': "r('aluminium-hydroxide','AlCl3|NaOH','Al(OH)3|NaCl','NaOH vừa đủ, không dùng kiềm dư vì kết tủa có thể tan tiếp.',{phases:['ppt','aq'],type:'Kết tủa',observation:'Xuất hiện kết tủa keo trắng (Al(OH)₃); kết tủa sẽ tan nếu tiếp tục cho kiềm NaOH dư.'})",
  'zinc-hydroxide': "r('zinc-hydroxide','ZnCl2|NaOH','Zn(OH)2|NaCl','NaOH vừa đủ, không dùng kiềm dư.',{phases:['ppt','aq'],type:'Kết tủa',observation:'Xuất hiện kết tủa màu trắng (Zn(OH)₂); kết tủa lưỡng tính tan được trong kiềm dư.'})",
  'zinc-copper': "r('zinc-copper','Zn|CuSO4','ZnSO4|Cu','Cho zinc vào dung dịch copper(II) sulfate.',{phases:['aq','s'],type:'Thế',observation:'Kẽm tan dần, có lớp kim loại màu đỏ (Cu) bám ngoài miếng kẽm, màu xanh của dung dịch CuSO₄ nhạt dần.'})",
  'copper-silver': "r('copper-silver','Cu|AgNO3','Cu(NO3)2|Ag','Cho copper vào dung dịch silver nitrate.',{phases:['aq','s'],type:'Thế',observation:'Đồng tan dần, các tinh thể bạc sáng ánh kim (Ag) bám ngoài thanh đồng, dung dịch chuyển sang màu xanh lam.'})",
  'limewater': "r('limewater','CO2|Ca(OH)2','CaCO3|H2O','Sục CO₂ từ từ vào nước vôi trong; Ca(OH)₂ dư, không dùng CO₂ dư.',{phases:['ppt','l'],type:'Kết tủa',observation:'Dung dịch nước vôi trong bị vẩn đục do tạo kết tủa trắng calcium carbonate (CaCO₃).'})",
  'carbonate-dissolve': "r('carbonate-dissolve','CaCO3|CO2|H2O','Ca(HCO3)2','Có CO₂ hoà tan dư trong nước; tạo hydrogencarbonate trong dung dịch.',{phases:['aq'],type:'Hoà tan / tạo muối acid',observation:'Kết tủa CaCO₃ vẩn đục tan dần khi có dòng khí CO₂ dư sục liên tục vào nước, dung dịch trở nên trong suốt.'})",
  'cobalt-hydroxide': "r('cobalt-hydroxide','CoCl2|NaOH','Co(OH)2|NaCl','Dung dịch trong nước, không thêm chất oxi hoá.',{phases:['ppt','aq'],type:'Kết tủa',observation:'Xuất hiện kết tủa màu hồng tím hoặc xanh lam của Co(OH)₂, chuyển dần nâu khi bị oxi hóa.'})",
};

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  for (const [id, fullCall] of Object.entries(extraObservations)) {
    const regex = new RegExp(`r\\('${id}'[^\\n]+\\),?`, 'g');
    content = content.replace(regex, fullCall + ',');
  }
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${filePath}`);
}

updateFile('public/sites/merge/js/reaction-data.js');
updateFile('docs/research/merge/unpacked/reaction-data.js');

