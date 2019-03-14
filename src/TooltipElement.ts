import { customElement } from "./Utility"
import BaseCustomElement from "./BaseCustomElement";

@customElement({
  selector: "tooltip-element",
  template:"<div><slot></slot></div>",
  style:`
    :host {
      /*visibility: hidden;*/
      background-color: #646061;
      color: #e1e1e1;
      padding: 7px;
      border-radius: 3px;
      position: absolute;
      top: 0px;
      left: 0px;
    }
    
    :host([displayed]) {
      /*visibility: visible;*/
    }
    `,
  useShadow: true
})
export default class TooltipElement extends BaseCustomElement {
  connectedCallback() {
    this.setAttribute("hidden", "");

    [...document.querySelectorAll(`*[aria-describedby-tooltip=${this.id}]`)].forEach((e: HTMLElement) => {
      e.addEventListener("mouseenter", (event) => {
        this.removeAttribute("hidden");
      })
      e.addEventListener("mouseleave", (event) => {
        this.style.removeProperty("left");
        this.style.removeProperty("top");
        this.setAttribute("hidden", "");
      })
      e.addEventListener("mousemove", (event) => {
        window.requestAnimationFrame(() => {
          let positionX = (window.innerWidth - event.clientX) > this.clientWidth ? event.clientX : event.clientX - this.clientWidth;

          const topElementRect = e.getBoundingClientRect();
          let positionY = event.clientY > (this.clientHeight + 10) ? event.clientY - this.clientHeight - 10 : topElementRect.top + topElementRect.height;
          this.style.setProperty("left", `${positionX}px`);
          this.style.setProperty("top", `${positionY}px`);
        })
      })
    })
  }
}