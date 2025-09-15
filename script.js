let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
  let { link, title, description } = result;

  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");

  let titleEl = document.createElement("a");
  titleEl.href = link;
  titleEl.target = "_blank";
  titleEl.textContent = title;
  titleEl.classList.add("result-title");
  resultItemEl.appendChild(titleEl);

  resultItemEl.appendChild(document.createElement("br"));

  let urlEl = document.createElement("a");
  urlEl.classList.add("result-url");
  urlEl.href = link;
  urlEl.target = "_blank";
  urlEl.textContent = link;
  resultItemEl.appendChild(urlEl);

  resultItemEl.appendChild(document.createElement("br"));

  let descriptionEl = document.createElement("p");
  descriptionEl.classList.add("link-description");
  descriptionEl.textContent = description;
  resultItemEl.appendChild(descriptionEl);

  searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
  spinnerEl.classList.add("d-none");

  for (let result of searchResults) {
    createAndAppendSearchResult(result);
  }
}

function searchWikipedia(event) {
  if (event.key === "Enter") {
    spinnerEl.classList.remove("d-none");
    searchResultsEl.textContent = "";

    let searchInput = searchInputEl.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

    fetch(url)
      .then(response => response.json())
      .then(jsonData => {
        let { search_results } = jsonData;
        displayResults(search_results);
      })
      .catch(error => {
        spinnerEl.classList.add("d-none");
        searchResultsEl.innerHTML =
          "<p style='color:red;'>Failed to fetch results. Please try again.</p>";
        console.error("Error fetching results:", error);
      });
  }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
