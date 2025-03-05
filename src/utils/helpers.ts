import axios from 'axios';
import { config } from 'dotenv';
import { Stock, HistoricalPrice, AlphaVantageQuote, AlphaVantageHistorical } from '../types';

config();

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export const getStockBySymbol = async (symbol: string): Promise<Stock | null> => {
    try {
        const response = await axios.get<AlphaVantageQuote>(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
        const quote = response.data['Global Quote'];
        
        if (!quote) {
            return null;
        }
        
        return {
            symbol: quote['01. symbol'],
            price: parseFloat(quote['05. price']),
            change: parseFloat(quote['09. change']),
            changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
            volume: parseInt(quote['06. volume'])
        };
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return null;
    }
};

export const getHistoricalPrices = async (
    symbol: string,
    startDate?: string,
    endDate?: string
): Promise<HistoricalPrice[] | null> => {
    try {
        const response = await axios.get<AlphaVantageHistorical>(
            `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
        );
        const timeSeries = response.data['Time Series (Daily)'];
        
        if (!timeSeries) {
            return null;
        }

        const historicalData = Object.entries(timeSeries)
            .map(([date, data]) => ({
                date,
                price: parseFloat(data['4. close'])
            }))
            .filter(data => {
                const priceDate = new Date(data.date);
                return (!startDate || priceDate >= new Date(startDate)) && 
                       (!endDate || priceDate <= new Date(endDate));
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return historicalData;
    } catch (error) {
        console.error('Error fetching historical data:', error);
        return null;
    }
};