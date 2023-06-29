import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MEXCAPIService } from '../services/mexcapi.service';
import { MarketData } from '../services/mexcapi.service';

@Component({
  selector: 'app-pair-page',
  templateUrl: './pair-page.component.html',
  styleUrls: ['./pair-page.component.scss']
})
export class PairPageComponent implements OnInit, OnDestroy {
  pair: string = '';
  private sub?: Subscription;
  showLoader: boolean = false;
  errorMsg?: string;
  data: MarketData;
  refreshingData: boolean = false;
  refreshDataHandle?: any;

  constructor(private route: ActivatedRoute, private service: MEXCAPIService) {
    this.data = {} as MarketData
  }

  ngOnInit(): void {
    this.showLoader = true;
    this.sub = this.route.params.subscribe(async (params) => {
        this.pair = params['pair'];
        if (this.pair.length) {
          const data = await this.service.getMarketDataByPair(this.pair);
          console.log(data);
          if (data.code === 200) {
            this.data = data.data[0];
            this.startRefreshData();
          } else {
            this.errorMsg = `${data.msg}: ${this.pair}`
          }
        } else {
          this.errorMsg = 'No pair specified';
        }
        this.showLoader = false;
    })
  }

  async refreshData() {
    if (this.refreshingData) return;
    this.refreshingData = true;
    const data = await this.service.getMarketDataByPair(this.pair);
    if (data.code === 200) {
      const d = data.data[0];
      const change_rate = parseFloat(d.last) - parseFloat(this.data.last);
      const last_change_rate = this.data.change_rate;
      this.data = data.data[0];
      this.data.change_rate = change_rate !== 0 ? change_rate.toFixed(10).toString() : last_change_rate;
    }
    this.refreshingData = false;
  }

  stopRefreshData() {
    clearInterval(this.refreshDataHandle);
  }

  startRefreshData() {
    const _this = this;
    this.refreshDataHandle = setInterval(() => _this.refreshData(), 5000);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    this.stopRefreshData();
  }
}
