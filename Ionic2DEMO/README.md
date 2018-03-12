# Ionic2DEMO

## Getting Started

* Clone this repository: `git clone https://github.com/AMarti96/Ionic2DEMO.git`.
* Ejecuta `npm install` from the project root.
* Instala (`npm install -g  cordova ionic`)
* Ejecuta `ionic serve` en un terminal en el directorio donde se encuentra el proyecto.
* Para crear la build, añade la plataforma con un `ionic platform add android`y a continuación `ionic build android`
* Si dispones de un dispositivo Mac, puedes cambiar android por ios.
* Disfruta


## File Structure of App

```
myApp2/
|
|
|-- plugins/
|
|-- resources/
|
|-- src/
|    |-- app/
|    |    ├── app.component.ts
|    |    └── app.module.ts
|    |    └── app.template.html
|    |    └── main.ts
|    |
|    |-- assets/
|    |    |
|    |    |
|    |    ├── icon/
|    |          └── favicon.ico
|    |      
|    |
|    |-- pages/                          * Contains all of our pages
│    │    ├── contact/                   * Contact tab page
│    │    │    ├── contact.html          * ContactPage template
│    │    │    └── contact.ts            * ContactPage code
│    │    │    └── contact.scss          * ContactPage stylesheet
│    │    │
│    │    ├── extra/                     * Extra page
│    │    │    ├── extra.html            * ExtraPage template
│    │    │    └── extra.ts              * ExtraPage code
│    │    │    └── extra.scss            * ExtraPage stylesheet
│    │    │
│    │    │── home/                      * Home page
│    │    │    ├── home.html             * HomePage template
│    │    │    └── home.ts               * HomePage code
│    │    │    └── home.scss             * HomePage stylesheet
│    │    │
│    │    │── list/                      * List tab page
│    │    │    ├── list.html             * ListPage template
│    │    │    └── list.ts               * ListPage code
│    │    │    └── list.scss             * ListPage stylesheet
│    │    │
│    │    │── item-details/              * ItemDetails tab page
│    │    │    ├── item-details.html     * ItemDetailsPage template
│    │    │    └── item-details.ts       * ItemDetailsPage code
│    │    │    └── item-details.scss     * ItemDetailsPage stylesheet
|    |    |
│    │    │── tabs/                      * Tabs page
│    │         ├── tabs.html             * TabsPage template
│    │         └── tabs.ts               * TabsPage code
│    │    
|    |
│    ├── theme/                          * App theme files
|    |     ├── variables.scss            * App Shared Sass Variables
|    |
|    |-- index.html
|
|-- www/
|    ├── assets/
|    |    ├── icon/
|    |    |    └── favicon.ico
|    |    |
|    |    ├── fonts/
|    |          ├── ionicons.eot
|    |          └── ionicons.svg
|    |          └── ionicons.ttf
|    |          └── ionicons.woff
|    |          └── ionicons.woff2
|    |          └── ...   
|    |
|    └── build/
|    └── index.html
|
├── .editorconfig                       * Defines coding styles between editors
├── README.md                           * This file
├── config.xml                          * Cordova configuration file
├── ionic.config.json                   * Ionic configuration file
├── package.json                        * Defines our JavaScript dependencies
├── tsconfig.json                       * Defines the root files and the compiler options
├── tslint.json                         * Defines the rules for the TypeScript linter
```
