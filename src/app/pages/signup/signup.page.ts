import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { EmailValidator } from '../../../validators/email';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public signupForm: FormGroup;
  public isLoading: boolean;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public firestore: AngularFirestore,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder) {
  }

  async presentAlert(errmsg) {
    const alert = await this.alertCtrl.create({
      header: 'Error!!!',
      subHeader: errmsg,
      buttons: [{ text: 'Ok', role: 'cancel' }]
    });

    await alert.present();
  }
  async presentLoading() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: 'Wait',
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  debug() {
    console.log(this.signupForm.get('firstName'));
  }
  signUp() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      retype: ['', Validators.compose([Validators.minLength(6), Validators.required, Validators.maxLength(8)])],
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    });
  }

  signupUser() {
    console.log('fumction called');

    // tslint:disable-next-line: triple-equals
    if (this.signupForm.value.password == this.signupForm.value.retype) {
      this.presentLoading();
      this.afAuth.auth.createUserWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password)
        .then((val) => {
          console.log(val);
          this.dismiss();
          console.log(val);
          const userId = this.afAuth.auth.currentUser.uid;
          const userDoc = this.firestore.doc<any>('users/ ' + userId);
          userDoc.set({
            firstName: this.signupForm.value.firstName,
            lastName: this.signupForm.value.lastName,
            email: this.signupForm.value.email,
            password: this.signupForm.value.password,
          });
          this.dismiss();
          this.router.navigateByUrl('/login');
        }, (error) => {
          this.dismiss();
          console.log('error');
          console.log(error);
          this.presentAlert(error.message);
        });

    } else {

      this.presentAlert('The password does not matched');
    }
  }


  ngOnInit() {
    this.signUp();
  }


}


