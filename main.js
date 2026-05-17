import { initCounter } from "./counter.js";
import { initArbeit } from "./arbeit.js";

document.addEventListener("DOMContentLoaded", () => {
    initCounter({ target: 39 });
    initArbeit();
});
