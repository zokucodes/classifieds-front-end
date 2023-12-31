import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import RoomIcon from '@mui/icons-material/Room';
import { ENV_APPNAME, GetRandomItemFromArray, PLACEHOLDERS } from '../../utils/values';
import { Button, Divider, Paper } from '@mui/material';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

const user_id = localStorage.getItem('user_id')

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Nav({ hideSearchBar }) {
    const navigate = useNavigate()
    const { gToggleColorMode, gColorMode } = useGlobalContext()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [searchPlaceholder, setSearchPlaceholder] = React.useState("Search...")

    React.useLayoutEffect(() => {
        setInterval(() => {
            setSearchPlaceholder(GetRandomItemFromArray(PLACEHOLDERS.searchListings.searchTerms))
        }, 8000)
    }, [])

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleClickMyStores = (e) => {
        e.stopPropagation()
        e.preventDefault()
        navigate('/app/manage')
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            sx={{ mt: '56px', zIndex: 50 }}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Messages</MenuItem>
            <MenuItem onClick={handleMenuClose}>My Listings</MenuItem>
            <MenuItem onClick={handleClickMyStores}>My Stores</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">

                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        {ENV_APPNAME}
                    </Typography>

                    {
                        !hideSearchBar && (
                            <>
                                <Paper className='lg:w-[40%] px-4 py-[3px] w-full flex flex-row ml-8 items-center justify-center'>
                                    <InputBase
                                        sx={{ flex: 1 }}
                                        placeholder={searchPlaceholder}
                                    />

                                    <SearchIcon />
                                    <Divider sx={{ height: 28, marginX: 2, marginY: 0.5 }} orientation="vertical" />
                                    <div className='w-[30%]'>
                                        <InputBase
                                            sx={{ flex: 1 }}
                                            placeholder="Australia"
                                        />

                                    </div>
                                    <RoomIcon />


                                </Paper>
                                <Button sx={{ marginLeft: 1 }} variant='contained'>Search</Button>
                            </>

                        )
                    }





                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {
                            user_id ? (
                                <>
                                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                        <Badge badgeContent={0} color="error">
                                            <MailIcon />
                                        </Badge>
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                    >
                                        <Badge badgeContent={0} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <IconButton color='inherit' onClick={gToggleColorMode}>
                                        {
                                            gColorMode == "light" ? (
                                                <Brightness7Icon />
                                            ) : (
                                                <Brightness4Icon />
                                            )
                                        }

                                    </IconButton>
                                </>
                            ) : (
                                <div className='flex flex-row gap-3'>
                                    <Button variant='contained' onClick={() => navigate('/auth/login')}>Login</Button>
                                    <Button variant='contained' onClick={() => navigate('/auth/register')}>Register</Button>
                                    <IconButton color='inherit' onClick={gToggleColorMode}>
                                        {
                                            gColorMode == "light" ? (
                                                <Brightness7Icon />
                                            ) : (
                                                <Brightness4Icon />
                                            )
                                        }

                                    </IconButton>
                                </div>

                            )
                        }

                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </>
    );
}