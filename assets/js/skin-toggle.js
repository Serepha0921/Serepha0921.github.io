document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("skin-toggle");
    const skinLink = document.getElementById("skin-stylesheet");
    const icon = document.getElementById("skin-icon");

    if (!toggleBtn || !skinLink) return;
  
    const getSkinName = (href) => {
      return href.includes("dark") ? "dark" : "main";
    };
  
    const setSkin = (skin) => {
      skinLink.setAttribute("href", `/assets/css/${skin}.css`);
      if (icon) {
        icon.className = skin === "dark" ? "fas fa-lightbulb" : "far fa-lightbulb";
      }
      localStorage.setItem("skin", skin);
    };
  
    const savedSkin = localStorage.getItem("skin") || "main";
    setSkin(savedSkin);
  
    toggleBtn.addEventListener("click", () => {
      const current = getSkinName(skinLink.getAttribute("href"));
      const next = current === "dark" ? "main" : "dark";
      setSkin(next);
    });
  });