import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    
  async ngOnInit() {
    try {
      const data = await axios.get('https://www.mexc.com/open/api/v2/market/symbols');
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
    
  }
}
