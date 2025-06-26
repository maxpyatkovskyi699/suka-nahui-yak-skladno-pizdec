document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("header nav ul li a");
  const currentPage = window.location.pathname.split("/").pop().split(".")[0];

  navLinks.forEach((link) => {
    const pageName = link.getAttribute("data-page");
    if (pageName === currentPage) {
      link.classList.add("active");
    }
  });
});
