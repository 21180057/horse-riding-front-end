import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchInput() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  return (
    <TextField
      placeholder='Търси...'
      variant='outlined'
      size='small'
      onChange={e => setSearch(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
            onClick={() => navigate(`/search?query=${search}`)}
              disabled={!search.trim()}
              edge='end'
              aria-label='search'
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}
