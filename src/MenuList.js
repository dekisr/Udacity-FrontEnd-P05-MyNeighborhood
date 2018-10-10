import React, { Component } from 'react'
import { elastic as Menu } from 'react-burger-menu'

class MenuList extends Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu
        bodyClassName={"my-class"}
        pageWrapId={"page-wrap"} outerContainerId={"outer-container"}
        isOpen={this.props.isOpen}
      >
        <div className="menuTop"></div>
        <div className="menuArtists">
          <button className={this.props.activeMenu === 'All' ? 'menuActive' : undefined}
            onClick={() => this.props.filterData('All')}>All</button>
          <button className={this.props.activeMenu === 'Salvador Dali' ? 'menuActive' : undefined}
            onClick={() => this.props.filterData('Salvador Dali')}>Salvador Dalí</button>
          <button className={this.props.activeMenu === 'Rene Magritte' ? 'menuActive' : undefined}
            onClick={() => this.props.filterData('Rene Magritte')}>René Magritte</button>
        </div>
        <ul>
          {this.props.filteredData.map((item, index) => {
            return (
              <li onClick={() => this.props.openMarker(index)}>{item.title}</li>
            )
          })
          }
        </ul>
      </Menu>
    );
  }
}

export default MenuList;