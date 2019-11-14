import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from 'src/validators/email';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {
  resetPwdForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController) {
    this.resetPwdForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
  }

  ngOnInit() {
  }
  resetUserPwd() {
    this.afAuth.auth.sendPasswordResetEmail(this.resetPwdForm.value.email).then(async (user) => {
      const alert = this.alertCtrl.create({
        message: 'We just sent a link to reset your password to your email.',
        buttons: [{
          text: 'Ok', role: 'cancel',
          handler: () => {
            this.navCtrl.pop();
          }
        }]
      });
      (await alert).present();
    }, async (error) => {
      const errorAlert = this.alertCtrl.create({
        message: error.message,
        buttons: [{ text: 'Ok', role: 'cancel' }]
      });
      (await errorAlert).present();
    });
  }
}
