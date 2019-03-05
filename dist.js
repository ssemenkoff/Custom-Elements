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
    };
    const validateSelector = (selector) => {
        if (selector.indexOf('-') < 0)
            throw new Error("Custom element name must contain at least 1 dash.");
    };
});
define("EchoElement", ["require", "exports", "Utility"], function (require, exports, Utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let EchoElement = class EchoElement extends HTMLElement {
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
    };
    EchoElement = __decorate([
        Utility_1.customElement({
            selector: "echo-element",
            template: `
    <h5>Element says:</h5>
    <hr>
    <i><slot></slot></i>`,
            style: `
    :host i{
      color: red;
    }`,
            useShadow: true
        })
    ], EchoElement);
    exports.default = EchoElement;
});
define("SampleElement", ["require", "exports", "Utility"], function (require, exports, Utility_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let SampleElement = class SampleElement extends HTMLElement {
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
    };
    SampleElement = __decorate([
        Utility_2.customElement({
            selector: "sample-element",
            template: "<p>Hello from sample element</p>",
            useShadow: false
        })
    ], SampleElement);
    exports.default = SampleElement;
});
define("EntryPoint", ["require", "exports", "SampleElement", "EchoElement"], function (require, exports, SampleElement_1, EchoElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.customElements.define("sample-element", SampleElement_1.default);
    window.customElements.define("echo-element", EchoElement_1.default);
});
//# sourceMappingURL=dist.js.map