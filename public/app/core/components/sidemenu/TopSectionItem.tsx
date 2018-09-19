import React, { SFC } from 'react';
import SideMenuDropDown from './SideMenuDropDown';
import { navigateTo } from '../../navigation/LocationService';

export interface Props {
  link: any;
}

const TopSectionItem: SFC<Props> = props => {
  const { link } = props;
  return (
    <div className="sidemenu-item dropdown">
      {/* Best thing would be tu use react-router-dom Link component here
        * but as this is rendered from ng directive, it's not in the main React tree,
        * so it's out of Router's context. Link component cannot be used out of Router ctx.
        */}
      <a
        className="sidemenu-link"
        href={link.url}
        target={link.target}
        onClick={e => {
          e.preventDefault();
          navigateTo(link.target);
        }}
      >
        <span className="icon-circle sidemenu-icon">
          <i className={link.icon} />
          {link.img && <img src={link.img} />}
        </span>
      </a>
      {link.children && <SideMenuDropDown link={link} />}
    </div>
  );
};

export default TopSectionItem;
