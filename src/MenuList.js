import React, { Component } from 'react'
import { elastic as Menu } from 'react-burger-menu'

class MenuList extends Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
        <a onClick={() => this.props.filterData('All')}>All</a>
        <a onClick={() => this.props.filterData('Salvador Dali')}>Dali</a>
        <a onClick={() => this.props.filterData('Test')}>Rene</a>
      </Menu>
    );
  }
}

export default MenuList;