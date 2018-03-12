import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { ContactPage } from '../contact/contact';
import { ExtraPage } from '../extra/extra'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ListPage;
  tab3Root: any = ContactPage;
  tab4Root: any = ExtraPage;

  constructor() {

  }
}
