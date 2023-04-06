import "container-query-polyfill";
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [ "stylesheet" ];

  connect() {
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = this.element.dataset.altStylesheet;

    setTimeout(() => {
      this.stylesheetTarget.before(link);

      setTimeout(() => {
        this.stylesheetTarget.parentNode.removeChild(this.stylesheetTarget);
      }, 200);
    }, 100);
  }

}
