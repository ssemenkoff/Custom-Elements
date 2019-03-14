import { customElement } from "./Utility"

@customElement({
  selector: "base-element",
  template: "<p>You should implement your own template for custom element</p>",
  useShadow: false
})
export default class BaseCustomElement extends HTMLElement {
  private template: string;
  private useShadow: boolean;
  private selector: string;

  constructor() {
    super()

    if(this.useShadow) {
      var shadow = this.attachShadow({ mode: "open"});
      shadow.innerHTML = this.template;
    } else {
      this.innerHTML = this.template
    }
  }

  connectedCallback() {}

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback() {}

  static register() {
    window.customElements.define(this.prototype.selector, this)
  }
}