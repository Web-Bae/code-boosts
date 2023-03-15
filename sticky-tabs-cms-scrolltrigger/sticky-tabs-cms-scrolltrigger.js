// Define your attribute names here.
const ATTR_NAME = "wb-element";
const ATTR_SECTION_VALUE = "sticky-tabs-scroll-section";
const ATTR_ITEM_VALUE = "sticky-tabs-item";
const ATTR_CONTENT_VALUE = "sticky-tabs-content";

window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.registerPlugin(ScrollTrigger);
  const tabItems = document.querySelectorAll(
    `[${ATTR_NAME}="${ATTR_ITEM_VALUE}"]`
  );
  const tabContentElements = document.querySelectorAll(
    `[${ATTR_NAME}="${ATTR_CONTENT_VALUE}"]`
  );
  const scrollSection = document.querySelector(
    `[${ATTR_NAME}="${ATTR_SECTION_VALUE}"]`
  );

  // set scroll section height to 100 x number of CMS items viewport height units
  scrollSection.style.height = `${100 * tabItems.length}vh`;

  // Manipulate the DOM such that each content div is a sibling
  // of its corresponding CMS item div, which allows us to utilize flexbox
  // on the CMS list.
  tabItems.forEach((item, index) => {
    item.insertAdjacentElement("afterend", tabContentElements[index]);
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollSection,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
    defaults: {
      ease: "none",
    },
  });

  // set all content element heights to 0, and first to 100%
  gsap.set(tabContentElements, { height: "0%" });
  gsap.set(tabContentElements[0], { height: "100%" });

  for (let i = 0; i < tabContentElements.length - 1; i++) {
    // at the same time, send current tab height to 0
    // and next tab height to 100%
    tl.to(tabContentElements[i], { height: "0%" }).to(
      tabContentElements[i + 1],
      { height: "100%" },
      "<"
    );
  }
});
