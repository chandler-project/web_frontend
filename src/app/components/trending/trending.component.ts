///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {LoopBackAuth} from '../../shared/sdk/services/core';
import {Category, Member} from '../../shared/sdk/models';
import {BASE_URL} from '../../shared/base.url';
import {Router} from '@angular/router';
import {CategoryApi, DealApi} from '../../shared/sdk/services/custom';
import {SharedService} from '../../services/shared-service';

@Component({
  selector: 'chandler-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  currentUser: Member;
  avatar: string;
  baseURL: string = BASE_URL;
  deals: any[] = [];
  categories: Category[] = [];

  constructor(private authService: LoopBackAuth,
              private router: Router,
              private categoryApi: CategoryApi,
              private _sharedService: SharedService,
              private dealApi: DealApi) {
  }

  ngOnInit() {
    this.categoryApi.find().subscribe((res: Category[]) => {
      this.categories = res;
    });
    this.currentUser = this.authService.getCurrentUserData();
    if (this.currentUser) {
      this.avatar = this.baseURL + '/' + this.currentUser.avatar;
    }
    this.getTrending();
  }

  getTrending() {
    this.dealApi.trending().subscribe(res => {
      this.deals = res.data;
    });
  }

  openLoginModal() {
    if (!this.currentUser) {
      this._sharedService.updateData('openModal', true);
    }
  }
}
