import { Player } from "../classes/Charecter";
import keys from "../types/keys";

export function moveHandler(event: string, player: Player, keys: keys) {
  const { velocity } = player;

  switch (event) {
    case "Space":
      const JumpLimited = player.DoubleJump ? 2 : 1;
      if (keys.space.pressed || JumpLimited <= player.jumpTime) return;

      keys.space.pressed = true;
      player.jumpTime += 1;
      velocity.y -= 12;
      break;

    case "ArrowDown":
      velocity.y += 5;
      break;

    case "ArrowLeft":
      keys.left.pressed = true;
      player.FacedRight = false;
      break;

    case "ArrowRight":
      keys.right.pressed = true;
      player.FacedRight = true;
      break;

    case "KeyZ":
      if (keys.Z.pressed) return;
      keys.Z.pressed = true;
      player.Dash = true;

      setTimeout(() => {
        player.Dash = false;
      }, 300);

      break;
  }
}

export function stopHandler(event: string, player: Player, keys: keys) {
  const { velocity, gravity } = player;

  switch (event) {
    case "Space":
      keys.space.pressed = false;

      velocity.y += gravity;
      break;

    case "ArrowDown":
      break;

    case "ArrowLeft":
      keys.left.pressed = false;
      break;

    case "ArrowRight":
      keys.right.pressed = false;
      break;

    case "KeyZ":
      keys.Z.pressed = false;
      player.Dash = false;
      break;
  }
}
