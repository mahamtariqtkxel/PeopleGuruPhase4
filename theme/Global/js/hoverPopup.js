const popUp = document.querySelector(".hover-profile-dropdown");
profilePictures = document.querySelectorAll(
  ".profile-button.profile-description"
);
const main = document.querySelector(".main-section-wrapper");
main.style.overflow = "auto";

profilePictures.forEach((picture) => {
  picture.addEventListener("mouseenter", function (e) {
    if (e.target === picture) {
      var offSet = picture.getBoundingClientRect();
      popUp.classList.add("show");
      if (offSet.left > 700) {
        popUp.style.left = `${offSet.x - 200}px`;
      } else {
        popUp.style.left = `${offSet.x}px`;
      }
      if (offSet.top > 400) {
        popUp.style.top = `${offSet.bottom - 490}px`;
      } else {
        popUp.style.top = `${offSet.top + 60}px`;
      }
      popUp.style.transform = `translate(${offSet.x}, ${offSet.y})`;
    }

    popUp.addEventListener("mouseenter", function (e) {
      popUp.classList.add("show");
    });
    popUp.addEventListener("mouseleave", function (e) {
      popUp.classList.remove("show");
    });
  });
  picture.addEventListener("mouseleave", function (e) {
    if (e.target !== popUp) {
      console.log(e.target);
      popUp.classList.remove("show");
    }
  });
  main.onscroll = (e) => {
    popUp.classList.remove("show");
  };
});
