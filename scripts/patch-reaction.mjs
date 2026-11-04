import fs from 'fs';

// Read fresh original
let code = fs.readFileSync('docs/research/merge/unpacked/reaction-workspace.js', 'utf-8');

// 1. Function parameter
code = code.replace(
  'export function reactionWorkspace(catalog){',
  'export function reactionWorkspace(catalog, container = null){'
);

// 2. Container append
code = code.replace(
  'document.body.append(root);',
  'if(container){container.innerHTML="";container.append(root);root.hidden=false;root.style.top="0px";}else{document.body.append(root);}'
);

// 3. Optional chaining on nav explore
code = code.replace(
  "document.querySelector('.nav[data-mode=\"explore\"]').click();",
  "document.querySelector('.nav[data-mode=\"explore\"]')?.click();"
);

// 4. Restore (+) button in term(...)
code = code.replace(
  'return `<span class="rx-species rx-species-${side}" data-preview-compound="${esc(id)}" tabindex="0" role="button" aria-label="Xem mô hình ${esc(id)}"><span class="rx-formula">',
  'return `<span class="rx-species rx-species-${side}" data-preview-compound="${esc(id)}" tabindex="0" role="button" aria-label="Xem mô hình ${esc(id)}"><button type="button" class="rx-species-plus-btn" data-model-open="${esc(id)}" aria-label="Xem mô hình 3D ${esc(id)}" title="Xem mô hình 3D (Three.js)">+</button><span class="rx-formula">'
);

// 5. fitTop support container
code = code.replace(
  "const fitTop=()=>{if(!root.hidden){const top=document.querySelector('.topbar')?.getBoundingClientRect?.().bottom||88;root.style.top=top+'px';",
  "const fitTop=()=>{if(!root.hidden){const top=container?0:(document.querySelector('.topbar')?.getBoundingClientRect?.().bottom||88);root.style.top=top+'px';"
);

// 6. Return instance and attach to window
code = code.replace(
  /moleculePeek\(root,catalog\);renderSlots\(\);renderComposer\(\);renderResult\(\);(\r?\n)\}/,
  'moleculePeek(root,catalog);renderSlots();renderComposer();renderResult();$1 return { open, close, root };$1}\n\nif(typeof window !== "undefined"){ window.reactionWorkspace = reactionWorkspace; }'
);

fs.writeFileSync('public/sites/merge/js/reaction-workspace.js', code, 'utf-8');
console.log('reaction-workspace.js patched successfully with (+) button and container support!');
