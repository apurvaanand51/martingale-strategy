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


