import {Component, OnInit} from '@angular/core';
import {LoopBackConfig} from './shared/sdk/lb.config';
import {API_VERSION, BASE_URL} from './shared/base.url';
import {AccountKit, AuthResponse} from 'ng2-account-kit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    LoopBackConfig.setBaseURL(BASE_URL);
    LoopBackConfig.setApiVersion(API_VERSION);

    AccountKit.init({
      appId: '174659806454246',
      state: '5a3230229dd22d8a5016ef5c85515c47',
      version: 'v1.0'
    });
  }
}
