import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { InteractionComponent } from './interaction/interaction.component';
import { PresentationComponent } from './presentation/presentation.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


const routes: Routes = [
    {path:'presentation/:map', component: PresentationComponent},
     {path:'interaction/:map/:zone', component: InteractionComponent},
    {path:'interaction/:map', component: InteractionComponent},
    {path:'portal', component: PortalComponent}, 
    {path:'./', component: PortalComponent} 
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
    providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
