"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  HoaAppContext,
  NAV_MODULES,
  renderIconSvg,
  toast,
} from "./engine/core-utils";
import {
  HoaCore,
  MODULE_LOADERS,
  o as openCommandPalette,
} from "./engine/chunks/index-CJsh0L43.js";

function openAuthorModal() {
  const existing = document.getElementById("authorModalBackdrop");
  if (existing) existing.remove();

  const backdrop = document.createElement("div");
  backdrop.id = "authorModalBackdrop";
  backdrop.className = "author-modal-backdrop";

  const close = () => {
    backdrop.classList.add("closing");
    window.setTimeout(() => backdrop.remove(), 200);
    document.removeEventListener("keydown", onKey);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };
  document.addEventListener("keydown", onKey);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });

  const phoneZalo = "0848678269";
  backdrop.innerHTML = `
    <div class="author-modal-card">
      <button class="modal-close-btn" type="button" aria-label="Đóng">✕</button>
      <div class="author-modal-header">
        <div class="author-avatar-badge">🧑‍🏫</div>
        <div class="author-header-info">
          <div class="author-badge-kicker">TÁC GIẢ &amp; SÁNG LẬP DỰ ÁN</div>
          <h2 class="author-name-title">CT99</h2>
          <p class="author-sub-title">Giáo viên môn Hóa học — CT99</p>
        </div>
      </div>
      <div class="author-modal-body">
        <div class="author-text-side">
          <p class="author-p">
            Dự án <b>CT99-CHEMISTRY</b> được phát triển hoàn toàn <b style="color:#f43f5e;font-weight:800">miễn phí 100%</b> vì cộng đồng giáo viên và học sinh Việt Nam. Ứng dụng cung cấp bảng tuần hoàn 118 nguyên tố, nguyên tử 3D, cân bằng phản ứng, điện hóa, thí nghiệm ảo và xưởng vẽ hình xuất SVG/DOCX/Typst xử lý thuần client-side tốc độ tức thì, bảo đảm tính riêng tư và dùng mượt mà ngay cả khi không có mạng.
          </p>
          <div class="author-quote-box">
            <span class="quote-ic">☕</span>
            <div>
              <b>Mời tác giả một ly cà phê?</b>
              <p style="margin:4px 0 0;font-size:13px;line-height:1.5;color:var(--dim)">
                Nếu CT99-CHEMISTRY đã giúp Thầy/Cô và các bạn học sinh tiết kiệm được thời gian chuẩn bị bài giảng hay hiểu sâu hơn về thế giới hóa học, một ly cà phê nhỏ sẽ là nguồn động viên tinh thần to lớn để tác giả tiếp tục hoàn thiện và cập nhật thêm nhiều thí nghiệm mới.
              </p>
            </div>
          </div>
          <div class="author-bank-box">
            <div class="bank-box-top">
              <span class="bank-tag">Techcombank</span>
              <span class="bank-owner">TRUONG CONG TIEN</span>
            </div>
            <div class="bank-box-num-row">
              <span class="bank-acc-num">5090020999</span>
              <button class="btn small cd-copy-btn" type="button" id="authorCopyBankBtn">
                <span>${renderIconSvg("copy", 16)}</span>
                <span>Chép số TK</span>
              </button>
            </div>
          </div>
          <div class="author-actions-row">
            <a href="mailto:tctien0209@gmail.com" class="btn small author-social-btn">
              ✉️ tctien0209@gmail.com
            </a>
            <a href="https://www.facebook.com/token.neverdie" target="_blank" rel="noopener noreferrer" class="btn small author-social-btn">
              <span><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></span>
              Kết nối qua Facebook
            </a>
            <a href="https://zalo.me/${phoneZalo}" target="_blank" rel="noopener noreferrer" class="btn small author-social-btn">
              📞 Zalo / ĐT: ${phoneZalo}
            </a>
          </div>
        </div>
        <div class="author-qr-side">
          <div class="author-qr-frame">
            <img src="https://img.vietqr.io/image/techcombank-5090020999-compact2.png?amount=&addInfo=Ung%20ho%20CT99&accountName=TRUONG%20CONG%20TIEN" alt="Mã QR VietQR Techcombank ủng hộ CT99" width="200" height="200" loading="eager" />
          </div>
          <small class="qr-hint">Quét mã QR bằng app ngân hàng bất kỳ để mời cà phê tác giả</small>
        </div>
      </div>
    </div>
  `;

  const closeBtn = backdrop.querySelector(".modal-close-btn");
  closeBtn?.addEventListener("click", close);

  const copyBtn = backdrop.querySelector("#authorCopyBankBtn") as HTMLButtonElement | null;
  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("5090020999");
    } catch {
      // fallback ignored
    }
    copyBtn.innerHTML = `${renderIconSvg("check", 16)} <span>Đã chép!</span>`;
    copyBtn.classList.add("copied");
    toast(`Đã chép số TK Techcombank: 5090020999`);
    window.setTimeout(() => {
      copyBtn.innerHTML = `${renderIconSvg("copy", 16)} <span>Chép số TK</span>`;
      copyBtn.classList.remove("copied");
    }, 2500);
  });

  document.body.appendChild(backdrop);
}
interface ViewCacheEntry {
  el: HTMLDivElement;
  dispose?: (() => void) | void;
  lastParamsKey: string;
}

export function HoahocLabApp() {
  const workRef = useRef<HTMLDivElement | null>(null);
  const ctxRef = useRef<HoaAppContext | null>(null);
  const viewsMapRef = useRef<Map<string, ViewCacheEntry>>(new Map());
  const currentAppRef = useRef<string>("");
  // Bảo đảm nhận diện thương hiệu CT99 trên cả trang chính và iframe
  useEffect(() => {
    const sanitizeDocument = (doc: Document) => {
      try {
        if (!doc.body) return;
        // Chuẩn hóa trực tiếp logo góc trên bên trái nếu có
        doc.querySelectorAll(".dockbrand").forEach((el) => {
          if (el.textContent && /SANG/i.test(el.textContent)) {
            el.textContent = "CT99-CAS";
          }
        });
        // Loại bỏ hoàn toàn các phần tử thừa nếu có
        doc
          .querySelectorAll(
            ".release-tbtn, #releasebtn, #stReleaseBtn, #homeReleaseBtnCard, #ct99ReleaseNotes"
          )
          .forEach((el) => el.remove());

        // Chuẩn hóa trực tiếp thông tin ngân hàng và tác giả cũ
        doc.querySelectorAll("a[href*='nguyensangnhc'], a[href*='ct99@gmail']").forEach((el) => {
          (el as HTMLAnchorElement).href = "mailto:tctien0209@gmail.com";
          if (el.textContent && /(?:nguyensangnhc|ct99@gmail)/i.test(el.textContent)) {
            el.textContent = "✉️ tctien0209@gmail.com";
          }
        });
        doc.querySelectorAll("img[src*='vietqr.io'], img[src*='qr-donate']").forEach((el) => {
          const img = el as HTMLImageElement;
          img.src = "https://img.vietqr.io/image/techcombank-5090020999-compact2.png?amount=&addInfo=Ung%20ho%20CT99&accountName=TRUONG%20CONG%20TIEN";
          img.alt = "Mã QR VietQR Techcombank ủng hộ CT99";
        });

        const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          const text = node.nodeValue || "";
          if (
            /Sang[\s_-]?(?:Math|CAS|HOÁ|L[ÝY]|SINH)|TypstConic|Thầy\s+Sang|Nguyễn\s+Văn\s+Sang|VPBank|10389821115|nguyensangnhc@gmail\.com|ct99@gmail\.com|Nguyễn\s+Hữu\s+Cảnh|Giáo\s+viên\s+môn\s+Toán/i.test(
              text
            )
          ) {
            node.nodeValue = text
              .replace(/Sang[\s_-]?Math/gi, "CT99 Math")
              .replace(/SANG[\s_-]?CAS/gi, "CT99-CAS")
              .replace(/SANG[\s_-]?HO[ÁA]/gi, "CT99-CHEMISTRY")
              .replace(/SANG[\s_-]?(?:L[ÝY]|SINH)/gi, "CT99")
              .replace(/TypstConic(?:Hub)?/gi, "CT99")
              .replace(/Giáo\s+viên\s+môn\s+Toán\s*[-—–]\s*THPT\s+Nguyễn\s+Hữu\s+Cảnh(?:,\s*TP\.?\s*HCM)?/gi, "Giáo viên môn Hóa học — CT99")
              .replace(/Giáo\s+viên\s+môn\s+Toán/gi, "Giáo viên môn Hóa học — CT99")
              .replace(/THPT\s+Nguyễn\s+Hữu\s+Cảnh(?:,\s*TP\.?\s*HCM)?/gi, "CT99")
              .replace(/Nguyễn\s+Hữu\s+Cảnh/gi, "CT99")
              .replace(/(?:Thầy\s+)?Nguyễn\s+Văn\s+Sang|Thầy\s+Sang/gi, "CT99")
              .replace(/VPBank/gi, "Techcombank")
              .replace(/10389821115/g, "5090020999")
              .replace(/(?:nguyensangnhc|ct99)@gmail\.com/gi, "tctien0209@gmail.com");
          }
        }
      } catch {
        // ignore cross-origin if any
      }
    };

    const sanitizeAll = () => {
      sanitizeDocument(document);
      document.querySelectorAll("iframe").forEach((frame) => {
        try {
          if (frame.getAttribute("sandbox") !== "allow-scripts allow-same-origin allow-popups allow-forms") {
            frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups allow-forms");
          }
          if (frame.contentDocument) {
            sanitizeDocument(frame.contentDocument);
          }
        } catch {}
      });
    };

    sanitizeAll();
    const timer = setInterval(sanitizeAll, 1000);
    return () => clearInterval(timer);
  }, []);

  const [activeAppId, setActiveAppId] = useState<string>("lab");
  const [isFullWork, setIsFullWork] = useState<boolean>(true);

  const parseHash = useCallback(() => {
    if (typeof window === "undefined") {
      return { app: "lab", params: {} as Record<string, string> };
    }
    const raw = window.location.hash.replace(/^#\/?/, "");
    const [appPart, queryPart] = raw.split("?");
    const params: Record<string, string> = {};
    new URLSearchParams(queryPart ?? "").forEach((v, k) => {
      params[k] = v;
    });
    return { app: appPart || "home", params };
  }, []);

  const navigateTo = useCallback(
    (appId: string, params?: Record<string, string>) => {
      const qs =
        params && Object.keys(params).length > 0
          ? `?${new URLSearchParams(params).toString()}`
          : "";
      window.location.hash = `#/${appId}${qs}`;
    },
    []
  );

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("hoa-theme");
      if (savedTheme) {
        document.documentElement.dataset.theme = savedTheme;
      }
    } catch {
      // ignore storage errors
    }

    if (
      !window.location.hash ||
      window.location.hash === "#/" ||
      window.location.hash === "#"
    ) {
      window.history.replaceState(null, "", "#/lab");
    }

    let cancelled = false;
    const viewsMap = viewsMapRef.current;

    const createLoadingNode = (modName: string): HTMLDivElement => {
      const wrap = document.createElement("div");
      wrap.className = "loading-pulse";
      const disc = document.createElement("span");
      disc.className = "spin-disc";
      const txt = document.createElement("span");
      txt.textContent = `Đang tải ${modName}…`;
      wrap.append(disc, txt);
      return wrap;
    };

    const syncRoute = async () => {
      const ctx = ctxRef.current;
      const workEl = workRef.current;
      if (!ctx || !workEl || cancelled) return;

      const { app, params } = parseHash();
      if (app === "author") {
        openAuthorModal();
        if (!currentAppRef.current) {
          window.location.hash = "#/home";
        }
        return;
      }

      const mod =
        NAV_MODULES.find((m) => m.id === app) ??
        (app === "dungcu"
          ? {
              id: "dungcu",
              ic: "pen",
              name: "Bộ dụng cụ",
              group: "Vẽ hình",
              color: "#06b6d4",
              full: true,
              desc: "",
              kw: "",
            }
          : NAV_MODULES[0]);

      const navHighlightId = mod.id === "dungcu" ? "studio" : mod.id;
      setActiveAppId(navHighlightId);
      setIsFullWork(Boolean(mod.full));
      document.documentElement.style.setProperty("--accent", mod.color);
      document.documentElement.style.setProperty("--app", mod.color);

      const paramsKey = JSON.stringify(params);
      const prevAppId = currentAppRef.current;
      if (prevAppId && prevAppId !== mod.id) {
        const prevEntry = viewsMap.get(prevAppId);
        if (prevEntry) {
          prevEntry.el.style.display = "none";
          prevEntry.el.classList.remove("active");
        }
      }

      const loader = MODULE_LOADERS[mod.id] ?? MODULE_LOADERS.home;
      const existing = viewsMap.get(mod.id);

      if (existing) {
        if (
          existing.lastParamsKey !== paramsKey &&
          Object.keys(params).length > 0
        ) {
          if (typeof existing.dispose === "function") {
            try {
              existing.dispose();
            } catch {
              // ignore dispose error
            }
          }
          existing.dispose = undefined;
          existing.el.replaceChildren(createLoadingNode(mod.name));
          try {
            const modLoaded = await loader();
            if (cancelled) return;
            existing.el.replaceChildren();
            ctx.params = params;
            existing.dispose = modLoaded.mount(existing.el, ctx);
            existing.lastParamsKey = paramsKey;
          } catch (err) {
            console.error(err);
            const p = document.createElement("p");
            p.className = "err";
            p.style.padding = "20px";
            p.textContent = `Không cập nhật được: ${String(err)}`;
            existing.el.replaceChildren(p);
          }
        }
        existing.el.style.display = "";
        existing.el.classList.add("active");
        workEl.className = mod.full ? "full" : "";
        currentAppRef.current = mod.id;
        return;
      }

      const viewEl = document.createElement("div");
      viewEl.className = `appview${mod.full ? " full" : ""}`;
      viewEl.replaceChildren(createLoadingNode(mod.name));
      workEl.appendChild(viewEl);

      const newEntry: ViewCacheEntry = {
        el: viewEl,
        lastParamsKey: paramsKey,
      };
      viewsMap.set(mod.id, newEntry);

      try {
        const modLoaded = await loader();
        if (cancelled) return;
        viewEl.replaceChildren();
        ctx.params = params;
        const dispose = modLoaded.mount(viewEl, ctx);
        newEntry.dispose = dispose;
        viewEl.classList.add("active");
        workEl.className = mod.full ? "full" : "";
        currentAppRef.current = mod.id;
      } catch (err) {
        console.error(err);
        const p = document.createElement("p");
        p.className = "err";
        p.style.padding = "20px";
        p.textContent = `Không tải được ứng dụng: ${String(err)}`;
        viewEl.replaceChildren(p);
      }
    };

    fetch("/sites/hoahoc-lab/hoa_core.wasm")
      .then((res) => HoaCore.create(res))
      .then(async (wasmCore) => {
        if (cancelled) return;
        const ctx: HoaAppContext = {
          chem: wasmCore as unknown as HoaAppContext["chem"],
          elements: wasmCore.elements(),
          params: {},
          goto: (appId: string, params?: Record<string, string>) => {
            navigateTo(appId, params);
          },
        };
        ctxRef.current = ctx;
        (window as unknown as { __hoa: HoaAppContext }).__hoa = ctx;
        await syncRoute();
        toast("Chào mừng bạn đến với CT99-CHEMISTRY!");
      })
      .catch((err) => {
        console.error("Lỗi khởi động WASM:", err);
      });

    const onHashChange = () => {
      void syncRoute();
    };
    window.addEventListener("hashchange", onHashChange);

    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" &&
          tag !== "INPUT" &&
          tag !== "TEXTAREA" &&
          tag !== "SELECT")
      ) {
        e.preventDefault();
        if (ctxRef.current) {
          openCommandPalette(ctxRef.current);
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("keydown", onKeyDown);
      viewsMap.forEach((entry) => {
        if (typeof entry.dispose === "function") {
          try {
            entry.dispose();
          } catch {
            // ignore
          }
        }
      });
      viewsMap.clear();
    };
  }, [navigateTo, parseHash]);

  const handleToggleTheme = () => {
    const nextTheme =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem("hoa-theme", nextTheme);
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event("themechange"));
  };

  const groups: Array<{ group: string; items: typeof NAV_MODULES }> = [];
  for (const mod of NAV_MODULES) {
    if (mod.hidden) continue;
    const last = groups[groups.length - 1];
    if (!last || last.group !== mod.group) {
      groups.push({ group: mod.group, items: [mod] });
    } else {
      last.items.push(mod);
    }
  }

  return (
    <>
      <div id="app">
        <aside id="nav" aria-label="Điều hướng chính">
          <div className="brand">
            <span
              className="logo"
              dangerouslySetInnerHTML={{ __html: renderIconSvg("atom", 26) }}
            />
            <span>
              CT99-CHEMISTRY
              <small>Thế giới Hóa học phổ thông</small>
            </span>
          </div>

          <button
            type="button"
            className="navsearch"
            onClick={() => {
              if (ctxRef.current) {
                openCommandPalette(ctxRef.current);
              }
            }}
          >
            <span
              dangerouslySetInnerHTML={{ __html: renderIconSvg("search", 18) }}
            />
            <span>Tìm kiếm thông minh…</span>
            <kbd>⌘K</kbd>
          </button>

          {groups.map((grp) => (
            <React.Fragment key={grp.group}>
              <div className="group">{grp.group}</div>
              {grp.items.map((mod) => {
                const isOn = activeAppId === mod.id;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    data-id={mod.id}
                    className={isOn ? "on" : undefined}
                    style={{ "--c": mod.color } as React.CSSProperties}
                    onClick={() => {
                      navigateTo(mod.id);
                    }}
                  >
                    <span
                      className="ic"
                      dangerouslySetInnerHTML={{
                        __html: renderIconSvg(mod.ic, 19),
                      }}
                    />
                    {mod.name}
                  </button>
                );
              })}
            </React.Fragment>
          ))}

          <div className="group">Hệ thống</div>
          <button type="button" onClick={handleToggleTheme}>
            <span
              className="ic"
              dangerouslySetInnerHTML={{ __html: renderIconSvg("sun", 19) }}
            />
            Giao diện sáng / tối
          </button>

          <div className="group">Tác giả &amp; Kết nối</div>
          <div className="nav-author-card">
            <div className="nav-author-head">
              <div className="nav-author-avatar">
                🧑‍🏫
                <span
                  className="nav-author-pulse"
                  title="Tác giả đang hoạt động"
                />
              </div>
              <div className="nav-author-meta">
                <div className="nav-author-name">CT99</div>
                <div className="nav-author-sub">THPT • 0848678269</div>
              </div>
            </div>
            <div className="nav-author-btns">
              <a
                href="https://www.facebook.com/token.neverdie"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-author-fb-btn"
                title="Kết nối Facebook với CT99"
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
                  }}
                />
                Facebook
              </a>
              <button
                type="button"
                className="nav-author-coffee-btn"
                title="Thông tin tác giả & ủng hộ dự án"
                onClick={() => openAuthorModal()}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: renderIconSvg("coffee", 14),
                  }}
                />
                Cà phê ☕
              </button>
            </div>
          </div>

          <div className="nav-app-group">
            <div className="group">Ứng dụng máy &amp; Mobile</div>
            <button
              type="button"
              id="pwa-install-btn"
              className="installbtn"
              title="Cài CT99-CHEMISTRY lên máy tính hoặc điện thoại để chạy ngoại tuyến mượt mà"
              onClick={() =>
                toast(
                  "Mở menu trình duyệt → «Cài đặt trang dưới dạng ứng dụng» để dùng ngoại tuyến ✨"
                )
              }
            >
              <span
                className="ic"
                dangerouslySetInnerHTML={{
                  __html: renderIconSvg("download", 19),
                }}
              />
              <span>Cài ứng dụng CT99-CHEMISTRY</span>
            </button>
          </div>
        </aside>

        <main id="main">
          <div id="work" className={isFullWork ? "full" : ""} ref={workRef} />
        </main>
      </div>

      <div id="toast" role="status" aria-live="polite" />
    </>
  );
}
