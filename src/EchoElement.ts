import { customElement } from "./Utility"
import BaseCustomElement from "./BaseCustomElement";

@customElement({
  selector: "echo-element",
  template:`
    <h5>Element says:</h5>
    <blockquote><i><slot></slot></i></blockquote>`,
  style:`
    :host i{
      color: red;
    }`,
  useShadow: true
})
export default class EchoElement extends BaseCustomElement {
}