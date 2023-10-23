'use client'

import Photo from './_photo'
import Header from './_header'
import useSWR from 'swr';
import { useState } from 'react'
import fetchData from './helpers/fetchData';

export default function Home() {
  const [input, setInput] = useState('')
  const [page, setPage] = useState(1)

  const { data, error, isLoading } = useSWR({ input, page }, fetchData)

  return (
    <div className="w-full min-h-screen pb-24 pt-4 bg-slate-100">
      <Header setInput={setInput} />
      <div className="w-5/6 mx-auto text-center pt-4 pb-4">
        {isLoading && (
          <div className="text-3xl">Loading...</div>
        )}
        {error && (
          <div className="text-3xl">Error: {error.message}</div>
        )}
        {data && data.photos && data.photos.photo.map(photo => (
          <Photo photo={photo} key={photo.id} />
        ))}
      </div>
    </div>
  )
}
