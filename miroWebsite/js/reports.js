export async function initReports() {
  let currentIndex = 0;
  let reports = [];

  async function fetchReports() {
    try {
      const res = await fetch(
        "https://6877e1f4dba809d901f14380.mockapi.io/reports"
      );

      reports = await res.json();
      if (reports.length > 0) updateBanner();
    } catch (err) {
      console.error("Failed to fetch reports", err);
    }
  }

  function updateBanner() {
    const report = reports[currentIndex];
    console.log("Current Report:", report); // 👈 kjo linjë

    document.getElementById("report-title").textContent = report.title;
    document.getElementById("report-subtitle").textContent = report.subtitle;
    document.getElementById("report-desc").textContent = report.desc;
    document.getElementById("report-link").href = report.link;

    currentIndex = (currentIndex + 1) % reports.length;
  }

  await fetchReports();
  setInterval(updateBanner, 5000);
}
