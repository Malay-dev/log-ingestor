let intervalId = null;
window.addEventListener("load", async () => {
  const initialLogs = await fetchLogs("/logs");
  renderData(initialLogs);
});

async function fetchLogs() {
  try {
    const response = await fetch(`/logs`);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching logs:", error.message);
    return [];
  }
}
function startAutoRefresh() {
  intervalId = setInterval(async () => {
    const logsAfterDelay = await fetchLogs("/logs?limit=50");
    renderData(logsAfterDelay);
  }, 3000);
}
function stopAutoRefresh() {
  clearInterval(intervalId);
}
const toggleButtonAuto = document.getElementById("toggleFetchLogs");
toggleButtonAuto.addEventListener("click", () => {
  if (intervalId) {
    stopAutoRefresh();
    intervalId = null;
    toggleButtonAuto.textContent = "Start Auto-Refresh";
  } else {
    startAutoRefresh();
    toggleButtonAuto.textContent = "Stop Auto-Refresh";
  }
});
const refreshButton = document.getElementById("refreshLogs");
refreshButton.addEventListener("click", async () => {
  const refreshedLogs = await fetchLogs("/logs?limit=50");
  renderData(refreshedLogs);
});
// JavaScript code for handling form submission, fetching data, and pagination
const filterForm = document.getElementById("filterForm");
const logDataElement = document.getElementById("logData");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const currentPageElement = document.getElementById("currentPage");
let mode = "single_filter";

filterForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(filterForm);
  const filteredData = await fetchFilteredData(formData);
  renderData(filteredData);
});

async function fetchFilteredData(formData) {
  const filteredFormData = Array.from(formData.entries()).reduce(
    (acc, [key, value]) => {
      if (value !== "") {
        acc.append(key, value);
      }
      return acc;
    },
    new FormData()
  );
  try {
    let response;
    if (mode === "single_filter") {
      const queryString = new URLSearchParams(filteredFormData).toString(); // Convert form data to query string
      response = await fetch(`/logs/filter?${queryString}`); // Construct URL with query parameters
    } else {
      filteredFormData.delete("filterField");
      filteredFormData.delete("filterValue");
      const body = Object.fromEntries(filteredFormData);
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      response = await fetch(`/logs/filter`, options);
    }
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data?.result;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}

function renderData(data) {
  logDataElement.innerHTML = "";
  data.forEach((log) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${log.level}</td>
          <td>${log.message}</td>
          <td>${log.resourceId}</td>
          <td>${log.timestamp}</td>
          <td>${log.traceId}</td>
          <td>${log.spanId}</td>
          <td>${log.commit}</td>
          <td>${JSON.stringify(log.metadata)}</td>
          <!-- Render other fields -->
        `;
    logDataElement.appendChild(row);
  });
}

const toggleButton = document.getElementById("toggleFilterType");
const singleFilter = document.getElementById("singleFilter");
const multipleFilter = document.getElementById("multipleFilter");

toggleButton.addEventListener("click", () => {
  if (singleFilter.style.display === "none") {
    singleFilter.style.display = "block";
    multipleFilter.style.display = "none";
    mode = "single_filter";
  } else {
    singleFilter.style.display = "none";
    multipleFilter.style.display = "block";
    mode = "multiple_filter";
  }
});
