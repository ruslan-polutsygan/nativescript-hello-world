import { Component } from "@angular/core";

import {User} from '../../shared/user/user';
import {UserService} from '../../shared/user/user.service';
import {Router} from "@angular/router";

@Component({
    selector: "my-app",
    providers: [UserService],
    templateUrl: 'pages/login/login.html',
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]

})
export class LoginComponent {
    user: User;
    isLoggingIn = true;

    constructor(private router:Router, private userService:UserService) {
        this.user = new User();
        this.user.email = 'user-ruslan@example.com';
        this.user.password = 'pwd';
    }

    submit() {
        if(this.isLoggingIn) {
            this.signIn();
        } else {
            this.signUp();
        }
    }

    private signUp() {
        this.userService.register(this.user)
            .subscribe(
                () => {
                    alert("Your account was successfully created.");
                    this.toggleDisplay();
                },
                () => alert("Unfortunately we were unable to create your account.")
            );
    }

    private signIn() {
        this.userService.login(this.user)
            .subscribe(
                () => this.router.navigate(['/list']),
                () => alert("Unfortunately we were unable to create your account.")
            );
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}
