import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Contact } from '../model/contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private url: string = 'https://contact-app-af64f.firebaseio.com';

    constructor(
        private _http: HttpClient
    ) { }

    public getContact(contactID: string): Observable<any> {
        return this._http.get(`${this.url}/contacts/${contactID}.json`)
            .pipe(
                map(res => this.genContact(contactID, res))
            );
    }

    public getContactList(): Observable<any> {
        return this._http.get(`${this.url}/contacts.json`)
            .pipe(
                map(res => {
                    return res
                        ? Object.keys(res).map(key => this.genContact(key, res[key]))
                        : []
                })
            );
    }

    public saveContact(contact: Contact): Observable<any> {
        return this._http.post(`${this.url}/contacts.json`, contact);
    }

    public updateContact(contactID: string, contact: Contact): Observable<any> {
        return this._http.put(`${this.url}/contacts/${contactID}.json`, contact);
    }

    public deleteContact(contactID: string): Observable<any> {
        return this._http.delete(`${this.url}/contacts/${contactID}.json`);
    }

    public genContact(contactID: string, body: any): Contact {
        return {
            id: contactID,
            ...body
        }
    }
}
