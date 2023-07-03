import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';

const StoreContainer = ({ store }) => {

    return (
        <Card className="lg:w-full w-full lg:h-[25vh]" variant="outlined" sx={{ position: "relative" }}>
            <div className="w-full h-full flex flex-row items-center">
                <div className="lg:h-[25vh] p-4 lg:w-[25vh]">
                    <CardMedia
                        component="img"
                        sx={{ objectFit: "contain" }}
                        className=" h-full"
                        src={store?.icon_url}
                    />
                </div>

                <div className="flex flex-col h-full py-4">
                    <Typography variant="h3" className="text-left">{store?.name || "Untitled Store"} <Typography variant="h3" fontWeight={"bold"} sx={{display: "inline-block"}}>{store?.status != "PUBLISHED" && "(Not Published)"}</Typography></Typography>
                    <Typography variant="body1" className="text-left">{store?.description || "(No description)"}</Typography>

                    <div className="mt-auto flex flex-row gap-2">
                        {
                            store?.categories?.length > 0 && (
                                store.categories.map((data, i) => (
                                    <Chip color="info" key={i} label={data?.name} />
                                ))
                            )
                        }
                    </div>
                </div>

                <div className="h-full w-[30%] lg:w-auto lg:min-w-[15%] flex flex-col ml-auto pr-4 py-4">
                    <div className="pr-3">

                        {
                            store?.status == "PUBLISHED" && (
                                <>
                                    <Typography sx={{ textAlign: "right" }} fontWeight={"bold"} color={"primary"} variant="h2">{store?.active_listings_count || 0}</Typography>
                                    <Typography fontWeight={"regular"} sx={{ textAlign: "right" }} variant="h6">active listings</Typography>
                                </>
                            )
                        }



                    </div>


                    <CardActions className="flex  flex-col w-full mt-auto" >
                        <div className="flex ml-auto items-center justify-end flex-row gap-1">
                            <Button fullWidth sx={{ paddingX: 8 }} variant="contained">View</Button>
                            <Button variant="contained" color="primary" sx={{ minWidth: 'fit-content' }}>
                                <EditIcon />
                            </Button>
                        </div>

                    </CardActions>
                </div>



            </div>
        </Card>
    )
}

export default StoreContainer