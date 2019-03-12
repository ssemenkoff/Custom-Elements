import BaseCustomElement from "./BaseCustomElement";
import { customElement } from "./Utility";


@customElement({
  selector: "separator-element",
  template: "<div><hr></div>",
  style: `
    :host {
      padding: 20px;
      display: block;
    }
  `,
  useShadow: true
})
export default class SeparatorElement extends BaseCustomElement {
}