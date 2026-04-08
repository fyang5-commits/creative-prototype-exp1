document.addEventListener("DOMContentLoaded", function () {
  const items = Array.from(document.querySelectorAll(".workflow-item"));
  const panels = Array.from(document.querySelectorAll(".workflow-panel"));
  const progressBar = document.getElementById("workflowProgressBar");

  if (!items.length || !panels.length || !progressBar) return;

  let currentIndex = 1;
  let autoRotate = null;
  const stepWidth = 62; // 调整这数值可以微调上面黑线移动距离
  const rotateDelay = 2800;

  function setActive(index) {
    currentIndex = index;

    items.forEach((item, i) => {
      item.classList.toggle("is-active", i === index);
    });

    panels.forEach((panel, i) => {
      panel.classList.toggle("is-active", i === index);
    });

    progressBar.style.transform = `translateX(${index * stepWidth}px)`;
  }

  function startAutoRotate() {
    stopAutoRotate();
    autoRotate = setInterval(() => {
      const nextIndex = (currentIndex + 1) % items.length;
      setActive(nextIndex);
    }, rotateDelay);
  }

  function stopAutoRotate() {
    if (autoRotate) {
      clearInterval(autoRotate);
      autoRotate = null;
    }
  }

  items.forEach((item, index) => {
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

  const workflowRight = document.querySelector(".workflow-right");
  if (workflowRight) {
    workflowRight.addEventListener("mouseenter", stopAutoRotate);
    workflowRight.addEventListener("mouseleave", startAutoRotate);
  }

  setActive(currentIndex);
  startAutoRotate();
});