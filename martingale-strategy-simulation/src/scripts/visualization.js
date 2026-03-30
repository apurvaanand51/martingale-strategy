export function drawMartingaleBalance(history){
    const ctx = document.getElementById("martingaleChart");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: history.map((_, i) => i + 1),
            datasets: [{
                label: "Balance Over Time",
                data: history,
            }]
        }
    });
}