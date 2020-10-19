import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IfThen from './components/IfThen';
import IfThenElse from './components/IfThenElse';

const App = () => {
  return (
    <div>
      <span>
        IfThenElse:
        <IfThenElse age={23} drinkingAge={16} name="Romac" />
      </span>
      <span>
        IfThen:
        <IfThen prefersFanta name="Favna" />
      </span>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
