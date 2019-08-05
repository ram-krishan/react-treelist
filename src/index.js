import React from 'react';
import {render} from 'react-dom';
import TreeList from './js/TreeList';

import {DATA} from './sample-data/tree-data-nested';

const COLUMNS = [{
  title: 'ID',
  field: 'id',
  type: 'number',
  enableSort: true,
  width: 100
}, {
  title: 'First Name',
  field: 'firstName',
  type: 'string',
  enableSort: true,
  expand: true,
}, {
  title: 'Last Name',
  field: 'lastName',
  enableSort: true,
  type: 'string'
}, {
  title: 'Employee ID',
  field: 'employeeId',
  enableSort: true,
  type: 'number',
  class: 'red',
  formatter: function(value) {
    if (value) {
      return 'EMPID - ' + value.employeeId;
    }
  }
}, {
  title: 'Joined on',
  field: 'joinedOn',
  type: 'date',
  format: 'dd/mm/yyyy'
}];

const OPTIONS = {
  height: 350,
  minimumColWidth: 100,
  expandAll: true
};

class App extends React.Component {
  render () {
    return (
      <TreeList
        data={DATA}
        columns={COLUMNS}
        options={OPTIONS}
        id={'id'}
        onExpand={(userId, expanded) => {console.log({ userId, expanded })}}
        parentId={'parentId'}></TreeList>

    );
  }
}

render(<App/>, document.getElementById('app'));
