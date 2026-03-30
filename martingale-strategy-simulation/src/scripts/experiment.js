import { simulate, probabilityHistory, experimentResults } from "./simulation.js";

import {
    drawDistribution,
    drawConvergence,
    drawMartingaleBalance,
    drawMartingaleBets,
    drawMartingaleDistribution
} from "./visualization.js";

import {
    runMartingale,
    runMultipleMartingale
} from "./martingale.js";

simulate(100, 1000);  

drawDistribution(experimentResults);
drawConvergence(probabilityHistory);

console.log("Monte Carlo Results:", experimentResults);

const singleRun = runMartingale(
    1000,
    10,
    100
);

drawMartingaleBalance(singleRun.history);
drawMartingaleBets(singleRun.betHistory);

console.log("Single Martingale Run:", singleRun);

const multiRun = runMultipleMartingale(
    1000,
    10,
    100,
    1000
);

drawMartingaleDistribution(multiRun.results);

console.log("Martingale Multi-Run Stats:");
console.log("Average Balance:", multiRun.avgBalance);
console.log("Net Profit:", multiRun.netProfit);
console.log("Average Profit per Run:", multiRun.avgProfit);
console.log("Bankruptcy Rate (%):", multiRun.bankruptcyRate);
console.log("Profit Rate (%):", multiRun.profitRate);
console.log("Worst Case Balance:", multiRun.worstCase);
console.log("Total Profits:", multiRun.profitCount);
console.log("Total Losses:", multiRun.lossCount);
console.log("Total Bankruptcies:", multiRun.bankruptCount);