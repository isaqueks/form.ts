import ValidationResult, { FieldValidation } from "./isFieldValid";
import PageElement from "./page";
import PageField from "./pageField";
import Pages from "./pages";

class NameField extends PageField<string> {

    override getOutputValue() {
        return this.getValue();
    }

    override validateField(): ValidationResult {
        return FieldValidation.validIf(this.getValue().trim().length > 4, 'Name too short')
    }

}

class AgeField extends PageField<number> {

    override afterConstruct() {
        this.setAttribute('type', 'number');
    }


    override getOutputValue() {
        return Number(this.getValue());
    }

    override validateField(): ValidationResult {

        const value = this.getValue();
        const valueNum = Number(value);

        return FieldValidation.invalidOne(
            FieldValidation.validIf(!Number.isNaN(valueNum), 'Invalid number'),
            FieldValidation.validIf(valueNum > 0, 'Expected positive number'),
            FieldValidation.validIf(valueNum < 120, 'Age too high')
        );
    }

}

class EmailField extends PageField<string> {

    override afterConstruct() {
        this.setAttribute('type', 'email');
    }

    override getOutputValue() {
        return this.getValue();
    }

    override validateField(): ValidationResult {

        const value = this.getValue().trim();

        // Very stupid email validation,
        // but only for demo purposes
        return FieldValidation.invalidOne(
            FieldValidation.validIf(value.length > 4, 'Invalid email address'),
            FieldValidation.validIf(value.includes('@'), 'Expected @'),
            FieldValidation.validIf(value.includes('.'), 'Expected a .')
        );
    }

}

class PasswordField extends PageField<string> {

    override afterConstruct() {
        this.setAttribute('type', 'password');
    }


    override getOutputValue() {
        return this.getValue();
    }

    override validateField(): ValidationResult {
        return FieldValidation.validIf(this.getValue().trim().length >= 8, 'Password too short')
    }

}

interface UserInfo {
    name: string;
    age: number;
}

interface UserLogin {
    email: string;
    password: string;
}

const userInfoPage = new PageElement<UserInfo>(1, 'page1', 'Personal data', [
    new NameField('name', 'Type your name'),
    new AgeField('age', 'Type your age')
], false);

const loginPage = new PageElement<UserLogin>(2, 'page2', 'Account info', [
    new EmailField('email', 'Type your email address'),
    new PasswordField('password', 'Create a password')
], true);

userInfoPage.on('next', (data) => {
    const invalid = userInfoPage.getValidationError();
    if (invalid) {
        return alert(invalid);
    }

    Pages.next();
})

loginPage.on('back', () => Pages.back())
loginPage.on('next', () => {
    const invalid = loginPage.getValidationError();
    if (invalid) {
        return alert(invalid);
    }

    const userInfo = userInfoPage.getOutput();
    const loginInfo = loginPage.getOutput();

    console.log('Output: ', userInfo, loginInfo);
    

    alert(
        'Account created!\n'+
        'User data:\n'+
        `User name: ${userInfo.name}\n` +
        `User age: ${userInfo.age}\n` +
        'Login data:\n' +
        `Email: ${loginInfo.email}\n` + 
        `Password: ****${loginInfo.password.substring(4)}`
    );
})

userInfoPage.buildTo(document.querySelector('#root'));
loginPage.buildTo(document.querySelector('#root'))