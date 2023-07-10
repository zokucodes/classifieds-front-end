import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';

const ListingContainer = ({ listing, classname, orientation = "VERTICAL", styles = {} }) => {
    if (orientation == "VERTICAL") {
        return (
            <Card styles={styles} className={`lg:w-[22rem] w-full h-[65vh] ${classname || ""}`} variant="outlined" sx={{ position: "relative" }}>
                <div className="h-[42%] px-4 pt-4 w-full relative">
                    <CardMedia
                        component="img"
                        sx={{ objectFit: "contain" }}
                        className=" h-full w-full"
                        src={listing?.cover_image}
                        alt={listing?.title}
                    />
                    {
                        listing?.status == "PENDING" && (
                            <div className=" h-full w-full absolute px-4 pt-4 top-0 bottom-0 right-0 left-0">
                                <div className=" h-full w-full bg-white bg-opacity-60 flex items-center justify-center">
                                    <Typography color="primary" fontWeight={"bold"} variant="h2">
                                        PENDING
                                    </Typography>
                                </div>
                            </div>
                        )
                    }

                </div>

                <CardContent sx={{ textAlign: "left", paddingBottom: 8 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {listing?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {listing?.description}
                    </Typography>


                </CardContent>
                <CardActions className="flex flex-col text-left" sx={{ width: "100%", bottom: 0, position: "absolute" }}>
                    <div className="w-full px-2 mb-3">
                        <Typography color="primary" fontWeight={"bold"} variant="h4">
                            ${listing?.price} <Typography className=" inline-block -translate-y-[2px]" variant="h6">{listing?.negotiable && "Negotiable"}</Typography>
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom>
                            Listed {listing?.creation_time} days ago
                        </Typography>
                    </div>
                    <div className="flex w-full items-center justify-between !mx-auto flex-row h-full gap-1">
                        <Button fullWidth variant="contained" sx={{ height: '100%' }}>View</Button>
                        <Button variant="contained" color="primary" sx={{ minWidth: 'fit-content' }}>
                            <EditIcon />
                        </Button>
                    </div>

                </CardActions>

            </Card>

        )
    } else if (orientation == "HORIZONTAL") {
        return (
            <Card className="lg:w-full w-full lg:h-[25vh]" variant="outlined" sx={{ position: "relative" }}>
                <div className="w-full h-full flex flex-row items-center">
                    <div className="lg:h-[25vh] p-4 lg:w-[25vh]">
                        <CardMedia
                            component="img"
                            sx={{ objectFit: "contain" }}
                            className=" h-full"
                            src={listing?.cover_image}
                        />
                    </div>

                    <div className="flex flex-col h-full py-4 gap-4">
                        <Typography variant="h4" fontWeight={"bold"} className="text-left">{listing?.title || "Untitled Listing"}</Typography>
                        <Typography variant="body1" color={"text.secondary"} className="text-left w-[80%]">{listing?.description || "(No description)"}</Typography>
                    </div>

                    <div className="h-full w-[30%] flex flex-col ml-auto pr-4 py-4">
                        <div className="pr-3 w-full">
                            <Typography sx={{ textAlign: "right" }} fontWeight={"regular"} variant="h5">{"Melbourne, VIC"}</Typography>
                        </div>


                        <div className="flex flex-col w-full mt-auto text-right" >
                            <div className="w-full px-2 mb-3">
                                <Typography variant="h6" color="text.secondary" display="block" gutterBottom>
                                    Listed {listing?.creation_time} days ago
                                </Typography>
                                <Typography color="primary" fontWeight={"bold"} variant="h4">
                                    ${listing?.price} <Typography className=" inline-block -translate-y-[2px]" variant="h6">{listing?.negotiable && "Negotiable"}</Typography>
                                </Typography>
                            </div>
                        </div>
                    </div>



                </div>
            </Card>

        )
    }

}

export default ListingContainer