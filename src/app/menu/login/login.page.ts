import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  isTypePassword: boolean = true;
  isLogin = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.initForm();
  }

  ngOnInit(): void {}

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
    });
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
    if (!this.form.valid) return;
    console.log(this.form.value);
    this.login(this.form);
  }

  onForgotPassword() {
    const email = this.form.get('email')?.value;
    if (email) {
      this.authService.sendPasswordResetEmail(email)
        .then(() => {
          this.showAlert('Password reset email sent. Check your inbox.');
        })
        .catch((e) => {
          console.log(e);
          this.showAlert('Could not send password reset email. Please try again.');
        });
    } else {
      this.showAlert('Please enter your email address.');
    }
  }

  login(form: any) {
    this.isLogin = true;
    this.authService.login(form.value.email, form.value.password).then((data) => {
        console.log(data);
        this.isLogin = false;
        this.router.navigateByUrl('/home');
        form.reset();
      })
      .catch(e => {
        this.isLogin = false;
        console.log(e);
        let msg: string = 'Could not Sign You In, Please try Again.';
        if (e.code == 'auth/user-not-found')
          msg = 'E-mail Adress Could Not Be Found';
        else if (e.code == 'auth/wrong-password')
          msg = 'Please Enter A Correct Password';
        this.showAlert(msg);
      });
  }

  async showAlert(msg: any) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goBackToNotes() {
    // Use Angular Router to navigate back to 'notes' page
    this.router.navigate(['/notes']); // replace 'notes' with the actual route of your notes page
  }
}
