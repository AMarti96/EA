import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DetalleUserPage} from '../pages/DetalleUsuario/detalleusuario';
import {FiltroTitulacionPage} from '../pages/FiltroTitulacion/filtrotitulacion';
import {FiltroAsignaturaPage} from '../pages/FiltroAsignatura/filtroasignatura';
import {AsignaturasPage} from "../pages/Asignaturas/asignaturas";
import {DetalleAsignaturaPage} from '../pages/DetalleAsignatura/detalleasignatura';
import {HttpModule} from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import {MomentModule} from 'angular2-moment';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AsignaturasPage,
    DetalleUserPage,
    FiltroAsignaturaPage,
    DetalleAsignaturaPage,
    FiltroTitulacionPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FiltroAsignaturaPage,
    AsignaturasPage,
    DetalleAsignaturaPage,
    DetalleUserPage,
    FiltroTitulacionPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
