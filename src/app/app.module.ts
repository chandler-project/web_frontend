import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {chandlerRouter} from './app.routes';
import {ModalModule} from 'ngx-bootstrap';
import {AuthServiceConfig, FacebookLoginProvider, SocialLoginModule} from 'angular4-social-login';
import {SDKBrowserModule} from './shared/sdk/index';
import {SharedService} from './services/shared-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from './shared/shared.module';
import {MomentModule} from 'angular2-moment';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('174659806454246')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    SharedModule,
    MomentModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule,
    BrowserModule,
    SDKBrowserModule.forRoot(),
    chandlerRouter
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
