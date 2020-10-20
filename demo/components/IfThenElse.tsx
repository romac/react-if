import * as React from 'react';
import { Else, If, Then } from '../../dist';

interface IfThenElseProps {
  age: number;
  drinkingAge: number;
  name: string;
}

const IfThenElse: React.FC<IfThenElseProps> = ({ age, drinkingAge, name }) => (
  <div id="if-then-else">
    <If condition={age >= drinkingAge}>
      <Then>
        <span>Have a beer, {name}!</span>
      </Then>
      <Else>
        {() => {
          return <span>Sorry, {name}, you are not old enough.</span>;
        }}
      </Else>
    </If>
  </div>
);

export default IfThenElse;
