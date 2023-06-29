import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pair-page',
  templateUrl: './pair-page.component.html',
  styleUrls: ['./pair-page.component.scss']
})
export class PairPageComponent implements OnInit, OnDestroy {
  pair?: string;
  private sub?: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
        this.pair = params['pair'];
    })
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
