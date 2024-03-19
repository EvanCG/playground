/**
 * Fair coin flip it gives Heads / Tails
 *
 * For HH, Alice gets a point, for for HT Bob gets a point
 *
 */

/**
 * Represents the result of N games at once
 * @param {integer} games - The number of games to run
 * @returns {object} result - Object with four variables:
 *  matches: string of the coin flips
 *  alice: points for alice
 *  bob: points for bob
 *  winner: string, either Alice of bob
 */
const runGames = (games) => {
  // initialize result object, with alice, and bob both set to zero and history an empty string
  let result = {
    alice: 0,
    bob: 0,
  };

  // create matches array
  let matches = [];
  // For loop games times
  for (let i = 0; i < games; i++) {
    // math.rand 0, 1
    let flip = Math.floor(Math.random() * 2);
    let flipResult = flip === 0 ? 'H' : 'T';
    matches.push(flipResult);
  }

  // process the results
  // for loop of the array until first to last, to avoid bad result with looking at null value
  for (let i = 0; i < matches.length - 1; i++) {
    // current = matches[i] + matches[i+1]
    let current = matches[i] + matches[i + 1];
    // give a point to the current 'winner'
    if (current === 'HH') result.alice++;
    if (current === 'HT') result.bob++;
  }
  // add last match to the history

  // if result.alice > result.bob, result.winner = Alice
  if (result.alice > result.bob) {
    result.winner = 'Alice';
  } else if (result.alice < result.bob) {
    result.winner = 'Bob';
  } else {
    result.winner === null;
  }
  // return result
  return result;
};

const runSimulation = (games, flips) => {
  let aliceWins = 0;
  let bobWins = 0;
  console.log(`\nSimulating ${games.toLocaleString()} games with ${flips.toLocaleString()} flips each.\n\x1b[33m`);
  let progressBar = 0;
  const barSize = 50;

  for (let i = 0; i < games; i++) {
    let tempResult = runGames(flips);
    if (i % (games / barSize) === 0) {
      progressBar++;
      process.stdout.write(`\r [${'X'.repeat(progressBar)+'-'.repeat(barSize-progressBar)}] ${Math.round((i/games)*100)}%`);
    }
    if (tempResult.winner === 'Alice') aliceWins++;
    if (tempResult.winner === 'Bob') bobWins++;
  }

  // print final progress bar
  process.stdout.write(`\r [${'X'.repeat(barSize)}] ${Math.round(100)}%\x1b[0m`);

  console.log(`\n\nPlayed ${games.toLocaleString()} games with ${flips.toLocaleString()} flips each.`);
  console.log(`Alice wins: ${aliceWins.toLocaleString()} (${((aliceWins / games) * 100).toFixed(2)}%)`);
  console.log(`Bob wins: ${bobWins.toLocaleString()} (${((bobWins / games) * 100).toFixed(2)}%)\n`);
};

runSimulation(100000, 10000);
