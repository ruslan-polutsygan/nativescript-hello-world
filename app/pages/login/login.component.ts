import { Page } from "ui/page";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { View } from "ui/core/view";
import { Color } from "color";

import {User} from '../../shared/user/user';
import {UserService} from '../../shared/user/user.service';
import {Router} from "@angular/router";

@Component({
    selector: "my-app",
    providers: [UserService],
    templateUrl: 'pages/login/login.html',
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]

})
export class LoginComponent implements OnInit {
    user: User;
    isLoggingIn = true;

    @ViewChild('container')
    container: ElementRef;

    constructor(private router:Router, private userService:UserService, private page:Page) {
        this.user = new User();
        this.user.email = 'user@nativescript.org';
        this.user.password = 'password';
        // this.user.email = 'user-ruslan@example.com';
        // this.user.password = 'pwd';
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = 'res://bg_login';
    }

    submit() {
        if(!this.user.isEmailValid()) {
            alert('Invalid email');
            return;
        }

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
        let container = <View>this.container.nativeElement;
        container.animate({
            backgroundColor: this.isLoggingIn ? new Color('white') : new Color('#301217'),
            duration: 200
        })
    }
}
