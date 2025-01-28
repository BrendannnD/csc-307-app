/*
I was mostly able to follow the TDD process in this assignment. When the requirements
were clear, it was easy to write the tests before and then write the functionality.
However, when the requirements were not well-defined, like 2.4 where it does not
describe how the portfolio should be updated for negative selling amounts or selling
more than the amount owned, I found it harder to write tests before. For a few requirements,
I looked ahead to future requirements so I could understand future functionality. This
may have been "cheating" on TDD a bit, but it helped reduce refactoring and still allowed
me to write tests beforehand. I found TDD somewhat helpful for ensuring I consider edge cases,
but it slowed down the thought process of how I would approach implementing the requirements
because I did not have the whole picture.
 */

const stocks = require('./stocks.js');

test('Testing empty portfolio creation', () => {
    const portfolio = new stocks.StockPortfolio();
    const targetTickersSize = 0;
    const resultTickersSize = portfolio.tickers.size;
    const targetKeysLength = 0;
    const resultKeysLength = Object.keys(portfolio.amounts).length;
    expect(resultTickersSize).toBe(targetTickersSize);
    expect(resultKeysLength).toBe(targetKeysLength);
});

test('Testing portfolio isEmpty method -- empty', () => {
    const portfolio = new stocks.StockPortfolio();
    const result = portfolio.isEmpty();
    expect(result).toBeTruthy();
});

test('Testing portfolio isEmpty method -- has stock', () => {
    const portfolio = new stocks.StockPortfolio();
    portfolio.purchase("ABC", 5);
    const result = portfolio.isEmpty();
    expect(result).toBeFalsy();
});

test('Testing portfolio purchase method -- one stock', () => {
    const portfolio = new stocks.StockPortfolio();
    portfolio.purchase("AAPL", 2);
    const target = 2;
    const result = portfolio.count("AAPL");
    expect(result).toBe(target);
});

test('Testing portfolio purchase method -- adding to multiple stocks', () => {
    const portfolio = new stocks.StockPortfolio();
    portfolio.purchase("AAPL", 2);
    const targetAAPL1 = 2;
    const resultAAPL1 = portfolio.count("AAPL");
    expect(resultAAPL1).toBe(targetAAPL1);
    portfolio.purchase("ABC", 1);
    portfolio.purchase("AAPL", 2);
    const targetABC = 1;
    const resultABC = portfolio.count("ABC");
    const targetAAPL2 = 4;
    const resultAAPL2 = portfolio.count("AAPL");
    expect(resultABC).toBe(targetABC);
    expect(resultAAPL2).toBe(targetAAPL2);
});

test('Testing portfolio sell method -- remove from one stock', () => {
    const portfolio = new stocks.StockPortfolio();
    portfolio.purchase("AAPL", 2);
    const targetBefore = 2;
    const resultBefore = portfolio.count("AAPL");
    expect(resultBefore).toBe(targetBefore);
    portfolio.sell("AAPL", 1);
    const targetAfter = 1;
    const resultAfter = portfolio.count("AAPL");
    expect(resultAfter).toBe(targetAfter);
});

test('Testing portfolio sell method -- remove all from stock', () => {
    const portfolio = new stocks.StockPortfolio();
    portfolio.purchase("AAPL", 2);
    const targetBefore = 2;
    const resultBefore = portfolio.count("AAPL");
    expect(resultBefore).toBe(targetBefore);
    portfolio.sell("AAPL", 2);
    const targetAfter = 0;
    const resultAfter = portfolio.count("AAPL");
    expect(resultAfter).toBe(targetAfter);
});

test('Testing portfolio sell method -- remove from unowned stock then buy', () => {
    const portfolio = new stocks.StockPortfolio();
    const func = () => {
        portfolio.sell("RBLX", 2);
    };
    const targetError = "Not possible to sell this number of shares.";
    expect(func).toThrow(targetError);
    const targetBefore = 0;
    const resultBefore = portfolio.count("RBLX");
    expect(resultBefore).toBe(targetBefore);
    portfolio.purchase("RBLX", 2);
    const targetAfter = 2;
    const resultAfter = portfolio.count("RBLX");
    expect(resultAfter).toBe(targetAfter);
});

test('Testing portfolio uniqueCount method -- two stocks', () => {
    const portfolio = new stocks.StockPortfolio();
    portfolio.purchase("AAPL", 2);
    portfolio.purchase("SPX", 3);
    const target = 2;
    const result = portfolio.countUnique();
    expect(result).toBe(target);
});

test('Testing portfolio uniqueCount method -- two stocks, bought twice', () => {
    const portfolio = new stocks.StockPortfolio();
    portfolio.purchase("AAPL", 2);
    portfolio.purchase("SPX", 3);
    portfolio.purchase("SPX", 3);
    const target = 2;
    const result = portfolio.countUnique();
    expect(result).toBe(target);
});

test('Testing portfolio uniqueCount method -- one stock sold', () => {
    const portfolio = new stocks.StockPortfolio();
    portfolio.purchase("AAPL", 2);
    portfolio.purchase("SPX", 3);
    portfolio.sell("SPX", 3);
    const target = 1;
    const result = portfolio.countUnique();
    expect(result).toBe(target);
});

test('Testing portfolio uniqueCount method -- empty portfolio', () => {
    const portfolio = new stocks.StockPortfolio();
    const target = 0;
    const result = portfolio.countUnique();
    expect(result).toBe(target);
});

test('Testing count method -- zero stock held', () => {
    const portfolio = new stocks.StockPortfolio();
    const target = 0;
    const result = portfolio.count("AAPL");
    expect(result).toBe(target);
});

test('Testing selling more stock than owned', () => {
    const portfolio = new stocks.StockPortfolio();
    portfolio.purchase("AAPL", 2);
    const func = () => {
        portfolio.sell("AAPL", 3);
    };
    const targetError = "Not possible to sell this number of shares.";
    expect(func).toThrow(targetError);
});

test('Testing portfolio sell method -- remove from unowned stock then buy', () => {
    const portfolio = new stocks.StockPortfolio();
    const func = () => {
        portfolio.sell("RBLX", 2);
    };
    const targetError = "Not possible to sell this number of shares.";
    expect(func).toThrow(targetError);
});
