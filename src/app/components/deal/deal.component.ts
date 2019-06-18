import {Component, OnInit} from '@angular/core';
import {Category, Deal, Member} from '../../shared/sdk/models';
import {CategoryApi, DealApi, UploadApi} from '../../shared/sdk/services/custom';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {FileHolder} from 'angular2-image-upload';
import {Router} from '@angular/router';
import {UploadService} from '../../services/upload.service';
import {MEDIA_URL} from '../../shared/base.url';
import {LoopBackAuth} from '../../shared/sdk/services/core';

declare const $: any;
declare const swal: any;

@Component({
  selector: 'chandler-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss'],
  providers: [UploadService]
})
export class DealComponent implements OnInit {
  deal: Deal;
  dealForm: FormGroup;
  categories: Category[];
  files: any = [];
  description: string = '';
  fileSrcs: any = [];
  currentUser: Member;
  mediaURL = MEDIA_URL;
  deadline = 'Cần gấp (7 – 15 ngày)';

  editorConfig = {
    'editable': true,
    'spellcheck': true,
    'height': 'auto',
    'minHeight': '200px',
    'width': 'auto',
    'minWidth': '0',
    'translate': 'yes',
    'enableToolbar': true,
    'showToolbar': true,
    'placeholder': 'Enter text here...',
    'toolbar': [
      ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
      ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
      ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
      ['link', 'unlink', 'image'],
      ['code']
    ]
  };

  constructor(private dealApi: DealApi,
              private categoryApi: CategoryApi,
              private router: Router,
              private authService: LoopBackAuth,
              private uploadService: UploadService,
              private uploadApi: UploadApi) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserData();
    if (!this.currentUser) {
      this.router.navigate(['/']);
    } else {
      this.createForm();
      this.categoryApi.find().subscribe((res: Category[]) => {
        this.categories = res;
      });
      $('#product-remain-time').datepicker({
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
      });
    }
  }

  createForm() {
    this.dealForm = new FormGroup({
      productName: new FormControl('', [
        Validators.required,
      ]),
      reference: new FormControl('', Validators.required),
      shippingPrice: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      categoryId: new FormControl('')
    });
  }

  addDeal(deal) {
    if (this.description === '') {
      swal('Lỗi', 'Vui lòng nhập mô tả cho sản phẩm', 'error');
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    let remainTime = $('#product-remain-time').val();
    remainTime = new Date(remainTime);
    if (this.files && this.files.length) {
      let formData: FormData = new FormData();
      this.files.forEach(f => {
        formData.append(f.name, f, f.name);
      });
      this.uploadService.upload(formData)
        .subscribe(rs => {
          const files = rs.data.result.files;
          const productPics = Object.keys(files) && Object.keys(files).length > 0 ? Object.keys(files).map(img => this.mediaURL + img) : [];
          this.categoryApi.createDeals(deal.categoryId, {
            'productName': deal.productName,
            'reference': deal.reference,
            'price': deal.price,
            'shippingPrice': deal.shippingPrice,
            'currency': 'VND',
            'deadline': remainTime,
            'shippingTime': this.deadline,
            'productDesc': this.description,
            'productPics': productPics
          }).subscribe(res => {
            swal('Thành công', 'Deal đã đươc tạo thành công', 'success');
          }, err => {
            if (err && err.statusCode === 401) {
              this.router.navigate(['/']);
            }
          });
        });
    } else {
      this.categoryApi.createDeals(deal.categoryId, {
        'productName': deal.productName,
        'reference': deal.reference,
        'price': deal.price,
        'shippingPrice': deal.shippingPrice,
        'currency': 'VND',
        'deadline': remainTime,
        'shippingTime': this.deadline,
        'productDesc': this.description,
        'productPics': []
      }).subscribe(res => {
        swal('Thành công', 'Deal đã đươc tạo thành công', 'success');
      }, err => {
        if (err && err.statusCode === 401) {
          this.router.navigate(['/']);
        }
      });
    }

  }

  onUploadFinished(file: FileHolder) {
    if (!(this.fileSrcs && this.fileSrcs.length && this.fileSrcs.indexOf(file.file.name) > -1)) {
      this.files.push(file.file);
    }

    this.fileSrcs.push(file.file.name);
  }

  onRemoved(file: FileHolder) {
    let index = -1;
    if (this.files && this.files.length) {
      index = this.files.findIndex(f => f.name === file.file.name);
    }
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

  onUploadStateChanged(state: boolean) {
    console.log(JSON.stringify(state));
  }
}
