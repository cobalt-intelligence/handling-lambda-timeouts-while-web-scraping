(async () => {
    const stuffToDo = new Array(25600);

    setTimeout(() => {
        console.log('TIME IS UP SUCKA');
    }, 5500);

    const begin = Date.now();
    for (let i = 0; i < stuffToDo.length; i++) {
        console.log('We are doing stuff here', i);

        const runTime = Date.now() - begin;

        // do the stuff
        const randomFunction = randomDurationFunction();
        const timer = new Promise((resolve) => {
            setTimeout(() => resolve({ statusCode: 504, message: 'Sorry, your task timed out!' }), 4500 - runTime);
        });
        const winner = await Promise.race([timer, randomFunction]);

        if (winner?.statusCode == 504) {
            console.log('Out of time! Ending function as incomplete');
            break;
        }
        else {
            console.log('yay, our worker finished first');
        }
    }

    console.log('Doing stuff here that needs to be done after the loop');

})();

async function randomDurationFunction() {
    return await timeout(random(1, 10) * 1000);
}

function random(min, max) {
    return Math.floor((Math.random()) * (max - min + 1)) + min;
}

/**
 * Pauses execution of your script for this many milliseconds.
 * 
 * @param {number} ms 
 * @returns 
 */
function timeout(ms) {
    return new Promise((res) => setTimeout(res, ms));
}