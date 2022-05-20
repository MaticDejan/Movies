import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    action: string;
    local_data: any;

    constructor(public dialogRef: MatDialogRef<DialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.local_data = {...data};
        this.action = this.local_data.action;
    }

    doAction() {
        this.dialogRef.close({event: this.action, data: this.local_data});
    }

    closeDialog() {
        this.dialogRef.close({event: 'Cancel'});
    }

    ngOnInit(): void {
    }
}
