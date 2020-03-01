import React from 'react';
import axios from 'axios'
import {SearchInput} from './SearchInput'
import {SearchResults} from './SearchResults'
import {makeStyles, CircularProgress} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
  }
}))

function App() {
  const [response, setResponse] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  useStyles()

  /**
   * Input = what is currently in the search field
   * Searched = the text that was last searched
   */
  const [input, setInput] = React.useState('cats')
  const [searched, setSearched] = React.useState(null)

  /**
   * Sort = what is currently in the sort field
   * Sorted = the sort that was last searched
   */
  const [sort, setSort] = React.useState('relevance')
  const [sorted, setSorted] = React.useState(null)

  const [page, setPage] = React.useState(1)

  const apiURI = 'https://api.flickr.com/services/rest/'
  /** Params used in all searches */
  const apiParams = {
    method: 'flickr.photos.search',
    api_key: process.env.REACT_APP_FLICKR_API_KEY,
    safe_search: 1,
    content_type: 1,
    format: 'json',
    nojsoncallback: 1,
    per_page: 51,
    /** Large photos only exist after 2012; limit to those to look pretty */
    min_upload_date: "2012-03-05 00:00:00",
    extras: 'description,date_upload,owner_name,tags,views,url_o,url_n,url_z,url_h,path_alias'
  }

  console.log(response)

  async function newSearch (e) {
    e && e.preventDefault()

    setLoading(true)

    setSearched(input)
    setSorted(sort)

    try {
      const response = await axios.get(apiURI, {
        params: {
          text: input,
          page: 1,
          sort: sort,
          ...apiParams
        }
      })

      setResponse(response)
    } catch (err) {
      setError(err)
    }

    setLoading(false)
  }

  /** handle page change */
  React.useEffect(() => {
    setLoading(true)
    
    async function fetchNewPage () {
      try {
        const response = await axios.get(apiURI, {
          params: {
            text: searched,
            page: page,
            sort: sorted,
            ...apiParams
          }
        })

        setResponse(response)
      } catch (err) {
        setError(err)
      }
    }

    fetchNewPage()
    setLoading(false)
  }, [page])

  /** Search something on load */
  React.useEffect(() => {
    setLoading(true)
    setSearched(input)
    setSorted(sort)

    async function fetchDefaultSearch () {
      try {
        const response = await axios.get(apiURI, {
          params: {
            text: input,
            page: 1,
            sort: sort,
            ...apiParams
          }
        })

        setResponse(response)
      } catch (err) {
        setError(err)
      }
    }

    fetchDefaultSearch()
    setLoading(false)
  }, [])

  return (
    <div>
      <SearchInput
        input={input}
        setInput={setInput}
        sort={sort}
        setSort={setSort}
        newSearch={newSearch}
      />
      <div>
        {loading && !error && (
          <CircularProgress />
        )}
        {error && !loading && (
          <div>
            Sorry, something went wrong.
          </div>
        )}
        <SearchResults
          response={response}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

export default App;
