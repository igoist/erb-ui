import * as React from 'react';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import { config } from './model';
import Count from './Count';

const overmind = createOvermind(config);

const App = () => {
  return (
    <div>
      <Provider value={ overmind }>
        <Count />
      </Provider>
    </div>
  );
};

export default App;
