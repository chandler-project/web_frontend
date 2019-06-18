///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, Input, OnInit} from '@angular/core';
import {Deal} from '../../../shared/sdk/models';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {DOWNVOTE_SVG, UPVOTE_SVG} from '../../../shared/constant';
import {DealApi} from '../../../shared/sdk/services/custom';
import {BASE_URL} from '../../../shared/base.url';
import {Router} from '@angular/router';

@Component({
  selector: 'chandler-deal-footer',
  templateUrl: './deal-footer.component.html',
  styleUrls: ['./deal-footer.component.scss']
})
export class DealFooterComponent implements OnInit {
  @Input() deal: Deal;
  upvoteSVG: SafeHtml;
  downvoteSVG: SafeHtml;
  baseURL = BASE_URL;

  constructor(private sanitizer: DomSanitizer, private dealApi: DealApi, private router: Router) {
    this.upvoteSVG = sanitizer.bypassSecurityTrustHtml(UPVOTE_SVG);
    this.downvoteSVG = sanitizer.bypassSecurityTrustHtml(DOWNVOTE_SVG);
  }

  ngOnInit() {
  }

  upVote() {
    const dealId = this.deal.id && this.deal.id !== '' ? this.deal.id : this.deal['_id'];
    this.dealApi.upvote(dealId).subscribe(res => {
      this.deal.upvote = res.data.upvote;
      this.deal.downvote = res.data.downvote;
    });
  }

  downVote() {
    const dealId = this.deal.id && this.deal.id !== '' ? this.deal.id : this.deal['_id'];
    this.dealApi.downvote(dealId).subscribe(res => {
      this.deal.downvote = res.data.downvote;
      this.deal.upvote = res.data.upvote;
    });
  }

  gotoProfilePage(shipperId) {
    this.router.navigate(['/profile/' + shipperId]);
  }

}
