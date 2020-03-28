import * as React from 'react';
import createUseContext from 'constate';

const { useState } = React;

const useC1 = () => {
  const [c1, setC1] = useState(100);

  const incC1 = () => setC1(prevC1 => prevC1 + 1);

  return { c1, incC1 };
}

const useC1Context = createUseContext(useC1);
const useC1CopyContext = createUseContext(useC1);

const useC2 = () => {
  const [c2, setC2] = useState(200);

  const incC2 = () => setC2(prevC2 => prevC2 + 2);

  return { c2, incC2 };
}

const useC2Context = createUseContext(useC2);

const C1 = () => {
  const { c1 } = useC1Context();

  return (
    <p style={{ fontSize: '32px' }}>{ c1 }</p>
  );
};

const C1Btn = () => {
  const { incC1 } = useC1Context();

  return (
    <button onClick={ incC1 }>C1Btn</button>
  )
};

const C1Combine = () => {
  const { c1, incC1 } = useC1Context();

  return (
    <div>
      <p>{ c1 }</p>
      <button onClick={ incC1 }>C1Btn</button>
    </div>
  )
}

const C1CopyCombine = () => {
  const { c1, incC1 } = useC1CopyContext();

  return (
    <div>
      <p>{ c1 }</p>
      <button onClick={ incC1 }>C1Btn</button>
    </div>
  )
}

const AppLike = () => {
  const { c1, incC1 } = useC1Context();
  const { c2, incC2 } = useC2Context();

  const A = () => {
    console.log('AppLike AAAAAAAAAAA');
    incC1();
    incC2();
  };

  return (
    <div>
      <p>{ c1 }</p>
      <p>{ c2 }</p>
      <button onClick={ A }>AppLikeBtn</button>
    </div>
  )
}

const App = () => {

  const { c1, incC1 } = useC1Context();
  const { c2, incC2 } = useC2Context();

  console.log('enter: ', c1, c2);

  const A = () => {
    console.log('AAAAAAAAAAA');
    incC1();
    incC2();
  };


  return (
    <div>
      <useC1Context.Provider>
        <C1 />
        <p>{ c1 }</p>
        <C1Btn />

        <C1Combine />
        <C1Combine />

        <button onClick={ A }>Button1</button>
      </useC1Context.Provider>
      <useC1CopyContext.Provider>
        <C1CopyCombine />
      </useC1CopyContext.Provider>
      <useC2Context.Provider>
        <p>{ c2 }</p>
        <button onClick={ A }>Button2</button>

        <useC1Context.Provider>
          <AppLike />
        </useC1Context.Provider>
      </useC2Context.Provider>

      <button onClick={ A }>Button3x</button>

      <useC1Context.Provider>
        <useC2Context.Provider>
          <AppLike />
        </useC2Context.Provider>
      </useC1Context.Provider>
      {/* <useC1Context.Provider>
        <useC2Context.Provider>
          <AppLike />
        </useC2Context.Provider>
      </useC1Context.Provider> */}
    </div>
  )
};

export default App;
