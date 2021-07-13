import React, { memo, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';



// const Nav_bar = memo(({onSearch, clickToMain, authService}) => {
//     const history = useHistory();
//     const inputRef = useRef();

//     const handleSearch = () => {
//        const value = inputRef.current.value;
//        clickToMain(null);
//        onSearch(value);
//     };

//     const onClick = () => {
//       handleSearch();
//     };

//     const onKeyPress = (event) => {
//         if(event.key === 'Enter'){
//             handleSearch();
//         }
//     };

//     const goBackToMain = () =>{
//         clickToMain(null);
//         history.push('/youtube');
//     }

//     const logout = () => {
//         authService.logout();
//     };

//     //Alway re-render whenever any component is changed and it goes back to signin page.
//     useEffect(() => {
//         authService.onAuthChange(user => {
//             if(!user) {
//                history.push('/YouTube_Project');
//             }
//         });
//     })

//     return (
//         <header className={styles.header}>
//             <div className={styles.logo} onClick={goBackToMain} >
//             <img className={styles.img}  src={logo} alt="logo" />
//             <h1 className={styles.title}>YouTube</h1>
//             </div>
//             <input ref={inputRef} className={styles.input} type="search" placeholder ="Search" onKeyPress={onKeyPress} />
//             <button className={styles.button} onClick={onClick}>
//                 <img className={styles.buttonImage} src={search} alt="search" />
//             </button>
//             <button className={styles.logout} onClick={() => {logout()}}>Logout</button>
//         </header>
//     )
// });

const useStyles = makeStyles((theme) => ({
    grow: {
      position: 'fixed',
      flexGrow: 1,
      zIndex: 2,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      cursor:'pointer',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `4px`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    clickBtn: {
      cursor:'pointer',
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));
  
  const Nav_bar = ({onSearch, clickToMain, authService, sideNav, clickSideNav}) => {

        const history = useHistory();
        const inputRef = useRef();
    
        const handleSearch = () => {
           const value = inputRef.current.value;
           console.log(value);
           clickToMain(null);
           onSearch(value);
        };
    
        const onClick = () => {
          handleSearch();
        };
    
        const onKeyPress = (event) => {
            if(event.key === 'Enter'){
                handleSearch();
            }
        };
    
        const goBackToMain = () =>{
            clickToMain(null);
            history.push('/youtube');
        }

        const setSideNav = () =>{
          sideNav === false ? clickSideNav(true) : clickSideNav(false); 
        }
    
        const logout = () => {
            authService.logout();
        };
    
        //Alway re-render whenever any component is changed and it goes back to signin page.
        useEffect(() => {
            authService.onAuthChange(user => {
                if(!user) {
                   history.push('/YouTube_Project');
                }
            });
        })

    const classes = useStyles();
  
    return (
      <div className={classes.grow}>
        <AppBar >
          <Toolbar>
            <IconButton
              onClick = {() => setSideNav()}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} onClick={goBackToMain} variant="h6" noWrap>
              YouTube
            </Typography>
            <div className={classes.search}>
              <input
                ref={inputRef} //not working...
                onKeyPress={onKeyPress}
                placeholder="Search…"
                classes={classes.inputInput}
              />
            </div>
            <SearchOutlinedIcon className={classes.clickBtn} onClick={onClick} />
            <Button onClick={() => {logout()}} variant="contained" color="primary" disableElevation>Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

export default Nav_bar;