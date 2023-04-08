import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [ "mobileTest", "tabletTest", "element" ];

  connect() {
    this.mouseenterTimeout = false;
    this.handleClickFunction = this.handleClick.bind(this);
    this.handleIntersectionFunction = this.handleIntersection.bind(this);
    this.handleMouseoverFunction = this.handleMouseover.bind(this);
    this.handleMouseleaveFunction = this.handleMouseleave.bind(this);

    if (this.hasElementTarget) {
      if (this.isMobile()) {
        const observer = new IntersectionObserver(
          this.handleIntersectionFunction,
          { threshold: 0.65 }
        );
        this.elementTargets.forEach(element => observer.observe(element));
      }

      if (this.isTablet()) {
        this.elementTargets.forEach(element => {
          element.addEventListener("click", this.handleClickFunction);
        });

        this.elementTargets.forEach(element => {
          element.addEventListener("mouseenter", this.handleMouseoverFunction);
        });

        this.elementTargets.forEach(element => {
          element.addEventListener("mouseleave", this.handleMouseleaveFunction);
        });
      }

    }
  }

  disconnect() {
    if (this.isTablet()) {
      this.elementTargets.forEach(element => {
        element.removeEventListener("click", this.handleClickFunction);
      });

      this.elementTargets.forEach(element => {
        element.removeEventListener("mouseenter", this.handleMouseoverFunction);
      });

      this.elementTargets.forEach(element => {
        element.removeEventListener("mouseleave", this.handleMouseleaveFunction);
      });
    }
  }

  isMobile() {
    if (this.mobileTestTarget.offsetParent === null) {
      return false;
    } else {
      return true;
    }
  }

  isTablet() {
    if (this.tabletTestTarget.offsetParent === null) {
      return false;
    } else {
      return true;
    }
  }

  handleIntersection(entries) {
    if (this.isMobile()) {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("v--hover");
        } else {
          entry.target.classList.remove("v--hover");
        }
      });
    }
  }

  handleMouseover(event) {
    const currentTarget = event.currentTarget;
    this.mouseenterTimeout = setTimeout(() => {
      this.elementTargets.forEach(element => {
        element.classList.remove("v--hover");
      });
      currentTarget.classList.add("v--hover");
    }, 20);
  }

  handleMouseleave(event) {
    clearTimeout(this.mouseenterTimeout);
    event.currentTarget.classList.remove("v--hover");
  }

  handleClick(event) {
    if (!event.currentTarget.classList.contains("v--hover")) {
      event.preventDefault();
      event.stopPropagation();
      this.elementTargets.forEach(element => {
        element.classList.remove("v--hover");
      });
      event.currentTarget.classList.add("v--hover");
    }
  }
}
