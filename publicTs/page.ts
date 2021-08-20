import PageField, { IsFieldValid } from "./pageField";
import VirtualElement from "./virtualElement";

function createElement(tagName: string, classList: string[], children?: HTMLElement[] | string): HTMLElement {
    const el = document.createElement(tagName);
    classList.forEach(className => className && el.classList.add(className));

    if (children) {
        if (typeof children === 'string') {
            el.innerText = children;
        }
        else {
            (children as HTMLElement[]).forEach(child => el.appendChild(child));
        }
    }

    return el as HTMLElement;
}

export default class PageElement extends VirtualElement<HTMLSelectElement> {

    public title: string;
    public name: string;
    public showReturnButton: boolean;
    public index: number;

    private fields: Array<PageField>;

    private nextBtn: HTMLElement;
    private backBtn: HTMLElement;
    private fieldContainer: HTMLElement;

    constructor(
        pageIndex: number,
        name: string, 
        title: string, 
        fields: PageField[] = [],
        showReturnButton: boolean = true,
        classes: string[] = [],
        attributes: any = {}
    ) {
        classes.push('page');
        super('SECTION', classes, attributes);
        this.index = pageIndex;
        this.name = name;
        this.title = title;
        this.showReturnButton = showReturnButton;
        this.fields = fields;
        this.setAttribute('page-index', String(this.index));
    }

    public addField(field: PageField) {
        this.fields.push(field);
    }

    public getField(name: string): PageField {
        for (let field of this.fields) {
            if (field.name === name) {
                return field;
            }
        }
        return null;
    }

    public validate(): IsFieldValid[] {
        const stack = [];

        for (let field of this.fields) {
            stack.push(field.validate());
        }

        return stack;
    }

    private fireGoNext(data) {
        super.fireEvent('next', data);
    }

    private fireGoBack(data) {
        super.fireEvent('back', data);
    }

    override createElement(parent: HTMLElement): HTMLSelectElement {

        const element = document.createElement(this.tagName) as HTMLSelectElement;
        parent.appendChild(element);

        const btnBackArrow = createElement('DIV', ['back-arrow', this.showReturnButton ? '' : 'invisible'].filter(x => x));
        const header = createElement('DIV', ['page-header'], [
            btnBackArrow,
            createElement('DIV', ['back-title'], this.title)
        ]);

        const btnContinue = createElement('BUTTON', ['continue-btn'], 'Continue');
        const fieldContainer = createElement('DIV', ['field-container']);

        const content = createElement('DIV', ['page-content'], [
            createElement('DIV', ['center-container'], [fieldContainer]),
            createElement('DIV', ['continue-btn-container'], [btnContinue])
        ])

        element.appendChild(header);
        element.appendChild(content);

        this.nextBtn = btnContinue;
        this.backBtn = btnBackArrow;
        this.fieldContainer = fieldContainer;

        // element.outerHTML = /*html*/`
        //     <section>
        //         <div class="page-header">
        //             <div class="back-arrow ${this.showReturnButton ? '' : 'hidden'}"></div>
        //             <div class="page-title">${this.title}</div>
        //         </div>
        //         <div class="page-content">
        //                  <div class="field-container"></div>
        //             <button class="continue-btn">Continue</button>
        //         </div>
        //     </section>
        // `;

        return element;
    }

    override afterElementBuilt() {
        const element = this.getElement();

        for (let field of this.fields) {
            field.buildTo(this.fieldContainer);
        }

        // Setup next and back
        this.nextBtn.addEventListener('click', data => {
            this.fireGoNext(data);
        });

        this.backBtn.addEventListener('click', data => {
            this.fireGoBack(data);
        });
    }

}