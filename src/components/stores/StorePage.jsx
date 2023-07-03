import { InputBase, Paper, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import BaseStorePageComponent from "./BaseStorePageComponent"
import { useState } from "react"
import ListingContainer from "../listings/ListingContainer";

export const StorePage = ({ title, type, page_id, content }) => {

    const [searchText, setSearchText] = useState("")

    return (
        <BaseStorePageComponent title={title || "Untitled Page"}>
            {
                type == "ABOUT" ? (
                    <div className="overflow-y-auto">
                        <div className="text-left">
                            <Typography>{content?.about}</Typography>
                        </div>

                    </div>
                ) : (
                    <div className="overflow-y-auto">
                        <Paper elevation={3} variant="outlined" className=' px-4 py-2 w-full flex flex-row mx-auto mt-8 items-center justify-center'>
                            <InputBase
                                sx={{ flex: 1 }}
                                placeholder={"Search my stores..."}
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                            />

                            <SearchIcon />
                        </Paper>

                        <div className="mt-8 w-full justify-start items-start flex flex-row flex-wrap gap-4 overflow-y-auto">

                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />
                            <ListingContainer orientation="HORIZONTAL" listing={{
                                title: "test listing",
                                description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                price: "10,000",
                                negotiable: true,
                                creation_time: 10,
                                cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg",
                                status: "PENDING"
                            }} />

                        </div>
                    </div>
                )
            }

        </BaseStorePageComponent>
    )
}