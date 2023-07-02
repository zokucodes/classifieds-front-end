import { CssBaseline } from "@mui/material"
import Nav from "../../components/layout/Nav"

const MainPageTemplate = ({ ELEMENTS, NAV_ENABLED }) => {
    return (
        <>
            <main className='flex flex-col relative items-center justify-center lg:h-auto !h-full'>
                <CssBaseline />
                {
                    NAV_ENABLED && (
                        <div className="absolute top-0 w-full">
                            <Nav />
                        </div>
                    )
                }


                <div className="h-full w-full flex items-center justify-center pt-20 pb-4 px-4">
                    {
                        ELEMENTS
                    }
                </div>

            </main>
        </>
    )
}

export default MainPageTemplate