import React from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  Card,
  CardActionArea,
  CardMedia,
  makeStyles,
  CircularProgress
} from '@material-ui/core'
import classNames from 'classnames'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'inline-block',
    height: 250,
    width: '30%',
    marginLeft: 7,
    marginBottom: 5,
    borderRadius: 0,
    boxShadow: 'none',
    border: '5px solid lightyellow',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
      maxWidth: '95vw',
      maxHeight: '90vh',
      borderRadius: 0
    }
  },
  dialogContent: {
    padding: '0 !important',
    overflow: 'hidden',
    background: 'black'
  },
  largeImage: {
    maxHeight: '90vh',
    maxWidth: '95vw'
  },
  imagePreLoad: {
    display: 'none'
  },
  placeholder: {
    height: '90vh',
    width: '60vw',
    background: 'black'
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    boxSizing: 'border-box',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    color: 'white',
    width: '100%',
    textAlign: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  '@global': {
    '.MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.9)'
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
            <a href="">{photo.ownername}</a>
            uploaded {photo.dateuploaded}
            <a href="">View on Flickr</a>
          </div>
          <Button
            className={classes.closeButton}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  )
}