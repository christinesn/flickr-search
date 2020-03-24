import React from 'react'
import {Pagination} from './Pagination'
import {Photo} from './Photo'
import {Loader} from './Loader'
import {PaginationLoader} from './PaginationLoader'
import {makeStyles} from '@material-ui/core'
import {PhotoDialog} from './PhotoDialog'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    marginTop: 80,
    marginBottom: 100,
    [theme.breakpoints.down('xs')]: {
      marginTop: 90
    }
  },
  row: {
    marginBottom: 20,
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.down(600)]: {
      marginBottom: -3,
      '&:last-child': {
        marginBottom: 20
      }
    },
  },
  error: {
    margin: 'auto',
    marginBottom: 30,
    padding: '1em 2em',
    backgroundColor: '#ffe0e7',
    border: '1px solid #f5c2cd',
    borderRadius: 4,
    width: '40%',
    fontSize: '0.95em',
    [theme.breakpoints.down('lg')]: {
      width: '50%'
    },
    [theme.breakpoints.down('md')]: {
      width: '60%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '75%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '95%'
    }
  },
  noResults: {
    width: '40%',
    margin: 'auto',
    backgroundColor: 'white',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    padding: '2em',
    boxSizing: 'border-box',
    [theme.breakpoints.down('lg')]: {
      width: '50%'
    },
    [theme.breakpoints.down('md')]: {
      width: '60%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '75%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '95%'
    }
  }
}))

export const SearchResults = React.memo(({ response, setPage, loading, error }) => {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [dialogIndex, setDialogIndex] = React.useState(null)

  function getPhotos () {
    if (!response || !response.data || !response.data.photos) return []
    return response.data.photos.photo
  }

  const photos = getPhotos()

  function getPaginationInfo () {
    if (!response || !response.data || !response.data.photos) return null
    if (photos.length === 0) return null
    
    return {
      activePage: response.data.photos.page,
      itemsCountPerPage: response.data.photos.perpage,
      totalItemsCount: response.data.photos.total
    }
  }

  const paginationInfo = getPaginationInfo()

  return (
    <div className={classes.container}>
      <div>
        {loading && <PaginationLoader />}
        {!loading && paginationInfo && (
          <Pagination
            paginationInfo={paginationInfo}
            setPage={setPage}
          />
        )}
      </div>
      <div>
        {!loading && !error && photos.length === 0 && (
          <div className={classes.noResults}>
            Sorry, there were no results for that search.
          </div>
        )}
        {!loading && !error && photos.map((photo, index) => {
          if (index === 0 || index % 3 === 0 || index === 48) {
            return (
              <div className={classes.row} key={photo.id}>
                <Photo
                  photo={photo}
                  index={index}
                  setOpenIndex={setDialogIndex}
                  setDialogOpen={setDialogOpen}
                />
                {photos[index + 1] && (
                  <Photo
                    photo={photos[index + 1]}
                    index={index + 1}
                    setOpenIndex={setDialogIndex}
                    setDialogOpen={setDialogOpen}
                  />
                )}
                {photos[index + 2] && (
                  <Photo
                    photo={photos[index + 2]}
                    index={index + 2}
                    setOpenIndex={setDialogIndex}
                    setDialogOpen={setDialogOpen}
                  />
                )}
              </div>
            )
          } else {
            return ''
          }
        })}
        {error && (
          <div className={classes.error}>
            Sorry, something went wrong.
          </div>
        )}
        {(loading || error) && new Array(50).fill(null).map((_item, index) => {
          if (index === 0 || index % 3 === 0) {
            return (
              <div className={classes.row} key={index}>
                <Loader />
                <Loader />
                <Loader />
              </div>
            )
          }
        })}
      </div>
      <div>
        {loading && <PaginationLoader />}
        {!loading && paginationInfo && (
          <Pagination
            paginationInfo={paginationInfo}
            setPage={setPage}
          />
        )}
      </div>
      <PhotoDialog
        photos={photos}
        open={dialogOpen}
        setOpen={setDialogOpen}
        openIndex={dialogIndex}
        setOpenIndex={setDialogIndex}
      />
    </div>
  )
});
