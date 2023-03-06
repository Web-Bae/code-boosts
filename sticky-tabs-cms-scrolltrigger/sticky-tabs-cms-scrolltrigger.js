// Define your attribute names here.
const ATTR_NAME = "wb-element";
const ATTR_SECTION_VALUE = "sticky-tabs-scroll-section";
const ATTR_ITEM_VALUE = "sticky-tabs-item";
const ATTR_CONTENT_VALUE = "sticky-tabs-content";

gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  const tabItems = document.querySelectorAll(
    `[${ATTR_NAME}="${ATTR_ITEM_VALUE}"]`
  );
  const tabContentElements = document.querySelectorAll(
    `[${ATTR_NAME}="${ATTR_CONTENT_VALUE}"]`
  );

  // Manipulate the DOM such that each content div is a sibling
  // of its corresponding CMS item div, which allows us to utilize flexbox
  // on the CMS list.
  tabItems.forEach((item, index) => {
    item.insertAdjacentElement("afterend", tabContentElements[index]);
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: `[${ATTR_NAME}="${ATTR_SECTION_VALUE}"]`,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
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
    tl.to(tabContentElements[i], { height: "0%" });
    tl.to(tabContentElements[i + 1], { height: "100%" }, "<");
  }
});
