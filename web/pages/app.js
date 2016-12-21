import React from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({open: !this.state.open});
  }

  render() {
    const linkStyle = {
      display: 'block',
      padding: '0 10px',
      textDecoration: 'none'
    };
    const menuStyle = {padding:'0'};
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="My Sales Reports" onLeftIconButtonTouchTap={this.toggleDrawer}/>
          <Drawer
            docked={false}
            width={250}
            open={this.state.open}
            onRequestChange={this.toggleDrawer}
          >
            <MenuItem onTouchTap={this.toggleDrawer} innerDivStyle={menuStyle}>
              <Link to="/" style={linkStyle}>Home</Link>
            </MenuItem>
            <MenuItem onTouchTap={this.toggleDrawer} innerDivStyle={menuStyle}>
              <Link to="/product" style={linkStyle}>Product</Link>
            </MenuItem>
            <MenuItem onTouchTap={this.toggleDrawer} innerDivStyle={menuStyle}>
              <Link to="/customer" style={linkStyle}>Customer</Link>
            </MenuItem>
            <MenuItem onTouchTap={this.toggleDrawer} innerDivStyle={menuStyle}>
              <Link to="/dealer" style={linkStyle}>Dealer</Link>
            </MenuItem>
            <MenuItem onTouchTap={this.toggleDrawer} innerDivStyle={menuStyle}>
              <Link to="/stock" style={linkStyle}>Stock</Link>
            </MenuItem>
          </Drawer>
         {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default App;
