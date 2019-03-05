import { customElement } from "./Utility"

@customElement({
  selector: "echo-element",
  template:`
    <h5>Element says:</h5>
    <hr>
    <i><slot></slot></i>`,
  style:`
    :host i{
      color: red;
    }`,
  useShadow: true
})
export default class EchoElement extends HTMLElement {
  // private template: HTMLElement;
  private template: string;
  private useShadow: boolean;

  constructor() {
    super()

    if(this.useShadow) {
      var shadow = this.attachShadow({ mode: "open"});
      shadow.innerHTML = this.template;
    } else {
      this.innerHTML = this.template
    }
  }
}