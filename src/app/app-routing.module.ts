import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
    { path: 'contact-list', component: ContactListComponent },
    { path: 'contact/:id', component: ContactComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'contact-list' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
