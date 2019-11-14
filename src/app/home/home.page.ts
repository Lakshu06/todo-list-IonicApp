import { Component } from '@angular/core';
import { NavController, LoadingController, IonApp } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import swal from 'sweetalert';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  taskName: string;
  taskList = [];

  constructor(
    public altctl: AlertController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    private app: IonApp,
    public router: Router,
    private storage: Storage,
    private authenService: AuthenticationService

    // public appCtrl: App
  ) { this.getValue('key'); }

  isLoading: boolean;

  removeValue(key: string) {
    this.storage.remove(key)
      .then((response) => {
        console.log('remove value of ' + key + ' ' + response);
      }).catch((error) => {
        console.log('error value of ' + key + ' ' + error);
      });
  }




  getValue(key: string) {
    this.storage.get(key)
      .then((response) => {
        if (response != null) {
          console.log('get value of' + key + ' ', response);
          this.authenService.setUserAuth(true);
          this.router.navigateByUrl('/home');
        } else {
          console.log('get value of' + key + ' ', response);
          this.authenService.setUserAuth(false);
          this.router.navigateByUrl('/login');
        }
        console.log('get value of' + key + ' ', response);
        this.authenService.setUserAuth(true);
        this.router.navigateByUrl('/home');
      }).catch((error) => {
        console.log('get error for ' + key + ' ', error);
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

  logout() {
    this.presentLoading();
    return this.afAuth.auth.signOut()
      .then(() => {
        this.dismiss();
        this.removeValue('key');
        this.router.navigateByUrl('/login');
        // this.authenService.setUserAuth(false);
      });
    // });
  }


  addTask() {
    if (this.taskName.length > 0) {
      const task = this.taskName;
      this.taskList.push(task);
      this.taskName = '';
    }
  }
  async deleteTask(index) {

    const alert = await this.alertCtrl.create({
      title: 'Confirm!',
      message: 'Are you sure want to delete!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            swal('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          // tslint:disable-next-line: no-shadowed-variable
          handler: (index: any) => {
            this.taskList.splice(index, 1);
            swal('Successfully Deleted');
          }
        }
      ]

    } as any);

    await alert.present();
  }



  async updateTask(index) {

    const alert = this.alertCtrl.create({
      title: 'Update Task?',
      message: 'Type in your new task to update.',
      inputs: [{ name: 'editTask', placeholder: 'Task' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
      {
        text: 'Update', handler: (data: { editTask: any; }) => {
          this.taskList[index] = data.editTask;
          swal('successfully updated');
        }
      }
      ]
    } as any);
    (await alert).present();
  }


}
