import React from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Datatable extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
        <Table selectable onRowSelection={this.props.onRowSelection}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              {this.props.columns.map((column, i) =>
                <TableHeaderColumn key={i}>{column.header}</TableHeaderColumn>
              )}
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
          {this.props.data.map((row, i) =>
            <TableRow key={i} selected={i === this.props.selectedRow}>
            {this.props.columns.map((column, j) =>
              <TableRowColumn key={j}>{row[column.key]}</TableRowColumn>
            )}
            </TableRow>
          )}
          </TableBody>
        </Table>
    );
  }
}

Datatable.propTypes = {
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  onRowSelection: React.PropTypes.func.isRequired,
  selectedRow: React.PropTypes.number.isRequired
};

export default Datatable;
