import ValidationResult, { FieldValidation } from "../isFieldValid";
import PageField from "../pageField";

class PasswordTestField extends PageField<string> {

    override afterConstruct() {
        this.setAttribute('type', 'password');
    }

    protected validateField(): ValidationResult {
        return FieldValidation.validIf(
            this.getValue().trim().length >= 8, 
        'Password too short')
    }

    public getOutputValue(): string {
        return this.getValue().trim();
    }

}

test('PageField', () => {

    const field = new PasswordTestField('testField', 'Password test', true, ['extraClass'], {
        value: 'defaultPassword'
    });

    expect(field.tagName).toEqual('INPUT');
    expect(field.name).toEqual('testField');
    expect(field.description).toEqual('Password test');
    expect(field.getAttribute('type')).toEqual('password');
    expect(field.cssClasses.includes('extraClass')).toBe(true);
    expect(field.getValue()).toEqual('defaultPassword');
    expect(field.getAttribute('value')).toEqual('defaultPassword');

    expect(field.validate().valid).toEqual(true);
    field.setAttribute('value', '123');
    expect(field.validate().invalidReason).toEqual('Password too short');

});