///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {LoopBackAuth} from '../../../shared/sdk/services/core/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryApi, DealApi} from '../../../shared/sdk/services/custom';
import {Category, Deal, Member} from '../../../shared/sdk/models';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {DOWNVOTE_SVG, UPVOTE_SVG} from '../../../shared/constant';
import {BASE_URL, MEDIA_URL} from '../../../shared/base.url';
import {SharedService} from '../../../services/shared-service';

declare const swal: any;
declare const $: any;

@Component({
  selector: 'chandler-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.scss']
})
export class DealDetailComponent implements OnInit {
  private sub: any;
  private dealId: string;
  deal: Deal;
  categories: Category[] = [];
  mediaUrl = MEDIA_URL;
  totalComments = 0;
  comments: any[] = [];
  relateDeals: Deal[];
  upvoteSVG: SafeHtml;
  downvoteSVG: SafeHtml;
  baseUrl = BASE_URL;
  isOrdered = false;
  currentUser: Member;
  p = 1;
  limit = 3;

  constructor(private authService: LoopBackAuth,
              private route: ActivatedRoute,
              private _sharedService: SharedService,
              private categoryApi: CategoryApi,
              private sanitizer: DomSanitizer,
              private router: Router,
              private dealApi: DealApi) {
    this.upvoteSVG = sanitizer.bypassSecurityTrustHtml(UPVOTE_SVG);
    this.downvoteSVG = sanitizer.bypassSecurityTrustHtml(DOWNVOTE_SVG);
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserData();
    this.categoryApi.find().subscribe((res: Category[]) => {
      this.categories = res;
    });
    this.sub = this.route.params.subscribe(params => {
      this.dealId = params['id'];
    });
    this.dealApi.findById(this.dealId).subscribe(res => {
      this.deal = res['data'];
      const currentMemberId = this.authService.getCurrentUserId();
      if (this.deal.requesters && this.deal.requesters.length) {
        const requesters = this.deal.requesters;
        this.isOrdered = requesters.findIndex(requester => requester.id.toString() === currentMemberId) > -1;
      }
    });

    this.dealApi.countComments(this.dealId).subscribe(count => {
      this.totalComments = count.data.count;
    });

    this.dealApi.getComments(this.dealId, {'order': 'created DESC'}).subscribe(res => {
      this.comments = res.data;
    });

    this.dealApi.relateProducts(this.dealId).subscribe(res => {
      this.relateDeals = res.data;
    });
  }

  upVote() {
    const dealId = this.deal.id && this.deal.id !== '' ? this.deal.id : this.deal['_id'];
    this.dealApi.upvote(dealId).subscribe(res => {
      this.deal.upvote += 1;
    });
  }

  downVote() {
    const dealId = this.deal.id && this.deal.id !== '' ? this.deal.id : this.deal['_id'];
    this.dealApi.downvote(dealId).subscribe(res => {
      this.deal.downvote += 1;
    });
  }

  getCategoryName(categoryId) {
    const category = this.categories.filter(cat => cat.id === categoryId);
    return (category && category.length) ? category[0].name : '';
  }

  async request() {
    const {value: amount} = await swal({
      title: 'Vui lòng nhập số lượng cần mua',
      input: 'number',
      inputPlaceholder: 'Nhập số lượng sản phẩm cần mua'
    })

    if (amount) {
      swal({
        title: 'Xác nhận!!!',
        text: 'Bạn sẽ mua ' + amount + ' sản phẩm này từ người bán với giá đã bao gồm phí giao hàng: ' +
        ((this.deal.shippingPrice + this.deal.price) * amount).toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        }) + ' VND',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ'
      }).then((result) => {
        if (result.value) {
          this.dealApi.requestDeal(this.dealId, amount).subscribe(res => {
            swal(
              'Chandler',
              'Cám ơn bạn đã đặt hàng, vui lòng kiểm tra đơn hàng để thanh toán',
              'success'
            );
            this.isOrdered = true;
            this._sharedService.updateData('updatePendingOrders', true);
            this.dealApi.findById(this.dealId).subscribe(res => {
              this.deal = res['data'];
            });
          });
        }
      });
    }
  }

  gotoDetail(dealId) {
    const currentUrl = '/deal/' + dealId;
    const refreshUrl = currentUrl.indexOf('deal') > -1 ? '/' : '/deal';
    this.router.navigateByUrl(refreshUrl).then(() => this.router.navigateByUrl(currentUrl));
  }

  addComment(value) {
    const comment = value.target.value;
    this.dealApi.createComments(this.dealId, {
      'content': comment
    }).subscribe(res => {
      this.comments.unshift(res.data);
      this.totalComments += 1;
      value.target.value = '';
    });
  }
}
