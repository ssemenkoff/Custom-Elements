import { customElement } from "./Utility"
import BaseCustomElement from "./BaseCustomElement";

@customElement({
  selector: "tabs-element",
  template: `
      <slot name="tab"></slot>
      <slot name="content"></slot>
  `,
  style: `
    :host > * {
      box-sizing: border-box;
    }

    [name="tab"] {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
      grid-template-rows: 30px;
    }

    [name="tab"]::slotted([selected]) {
      background-color: #e6e6e6;
    }

    [name="tab"]::slotted(*) {
      text-align: center;
      padding: 5px;
      border: 1px solid;
      border-bottom: none;
      border-radius: 4px 4px 0px 0px;
    }

    [name="content"] {
      display: block;
      border: 1px solid;
      border-radius: 0px 0px 4px 4px;
      padding: 40px;
    }
  `,
  useShadow: true
})
export default class TabsElement extends BaseCustomElement {
  constructor() {
    super();
    this.shadowRoot.addEventListener("click", (e) => { this._onClick(e) });
  }

  private _onClick(e: Event) {
    let clicked = e.target as HTMLElement;

    if (clicked.slot === "tab") {
      let ariaId = clicked.getAttribute("aria-for");
      console.log(this)
      this.selectTab(ariaId);
    }
  }

  private selectTab(ariaId: string) {
    let slotContent = this.shadowRoot.querySelector('slot[name="content"]') as HTMLSlotElement;
    slotContent.assignedNodes({ flatten: true }).forEach((e: HTMLElement) => {
      if (e.getAttribute("aria") === ariaId) {
        e.removeAttribute('hidden');
      }
      else {
        e.setAttribute("hidden", "");
      }
    })

    let slotTab = this.shadowRoot.querySelector('slot[name="tab"]') as HTMLSlotElement;
    slotTab.assignedNodes({ flatten: true }).forEach((e: HTMLElement) => {
      if (e.getAttribute("aria-for") === ariaId) {
        e.setAttribute("selected", "");
      } else {
        e.removeAttribute("selected")
      }
    })
  }

  connectedCallback() {
    let contentSlot = this.shadowRoot.querySelector('slot[name="content"]') as HTMLSlotElement
    let tabSlot = this.shadowRoot.querySelector('slot[name="tab"]') as HTMLSlotElement

    let assignedContentNodes = contentSlot.assignedNodes({ flatten: true })
    let assignedTabNodes = tabSlot.assignedNodes({ flatten: true })

    assignedContentNodes.reduce((accumulator: number, element: HTMLElement) => {
      element.setAttribute("hidden", "")
      let predefinedAria = element.getAttribute("aria")
      if (!predefinedAria) {
        element.setAttribute("aria", accumulator.toString())
        return ++accumulator
      } else {
        if (predefinedAria === accumulator + "") {
          return ++accumulator
        }
      }
    }, 1)

    assignedTabNodes.reduce((accumulator: number, element: HTMLElement) => {
      let predefinedAria = element.getAttribute("aria-for")

      if (!predefinedAria) {
        element.setAttribute("aria-for", accumulator.toString())
        return ++accumulator
      } else {
        if (predefinedAria === accumulator + "") {
          return ++accumulator
        }
      }
    }, 1);

    let firstAria = (assignedTabNodes[0] as HTMLElement).getAttribute("aria-for");
    this.selectTab(firstAria);
  }
}