import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'contact-us', component:ContactUsComponent},
  {path:'coming-soon', component:ComingSoonComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
