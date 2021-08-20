import PageElement from "./page";
import PageField from "./pageField";
import Pages from "./pages";

const page1 = new PageElement(1, 'page1', 'Personal data', [
    new PageField('name', 'Type your name', name => {

        const isValid = name.length > 4

        return {
            valid: isValid,
            invalidReason: isValid ? '' : 'Name too short!'
        }
    }),
    new PageField('age', 'Type your age', age => {

        const ageNum = Number(age);
        const isValid = !Number.isNaN(ageNum) && ageNum > 0 && ageNum < 120

        return {
            valid: isValid,
            invalidReason: isValid ? '' : 'Invalid age!'
        }
    })
], false, ['page-focused']);

const page2 = new PageElement(2, 'page2', 'Account info', [
    new PageField('email', 'Type your email address', email => {

        // Very stupid validation, but just for demonstration
        const isValid = email.length > 4 && email.includes('@')

        return {
            valid: isValid,
            invalidReason: isValid ? '' : 'Invalid e-mail address'
        }
    }),
    new PageField('passowrd', 'Create a password', password => {
        const isValid = password.trim().length > 4

        return {
            valid: isValid,
            invalidReason: isValid ? '' : 'Password too short!'
        }
    }, [], {
        type: 'password'
    })
], true);

page1.on('next', (data) => {
    const valid = page1.validate();
    for (let v of valid) {
        if (!v.valid) {
            return alert(v.invalidReason);
        }
    }
    Pages.next();
})

page2.on('back', () => Pages.back())
page2.on('next', () => {
    const valid = page2.validate();
    for (let v of valid) {
        if (!v.valid) {
            return alert(v.invalidReason);
        }
    }
    alert('Account created!');
})

page1.buildTo(document.querySelector('#root'));
page2.buildTo(document.querySelector('#root'))