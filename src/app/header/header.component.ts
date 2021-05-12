import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
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
