import "./style.css";
import keys from "./types/keys";
import { Player } from "./classes/Charecter";
import { moveHandler, stopHandler } from "./utils/moveController";
import Platform from "./classes/Platform";

const container = document.querySelector<HTMLCanvasElement>("#app")!;
const context = container.getContext("2d");
container.width = innerWidth;
container.height = innerHeight;

// Player Character
const player = new Player(
  innerWidth * 0.1,
  innerHeight * 0.9,
  15,
  { color: "#000" },
  { x: 0, y: 0 },
  0.5,
  true
);
const keys: keys = {
  space: { pressed: false },
  right: { pressed: false },
  left: { pressed: false },
  Z: { pressed: false },
};

addEventListener("keydown", (e) => {
  e.preventDefault();
  moveHandler(e.code, player, keys);
});

addEventListener("keyup", (e) => {
  e.preventDefault();
  stopHandler(e.code, player, keys);
});

// Sence
const platforms: Platform[] = [];
const platformModal = {
  width: 200,
  height: 10,
};

for (let i = 0; i <= 30; i++) {
  const position = {
    x: (5000 - platformModal.width) * Math.random(),
    y: (innerHeight - platformModal.height) * Math.random(),
  };

  while (position.y >= 650) {
    position.y = (innerHeight - platformModal.height) * Math.random();
  }

  platforms.push(
    new Platform(
      position.x,
      position.y,
      platformModal.width,
      platformModal.height,
      { color: "#000" }
    )
  );
}

// Render
function animate() {
  if (!context) return;
  requestAnimationFrame(animate);

  context.clearRect(0, 0, container.width, container.height);

  player.update(context);

  platforms.forEach((instance) => {
    instance.draw(context);
    instance.collisionDetection(player);
    instance.scrollBackground(player, context);
  });

  if (keys.right.pressed) {
    player.velocity.x = player.Dash ? 10 : 5;
  } else if (keys.left.pressed) {
    player.velocity.x = player.Dash ? -10 : -5;
  } else {
    player.velocity.x = 0;
  }
}

animate();
