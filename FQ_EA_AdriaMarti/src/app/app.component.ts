import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DetalleUserPage} from '../pages/DetalleUsuario/detalleusuario';
import {FiltroAsignaturaPage} from '../pages/FiltroAsignatura/filtroasignatura';
import {DetalleAsignaturaPage} from '../pages/DetalleAsignatura/detalleasignatura';
import { ListPage } from '../pages/list/list';
import {FiltroTitulacionPage} from '../pages/FiltroTitulacion/filtrotitulacion';
import {AsignaturasPage} from "../pages/Asignaturas/asignaturas";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Todos los alumnos', component: HomePage },
      { title: 'Todas las asignaturas', component: AsignaturasPage },
      { title: 'Filtro por Nombre', component: ListPage },
      { title: 'Orden alfabetico', component: HomePage },
      { title: 'Filtro por titulacion', component: FiltroTitulacionPage },
      { title: 'Filtro por asignaturas', component: FiltroAsignaturaPage },
      { title: 'Detalle alumno', component: DetalleUserPage },
      { title: 'Detalle de asignaturas', component: DetalleAsignaturaPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
