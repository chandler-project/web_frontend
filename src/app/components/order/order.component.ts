import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MemberApi, OrderApi} from '../../shared/sdk/services/custom';
import {Member, Order} from '../../shared/sdk/models';
import {LoopBackAuth} from '../../shared/sdk/services/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BASE_URL} from '../../shared/base.url';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

declare const swal: any;
declare const $: any;

@Component({
  selector: 'chandler-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewChecked {
  orders: Order[] = [];
  currentUser: Member;
  modalRef: BsModalRef;
  confirmOrder: Order;
  max = 10;
  rate = 7;
  feedback = '';
  isReadonly = false;

  overStar: number;
  percent: number;

  baseUrl = BASE_URL;
  totalPendingOrders = 0;
  @ViewChild('template')
  private modalTemplate: TemplateRef<any>;

  constructor(private orderApi: OrderApi,
              private memberApi: MemberApi,
              private modalService: BsModalService,
              private router: Router,
              private cdRef: ChangeDetectorRef,
              private authService: LoopBackAuth) {
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserData();
    if (this.currentUser) {
      const currentUrl = this.router.url;
      if (currentUrl === '/cart') {
        this.orderApi.getAllPendingOrders().subscribe((res: any) => {
          this.orders = res.data;
          this.totalPendingOrders = this.orders.length;
          this.checkConfirmOrders();
        }, err => {
          this.router.navigate(['/']);
        });
      } else {
        this.orderApi.find({
          where: {
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
          },
          order: 'modified DESC'
        }).subscribe((res: any) => {
          this.orders = res;
          this.checkConfirmOrders();
        }, err => {
          this.router.navigate(['/']);
        });
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  checkConfirmOrders(isRecheck = false) {
    const orders = this.orders;
    if (orders && orders.length) {
      const confirmOrders = orders.filter(order => !this.isShipper(order) && order.status.toLowerCase() === 'delivered');
      if (confirmOrders && confirmOrders.length) {
        this.confirmOrder = confirmOrders[0];
        this.modalRef = this.modalService.show(this.modalTemplate);
      } else {
        if (isRecheck) {
          swal('Cám ơn', 'Cám ơn xác nhận và đánh giá của bạn', 'success')
        }
      }
    }
  }

  isShipper(order) {
    const currentUserId = this.currentUser.id;
    return order.shipper.id === currentUserId;
  }

  pay(order) {
    this.router.navigate(['/cart/' + order.id + '/make-payment']);
  }

  disclaimer(order, index) {
    swal({
      title: 'Xác nhận huỷ đơn hàng',
      text: 'Bạn có chắc muốn huỷ đơn hàng này?',
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
        this.orderApi.disclaimerOrder(order.id).subscribe(res => {
          swal('Huỷ thành công', 'Đơn hàng của bạn đã được huỷ thành công', 'success');
          delete this.orders[index];
        });
      } else {
        swal.close();
      }
    });
  }

  payForAllOrders() {
    this.router.navigate(['/cart/checkout']);
  }

  deliveredOrder(order, index) {
    this.orderApi.deliveredOrder(order.id).subscribe(res => {
      swal('Cám ơn', 'Đơn hàng của bạn đang được xác nhận là giao thành công , vui lòng chờ xác nhận của người mua.', 'success');
      this.orders[index] = res['data'];
    });
  }

  async denyOrder(order, index) {
    const {value: reason} = await swal({
      title: 'Bạn hãy nêu lý do từ chối đơn hàng',
      input: 'text',
      inputPlaceholder: 'Nhập lý do của bạn',
      showCancelButton: true,
      inputValidator: (value) => {
        return !value && 'Vui lòng điền lý do của bạn khi từ chối đơn hàng này!!!';
      }
    });

    if (reason) {
      this.orderApi.rejectOrder(order.id, reason).subscribe(res => {
        swal({type: 'success', title: 'Cám ơn bạn, đơn hàng đã bị huỷ bỏ do : ' + reason});
        this.orders[index] = res['data'];
      });
    }
  }

  acceptOrder(order, index) {
    this.orderApi.acceptOrder(order.id).subscribe(res => {
      this.orders[index] = res.data;
    });
  }

  async rejectShipper() {
    event.preventDefault();
    const {value: reason} = await swal({
      title: 'Bạn hãy nêu lý do từ chối nhận hàng',
      input: 'text',
      inputPlaceholder: 'Nhập lý do của bạn',
      showCancelButton: true,
      inputValidator: (value) => {
        return !value && 'Vui lòng điền lý do của bạn khi từ chối nhận món hàng này!!!';
      }
    });

    if (reason) {
      this.orderApi.deniedOrder(this.confirmOrder.id, reason).subscribe(res => {
        swal({
          type: 'success',
          title: 'Cám ơn bạn, đơn hàng đã được xác nhận là giao hàng không thành công với lí do : ' + reason
        });
        const index = this.orders.findIndex(order => order.id === this.confirmOrder.id);
        this.orders[index] = res['data'];
        this.modalRef.hide();
      });
    }
  }

  confirmedOrder() {
    const feedback = $('#feedback').val();
    if (feedback !== '') {
      this.memberApi.createManyFeedback(this.confirmOrder.shipper.id, [{
        'content': feedback
      }]).subscribe(rs => {
        this.orderApi.confirmOrder(this.confirmOrder.id).subscribe(res => {
          const index = this.orders.findIndex(order => order.id === this.confirmOrder.id);
          this.orders[index] = res['data'];
          this.modalRef.hide();
          this.checkConfirmOrders(true);
        });
      })
    } else {
      this.orderApi.confirmOrder(this.confirmOrder.id).subscribe(res => {
        const index = this.orders.findIndex(order => order.id === this.confirmOrder.id);
        this.orders[index] = res['data'];
        this.modalRef.hide();
        this.checkConfirmOrders(true);
      });
    }
  }

  getStatus(status, isShipper) {
    if (status === 'pending') {
      return 'Chờ thanh toán';
    } else if (status === 'paid') {
      if (isShipper) {
        return 'Đã thanh toán';
      }
      return 'Chờ xác nhận';
    } else if (status === 'accepted') {
      if (isShipper) {
        return 'Đã xác nhận';
      }
      return 'Chờ giao hàng';
    } else if (status === 'rejected') {
      if (isShipper) {
        return 'Đã từ chối';
      }
      return 'Đã bị từ chối';
    } else if (status === 'delivered') {
      if (isShipper) {
        return 'Chờ xác nhận';
      }
      return 'Đã giao hàng';
    } else if (status === 'success') {
      return 'Giao dịch thành công';
    }

    return 'Giao dịch thất bại';
  }

  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }

  resetStar(): void {
    this.overStar = void 0;
  }
}

