import { Component } from '@angular/core';
import {ActionSheetController, NavController,LoadingController,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from "@angular/http";
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
@Component({
  selector: 'page-list',
  templateUrl: 'detalleusuario.html'
})
export class DetalleUserPage {
  name:string;
  pass:string;
  card:boolean;
  grid: Array<string>;
  filterDB:string;
  constructor(public events: Events, public alertCtrl: AlertController, public http: Http, public storage: Storage, public navCtrl: NavController, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    this.card=false;
  }

  filter(){
    var data={
      name:this.filterDB
    }
    this.http.post("http://10.193.155.95:3500/studet",data).subscribe(data => {
      this.name = data.json().name;
      this.pass = data.json().pass;
      this.card=true;
      this.grid = Array(data.json().sub.length);
      for(let i=0;i<data.json().sub.length;i++) {
        this.grid[i] = data.json().sub[i]
      }

    }, error => {
      console.log("error")
    });

  }

}
