export const customElement = (config: CustomElementConfig) => (target: any) => {
  validateSelector(config.selector);

  if(!config.template) 
    throw new Error("Template must be specified for custom element.")

  const template = document.createElement("template")
  if(config.style) {
    config.template = `<style>${config.style}</style> ${config.template}`
  }
  template.innerHTML = config.template

  target.prototype.template = config.template
  target.prototype.useShadow = config.useShadow
}

const validateSelector = (selector: string) => {
  if(selector.indexOf('-') < 0) 
    throw new Error("Custom element name must contain at least 1 dash.")
}

interface CustomElementConfig {
  selector: string,
  style?: string,
  template: string,
  useShadow?: boolean
}