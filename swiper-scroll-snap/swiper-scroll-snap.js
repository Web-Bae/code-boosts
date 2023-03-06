window.Webflow ||= [];
window.Webflow.push(() => {
  // Select elements on page that we will need
  const slideNumber = document.querySelector(".swiper-slide-num");
  const headings = document.querySelectorAll(".heading");

  // Store speed in a variable since we'll want to use it for animations too.
  const speed = 800;

  // Define Swiper instance
  const swiper = new Swiper(".swiper", {
    // optional parameters
    direction: "vertical",
    loop: true,
    speed: speed,
    mousewheel: true,
    keyboard: {
      enabled: true,
    },
    pagination: {
      el: ".swiper-pagination-custom",
      bulletClass: "swiper-bullet-custom",
      bulletActiveClass: "is-active",
      bulletElement: "button",
      clickable: true,
    },
  });

  // event that fires when swiper.activeIndex changes
  swiper.on("activeIndexChange", () => {
    // be careful which index you use! We want realIndex in this case
    let activeIndex = swiper.activeIndex;
    let realIndex = swiper.realIndex;
    // change out slide number
    slideNumber.textContent = realIndex + 1;

    // animate the heading with CSS transitions.
    headings.forEach((heading) => heading.classList.remove("is-active"));
    headings[realIndex].classList.add("is-active");
  });

  // event that fires when swiper goes to next slide
  swiper.on("slideNextTransitionStart", () => {
    gsap
      .timeline({ defaults: { duration: speed / 2000 } })
      .to(".front", { translateY: "100%" })
      .set(".front", { translateY: "-100%" })
      .to(".front", { translateY: "0%" });
  });

  // event that fires when swiper goes to previous slide
  swiper.on("slidePrevTransitionStart", () => {
    gsap
      .timeline({ defaults: { duration: speed / 2000 } })
      .to(".front", { translateY: "-100%" })
      .set(".front", { translateY: "100%" })
      .to(".front", { translateY: "0%" });
  });
});
