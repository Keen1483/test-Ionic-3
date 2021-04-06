import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from "firebase/app";
require("firebase/app");
require("firebase/auth");

import { TabsPage } from '../pages/tabs/tabs';
import { OptionsPage } from '../pages/options/options';
import { AuthPage } from '../pages/auth/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  optionsPage:any = OptionsPage;
  authPage: any = AuthPage;
  @ViewChild('content') content: NavController;

  isAuth = false;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      let config = {
        apiKey: "AIzaSyBnXFhXrCJ90pLYONCRq79aioY3NJwWfAg",
        authDomain: "ionic-first-89473.firebaseapp.com",
        projectId: "ionic-first-89473",
        storageBucket: "ionic-first-89473.appspot.com",
        messagingSenderId: "83788046388",
        appId: "1:83788046388:web:e06aa6564598f1e990aa61"
      };
      // Initialize Firebase
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.content.setRoot(this.tabsPage);
          } else {
            this.isAuth = false;
            this.content.setRoot(this.authPage, { mode: 'connect' });
          }
        }
      );
    });
  }
  
  onNavigate(page: any, data?: {}) {
      this.content.setRoot(page, data ? data : null);
      this.menuCtrl.close();
  }

  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }
}

