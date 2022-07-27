import { Circle } from "./Graphic";

export class Player extends Circle {
  velocity: { x: number; y: number };
  gravity: number;
  jumpTime: number;
  DoubleJump: boolean;
  Dash: boolean;
  FacedRight: boolean;

  constructor(
    x: number,
    y: number,
    radius: number,
    { color }: { color: string },
    velocity: { x: number; y: number },
    gravity: number,
    DoubleJump: boolean
  ) {
    super(x, y, radius, { color });

    this.status = {
      ...this.status,
    };
    this.velocity = velocity;
    this.gravity = gravity;
    this.jumpTime = 0;
    this.DoubleJump = DoubleJump;
    this.Dash = false;
    this.FacedRight = true;
  }

  draw(context: CanvasRenderingContext2D) {
    const { position, modal } = this.status;
    context.beginPath();
    context.fillStyle = "#00f";
    context.arc(
      position.x,
      position.y,
      modal.radius as number,
      0,
      2 * Math.PI,
      false
    );
    context.fill();
  }

  update(context: CanvasRenderingContext2D) {
    const { position, modal } = this.status;
    this.draw(context);
    position.x += this.velocity.x;
    position.y += this.velocity.y;

    if (
      position.y + (modal.radius as number) + this.velocity.y <=
      innerHeight
    ) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
      this.jumpTime = 0;
    }
  }
}
