import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    public contactForm: FormGroup;
    public formTitle: string = '';

    constructor(
        private _aroute: ActivatedRoute,
        private _fb: FormBuilder,
        private _contact: ContactService,
        private _notify: NotifyService
    ) {
        this.contactForm = this._fb.group({
            id: this._fb.control({ value: '', disabled: true }),
            firstname: ['', [Validators.required]],
            lastname: [''],
            email: ['', [Validators.email]],
            cpnumber: ['', [Validators.pattern('[0-9]{9}')]],
            favorite: [false]
        });
    }

    ngOnInit(): void {
        const contactID = this._aroute.snapshot.paramMap.get('id');
        if (contactID == 'new') {
            this.formTitle = 'Agregar contacto';
        } else {
            this.formTitle = 'Editar contacto';
            this.contactForm.get('id').setValue(contactID);
            this._contact.getContact(contactID)
                .subscribe((contact: Contact) => {
                    this.contactForm.setValue(contact);
                });
        }
    }

    public onSubmit(): void {
        if (this.contactForm.valid) {
            if (this.contactForm.get('id').value) {
                this._contact.updateContact(this.contactForm.get('id').value, this.contactForm.value)
                    .subscribe(res => {
                        this._notify.fire({
                            message: 'Se han guardado los cambios'
                        });
                    });
            } else {
                this._contact.saveContact(this.contactForm.value)
                    .subscribe((res: any) => {
                        this.contactForm.get('id').setValue(res.name);
                        this._notify.fire({
                            message: 'Se ha agregado un nuevo contacto'
                        });
                    });
            }
        } else {
            this._notify.fire({
                message: 'Por favor rellena los campos'
            });
        }
    }
}
