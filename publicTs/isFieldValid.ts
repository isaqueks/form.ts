
export default interface ValidationResult {
    valid: boolean;
    invalidReason: string;
}

export class FieldValidation {
    /**
     * @param reason The rason for being invalid
     * @returns Invalid IsFieldValid
     */
     static invalidField(reason: string): ValidationResult {
        return {
            valid: false,
            invalidReason: reason
        }
    }

    /**
     * @returns A valid IsFieldValid with null invalidReason
     */
    static validField(): ValidationResult {
        return {
            valid: true,
            invalidReason: null
        }
    }

    /**
     * @param condition The condition to determine if the field is valid or not
     * @param invalidReason The reason to return if the field is not valid
     * @returns The result
     */
    static validIf(condition: boolean, invalidReason: string): ValidationResult {
        return condition ? this.validField() : this.invalidField(invalidReason);
    }

    /**
     * 
     * @param validations All the possible validations
     * @returns The first invalid validation or a valid ValidationResult
     */
    static invalidOne(...validations: ValidationResult[]): ValidationResult {
        for (let validation of validations) {
            if (!validation.valid) {
                return validation;
            }
        }
        return this.validField();
    }

}