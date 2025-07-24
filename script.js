const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const rows = document.querySelectorAll("table tbody tr");

  rows.forEach((row) => {
    // Keep table captions visible always
    if (row.classList.contains("table-caption")) {
      row.style.display = "";
      return;
    }

    let matchFound = false;

    row.querySelectorAll("td").forEach((cell) => {
      const rawText = cell.textContent;

      // Save original HTML once
      if (!cell.dataset.originalHtml) {
        cell.dataset.originalHtml = cell.innerHTML;
      }

      // Highlight if match found
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

    // Show or hide based on match
    row.style.display = matchFound || !filter ? "" : "none";
  });
});
