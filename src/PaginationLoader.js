import React from 'react'
import {makeStyles} from '@material-ui/core'
import classnames from 'classnames'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    padding: 0
  },
  box: {
    display: 'inline-block',
    height: 36,
    width: 36,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    border: '1px solid rgba(0, 0, 0, 0.04)',
    borderRadius: 4,
    marginLeft: '0.4em',
    boxSizing: 'border-box',
    '&:first-child': {
      marginLeft: 0
    }
  },
  firstLast: {
    width: 42
  },
  prevNext: {
    width: 40
  },
  toggle: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}))

export function PaginationLoader () {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classnames(classes.box, classes.firstLast)} />
      <div className={classnames(classes.box, classes.prevNext)} />
      <div className={classes.box} />
      <div className={classes.box} />
      <div className={classes.box} />
      <div className={classnames(classes.box, classes.toggle)} />
      <div className={classnames(classes.box, classes.toggle)} />
      <div className={classnames(classes.box, classes.prevNext)} />
      <div className={classnames(classes.box, classes.firstLast)} />
    </div>
  )
}