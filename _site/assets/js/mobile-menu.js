document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const sidebar = document.querySelector(".sidebar")

  mobileMenuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("mobile-visible")
    this.setAttribute("aria-expanded", sidebar.classList.contains("mobile-visible"))
  })

  // 화면 크기가 변경될 때 모바일 메뉴 숨기기
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && sidebar.classList.contains("mobile-visible")) {
      sidebar.classList.remove("mobile-visible")
      mobileMenuToggle.setAttribute("aria-expanded", "false")
    }
  })
})
