import MainPageTemplate from "../templates/MainPageTemplate"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, Card, CardContent, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
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
        backgroundColor: '#e0e0e0', // Placeholder background color,
    },
    circleImage: {
        width: 150,
        height: 150,
        borderRadius: '50%',
        position: 'absolute',
        top: '50%',
        left: theme.spacing(8),
        transform: 'translateY(-50%)',
        backgroundColor: '#fff', // Placeholder background color
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
                                style={{
                                    backgroundPosition: "center center",
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    backgroundImage:
                                        "url('https://smsoft.co.in/wp-content/uploads/2020/01/SM-BANNER-1.jpg')",
                                }}
                                className={classes.banner}
                            >
                                <Avatar
                                    src={gStores[storeIndex]?.icon_url}
                                    sx={{ width: 150, height: 150, fontSize: 80, bgcolor: blue[500] }}
                                    className={classes.circleImage}
                                >
                                    {
                                        gStores[storeIndex]?.name.charAt(0)
                                    }
                                </Avatar>
                                <Typography className="absolute left-64 top-1/2 -translate-y-1/2" variant="h3" component="h2">
                                    {gStores[storeIndex]?.name}
                                </Typography>
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
