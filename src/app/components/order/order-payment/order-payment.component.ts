///<reference path="../../../../../node_modules/@types/googlemaps/index.d.ts"/>
import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Member, Order} from '../../../shared/sdk/models';
import {LoopBackAuth} from '../../../shared/sdk/services/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderApi} from '../../../shared/sdk/services/custom';
import {CreditCardValidators} from 'ngx-validators';
import {MapsAPILoader} from '@agm/core';
import {SharedService} from '../../../services/shared-service';

declare const $: any;
declare const swal: any;

@Component({
  selector: 'chandler-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss']
})
export class OrderPaymentComponent implements OnInit {
  paymentForm: FormGroup;
  currentUser: Member;
  orderId: string;
  pendingOrders: Order[] = [];
  private sub: any;
  order: Order;
  total = 0;
  COUNTRIES = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegowina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, the Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia (Hrvatska)', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'France Metropolitan', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and Mc Donald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran (Islamic Republic of)', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Democratic People\'s Republic of', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Lao, People\'s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia, The Former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia (Slovak Republic)', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'St. Helena', 'St. Pierre and Miquelon', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Việt Nam', 'Virgin Islands (British)', 'Virgin Islands (U.S.)', 'Wallis and Futuna Islands', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zambia', 'Zimbabwe'];

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private authService: LoopBackAuth,
              private orderApi: OrderApi,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private _sharedService: SharedService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserData();
    if (!this.currentUser) {
      this.router.navigate(['/']);
    } else {
      this.sub = this.route.params.subscribe(params => {
        this.orderId = params['id'];
      });
      if (this.orderId) {
        this.orderApi.findById(this.orderId).subscribe(res => {
          this.order = res['data'];
          if (this.order.status === 'paid') {
            this.router.navigate(['/orders']);
          } else {
            const {productPrice, shippingPrice, item} = this.order;
            this.total = productPrice * (item.amount) + shippingPrice;
          }
        });
      } else {
        this.orderApi.getAllPendingOrders().subscribe(res => {
          this.pendingOrders = res.data;
          if (this.pendingOrders && this.pendingOrders.length) {
            this.total = this.pendingOrders.reduce((a, b) => a + (b.productPrice * b.item.amount + b.shippingPrice), 0);
          }
        });
      }
      this.setUpInputSearch();
      this.createForm();
    }
  }

  addPayment() {
    const payment = this.paymentForm.getRawValue();
    const data = {
      address: payment.address ? payment.address : this.currentUser.address,
      phoneNumber: payment.phoneNumber ? payment.phoneNumber : this.currentUser.phoneNumber,
      method: payment.type,
      country: payment.country,
      cardNumber: payment.cardNumber,
      expireOn: payment.month + '/' + payment.year,
      firstName: payment.firstName,
      lastName: payment.lastName,
      postalCode: payment.postalCode,
      total: this.total
    };
    if (this.orderId) {
      this.orderApi.addPayment(this.orderId, data).subscribe(res => {
        swal('Cám ơn', 'Cám ơn bạn đã thanh toán cho đơn hàng này, vui lòng đợi xác nhận của người giao hàng. Cám ơn', 'success');
        this._sharedService.updateData('updatePendingOrders', true);
      });
    } else {
      this.orderApi.payAll({
        payment: data
      }).subscribe(res => {
        swal('Cám ơn', 'Cám ơn bạn đã thanh toán cho các đơn hàng này, vui lòng đợi xác nhận của người giao hàng. Cám ơn', 'success');
        this._sharedService.updateData('updatePendingOrders', true);
      });
    }

  }

  createForm() {
    this.paymentForm = new FormGroup({
      address: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      country: new FormControl('Việt Nam', Validators.required),
      type: new FormControl('Credit Card', Validators.required),
      cardNumber: new FormControl('4216-5612-1256-5264', Validators.compose([
        Validators.required
      ])),
      month: new FormControl(5, Validators.compose([
        Validators.required, Validators.min(1), Validators.max(12)
      ])),
      year: new FormControl(18, Validators.compose([
        Validators.required, Validators.min(18), Validators.max(99)
      ])),
      secureCode: new FormControl('321', Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(3)
      ])),
      firstName: new FormControl('Phát', Validators.required),
      lastName: new FormControl('Nguyễn', Validators.required),
      postalCode: new FormControl('700000', Validators.required)
    });
  }

  addPromotion() {

  }

  setUpInputSearch() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.paymentForm.controls['address'].setValue(place.formatted_address);
          if (place.formatted_address.indexOf('Việt Nam') > -1) {
            this.paymentForm.controls['country'].setValue('Việt Nam');
          }
        });
      });
    });
  }
}
