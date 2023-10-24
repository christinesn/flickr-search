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
                        group-hover:border-gray-400
                        transition
                        duration-100
                        relative
                        block
                        p-3
                        pb-[3rem]
                        shadow-lg
                        align-top
                        border-solid
                        border-2
                        border-gray-200
                        bg-white
                        rounded-xl
                    `}
                >
                    <div
                        className={`
                            relative
                            inline-block
                            bg-cover
                            bg-center
                            shadow-inner
                            shadow
                            border-solid
                            border-4
                            border-gray-200
                            group-hover:border-gray-400
                            rounded-xl
                            w-[74vw]
                            h-[64vw]
                            sm:w-[36vw]
                            sm:h-[32vw]
                            lg:w-[24vw]
                            lg:h-[22vw]
                            2xl:w-[18vw]
                            2xl:h-[16vw]
                        `}
                        style={{ backgroundImage: `url(${photo.url_z || photo.url_q})` }}
                    />
                </div>
            </a>
            <PhotoModal photo={photo} modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </React.Fragment>
    )
}