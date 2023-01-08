const players = ["Tina", "Jorge", "Julien"];

function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

async function getResults(element) {
    try {
        const result = await luckyDraw(element);
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}


players.forEach(element => {
    getResults(element)
})