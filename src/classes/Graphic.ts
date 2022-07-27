interface GraphicStatus {
  position: {
    x: number;
    y: number;
  };
  modal: {
    radius?: number;
    width?: number;
    height?: number;
  };
  options?: {
    color: string;
  };
  [key: string]: any;
}

class Rect {
  status: GraphicStatus;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    options?: {
      color: string;
    }
  ) {
    this.status = {
      position: {
        x,
        y,
      },
      modal: {
        width,
        height,
      },
      options,
    };
  }
  draw(context: CanvasRenderingContext2D) {
    const { position, modal } = this.status;
    const { width, height } = modal as { width: number; height: number };

    context.fillStyle = (this.status.options?.color as string) || "#000";
    context.fillRect(position.x, position.y, width, height);
  }
}

class Circle {
  status: GraphicStatus;
  constructor(
    x: number,
    y: number,
    radius: number,
    options?: {
      color: string;
    }
  ) {
    this.status = {
      position: {
        x,
        y,
      },
      modal: {
        radius,
      },
      options,
    };
  }
  draw(context: CanvasRenderingContext2D) {
    const { position, modal } = this.status;
    console.log(this.status);

    context.beginPath();

    context.fillStyle = (this.status.options?.color as string) || "0x000";
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
}

export { Rect, Circle };
