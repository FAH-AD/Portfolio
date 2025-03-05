const mousecursor = () => {
  const cursorInner = document.querySelector(".cursor-inner"),
    cursorOuter = document.querySelector(".cursor-outer");

  let n, i = 0, o = false;

  // Track mouse movement
  window.onmousemove = function (s) {
    if (!o) {
      cursorOuter.style.transform = `translate(${s.clientX}px, ${s.clientY}px)`;
    }
    cursorInner.style.transform = `translate(${s.clientX}px, ${s.clientY}px)`;
    n = s.clientY;
    i = s.clientX;
  };

  // Function to add hover effect
  const addHoverEffect = () => {
    cursorInner.classList.add("cursor-hover");
    cursorOuter.classList.add("cursor-hover");
  };

  // Function to remove hover effect
  const removeHoverEffect = () => {
    cursorInner.classList.remove("cursor-hover");
    cursorOuter.classList.remove("cursor-hover");
  };

  // Remove all previous event listeners to prevent duplication
  document.querySelectorAll(".cursor-pointer, a").forEach((item) => {
    item.removeEventListener("mouseover", addHoverEffect);
    item.removeEventListener("mouseout", removeHoverEffect);
  });

  // Attach event listeners dynamically
  document.querySelectorAll(".cursor-pointer, a").forEach((item) => {
    item.addEventListener("mouseover", addHoverEffect);
    item.addEventListener("mouseout", removeHoverEffect);
  });

  // Reset cursor state when switching pages
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      removeHoverEffect();
    }
  });

  cursorInner.style.visibility = "visible";
  cursorOuter.style.visibility = "visible";
};

export default mousecursor;
