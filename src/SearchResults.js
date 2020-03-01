import React from 'react'
import Pagination from 'react-js-pagination'
import {Photo} from './Photo'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  photos: {
    textAlign: 'center',
    width: '100%'
  }
}))

export function SearchResults ({ response, setPage }) {
  const classes = useStyles()

  function getPhotos () {
    if (!response || !response.data || !response.data.photos) return []
    return response.data.photos.photo
  }

  function getPaginationInfo () {
    if (!response || !response.data || !response.data.photos) return null
    
    return {
      activePage: response.data.photos.page,
      itemsCountPerPage: response.data.photos.perpage,
      totalItemsCount: response.data.photos.total
    }
  }

  const paginationInfo = getPaginationInfo()

  return (
    <div>
      <div>
        {paginationInfo && (
          <Pagination
            {...paginationInfo}
            pageRangeDisplayed={5}
            onChange={(newPage) => setPage(newPage)}
          />
        )}
      </div>
      <div className={classes.photos}>
        {getPhotos().map(photo => (
          <Photo
            photo={photo}
            key={photo.id}
          />
        ))}
      </div>
      <div>
        {paginationInfo && (
          <Pagination
            {...paginationInfo}
            pageRangeDisplayed={5}
            onChange={(newPage) => setPage(newPage)}
          />
        )}
      </div>
    </div>
  )
}
