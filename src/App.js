import React from 'react';
import axios from 'axios'
import {Header} from './Header'
import {SearchResults} from './SearchResults'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      background: '#fafafa'
    },
    a: {
      color: 'rgba(0, 0, 0, 0.8)',
      textDecoration: 'none',
      fontWeight: 'bold',
      '&:hover': {
        color: 'rgba(0, 0, 0, 0.7)'
      }
    }
  }
}))

function App () {
  const [response, setResponse] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  useStyles()

  console.log(response)

  /**
   * Input = what is currently in the search field
   * Searched = the text that was last searched
   */
  const [input, setInput] = React.useState('')
  const [searched, setSearched] = React.useState('')

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
    sort: "interestingness-desc",
    /** Large photos only exist after 2012; limit to those to look pretty */
    min_upload_date: "2012-03-05 00:00:00",
    extras: 'description,date_upload,date_taken,owner_name,tags,machine_tags,views,url_o,url_n,url_z,url_h,license,icon_server'
  }

  async function newSearch (e) {
    e && e.preventDefault()
    window.scrollTo(0, 0)

    setLoading(true)
    setSearched(input)

    try {
      const response = await axios.get(apiURI, {
        params: {
          text: input,
          page: 1,
          ...apiParams
        },
        timeout: 4000
      })

      setResponse(response)
    } catch (err) {
      setError(err)
    }

    setLoading(false)
  }

  /** handle page change */
  React.useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)

    console.log('new page: ', page)
    
    async function fetchNewPage () {
      try {
        const response = await axios.get(apiURI, {
          params: {
            text: searched,
            page: page,
            ...apiParams
          },
          timeout: 4000
        })

        setResponse(response)
      } catch (err) {
        setError(err)
      }
    }

    fetchNewPage().then(() => setLoading(false))
  }, [page])

  /** Search something on load */
  React.useEffect(() => {
    setLoading(true)
    setSearched(input)

    async function fetchDefaultSearch () {
      try {
        const response = await axios.get(apiURI, {
          params: {
            text: input,
            page: 1,
            ...apiParams
          },
          timeout: 4000
        })

        setResponse(response)
      } catch (err) {
        setError(err)
      }
    }

    fetchDefaultSearch().then(() => setLoading(false))
  }, [])

  return (
    <div>
      <div id="top" />
      <Header
        input={input}
        setInput={setInput}
        newSearch={newSearch}
      />
      <SearchResults
        response={response}
        setPage={setPage}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default App;
