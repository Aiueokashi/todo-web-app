import React from "react";
//eslint-disable-next-line
import clsx from "clsx";
import firebase from "../Firebase";
import "./Home.css";
//eslint-disable-next-line
import PropTypes from "prop-types";
//eslint-disable-next-line
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
//eslint-disable-next-line
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
//eslint-disable-next-line
import { makeStyles } from "@material-ui/core/styles";
//eslint-disable-next-line
import Toolbar from "@material-ui/core/Toolbar";
//eslint-disable-next-line
import Typography from "@material-ui/core/Typography";
//eslint-disable-next-line
import IconButton from "@material-ui/core/IconButton";
//eslint-disable-next-line
import MenuIcon from "@material-ui/icons/Menu";
//eslint-disable-next-line
import AppBar from "@material-ui/core/AppBar";
//eslint-disable-next-line
import CheckIcon from "@material-ui/icons/Check";
//eslint-disable-next-line
import SaveIcon from "@material-ui/icons/Save";
//eslint-disable-next-line
import CircularProgress from "@material-ui/core/CircularProgress";
//eslint-disable-next-line
import { green } from "@material-ui/core/colors";
//eslint-disable-next-line
import Fab from "@material-ui/core/Fab";
//eslint-disable-next-line
import CardCreate from '../components/card';
import TextField from "@material-ui/core/TextField";
import MyAppBar from '../components/appbar';
import SendB from '../components/send';
import MsgList from '../components/msglist';

const Ref = firebase.database().ref()
//eslint-disable-next-line
function createMsg(msg){
    return {name:msg.username, body:msg.email}
    }

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _isget: false,
      isFetched: false,
      text:"none",
      db:{},
      MsgField:<Button style={{ position:"fixed", margin: 8 }} variant="contained" onClick={this.handleGet} >Get</Button>
    };
  }
  

  handleLogout = () => {
    firebase.auth().signOut();
  };

  handleResetPass = () => {
    this.setState({
      resetButtonDisabled: true,
    });
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(function () {})
      .catch(function (error) {});
  };
  handleGet = () => {
    Ref.get().then((snap)=>{
      this.setState({db:snap.val(),MsgField:<div><Button style={{ position:"relative", margin: 8 }} variant="contained" onClick={this.handleGet} >Get</Button><MsgList item={snap.val()}/></div>})
    })
  }
  handleChangeMsg = (event) => {
    this.setState({ text: event.target.value });
  }
  render() {
    //eslint-disable-next-line
    const ResetButton = (
      <Button
        className="RightButton"
        variant="contained"
        color="secondary"
        onClick={this.handleResetPass}
        disabled={this.state.resetButtonDisabled}
      >
        ResetPass
      </Button>
    );
    
    
    return (
      <div className="container">
      <MyAppBar title="Home" />
        <TextField 
            style={{ width:"80%" }}
            id="filled-basic"
            label="送信するメッセージを入力してください"
            variant="filled"
            onChange={this.handleChangeMsg}
            margin="normal"
            />
            <SendB onClick={this.clicked} content={this.state.text} />
          <br/>
          <br/>
        {this.state.MsgField}
      </div>
    );
  }
}



export default Home;
