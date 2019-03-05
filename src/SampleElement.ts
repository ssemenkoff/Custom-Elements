import { customElement } from "./Utility"

@customElement({
  selector: "sample-element",
  template: "<p>Hello from sample element</p>",
  useShadow: false
})
export default class SampleElement extends HTMLElement {
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