import { initCounter } from "./counter.js";
import { initArbeit } from "./arbeit.js";

document.addEventListener("DOMContentLoaded", () => {

    // Counter nur starten, wenn vorhanden
    if (document.querySelector("#counter")) {
        initCounter({ target: 39 });
    }

    // Arbeit nur starten, wenn Grid existiert
    if (document.querySelector(".unserearbeit")) {
        initArbeit();
    }

});
