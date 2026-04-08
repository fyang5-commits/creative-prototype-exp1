document.addEventListener("DOMContentLoaded", function () {
  // Nav active state on click
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((item) => item.classList.remove("is-active"));
      this.classList.add("is-active");
    });
  });

  // Workflow interaction
  const focusItems = Array.from(document.querySelectorAll(".workflow-focus-item"));

  if (focusItems.length) {
    let currentIndex = 0;
    let autoRotate = null;
    const rotateDelay = 2800;

    function setActive(index) {
      currentIndex = index;

      focusItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
      });
    }

    function stopAutoRotate() {
      if (autoRotate) {
        clearInterval(autoRotate);
        autoRotate = null;
      }
    }

    function startAutoRotate() {
      stopAutoRotate();
      autoRotate = setInterval(() => {
        const nextIndex = (currentIndex + 1) % focusItems.length;
        setActive(nextIndex);
      }, rotateDelay);
    }

    focusItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        setActive(index);
        startAutoRotate();
      });

      item.addEventListener("mouseenter", () => {
        stopAutoRotate();
        setActive(index);
      });

      item.addEventListener("mouseleave", () => {
        startAutoRotate();
      });
    });

    const focusPanel = document.querySelector(".workflow-focus-panel");
    if (focusPanel) {
      focusPanel.addEventListener("mouseenter", stopAutoRotate);
      focusPanel.addEventListener("mouseleave", startAutoRotate);
    }

    setActive(currentIndex);
    startAutoRotate();
  }

  // Ritual accordion icon state
  const ritualItems = document.querySelectorAll(".ritual-item");

  ritualItems.forEach((item) => {
    const summary = item.querySelector("summary");
    const plus = item.querySelector(".plus");

    function updatePlus() {
      if (!plus) return;
      plus.textContent = item.hasAttribute("open") ? "−" : "+";
    }

    updatePlus();

    if (summary) {
      summary.addEventListener("click", function () {
        setTimeout(updatePlus, 10);
      });
    }
  });

  // Principle cards hover
  const principleCards = document.querySelectorAll(".principle-card");
  principleCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-4px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  // General card hover
  const hoverCards = document.querySelectorAll(
    ".panel-card, .guard-card, .failure-card, .manifesto, .content-sheet, .visual-sheet"
  );

  hoverCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-3px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  // Responsibility table row hover
  const tableRows = document.querySelectorAll(".responsibility table tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      row.style.background = "rgba(31, 131, 224, 0.04)";
    });

    row.addEventListener("mouseleave", () => {
      row.style.background = "transparent";
    });
  });

  // Guard item hover
  const guardItems = document.querySelectorAll(".guard-item");
  guardItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateX(4px)";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateX(0)";
    });
  });

  // Button hover
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      if (btn.classList.contains("primary")) {
        btn.style.transform = "translateY(-2px)";
      } else {
        btn.style.background = "#111111";
        btn.style.color = "#ffffff";
        btn.style.transform = "translateY(-2px)";
      }
    });

    btn.addEventListener("mouseleave", () => {
      if (btn.classList.contains("primary")) {
        btn.style.transform = "translateY(0)";
      } else {
        btn.style.background = "transparent";
        btn.style.color = "";
        btn.style.transform = "translateY(0)";
      }
    });
  });
});