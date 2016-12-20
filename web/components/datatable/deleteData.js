import React from 'react';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import ContentDelete from 'material-ui/svg-icons/content/delete-sweep';

class DeleteData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.props.onConfirmDelete(this.props.deleteId)}
      />,
    ];
    return (
      <div style={{display: 'inline-block'}}>
        <FloatingActionButton mini={true} onClick={this.handleOpen}>
          <ContentDelete />
        </FloatingActionButton>
        <Dialog
          title="Alert"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose} >
          Confirm Delete?
        </Dialog>
      </div>
    );
  }
}

DeleteData.propTypes = {
  deleteId: React.PropTypes.number.isRequired,
  onConfirmDelete: React.PropTypes.func.isRequired
};

export default DeleteData;
