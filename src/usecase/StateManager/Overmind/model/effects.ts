export const getRandomNumber = (): Promise<number> => {
  return Promise.resolve(
    Math.round(Math.random() * 100)
  );
}

export const getRandomName = (): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(['AAA', 'BBB', 'CCC'][Math.ceil(Math.random() * 20) % 3]);
    }, 1);
  })
}
