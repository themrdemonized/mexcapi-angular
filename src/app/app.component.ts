import { Component, OnInit } from '@angular/core';
import { MEXCAPIService, Pair } from './services/mexcapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'mexc-angular';
  
  pairs?: Pair[];
  showLoader: boolean = false;
  errorMsg?: string;

  constructor(private service:MEXCAPIService) {}

  async ngOnInit() {
    this.showLoader = true;
    const data = await this.service.getPairs();
    if (data.code === 200) {
      this.pairs = []
      for (const pair of data.data) {
        if (pair.state === "ENABLED") {
          this.pairs.push(pair);
        }
      }
      this.pairs.sort((a, b) => a.symbol.localeCompare(b.symbol));
    } else {
      this.errorMsg = data.msg
    }
    
    console.log(this.pairs);
    this.showLoader = false;
  }

  async openPairPage(pair: string) {
    const data = await this.service.getMarketDataByPair(pair);
    console.log("opened ", pair)
    console.log(data.data)
  }
}
