import React from 'react'
import {
  Card,
  CardActionArea,
  CardMedia,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'inline-block',
    marginLeft: 20,
    '&:first-child': {
      marginLeft: 0
    },
    [theme.breakpoints.down(600)]: {
      marginLeft: 2,
      marginBottom: 2
    }
  },
  card: {
    display: 'inline-block',
    padding: 0,
    borderRadius: 0,
    boxShadow: 'none',
    height: 250,
    width: 250,
    backgroundImage: 'linear-gradient(45deg, rgba(0, 0, 0, 0.075), rgba(0, 0, 0, 0.05))',
    [theme.breakpoints.down(820)]: {
      height: 'calc(33vw - 30px)',
      width: 'calc(33vw - 30px)'
    },
    [theme.breakpoints.down(600)]: {
      height: 'calc(33vw - 10px)',
      width: 'calc(33vw - 10px)'
    }
  },
  thumb: {
    height: '100%',
    width: '100%',
    backgroundPosition: '50% 10%',
    borderRadius: 2
  },
  actionArea: {
    height: '100%',
    width: '100%',
    '& $focusHighlight': {
      transition: 'none'
    },
    '&:focus $focusHighlight': {
      opacity: 0.5
    },
    '&:hover $focusHighlight': {
      opacity: 0.2
    }
  },
  focusHighlight: {}
}))

export function Photo ({ photo, index, setDialogOpen, setOpenIndex }) {
  const classes = useStyles()

  function handleClick (e) {
    setOpenIndex(index)
    setDialogOpen(true)
  }

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardActionArea
          onClick={handleClick}
          classes={{
            root: classes.actionArea,
            focusHighlight: classes.focusHighlight
          }}
          title="View details"
        >
          <CardMedia
            className={classes.thumb}
            image={photo.url_z || photo.url_n}
            title={photo.title}
            alt={photo.title}
            data-id={photo.id}
          />
        </CardActionArea>
      </Card>
    </div>
  )
}