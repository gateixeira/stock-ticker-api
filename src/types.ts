export interface Stock {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export interface HistoricalPrice {
  date: string;
  price: number;
}

export interface AlphaVantageQuote {
  'Global Quote': {
    '01. symbol': string;
    '05. price': string;
    '09. change': string;
    '10. change percent': string;
    '06. volume': string;
  };
}

export interface AlphaVantageHistorical {
  'Time Series (Daily)': {
    [key: string]: {
      '4. close': string;
    };
  };
}