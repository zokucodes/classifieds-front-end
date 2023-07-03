import { Typography } from "@mui/material"

const BaseStorePageComponent = ({ children, title }) => {
    return (
        <>
            <div className="w-full h-full flex flex-col">
                {
                    title && (
                        <Typography sx={{ marginBottom: 2, marginLeft: 1 }} textAlign={"left"} variant="h4">{title}</Typography>
                    )
                }
                <div className="w-full h-full">
                    {
                        children
                    }
                </div>

            </div>
        </>

    )
}

export default BaseStorePageComponent