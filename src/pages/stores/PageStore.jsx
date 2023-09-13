import MainPageTemplate from "../templates/MainPageTemplate"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, Card, CardContent, Container, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import VerticalTabs from "../../components/layout/VerticalTabs";
import { StorePage } from "../../components/stores/StorePage";
import { useApiContext } from "../../contexts/ApiContext";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useParams } from "react-router-dom";
//import Container, { Card, CardContent, Typography, Tabs, Tab, Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    banner: {
        height: '25vh',
        position: 'relative',
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
    circleImage: {
        width: 150,
        height: 150,
        borderRadius: '50%',
        position: 'absolute',
        top: '50%',
        left: theme.spacing(8),
        transform: 'translateY(-50%)'
    },
    content: {
        flex: 1,
        // marginTop: theme.spacing(2),
        overflowY: "auto", // Enable scrolling for content
        display: "flex", // Add this line
        height: "calc(100% - 25vh)"
    },
    leftPanel: {
        backgroundColor: '#f0f0f0', // Placeholder background color
        minHeight: 300,
    },
    rightPanel: {
        backgroundColor: '#f5f5f5', // Placeholder background color
        minHeight: 300,
    },
    card: {
        position: 'absolute',
        top: '50%',
        right: theme.spacing(2),
        transform: 'translateY(-50%)',
        maxWidth: 300,
    },
    content2: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}));

export const PageStore = () => {
    const { id } = useParams();
    const store_id = parseInt(id)
    const classes = useStyles();

    const { aGetStoreByID } = useApiContext()
    const { gGetStoreIndexByID, gStores } = useGlobalContext()

    const [storeIndex, setStoreIndex] = useState(null)

    const [loadingStore, setLoadingStore] = useState(true)


    useLayoutEffect(() => {
        aGetStoreByID({ store_id })
            .then(res => {
                if (res.status == true) {
                    setStoreIndex(gGetStoreIndexByID(store_id))
                }
            })
            .finally(() => setLoadingStore(false))
    }, [])

    useEffect(() => {
        if (storeIndex == null) {
            setStoreIndex(gGetStoreIndexByID(store_id))
        }
    }, [gStores])

    return (
        <MainPageTemplate NAV_ENABLED={true}>
            <Container className={`${classes.container} !max-w-full !max-h-full`}>
                {
                    loadingStore ? (
                        <p>Loading</p>
                    ) : (
                        <>
                            <Box
                                className={classes.banner}
                            >
                                <Box sx={{ borderRadius: 0 }} className="p-4 items-center justify-center flex flex-row w-[50%] h-full">
                                    <Avatar
                                        src={gStores[storeIndex]?.icon_url}
                                        sx={{ width: 150, height: 150, fontSize: 80, bgcolor: blue[500] }}
                                        className="m-auto"
                                    >
                                        {
                                            gStores[storeIndex]?.name.charAt(0)
                                        }
                                    </Avatar>
                                    <Typography className="text-left" variant="h3" component="h2">
                                        {gStores[storeIndex]?.name}
                                    </Typography>
                                </Box>
                                <Box className="w-full"
                                    style={{
                                        backgroundPosition: "center center",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        backgroundImage:
                                            "url('https://hpservicecenterdelhi.com/images/banner2.jpg')",
                                    }}>

                                </Box>

                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography variant="h6" component="h2">
                                            Card Title
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                            Card Subtitle
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Card Content
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                            <div className={classes.content2}>
                                <Card className={classes.content}>
                                    <VerticalTabs
                                        tabWidth={"27rem"}
                                        items={[
                                            {
                                                title: "About",
                                                element: <StorePage title="About" type="ABOUT" content={{ about: gStores[storeIndex]?.about }} />
                                            },
                                            {
                                                title: "Laptops",
                                                element: <StorePage title={"Laptops"} />,
                                            },

                                        ]}
                                    />
                                </Card>

                            </div>
                        </>
                    )
                }


            </Container>
        </MainPageTemplate>
    );
};
