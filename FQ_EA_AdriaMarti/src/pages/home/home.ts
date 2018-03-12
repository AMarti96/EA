import { Component } from '@angular/core';
import {ActionSheetController, NavController,LoadingController,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  grid: Array<string>;
  constructor(public events: Events, public alertCtrl: AlertController, public http: Http, public storage: Storage, public navCtrl: NavController, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {

    http.get("http://10.193.155.95:3500/all").subscribe(data => {
       this.grid = Array(data.json().length);
        for(let i=0;i<data.json().length;i++) {
          this.grid[i] = data.json()[i]
        }

      }, error => {
        console.log("error")
      });
  }

}
