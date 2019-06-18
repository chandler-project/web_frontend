import {Component, OnInit} from '@angular/core';
import {CategoryApi, RequestApi, UploadApi} from '../../../shared/sdk/services/custom';
import {Router} from '@angular/router';
import {Category, Member} from '../../../shared/sdk/models';
import {LoopBackAuth} from '../../../shared/sdk/services/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileHolder} from 'angular2-image-upload';
import {MEDIA_URL} from '../../../shared/base.url';
import {UploadService} from '../../../services/upload.service';

declare const swal: any;
declare const $: any;

@Component({
  selector: 'chandler-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
  providers: [UploadService]
})
export class CreateRequestComponent implements OnInit {
  currentMember: Member;
  requestForm: FormGroup;
  files: any = [];
  fileSrcs: any = [];
  categories: Category[];
  mediaURL = MEDIA_URL;
  budget = 'Rất Nhỏ (100k - 200k)';
  deadline = 'Nhanh chóng (7 – 15 ngày)';
  description = '';

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

  constructor(private requestApi: RequestApi,
              private authService: LoopBackAuth,
              private categoryApi: CategoryApi,
              private uploadService: UploadService,
              private uploadApi: UploadApi,
              private router: Router) {
  }

  ngOnInit() {
    this.currentMember = this.authService.getCurrentUserData();
    if (!this.currentMember) {
      this.router.navigate(['/']);
    } else {
      this.categoryApi.find().subscribe((res: Category[]) => {
        this.categories = res;
      });
      this.createForm();
    }
  }

  createForm() {
    this.requestForm = new FormGroup({
      productName: new FormControl('', [
        Validators.required,
      ]),
      reference: new FormControl('', Validators.required),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      amount: new FormControl('', [
        Validators.min(1)
      ]),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      categoryId: new FormControl('')
    });
  }

  addRequest(request) {
    event.preventDefault();
    event.stopPropagation();
    const bd = this.getBudget(this.budget);
    if (this.files && this.files.length) {
      let formData: FormData = new FormData();
      this.files.forEach(f => {
        formData.append(f.name, f, f.name);
      });
      this.uploadService.upload(formData)
        .subscribe(rs => {
          const files = rs.data.result.files;
          const productPics = Object.keys(files) && Object.keys(files).length > 0 ? Object.keys(files).map(img => this.mediaURL + img) : [];
          this.categoryApi.createRequests(request.categoryId, {
            'productName': request.productName,
            'reference': request.reference,
            'productPics': productPics,
            'description': this.description,
            'budget': bd,
            'price': request.price,
            'deadline': this.deadline,
            'address': request.address,
            'amount': request.amount
          }).subscribe(res => {
            swal('Thành công', 'Request đã đươc tạo thành công', 'success');
          }, err => {
            if (err && err.statusCode === 401) {
              this.router.navigate(['/']);
            }
          });
        });
    } else {
      this.categoryApi.createRequests(request.categoryId, {
        'productName': request.productName,
        'reference': request.reference,
        'productPics': [],
        'description': this.description,
        'budget': bd,
        'price': request.price,
        'deadline': this.deadline,
        'address': request.address,
        'amount': request.amount
      }).subscribe(res => {
        swal('Thành công', 'Request đã đươc tạo thành công', 'success');
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

  getBudget(budget) {
    let min = 0;
    let max = 0;
    if (budget === 'Rất Nhỏ (100k - 200k)') {
      min = 100000;
      max = 200000;
    } else if (budget === 'Nhỏ (200k - 400k)') {
      min = 200000;
      max = 400000;
    } else if (budget === 'Trung bình (400k - 600k)') {
      min = 400000;
      max = 600000;
    } else {
      min = 600000;
      max = 1000000;
    }

    return {
      min: min,
      max: max
    };
  }

}
