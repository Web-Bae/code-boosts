# Complex GSAP Timelines and Function-based Values

Rebuild of the loading animation from the Awwwards Site of the Day (SOTD) for Oct 13, 2022 - Spotify Astrology Club

## Inside the `<head>` tag:

```html
<script
  defer
  src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"
></script>
<script defer src="https://unpkg.com/split-type"></script>

<style>
  .char,
  .is-a-lie {
    /* prevent flash of unstyled content */
    visibility: hidden;
  }
</style>
```
