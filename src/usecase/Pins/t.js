const fs = require('fs');

const ColorArr = [
  {
    hex: 'ed4e2a'
  },
  {
    hex: 'f05050'
  },
  {
    hex: 'f06060'
  },
  {
    hex: 'f0c0c0'
  },
  {
    hex: 'f88e8b'
  },
  {
    hex: 'e75b8d'
  },
  {
    hex: '7e3794'
  },
  {
    hex: '428bca'
  },
  {
    hex: 'cccfff'
  },
  {
    hex: '11a9cc'
  },
  {
    hex: '4caf50'
  },
  {
    hex: '9acd32'
  },
  {
    hex: 'a0d468'
  },
  {
    hex: 'fff4c8'
  },
  {
    hex: 'ffa500'
  },
  {
    hex: 'ebcd56'
  },
  {
    hex: '58b3ff'
  },
  {
    hex: 'ff605f'
  },
  {
    hex: 'ffd52e'
  },
  {
    hex: '49dd8e'
  },
  {
    hex: 'ae99ff'
  },
  {
    hex: '108ee9'
  },
  {
    hex: '42b983'
  },
  {
    hex: '3da35a'
  },
  {
    hex: '0dd'
  },
  {
    hex: 'fb5454'
  },
];

let pins = [];

const getRandomColor = () => {
  // return '#' + Math.ceil(Math.random() * 15).toString(16) + Math.ceil(Math.random() * 15).toString(16) + Math.ceil(Math.random() * 15).toString(16);
  return '#' + ColorArr[Math.ceil(Math.random() * (ColorArr.length - 1))].hex;
}

for (let i = 0; i < 200; i++) {
  pins.push({
    id: i,
    col: 0,
    top: 0,
    left: 0,
    height: 200 + Math.ceil(Math.random() * 300),
    bgColor: getRandomColor()
  });
}


// const fileName = './map-pins.json';
const fileName = '/Users/Egoist/Sites/Apps/erb-ui/public/map/map-pins.json';

fs.writeFile(fileName, JSON.stringify(pins, ['id', 'col', 'top', 'left', 'height', 'bgColor'], 2), err => {
  if (err) throw err;
  console.log('The file has been saved!');
});


// console.log(getRandomColor());
