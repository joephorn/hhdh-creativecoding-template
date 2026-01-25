let topImg;
let bottomImg;
const gapRects = [
  { x: -0.34, w: 0.05 },
  { x: -0.21, w: 0.05 },
  { x: -0.11, w: 0.05 },
  { x: -0.02, w: 0.04 },
  { x: 0.06, w: 0.04 },
  { x: 0.16, w: 0.05 },
  { x: 0.29, w: 0.04 },
  { x: 0.34, w: 0.02 },
  { x: 0.45, w: 0.07 },
];

function preload() {
  topImg = loadImage('assets/top.png');
  bottomImg = loadImage('assets/bottom.png');
}

function setup() {
  createCanvas(720, 420).parent('canvasWrap');
  imageMode(CENTER);
  rectMode(CENTER);
  frameRate(30);

  config();
}

function draw() {
  clear();
  background(bg);
  if (!topImg || !bottomImg || !topImg.width || !bottomImg.width) return;
  const w = sizeX;
  const gap = space ?? 0;
  const rectScale = Number.isFinite(sizeMultiplier) ? sizeMultiplier : 1;
  const topH = w * (topImg.height / topImg.width);
  const bottomH = w * (bottomImg.height / bottomImg.width);
  const centerY = height / 2;
  const topY = centerY - gap / 2 - topH / 2;
  const bottomY = centerY + gap / 2 + bottomH / 2;

  image(topImg, width / 2, topY, w, topH);
  if (gap > 0) {
    noStroke();
    fill(fg);
    gapRects.forEach((rectDef) => {
      const rectW = w * rectDef.w * rectScale;
      const rectX = width / 2 + w * rectDef.x;
      rect(rectX, centerY, rectW, gap);
    });
  }
  image(bottomImg, width / 2, bottomY, w, bottomH);
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
