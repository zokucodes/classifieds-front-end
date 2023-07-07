import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, height: "100%" }}>
                    <Typography sx={{ height: "100%" }}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const tabHeight = '100%' // default: '48px'
const useStyles = makeStyles({
    tabsRoot: {
        minHeight: tabHeight,
        height: tabHeight
    },
    tabRoot: {
        minHeight: tabHeight,
        height: tabHeight

    },
});

export default function VerticalTabs({ items, tabWidth }) {
    //items = [{title: "tab item 1", element: <p>testpage</p>}]
    const [value, setValue] = React.useState(0);
    const classes = useStyles()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, display: 'flex', height: "100%" }}

        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                classes={{
                    root: classes.tabsRoot,
                }}
                onChange={handleChange}
                sx={{ borderRight: 1, width: tabWidth ? tabWidth : "20rem", borderColor: 'divider', height: "100%" }}
            >
                {
                    items.map((data, i) => (
                        <Tab key={i} label={data?.title} {...a11yProps(i)} />
                    ))
                }
            </Tabs>
            {
                items.map((data, i) => (
                    <TabPanel className="overflow-y-auto h-full overflow-x-hidden w-full" value={value} index={i}>
                        {data.element}
                    </TabPanel>
                ))
            }
        </Box>
    );
}



















// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import UserSettingsManagementComponent from '../management/UserSettingsManagementComponent';
// import UserListingsManagementComponent from '../management/UserListingsManagementComponent';
// import CreateListingManagementComponent from '../management/CreateListingManagementComponent';
// import UserStoresManagementComponent from '../management/UserStoresManagementComponent';
// import { makeStyles } from '@mui/styles';

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`vertical-tabpanel-${index}`}
//             aria-labelledby={`vertical-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3, height: "100%" }}>
//                     <Typography sx={{ height: "100%" }}>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//     return {
//         id: `vertical-tab-${index}`,
//         'aria-controls': `vertical-tabpanel-${index}`,
//     };
// }

// const tabHeight = '100%' // default: '48px'
// const useStyles = makeStyles({
//     tabsRoot: {
//         minHeight: tabHeight,
//         height: tabHeight
//     },
//     tabRoot: {
//         minHeight: tabHeight,
//         height: tabHeight

//     },
// });

// export default function VerticalTabs() {
//     const [value, setValue] = React.useState(0);
//     const classes = useStyles()

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     return (
//         <Box
//             sx={{ flexGrow: 1, display: 'flex', height: "100%" }}

//         >
//             <Tabs
//                 orientation="vertical"
//                 variant="scrollable"
//                 value={value}
//                 classes={{
//                     root: classes.tabsRoot,
//                 }}
//                 onChange={handleChange}
//                 sx={{ borderRight: 1, width: "15rem", borderColor: 'divider', height: "100%" }}
//             >
//                 <Tab label="Settings" {...a11yProps(0)} />
//                 <Tab label="My Listings" {...a11yProps(1)} />
//                 <Tab label="Item Three" {...a11yProps(2)} />
//                 <Tab label="Item Four" {...a11yProps(3)} />
//                 <Tab label="Item Five" {...a11yProps(4)} />
//                 <Tab label="Item Six" {...a11yProps(5)} />
//                 <Tab label="Item Seven" {...a11yProps(6)} />
//             </Tabs>
//             <TabPanel className="overflow-y-auto h-full overflow-x-hidden w-full" value={value} index={0}>
//                 <UserSettingsManagementComponent />
//             </TabPanel>
//             <TabPanel className="overflow-y-auto h-full overflow-x-hidden w-full" value={value} index={1}>
//                 <UserListingsManagementComponent />
//             </TabPanel>
//             <TabPanel className="overflow-y-auto h-full overflow-x-hidden w-full" value={value} index={2}>
//                 <CreateListingManagementComponent />
//             </TabPanel>
//             <TabPanel className="overflow-y-auto h-full overflow-x-hidden w-full" value={value} index={3}>
//                 <UserStoresManagementComponent />
//             </TabPanel>
//             <TabPanel value={value} index={4}>
//                 Item Five
//             </TabPanel>
//             <TabPanel value={value} index={5}>
//                 Item Six
//             </TabPanel>
//             <TabPanel value={value} index={6}>
//                 Item Seven
//             </TabPanel>
//         </Box>
//     );
// }