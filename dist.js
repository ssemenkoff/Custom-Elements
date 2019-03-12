var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("Utility", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.customElement = (config) => (target) => {
        validateSelector(config.selector);
        if (!config.template)
            throw new Error("Template must be specified for custom element.");
        const template = document.createElement("template");
        if (config.style) {
            config.template = `<style>${config.style}</style> ${config.template}`;
        }
        template.innerHTML = config.template;
        target.prototype.template = config.template;
        target.prototype.useShadow = config.useShadow;
        target.prototype.selector = config.selector;
    };
    const validateSelector = (selector) => {
        if (selector.indexOf('-') < 0)
            throw new Error("Custom element name must contain at least 1 dash.");
    };
});
define("BaseCustomElement", ["require", "exports", "Utility"], function (require, exports, Utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let BaseCustomElement = class BaseCustomElement extends HTMLElement {
        constructor() {
            super();
            if (this.useShadow) {
                var shadow = this.attachShadow({ mode: "open" });
                shadow.innerHTML = this.template;
            }
            else {
                this.innerHTML = this.template;
            }
        }
        static register() {
            window.customElements.define(this.prototype.selector, this);
        }
    };
    BaseCustomElement = __decorate([
        Utility_1.customElement({
            selector: "base-element",
            template: "<p>You should implement your own template for custom element</p>",
            useShadow: false
        })
    ], BaseCustomElement);
    exports.default = BaseCustomElement;
});
define("EchoElement", ["require", "exports", "Utility", "./BaseElement"], function (require, exports, Utility_2, BaseElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let EchoElement = class EchoElement extends BaseElement_1.default {
    };
    EchoElement = __decorate([
        Utility_2.customElement({
            selector: "echo-element",
            template: `
    <h5>Element says:</h5>
    <blockquote><i><slot></slot></i></blockquote>`,
            style: `
    :host i{
      color: red;
    }`,
            useShadow: true
        })
    ], EchoElement);
    exports.default = EchoElement;
});
define("SampleElement", ["require", "exports", "Utility", "./BaseElement"], function (require, exports, Utility_3, BaseElement_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let SampleElement = class SampleElement extends BaseElement_2.default {
    };
    SampleElement = __decorate([
        Utility_3.customElement({
            selector: "sample-element",
            template: "<p>Hello from sample element</p>",
            useShadow: false
        })
    ], SampleElement);
    exports.default = SampleElement;
});
define("TabsElement", ["require", "exports", "Utility", "./BaseElement"], function (require, exports, Utility_4, BaseElement_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let TabsElement = class TabsElement extends BaseElement_3.default {
        constructor() {
            super();
            this.shadowRoot.addEventListener("click", (e) => { this._onClick(e); });
        }
        _onClick(e) {
            let clicked = e.target;
            if (clicked.slot === "tab") {
                let ariaId = clicked.getAttribute("aria-for");
                console.log(this);
                this.selectTab(ariaId);
            }
        }
        selectTab(ariaId) {
            let slotContent = this.shadowRoot.querySelector('slot[name="content"]');
            slotContent.assignedNodes({ flatten: true }).forEach((e) => {
                if (e.getAttribute("aria") === ariaId) {
                    e.removeAttribute('hidden');
                }
                else {
                    e.setAttribute("hidden", "");
                }
            });
            let slotTab = this.shadowRoot.querySelector('slot[name="tab"]');
            slotTab.assignedNodes({ flatten: true }).forEach((e) => {
                if (e.getAttribute("aria-for") === ariaId) {
                    e.setAttribute("selected", "");
                }
                else {
                    e.removeAttribute("selected");
                }
            });
        }
        connectedCallback() {
            let contentSlot = this.shadowRoot.querySelector('slot[name="content"]');
            let tabSlot = this.shadowRoot.querySelector('slot[name="tab"]');
            let assignedContentNodes = contentSlot.assignedNodes({ flatten: true });
            let assignedTabNodes = tabSlot.assignedNodes({ flatten: true });
            assignedContentNodes.reduce((accumulator, element) => {
                element.setAttribute("hidden", "");
                let predefinedAria = element.getAttribute("aria");
                if (!predefinedAria) {
                    element.setAttribute("aria", accumulator.toString());
                    return ++accumulator;
                }
                else {
                    if (predefinedAria === accumulator + "") {
                        return ++accumulator;
                    }
                }
            }, 1);
            assignedTabNodes.reduce((accumulator, element) => {
                let predefinedAria = element.getAttribute("aria-for");
                if (!predefinedAria) {
                    element.setAttribute("aria-for", accumulator.toString());
                    return ++accumulator;
                }
                else {
                    if (predefinedAria === accumulator + "") {
                        return ++accumulator;
                    }
                }
            }, 1);
            let firstAria = assignedTabNodes[0].getAttribute("aria-for");
            this.selectTab(firstAria);
        }
    };
    TabsElement = __decorate([
        Utility_4.customElement({
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
    ], TabsElement);
    exports.default = TabsElement;
});
define("SepatatorElement", ["require", "exports", "./BaseElement", "Utility"], function (require, exports, BaseElement_4, Utility_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let SeparatorElement = class SeparatorElement extends BaseElement_4.default {
    };
    SeparatorElement = __decorate([
        Utility_5.customElement({
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
    ], SeparatorElement);
    exports.default = SeparatorElement;
});
define("EntryPoint", ["require", "exports", "SampleElement", "EchoElement", "TabsElement", "SepatatorElement"], function (require, exports, SampleElement_1, EchoElement_1, TabsElement_1, SepatatorElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    TabsElement_1.default.register();
    SampleElement_1.default.register();
    EchoElement_1.default.register();
    SepatatorElement_1.default.register();
});
//# sourceMappingURL=dist.js.map