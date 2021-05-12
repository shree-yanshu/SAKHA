import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  success: boolean = false; // form sent successfully
  modal: Boolean = false; // display a modal after submission

  constructor() {
  }
  mobileView:boolean = false;
  ngOnInit(): void {
    if (window.innerWidth < 500){
      this.mobileView=true;
    }else{
      this.mobileView=false;
    }
    console.log("Mobile View",this.mobileView);
  }
}