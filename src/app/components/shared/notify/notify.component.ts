import { Component, OnInit } from '@angular/core';

import { NotifyService } from 'src/app/services/notify.service';
import { NotifyConfig } from 'src/app/interfaces/notify-config.interface';

@Component({
    selector: 'app-notify',
    templateUrl: './notify.component.html',
    styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

    public nfc: NotifyConfig;
    public expired: boolean = true;

    constructor(
        private _notify: NotifyService
    ) {
        this._notify.notifyConfig
            .subscribe(
                (nfc) => {
                    this.nfc = nfc;
                    this.expired = false;
                    setTimeout(() => {
                        this.expired = true;
                    }, nfc.duration);
                }
            );
    }

    ngOnInit(): void { }
}
