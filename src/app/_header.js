'use client'

export default function Header ({ setInput }) {
    function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        setInput(formData.get('search_input'))
    }

    return (
        <header className={`
            mb-12
            h-24
            w-full
            m-auto
            lg:mb-14
            xl:mb-16
        `}>
            <h1 className={`
                block
                text-4xl
                text-center
                pt-2
                pb-6
                font-display
                text-slate-400
                w-full
                lg:text-5xl
                lg:pt-2
                lg:pb-6
            `}>
                search flickr photos
            </h1>
            <div className={`
                pl-12
                pr-12
                sm:pl-20
                sm:pr-20
                md:pl-24
                md:pr-24
                lg:pr-48
                lg:pl-48
                2xl:pl-80
                2xl:pr-80
            `}>
                <form className={`
                    flex
                    flex-wrap
                    justify-between
                    w-full
                    pl-6
                    pr-6
                    bg-white
                    rounded-full
                    border-2
                    border-slate-200
                    shadow
                    focus-within:outline
                    focus-within:outline-slate-400
                `} onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" id="search_input" name="search_input" placeholder="landscape" className={`
                        text-xl
                        rounded-full
                        w-[80%]
                        flex-auto
                        pt-3
                        pb-3
                        text-zinc-600
                        focus:outline-none
                    `} />
                    <button type="submit" title="Search" className={`
                        rounded-full
                        flex-none
                        p-3
                        pl-4
                        pr-4
                        group
                        focus:outline-none
                        focus:bg-slate-200
                        hover:bg-slate-100
                    `}>
                        <svg
                            className="fill-slate-500 group-hover:fill-slate-700 transition duration-100"
                            xmlns="http://www.w3.org/2000/svg" height="1.4rem" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                        </svg>
                    </button>
                </form>
            </div>
        </header>
    )
}