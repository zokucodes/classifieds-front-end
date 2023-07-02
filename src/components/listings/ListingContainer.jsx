import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';

const ListingContainer = ({ listing }) => {
    return (
        <Card className="lg:w-[23%] w-full h-[65vh]" variant="outlined" sx={{ position: "relative" }}>
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
}

export default ListingContainer