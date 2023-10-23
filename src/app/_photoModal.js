'use client'

import { format } from 'date-fns'

export default function PhotoModal ({photo, modalOpen, setModalOpen}) {
    function handleClick (e) {
        e.preventDefault();
        setModalOpen(false);
    }

    if (modalOpen) {
        return (
            <div onClick={() => setModalOpen(false)} className={`
                fixed
                z-50
                w-[100vw]
                h-[100vh]
                top-0
                left-0
                bg-[rgba(0,0,0,0.75)]
                    `}>
                <div role="dialog" className={`
                    relative
                    mx-auto
                    bg-white
                    top-[15%]
                    h-auto
                    min-h-[440px]
                    max-h-[70vh]
                    w-[330px]
                    sm:w-[400px]
                    md:w-[500px]
                    lg:w-[600px]
                    shadow-lg
                    rounded-xl
                    p-4
                    border-2
                    border-gray-300
                `}>
                    <div className={`
                        bg-cover
                        bg-center
                        w-full
                        h-[50vh]
                        rounded-xl
                        border-2
                        border-gray-300
                        shadow
                    `} style={{
                        backgroundImage: `url(${photo.url_l})`,
                        backgroundColor: 'linear-gradient(45 deg, white, #efefef)'
                    }} />
                    <div className="m-auto w-[90%] text-left pt-4 pb-4">
                        <div className="flex pb-2">
                            <div className="font-bold text-sm inline-block w-1/2">
                                <a href={`https://www.flickr.com/people/${photo.owner}`} target="_blank" title="Go to creator's profile" className="text-lg text-sky-700 hover:text-sky-600 hover:underline">
                                    {photo.ownername}
                                </a>
                            </div>
                            <div className="text-sm inline-block w-1/2 text-right">
                                {format(new Date(photo.datetaken), 'PPP')}
                            </div>
                        </div>
                        {photo.title && (
                            <div className="text-sm italic w-[95%] m-auto mt-1 border-2 border-gray-300 rounded-xl bg-gray-100 shadow p-3">
                                {photo.title}
                            </div>
                        )}
                    </div>
                </div>
                <a href="#" title="Close" className={`
                    fixed
                    top-[15%]
                    drop-shadow
                    mt-[-1.6em]
                    ml-[145px]
                    sm:mt-[0.2em]
                    sm:ml-[210px]
                    md:ml-[260px]
                    lg:ml-[312px]
                    hover:opacity-75
                    transition
                    duration-100
                `} onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" height="1.2em" viewBox="0 0 384 512">
                        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                    </svg>
                </a>
            </div>
        )
    } else {
        return
    }
}