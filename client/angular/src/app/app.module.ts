import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { SidemenuComponent } from './core/components/sidemenu/sidemenu.component';
import { Page404Component } from './core/components/page404/page404.component';
import {LoginComponent} from './core/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {JwtInterceptor,ErrorInterceptor} from './core/interceptor';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ScrollPanelModule} from 'primeng/scrollpanel';

@NgModule({
  declarations: [
    AppComponent,
     HeaderComponent,
     SidemenuComponent,
     FooterComponent,
    Page404Component,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule, NgbModule,
    CKEditorModule,
    Ng2SearchPipeModule,
    TieredMenuModule,
    PanelMenuModule,
    ScrollPanelModule,
    AppRoutingModule, NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
