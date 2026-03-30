export let probabilityHistory = [];
export let experimentResults = [];

export function simulate(totalFlip, totalExp) {

    probabilityHistory = [];
    experimentResults = [];

    let head = 0;
    let flipCount = 0;

    for (let i = 1; i <= totalFlip; i++) {
        flipCount++;

        let rand = Math.random();

        if (rand < 0.5) {
            head++;
        }

        let liveProbability = head / flipCount;
        probabilityHistory.push(liveProbability);
    }

    for (let j = 1; j <= totalExp; j++) {

        let expHead = 0;

        for (let i = 1; i <= totalFlip; i++) {

            let rand = Math.random();

            if (rand < 0.5) {
                expHead++;
            }
        }

        let probability = expHead / totalFlip;
        experimentResults.push(probability);
    }

    return {
        probabilityHistory,
        experimentResults
    };
}