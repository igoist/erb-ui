// export const Tween: any;

interface T {
  easeIn: (t: number, b: number, c: number, d: number) => number;
  easeOut: (t: number, b: number, c: number, d: number) => number;
  easeInOut: (t: number, b: number, c: number, d: number) => number;
}

interface TweenType {
  Cubic: T;
}

declare var Tween: TweenType;



export default Tween;
