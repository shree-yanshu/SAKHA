import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  form: FormGroup;

  name: FormControl = new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  subject: FormControl = new FormControl("", [Validators.required]);
  message: FormControl = new FormControl("", [Validators.required]);

  isLoading: boolean = false; // disable the submit button if loading
  success: boolean = false; // message sent successfully

  modal : Boolean = false; // display a modal after submission

  constructor(private formbuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formbuilder.group({
      name : this.name,
      email : this.email,
      subject : this.subject,
      message : this.message
    });
  }

  ngOnInit(): void {
  }

  onBlur(e : Event) {
    let el : Element = e.target as Element;
    let invalid : Boolean;

    switch(el.getAttribute('name')) {
      case 'name':
        invalid = this.name.invalid; 
        break;
      case 'email':
        invalid = this.email.invalid; 
        break;
      case 'subject':
        invalid = this.subject.invalid; 
        break;
      case 'message':
        invalid = this.message.invalid; 
        break;
    }

    el.className = invalid ? 'error' : '';
  }

  onSubmit() {
    if (this.form.status == "VALID") {
      this.form.disable(); // disable the form if it's valid to disable multiple submissions
      this.modal = false; // hide the modal on multiple submits
  
      var formData: any = new FormData();
      formData.append("name", this.form.get("name").value);
      formData.append("email", this.form.get("email").value);
      formData.append("subject", this.form.get("subject").value);
      formData.append("message", this.form.get("message").value);
      
      this.isLoading = true; // sending the post request async so it's in progress
      
      this.http.post("https://script.google.com/macros/s/AKfycbxZWoUDKJo3zoIR5-bRJ2QKNghAyhobYE4-LbEAP4dqGHovkOfiiSaLWuH3wME3SEKg/exec", formData).subscribe(
        (response) => {
          // choose the response message
          if (response["result"] == "success") {
            this.success = true;
          }
          else {
            this.success = false;
          }
          console.log(response);
        },
        (error) => {
          this.success = false;
          console.log(error);
        }
      );
      
      this.isLoading = false; // re enable the submit button
      this.modal = true; // show the response message
      
      this.form.reset();
      
      this.form.enable(); // re enable the form after submission
    }
  }
}