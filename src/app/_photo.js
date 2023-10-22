'use client'

import React from 'react';
import PhotoModal from './_photoModal'

export default function Photo ({ photo }) {
    const [modalOpen, setModalOpen] = React.useState(false)

    function handleClick (e) {
        e.preventDefault();
        setModalOpen(true)
    }

    return (
        <React.Fragment>
            <a href="#" title="View" onClick={handleClick} className="inline-block relative group m-1 mt-0 mb-4" alt={photo.title}>
                <div href="#" className={`
                        group-hover:shadow-xlg
                        group-hover:from-gray-200
                        group-hover:to-gray-300
                        group-hover:border-gray-400
                        transition
                        duration-100
                        relative
                        block
                        p-2
                        pb-[3rem]
                        shadow-lg
                        align-top
                        border-solid
                        border-2
                        border-gray-200
                        bg-gradient-to-b
                        from-white
                        to-gray-100
                        rounded-lg
                    `}
                >
                    <div
                        className={`
                            relative
                            inline-block
                            bg-cover
                            bg-center
                            shadow-inner
                            border-solid
                            border-2
                            border-gray-300
                            group-hover:border-gray-400
                            w-[75vw]
                            h-[65vw]
                            sm:w-[37vw]
                            sm:h-[33vw]
                            lg:w-[25vw]
                            lg:h-[23vw]
                            2xl:w-[18vw]
                            2xl:h-[18vw]
                        `}
                        style={{ backgroundImage: `url(${photo.url_z})` }}
                    />
                </div>
            </a>
            <PhotoModal photo={photo} modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </React.Fragment>
    )
}