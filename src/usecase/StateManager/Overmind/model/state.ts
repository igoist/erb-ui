type P = {
  arr: Array<number>,
  name?: string
}

type State = {
  count: number,
  pins: P
}

export const state: State = {
  count: 0,
  pins: {
    arr: [],
    name: '???'
  }
}
