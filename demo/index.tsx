import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IfThen from './components/IfThen';
import IfThenElse from './components/IfThenElse';
import IfWithPromise from './components/IfWithPromise';
import './index.css';

const App = () => {
  return (
    <>
      <div className="card shadow-2xl lg:card-side bg-primary text-primary-content m-8">
        <div className="card-body">
          <span>
            <strong>IfThenElse:</strong>
            <IfThenElse age={23} drinkingAge={16} name="Romac" />
          </span>
        </div>
      </div>

      <div className="card shadow-2xl lg:card-side bg-primary text-primary-content m-8">
        <div className="card-body">
          <span>
            <strong>IfThen:</strong>
            <IfThen prefersFanta name="Favna" />
          </span>
        </div>
      </div>

      <div className="card shadow-2xl lg:card-side bg-primary text-primary-content m-8">
        <div className="card-body">
          <span>
            <strong>IfWithPromise:</strong>
            <IfWithPromise resolutionReturnValue="My precious data" rejectionReturnValue="An error occurred" delay={3} />
          </span>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
