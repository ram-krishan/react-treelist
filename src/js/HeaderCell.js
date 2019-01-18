import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/header-cell.css';

const RESIZE_INDICATOR_WIDTH = 10;

class HeaderCell extends Component {
  constructor(props) {
    super(props);

    this.headerRef = React.createRef();
    this.resizeIndicatorRef = React.createRef();

    this.displayName = 'HeaderCell';
    this.handleClick = this.handleClick.bind(this);
    this.onResizeMouseEnter = this.onResizeMouseEnter.bind(this);
    this.onColumnOptionsClick = this.onColumnOptionsClick.bind(this);
  }

  handleClick() {
    if(this.props.column.enableSort) {
      console.log('this.props.column.field', this.props.column.field)
      this.props.onSort(this.props.column.field);
    }
  }

  onResizeMouseEnter() {
    const boundingRect = this.resizeIndicatorRef.current.getBoundingClientRect();
    const currentWidth = this.headerRef.current.clientWidth;
    this.props.onResizeEnter(this.props.column, boundingRect, currentWidth);
  }

  onColumnOptionsClick(event) {
    const iconRect = event.target.getBoundingClientRect();
    this.props.onColumnOptionsClick(iconRect.left, this.props.column);
    event.stopPropagation();
  }

  componentDidMount() {
    const rect = this.headerRef.current.getBoundingClientRect();
    this.props.whenWidthAvailable(this.props.column.field, rect.width);
  }

  render() {
    const { sort } = this.props;
    let sortIndicator = null;

    if (this.props.column.enableSort){
      sortIndicator = <span className='default-sort-indicator'></span>;
    }

    if (sort === 'asc') {
      sortIndicator = <span className='i-sort i-sort-asc'></span>;
    } else if (sort === 'desc') {
      sortIndicator = <span className='i-sort i-sort-desc'></span>;
    }

    return (
      <th
        ref={this.headerRef}
        className='tgrid-column-header'
        onClick={this.handleClick}>
        <span className='tgrid-column-header-text-wrapper'>
          <span className='tgrid-column-header-text'>
            {this.props.column.title}
          </span>
          {sortIndicator}
        </span>
        <div className='resize-indicator'
          ref={this.resizeIndicatorRef}
          style={{width: RESIZE_INDICATOR_WIDTH}}
          onMouseEnter={this.onResizeMouseEnter}>
        </div>
      </th>
    );
  }
}

HeaderCell.propTypes = {
  column: PropTypes.instanceOf(Object).isRequired,
  onSort: PropTypes.func.isRequired,
  sort: PropTypes.string,
  onResizeEnter: PropTypes.func.isRequired,
  onColumnOptionsClick: PropTypes.func.isRequired,
  whenWidthAvailable:  PropTypes.func.isRequired
};

export default HeaderCell;
