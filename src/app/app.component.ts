import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';

import { ChatList } from '../chat/chat-list/chat-list.component';
import { Login } from '../authentication/login/login.component';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  rootPage : any = ChatList;

  constructor(private afAuth : AngularFireAuth, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    this.afAuth.authState.subscribe(auth => {
      if(!auth)
        this.rootPage = Login;
      else
        this.rootPage = ChatList;
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
