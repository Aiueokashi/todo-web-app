import React from "react";
//eslint-disable-next-line
import { Link } from "react-router-dom";
import firebase from "firebase";
import Button from "@material-ui/core/Button";
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
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from "@material-ui/icons/Create";
//eslint-disable-next-line
import HomeIcon from "@material-ui/icons/Home";
//eslint-disable-next-line
import TextField from "@material-ui/core/TextField";
//eslint-disable-next-line
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import MyAppBar from '../components/appbar';
//eslint-disable-next-line
import Accordion from '@material-ui/core/Accordion';
//eslint-disable-next-line
import AccordionSummary from '@material-ui/core/AccordionSummary';
//eslint-disable-next-line
import AccordionDetails from '@material-ui/core/AccordionDetails';
//eslint-disable-next-line
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function createData(name, value, editable) {
  return { name, value, editable };
}

function createRow() {
  const user = firebase.auth().currentUser;
  const rows = [
    createData("ユーザー名", user.displayName, true),
    createData("Eメールアドレス", user.email, false),
    createData(
      "写真",
      <Avatar alt={user.displayName} src={user.photoURL} />,
      true
    ),
    createData(
      "認証済みユーザー",
      user.emailVerified ? <VerifiedUserIcon/> : <ErrorOutlinedIcon/>,
      false
    ),
    createData("ユーザーID", user.uid, false),
  ];
  return rows;
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: (
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleEditName}
        >
          <CreateIcon />
          &nbsp;EDIT
        </Button>
      ),
      editIcon: (
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleEditIcon}
        >
          <CreateIcon />
          &nbsp;EDIT
        </Button>
      ),
      nameVal: null,
      iconVal: null,
    };
  }

  handleVertify = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(function () {
        console.log("done");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  handleEditName = () => {
    this.setState({
      editName: (
        <div>
          <TextField
            size="small"
            id="filled-basic"
            label="TypeName"
            variant="filled"
            onChange={this.handleChangeName}
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={this.handleNameSubmit}
          >
            Submit
          </Button>
        </div>
      ),
    });
  };
  handleEditIcon = () => {
    this.setState({
      editIcon: (
        <div>
          <TextField
            size="small"
            id="filled-basic"
            label="TypeURL"
            variant="filled"
            onChange={this.handleChangeIcon}
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={this.handleIconSubmit}
          >
            Submit
          </Button>
        </div>
      ),
    });
  };
  handleChangeName = (event) => {
    this.setState({ nameVal: event.target.value });
  };
  handleNameSubmit = () => {
    firebase
      .auth()
      .currentUser.updateProfile({ displayName: this.state.nameVal })
      .then(() => {
        this.setState({
          editName: (
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleEditName}
            >
              <CreateIcon />
              &nbsp;EDIT
            </Button>
          ),
        });
      })
      .catch((e) => {});
  };
  handleChangeIcon = (event) => {
    this.setState({ iconVal: event.target.value });
  };
  handleIconSubmit = () => {
    firebase
      .auth()
      .currentUser.updateProfile({ photoURL: this.state.iconVal })
      .then(() => {
        this.setState({
          editIcon: (
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleEditIcon}
            >
              <CreateIcon />
              &nbsp;EDIT
            </Button>
          ),
        });
      })
      .catch((e) => {
        this.setState({
          editIcon: (
            <div>
              <FormControl error>
                <TextField
                  size="small"
                  id="errorURL"
                  label="TypeURL"
                  variant="filled"
                  onChange={this.handleChangeIcon}
                />
                <FormHelperText id="errorURL">
                  Invalid&nbsp;Image&nbsp;URL
                </FormHelperText>
              </FormControl>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={this.handleIconSubmit}
              >
                Submit
              </Button>
            </div>
          ),
        });
      });
  };
  render() {
    const VertifyButton = firebase.auth().currentUser.emailVerified ? null : (
      <Button
        variant="contained"
        color="secondary"
        onClick={this.handleVertify}
      >
        Vertify
      </Button>
    );
    return (
      <div className="container">
        <MyAppBar title="Profile"/>
        <br />
        {VertifyButton}
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer component={Paper}>
          <Table className={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>名前</TableCell>
                <TableCell align="right">値</TableCell>
                <TableCell align="right">変更</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {createRow().map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                  <TableCell align="right">
                    {index === 0
                      ? this.state.editName
                      : index === 2
                      ? this.state.editIcon
                      : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

export default Profile;
