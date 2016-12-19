import React from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Datatable extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              {this.props.columns.map((column, i) =>
                <TableHeaderColumn key={i}>{column.header}</TableHeaderColumn>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
          {this.props.data.map((row, i) =>
            <TableRow key={i}>
            {this.props.columns.map((column, j) =>
              <TableRowColumn key={j}>{row[column.key]}</TableRowColumn>
            )}
            </TableRow>
          )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Datatable.propTypes = {
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired
};

export default Datatable;
