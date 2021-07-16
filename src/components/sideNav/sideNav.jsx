import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';


const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex:0,
  },
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop:'3em',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(0% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const SideNav = ({clickToMain, resetVideos, selectHistoryVideo}) => {
  
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  
  const goToHome = () => {
            clickToMain(null);
            resetVideos();
            history.push('/youtube');
        };
    
  const goToHistory = () => {
            history.push('/history');
            selectHistoryVideo(null);
        }

  const addBackgroundColor = (index)=> {
  const target =  document.getElementById(`listItem${index}`);
  target.style.backgroundColor = 'grey';
  }

  const resetBackgroundColor = (index1, index2) => {

    const target1 =  document.getElementById(`listItem${index1}`);
    const target2 =  document.getElementById(`listItem${index2}`);
    target1.style.backgroundColor = null;
    target2.style.backgroundColor = null;
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List>
          {['Home', 'History', 'My favorite'].map((text, index) => (
            <ListItem id={'listItem'+index} button key={index} 
                onClick={()=>{
                if(index === 0){
                  resetBackgroundColor(1, 2);
                  addBackgroundColor(index);
                  goToHome();
                } 
                else if(index === 1){
                  resetBackgroundColor(0, 2);
                  addBackgroundColor(index);
                  goToHistory();  
                }
                else if(index === 2){
                  resetBackgroundColor(0, 1);
                  addBackgroundColor(index);
                  goToHistory();
                }}}>
               <ListItemIcon> 
                  {index === 0 && <HomeOutlinedIcon /> }
                  {index === 1 && <VideoLibraryOutlinedIcon /> }
                  {index === 2 && <ThumbUpAltOutlinedIcon /> }
               </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default SideNav;