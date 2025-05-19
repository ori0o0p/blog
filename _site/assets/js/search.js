document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input")
  const searchResults = document.getElementById("search-results")
  let searchData

  // 검색 데이터 가져오기
  fetch("/search.json")
    .then((response) => response.json())
    .then((data) => {
      searchData = data
    })
    .catch((error) => {
      console.error("Error loading search data:", error)
    })

  // 검색 입력 이벤트
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim()

    if (!query || query.length < 2) {
      searchResults.innerHTML = ""
      return
    }

    if (!searchData) {
      searchResults.innerHTML = "<p>검색 데이터를 불러오는 중입니다...</p>"
      return
    }

    const results = searchData.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        (item.categories && item.categories.some((cat) => cat.toLowerCase().includes(query))) ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(query)))
      )
    })

    displayResults(results, query)
  })

  // 검색 결과 표시
  function displayResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = "<p>검색 결과가 없습니다.</p>"
      return
    }

    const resultsHtml = results
      .map((item) => {
        // 검색어 하이라이트
        const title = highlightText(item.title, query)
        const excerpt = highlightText(getExcerpt(item.content, query), query)

        return `
        <div class="search-result-item">
          <h2><a href="${item.url}">${title}</a></h2>
          <div class="search-result-meta">
            <time>${item.date}</time>
            ${
              item.categories
                ? `
              <span class="search-result-categories">
                ${item.categories.map((cat) => `<span class="tag">${cat}</span>`).join("")}
              </span>
            `
                : ""
            }
          </div>
          <div class="search-result-excerpt">${excerpt}</div>
        </div>
      `
      })
      .join("")

    searchResults.innerHTML = resultsHtml
  }

  // 텍스트에서 검색어 주변 내용 추출
  function getExcerpt(text, query) {
    const index = text.toLowerCase().indexOf(query.toLowerCase())
    if (index === -1) return text.slice(0, 150) + "..."

    const start = Math.max(0, index - 60)
    const end = Math.min(text.length, index + query.length + 60)
    return (start > 0 ? "..." : "") + text.slice(start, end) + (end < text.length ? "..." : "")
  }

  // 검색어 하이라이트
  function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, "gi")
    return text.replace(regex, "<mark>$1</mark>")
  }
})
