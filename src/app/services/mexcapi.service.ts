import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MEXCAPIService {

  constructor() { }

  async request(url: string, options?: Object) {
    try {
      const data = await axios.get(url, options);
      if (data.data.code === 200) {
        return data.data;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  async getPairs() {
    return await this.request('open/api/v2/market/symbols');
  }
}
