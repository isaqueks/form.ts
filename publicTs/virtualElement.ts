
export default class VirtualElement<ElementType extends HTMLElement> {

    public tagName: string;
    public cssClasses: string[];
    public attributes: any;

    private element: ElementType;
    private virtualEvents: {evName: string, callback: EventListener}[];

    constructor(tagName: string = 'input', classes: string[] = [], attributes: any = {}) {
        this.tagName = tagName;
        this.cssClasses = classes;
        this.attributes = attributes;
        this.virtualEvents = [];
    }

    public getElement(): ElementType {
        return this.element || null;
    }

    public getAttribute(attr: string): string {
        const element = this.getElement();
        if (!element) {
            const vAttr = this.attributes[attr];
            return vAttr == undefined ? null : vAttr;
        }
        return element.getAttribute(attr);
    }

    public setAttribute(attr: string, value: string) {
        const element = this.getElement();
        if (element) {
            element.setAttribute(attr, value)
        }
        this.attributes[attr] = value;
    }

    public on(eventName: string, listener: EventListener) {
        const element = this.getElement();
        
        this.virtualEvents.push({
            evName: eventName,
            callback: listener
        })
        if (element) {
            element.addEventListener(eventName, listener);
        }
    }

    protected createElement(parent: HTMLElement): ElementType {
        const el = document.createElement(this.tagName) as ElementType;
        parent.appendChild(el);
        return el;
    }

    protected afterElementBuilt() {

    }

    public buildTo(parent: HTMLElement): ElementType {
        this.element = this.createElement(parent);

        for (let attr in this.attributes) {
            const attrVal = this.attributes[attr];
            this.element.setAttribute(attr, attrVal);
        }

        for (let event of this.virtualEvents) {
            this.element.addEventListener(event.evName, event.callback);
        }

        this.cssClasses.forEach(className => this.element.classList.add(className));

        this.afterElementBuilt();
        return this.getElement();
    }

    public fireEvent(eventName: string, data: Event) {
        for (let event of this.virtualEvents) {
            if (event.evName == eventName) {
                event.callback(data);
            }
        }
    }


}