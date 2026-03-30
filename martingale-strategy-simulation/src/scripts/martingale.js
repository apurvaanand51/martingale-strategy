export function runMartingale(initialBalance, baseBet, totalRounds){
    let balance = initialBalance;
    let currentBet = baseBet;

    let history = [];
    let betHistory = [];
    let resultHistory = [];

    let isBankrupt = false;

    for(let i = 1; i <= totalRounds; i++){

        betHistory.push(currentBet);

        let rand = Math.random();

        if(rand < 0.5){
            balance += currentBet;
            resultHistory.push("W");

            currentBet = baseBet;

        } else {
            balance -= currentBet;
            resultHistory.push("L");

            currentBet = currentBet * 2;
        }

        history.push(balance);

        if(currentBet > balance){
            isBankrupt = true;
            break;
        }
    }

    return {
        history,
        betHistory,
        resultHistory,
        finalBalance: balance,
        isBankrupt
    };
}


export function runMultipleMartingale(initialBalance, baseBet, totalRounds, totalExperiments){
    let results = [];
    let bankruptCount = 0;
    let profitCount = 0;
    let lossCount = 0;
    let totalFinalBalance = 0;

    let minBalance = Infinity;

    for (let i = 1; i <= totalExperiments; i++){
        let result = runMartingale(initialBalance, baseBet, totalRounds);

        results.push(result.finalBalance);

        if (result.isBankrupt) {
            bankruptCount++;
        }

        if (result.finalBalance > initialBalance) {
            profitCount++;
        } else {
            lossCount++;
        }

        if (result.finalBalance < minBalance) {
            minBalance = result.finalBalance;
        }

        totalFinalBalance += result.finalBalance;
    }

    let avgBalance = totalFinalBalance / totalExperiments;

    let bankruptcyRate = (bankruptCount / totalExperiments) * 100;
    let profitRate = (profitCount / totalExperiments) * 100;

    let netProfit = totalFinalBalance - (initialBalance * totalExperiments);
    let avgProfit = netProfit / totalExperiments;

    return {
        results,
        avgBalance,
        bankruptcyRate,
        profitRate,
        netProfit,
        avgProfit,
        bankruptCount,
        profitCount,
        lossCount,
        worstCase: minBalance
    };
}