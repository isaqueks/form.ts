import ValidationResult from "./isFieldValid";
import VirtualElement from "./virtualElement";


export interface EventListener {
    (event: Event);
}

export default abstract class PageField<OutputType> extends VirtualElement<HTMLInputElement> {

    public name: string;
    public description: string;
    public required: boolean;

    protected afterConstruct() {

    }

    constructor(
        name: string, 
        description: string, 
        required: boolean = true,
        classes: string[] = [], 
        attributes: any = {}
    ) {
        classes.push('field');
        super('INPUT', classes, attributes);
        this.name = name;
        this.description = description;
        this.required = required;
        if (this.required) {
            this.setAttribute('required', 'true');
        }
        this.afterConstruct();
    }

    /**
     * The default validate function. Should be overwritten, otherwise it will always return true
     * @returns a valid IsFieldValid if the validation returns ok
     */
    protected abstract validateField(): ValidationResult;

    /**
     * Validates the input value
     * @returns IsFieldValid telling if the input value is valid or not and why.
     */
    public validate(): ValidationResult {
        return this.validateField();
    }

    /**
     * 
     * @returns The input value, but with a type cast. 
     * It can return a Date on a date input, for example.
     */
    public abstract getOutputValue(): OutputType;

    /**
     * 
     * @returns The real or virtual value of the input
     */
    public getValue(): string {
        const element = this.getDomElement();
        if (!element) {
            return this.attributes['value'];
        }
        return element.value;
    }

    /**
     * 
     * @param parent The parent element to append it
     * @returns The created element
     */
    override createElement(parent: HTMLElement): HTMLInputElement {
        const element = document.createElement(this.tagName) as HTMLInputElement;

        const container = document.createElement('div');
        container.classList.add('field-element-container');
        if (this.required) {
            container.classList.add('field-element-container-required');
        }
        
        const fieldDescription = document.createElement('div');
        fieldDescription.classList.add('field-description');
        fieldDescription.textContent = this.description;

        parent.appendChild(container);
        container.appendChild(fieldDescription);
        container.appendChild(element);

        return element;
    }

    public setValue(value: string) {
        this.setAttribute('value', value);
        const element = this.getDomElement();
        element ? (element.value = value) : void(0);
        const newEv: any = {
            target: element,
            virtualTarget: this
        }
        if (typeof Event != 'undefined') {
            newEv.__proto__ = new Event('input');
        }

        this.fireEvent('input', newEv);
    }

}