import {Component, OnInit, ElementRef, ViewChild, NgZone} from "@angular/core";
import {Grocery} from "../../shared/grocery/grocery";
import {GroceryListService} from "../../shared/grocery/grocery-list.service";
import {TextField} from "ui/text-field";
import * as SocialShare from "nativescript-social-share";
import * as dialog from 'ui/dialogs';

@Component({
    selector: "lsit",
    templateUrl: 'pages/list/list.html',
    styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
    providers: [GroceryListService]

})
export class ListComponent implements OnInit {
    groceryList: Array<Grocery> = [];
    grocery:string = "";
    isLoading: boolean = false;
    listLoaded: boolean = false;

    @ViewChild('groceryTextField')
    groceryTextField: ElementRef;

    constructor(private groceryListService: GroceryListService, private zone:NgZone) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.groceryListService.load()
            .subscribe(loadedGroceries => {
                loadedGroceries.forEach((groceryObject) => {
                    this.groceryList.unshift(groceryObject);
                });

                this.isLoading = false;
                this.listLoaded = true;
            });
    }

    add() {
        if(this.grocery.trim() === '') {
            alert('Enter grocery');
            return;
        }

        let textField = <TextField>this.groceryTextField.nativeElement;
        textField.dismissSoftInput();

        this.groceryListService.add(this.grocery)
            .subscribe(
                groceryObject => {
                    this.groceryList.unshift(groceryObject);
                    this.grocery = "";
                },
                () => {
                    alert({
                        message: "An error occurred while adding an item to your list.",
                        okButtonText: "OK"
                    });
                    this.grocery = "";
                }
            )
    }

    delete(item:Grocery) {
        dialog.confirm('Are you sure you want to delete "'+item.name+'"?')
            .then((result:boolean) => {
                if(!result) {
                    return;
                }
                this.groceryListService.delete(item.id)
                    .subscribe(() => {
                            this.zone.run(() => {
                                this.groceryList.splice(
                                    this.groceryList.indexOf(item), 1
                                );
                            });
                        },
                        () => {
                            alert({
                                message: 'Could not delete "'+item.name+'"',
                                okButtonText: "OK"
                            });
                        }
                    )
            })
        ;
    }

    share() {
        let list = [];
        for (let i = 0, size = this.groceryList.length; i < size ; i++) {
            list.push(this.groceryList[i].name);
        }
        let listString = list.join(", ").trim();
        SocialShare.shareText(listString);
    }
}
