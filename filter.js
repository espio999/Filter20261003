javascript:(async function(){
  // 例：末尾に ?v=日付 や ?t=タイムスタンプ を追加してキャッシュを回避する
  const cacheBuster = `?t=${Date.now()}`;
  const GitHubURL = `https://espio999.github.io/Hatena-PARKS-Filter/`;
  const jsDelivrURL = `https://cdn.jsdelivr.net/gh/espio999/Hatena-PARKS-Filter@main/`;

  const panelCSS = `panel.css`;
  const panelHTML = `panel.html`;
  const panelScript = `panel.js`;

  //const CSS_URL = `${GitHubURL}${panelCSS}${cacheBuster}`;
  const HTML_URL = `${GitHubURL}${panelHTML}${cacheBuster}`;
  
  const CSS_URL = `${jsDelivrURL}${panelCSS}${cacheBuster}`;
  //const HTML_URL = `${jsDelivrURL}${panelHTML}${cacheBuster}`;
  
  const script = document.createElement("script");
  //script.src = `${GitHubURL}${panelScript}${cacheBuster}`;
  script.src = `${jsDelivrURL}${panelScript}${cacheBuster}`;
  
  const panel = document.getElementById("parks-filter-panel");
  if (panel) {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
    return;
  }

  // 1. 外部CSSの読み込み
  if (!document.querySelector(`link[href="${CSS_URL}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CSS_URL;
    document.head.appendChild(link);
  }

  // 2. 外部HTMLの非同期取得
  try {
    const response = await fetch(HTML_URL);
    if (!response.ok) throw new Error('HTMLの取得に失敗しました');
    const htmlText = await response.text();

    const container = document.createElement("div");
    container.id = "parks-filter-panel";
    container.innerHTML = htmlText;
    document.body.appendChild(container);
    document.head.appendChild(script);

    // イベントハンドラとロジックの定義
    function getParentItem(node) {
      let current = node;
      while (current && current !== document.body) {
        if (current.tagName === "LI" || current.tagName === "ARTICLE" || 
           (current.className && typeof current.className === "string" && 
           (current.className.includes("item") || current.className.includes("Item")))) {
          return current;
        }
        current = current.parentElement;
      }
      return node.parentElement;
    }

    function checkMatch(targetText, keyword, mode) {
      if (mode === "off") return true;
      const keywords = keyword.split(/[,，]/).map(k => k.trim().toLowerCase()).filter(k => k.length > 0);
      if (keywords.length === 0) return true;
      const matched = keywords.some(k => targetText.includes(k));
      return mode === "include" ? matched : !matched;
    }

    function applyFilter() {
      const parkKw = document.getElementById("pf-park-kw").value;
      const parkMode = document.querySelector('input[name="pf-park-mode"]:checked').value;
      const authorKw = document.getElementById("pf-author-kw").value;
      const authorMode = document.querySelector('input[name="pf-author-mode"]:checked').value;
      const contextKw = document.getElementById("pf-context-kw").value;
      const contextMode = document.querySelector('input[name="pf-context-mode"]:checked').value;

      const items = new Set();
      document.querySelectorAll('[class*="_parkName_"],[class*="_authorName_"], [class*="_postContextRow_"]').forEach(el => items.add(getParentItem(el)));

      items.forEach(item => {
        if (!item) return;
        const parkEl = item.querySelector('[class*="_parkName_"]');
        const authorEl = item.querySelector('[class*="_authorName_"]');
        const contextEl = item.querySelector('[class*="_postContextRow_"]');

        const parkText = parkEl ? parkEl.textContent.trim().toLowerCase() : "";
        const authorText = authorEl ? authorEl.textContent.trim().toLowerCase() : "";
        const contextText = contextEl ? contextEl.textContent.trim().toLowerCase() : "";

        const isVisible = checkMatch(parkText, parkKw, parkMode) && 
                          checkMatch(authorText, authorKw, authorMode) && 
                          checkMatch(contextText, contextKw, contextMode);
        item.style.display = isVisible ? "" : "none";
      });
    }

    let isUpdating = false;
    document.getElementById("pf-close").onclick = () => container.style.display = "none";
    document.getElementById("pf-apply").onclick = applyFilter;
    document.getElementById("pf-reset").onclick = () => {
      document.getElementById("pf-park-kw").value = "";
      document.querySelector('input[name="pf-park-mode"][value="off"]').checked = true;
      document.getElementById("pf-author-kw").value = "";
      document.querySelector('input[name="pf-author-mode"][value="off"]').checked = true;
      document.getElementById("pf-context-kw").value = "";
      document.querySelector('input[name="pf-context-mode"][value="off"]').checked = true;
      applyFilter();
    };

    new MutationObserver(() => {
      if (!isUpdating) {
        isUpdating = true;
        requestAnimationFrame(() => {
          applyFilter();
          isUpdating = false;
        });
      }
    }).observe(document.body, { childList: true, subtree: true });

  } catch (err) {
    console.error("フィルターパネルのロードエラー:", err);
  }
})();