class StockPortfolio {
    constructor() {
        this.tickers = new Set();
        this.amounts = {}
    }

    isEmpty() {
        return this.tickers.size === 0;
    }

    /*
     NOTE: requirements do not describe intended functionality of negative amount.
     Consider implementing if requirements change.
     */
    purchase(symbol, amount) {
        this.tickers.add(symbol)
        this.amounts[symbol] = (this.amounts[symbol] || 0) + amount;
    }

    /*
     NOTE: requirements do not describe intended functionality of negative amount.
     Consider implementing if requirements change.
     */
    sell(symbol, amount) {
        if (this.amounts[symbol] >= amount) {
            this.amounts[symbol] = this.amounts[symbol] - amount
            if (this.amounts[symbol] <= 0) {
                delete this.amounts.symbol;
                this.tickers.delete(symbol);
            }
        } else {
            throw "Not possible to sell this number of shares.";
        }
    }

    countUnique() {
        return this.tickers.size;
    }

    count(symbol) {
        return this.amounts[symbol] || 0;
    }
}

exports.StockPortfolio = StockPortfolio;