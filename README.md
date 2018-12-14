<p align="center">
  <a href="#" style="text-decoration: none;">
    <span style="font-size: 90px;">UI</span>
  </a>
</p>

# erb-ui

*...*

<!-- ![Why I don't use HMR](public/img/why-not-hmr.png) -->

<!-- <img src='public/img/why-not-hmr.png' width='100px' height='100px'> -->


## How to use

```
# clone
git clone git@github.com:igoist/et-react-boilerplate.git your-project-name

# install packages
cd your-project-name
npm i

# tricks
mkdir public/css
mkdir dist
./scripts/link.sh

# compile css, split a new window for it
cd public
sass sass/main.scss:css/main.css --watch

# you may need to change the port in webpack/dev.js, 3000 -> 300x

# compile (ts|tsx), split a new window for it
npm run dev

# start, split a new window for it
npm run start
```
