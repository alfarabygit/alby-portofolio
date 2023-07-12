/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  //when scroll is greater than 50 vh, add scroll header class to header tag
  if (this.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalButtons = document.querySelectorAll(".services__button"),
  modalClose = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalButtons.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach((mc, i) => {
  mc.addEventListener("click", () => {
    modalViews.forEach((mv, i) => {
      mv.classList.remove("active-modal");
    });
  });
});
/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup(".work__container", {
  selectors: {
    target: ".work__card",
  },
  animation: {
    duration: 300,
  },
});
/* Link active work */
const linkWork = document.querySelectorAll(".work__items");
function activeWork() {
  linkWork.forEach((l) => l.classList.remove("active-work"));
  this.classList.add("active-work");
}

linkWork.forEach((l) => l.addEventListener("click", activeWork));
/*=============== SWIPER TESTIMONIAL ===============*/
// let swiperTestimonial = new Swiper(".testimonial__container", {
//   spaceBetween: 24,
//   loop: true,
//   grabCursor: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   breakpoints: {
//     576: {
//       slidesPerView: 2,
//     },
//     768: {
//       slidesPerView: 2,
//       spaceBetween: 48,
//     },
//   },
// });
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);
/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

//previously selected theme(if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

//obtain current theme that has interface by validating light theme class in html
const getCurrentTheme = () => (document.body.classList.contains(lightTheme) ? "dark" : "light");
const getCurrentIcon = () => (document.body.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun");

//validate if user change theme light or dark theme
if (selectedTheme) {
  //if fullfilled, change theme mode
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](lightTheme);
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](iconTheme);
}

//activate or deactivate manually with theme button
themeButton.addEventListener("click", () => {
  //add or remove icon theme
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);

  //save theme and current icon that user choose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 3000,
  delay: 300,
  // reset:true,
});
sr.reveal(`.home__data`);
sr.reveal(`.home__handle`, { delay: 700 });
sr.reveal(`.home__social, .home__scroll`, { delay: 900, origin: "bottom" });
/*=============== EMAIL JS ===============*/

const contactForm = document.getElementById("contact-form"),
  contactName = document.getElementById("contact-name"),
  contactEmail = document.getElementById("contact-email"),
  contactProject = document.getElementById("contact-project"),
  contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();
  //check if field has value
  if (contactName.value === "" || contactEmail.value === "" || contactProject.value === "") {
    //add and remove color
    contactMessage.classList.remove("color-blue");
    contactMessage.classList.add("color-red");

    //show message if field is empty
    contactMessage.textContent = "Please write all input fields 📩";
  } else {
    // serviceID - templateID - #form - publicKey
    emailjs.sendForm("service_6qyd1nd", "template_63cm2hp", "#contact-form", "LQKkYzzjesrNhyg-I").then(
      () => {
        //Show message add color
        contactMessage.classList.add("color-blue");
        contactMessage.textContent = "Message sent successfully ✅";

        //remove message after 5 seconds
        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);
      },
      (error) => {
        alert("OOPS, Something went wrong...", error);
      }
    );

    //clear input fields
    contactName.value = "";
    contactEmail.value = "";
    contactProject.value = "";
  }
};
contactForm.addEventListener("submit", sendEmail);
