const searchInput = document.getElementById("search-input");
const searchForm = document.querySelector(".search-bar form");

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

self.addEventListener("fetch", (event) => {
  // Handle navigation requests (like /BE_Checklist/)
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("/BE_Checklist/index.html").then((response) => {
        return response || fetch(event.request);
      })
    );
  } else {
    // Handle normal file requests (CSS, JS, PDFs)
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});


// PWA SERVICE WORKER REGISTRATION
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((err) => console.log("Service Worker failed:", err));
}

