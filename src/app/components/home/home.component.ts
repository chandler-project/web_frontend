import {AfterViewChecked, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {LoopBackAuth} from '../../shared/sdk/services/core/auth.service';
import {Member} from '../../shared/sdk/models/Member';
import {SharedService} from '../../services/shared-service';
import {CategoryApi, DealApi, MemberApi, RequestApi} from '../../shared/sdk/services/custom';
import {Category, Deal, Request} from '../../shared/sdk/models';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {MEDIA_URL} from '../../shared/base.url';
import {Title} from '@angular/platform-browser';

declare const swal: any;

@Component({
  selector: 'chandler-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  avatar: string;
  modalRef: BsModalRef;
  currentUser: Member;
  deals: Deal[];
  categories: Category[] = [];
  choosenCategories: string[] = [];
  mediaUrl = MEDIA_URL;
  clickItem = '';
  requests: Request[] = [];
  hottestDeal: Deal[] = [];
  @ViewChild('template')
  private modalTemplate: TemplateRef<any>;

  constructor(private authService: LoopBackAuth,
              private router: Router,
              private modalService: BsModalService,
              private _sharedService: SharedService,
              private requestApi: RequestApi,
              private memberApi: MemberApi,
              private categoryApi: CategoryApi,
              private cdRef: ChangeDetectorRef,
              private titleService: Title,
              private dealApi: DealApi) {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.setTitle('Chandler - Mua sắm toàn cầu an toàn và hiệu quả');
    this.avatar = localStorage.getItem('avatar');
    this._sharedService.getData().subscribe(data => {
      if (data.key === 'isLoggedIn' && data.value) {
        this.currentUser = this.authService.getCurrentUserData();
        if (this.currentUser) {
          if (!(this.currentUser.categories && this.currentUser.categories.length)) {
            this.modalRef = this.modalService.show(this.modalTemplate);
          } else {
            this.dealApi.newFeeds().subscribe(res => {
              this.deals = res.data;
            });
          }
        }
      }
    });
    this.categoryApi.find().subscribe((res: Category[]) => {
      this.categories = res;
    });
    this.currentUser = this.authService.getCurrentUserData();
    if (this.currentUser) {
      if (!(this.currentUser.categories && this.currentUser.categories.length)) {
        this.modalRef = this.modalService.show(this.modalTemplate);
      } else {
        this.dealApi.newFeeds().subscribe(res => {
          this.deals = res.data;
        });
      }
    }

    this.dealApi.trending().subscribe(res => {
      this.hottestDeal = res.data.slice(0, 5);
    }, err => {
      console.log(err);
    });

    this.requestApi.newFeeds().subscribe(res => {
      this.requests = res.data;
    });
  }

  openLoginModal() {
    if (!this.currentUser) {
      this._sharedService.updateData('openModal', true);
    }
  }

  becomeShipper() {
    swal({
      title: 'Welcome to Chandler',
      text: 'Bạn có muốn trở thành người giao hàng?',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.memberApi.becomeShipper(this.currentUser.id).subscribe(res => {
          this.currentUser = res.data;
          this.authService.setUser(res.data);
        });
      } else {
        swal.close();
      }
    });
  }

  chooseCategory(categoryId) {
    const category = this.categories.filter(cat => cat.id === categoryId);
    if (category && category.length) {
      if (this.choosenCategories && this.choosenCategories.indexOf(categoryId) > -1) {
        this.choosenCategories.splice(this.choosenCategories.indexOf(categoryId), 1);
      } else {
        this.choosenCategories.push(categoryId);
        this.clickItem = category[0].slug;
      }
    }
    this.cdRef.detectChanges();
  }

  choose() {
    this.memberApi.chooseCategories({
      'categoryIds': this.choosenCategories
    }).subscribe(res => {
      this.memberApi.findById(this.currentUser.id).subscribe(res => {
        this.authService.setUser(res['data']);
        this.modalRef.hide();
      });
    });
  }

  getCategoryName(categoryId) {
    const category = this.categories.filter(cat => cat.id === categoryId);
    return (category && category.length) ? category[0].name : '';
  }

  getDealOfCategory(categoryId) {
    return this.deals.filter(deal => deal.categoryId === categoryId);
  }
}
