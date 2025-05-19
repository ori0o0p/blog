document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll(".toggle-btn")

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target")
      const container = document.getElementById(`${targetId}-container`)

      if (container) {
        container.classList.toggle("expanded")
        this.setAttribute("aria-expanded", container.classList.contains("expanded"))
      }
    })
  })

})
