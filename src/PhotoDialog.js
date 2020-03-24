import React from 'react'
import { 
  Dialog, 
  DialogContent,
  Button,
  IconButton,
  makeStyles
} from '@material-ui/core'
import {Launch, PermIdentity, ChevronRight, ChevronLeft, Close} from '@material-ui/icons'
import classnames from 'classnames'

const useStyles = makeStyles(theme => ({
  dialog: {
    '& .MuiDialog-paper': {
      maxWidth: '100vw !important',
      overflow: 'hidden',
    }
  },
  container: {
    height: '26vw',
    width: '30vw',
    [theme.breakpoints.down('lg')]: {
      height: '36vw',
      width: '40vw'
    },
    [theme.breakpoints.down('md')]: {
      height: '46vw',
      width: '50vw'
    },
    [theme.breakpoints.down('sm')]: {
      height: '56vw',
      width: '60vw'
    },
    [theme.breakpoints.down('xs')]: {
      height: '95vw',
      width: '90vw'
    },
    padding: 0,
    borderRadius: 2,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    '&:first-child': {
      paddingTop: 0
    }
  },
  photo: {
    width: '100%',
    height: 'calc(26vw - 50px)',
    [theme.breakpoints.down('lg')]: {
      height: 'calc(36vw - 50px)'
    },
    [theme.breakpoints.down('md')]: {
      height: 'calc(46vw - 50px)'
    },
    [theme.breakpoints.down('sm')]: {
      height: 'calc(56vw - 50px)'
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(95vw - 50px)'
    },
    objectFit: 'cover',
    objectPosition: '100% 25%'
  },
  photoLoading: {
    opacity: 0.6
  },
  details: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 52,
    fontSize: '0.75em',
    padding: '0em 1em',
    paddingTop: 7,
    boxSizing: 'border-box',
    backgroundColor: 'white'
  },
  ownerLink: {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    textTransform: 'none',
    fontWeight: 'normal',
    paddingRight: '1em',
    '&:focus, &:active': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
  },
  userIcon: {
    height: '0.75em',
    width: '0.75em',
    marginRight: '0.2em',
    verticalAlign: '-5.75%'
  },
  originalLink: {
    display: 'table-cell',
    verticalAlign: 'middle',
    float: 'right',
    fontWeight: 'normal',
    padding: '0.5em 1em',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    textTransform: 'none',
    height: 38,
    '&:focus, &:active': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
  },
  launchIcon: {
    height: '0.6em',
    width: '0.6em',
    marginLeft: '0.2em',
    verticalAlign: '-5.75%'
  },
  chevron: {
    color: 'rgba(255, 255, 255, 0.95)',
    position: 'fixed',
    top: '40%',
    '& .MuiSvgIcon-root': {
      filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.8))',
      height: 80,
      width: 80
    },
    '&:hover, &:focus, &:active': {
      color: 'rgba(255, 255, 255, 0.85)',
      background: 'none'
    },
    '&:focus, &:active': {
      color: 'rgba(255, 255, 255, 0.75)'
    }
  },
  chevronLeft: {
    left: '28%',
    [theme.breakpoints.down('lg')]: {
      left: '20%'
    },
    [theme.breakpoints.down('md')]: {
      left: '15%'
    },
    [theme.breakpoints.down('sm')]: {
      left: '6%'
    },
    [theme.breakpoints.down('xs')]: {
      left: '-4%'
    }
  },
  chevronRight: {
    right: '28%',
    [theme.breakpoints.down('lg')]: {
      right: '20%'
    },
    [theme.breakpoints.down('md')]: {
      right: '15%'
    },
    [theme.breakpoints.down('sm')]: {
      right: '6%'
    },
    [theme.breakpoints.down('xs')]: {
      right: '-4%'
    }
  },
  close: {
    color: 'rgba(255, 255, 255, 0.95)',
    position: 'fixed',
    top: 0,
    right: 0,
    padding: '7px 8px',
    '& .MuiSvgIcon-root': {
      height: 35,
      width: 35
    },
    '&:hover, &:active, &:focus': {
      color: 'rgba(255, 255, 255, 0.75)',
      background: 'none'
    },
    '&:focus, &:active': {
      color: 'rgba(255, 255, 255, 0.65)'
    }
  }
}))

export const PhotoDialog = React.memo(({ photos, openIndex, setOpenIndex, open, setOpen }) => {
  const classes = useStyles()
  const photo = photos[openIndex]
  const [imgLoaded, setImgLoaded] = React.useState(false)

  React.useEffect(() =>{
    function handleKeyboardPress (e) {
      e.stopImmediatePropagation()

      if (e.keyCode === 39) {
        setOpenIndex(prevIndex => {
          if (prevIndex === photos.length - 1) {
            return prevIndex
          }

          return prevIndex + 1
        })
      }

      if (e.keyCode === 37) {
        setOpenIndex(prevIndex => {
          if (prevIndex === 0) return prevIndex
          return prevIndex - 1
        })
      }
    }

    window.addEventListener('keydown', handleKeyboardPress)

    return () => window.removeEventListener('keydown', handleKeyboardPress)
  }, [photos, setOpenIndex])

  React.useEffect(() => {
    setImgLoaded(false)
  }, [openIndex])

  function handleLeftClick () {
    if (openIndex === 0) return
    setOpenIndex(openIndex - 1)
  }

  function handleRightClick () {
    if (openIndex === photos.length - 1) return
    setOpenIndex(openIndex + 1)
  }

  if (!photo) return null

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className={classes.dialog}
    >
      <DialogContent className={classes.container}>
        <img
          src={photo.url_h || photo.url_o || photo.url_z || photo.url_n}
          alt={photo.title}
          title={photo.title}
          className={classnames(
            classes.photo,
            {
              [classes.photoLoading]: !imgLoaded
            }
          )}
          onChange={() => setImgLoaded(false)}
          onLoad={() => setImgLoaded(true)}
        />
        <div className={classes.details}>
          <Button
            disableRipple
            href={`https://www.flickr.com/people/${photo.owner}/`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.ownerLink}
            title="View creator profile"
          >
            <PermIdentity className={classes.userIcon} />
            {photo.ownername}
          </Button>
          <Button
            disableRipple
            href={`https://www.flickr.com/photos/${photo.owner}/${photo.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.originalLink}
          >
            View original
            <Launch className={classes.launchIcon} />
          </Button>
        </div>
        {openIndex > 0 && (
          <IconButton
            disableRipple
            onClick={handleLeftClick}
            className={classnames(classes.chevron, classes.chevronLeft)}
            aria-label="Previous image"
          >
            <ChevronLeft />
          </IconButton>
        )}
        {openIndex < photos.length - 1 && (
          <IconButton
            disableRipple
            onClick={handleRightClick}
            className={classnames(classes.chevron, classes.chevronRight)}
            aria-label="Next image"
          >
            <ChevronRight />
          </IconButton>
        )}
        <IconButton
          onClick={() => setOpen(false)}
          className={classes.close}
          disableRipple
          aria-label="Close"
        >
          <Close />
        </IconButton>
      </DialogContent>
    </Dialog>
  )
})
