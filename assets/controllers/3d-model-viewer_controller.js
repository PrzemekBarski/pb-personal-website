import { Controller } from "@hotwired/stimulus";
import { prepareScene, loadObject } from "./../vendor/js-3d-model-viewer/index.js";

export default class extends Controller {
  static targets = [ "mobileTest", "container", "loadButton", "loader" ];

  connect() {
    if (!this.isMobile()) {
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
    this.loadButtonTarget.remove();
    this.loaderTarget.classList.add("v--loading");
    const opts = {
      grid: false,
      trackball: false
    };
    const scene = prepareScene(this.containerTarget, opts);
    loadObject(scene, this.element.dataset.modelUrl, this.element.dataset.materialUrl, () => {
      this.containerTarget.classList.add("v--ready");
      this.loaderTarget.classList.remove("v--loading");
    });
  }
}
