import { customElement } from "./Utility"
import BaseCustomElement from "./BaseCustomElement";

@customElement({
  selector: "resizable-div-element",
  template: `
    <div class="handler topHandler">
    </div>
    <div class="handler leftHandler">
    </div>
    <slot></slot>
    <div class="handler rightHandler">
    </div>
    <div class="handler bottomHandler">
    </div>`,
  style:`
  :host {
    display: grid;
    grid-template: 
      "top top top" 1px
      "left content right" 1fr
      "bottom bottom bottom" 1px / 1px 1fr 1px;
  }

  .handler {
    background-color: #ccc;
  }

  .topHandler {
    grid-area: top;
    cursor: row-resize;
  }

  .leftHandler {
    grid-area: left;
    cursor: col-resize;
  }

  .rightHandler {
    grid-area: right;
    cursor: col-resize;
  }

  .bottomHandler {
    grid-area: bottom;
    cursor: row-resize;
  }
  `,
  useShadow: true
})
export default class ResizableDivElement extends BaseCustomElement {
  connectedCallback() {
    let width = this.clientWidth;
    let height = this.clientHeight;
    this.style.setProperty("width", `${width}px`);
    this.style.setProperty("height", `${height}px`);

    this.createRightHandler();
    this.createBottomHandler();
  }

  private createRightHandler() {
    const handler = this.shadowRoot.querySelector(".rightHandler");
    let previousCoord: number;
    let currentCoord: number;

    handler.addEventListener("mousedown", (event: MouseEvent) => {
      previousCoord = event.clientX;
      event.preventDefault();
      let windowMouseUpListener = (e: MouseEvent) => {
        event.preventDefault();
        window.removeEventListener("mouseup", windowMouseUpListener);
        window.removeEventListener("mousemove", windowMouseMoveListener);
      }

      let windowMouseMoveListener = (e: MouseEvent) => {
        currentCoord = e.clientX;
        let delta = currentCoord - previousCoord;
        previousCoord = currentCoord;
        this.style.setProperty("width", `${this.clientWidth + delta}px`);
        event.preventDefault();
      }

      window.addEventListener("mousemove", windowMouseMoveListener);
      window.addEventListener("mouseup", windowMouseUpListener);
    });
  }

  private createBottomHandler() {
    const handler = this.shadowRoot.querySelector(".bottomHandler");
    let previousCoord: number;
    let currentCoord: number;

    handler.addEventListener("mousedown", (event: MouseEvent) => {
      previousCoord = event.clientY;
      event.preventDefault();
      let windowMouseUpListener = (e: MouseEvent) => {
        event.preventDefault();
        window.removeEventListener("mouseup", windowMouseUpListener);
        window.removeEventListener("mousemove", windowMouseMoveListener);
      }

      let windowMouseMoveListener = (e: MouseEvent) => {
        currentCoord = e.clientY;
        let delta = currentCoord - previousCoord;
        previousCoord = currentCoord;
        this.style.setProperty("height", `${this.clientHeight + delta}px`);
        event.preventDefault();
      }

      window.addEventListener("mousemove", windowMouseMoveListener);
      window.addEventListener("mouseup", windowMouseUpListener);
    });
  }
}