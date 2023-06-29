import { Component, OnInit } from '@angular/core';
import { MEXCAPIService, Pair } from '../services/mexcapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  title = 'mexc-angular';
  
  pairs?: Pair[];
  showLoader: boolean = false;
  errorMsg?: string;

  constructor(private service:MEXCAPIService, private router:Router) {}

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
    this.router.navigate(['/pair', pair]);
  }
}
