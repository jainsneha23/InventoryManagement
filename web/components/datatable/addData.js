import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class AddData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      columns: [...props.columns]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(i, evt, value) {
    const columns = [...this.state.columns];
    columns[i].value = value || evt.target.value;
    this.setState({columns});
  }

  getFormItem(column, i) {
    let formItem;
    switch(column.type) {
    case 'select':
      formItem = <SelectField
        floatingLabelText={column.header}
        value={column.value}
        onChange={(event, index, value) => this.handleChange(i, event, value)} >
        {column.options.map((option, i) => <MenuItem key={i} value={option.value} primaryText={option.text} /> )}
      </SelectField>;
      break;
    case 'textarea':
      formItem = <TextField
        hintText={column.hint}
        floatingLabelText={column.header}
        multiLine={true}
        rows={2}
        onChange={(evt) => this.handleChange(i, evt)}
        value={column.value} />;
      break;
    case 'string':
    default:
      formItem = <TextField
        hintText={column.hint}
        floatingLabelText={column.header}
        onChange={(evt) => this.handleChange(i, evt)}
        value={column.value} />;
      break;
    }
    return formItem;
  }

  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.props.onClose()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.props.onClose(this.state.columns)}
      />,
    ];
    return (
      <div>
        <Dialog
          title="Add Item"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true} >
          <form>
            {this.state.columns.map((column, i) => (
              <div key={i}>
                {column.editable !== false ? this.getFormItem(column, i) : null}
              </div>
            ))}
          </form>
        </Dialog>
      </div>
    );
  }
}

AddData.propTypes = {
  open: React.PropTypes.bool.isRequired,
  columns: React.PropTypes.array.isRequired,
  onClose: React.PropTypes.func.isRequired
};

export default AddData;
