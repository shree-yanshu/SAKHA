import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
form: FormGroup;

  fname: FormControl = new FormControl("", [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
  lname: FormControl = new FormControl("", [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  contact: FormControl = new FormControl("", [Validators.required,Validators.pattern("^[0-9_-]{10,12}")]);

  isLoading: boolean = false; // disable the submit button if loading
  success: boolean = false; // message sent successfully

  modal : Boolean = false; // display a modal after submission

  constructor(private formbuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formbuilder.group({
      fname : this.fname,
      email : this.email,
      lname : this.lname,
      contact : this.contact
    });
  }


  ngOnInit(): void {
  }



  onBlur(e : Event) {
    let el : Element = e.target as Element;
    let invalid : Boolean;

    switch(el.getAttribute('name')) {
      case 'fname':
        invalid = this.fname.invalid; 
        break;
      case 'lname':
        invalid = this.fname.invalid; 
        break;
      case 'email':
        invalid = this.email.invalid; 
        break;
      case 'contact':
        invalid = this.contact.invalid;
        break;
      
    }

    el.className = invalid ? 'error' : '';
  }



  onSubmit() {
    if (this.form.status == "VALID") {
      this.form.disable(); // disable the form if it's valid to disable multiple submissions
      var formData: any = new FormData();
      formData.append("fname", this.form.get("fname").value);
      formData.append("lname", this.form.get("lname").value);
      formData.append("email", this.form.get("email").value);
      formData.append("contact", this.form.get("contact").value);
      this.isLoading = true; // sending the post request async so it's in progress
      this.modal = false; // hide the modal on multiple submits
      this.http.post("https://script.google.com/macros/s/AKfycbw5uBkchmmcoD4jH-1o0OqjOEFwsKUp186PFKLnitzPfJ2dDZvE/exec", formData).subscribe(
        (response) => {
          // choose the response message
          if (response["result"] == "success") {
            this.success = true;
          } else {
            this.success = false;
          }
          this.form.enable(); // re enable the form after a success
          this.modal = true; // show the response message
          this.isLoading = false; // re enable the submit button
          console.log(response);
        },
        (error) => {
          this.success = false;
          this.form.enable(); // re enable the form after a success
          this.modal = true; // show the response message
          this.isLoading = false; // re enable the submit button
          console.log(error);
        }
      );
    }
  }

// SELECT STATE AND CITY
State: any = [
  { id: 1, name: "Gujarat" },
  { id: 2, name: "Maharastra" },
  { id: 3, name: "Rajasthan" }
]

City: any = [
  { id: 1, name: "Ahmedabad", state: 1 },
  { id: 2, name: "Rajkot", state: 1 },
  { id: 3, name: "Gandhinagar", state: 1 },
  { id: 4, name: "Mumbai", state: 2 },
  { id: 5, name: "Pune", state: 2 },
  { id: 6, name: "Udaipur", state: 3 },
  { id: 7, name: "Jaipur", state: 3 }
]

selectedState : any = "";
selectedCity : any = "";

dropdownCity: any = [];

populateCity(value) {
  this.dropdownCity = this.City.filter(i => i.state == value);
}


}
