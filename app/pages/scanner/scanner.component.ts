import {Component, OnInit} from "@angular/core";
import {Android as AndroidScannerOptions, BarcodeScanner} from "nativescript-barcodescanner";

@Component({
    selector: "scanner",
    templateUrl: 'pages/scanner/scanner.html',
})
export class ScannerComponent implements OnInit {
    public status:string;
    private scanner: BarcodeScanner;
    private permissionGranted: boolean;

    constructor() {
        this.scanner = new BarcodeScanner();
    }

    ngOnInit(): void {
        this.scanner.hasCameraPermission()
            .then((result:boolean) => {
                if(result) {
                    console.log('1 granted');
                    return Promise.resolve(true);
                } else {
                    console.log('1 not yet granted');
                    return this.scanner.requestCameraPermission();
                }
            })
            .then((granted:boolean) => {
                console.log(granted);

                this.permissionGranted = granted;
                this.status = granted ?
                    'Permission granted. Click the button' :
                    'Permission not granted';
            })
        ;
    }

    public scan() {
        let scannerOptions: AndroidScannerOptions = {
            message: "Go scan something",
            preferFrontCamera: false,
            showFlipCameraButton: true,
            beepOnScan: true
        };

        this.scanner.scan(scannerOptions)
            .then((result) => {
                this.status = 'Code: ' + result.text;
            })
            .catch((e:Error) => {
                this.status = 'Error: ' + e.message;
            })
        ;
    }
}
