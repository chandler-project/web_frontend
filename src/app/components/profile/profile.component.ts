import {Component, OnInit} from '@angular/core';
import {LoopBackAuth} from '../../shared/sdk/services/core/auth.service';
import {MemberApi} from '../../shared/sdk/services/custom/Member';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../services/shared-service';
import {BASE_URL, MEDIA_URL} from '../../shared/base.url';
import {OrderApi} from '../../shared/sdk/services/custom';

declare const $: any;
declare const swal: any;

@Component({
  selector: 'chandler-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private sub: any;
  private profileId: string;
  currentUser: any;
  totalReviews: number;
  totalDeals = 0;
  totalRequests = 0;
  totalOrders = 0;
  mediaUrl = MEDIA_URL;
  baseUrl = BASE_URL;
  p = 1;
  feedBacks: any[] = [];
  currentLoggedInUserId: string;

  constructor(private authService: LoopBackAuth,
              private memberApi: MemberApi,
              private orderApi: OrderApi,
              private route: ActivatedRoute,
              private _sharedService: SharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentLoggedInUserId = this.authService.getCurrentUserId();
    this.sub = this.route.params.subscribe(params => {
      this.profileId = params['id'];
    });
    if (this.profileId) {
      this.memberApi.findById(this.profileId).subscribe(res => {
        this.currentUser = res['data'];
        this.getAllFeedBacks(this.currentUser.id);
      });
    } else {
      this.currentUser = this.authService.getCurrentUserData();
      this.memberApi.me().subscribe(res => {
        this.authService.setUser(res['data']);
        this.currentUser = res['data'];
        if (!this.currentUser) {
          this.router.navigate(['/']);
        } else {
          this.getAllFeedBacks(this.currentUser.id);
        }
      });
    }
  }

  getAllFeedBacks(userId) {
    this.memberApi.countFeedback(this.currentUser.id.toString()).subscribe(count => {
      if (count.data) {
        this.totalReviews = count.data.total;
      }
    });

    this.memberApi.getFeedBack(this.currentUser.id.toString()).subscribe(res => {
      this.feedBacks = res.data;
    });

    this.memberApi.countDeals(this.currentUser.id.toString()).subscribe(res => {
      this.totalDeals = res.data.total;
    });

    this.memberApi.countRequests(this.currentUser.id.toString()).subscribe(res => {
      this.totalRequests = res.data.total;
    });

    this.orderApi.count({
      'status': {
        'neq': 'pending'
      },
      or: [
        {
          'requester.id': this.currentUser.id,
        },
        {
          'shipper.id': this.currentUser.id,
        }
      ]
    }).subscribe(res => {
      this.totalOrders = res['data'].count;
    })
  }

  logOut() {
    this.memberApi.logout().subscribe(res => {
      this._sharedService.updateData('isLoggedIn', false);
      this.router.navigate(['/']);
    }, err => {
      this._sharedService.updateData('isLoggedIn', false);
      this.router.navigate(['/']);
    });
  }

  gotoOrderPage() {
    this.router.navigate(['/orders']);
  }

  gotoProfileDeal() {
    this.router.navigate(['/profile/' + this.currentUser.id + '/deals']);
  }

  gotoProfileRequest() {
    this.router.navigate(['/profile/' + this.currentUser.id + '/requests']);
  }

  async editProfile() {
    console.log(this.currentUser);
    const {value: formValues} = await swal({
      title: 'Thông tin chỉnh sửa',
      html:
      `<form class="text-left">
           <label for="bid-price">Họ và Tên</label>
          <div class="input-group">
            <input type="text" class="form-control" id="profile-fullName" placeholder="Nhập họ và tên đầy đủ" value="` + this.currentUser.fullName + `">
          </div>
          <div class="form-group">
            <label for="bid-sentence">Giới thiệu đôi chút về bản thân</label>
            <input type="text" class="form-control" id="profile-bio" placeholder="Tôi là một lập trình viên, 23 tuổi ,..." value="` + this.currentUser.bio + `">
          </div>
          <div class="form-group">
            <label for="bid-sentence">Địa chỉ</label>
            <input type="text" class="form-control" id="profile-address" placeholder="Thành phố Hồ Chí Minh" value="` + this.currentUser.address + `">
          </div>
          <div class="form-group">
            <label for="bid-sentence">Số điện thoại liên lạc</label>
            <input type="text" class="form-control" id="profile-phone-number" placeholder="0909090090" value="` + this.currentUser.phoneNumber + `">
          </div>
        </form>`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          $('#profile-fullName').val(),
          $('#profile-bio').val(),
          $('#profile-phone-number').val(),
          $('#profile-address').val()
        ];
      }
    });

    if (formValues) {
      const [fullName, bio, phoneNumber, address] = formValues;
      this.memberApi.updateProfile(this.currentUser.id, {
        fullName: fullName,
        bio: bio,
        phoneNumber: phoneNumber,
        address: address
      }).subscribe(rs => {
        swal('Thành công', 'Thông tin của bạn đã được cập nhật thành công', 'success');
        this.authService.setUser(rs.data);
        this.currentUser = rs.data;
      });
    }
  }

}
