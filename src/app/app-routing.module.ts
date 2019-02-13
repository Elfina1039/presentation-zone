import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { InteractionComponent } from './interaction/interaction.component';


const routes: Routes = [
    {path:'interaction/:zid', component: InteractionComponent},
    {path:'portal', component: PortalComponent} 
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
