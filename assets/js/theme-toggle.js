// assets/js/theme-toggle.js
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("theme-toggle"); // 버튼 ID가 이것인지 확인
  const htmlElement = document.documentElement; // body 대신 html 요소를 대상으로 합니다.

  // FOUC 방지 인라인 스크립트가 이미 초기 테마를 <html_element>에 설정했으므로,
  // 여기서는 주로 클릭 이벤트 처리에 집중합니다.
  // 페이지 로드 시 버튼 아이콘 상태 업데이트 등은 필요에 따라 추가할 수 있습니다.

  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
      // 현재 다크 모드인지 확인 (html 요소 기준)
      if (htmlElement.classList.contains("dark-theme")) {
        // 라이트 모드로 전환
        htmlElement.classList.remove("dark-theme");
        // htmlElement.classList.add("light-theme"); // 선택 사항: 'light-theme' 클래스가 다른 스타일에 필요하다면 추가
        localStorage.setItem("theme", "light");
      } else {
        // 다크 모드로 전환
        // htmlElement.classList.remove("light-theme"); // 선택 사항: 'light-theme' 클래스를 사용했다면 제거
        htmlElement.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
      }

      // (디버깅용) 현재 html 클래스와 localStorage 상태 확인
      // console.log("HTML Classes:", htmlElement.className);
      // console.log("LocalStorage Theme:", localStorage.getItem("theme"));
    });
  } else {
    console.warn("ID가 'theme-toggle'인 테마 토글 버튼을 찾을 수 없습니다.");
  }

  // 선택 사항: 페이지 로드 시 현재 테마에 맞춰 토글 버튼의 아이콘(예: 해/달)을 업데이트하는 로직
  // 예: updateToggleButtonIcon();
  // function updateToggleButtonIcon() {
  //   if (htmlElement.classList.contains('dark-theme')) {
  //     // 달 아이콘 숨기고, 해 아이콘 표시
  //   } else {
  //     // 해 아이콘 숨기고, 달 아이콘 표시
  //   }
  // }
  // // 초기 로드 시 아이콘 업데이트
  // updateToggleButtonIcon();
  // // 클릭 시에도 아이콘 업데이트 (위 click 이벤트 핸들러 내부에 추가)
  // themeToggleButton.addEventListener("click", () => { /* ... */ updateToggleButtonIcon(); });

});