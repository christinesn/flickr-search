import React from 'react'
import {
  InputBase,
  TextField,
  Button,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  appbar: {
    background: '#fff',
    boxShadow: 'none',
    borderBottom: '1px solid #e3e3e3'
  },
  title: {
    fontFamily: 'Raleway',
    color: 'rgba(70, 70, 70, 0.87)',
    textShadow: '3px 3px 0 #45ffc8',
    fontSize: '1.8em'
  },
  input: {

  }
}))

export function SearchInput ({ input, setInput, sort, setSort, newSearch }) {
  const classes = useStyles()

  return (
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar>
        <h3 className={classes.title}>
          simple flickr search.
        </h3>
        <form onSubmit={newSearch}>
          <TextField
            variant="outlined"
            label="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="interestingness-desc">Interestingness</MenuItem>
            <MenuItem value="date-posted-desc">Recently Posted</MenuItem>
            <MenuItem value="date-taken-desc">Recently Taken</MenuItem>
          </Select>
          <Button
            type="submit"
          >
            Search
          </Button>
        </form>
      </Toolbar>
    </AppBar>
  )
}
