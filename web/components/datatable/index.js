import React from 'react';

import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentCreate from 'material-ui/svg-icons/content/create';
import EditDialog from './edit-dialog';
import ConfirmDialog from './confirm-dialog';
import Datatable from './datatable';

class DatatableCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openEditDialog: false,
      selectedRow: -1,
      isEditMode: false,
      columns: [...this.props.columns]
    };
    this.toggleEditClick = this.toggleEditClick.bind(this);
    this.onRowSelection = this.onRowSelection.bind(this);
    this.onRowDelete = this.onRowDelete.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
  }

  onRowSelection(idx) {
    this.setState({
      selectedRow: idx.length? idx[0] : -1
    });
  }

  doneEditing(rowvalue) {
    if(!rowvalue) {
      const columns = this.state.columns.map((column) => {delete column.value;return column;});
      this.setState({columns, openEditDialog: false});
    }
    this.props.editItem(rowvalue, this.state.isEditMode)
    .then(() => {
      const columns = this.state.columns.map((column) => {delete column.value;return column;});
      this.setState({columns, openEditDialog: false});
    });
  }

  toggleEditClick(opts) {
    if (opts && opts.edit) {
      const columns = this.state.columns.map((column) => {
        column.value = this.props.data[this.state.selectedRow][column.key];
        return column;
      });
      this.setState({columns, isEditMode: true});
    }
    this.setState({openEditDialog: true});
  }

  onRowDelete() {
    this.props.deleteItem(this.state.selectedRow);
    this.setState({selectedRow: -1});
  }

  render () {
    return (
      <div>
        <EditDialog
          open={this.state.openEditDialog}
          columns={this.state.columns}
          onClose={this.doneEditing} />
        <AppBar
          style={{backgroundColor: '#fff'}}
          titleStyle={{color: '#00bcd4'}}
          title={this.props.header}
          iconElementLeft={
              <FloatingActionButton mini={true} onClick={() => this.toggleEditClick()}>
                <ContentAdd />
              </FloatingActionButton>}
          iconElementRight={
            this.state.selectedRow !== -1 ?
                <div>
                  <ConfirmDialog onConfirmDelete={this.onRowDelete}/>
                  <FloatingActionButton mini={true} onClick={() => this.toggleEditClick({edit: true})} style={{marginLeft: '12px'}}>
                    <ContentCreate />
                  </FloatingActionButton>
                </div> : null }
        />
        <Datatable {...this.props} onRowSelection={this.onRowSelection} selectedRow={this.state.selectedRow} />
      </div>
    );
  }
}

DatatableCard.propTypes = {
  header: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  editItem: React.PropTypes.func.isRequired,
  deleteItem: React.PropTypes.func.isRequired
};

export default DatatableCard;
