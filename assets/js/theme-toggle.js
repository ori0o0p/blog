document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

  // 저장된 테마 확인 또는 시스템 설정 사용
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-theme")
  } else {
    document.body.classList.add("light-theme")
  }

  // 테마 토글 버튼 클릭 이벤트
  themeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.replace("dark-theme", "light-theme")
      localStorage.setItem("theme", "light")
    } else {
      document.body.classList.replace("light-theme", "dark-theme")
      localStorage.setItem("theme", "dark")
    }
  })
})
