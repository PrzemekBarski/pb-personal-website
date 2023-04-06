import { Controller } from "@hotwired/stimulus";

export default class extends Controller {

  connect() {
    this.lazyVideoObserver = new IntersectionObserver(this.handleIntersection);
    this.lazyVideoObserver.observe(this.element);
  }

  handleIntersection(entries, observer) {
    entries.forEach(function(video) {
      if (video.isIntersecting) {

        for (let source in video.target.children) {
          var videoSource = video.target.children[source];
          if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
            videoSource.src = videoSource.dataset.src;
          }
        }

        video.target.load();
        observer.unobserve(video.target);
      }
    });
  }

}
