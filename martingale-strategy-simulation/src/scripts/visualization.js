let distributionChart;
let convergenceChart;
let martingaleBalanceChart;
let martingaleBetChart;
let martingaleDistributionChart;

export function drawDistribution(results) {

    const ctx = document.getElementById("distributionChart");

    if (distributionChart) distributionChart.destroy();

    const bins = {};

    results.forEach(value => {
        const key = value.toFixed(1);
        bins[key] = (bins[key] || 0) + 1;
    });

    const labels = Object.keys(bins).sort((a, b) => a - b);
    const frequencies = labels.map(label => bins[label]);

    distributionChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Frequency",
                data: frequencies,
                backgroundColor: "rgba(54, 162, 235, 0.7)",
                borderRadius: 6
            }]
        }
    });
}

export function drawConvergence(history) {

    const ctx = document.getElementById("convergenceChart");

    if (convergenceChart) convergenceChart.destroy();

    const step = Math.ceil(history.length / 100);

    const sampledHistory = history.filter((_, i) => i % step === 0);
    const sampledLabels = sampledHistory.map((_, i) => i * step + 1);

    convergenceChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: sampledLabels,
            datasets: [
                {
                    label: "Running Probability",
                    data: sampledHistory,
                    borderColor: "rgba(255, 99, 132, 1)",
                    pointRadius: 0,
                    tension: 0.4,
                    fill: false
                },
                {
                    label: "Expected (0.5)",
                    data: sampledHistory.map(() => 0.5),
                    borderColor: "black",
                    borderDash: [6, 6],
                    pointRadius: 0
                }
            ]
        }
    });
}

export function drawMartingaleBalance(history) {

    const ctx = document.getElementById("martingaleBalanceChart");

    if (martingaleBalanceChart) martingaleBalanceChart.destroy();

    martingaleBalanceChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: history.map((_, i) => i + 1),
            datasets: [{
                label: "Balance",
                data: history,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.3,
                pointRadius: 0
            }]
        }
    });
}


export function drawMartingaleBets(betHistory) {

    const ctx = document.getElementById("martingaleBetChart");

    if (martingaleBetChart) martingaleBetChart.destroy();

    martingaleBetChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: betHistory.map((_, i) => i + 1),
            datasets: [{
                label: "Bet Size",
                data: betHistory,
                borderColor: "rgba(255, 159, 64, 1)",
                tension: 0.3,
                pointRadius: 0
            }]
        },
        options: {
            scales: {
                y: {
                    type: "logarithmic",
                }
            }
        }
    });
}


export function drawMartingaleDistribution(results) {

    const ctx = document.getElementById("martingaleDistributionChart");

    if (martingaleDistributionChart) martingaleDistributionChart.destroy();

    const bins = {};

    results.forEach(value => {
        const key = Math.floor(value / 10) * 10; 
        bins[key] = (bins[key] || 0) + 1;
    });

    const labels = Object.keys(bins).sort((a, b) => a - b);
    const frequencies = labels.map(label => bins[label]);

    martingaleDistributionChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Final Balance Distribution",
                data: frequencies,
                backgroundColor: "rgba(153, 102, 255, 0.7)",
                borderRadius: 6
            }]
        }
    });
}