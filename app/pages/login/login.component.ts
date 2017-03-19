import { Page } from "ui/page";
import {Component, OnInit, ElementRef, ViewChild, NgZone} from "@angular/core";
import {Router} from "@angular/router";
import { View } from "ui/core/view";
import { Color } from "color";
import {TextField} from "ui/text-field";
import * as settings from "application-settings";
import {User} from '../../shared/user/user';
import {UserService} from '../../shared/user/user.service';
import * as utils from '../../utils/hint-util';
import * as application from 'application';

@Component({
    selector: "my-app",
    providers: [UserService],
    templateUrl: 'pages/login/login.html',
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]

})
export class LoginComponent implements OnInit {
    user: User;
    isLoggingIn = true;
    statusMessage:string = 'doing nothing';

    @ViewChild('container')
    container: ElementRef;

    @ViewChild('email')
    email: ElementRef;

    @ViewChild('password')
    password: ElementRef;

    constructor(private router:Router, private userService:UserService, private page:Page, private zone:NgZone) {
        this.user = new User();
        this.user.email = settings.getString('user.email', 'user@nativescript.org');
        this.user.password = settings.getString('user.password', 'password');
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = 'res://bg_login';

        console.log(application.android.context.getFilesDir());
        console.log(application.android.context.getCacheDir());
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

        settings.setString('user.email', this.user.email);
        settings.setString('user.password', this.user.password);
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
        this.setTextFieldColors();
        let container = <View>this.container.nativeElement;
        container.animate({
            backgroundColor: this.isLoggingIn ? new Color('white') : new Color('#301217'),
            duration: 200
        });
    }

    setTextFieldColors() {
        let emailTextField = <TextField>this.email.nativeElement;
        let passwordTextField = <TextField>this.password.nativeElement;

        let mainTextColor = new Color(this.isLoggingIn ? "black" : "#C4AFB4");
        emailTextField.color = mainTextColor;
        passwordTextField.color = mainTextColor;

        let hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
        utils.setHintColor({ view: emailTextField, color: hintColor });
        utils.setHintColor({ view: passwordTextField, color: hintColor });
    }

    doSomething() {
        this.statusMessage = 'doing something';
        let worker = new Worker('../../worker/worker');
        worker.postMessage( {payload: {key: 'value'} });
        //
        worker.onmessage = (msg) => {
            console.log('response received');
            console.dump(msg);

            this.zone.run(() => {
                if(msg.data.success) {
                    this.statusMessage = 'Job is done!';
                } else {
                    this.statusMessage = 'Was not able to complete job'
                }
                worker.terminate();

                console.log(this.statusMessage);
            });
        };

        worker.onerror = (error) => {
            console.log('Unhandled error');
            console.dump(error);
        };
    }
}

























