import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AuthService, FacebookLoginProvider} from 'angular4-social-login';
import {MemberApi} from '../../shared/sdk/services/custom/Member';
import {LoopBackAuth} from '../../shared/sdk/services/core/auth.service';
import {SharedService} from '../../services/shared-service';
import {MEDIA_URL} from '../../shared/base.url';
import {OrderApi} from '../../shared/sdk/services/custom';

@Component({
  selector: 'chandler-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  modalRef: BsModalRef;
  currentUser: any;
  mediaUrl = MEDIA_URL;
  totalPendingOrders = 0;
  @ViewChild('template')
  private modalTemplate: TemplateRef<any>;

  constructor(private modalService: BsModalService,
              private authService: AuthService,
              private loopbackAuth: LoopBackAuth,
              private orderApi: OrderApi,
              private _sharedService: SharedService,
              private memberApi: MemberApi) {
  }

  async ngOnInit() {
    this._sharedService.getData().subscribe(data => {
      if (data.key === 'openModal' && data.value) {
        this.modalRef = this.modalService.show(this.modalTemplate);
      } else if (data.key === 'isLoggedIn' && !data.value) {
        this.currentUser = null;
      } else if (data.key === 'updatePendingOrders' && data.value) {
        this.orderApi.countAllPendingOrders().subscribe(res => {
          this.totalPendingOrders = res.data.count;
        });
      }
    });
    await this.memberApi.me().subscribe(res => {
      this.loopbackAuth.setUser(res['data']);
      this.currentUser = this.loopbackAuth.getCurrentUserData();
      this.orderApi.countAllPendingOrders().subscribe(res => {
        this.totalPendingOrders = res.data.count;
      });
    }, err => {
      this.loopbackAuth.clear();
      this.currentUser = null;
      this.authService.authState.subscribe((user) => {
        if (user) {
          const id: string = user.id;
          const accessToken: string = user.authToken;
          const avatar = 'https://graph.facebook.com/' + id + '/picture?type=normal';
          localStorage.setItem('avatar', avatar);
          this.memberApi.processLogin({
            accessToken: accessToken,
            userId: id
          }, 'user', 1).subscribe(res => {
            this.currentUser = res.data.user;
          });
        }
      });
    });
  }

  openModal() {
    event.preventDefault();
    this.modalRef = this.modalService.show(this.modalTemplate);
  }

  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      this.memberApi.processLogin({
        accessToken: res.authToken,
        userId: res.id
      }, 'user', 1).subscribe(rs => {
        this.currentUser = rs.data.user;
        this.modalRef.hide();
        this._sharedService.updateData('isLoggedIn', true);
      });
    }).catch(err => {
      console.log(err);
    });
  }
}
