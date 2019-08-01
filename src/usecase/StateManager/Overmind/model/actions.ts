import { Action, AsyncAction } from 'overmind';

export const increaseCount: Action = ({ state }) => {
  state.count += 1
}

export const decreaseCount: Action = ({ state }) => {
  state.count -= 1
}
// export const decreaseCount: AsyncAction = async ({ state, effects }) => {
//   state.count -= await effects.getRandomNumber()
// }

export const resetRandomCount: AsyncAction = async ({ state, effects }) => {
  state.count = await effects.getRandomNumber();
}


export const addPins: Action = ({ state }) => {
  state.pins.arr = [...state.pins.arr, 1];
}

export const setRandomName: AsyncAction = async ({ state, effects }) => {
  console.log('clicked');
  let tmp = await effects.getRandomName();
  console.log('tmp: ', tmp);
  state.pins.name = tmp;
}
