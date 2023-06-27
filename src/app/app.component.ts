import { Component, OnInit } from '@angular/core';
import { MEXCAPIService } from './services/mexcapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'mexc-angular';
  
  pairs?: Array<any>;
  showLoader = false;

  constructor(private service:MEXCAPIService) {}

  async ngOnInit() {
    this.showLoader = true;
    const res = await this.service.getPairs();
    this.pairs = res ? res.data : [];
    console.log(this.pairs);
    this.showLoader = false;
  }
}
