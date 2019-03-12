import { customElement } from "./Utility"
import BaseCustomElement from "./BaseCustomElement";

@customElement({
  selector: "sample-element",
  template: "<p>Hello from sample element</p>",
  useShadow: false
})
export default class SampleElement extends BaseCustomElement {
}