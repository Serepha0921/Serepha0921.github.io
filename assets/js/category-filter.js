document.addEventListener("DOMContentLoaded", function () {  
    const buttons = document.querySelectorAll(".taxonomy__index a");
    const sections = document.querySelectorAll(".taxonomy__section");
  
    if (!buttons.length || !sections.length) return;
  
    function showOnly(id) {
      if (!id) return;
      sections.forEach(section => {
        section.style.display = (section.id === id) ? "block" : "none";
      });
    }
  
    // run filter when user click the button
    buttons.forEach(button => {
      button.addEventListener("click", function (e) {
        const href = button.getAttribute("href");
        const id = href.replace("#", "");
        showOnly(id); // 바로 필터링
      });
    });
  
    // Detected when has changed
    window.addEventListener("hashchange", () => {
      const current = window.location.hash.replace("#", "");
      if (current) showOnly(current);
    });
  
    // first encounter
    const current = window.location.hash.replace("#", "");
    if (current) showOnly(current);
  });
  