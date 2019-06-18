import {Component, OnInit} from '@angular/core';
import {Member} from '../../shared/sdk/models/Member';
import {LoopBackAuth} from '../../shared/sdk/services/core/auth.service';
import {Router} from '@angular/router';
import {MEDIA_URL} from '../../shared/base.url';
import {RequestApi} from '../../shared/sdk/services/custom';
import {Request} from '../../shared/sdk/models';

declare const swal: any;
declare const $: any;

@Component({
  selector: 'chandler-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  avatar: string;
  requests: Request[] = [];
  currentUser: Member;
  mediaUrl = MEDIA_URL;

  constructor(private authService: LoopBackAuth,
              private requestApi: RequestApi,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserData();
    this.requestApi.newFeeds().subscribe(res => {
      this.requests = res.data;
    });
  }

  create() {
    this.router.navigateByUrl('request/create');
  }

  async bid(requestId) {
    const {value: formValues} = await swal({
      title: 'Thông tin đặt giá',
      html:
        `<form class="text-left">
           <label for="bid-price">Giá ( Đã bao gồm ship )</label>
          <div class="input-group">
            <input type="text" class="form-control" id="bid-price" placeholder="Nhập giá tổng cộng">
            <div class="input-group-append">
              <span class="input-group-text">VND</span>
            </div>
          </div>
          <div class="form-group">
            <label for="bid-sentence">Lời nhắn</label>
            <input type="text" class="form-control" id="bid-sentence" placeholder="Nhập lời nhắn của bạn đến với người yêu cầu">
          </div>
          <div class="form-group">
            <label for="bid-spend">Bạn có thể giao trong vòng bao lâu</label>
            <input type="number" class="form-control" id="bid-spend" placeholder="Nhập số ngày bạn cần để có thể giao tới cho người yêu cầu">
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
        this.requestApi.newFeeds().subscribe(res => {
          this.requests = res.data;
        });
      });
    }
  }

  isBidded(bidders) {
    if (bidders && bidders.length > 0 && this.currentUser) {
      const found = bidders.filter(bidder => bidder.id === this.currentUser.id);
      return !(found && found.length > 0);
    } else {
      return true;
    }
  }

  gotoDetail(requestId) {
    this.router.navigate(['/request/' + requestId])
  }

  urlencode(link) {
    return 'http://0.0.0.0:3000/Screenshot(36).png';
  }
}

