import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push as Menu } from 'react-burger-menu';
import logo from './assets/images/logo.svg';
import burgerIcon from './assets/icons/menu_burger.svg';
import crossIcon from './assets/icons/menu_close.svg';

class MenuList extends Component {
  static propTypes = {
    filterData: PropTypes.func.isRequired,
    filteredData: PropTypes.array.isRequired,
    activeMenu: PropTypes.string.isRequired,
    openMarker: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
  }
  accessibilityTo(index, event) {
    (event.keyCode === 13 || event.keyCode === 32) && this.props.openMarker(index);
  }
  render() {
    const { filterData, filteredData, activeMenu, openMarker, isOpen } = this.props;
    return (
      <Menu
        outerContainerId={"outer-container"}
        pageWrapId={"page-wrap"}
        isOpen={isOpen}
        customBurgerIcon={<img src={burgerIcon} alt="Burger Menu Icon" />}
        customCrossIcon={<img src={crossIcon} alt="Close Icon" />}
      >
        <div className="menuTop" aria-label="Logo container">
          <img src={logo} className="logoImage" alt="Magritte's egg with Dali's moustache" />
          <div tabIndex="-1" className="logoText" aria-label="Container logo text">
            <p className="titleOne">My</p>
            <p className="titleTwo">Neighborhood</p>
            <p className="titleThree">udacity project</p>
          </div>
        </div>
        <div className="menuArtists">
          <button tabIndex="0" className={activeMenu === 'All' ? 'menuActive' : undefined}
            onClick={() => filterData('All')}>All</button>
          <button tabIndex="0" className={activeMenu === 'Salvador Dali' ? 'menuActive' : undefined}
            onClick={() => filterData('Salvador Dali')}>Salvador Dalí</button>
          <button tabIndex="0" className={activeMenu === 'Rene Magritte' ? 'menuActive' : undefined}
            onClick={() => filterData('Rene Magritte')}>René Magritte</button>
        </div>
        <ul role="navigation" aria-label="Paintings list">
          {filteredData.map((item, index) => {
            return (
              <li
                key={index}
                tabIndex="0"
                role="link"
                aria-label={`Go to ${item.title}`}
                onClick={() => openMarker(index)}
                onKeyDown={(event) => this.accessibilityTo(index, event)}
              >
                {item.title}
              </li>
            )
          })
          }
        </ul>
        <span className="footer" aria-label="Author">Udacity My Neighborhood Project <br /> made by <a href="https://github.com/dekisr" target="_blank" rel="noopener noreferrer">@dekisr</a></span>
      </Menu>
    );
  }
}

export default MenuList;