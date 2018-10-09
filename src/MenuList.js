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
        <div className="menuArtists">
          <button className={this.props.activeMenu === 'All' && 'menuActive'}
            onClick={() => this.props.filterData('All')}>All</button>
          <button className={this.props.activeMenu === 'Salvador Dali' && 'menuActive'}
            onClick={() => this.props.filterData('Salvador Dali')}>Salvador Dalí</button>
          <button className={this.props.activeMenu === 'Rene Magritte' && 'menuActive'}
            onClick={() => this.props.filterData('Rene Magritte')}>Rene Magritte</button>
        </div>
        <ol>
          {this.props.filteredData.map((item, index) => {
            return (
              <li onClick={() => this.props.openMarker(index)}>{item.title}</li>
            )
          })
          }
        </ol>
      </Menu>
    );
  }
}

export default MenuList;