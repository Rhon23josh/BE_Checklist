const searchInput = document.getElementById("search-input");
const searchForm = document.querySelector(".search-bar form");
const CACHE_NAME = "be-checklist-v1";
const urlsToCache = [
  "/BE_Checklist/",         // main page
  "/BE_Checklist/index.html",
  "/BE_Checklist/styles.css",
  "/BE_Checklist/script.js",
  // Add PDFs if you want them offline:
  // "/BE_Checklist/Policies/BE_1_Implementation of Existing Security Measures.pdf",
  // "/BE_Checklist/Policies/BE_2_Cash Handling Guidelines_Reiteration.pdf",
    // "/BE_Checklist/Policies/BE_3_Disbursement and Liquidation of the Fund.pdf",
    // "/BE_Checklist/Policies/BE_4_Cash Within EO Common Areas.pdf",
    // "/BE_Checklist/Policies/BE_5_Sales Invoice - Signaure of Branch Managers.pdf",
    // "/BE_Checklist/Policies/BE_6_Memo on the Disposal of Blue Copies.pdf",
    // "/BE_Checklist/Policies/BE_7_Guidelines for Accounts Receivables.pdf",
    // "/BE_Checklist/Policies/BE_8_Accounts Receivables.pdf",
    // "/BE_Checklist/Policies/BE_9_Conditions on Deposit Requirement.pdf",
    // "/BE_Checklist/Policies/BE_11_ Guidelines in Forfeiture of Accounts Receivable.pdf",
    // "/BE_Checklist/Policies/BE_13_RETURNING OF ENGINEERING ITEMS TO ED - UPDATED.pdf",
    // "/BE_Checklist/Policies/BE_13_Fixed assets disposal.pdf",
    // "/BE_Checklist/Policies/BE_14_EO-ED STOCK TRANSFER TO ENGINEERING - OPTICAL EQUIPMENT.pdf",
    // "/BE_Checklist/Policies/BE_14_Fixed Asset Transaction.pdf",
    // "/BE_Checklist/Policies/BE_15_COMPANY PHONE POLICY.pdf",
    // "/BE_Checklist/Policies/BE_16_Guidelines for Handling Damaged Lenses.pdf",
    // "/BE_Checklist/Policies/BE_16_Unposted and Un-uploaded DRs.pdf",
    // "/BE_Checklist/Policies/BE_17_Policy on MB.pdf",
    // "/BE_Checklist/Policies/Be_18_Reiteration of Damage Policy.pdf",
    // "/BE_Checklist/Policies/BE_19_CL Expiration Policy.pdf",
    // "/BE_Checklist/Policies/BE_20_Employee Product Purchase Benefits .pdf",
    // "/BE_Checklist/Policies/BE_20_Memo on Reserved Items for EPPB (Internal Agreement).pdf",
    // "/BE_Checklist/Policies/BE_21_Strict Implementation of Existing Security Measures.pdf",
    // "/BE_Checklist/Policies/BE_22_2023 Policy on Stock Transfer of Merchandise  Merchandise Inventory.pdf",
  // "/BE_Checklist/Policies/BE_24_Lifetime Guarantee Card.pdf",
  // "/BE_Checklist/Policies/BE_26_COLLECTION DISPLAY GUIDELINES 2024.pdf",
  // "/BE_Checklist/Policies/BE_26_HOUSE BRAND MEMO.pdf",
  // "/BE_Checklist/Policies/BE_27_Operations Audit Mandate per Office of the President.pdf",
  // "/BE_Checklist/Policies/BE_28_RE Permits  Licenses.pdf",
  // "/BE_Checklist/Policies/BE_30_Standard Charging for Non Displaying of Monthly POPs.pdf",
  // "/BE_Checklist/Policies/BE_30_Amendment of Marketing Collaterals Guidelines.pdf",
  // "/BE_Checklist/Policies/BE_31_Prohibition on Displaying Duplicate Items.pdf",
  // "/BE_Checklist/Policies/BE_35_Spiel on CEG Processing Time.pdf",
  // "/BE_Checklist/Policies/BE_37_Encoding and submission of Corporate Acct.pdf",
  // "/BE_Checklist/Policies/BE_41_Timekeeping policy.pdf",
  // "/BE_Checklist/Policies/BE_54_Simplified Policy on Lens Only Transaction .pdf",
  // "/BE_Checklist/Policies/BE_55_Policy on Unclaimed Fully Paid Items.pdf",
  // "/BE_Checklist/Policies/Be_56_Reiteration of Damage Policy.pdf",
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

