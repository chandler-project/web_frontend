import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoopBackAuth} from '../../shared/sdk/services/core/auth.service';
import {Member} from '../../shared/sdk/models/Member';
import {ActivatedRoute} from '@angular/router';
import {BASE_URL} from '../../shared/base.url';
import {CategoryApi, DealApi} from '../../shared/sdk/services/custom';
import {Category, Deal} from '../../shared/sdk/models';
import {SharedService} from '../../services/shared-service';


@Component({
  selector: 'chandler-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss'],
})
export class CatComponent implements OnInit, OnDestroy {
  avatar: string;
  currentUser: Member;
  catName: string;
  deals: Deal[];
  categories: Category[] = [];
  private sub: any;
  baseURL: string = BASE_URL;
  categoryId = '';

  constructor(private authService: LoopBackAuth,
              private route: ActivatedRoute,
              private dealApi: DealApi,
              private _sharedService: SharedService,
              private categoryApi: CategoryApi) {
  }

  ngOnInit() {
    this.categoryApi.find().subscribe((res: Category[]) => {
      this.categories = res;
    });
    this.sub = this.route.params.subscribe(params => {
      this.catName = params['name'];
      this.categoryApi.find({
        where: {
          slug: this.catName
        }
      }).subscribe(res => {
        this.categoryId = res[0]['id'];
        this.categoryApi.getDeals(this.categoryId, {include: 'category'}).subscribe(rs => {
          this.deals = rs.data;
        });
      });
    });
    this.currentUser = this.authService.getCurrentUserData();
    if (this.currentUser) {
      this.avatar = this.baseURL + '/' + this.currentUser.avatar;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  upVote(dealId, index) {
    this.dealApi.upvote(dealId).subscribe(res => {
      this.deals[index].upvote += 1;
    });
  }

  downVote(dealId, index) {
    this.dealApi.downvote(dealId).subscribe(res => {
      this.deals[index].downvote += 1;
    });
  }

  openLoginModal() {
    if (!this.currentUser) {
      this._sharedService.updateData('openModal', true);
    }
  }

}
