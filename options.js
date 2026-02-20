const DEFAULTS = {
  delayMin: 1200,
  delayMax: 2800,
  batchLimit: 50,
};

const $delayMin = document.getElementById("delayMin");
const $delayMax = document.getElementById("delayMax");
const $batchLimit = document.getElementById("batchLimit");
const $status = document.getElementById("status");

// Load saved settings
chrome.storage.sync.get(DEFAULTS, (settings) => {
  $delayMin.value = settings.delayMin;
  $delayMax.value = settings.delayMax;
  $batchLimit.value = settings.batchLimit;
});

document.getElementById("save").addEventListener("click", () => {
  const delayMin = parseInt($delayMin.value, 10);
  const delayMax = parseInt($delayMax.value, 10);
  const batchLimit = parseInt($batchLimit.value, 10);

  // Validation
  if (delayMin < 300) {
    $status.textContent = "Min opóźnienie nie może być mniejsze niż 300ms";
    $status.style.color = "#c62828";
    return;
  }
  if (delayMax <= delayMin) {
    $status.textContent = "Max opóźnienie musi być większe niż min";
    $status.style.color = "#c62828";
    return;
  }
  if (batchLimit < 1) {
    $status.textContent = "Limit musi wynosić co najmniej 1";
    $status.style.color = "#c62828";
    return;
  }

  chrome.storage.sync.set({ delayMin, delayMax, batchLimit }, () => {
    $status.style.color = "#2e7d32";
    $status.textContent = "Zapisano!";
    setTimeout(() => { $status.textContent = ""; }, 2000);
  });
});
