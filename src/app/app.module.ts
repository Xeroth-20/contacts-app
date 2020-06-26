import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotifyComponent } from './components/shared/notify/notify.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactComponent,
    NotifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
