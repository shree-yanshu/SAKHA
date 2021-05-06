import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RouterModule, Routes } from '@angular/router';
//import { FooterComponent } from './footer/footer.component';
const routes: Routes = [
  {path:'', component:HomeComponent}
  //{path:'footer', component:FooterComponent},
  {path:'', component:HomeComponent},
  {path:'contact-us', component:ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
