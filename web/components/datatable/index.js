import React from 'react';

import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentCreate from 'material-ui/svg-icons/content/create';
import AddData from './addData';
import DeleteData from './deleteData';
import Datatable from './datatable';

class DatatableCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddMode: false,
      selectedRow: -1
    };
    this.toggleAddClick = this.toggleAddClick.bind(this);
    this.onRowSelection = this.onRowSelection.bind(this);
    this.onRowDelete = this.onRowDelete.bind(this);
  }

  onRowSelection(idx) {
    this.setState({
      selectedRow: idx.length? idx[0] : -1
    });
  }

  toggleAddClick(rowvalue) {
    this.setState({isAddMode: !this.state.isAddMode});
    if (rowvalue) this.props.addItem(rowvalue);
  }

  toggleEditClick() {

  }

  onRowDelete(id) {
    this.setState({selectedRow: -1});
    this.props.deleteItem(id);
  }

  render () {
    return (
      <div>
        <AddData
          open={this.state.isAddMode}
          columns={this.props.columns}
          onClose={this.toggleAddClick} />
        <AppBar
          style={{color: '#00bcd4', backgroundColor: '#fff'}}
          title={this.props.header}
          iconElementLeft={
              <FloatingActionButton mini={true} onClick={() => this.toggleAddClick()}>
                <ContentAdd />
              </FloatingActionButton>}
          iconElementRight={
            this.state.selectedRow !== -1 ?
                <div>
                  <DeleteData deleteId={this.state.selectedRow} onConfirmDelete={this.onRowDelete}/>
                  <FloatingActionButton mini={true} onClick={() => this.toggleEditClick()} style={{marginLeft: '12px'}}>
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
  addItem: React.PropTypes.func.isRequired,
  deleteItem: React.PropTypes.func.isRequired
};

export default DatatableCard;
