import React, { SFC } from 'react';
import { navigateTo } from '../../navigation/LocationService';

export interface Props {
  child: any;
}

const DropDownChild: SFC<Props> = props => {
  const { child } = props;
  const listItemClassName = child.divider ? 'divider' : '';

  return (
    <li className={listItemClassName}>
      {/* Best thing would be tu use react-router-dom Link component here
        * but as this is rendered from ng directive, it's not in the main React tree,
        * so it's out of Router's context. Link component cannot be used out of Router ctx.
        */}
      <a
        href={child.url}
        onClick={e => {
          e.preventDefault();
          navigateTo(child.url);
        }}
      >
        {child.icon && <i className={child.icon} />}
        {child.text}
      </a>
    </li>
  );
};

export default DropDownChild;
