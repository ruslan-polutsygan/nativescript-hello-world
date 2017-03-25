import {Component, OnInit, ElementRef, ViewChild, NgZone} from "@angular/core";

@Component({
    selector: "other-pages",
    templateUrl: 'pages/other/other.html',

})
export class OtherComponent {

    statusMessage:string = 'doing nothing';

    constructor(private zone:NgZone) {
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

























