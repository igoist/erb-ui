import * as React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import routerArr from './routerArr';

export default class Menu extends React.Component {
  render() {
    let rows = [];

    for (let i = 0; i < routerArr.length; i++) {
      let item = routerArr[i];
      rows.push(
        <li key={ i.toString() }>
          <Link to={ item.path }>
            { item.title }
          </Link>
        </li>
      );
    }

    return (
      <>
        <ul className='siteMenu'>
          { rows }
        </ul>
      </>
    );
  }
}

class Routes extends React.Component {
  render() {
    let rows = [];

    for (let i = 0; i < routerArr.length; i++) {
      let item = routerArr[i];
      if (item.exact) {
        rows.push(<Route key={ i.toString() } exact path={ item.path } component={ item.component } />);
      } else {
        rows.push(<Route key={ i.toString() } path={ item.path } component={ item.component } />);
      }
    }

    return (
      <>
        { rows }
      </>
    );
  }
}

export { Menu, Routes }
