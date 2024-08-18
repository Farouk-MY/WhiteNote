import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm!: FormGroup;
  isTypePassword: boolean = true;
  isLoading:boolean=false;

  constructor(
    private router : Router,
    private authService:AuthService,
    private alertController :AlertController
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.signupForm = new FormGroup({
      username: new FormControl('', 
        {validators: [Validators.required]}
      ),
      email: new FormControl('', 
        {validators: [Validators.required, Validators.email]}
      ),
      password: new FormControl('', 
        {validators: [Validators.required, Validators.minLength(8)]}
      ),
    });
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
    if(!this.signupForm.valid) return;
    console.log(this.signupForm.value);
    this.register(this.signupForm)
  }

  register(form: any){
    this.isLoading = true;
  
    console.log(form.value);
    
    this.authService.register(form.value).then(async (data: any) => {
      console.log(data);
  
      await this.authService.logout(); // Logout the user after registration
  
      this.showAlert('Registration successful! Check your email for verification.');
      this.router.navigateByUrl('/login'); // Redirect to login page or any other page
  
      this.isLoading = false;
      form.reset();
    }).catch(e => {
      console.log(e);
  
      this.isLoading = false;
  
      if (e.code === 'auth/email-already-in-use') {
        // Handle the case where the email is already in use
        this.showAlert('Email is already in use. If you have an account, please log in.');
      } else {
        // Handle other errors
        let msg: string = 'Could not Sign You Up, Please try Again.';
        this.showAlert(msg);
      }
    });
  }

  async showAlert(msg : any){
    const alert = await this.alertController.create({
      header: 'Alert',
      //subHeader: 'Important message',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present()
  }

}