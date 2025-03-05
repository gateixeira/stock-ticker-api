const stocks = {
    metadata: {
        timestamp: new Date().toISOString(),
        exchange: "NASDAQ"
    },
    data: [
        {
            symbol: "AAPL",
            name: "Apple Inc.",
            currentPrice: 150.00,
        },
        {
            symbol: "MSFT",
            name: "Microsoft Corporation",
            currentPrice: 280.00,
        },
        {
            symbol: "AMZN",
            name: "Amazon.com Inc.",
            currentPrice: 3400.00,
        },
        {
            symbol: "GOOGL",
            name: "Alphabet Inc.",
            currentPrice: 2800.00,
        },
        {
            symbol: "FB",
            name: "Meta Platforms Inc.",
            currentPrice: 350.00,
        },
        {
            symbol: "TSLA",
            name: "Tesla Inc.",
            currentPrice: 700.00,
        },
        {
            symbol: "BRK.B",
            name: "Berkshire Hathaway Inc.",
            currentPrice: 420.00,
        },
        {
            symbol: "NVDA",
            name: "NVIDIA Corporation",
            currentPrice: 220.00,
        },
        {
            symbol: "JPM",
            name: "JPMorgan Chase & Co.",
            currentPrice: 160.00,
        },
        {
            symbol: "JNJ",
            name: "Johnson & Johnson",
            currentPrice: 170.00,
        },
        {
            symbol: "V",
            name: "Visa Inc.",
            currentPrice: 230.00,
        },
        {
            symbol: "PG",
            name: "Procter & Gamble Co.",
            currentPrice: 140.00,
        },
        {
            symbol: "UNH",
            name: "UnitedHealth Group Incorporated",
            currentPrice: 400.00,
        },
        {
            symbol: "HD",
            name: "The Home Depot Inc.",
            currentPrice: 300.00,
        },
        {
            symbol: "DIS",
            name: "The Walt Disney Company",
            currentPrice: 180.00,
        },
        {
            symbol: "PYPL",
            name: "PayPal Holdings Inc.",
            currentPrice: 250.00,
        },
        {
            symbol: "NFLX",
            name: "Netflix Inc.",
            currentPrice: 500.00,
        },
        {
            symbol: "VZ",
            name: "Verizon Communications Inc.",
            currentPrice: 55.00,
        },
        {
            symbol: "INTC",
            name: "Intel Corporation",
            currentPrice: 50.00,
        },
        {
            symbol: "CMCSA",
            name: "Comcast Corporation",
            currentPrice: 60.00,
        },
        {
            symbol: "T",
            name: "AT&T Inc.",
            currentPrice: 25.00,
        },
        {
            symbol: "CSCO",
            name: "Cisco Systems Inc.",
            currentPrice: 55.00,
        },
        {
            symbol: "PEP",
            name: "PepsiCo Inc.",
            currentPrice: 150.00,
        },
        {
            symbol: "KO",
            name: "Coca-Cola Company",
            currentPrice: 60.00,
        },
        {
            symbol: "MRK",
            name: "Merck & Co., Inc.",
            currentPrice: 80.00,
        },
        {
            symbol: "NKE",
            name: "NIKE, Inc.",
            currentPrice: 130.00,
        },
        {
            symbol: "ABT",
            name: "Abbott Laboratories",
            currentPrice: 120.00,
        },
        {
            symbol: "CRM",
            name: "Salesforce.com Inc.",
            currentPrice: 250.00,
        },
        {
            symbol: "XOM",
            name: "Exxon Mobil Corporation",
            currentPrice: 60.00,
        },
        {
            symbol: "CVX",
            name: "Chevron Corporation",
            currentPrice: 110.00,
        },
        {
            symbol: "IBM",
            name: "International Business Machines Corporation",
            currentPrice: 140.00,
        },
        {
            symbol: "MDT",
            name: "Medtronic plc",
            currentPrice: 100.00,
        },
        {
            symbol: "TMO",
            name: "Thermo Fisher Scientific Inc.",
            currentPrice: 500.00,
        },
        {
            symbol: "QCOM",
            name: "QUALCOMM Incorporated",
            currentPrice: 130.00,
        },
        {
            symbol: "TXN",
            name: "Texas Instruments Incorporated",
            currentPrice: 180.00,
        },
        {
            symbol: "NOW",
            name: "ServiceNow, Inc.",
            currentPrice: 600.00,
        },
        {
            symbol: "LMT",
            name: "Lockheed Martin Corporation",
            currentPrice: 400.00,
        },
        {
            symbol: "HON",
            name: "Honeywell International Inc.",
            currentPrice: 220.00,
        },
        {
            symbol: "SBUX",
            name: "Starbucks Corporation",
            currentPrice: 100.00,
        },
        {
            symbol: "AMGN",
            name: "Amgen Inc.",
            currentPrice: 250.00,
        },
        {
            symbol: "ISRG",
            name: "Intuitive Surgical, Inc.",
            currentPrice: 800.00,
        },
        {
            symbol: "MDLZ",
            name: "Mondelez International, Inc.",
            currentPrice: 60.00,
        },
        {
            symbol: "CAT",
            name: "Caterpillar Inc.",
            currentPrice: 200.00,
        },
        {
            symbol: "BA",
            name: "The Boeing Company",
            currentPrice: 220.00,
        },
        {
            symbol: "MMM",
            name: "3M Company",
            currentPrice: 180.00,
        },
        {
            symbol: "GS",
            name: "The Goldman Sachs Group, Inc.",
            currentPrice: 400.00,
        },
        {
            symbol: "BLK",
            name: "BlackRock, Inc.",
            currentPrice: 800.00,
        },
        {
            symbol: "SCHW",
            name: "The Charles Schwab Corporation",
            currentPrice: 70.00,
        },
        {
            symbol: "SPGI",
            name: "S&P Global Inc.",
            currentPrice: 400.00,
        },
        {
            symbol: "SYK",
            name: "Stryker Corporation",
            currentPrice: 250.00,
        },
        {
            symbol: "ADBE",
            name: "Adobe Inc.",
            currentPrice: 600.00,
        },
        {
            symbol: "LRCX",
            name: "Lam Research Corporation",
            currentPrice: 600.00,
        },
        {
            symbol: "VRTX",
            name: "Vertex Pharmaceuticals Incorporated",
            currentPrice: 300.00,
        },
        {
            symbol: "ATVI",
            name: "Activision Blizzard, Inc.",
            currentPrice: 80.00,
        },
        {
            symbol: "ADP",
            name: "Automatic Data Processing, Inc.",
            currentPrice: 200.00,
        },
        {
            symbol: "FISV",
            name: "Fiserv, Inc.",
            currentPrice: 100.00,
        },
        {
            symbol: "NEM",
            name: "Newmont Corporation",
            currentPrice: 60.00,
        },
        {
            symbol: "C",
            name: "Citigroup Inc.",
            currentPrice: 70.00,
        },
        {
            symbol: "USB",
            name: "U.S. Bancorp",
            currentPrice: 50.00,
        },
        {
            symbol: "PGR",
            name: "The Progressive Corporation",
            currentPrice: 100.00,
        },
        {
            symbol: "AON",
            name: "Aon plc",
            currentPrice: 300.00,
        }
    ].map(stock => ({
        symbol: stock.symbol,
        price: stock.currentPrice,
        change: +(Math.random() * 2 - 1).toFixed(2),
        changePercent: +(Math.random() * 0.1).toFixed(4),
        volume: Math.floor(Math.random() * 10000000) + 1000000
    }))
};

module.exports = stocks;