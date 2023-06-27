import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

export interface Pair {
  etf_mark: number,
  limited: boolean,
  maker_fee_rate: string,
  max_amount: string,
  max_amount_market: string,
  min_amount: string,
  min_amount_market: string,
  price_scale: number,
  quantity_scale: number,
  state: "ENABLED" | "DISABLED",
  symbol: string,
  symbol_partition: string,
  taker_fee_rate: string,
}

export interface MarketData {
  symbol: string,
  volume: string,
  amount: string,
  high: string,
  low: string,
  bid: string,
  ask: string,
  open: string,
  last: string,
  time: number,
  change_rate: string
}

interface MEXCResponse<T> {
  code: number,
  msg?: string
  data: T
}

@Injectable({
  providedIn: 'root'
})
export class MEXCAPIService {

  constructor() { }

  async request<T>(url: string, options?: Object) : Promise<MEXCResponse<T>> {
    try {
      const data = await axios.get<MEXCResponse<T>>(url, options);
      return data.data
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        return {
          msg: error.message,
          code: error.response?.status,
          data: []
        } as MEXCResponse<T>
      } else {
        return {
          msg: 'Unknown Error',
          code: -1,
          data: []
        } as MEXCResponse<T>
      }
    }
  }
  
  async getPairs() {
    return await this.request<Pair[]>('open/api/v2/market/symbols');
  }

  async getMarketDataByPair(pair: string) {
    return await this.request<MarketData[]>(`open/api/v2/market/ticker?symbol=${pair}`)
  }
}
