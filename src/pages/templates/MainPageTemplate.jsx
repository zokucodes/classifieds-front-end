import Nav from "../../components/layout/Nav"

const MainPageTemplate = ({ children, NAV_ENABLED }) => {
    return (
        <>
            <main className='flex flex-col relative items-center justify-center lg:h-auto !h-full'>
                {
                    NAV_ENABLED && (
                        <div className="absolute top-0 w-full z-30">
                            <Nav />
                        </div>
                    )
                }


                <div className="h-full w-full flex items-center justify-center pt-20 pb-4 px-4">
                    {
                        children
                    }
                </div>

            </main>
        </>
    )
}

export default MainPageTemplate