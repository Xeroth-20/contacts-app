import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

    public contactList: Contact[] = [];
    public isLoading: boolean = true;

    constructor(
        private _router: Router,
        private _contact: ContactService,
        private _notify: NotifyService
    ) { }

    ngOnInit(): void {
        setTimeout(() => {
            this._contact.getContactList()
                .subscribe((res: Contact[]) => {
                    this.isLoading = false;
                    this.contactList = res;
                });
        }, 500)
    }

    public editContact(contactID: string): void {
        this._router.navigate(['/contact', contactID]);
    }

    public deleteContact(contact: Contact, index: number): void {
        const areusure = confirm(`¿Estas seguro de eliminar a ${contact.firstname} de tu lista de contactos?`);

        if (areusure) {
            const deletedContact = contact;
            const deletedContactID = contact.id;
            this._contact.deleteContact(contact.id).subscribe(res => console.log('Se ha eliminado un contacto'));
            this.contactList.splice(index, 1);
            this._notify.fire({
                message: 'Se ha eliminado un contacto',
                duration: 3000,
                actions: [
                    {
                        name: 'deshacer',
                        fn: () => {
                            delete deletedContact.id;
                            this._contact.updateContact(deletedContactID, deletedContact)
                                .subscribe(
                                    res => this.contactList.push({ id: deletedContactID, ...res })
                                );
                        }
                    }
                ]
            })
        }
    }
}
