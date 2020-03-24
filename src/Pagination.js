import React from 'react'
import ReactJsPagination from 'react-js-pagination'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  '@global': {
    '.pagination': {
      display: 'block',
      textAlign: 'center',
      margin: 'auto',
      marginBottom: 22,
      padding: 0,
      listStyle: 'none',
      '& li': {
        display: 'inline-block',
        '&:first-child a': {
          marginLeft: 0
        }
      },
      '& li a': {
        display: 'inline-block',
        padding: '8px 10px',
        fontSize: '0.9em',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: 4,
        boxSizing: 'border-box',
        backgroundColor: 'white',
        marginLeft: '0.4em',
        height: 36,
        minWidth: 40,
        color: 'rgba(0, 0, 0, 0.5)',
        transition: 'border-color 0.3s linear, color 0.3s linear, background-color 0.3s linear',
        '&:hover, &:active, &:focus': {
          borderColor: '#38cfcf',
          color: 'rgba(0, 0, 0, 0.7)'
        },
        '&:focus, &:active': {
          backgroundColor: 'rgba(56, 207, 207, 0.3)',
          outline: 'none'
        }
      },
      '& .active-link': {
        borderColor: 'rgba(56, 207, 207, 0.7)',
        backgroundColor: 'rgba(56, 207, 207, 0.2)'
      }
    }
  }
}))

export function Pagination ({ paginationInfo, setPage }) {
  useStyles()
  const [pageRange, setPageRange] = React.useState(5)

  React.useEffect(() => {
    function getPageRange (e) {
      if (window.innerWidth <= 600) {
        setPageRange(3)
        return
      }

      setPageRange(5)
    }

    getPageRange()

    window.addEventListener('resize', getPageRange)

    return () => {
      window.removeEventListener('resize', getPageRange)
    }
  }, [])

  return (
    <ReactJsPagination
      {...paginationInfo}
      pageRangeDisplayed={pageRange}
      onChange={(newPage) => setPage(newPage)}
      activeLinkClass="active-link"
    />
  )
}
