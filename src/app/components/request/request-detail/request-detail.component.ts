///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {LoopBackAuth} from '../../../shared/sdk/services/core/auth.service';
import {ActivatedRoute} from '@angular/router';
import {CategoryApi, RequestApi} from '../../../shared/sdk/services/custom';
import {Category, Member, Request} from '../../../shared/sdk/models';
import {DomSanitizer} from '@angular/platform-browser';
import {BASE_URL, MEDIA_URL} from '../../../shared/base.url';
import {SharedService} from '../../../services/shared-service';

declare const $: any;
declare const swal: any;

@Component({
  selector: 'chandler-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {
  private sub: any;
  private requestId: string;
  request: Request;
  categories: Category[] = [];
  baseUrl = BASE_URL;
  mediaUrl = MEDIA_URL;
  isOrdered = false;
  isBidded = false;
  currentUser: Member;

  constructor(private authService: LoopBackAuth,
              private route: ActivatedRoute,
              private categoryApi: CategoryApi,
              private _sharedService: SharedService,
              private sanitizer: DomSanitizer,
              private requestApi: RequestApi) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserData();

    this.categoryApi.find().subscribe((res: Category[]) => {
      this.categories = res;
    });
    this.sub = this.route.params.subscribe(params => {
      this.requestId = params['id'];
    });
    this.requestApi.findById(this.requestId).subscribe(res => {
      this.request = res['data'];
      if (this.currentUser) {
        this.checkBidded();
      }
    });
  }

  getCategoryName(categoryId) {
    const category = this.categories.filter(cat => cat.id === categoryId);
    return (category && category.length) ? category[0].name : '';
  }

  async bid(requestId) {
    const {value: formValues} = await swal({
      title: 'Thông tin đặt giá',
      html:
      `<form class="text-left">
          <div class="form-group">
            <label for="bid-spend">Số lượng</label>
            <input type="number" class="form-control" id="bid-spend" disabled value="` + this.request.amount + `">
          </div>
           <label for="bid-price">Giá ( Đã bao gồm ship )</label>
          <div class="input-group">
            <input type="text" class="form-control" id="bid-price" placeholder="Nhập giá tổng cộng">
            <div class="input-group-append">
              <span class="input-group-text">VND</span>
            </div>
          </div>
          <div class="form-group">
            <label for="bid-spend">Bạn có thể giao trong vòng bao lâu</label>
            <input type="number" class="form-control" id="bid-spend" placeholder="Nhập số ngày bạn cần để có thể giao tới cho người yêu cầu">
          </div>
          <div class="form-group">
            <label for="bid-sentence">Lời nhắn</label>
            <input type="text" class="form-control" id="bid-sentence" placeholder="Nhập lời nhắn của bạn đến với người yêu cầu" value="Tôi sẽ giao hàng đúng hẹn">
          </div>
        </form>`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          $('#bid-price').val(),
          $('#bid-sentence').val(),
          $('#bid-spend').val()
        ];
      }
    });

    if (formValues) {
      const [price, sentence, spend] = formValues;
      this.requestApi.bid(requestId, {price: price, sentence: sentence, spend: spend}).subscribe(rs => {
        swal('Thành công', 'Bạn đã đặt giá thành công cho yêu cầu này, vui lòng chờ xác nhận của người yêu cầu để giao hàng, cám ơn bạn!', 'success');
        this.requestApi.findById(this.requestId).subscribe(res => {
          this.request = res['data'];
        });
      });
    }
  }

  checkBidded() {
    const currentUserId = this.currentUser.id;
    const bidders = this.request.bidders;
    if (bidders && bidders.length) {
      const found = bidders.filter(bidder => bidder.id === currentUserId);
      this.isBidded = found && found.length > 0;
    }
  }

  choose(shipperId, price) {
    this.requestApi.chooseShipper(this.requestId, shipperId).subscribe(res => {
      swal('Thành công', 'Bạn đã đặt mua thành công sản phẩm với giá: ' + price, 'success');
      this.request = res.data;
      this._sharedService.updateData('updatePendingOrders', true);
    });
  }
}
