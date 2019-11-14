import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { EmailValidator } from 'src/validators/email';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(

    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public router: Router,
    private storage: Storage,
    public authenService: AuthenticationService
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
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
  async presentAlert(errmsg) {
    const alert = await this.alertCtrl.create({
      header: 'Error!!!',
      subHeader: errmsg,
      buttons: [{ text: 'Ok', role: 'cancel' }]
    });

    await alert.present();
  }

  ngOnInit() {
  }
  login() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  setValue(key: string, value: any) {
    this.storage.set(key, value)
      .then((response) => {
        console.log('set value of' + key + ' ', response);
        this.getValue(key);
      }).catch((error) => {
        console.log('set error for ' + key + ' ', error);
      });
  }

  getValue(key: string) {
    this.storage.get(key)
      .then((response) => {
        console.log('get value of' + key + ' ', response);
        this.authenService.setUserAuth(true);
        this.router.navigateByUrl('/home');
      }).catch((error) => {
        console.log('get error for ' + key + ' ', error);
      });
  }
  loginUser() {
    this.presentLoading();
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then((response) => {
      this.dismiss();
      this.setValue('key', this.loginForm.value.email);
      this.loginForm.reset();
    }, (error) => {
      this.dismiss();
      this.presentAlert(error.message);
    });
  }

  resetpwd() {
    this.router.navigateByUrl('forgetpassword');
  }


}
