import React from 'react'
import {
  InputBase,
  IconButton,
  Fab,
  AppBar,
  Toolbar,
  Fade,
  useScrollTrigger,
  makeStyles
} from '@material-ui/core'
import {Search, ArrowUpward} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  headerContainer: {
    background: '#fff',
    boxShadow: 'none',
    borderBottom: '1px solid #e3e3e3',
    top: 0,
    left: 0,
    width: '100%',
    boxSizing: 'border-box',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      padding: '0.5em 0'
    }
  },
  header: {
    width: '50%',
    [theme.breakpoints.down('lg')]: {
      width: '60%'
    },
    [theme.breakpoints.down('md')]: {
      width: '65%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%'
    },
    margin: 'auto',
    height: '100%',
    padding: '0 1em',
    boxSizing: 'border-box'
  },
  title: {
    fontFamily: 'Pacifico',
    color: 'rgba(70, 70, 70, 0.87)',
    textShadow: '3px 3px 0 rgba(52, 237, 237, 0.7)',
    fontSize: '1.8em',
    display: 'inline-block',
    margin: 0,
    marginTop: -8,
    width: '25%'
  },
  form: {
    display: 'inline-block',
    margin: 'auto',
    marginRight: 0
  },
  textField: {
    padding: '8px 16px',
    fontSize: '0.9em',
    border: '2px solid rgba(0, 0, 0, 0.1)',
    borderRadius: 15,
    width: 250,
    [theme.breakpoints.down('sm')]: {
      width: 200
    },
    [theme.breakpoints.down('xs')]: {
      width: 150
    },
    transition: 'border-color 0.25s linear, box-shadow 0.25s linear',
    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.23)'
    },
    '&:focus, &:active': {
      borderColor: '#35dede', //'#45ffc8',
      boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)'
    }
  },
  searchButton: {
    backgroundColor: '#38cfcf',
    padding: 6,
    color: 'white',
    marginBottom: 4,
    marginLeft: '0.3em',
    transition: 'box-shadow 0.3s linear',
    '& .MuiSvgIcon-root': {
      height: 24,
      width: 24
    },
    '&:hover, &:focus, &:active': {
      backgroundColor: '#38cfcf',
      boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)'
    }
  },
  scrollToTop: {
    position: 'fixed',
    bottom: '2.25em',
    right: '2em',
    backgroundColor: '#38cfcf',
    boxShadow: 'none',
    border: '2px solid white',
    color: 'white',
    transition: 'background-color 0.3s linear',
    '&:hover, &:focus, &:active': {
      backgroundColor: '#30c2c2',
      boxShadow: 'none'
    }
  }
}))

export function Header ({ input, setInput, newSearch }) {
  const classes = useStyles()
  const scrollTopTrigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100
  })

  function handleScrollToTop (e) {
    const anchor = (e.target.ownerDocument || document).querySelector('#top')

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  return (
    <AppBar className={classes.headerContainer} position="fixed">
      <Toolbar className={classes.header}>
        <h3 className={classes.title}>
          Searchr
        </h3>
        <form onSubmit={newSearch} className={classes.form}>
          <InputBase
            value={input}
            onChange={(e) => setInput(e.target.value)}
            classes={{
              input: classes.textField
            }}
            placeholder="Search"
          />
          <IconButton
            type="submit"
            className={classes.searchButton}
            aria-label="Search"
          >
            <Search />
          </IconButton>
        </form>
        <Fade
          in={scrollTopTrigger}
          className={classes.scrollToTop}
        >
          <Fab
            onClick={handleScrollToTop}
            size="small"
            aria-label="Scroll to top"
          >
            <ArrowUpward />
          </Fab>
        </Fade>
      </Toolbar>
    </AppBar>
  )
}
