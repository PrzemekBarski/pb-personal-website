import { Application } from "@hotwired/stimulus";
import responsiveDemo from "./controllers/responsive-demo_controller.js";
import lightbox from "./controllers/lightbox_controller.js";
import mobileHover from "./controllers/mobile-hover_controller.js";
import lazyVideo from "./controllers/lazy-video_controller.js";
import containerQuery from "./controllers/container-query_controller.js";

window.Stimulus = Application.start();
window.Stimulus.register("responsive-demo", responsiveDemo);
window.Stimulus.register("lightbox", lightbox);
window.Stimulus.register("mobile-hover", mobileHover);
window.Stimulus.register("lazy-video", lazyVideo);
window.Stimulus.register("container-query", containerQuery);
