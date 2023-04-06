import { Controller } from "@hotwired/stimulus";
import * as basicLightbox from "basiclightbox";

export default class extends Controller {
  static targets = [ "content" ];

  connect() {
    this.keyboardCloseFunctionHandle = this.keyboardClose.bind(this);
    this.instance = basicLightbox.create(
      this.contentTarget.innerHTML,
      {
        onShow: () => document.body.classList.add("v--locked"),
        onClose: () => document.body.classList.remove("v--locked")
      }
    );

    const lightboxElement = this.instance.element();
    this.lightboxCloseButton =  lightboxElement.querySelector("[data-action=\"lightbox#close\"]");

    this.lightboxCloseButton.addEventListener("click", this.instance.close);
    document.addEventListener("keydown", this.keyboardCloseFunctionHandle);
  }

  disconnect() {
    this.lightboxCloseButton.removeEventListener("click", this.instance.close);
    document.removeEventListener("keydown", this.keyboardCloseFunctionHandle);
  }

  show() {
    this.instance.show();
  }

  close() {
    this.instance.close();
  }

  keyboardClose(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  }
}
