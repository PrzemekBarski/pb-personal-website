import "container-query-polyfill";
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [ "stylesheet" ];

  connect() {
    this.onWindowLoadFunction = this.onWindowLoad.bind(this);
    window.addEventListener("load", this.onWindowLoadFunction);
  }

  disconnect() {
    window.removeEventListener("load", this.onWindowLoadFunction);
  }

  onWindowLoad() {
    setTimeout(() => {
      let link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = this.element.dataset.altStylesheet;
      link.onload = this.onStylesheetLoad.bind(this);
      this.stylesheetTarget.before(link);
    }, 100);
  }

  onStylesheetLoad() {
    setTimeout(() => {
      this.stylesheetTarget.parentNode.removeChild(this.stylesheetTarget);
    }, 100);
  }

}
