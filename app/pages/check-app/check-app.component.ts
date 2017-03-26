import {Component} from "@angular/core";
import * as dialog from 'ui/dialogs';

import * as appAvailability from 'nativescript-appavailability';
import * as app from "application";

@Component({
    selector: "check-app",
    templateUrl: 'pages/check-app/check-app.html',

})
export class CheckAppComponent {
    checkStatus:string;
    constructor() {
        this.checkStatus='Did not check yet. Click button above';
    }

    check() {
        let appToCheck = 'com.joelapenna.foursquared';
        this.checkStatus = 'checking';

        appAvailability.available(appToCheck).then((result:boolean) => {
            if(result) {
                console.log('yes');
                this.checkStatus = 'app is there';
            } else {
                console.log('no');
                this.checkStatus = 'app not installed';

                const Intent = android.content.Intent;
                const Uri = android.net.Uri;

                let intent = new Intent(
                    Intent.ACTION_VIEW,
                    Uri.parse("market://details?id=" + appToCheck)
                );
                app.android.currentContext.startActivity(intent);

            }
        });
    }
}
