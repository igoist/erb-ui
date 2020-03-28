export const initState = [
  { id: 0, text: '000000000' }
];

const reducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD':
      console.log('tmp: ', [...state, { id: state.length, text: payload }]);
      return [...state, { id: state.length, text: payload }];
      // return state;
    case 'MODIFY':
      return state.map(item => (item.id === payload.id ? payload.data : item));
    case 'DELETE':
      return state.filter(item => item.id !== payload.id);
    default:
      return state;
  }
};

export default reducer;
