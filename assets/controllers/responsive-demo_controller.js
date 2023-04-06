import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [ "mobileTest", "container" ];

  connect() {
    this.transformed = false;
    this.checkScreenSize();
    this.restoreFunction = this.restore.bind(this);
  }

  // If mobileTest target display is set to none, controller will assume desktop screen

  checkScreenSize() {
    if (this.mobileTestTarget.offsetParent === null) {
      this.screenSize = "desktop";
    } else {
      this.screenSize = "mobile";
    }
  }

  animate() {
    if (!this.transformed) {
      this.transformed = true;
      this.checkScreenSize();
      this.element.style.setProperty("--original-width", `${this.containerTarget.offsetWidth}px`);
      this.element.classList.remove("v--restore");
      this.element.classList.remove(`v--${this.screenSize}`);
      void this.element.offsetWidth;
      this.element.classList.add(`v--${this.screenSize}`);

      if (this.screenSize === "mobile") {
        this.containerTarget.addEventListener("animationend", this.restoreFunction, false);
      }
    } else {
      this.restore();
    }
  }

  restore() {
    this.transformed = false;
    this.element.classList.remove("v--restore");
    void this.element.offsetWidth;
    this.element.classList.add("v--restore");

    if (this.screenSize === "mobile") {
      this.containerTarget.removeEventListener("animationend", this.restoreFunction, false);
    }
  }
}
