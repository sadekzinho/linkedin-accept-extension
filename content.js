(async () => {
  const settings = window.__linkedinAcceptorSettings || {};
  const BATCH_LIMIT = settings.batchLimit || 50;
  const CLICK_DELAY_MIN = settings.delayMin || 1200;
  const CLICK_DELAY_MAX = settings.delayMax || 2800;
  const SCROLL_PAUSE = 2000;
  const MAX_EMPTY_SCROLLS = 5;

  let totalClicked = 0;
  let totalFailed = 0;

  window.__linkedinAcceptorCancel = false;

  function isCancelled() {
    return window.__linkedinAcceptorCancel === true;
  }

  // --- Floating status banner ---
  const banner = document.createElement("div");
  banner.id = "__linkedin-acceptor-banner";
  Object.assign(banner.style, {
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: "999999",
    background: "#0A66C2",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    fontWeight: "bold",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "opacity 0.3s",
  });
  document.getElementById("__linkedin-acceptor-banner")?.remove();
  document.body.appendChild(banner);

  function updateBanner(text) {
    banner.textContent = text;
  }

  function removeBanner() {
    banner.style.opacity = "0";
    setTimeout(() => banner.remove(), 400);
  }

  function randomDelay(min, max) {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function getAcceptButtons() {
    return Array.from(document.querySelectorAll("button")).filter((btn) => {
      const text = btn.textContent.trim();
      return text === "Accept" || text === "Akceptuj";
    });
  }

  function showSummary(reason) {
    const lines = ["--- Podsumowanie batcha ---"];
    lines.push("Zaakceptowano: " + totalClicked);
    if (totalFailed > 0) {
      lines.push("Nieudane kliknięcia: " + totalFailed);
    }
    lines.push(
      "Status: " +
        (totalFailed === 0
          ? "OK — wszystko poszło pomyślnie"
          : "Częściowy sukces (niektóre kliknięcia nie zadziałały)")
    );
    lines.push("");
    lines.push("Ustawienia: delay " + CLICK_DELAY_MIN + "-" + CLICK_DELAY_MAX + "ms, limit " + BATCH_LIMIT);
    lines.push("");

    if (reason === "cancelled") {
      lines.push("Zatrzymano ręcznie przez użytkownika.");
    } else if (reason === "limit") {
      lines.push(
        "Osiągnięto limit " + BATCH_LIMIT + " na jedną sesję.\nOdczekaj chwilę i kliknij ikonę rozszerzenia ponownie."
      );
    } else {
      lines.push("Nie znaleziono więcej zaproszeń na stronie.");
    }

    alert(lines.join("\n"));
  }

  // --- Scroll to top first ---
  window.scrollTo({ top: 0, behavior: "smooth" });
  await new Promise((resolve) => setTimeout(resolve, 800));
  updateBanner("Start — akceptowanie zaproszeń od góry... (limit: " + BATCH_LIMIT + ")");

  // --- Main loop: accept visible buttons, then scroll down for more ---
  let emptyScrolls = 0;

  while (totalClicked < BATCH_LIMIT && emptyScrolls < MAX_EMPTY_SCROLLS && !isCancelled()) {
    const buttons = getAcceptButtons();

    if (buttons.length === 0) {
      emptyScrolls++;
      updateBanner("Szukanie kolejnych... (scroll " + emptyScrolls + "/" + MAX_EMPTY_SCROLLS + ")");
      window.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" });
      await new Promise((resolve) => setTimeout(resolve, SCROLL_PAUSE));
      continue;
    }

    emptyScrolls = 0;

    for (const btn of buttons) {
      if (totalClicked >= BATCH_LIMIT || isCancelled()) break;

      btn.scrollIntoView({ behavior: "smooth", block: "center" });
      await randomDelay(400, 700);

      try {
        btn.click();
        totalClicked++;
        updateBanner("Akceptowanie... " + totalClicked + " / " + BATCH_LIMIT);
      } catch (e) {
        totalFailed++;
      }

      if (totalClicked < BATCH_LIMIT && !isCancelled()) {
        await randomDelay(CLICK_DELAY_MIN, CLICK_DELAY_MAX);
      }
    }

    if (totalClicked < BATCH_LIMIT && !isCancelled()) {
      window.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" });
      await new Promise((resolve) => setTimeout(resolve, SCROLL_PAUSE));
    }
  }

  // --- Summary ---
  removeBanner();

  if (isCancelled()) {
    showSummary("cancelled");
  } else if (totalClicked === 0) {
    alert(
      "Nie znaleziono zaproszeń do zaakceptowania.\n\nUpewnij się, że jesteś na stronie zarządzania zaproszeniami LinkedIn."
    );
  } else if (totalClicked >= BATCH_LIMIT) {
    showSummary("limit");
  } else {
    showSummary("done");
  }
})();
