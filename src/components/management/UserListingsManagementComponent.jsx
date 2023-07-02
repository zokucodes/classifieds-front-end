import { Avatar, Box, Button, TextField, Typography } from "@mui/material"
import BaseManagementComponent from "./BaseManagementComponent"
import { useState } from "react"
import ListingContainer from "../listings/ListingContainer"

const UserListingsManagementComponent = () => {

    const [email, setEmail] = useState("")

    return (
        <BaseManagementComponent title={"My Listings"}>
            <div className="mt-8 w-full justify-start items-start flex flex-row flex-wrap gap-4">
                <ListingContainer listing={{
                    title: "test listing",
                    description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                    price: "10,000",
                    negotiable: true,
                    creation_time: 10,
                    cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg"
                }} />
                <ListingContainer listing={{
                    title: "test listing",
                    description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                    price: "10,000",
                    negotiable: true,
                    creation_time: 10,
                    cover_image: "https://www.pcworld.com/wp-content/uploads/2023/04/Nvidia-GeForce-RTX-4090-1-2.jpg?quality=50&strip=all"
                }} />
                <ListingContainer listing={{
                    title: "test listing",
                    description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                    price: "10,000",
                    negotiable: true,
                    creation_time: 10,
                    cover_image: "https://images.unsplash.com/photo-1526512340740-9217d0159da9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                }} />
                <ListingContainer listing={{
                    title: "test listing",
                    description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                    price: "10,000",
                    negotiable: true,
                    creation_time: 10,
                    cover_image: "https://i.pcmag.com/imagery/reviews/03vLXu6mlZcGUGY0H1lPvmv-19.jpg"
                }} />
                <ListingContainer listing={{
                    title: "test listing",
                    description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                    price: "10,000",
                    negotiable: true,
                    creation_time: 10,
                    cover_image: "https://www.pcworld.com/wp-content/uploads/2023/04/Nvidia-GeForce-RTX-4090-1-2.jpg?quality=50&strip=all"
                }} />
                <ListingContainer listing={{
                    title: "test listing",
                    description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                    price: "10,000",
                    negotiable: true,
                    creation_time: 10,
                    cover_image: "https://images.unsplash.com/photo-1526512340740-9217d0159da9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                }} />


            </div>


        </BaseManagementComponent>
    )
}

export default UserListingsManagementComponent