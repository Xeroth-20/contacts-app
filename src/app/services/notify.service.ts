import { Injectable } from '@angular/core';
import { NotifyConfig } from '../interfaces/notify-config.interface';

import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotifyService {

    public notifyConfig: Subject<NotifyConfig>;

    constructor() {
        this.notifyConfig = new Subject();
    }

    public fire(notifyConfig: NotifyConfig) {
        if (!notifyConfig.duration) notifyConfig.duration = 2000;
        this.notifyConfig.next(notifyConfig);
    }
}
