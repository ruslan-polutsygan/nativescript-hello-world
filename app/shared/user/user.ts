import * as emailValidator from "email-validator";

export class User {
    email: string;
    password: string;

    isEmailValid():boolean {
        return emailValidator.validate(this.email);
    }
}
