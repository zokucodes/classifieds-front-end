import MainPageTemplate from "../templates/MainPageTemplate"
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, Card, CardContent, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import VerticalTabs from "../../components/layout/VerticalTabs";
//import Container, { Card, CardContent, Typography, Tabs, Tab, Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        height: "100%",
        maxWidth: "100%"
    },
    banner: {
        height: '25vh',
        position: 'relative',
        backgroundColor: '#e0e0e0', // Placeholder background color
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
        marginTop: theme.spacing(2),
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
}));



export const PageStore = () => {
    const classes = useStyles();

    const handleChangeTab = (event, newValue) => {
        // Handle tab change here
    };



    return (
        <MainPageTemplate NAV_ENABLED={true}>
            <Container className={`${classes.container} !max-w-full lg:!max-w-[90%]`}>
                <Box style={{
                    backgroundPosition: "center center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: "url('https://smsoft.co.in/wp-content/uploads/2020/01/SM-BANNER-1.jpg')"
                }} className={classes.banner}>
                    <Avatar sx={{ width: 150, height: 150, fontSize: 80, bgcolor: blue[500] }} className={classes.circleImage} >
                        Q
                    </Avatar>
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
                <Card className={classes.content} variant="outlined">
                    <VerticalTabs
                        tabWidth={"27rem"}
                        items={[
                            {
                                title: "Laptops",
                                element: (<p></p>)
                            },
                            
                        ]}
                    />
                </Card>
                {/* <Grid container className={classes.content}>
                    <Grid item xs={3}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={0} // Set the initial selected tab index here
                            onChange={handleChangeTab}
                            aria-label="Vertical tabs"
                        >
                            <Tab label="Tab 1" />
                            <Tab label="Tab 2" />
                            <Tab label="Tab 3" />
                        </Tabs>
                    </Grid>
                    <Grid item xs={9}>
                        <div className={classes.rightPanel}></div>
                    </Grid>
                </Grid> */}

            </Container>
        </MainPageTemplate>
    )
}