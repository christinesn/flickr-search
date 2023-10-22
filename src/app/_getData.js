export default async function getData (input = 'nature photography', page = 1) {
    const uri = 'https://api.flickr.com/services/rest/'

    const params = {
        text: input,
        page: page,
        method: 'flickr.photos.search',
        api_key: process.env.API_KEY,
        safe_search: 1,
        content_type: 1,
        format: 'json',
        content_types: 0,
        nojsoncallback: 1,
        per_page: 20,
        sort: 'interestingness-desc',
        min_upload_date: '2012-03-05 00:00:00',
        extras: 'description,date_taken,owner_name,url_z,url_l'
    }

    const res = await fetch(uri + '?' + new URLSearchParams(params), {
        next: {
            cache: 'no-store'
        }
    })

    if (!res.ok) {
        throw new Error('Could not fetch data')
    }

    return await res.json()
}