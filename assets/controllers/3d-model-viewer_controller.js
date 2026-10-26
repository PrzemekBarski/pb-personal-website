import { Controller } from "@hotwired/stimulus";
import { parseCSS } from "colorizr";
import { prepareScene, loadObject } from "./../vendor/js-3d-model-viewer/index.js";

let scene = false;

export default class extends Controller {
  static targets = [ "mobileTest", "container", "loadButton", "loader" ];

  connect() {
    if (!this.isMobile() && !scene) {
      this.load();
    }
  }

  isMobile() {
    if (this.mobileTestTarget.offsetParent === null) {
      return false;
    } else {
      return true;
    }
  }

  load() {
    if (this.hasLoadButtonTarget) {
      this.loadButtonTarget.remove();
    }
    this.loaderTarget.classList.add("v--loading");

    let colorString = getComputedStyle(this.containerTarget).getPropertyValue("--color-blue-100");
    let colorHex = parseCSS(colorString.replace(" .", " 0."), "hex");
    colorHex = parseInt(colorHex.replace("#", "0x"));

    const opts = {
      grid: false,
      trackball: false,
      bgcolor: colorHex
    };

    scene = prepareScene(this.containerTarget, opts);
    loadObject(scene, this.element.dataset.modelUrl, this.element.dataset.materialUrl, () => {
      this.containerTarget.classList.add("v--ready");
      this.loaderTarget.classList.remove("v--loading");
    });
  }
}
