import getData from './_getData';
import Photo from './_photo'
import Header from './_header'

export default async function Home() {
  const res = await getData()

  return (
    <div className="w-full pb-24 pt-4 bg-slate-100">
      <Header />
      <div className="w-5/6 mx-auto text-center pt-4 pb-4">
        {res.photos.photo.map(photo => (
          <Photo photo={photo} key={photo.id} />
        ))}
      </div>
    </div>
  )
}
