import { Rect } from "./Graphic";
import { Player } from "./Charecter";

class Platform extends Rect {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    options: {
      color: string;
    }
  ) {
    super(x, y, width, height, options);
  }

  collisionDetection(character: Player) {
    const { position, modal } = character.status;
    const radius = modal.radius as number;

    if (
      position.y + radius <= this.status.position.y &&
      position.y + radius + character.velocity.y >= this.status.position.y &&
      position.x + radius >= this.status.position.x &&
      position.x - radius <=
        this.status.position.x + (this.status.modal.width as number)
    ) {
      character.velocity.y = 0;
      character.jumpTime = 0;
    }
  }

  scrollBackground(character: Player, context: CanvasRenderingContext2D) {
    const { clientWidth } = context.canvas;
    const { position, modal } = character.status;
    const radius = modal.radius as number;

    if (position.x + radius >= clientWidth * 0.95) {
      this.status.position.x -= character.velocity.x;
      position.x = clientWidth * 0.95 - radius;
    } else if (position.x + radius <= clientWidth * 0.05) {
      this.status.position.x -= character.velocity.x;
      position.x = clientWidth * 0.05 - radius;
    }
  }
}

export default Platform;
