import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  loader: {
    display: 'inline-block',
    marginLeft: 20,
    '&:first-child': {
      marginLeft: 0
    },
    height: 250,
    width: 250,
    backgroundImage: 'linear-gradient(45deg, rgba(0, 0, 0, 0.075), rgba(0, 0, 0, 0.05))',
    [theme.breakpoints.down(820)]: {
      height: 'calc(33vw - 30px)',
      width: 'calc(33vw - 30px)'
    },
    [theme.breakpoints.down(600)]: {
      height: 'calc(33vw - 10px)',
      width: 'calc(33vw - 10px)',
      marginLeft: 2,
      marginBottom: 2
    }
  }
}))

export function Loader () {
  const classes = useStyles()

  return (
    <div
      className={classes.loader}
    />
  )
}
