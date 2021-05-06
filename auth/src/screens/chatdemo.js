import React from 'react'
import firebase from '../Firebase';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {TextInput} from '../components/inputbox';
import {MessageLeft,MessageRight} from '../components/messagebox';
import MyAppBar from '../components/appbar';

const Ref = firebase.database().ref()

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        paper: {
            width: '80vw',
            height: '80vh',
            maxWidth: '500px',
            maxHeight: '700px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'relative'
        },
        paper2: {
            width: '80vw',
            maxWidth: '500px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'relative'
        },
        container: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        messagesBody: {
            width: 'calc( 100% - 20px )', 
            margin: 10,
            overflowY: 'scroll', 
            height: 'calc( 100% - 80px )'
        },
    })
);

export default function Demo() {
  const classes = useStyles();
  const [fetched, setFetched] = React.useState(false);
  const [value, setValue] = React.useState(<div>取得中</div>);
  React.useEffect(() => {
  Ref.get().then(snap=> {
    let data=[];
    for (const s in snap.val()){
      data.push(snap.val()[s])
    }
    setValue(data)
    setFetched(true)
  })
  })
  return (
    <div className={classes.container}>
    <Paper className={classes.paper} zDepth={2} >
        <Paper id="style-1" className={classes.messagesBody}>
         {fetched 
         ? value.map((d) => {
         {return d.userId === firebase.auth().currentUser.uid ?  <MessageRight message={d.message.content} displayName={d.username}/> : <MessageLeft message={d.message.content} photoURL={d.photoURL} displayName={d.username} avatarDisp={true} />}
         }
         ) 
         : null}
         </Paper>
        <TextInput />
    </Paper>
</div>
  );
}