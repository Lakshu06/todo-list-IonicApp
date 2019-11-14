import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { IonicStorageModule } from '@ionic/storage';
import { AuthGuardService } from '../app/services/auth-guard.service';
import { AuthenticationService } from '../app/services/authentication.service';


export const firebaseConfig = {
  apiKey: ' AIzaSyBdGhNeWw4 - WpPfXh5vrc_l44F4tYJNJy4',
  authDomain: 'todoapp-48df0.firebaseapp.com',
  databaseURL: 'https://todoapp-48df0.firebaseio.com',
  projectId: 'todoapp-48df0',
  storageBucket: 'todoapp-48df0.appspot.com',
  messagingSenderId: '635449835555',
  appId: '1:635449835555:web:a0b23af5289034575f3196',
  measurementId: 'G-3J013H0N88'
};
@NgModule({
  declarations: [AppComponent],

  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['localstorage', 'sqlite', 'indexeddb', 'websql']
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuardService,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
