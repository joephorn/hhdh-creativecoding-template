function setup() {
  createCanvas(1200, 750).parent('canvasWrap');
  ellipseMode(CENTER);
  frameRate(30);

  config();
}

function draw() {
  clear();
  background(bg);
  noStroke();
  fill(fg);
  translate(width / 2, height / 2);
  ellipse(0, 0, sizeX, sizeY);
}

function config() {
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
  if (window.SCENES) {
    window.SCENES.register();
  }
}
