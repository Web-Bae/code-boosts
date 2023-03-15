const COLORS_ARRAY = [
  "#f25b40", // orange
  "#2c3d71", // dark blue
  "#e92d65", // red
  "#f7b1cf", // pink
  "#86c1f7", // light blue
  "#ffd570", // yellow
  "#0e0e0e", // black
];
const STEP_DURATION = 0.1;

// grab a reference with an attributes CSS Selector
const text = document.querySelector('[wb-element="rainbow-text"]');

// prevent flash of unstyled content
gsap.set(text, { autoAlpha: 1 });

// splits the text into characters
const splitText = new SplitType(text, { types: "chars" });

// set first color (orange);
gsap.set(splitText.chars, { color: COLORS_ARRAY[0] });

// create our own custom animation called changeColor
gsap.registerEffect({
  name: "changeColor",
  effect: (targets, config) => {
    return gsap.set(targets, { delay: config.duration, color: config.color });
  },
  defaults: { duration: STEP_DURATION },
  extendTimeline: true, // allows the effect directly on any GSAP timeline
});

// Tween it!
gsap.from(splitText.chars, {
  scale: 0,
  stagger: STEP_DURATION,
  ease: "back.out",
  // function-based values!
  color: (index, target) => {
    // each letter gets it own timeline for color change.
    const tlColors = gsap.timeline();
    COLORS_ARRAY.forEach((color) => {
      tlColors.changeColor(target, { duration: STEP_DURATION, color: color });
    });
  },
});
