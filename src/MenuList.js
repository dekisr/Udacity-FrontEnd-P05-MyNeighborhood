import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { elastic as Menu } from 'react-burger-menu'

class MenuList extends Component {
  static propTypes = {
    filterData: PropTypes.func.isRequired,
    filteredData: PropTypes.array.isRequired,
    activeMenu: PropTypes.string.isRequired,
    openMarker: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
  }
  render() {
    const { filterData, filteredData, activeMenu, openMarker, isOpen } = this.props;
    return (
      <Menu
        outerContainerId={"outer-container"}
        pageWrapId={"page-wrap"}
        isOpen={isOpen}
      >
        <div className="menuTop"></div>
        <div className="menuArtists">
          <button className={activeMenu === 'All' ? 'menuActive' : undefined}
            onClick={() => filterData('All')}>All</button>
          <button className={activeMenu === 'Salvador Dali' ? 'menuActive' : undefined}
            onClick={() => filterData('Salvador Dali')}>Salvador Dalí</button>
          <button className={activeMenu === 'Rene Magritte' ? 'menuActive' : undefined}
            onClick={() => filterData('Rene Magritte')}>René Magritte</button>
        </div>
        <ul>
          {filteredData.map((item, index) => {
            return (
              <li key={index} onClick={() => openMarker(index)}>{item.title}</li>
            )
          })
          }
        </ul>
      </Menu>
    );
  }
}

export default MenuList;