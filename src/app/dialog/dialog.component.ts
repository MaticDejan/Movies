import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {MovieService} from '../services/movie.service';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    action: string;
    local_data: any;

    imgSrc: string;
    selectedImage: any = null;
    formTemplate = new FormGroup({
        title: new FormControl(''),
        category: new FormControl(''),
        description: new FormControl(''),
        duration: new FormControl(0),
        imageUrl: new FormControl(''),
        trailerUrl: new FormControl(''),
    });

    constructor(private storage: AngularFireStorage, private service: MovieService, public dialogRef: MatDialogRef<DialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.local_data = {...data};
        this.action = this.local_data.action;
    }

    showPreview(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => this.imgSrc = e.target.result;
            reader.readAsDataURL(event.target.files[0]);
            this.selectedImage = event.target.files[0];
        }
        else {
            this.imgSrc = this.local_data.imageUrl;
            this.selectedImage = null;
        }
    }

    doAction(formValue) {
        if (this.formTemplate.valid) {
            var directory = `Movies`;
            var filePath = `${directory}/${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
            const fileRef = this.storage.ref(filePath);
            this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
                finalize(() => {
                    fileRef.getDownloadURL().subscribe((url) => {
                        formValue['imageUrl'] = url;
                        this.local_data.imageUrl = url;
                        this.resetForm();
                    })
                })
            ).subscribe();
        }
        this.dialogRef.close({event: this.action, data: this.local_data});
    }

    get formControls() {
        return this.formTemplate['controls'];
    }

    resetForm() {
        this.formTemplate.reset();
        this.formTemplate.setValue({
            title: '',
            category: 'Action',
            description: '',
            duration: 0,
            imageUrl: '',
            trailerUrl: '',
        });
        this.imgSrc = this.local_data.imageUrl;
        this.selectedImage = null;
    }

    closeDialog() {
        this.dialogRef.close({event: 'Cancel'});
    }

    ngOnInit(): void {
        this.resetForm();
    }
}
