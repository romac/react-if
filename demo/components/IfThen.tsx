import * as React from 'react';
import { If, Then } from '../../dist';

interface IfThenProps {
  prefersFanta: boolean;
  name: string;
}

const IfThen: React.FC<IfThenProps> = ({ prefersFanta, name }) => (
  <div id="if-then">
    <If condition={prefersFanta}>
      <Then>
        <span>Have a fanta, {name}!</span>
      </Then>
    </If>
  </div>
);

export default IfThen;
