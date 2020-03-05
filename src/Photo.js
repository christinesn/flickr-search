import React from 'react'
import {
  IconButton,
  Dialog,
  DialogContent,
  Card,
  CardActionArea,
  CardMedia,
  makeStyles,
  CircularProgress
} from '@material-ui/core'
import classNames from 'classnames'
import CloseIcon from '@material-ui/icons/Close'
import PersonIcon from '@material-ui/icons/Person'
import {format} from 'date-fns'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'inline-block',
    height: 250,
    width: '30%',
    marginLeft: 7,
    marginBottom: 5,
    borderRadius: 0,
    border: '5px solid #efefef',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    boxShadow: theme.shadows[2]
  },
  thumb: {
    height: 250,
    backgroundPosition: '50% 10%'
  },
  actionArea: {
    '&:hover $focusHighlight': {
      opacity: 0.25
    },
    '&:focus, &:active': {
      outline: '5px solid blue'
    }
  },
  focusHighlight: {
    outline: '5px blue'
  },
  dialog: {
    '& .MuiDialog-paper': {
      padding: 0,
      maxWidth: '45vw',
      maxHeight: '90vh',
      borderRadius: 2
    }
  },
  dialogContent: {
    overflow: 'hidden',
    background: 'white',
    padding: '0 !important'
  },
  largeImage: {
    maxHeight: '75vh',
    maxWidth: '45vw',
    borderRadius: 2,
    paddingTop: 2
  },
  imagePreLoad: {
    display: 'none'
  },
  placeholder: {
    height: '80vh',
    width: '45vw',
    background: 'white'
  },
  spinner: {
    position: 'absolute',
    marginLeft: 'calc(50% - 20px)',
    marginTop: 'calc(40% - 20px)'
  },
  error: {
    position: 'absolute',
    width: 200,
    marginLeft: 'calc(50% - 100px)',
    marginTop: 'calc(40% - 20px)',
    color: 'white'
  },
  details: {
    fontSize: '0.8em',
    boxSizing: 'border-box',
    color: 'rgba(0, 0, 0, 0.85)',
    width: '100%',
    textAlign: 'left',
    height: '15vh',
    borderTop: '1px solid rgba(0, 0, 0, 0.3)',
    padding: 10,
    '& a': {
      color: 'rgba(0, 0, 0, 0.8)',
      fontWeight: 'bold',
      textDecoration: 'none',
      '&:hover, &:focus, &:active': {
        color: 'rgba(0, 0, 0, 0.5)'
      }
    }
  },
  personIcon: {
    fontSize: '1.2em',
    position: 'absolute'
  },
  username: {
    marginLeft: '1.5em'
  },
  date: {
    marginLeft: '0.5em'
  },
  originalLink: {
    float: 'right'
  },
  closeButton: {
    position: 'fixed',
    top: 5,
    right: 5,
    padding: 7,
    background: 'none',
    color: 'rgba(0, 0, 0, 0.5)',
    '&:hover, &:focus, &:active': {
      color: 'rgba(0, 0, 0, 0.8)',
      background: 'none'
    },
    '& .MuiSvgIcon-root': {
      width: '1.25em',
      height: '1.25em'
    }
  },
  '@global': {
    '.MuiBackdrop-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      cursor: 'pointer'
    }
  }
}))

export function Photo ({ photo }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [largeLoaded, setLargeLoaded] = React.useState(false)
  const [largeError, setLargeError] = React.useState(false)

  open && console.log(photo)

  return (
    <Card className={classes.container}>
      <CardActionArea
        onClick={() => setOpen(true)}
        classes={{
          root: classes.actionArea,
          focusHighlight: classes.focusHighlight
        }}
      >
        <CardMedia
          className={classes.thumb}
          image={photo.url_z || photo.url_n}
          title={photo.title}
          data-id={photo.id}
        />
      </CardActionArea>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className={classes.dialog}
      >
        <DialogContent
          className={classes.dialogContent}
        >
          {open && !largeLoaded && (
            <div
              className={classes.placeholder}
            >
              {!largeError && (
                <CircularProgress
                  className={classes.spinner}
                />
              )}
              {largeError && (
                <div className={classes.error}>
                  Sorry, something went wrong.
                </div>
              )}
            </div>
          )}
          <img
            src={photo.url_h || photo.url_o || photo.url_z || photo.url_n}
            alt={photo.title}
            onLoad={() => setLargeLoaded(true)}
            onError={() => setLargeError(true)}
            className={classNames({
              [classes.largeImage]: true,
              [classes.largePreLoad]: !largeLoaded
            })}
          />
          <div
            className={classes.details}
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.flickr.com/people/${photo.owner}`}
              title="Photo owner"
            >
              <PersonIcon className={classes.personIcon} />
              <span className={classes.username}>
                {photo.ownername}
              </span>
            </a>
            <span className={classes.date} title="Date uploaded">
              {format(new Date(photo.dateupload * 1000), 'LL/dd/yyyy')}
            </span>
            <a
              href={`https://www.flickr.com/photos/${photo.owner}/${photo.id}`}
              className={classes.originalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View original
            </a>
          </div>
          <IconButton
            className={classes.closeButton}
            aria-label="Close"
            title="Close"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
    </Card>
  )
}