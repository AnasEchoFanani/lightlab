## 2026-02-25 - [Accessible Custom Form Inputs]
**Learning:** Using `hidden` or `display: none` on input elements (like checkboxes/radios) to hide them for custom designs completely removes them from the tab order, breaking keyboard accessibility.
**Action:** Use Tailwind's `sr-only` class to visually hide the input while keeping it accessible to screen readers and keyboard navigation. Pair with the `peer` utility to style the custom label/indicator based on the input's `:focus-visible` or `:checked` states.
