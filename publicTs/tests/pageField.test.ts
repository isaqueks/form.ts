import PageField from "../pageField";

test('PageField', () => {

    const field = new PageField('nameField', 'Type your name', pass => {

        const isValid = pass != 'defaultPassword'

        return {
            valid: isValid,
            invalidReason: isValid ? '' : 'Invalid password'
        }
    }, ['extraClass'], {
        type: 'text',
        value: 'defaultPassword'
    });

    expect(field.tagName).toEqual('INPUT');
    expect(field.name).toEqual('nameField');
    expect(field.description).toEqual('Type your name');
    expect(field.getAttribute('type')).toEqual('text');
    expect(field.cssClasses.includes('extraClass')).toBe(true);
    expect(field.getValue()).toEqual('defaultPassword');
    expect(field.getAttribute('value')).toEqual('defaultPassword');
    expect(field.validate().invalidReason).toEqual('Invalid password');

});