import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    public firestore: AngularFirestore,

  ) { }
  userId: any;
  email: any;

  logo = './assets/icon/profile.jpg';

  viewProfile() {
    this.userId = this.afAuth.auth.currentUser.uid;
    this.email = this.afAuth.auth.currentUser.email;
    console.log(this.userId);

  }


  ngOnInit() {
    this.viewProfile();

  }

}
