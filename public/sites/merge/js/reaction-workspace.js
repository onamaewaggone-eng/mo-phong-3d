import {parseFormula,normalizeFormula,resolveReaction,balanceEquation} from './reaction-engine.js';
import {REACTIONS,NO_REACTIONS} from './reaction-data.js';
import {substanceProperties} from './reaction-properties.js';
import {editableFormula,changeFormulaIndex,addFormulaElement,compoundFormula} from './reaction-formula.js';
import {moleculePeek} from './molecule-peek.js';
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const formula=value=>esc(value).replace(/(\d+)/g,'<sub>$1</sub>');
const textOf=atoms=>Object.entries(atoms).map(([s,n])=>s+(n===1?'':n)).join('');
const sameAtoms=(a,b)=>Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(s=>a[s]===b[s]);
const arrow='<svg viewBox="0 0 48 24" fill="none" aria-hidden="true"><path d="M4 12h36M30 3l10 9-10 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const emptySlot=()=>({atoms:{},id:null,formula:''});
const caret='<svg viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="m2 6 4-4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export function reactionWorkspace(catalog, container = null){
 const compounds=new Map(catalog.compounds.map(c=>[c.id,c])),symbols=new Set(catalog.elements.map(e=>e.symbol));
 const root=document.createElement('section');root.id='reaction-screen';root.className='reaction-screen';root.hidden=true;root.setAttribute('aria-label','Phòng phản ứng hoá học');
 root.innerHTML=`
<header class="rx-head"><div><span class="rx-eyebrow"><i></i> HỒ SƠ HOÁ HỌC 4.0 <span>/</span> REACTION LAB</span><h1>Phòng phản ứng<span>.</span></h1><p>Từ những chất quen thuộc, khám phá một phương trình mới.</p></div><div class="rx-head-end"><span class="rx-live"><i></i> ${catalog.compounds.length} chất · ${REACTIONS.length} lộ trình</span><button id="rx-exit" class="rx-quiet">← Về khám phá</button></div></header>
<div class="rx-layout"><aside class="rx-library">
 <div class="rx-section-title"><h2><em>01</em> Bảng nguyên tố</h2><span>118 NGUYÊN TỐ</span></div>
 <p class="rx-library-hint">Kéo nguyên tố vào khay, hoặc bấm để thêm vào chất đang chọn.</p>
 <div class="rx-periodic-wrap"><div id="rx-periodic" class="rx-periodic"></div><div class="rx-table-key"><span><i class="rx-key-metal"></i>Kim loại</span><span><i class="rx-key-nonmetal"></i>Phi kim</span><span><i class="rx-key-noble"></i>Khí hiếm</span></div></div>
 <div id="rx-element-preview" class="rx-element-preview" aria-live="polite"><span>↗</span><div><b>Chọn một nguyên tố</b><small>Kéo vào khay để bắt đầu</small></div></div>
 <ol class="rx-build-guide"><li><b>1</b><span>Kéo nguyên tố</span></li><li><b>2</b><span>Chỉnh chỉ số <i>⌃ ⌄</i></span></li><li><b>3</b><span>Bấm mũi tên →</span></li></ol>
</aside><div class="rx-work">
<section class="rx-compose"><div class="rx-section-title"><h2><em>02</em> Chất tham gia</h2><button id="rx-clear" class="rx-text" type="button" title="Xoá các chất và bắt đầu lại"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7v5h-5"/><path d="M19.1 7A8 8 0 1 0 20 15"/></svg><span>Làm mới</span></button></div>
 <div class="rx-quick-entry"><label for="rx-equation-input">Nhập nhanh cả tổ hợp</label><div><input id="rx-equation-input" autocomplete="off" spellcheck="false" placeholder="Ví dụ: Zn + HCl"><button id="rx-use-equation">Nạp chất <span>↵</span></button></div></div>
 <div id="rx-slots" class="rx-slots"></div><div id="rx-composer"></div><p id="rx-feedback" role="status" class="rx-feedback">Chọn chất hoặc nhập công thức, rồi bấm mũi tên để xem phương trình.</p>
 <div class="rx-examples"><span>THỬ NHANH</span><button data-example="Zn|HCl">Kim loại + acid</button><button data-example="AgNO3|NaCl">Kết tủa</button><button data-example="Cu|HCl">Cu + HCl</button><button data-example="H2O2">Phân huỷ</button></div>
</section>
<section class="rx-result-shell"><div class="rx-result-toolbar"><div class="rx-section-title"><h2><em>03</em> Phương trình</h2></div><div class="rx-actions"><button id="rx-balance" disabled>Cân bằng & điều kiện</button></div></div>
 <ol class="rx-progress" aria-label="Tiến trình lập phương trình"><li data-step="choose" class="is-current"><b>1</b> Chọn chất</li><li data-step="predict"><b>2</b> Xem sơ đồ</li><li data-step="balance"><b>3</b> Hoàn chỉnh</li></ol><div id="rx-result" class="rx-result" aria-live="polite"></div></section>
<div class="rx-scope"><span>HỒ SƠ HOÁ HỌC 4.0</span><span>Sản phẩm dựa trên ${REACTIONS.length} lộ trình đã biên soạn.</span></div></div></div>
<button id="rx-properties" class="rx-properties-edge" disabled aria-controls="rx-property-panel" aria-expanded="false" title="Cân bằng phương trình để mở hồ sơ tính chất"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h6l2 2h8v13H4V5Z" stroke="currentColor" stroke-width="1.5"/><path d="M8 12h8m-8 4h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><span>Hồ sơ tính chất</span><i>‹</i></button>
<div id="rx-property-backdrop" class="rx-property-backdrop" hidden></div><section id="rx-property-panel" class="rx-property-panel" role="dialog" aria-modal="true" aria-label="Hồ sơ tính chất các chất" tabindex="-1" hidden></section>`;
 if(container){container.innerHTML="";container.append(root);root.hidden=false;root.style.top="0px";}else{document.body.append(root);}
 const $=id=>root.querySelector('#'+id);
 let slots=[emptySlot(),emptySlot()],active=0,result=null,reaction=null,balanced=null,showProperties=false,returnFocus=null,undoInputs=null,atomEditorOpen=false,pending=null,propertyFilter='all';
 const notice=message=>{$('rx-feedback').textContent=message;};
 const focusInput=()=>{$('rx-formula-input')?.focus({preventScroll:true});};
 function invalidate(){root.dispatchEvent(new Event('chemistry-molecule-close'));result=null;reaction=null;balanced=null;showProperties=false;undoInputs=null;propertyFilter='all';renderResult();}
 function discardPending(){pending=null;$('rx-equation-input').value='';}
 function syncPredict(){
  const draft=pending==='equation'?$('rx-equation-input').value:pending==='formula'?$('rx-formula-input').value:'';
  $('rx-predict').disabled=!draft.trim()&&!slots.some(s=>Object.keys(s.atoms).length);
 }
 function markPending(kind){pending=kind;invalidate();syncPredict();notice('Bấm → để dùng công thức vừa nhập và xem phương trình.');}
 const matchesFor=atoms=>Object.keys(atoms).length?catalog.compounds.filter(c=>sameAtoms(c.atoms,atoms)):[];
 function identifySlot(s){const f=s.formula||textOf(s.atoms),matches=matchesFor(s.atoms);s.id=s.identity&&sameAtoms(compounds.get(s.identity).atoms,s.atoms)?s.identity:compounds.has(f)?f:matches.length===1?matches[0].id:null;}
 function selectCompound(id){
  const c=compounds.get(id);if(!c)return;
  discardPending();
  slots[active]={id,identity:id,atoms:{...c.atoms},formula:compoundFormula(c)};invalidate();renderSlots();renderComposer();
  notice('Đã chọn '+c.name+'. Bấm → để xem phương trình, hoặc + để thêm chất.');
 }
 function addAtom(symbol){
  if(!symbols.has(symbol))return;const s=slots[active];
  let next;try{next=addFormulaElement(s.formula||s.id||textOf(s.atoms),symbol);}catch(e){return notice(e.message);}
  discardPending();s.formula=next;s.atoms=parseFormula(next);identifySlot(s);atomEditorOpen=false;
  invalidate();renderSlots();renderComposer();
  notice('Dùng ⌃ / ⌄ ngay cạnh mỗi chỉ số để tăng hoặc giảm. '+(s.id?'Đã nhận diện '+s.id+'.':'Công thức đang ghép: '+s.formula+'.'));
 }
 function addSlot(){
  discardPending();
  const empty=slots.findIndex(s=>!Object.keys(s.atoms).length);
  if(empty>=0)active=empty;
  else if(slots.length<6){slots.push(emptySlot());active=slots.length-1;invalidate();}
  else return notice('Tối đa 6 chất tham gia.');
  renderSlots();renderComposer();focusInput();notice('Nhập công thức cho chất '+(active+1)+', hoặc chọn từ kho bên trái.');
 }
 function editableSlotFormula(s,slotIndex){
  if(!Object.keys(s.atoms).length)return '<span class="rx-slot-empty">Thả nguyên tố</span>';
  const nodes=(list,path)=>list.map((n,i)=>{
   const key=[...path,i].join('.'),label=n.type==='element'?n.symbol:'nhóm nguyên tử';
   const symbol=n.type==='element'?esc(n.symbol):`<span class="rx-formula-group">(${nodes(n.children,[...path,i])})</span>`;
   return `<span class="rx-formula-token">${symbol}<span class="rx-index-control"><span class="rx-index-number ${n.count===1?'is-unit':''}" role="spinbutton" tabindex="0" aria-label="Chỉ số ${label}, chất ${slotIndex+1}" aria-valuemin="1" aria-valuemax="100" aria-valuenow="${n.count}" data-index-value="${key}" data-index-slot="${slotIndex}">${n.count}</span><span class="rx-index-arrows"><button data-index-step="1" data-index-path="${key}" data-index-slot="${slotIndex}" aria-label="Tăng chỉ số ${label}, chất ${slotIndex+1}" ${n.count>=100?'disabled':''}>${caret}</button><button data-index-step="-1" data-index-path="${key}" data-index-slot="${slotIndex}" aria-label="Giảm chỉ số ${label}, chất ${slotIndex+1}" ${n.count<=1?'disabled':''}>${caret}</button></span></span></span>`;
  }).join('');
  return editableFormula(s.formula||s.id||textOf(s.atoms)).map((p,i)=>`${i?'<span class="rx-hydrate-dot">·</span>':''}${i&&p.factor!==1?`<span class="rx-hydrate-factor">${p.factor}</span>`:''}${nodes(p.tokens,[i])}`).join('');
 }
 function changeIndex(slotIndex,path,delta){
  const s=slots[slotIndex];let next;
  try{next=changeFormulaIndex(s.formula||s.id||textOf(s.atoms),path,delta);}catch(e){return notice(e.message);}
  discardPending();active=slotIndex;s.formula=next;s.atoms=parseFormula(next);identifySlot(s);
  invalidate();renderSlots();renderComposer();
  const button=root.querySelector(`[data-index-step="${delta}"][data-index-slot="${slotIndex}"][data-index-path="${path}"]`);
  const fallback=root.querySelector(`[data-index-value="${path}"][data-index-slot="${slotIndex}"]`);
  (button&&!button.disabled?button:fallback)?.focus({preventScroll:true});
  notice(`Đã chỉnh chất ${slotIndex+1}: ${s.formula}. ${s.id?'Đã nhận diện '+s.id+'.':'Chỉnh tiếp hoặc chọn công thức khớp trong kho.'}`);
 }
 function renderSlots(){
  root.dispatchEvent(new Event('chemistry-molecule-close'));
  $('rx-slots').innerHTML=`<div class="rx-reagents">${slots.map((s,i)=>`${i?'<span class="rx-plus-separator" aria-hidden="true">+</span>':''}<div class="rx-slot ${i===active?'is-selected':''} ${s.id?'is-ready':''}" data-slot="${i}" data-compound="${esc(s.id||'')}" ${s.id?`data-preview-compound="${esc(s.id)}"`:""} role="group" tabindex="0" aria-label="Sửa chất ${i+1}${s.id?': '+esc(s.id):''}" aria-current="${i===active}"><span class="rx-slot-label">CHẤT ${String(i+1).padStart(2,'0')} ${s.id?'<i>✓</i>':''}</span><strong>${editableSlotFormula(s,i)}</strong><small>${s.id?esc(compounds.get(s.id).name):Object.keys(s.atoms).length?'Đang ghép công thức':'Kéo từ bảng nguyên tố bên trái'}</small>${s.id?`<button class="rx-model-trigger" data-model-open="${esc(s.id)}" aria-label="Xem mô hình ${esc(s.id)}" title="Xem mô hình 3D / 2D">3D <span>↗</span></button>`:''}${slots.length>1?`<button class="rx-remove-slot" data-remove="${i}" aria-label="Xoá chất ${i+1}">×</button>`:''}</div>`).join('')}</div><div class="rx-row-controls"><button id="rx-add-slot" class="rx-add-slot" aria-label="Thêm chất tham gia" title="Thêm chất tham gia">+</button><button id="rx-predict" class="rx-predict" aria-label="Hiện phương trình" title="Hiện phương trình từ các chất đang chọn">${arrow}<span>Phương trình</span></button></div>`;
  $('rx-add-slot').onclick=addSlot;$('rx-predict').onclick=predict;
  syncPredict();
  root.querySelectorAll('[data-slot]').forEach(node=>{
   const choose=()=>{discardPending();active=Number(node.dataset.slot);renderSlots();renderComposer();focusInput();};
   node.onclick=e=>{if(!e.target.closest('[data-remove],[data-index-step],[data-index-value],[data-model-open]'))choose();};
   node.onkeydown=e=>{if(e.target===node&&['Enter',' '].includes(e.key)){e.preventDefault();choose();}};
   node.ondragover=e=>{e.preventDefault();node.classList.add('drop-over');};node.ondragleave=()=>node.classList.remove('drop-over');
   node.ondrop=e=>{e.preventDefault();active=Number(node.dataset.slot);addAtom(e.dataTransfer.getData('application/x-chem-element')||e.dataTransfer.getData('text/plain'));};
  });
  root.querySelectorAll('[data-remove]').forEach(b=>b.onclick=e=>{
   e.stopPropagation();discardPending();const removed=Number(b.dataset.remove);slots.splice(removed,1);if(removed<active)active--;active=Math.min(active,slots.length-1);
   invalidate();renderSlots();renderComposer();focusInput();
  });
  root.querySelectorAll('[data-index-step]').forEach(b=>b.onclick=e=>{e.stopPropagation();changeIndex(Number(b.dataset.indexSlot),b.dataset.indexPath,Number(b.dataset.indexStep));});
  root.querySelectorAll('[data-index-value]').forEach(b=>b.onkeydown=e=>{
   if(!['ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();e.stopPropagation();changeIndex(Number(b.dataset.indexSlot),b.dataset.indexValue,e.key==='ArrowUp'?1:-1);
  });
  root.querySelectorAll('.rx-element').forEach(b=>b.classList.toggle('is-in-formula',!!slots[active].atoms[b.dataset.symbol]));
 }
 function renderComposer(){
  const s=slots[active],matches=matchesFor(s.atoms),ambiguous=!s.id&&matches.length>1;
  $('rx-composer').innerHTML=`<div class="rx-formula-entry"><label for="rx-formula-input"><i></i> Chất ${active+1}</label><div><input id="rx-formula-input" value="${esc(s.formula||s.id||textOf(s.atoms))}" placeholder="Hoặc gõ công thức: Ca(OH)2…" autocomplete="off" spellcheck="false"><button id="rx-use-formula">Cập nhật <span>↵</span></button></div></div><details class="rx-atom-editor" ${ambiguous?'open':''}><summary>Chọn công thức cùng thành phần <span>⌄</span></summary><div id="rx-drop-target" class="rx-drop-target">Kéo nguyên tố vào khay ở trên; dùng ⌃ / ⌄ bên cạnh từng chỉ số.</div><div id="rx-matches" class="rx-matches">${matches.length?matches.slice(0,8).map(c=>`<button data-candidate="${esc(c.id)}"><strong>${formula(c.id)}</strong><small>${esc(c.name)}</small><span>${c.id===s.id?'✓ Đã nhận diện':'Chọn chất này'}</span></button>`).join(''):Object.keys(s.atoms).length?'<p class="rx-muted">Công thức chưa khớp chất trong kho. Chỉnh chỉ số ngay trên khay để tiếp tục.</p>':''}</div>${ambiguous?'<p class="rx-muted">Có nhiều chất cùng thành phần. Chọn đúng tên chất để lập phương trình.</p>':''}</details>`;
  const target=$('rx-drop-target');
  target.ondragover=e=>{e.preventDefault();target.classList.add('drop-over');};target.ondragleave=()=>target.classList.remove('drop-over');
  target.ondrop=e=>{e.preventDefault();addAtom(e.dataTransfer.getData('application/x-chem-element')||e.dataTransfer.getData('text/plain'));};
  root.querySelectorAll('[data-candidate]').forEach(b=>b.onclick=()=>selectCompound(b.dataset.candidate));
  const use=()=>{if(commitFormula())$('rx-predict').focus({preventScroll:true});};
  $('rx-formula-input').oninput=()=>markPending('formula');
  $('rx-use-formula').onclick=use;$('rx-formula-input').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();use();}};
 }
 function commitFormula(){
  const f=normalizeFormula($('rx-formula-input').value);
  invalidate();
  try{
   if(compounds.has(f)){selectCompound(f);return true;}
   const atoms=parseFormula(f);if(Object.keys(atoms).some(symbol=>!symbols.has(symbol)))throw Error('Có kí hiệu nguyên tố không hợp lệ.');
   const s=slots[active];discardPending();s.identity=null;s.formula=f;s.atoms=atoms;identifySlot(s);atomEditorOpen=!s.id;renderSlots();renderComposer();notice(s.id?'Đã nhận diện '+s.id+'. Bấm → để xem phương trình.':'Chọn chất khớp thành phần bên dưới, hoặc sửa công thức.');
   return true;
  }catch(e){notice(e.message);return false;}
 }
 function loadInputs(ids){
  discardPending();slots=ids.map(id=>({id,identity:id,atoms:{...compounds.get(id).atoms},formula:compoundFormula(compounds.get(id))}));active=0;atomEditorOpen=false;invalidate();renderSlots();renderComposer();
 }
 function loadQuickEntry(){
  const value=$('rx-equation-input').value.trim(),ids=value.split('+').map(normalizeFormula);
  invalidate();
  if(!value||ids.some(id=>!id))return notice('Nhập các chất cách nhau bằng dấu +, ví dụ Zn + HCl.');
  if(ids.length>6)return notice('Tối đa 6 chất tham gia.');
  if(new Set(ids).size!==ids.length)return notice('Mỗi chất chỉ cần nhập một lần; hệ số được tính ở bước cân bằng.');
  const unknown=ids.filter(id=>!compounds.has(id));
  if(unknown.length)return notice('Chưa tìm thấy '+unknown.join(', ')+'. Kiểm tra chữ hoa / thường hoặc tra tên trong kho chất.');
  loadInputs(ids);notice('Đã nạp chất. Bấm → ngay bên cạnh dấu + để xem phương trình.');$('rx-predict').focus({preventScroll:true});return true;
 }
 function predict(){
  if(pending==='equation'&&!loadQuickEntry())return;
  if(pending==='formula'&&!commitFormula())return;
  slots.forEach(s=>{if(!s.id)identifySlot(s);});
  const unresolved=slots.findIndex(s=>Object.keys(s.atoms).length&&!s.id);
  if(unresolved>=0){active=unresolved;atomEditorOpen=true;renderSlots();renderComposer();focusInput();return notice('Chất '+(active+1)+' chưa được xác định. Chọn công thức đúng trong phần ghép nguyên tử.');}
  const ids=slots.filter(s=>s.id).map(s=>s.id);
  if(!ids.length)return notice('Chọn ít nhất một chất.');
  if(new Set(ids).size!==ids.length)return notice('Một chất chỉ cần chọn một lần; hệ số được tính ở bước cân bằng.');
  result=resolveReaction(ids,REACTIONS,NO_REACTIONS);reaction=result.matches?.[0]||null;balanced=null;showProperties=false;renderSlots();renderResult();
  notice(reaction?'Đã có sơ đồ phản ứng. Bấm Cân bằng & điều kiện để hoàn chỉnh.':'Xem giải thích và các thay đổi gần nhất với tổ hợp của bạn bên dưới.');
  root.querySelector('.rx-result-shell').scrollIntoView({behavior:'smooth',block:'nearest'});
 }
 function term(id,coefficient=1,phase='',side='reactant'){
  const c=compounds.get(id),mark=phase==='ppt'?'↓':phase==='g'?'↑':'';
  return `<span class="rx-species rx-species-${side}" data-preview-compound="${esc(id)}" tabindex="0" role="button" aria-label="Xem mô hình ${esc(id)}"><button type="button" class="rx-species-plus-btn" data-model-open="${esc(id)}" aria-label="Xem mô hình 3D ${esc(id)}" title="Xem mô hình 3D (Three.js)">+</button><span class="rx-formula">${coefficient!==1?`<b class="rx-coefficient rx-coefficient-${side}">${coefficient}</b>`:''}${formula(id)}${mark?`<i class="rx-phase-symbol" title="${phase==='ppt'?'Kết tủa':'Khí'}">${mark}</i>`:''}${phase==='s'?'<small class="rx-solid">(rắn)</small>':''}</span>${balanced?`<small class="rx-species-name">${esc(c?.name||id)}</small>`:''}</span>`;
 }
 function renderResult(){
  $('rx-balance').disabled=!reaction||!!balanced;$('rx-properties').disabled=!balanced;
  $('rx-balance').classList.toggle('rx-ready',!!reaction&&!balanced);$('rx-balance').textContent=balanced?'✓ Đã cân bằng':'Cân bằng & điều kiện';$('rx-properties').setAttribute('aria-expanded',String(showProperties));
  $('rx-properties').title=balanced?'Mở / thu hồ sơ tính chất các chất trong phương trình':'Cân bằng phương trình để mở hồ sơ tính chất';
  root.classList.toggle('rx-properties-open',showProperties&&!!balanced);$('rx-property-backdrop').hidden=!showProperties||!balanced;
  root.querySelector('.rx-layout').inert=showProperties&&!!balanced;root.querySelector('.rx-head').inert=showProperties&&!!balanced;
  root.querySelectorAll('[data-step]').forEach((li,i)=>{const step=balanced?2:reaction?1:0;li.classList.toggle('is-current',i===step);li.classList.toggle('is-done',i<step);if(i===step)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');});
  $('rx-property-panel').hidden=!showProperties||!balanced;
  if(!result){$('rx-result').innerHTML=`<div class="rx-empty"><div class="rx-empty-graphic" aria-hidden="true"><span>Zn<small>KẼM</small></span><i>+</i><span>HCl<small>ACID</small></span><b>${arrow}</b><span class="rx-empty-product">?<small>SẢN PHẨM</small></span></div><div><span class="rx-mini-label">BẠN CHỌN CHẤT. APP TÌM LỘ TRÌNH.</span><h3>Một mũi tên, mở ra phản ứng.</h3><p>Chọn chất ở trên rồi bấm <b>→</b>.<br>Hệ số, điều kiện và hiện tượng sẽ mở ở bước cân bằng.</p></div></div>`;return;}
  if(!reaction){
   const known=result.status==='no-reaction';
   $('rx-result').innerHTML=`<div class="rx-result-top"><span class="rx-status ${known?'attention':''}">${known?'KHÔNG PHẢN ỨNG Ở ĐIỀU KIỆN ĐANG XÉT':'CHƯA CÓ LỘ TRÌNH TRONG KHO'}</span><span>${result.suggestions.length} gợi ý gần tổ hợp hiện tại</span></div><div class="rx-no-equation">${slots.filter(s=>s.id).map(s=>term(s.id)).join('<b class="rx-op">+</b>')}<b class="rx-op">${known?'↛':'?'}</b><span>${known?'Cần đổi chất hoặc điều kiện':'Chưa xác nhận sản phẩm'}</span></div><p class="rx-reason">${esc(result.reason)}</p><div class="rx-suggestion-heading"><div><span class="rx-mini-label">ĐIỀU CHỈNH NHỎ · LỘ TRÌNH MỚI</span><h3>Giữ gần nhất với lựa chọn của bạn</h3></div><span>Chọn để áp dụng & xem ngay</span></div><div class="rx-suggestions">${result.suggestions.length?result.suggestions.map((x,i)=>suggestionCard(x,i)).join(''):'<div class="rx-no-suggestions">Chưa có gợi ý đủ gần trong kho. Thử một ví dụ ở trên hoặc chọn thêm chất khác.</div>'}</div>`;
   root.querySelectorAll('[data-suggestion]').forEach(b=>b.onclick=()=>{
    const x=result.suggestions[Number(b.dataset.suggestion)],previous=slots.filter(s=>s.id).map(s=>s.id);
    loadInputs(x.reaction.left);undoInputs=previous;predict();notice('Đã áp dụng gợi ý và hiện sơ đồ mới. Bạn có thể hoàn tác hoặc cân bằng tiếp.');
   });return;
  }
  const choices=result.matches.length>1?`<label class="rx-route">Lộ trình <select id="rx-route">${result.matches.map((r,i)=>`<option value="${i}" ${r===reaction?'selected':''}>Lộ trình ${i+1}</option>`).join('')}</select></label>`:'';
  $('rx-result').innerHTML=`<div class="rx-result-top"><span>${balanced?'PHƯƠNG TRÌNH ĐÃ HOÀN CHỈNH':'SƠ ĐỒ PHẢN ỨNG'}</span>${choices}<span class="rx-status ${balanced?'complete':''}">${balanced?'✓ Bảo toàn nguyên tử':'Chưa cân bằng'}</span></div>${undoInputs?'<button id="rx-undo" class="rx-undo">↶ Trở lại tổ hợp ban đầu</button>':''}<div class="rx-equation">${reaction.left.map((f,i)=>term(f,balanced?.left[i]||1)).join('<b class="rx-op">+</b>')}<span class="rx-reaction-arrow">${balanced?`<small>${esc(reaction.type)}</small>`:''}${arrow}</span>${reaction.right.map((f,i)=>term(f,balanced?.right[i]||1,balanced?reaction.phases[i]:'','product')).join('<b class="rx-op">+</b>')}</div>${balanced?`<div class="rx-completed"><div class="rx-condition-grid"><div><span class="rx-mini-label">ĐIỀU KIỆN PHẢN ỨNG</span><p>${esc(reaction.conditions)}</p></div>${reaction.observation?`<div><span class="rx-mini-label">HIỆN TƯỢNG</span><p>${esc(reaction.observation)}</p></div>`:''}</div><div class="rx-balance-proof"><span class="rx-mini-label">KIỂM TRA NGUYÊN TỬ · TRÁI = PHẢI</span><div>${Object.entries(balanced.atomsLeft).map(([s,n])=>`<span>${s} <b>${n} = ${balanced.atomsRight[s]}</b> ✓</span>`).join('')}</div></div><p class="rx-phase-key">↓ Kết tủa · ↑ Chất khí ở điều kiện phản ứng · (rắn) Chất rắn khác. Hệ số 1 được lược bỏ.</p></div><details class="rx-sources"><summary>Nguồn học liệu</summary>${reaction.sources.map((url,i)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${i?'Viết và cân bằng / điều kiện phản ứng':'Phân loại phản ứng'} ↗</a>`).join('')}</details>`:'<p class="rx-stage-note"><span>TIẾP THEO</span> Bấm <b>Cân bằng & điều kiện</b> để hiện hệ số, tên chất, điều kiện và dấu khí / kết tủa.</p>'}`;
  if($('rx-undo'))$('rx-undo').onclick=()=>{const ids=undoInputs;loadInputs(ids);predict();};
  if($('rx-route'))$('rx-route').onchange=e=>{reaction=result.matches[Number(e.target.value)];balanced=null;showProperties=false;renderResult();};
  renderProperties();
 }
 function suggestionCard(x,i){
  const kept=x.kept||x.reaction.left.filter(id=>!x.missing.includes(id)),replacements=x.replacements||[],additions=x.additions||x.missing,removals=x.removals||x.unused,changes=x.changeCount??Math.max(x.missing.length,x.unused.length);
  return `<button data-suggestion="${i}" class="rx-suggestion ${i===0?'is-best':''}"><span class="rx-suggestion-top"><span>${i===0?'GỢI Ý ƯU TIÊN':'PHƯƠNG ÁN '+String(i+1).padStart(2,'0')}</span><b>${changes} thay đổi</b></span><span class="rx-change-list">${replacements.map(p=>`<span class="rx-change"><del>${formula(p.from)}</del><i>→</i><strong>${formula(p.to)}</strong><small>Thay chất</small></span>`).join('')}${additions.map(id=>`<span class="rx-change"><i>+</i><strong>${formula(id)}</strong><small>Thêm chất</small></span>`).join('')}${removals.map(id=>`<span class="rx-change"><i>−</i><del>${formula(id)}</del><small>Bỏ khỏi tổ hợp</small></span>`).join('')}</span><span class="rx-kept">Giữ nguyên ${kept.map(id=>formula(id)).join(' · ')||'—'}</span><span class="rx-suggestion-reason">${esc(x.explanation||'Tổ hợp có lộ trình phản ứng trong kho.')}</span><span class="rx-target-inputs">${x.reaction.left.map(id=>formula(id)).join(' <i>+</i> ')}</span><span class="rx-suggestion-cta">Áp dụng & xem phương trình ${arrow}</span></button>`;
 }
 function setProperties(open,restoreFocus=true){
  if(open&&!balanced)return;
  if(open)root.dispatchEvent(new Event('chemistry-molecule-close'));
  showProperties=open;renderResult();
  if(open)$('rx-close-properties')?.focus({preventScroll:true});
  else if(restoreFocus)($('rx-properties').disabled?$('rx-predict'):$('rx-properties')).focus({preventScroll:true});
 }
 function renderProperties(){
  const panel=$('rx-property-panel');panel.hidden=!showProperties||!balanced;if(panel.hidden)return;
  const all=[...new Set([...reaction.left,...reaction.right])];
  const ids=propertyFilter==='reactants'?all.filter(id=>reaction.left.includes(id)):propertyFilter==='products'?all.filter(id=>reaction.right.includes(id)):all;
  panel.innerHTML=`<header id="rx-property-handle" class="rx-property-head"><span class="rx-drag-grip" aria-hidden="true">⠿</span><div><span class="rx-mini-label">HỒ SƠ KHOA HỌC / PHẢN ỨNG</span><h2>Hồ sơ tính chất</h2><p>${all.length} chất · Vật lí, hoá học và nguồn tham khảo</p></div><button id="rx-close-properties" aria-label="Đóng hồ sơ tính chất">×</button></header><div class="rx-property-filters" role="group" aria-label="Lọc các chất trong hồ sơ">${[['all','Tất cả'],['reactants','Chất tham gia'],['products','Sản phẩm']].map(([key,label])=>`<button data-property-filter="${key}" aria-pressed="${propertyFilter===key}">${label}</button>`).join('')}</div><div class="rx-property-scroll"><table><thead><tr><th>Chất</th><th>Tính chất vật lí</th><th>Tính chất hoá học</th><th>Nguồn</th></tr></thead><tbody>${ids.map(id=>{const c=compounds.get(id),p=substanceProperties(c);return `<tr><th><span class="rx-property-role ${reaction.left.includes(id)?'is-reactant':'is-product'}">${reaction.left.includes(id)?'THAM GIA':'SẢN PHẨM'}</span><b>${formula(id)}</b><small>${esc(c.name)}</small></th><td>${esc(p.physical)}</td><td>${esc(p.chemical)}</td><td>${p.sources.slice(0,2).map((url,i)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${i?'Tham khảo':'Hồ sơ chất'} ↗</a>`).join('')}</td></tr>`;}).join('')}</tbody></table></div><footer class="rx-property-footer"><span>↔ Kéo đầu bảng để di chuyển · Nháy đúp để thu</span><p>Dữ liệu vật lí thường ở 25 °C. Dung dịch và chất khan có thể khác nhau; điều kiện của phương trình được nêu riêng.</p></footer>`;
  $('rx-close-properties').onclick=()=>setProperties(false);
  root.querySelectorAll('[data-property-filter]').forEach(b=>b.onclick=()=>{propertyFilter=b.dataset.propertyFilter;renderProperties();root.querySelector(`[data-property-filter="${propertyFilter}"]`).focus({preventScroll:true});});
  const handle=$('rx-property-handle');
  handle.ondblclick=e=>{if(!e.target.closest('button'))setProperties(false);};
  handle.onpointerdown=e=>{
   if(e.button!==0||e.target.closest('button'))return;
   const rect=panel.getBoundingClientRect();
   const start={x:e.clientX,y:e.clientY,left:rect.left,top:rect.top};
   panel.style.right='auto';panel.style.bottom='auto';panel.style.width=rect.width+'px';panel.style.height=rect.height+'px';
   const move=ev=>{
    const minTop=parseFloat(root.style.top)||88;
    const left=Math.max(8,Math.min(window.innerWidth-rect.width-8,start.left+ev.clientX-start.x));
    const top=Math.max(minTop+8,Math.min(window.innerHeight-rect.height-8,start.top+ev.clientY-start.y));
    panel.style.left=left+'px';panel.style.top=top+'px';
   };
   const up=()=>{document.removeEventListener('pointermove',move);document.removeEventListener('pointerup',up);document.removeEventListener('pointercancel',up);};
   document.addEventListener('pointermove',move);document.addEventListener('pointerup',up);document.addEventListener('pointercancel',up);
   e.preventDefault();
  };
 }
 const periodic=$('rx-periodic');
 periodic.innerHTML=catalog.elements.map(e=>{
  const z=e.z,group=e.group||((z>=57&&z<=71)?z-53:z-85),row=z>=57&&z<=71?9:z>=89&&z<=103?10:e.period;
  const tone=e.group===18?'noble':['H','C','N','O','F','P','S','Cl','Se','Br','I','At','Ts'].includes(e.symbol)?'nonmetal':'metal';
  return `<button draggable="true" class="rx-element rx-${tone}" data-symbol="${e.symbol}" style="grid-column:${group};grid-row:${row}" aria-label="Thêm ${e.symbol}, ${esc(e.common_name||e.name)}" title="${esc(e.name)} · Kéo vào khay"><small>${z}</small><b>${e.symbol}</b></button>`;
 }).join('');
 periodic.querySelectorAll('button').forEach(b=>{
  const preview=()=>{const element=catalog.elements.find(e=>e.symbol===b.dataset.symbol);$('rx-element-preview').innerHTML=`<span>${element.symbol}</span><div><b>${esc(element.common_name||element.name)}</b><small>Số hiệu ${element.z} · Kéo vào chất ${active+1}</small></div>`;};
  b.onmouseenter=preview;b.onfocus=preview;b.onclick=()=>{addAtom(b.dataset.symbol);preview();};
  b.ondragstart=e=>{e.dataTransfer.setData('application/x-chem-element',b.dataset.symbol);e.dataTransfer.setData('text/plain',b.dataset.symbol);e.dataTransfer.effectAllowed='copy';};
 });
 $('rx-use-equation').onclick=loadQuickEntry;$('rx-equation-input').oninput=()=>markPending('equation');$('rx-equation-input').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();loadQuickEntry();}};
 $('rx-balance').onclick=()=>{if(!reaction)return;try{balanced=balanceEquation(reaction.left,reaction.right);renderResult();notice('Đã cân bằng. Điều kiện, tên chất và hiện tượng đã xuất hiện.');}catch(e){notice(e.message);}};
 $('rx-properties').onclick=()=>setProperties(!showProperties);
 $('rx-property-backdrop').onclick=()=>setProperties(false);
 root.addEventListener('keydown',e=>{
  if(!showProperties)return;
  if(e.key==='Escape'){e.preventDefault();e.stopPropagation();setProperties(false);return;}
  if(e.key==='Tab'){
   const controls=[...$('rx-property-panel').querySelectorAll('button:not([disabled]),a[href],[tabindex="0"]')];
   const first=controls[0],last=controls[controls.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
  }
 });
 $('rx-clear').onclick=()=>{discardPending();slots=[emptySlot(),emptySlot()];active=0;atomEditorOpen=false;invalidate();renderSlots();renderComposer();notice('Đã làm mới. Chọn các chất cho phương trình tiếp theo.');};
 root.querySelectorAll('[data-example]').forEach(b=>b.onclick=()=>{loadInputs(b.dataset.example.split('|'));notice('Đã chọn ví dụ. Bấm → để xem phương trình.');$('rx-predict').focus({preventScroll:true});});
 const fitTop=()=>{if(!root.hidden){const top=container?0:(document.querySelector('.topbar')?.getBoundingClientRect?.().bottom||88);root.style.top=top+'px';root.style.setProperty('--rx-top',top+'px');const panel=$('rx-property-panel');for(const name of ['left','top','right','bottom','width','height'])panel.style.removeProperty(name);}};
 addEventListener('resize',fitTop);
 const close=()=>{if(root.hidden)return;root.dispatchEvent(new Event('chemistry-molecule-close'));setProperties(false,false);root.hidden=true;document.body.classList.remove('reaction-mode');document.querySelectorAll('.nav[data-mode="react"]').forEach(b=>b.classList.remove('active'));returnFocus?.focus({preventScroll:true});dispatchEvent(new Event('resize'));};
 const open=()=>{returnFocus=document.activeElement;document.dispatchEvent(new Event('chemistry-close-science'));document.getElementById('periodic-tv-dialog')?.close();root.hidden=false;document.body.classList.add('reaction-mode');document.querySelectorAll('.nav').forEach(b=>b.classList.toggle('active',b.dataset.mode==='react'));root.scrollTop=0;fitTop();};
 document.addEventListener('chemistry-reaction-open',open);document.addEventListener('chemistry-reaction-close',close);
 $('rx-exit').onclick=()=>{close();document.querySelector('.nav[data-mode="explore"]')?.click();};
 document.getElementById('dossier-home')?.addEventListener('click',close);document.querySelector('.brand')?.addEventListener('click',close);
 moleculePeek(root,catalog);renderSlots();renderComposer();renderResult();
 return { open, close, root };
}

if(typeof window !== "undefined"){ window.reactionWorkspace = reactionWorkspace; }

