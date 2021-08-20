import VirtualElement from "./virtualElement";

export interface IsFieldValid {
    valid: boolean;
    invalidReason: string;
}

export interface ValidateFieldFunction {
    (inputValue: string, element?: HTMLInputElement): IsFieldValid;
}

export interface EventListener {
    (event: Event);
}

export default class PageField extends VirtualElement<HTMLInputElement> {

    public name: string;
    public description: string;
    private validateFn: ValidateFieldFunction;

    constructor(
        name: string, 
        description: string, 
        validateFn?: ValidateFieldFunction, 
        classes: string[] = [], 
        attributes: any = {}
    ) {
        classes.push('field');
        super('INPUT', classes, attributes);
        this.validateFn = validateFn;
        this.name = name;
        this.description = description;
    }

    public validate(): IsFieldValid {
        const element = this.getElement();
        return this.validateFn ? this.validateFn(element.value, element) : {
            valid: true,
            invalidReason: null
        };
    }

    public getValue(): string {
        const element = this.getElement();
        if (!element) {
            return this.attributes['value'] || null;
        }
        return element.value;
    }

    override createElement(parent: HTMLElement): HTMLInputElement {
        const element = document.createElement(this.tagName) as HTMLInputElement;

        const container = document.createElement('div');
        container.classList.add('field-element-container');
        
        const fieldDescription = document.createElement('div');
        fieldDescription.classList.add('field-description');
        fieldDescription.textContent = this.description;

        parent.appendChild(container);
        container.appendChild(fieldDescription);
        container.appendChild(element);

        return element;
    }

}