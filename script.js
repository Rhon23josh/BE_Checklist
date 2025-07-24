const searchInput = document.getElementById("search-input");
const searchForm = document.querySelector(".search-bar form");
const CACHE_NAME = "be-checklist-v1";
const urlsToCache = [
  "/BE_Checklist/",         // main page
  "/BE_Checklist/index.html",
  "/BE_Checklist/styles.css",
  "/BE_Checklist/script.js",
  // Add PDFs if you want them offline:
  // "/BE_Checklist/Policies/file1.pdf",
  // "/BE_Checklist/Policies/file2.pdf",
];

function runSearch() {
  const filter = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll("table tbody tr");

  rows.forEach((row) => {
    if (row.classList.contains("table-caption")) {
      row.style.display = "";
      return;
    }

    let matchFound = false;

    row.querySelectorAll("td").forEach((cell) => {
      const rawText = cell.textContent;

      if (!cell.dataset.originalHtml) {
        cell.dataset.originalHtml = cell.innerHTML;
      }

      if (filter && rawText.toLowerCase().includes(filter)) {
        matchFound = true;
        cell.innerHTML = rawText.replace(
          new RegExp(`(${filter})`, "gi"),
          "<mark>$1</mark>"
        );
      } else {
        cell.innerHTML = cell.dataset.originalHtml;
      }
    });

    row.style.display = matchFound || !filter ? "" : "none";
  });
}

// Run search when typing
searchInput.addEventListener("input", runSearch);

// Run search when clicking button (submit)
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  runSearch();
});

// Install event - cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});


// Fetch event - serve cached content
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If homepage requested, serve cached index.html
      if (!response && event.request.mode === "navigate") {
        return caches.match("/BE_Checklist/index.html");
      }
      return response || fetch(event.request);
    })
  );
});

// PWA SERVICE WORKER REGISTRATION
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((err) => console.log("Service Worker failed:", err));
}

