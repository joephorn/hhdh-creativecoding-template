function setup() {
  createCanvas(720, 420).parent('canvasWrap');

  window.PARAMS.register();

  const resetButton = document.getElementById('reset');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      window.PARAMS.resetDefaults();
    });
  }

  const randomButton = document.getElementById('randomize');
  if (randomButton) {
    randomButton.addEventListener('click', () => {
      window.PARAMS.randomize();
    });
  }

  window.EXPORTS.register();
}

function draw() {
  background(bg);
  fill(fg);
  noStroke();

  translate(width / 2, height / 2);
  ellipse(0, 0, size, size);
}

