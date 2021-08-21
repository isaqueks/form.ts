import isFieldValid, { FieldValidation } from "../isFieldValid"
import PageElement from "../page"
import PageField from "../pageField"

class TextField extends PageField<string> {

    protected validateField(): isFieldValid {

        const text = this.getValue().trim();

        return FieldValidation.validIf(
            !this.required || text.length > 0,
            'Text cannot be empty'
        )
    }

    public getOutputValue(): string {
        return this.getValue();
    }

}

interface TestSample {
    field: string;
}

test('Page', () => {


    const field = new TextField('field', 'Text field');
    field.setAttribute('value', '');

    const page = new PageElement<TestSample>(1, 'mainPage', 'Test page', [
        field
    ]);

    expect(page.index).toEqual(1);
    expect(page.name).toEqual('mainPage');
    expect(page.title).toEqual('Test page');
    expect(page.getField('field')).toBe(field);
    expect(page.getValidationError()).toEqual('Text cannot be empty');
    field.setAttribute('value', 'Not empty');
    expect(page.getValidationError()).toBe(null);

    const output = page.getOutput();
    expect(output.field).toStrictEqual('Not empty');

})