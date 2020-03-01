import React from 'react'
import {InputBase, Button, Select, MenuItem} from '@material-ui/core'

export function SearchInput ({ input, setInput, sort, setSort, newSearch }) {
  return (
    <form onSubmit={newSearch}>
      <InputBase
        type="text"
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
  )
}
