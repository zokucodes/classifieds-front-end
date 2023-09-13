import { Autocomplete, Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, FormGroup, InputAdornment, InputBase, List, ListItem, ListItemButton, ListItemText, ListSubheader, Paper, Popper, TextField, Typography } from "@mui/material"
import MainPageTemplate from "../templates/MainPageTemplate"
import { LoadingButton } from "@mui/lab"
import { useLayoutEffect, useState } from "react";
import { useApiContext } from "../../contexts/ApiContext";
import SearchIcon from '@mui/icons-material/Search';
import RoomIcon from '@mui/icons-material/Room';
import SubjectIcon from '@mui/icons-material/Subject';
import ListingContainer from "../../components/listings/ListingContainer";

const PageSearchListings = () => {
    const { aGetCategories, aHCategories } = useApiContext()

    const [hCategories, setHCategories] = useState([])

    const [checked, setChecked] = useState([0]);


    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedConditions, setSelectedConditions] = useState({
        new: true,
        parts: true,
        likeNew: true,
        fair: true,
        good: true
    })
    const [selectedSellerTypes, setSelectedSellerTypes] = useState({
        individual: true,
        store: true
    })

    const [showCats, setShowCats] = useState(false)

    const [loadingCats, setLoadingCats] = useState(true)
    const [loadingListings, setLoadingListings] = useState(true)

    const [catAnchor, setCatAnchor] = useState(null)

    useLayoutEffect(() => {
        aGetCategories("GET_ALL_CATEGORIES_HIERARCHICAL")
            .then(res => {
                setHCategories(res.content)
            })
            .finally(() => {
                setLoadingCats(false)
            })
    }, [])

    const handleClickCategories = (event) => {
        setCatAnchor(catAnchor ? null : event.currentTarget);
    };

    const handleSelectCategory = (e, newValue) => {
        setSelectedCategory(newValue)
    }

    const handleSelectCondition = (e, condition) => {
        setSelectedConditions({ ...selectedConditions, [condition]: e.target.checked })
    }

    const handleSelectSellerType = (e, type) => {
        setSelectedSellerTypes({ ...selectedSellerTypes, [type]: e.target.checked })
    }

    const handleToggleCategory = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    const open = Boolean(catAnchor);

    const renderSubcategories = (subcategories) => {
        return subcategories.map((subcategory) => (
            <>
                <ListItemButton key={`subcategory-${subcategory.id}`} role={undefined} onClick={handleToggleCategory(subcategory)} dense>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(subcategory) !== -1}
                        tabIndex={-1}
                        disableRipple
                    />
                    <ListItemText primary={subcategory?.name} />
                </ListItemButton>
            </>

        ));
    };

    const renderCategories = (categories) => {
        return categories.map((category) => (
            <li key={`category-${category?.id}`}>
                <ul>
                    <ListSubheader sx={{ cursor: "pointer" }}>{category?.name}</ListSubheader>
                    {category.subcategories && renderSubcategories(category.subcategories)}
                </ul>
            </li>
        ));
    };


    return (
        <MainPageTemplate NAV_ENABLED={true} NAV_OPTIONS={{ hideSearchBar: true }}>
            <div className="lg:w-[69%] h-full flex flex-col">
                <div className='w-full flex flex-row mt-16'>
                    <Paper className="px-4 py-2 w-full flex flex-row items-center justify-center">
                        <div onClick={handleClickCategories} className="flex flex-row gap-2">
                            <div className="mt-[3px]">
                                <SubjectIcon />
                            </div>

                            <Typography fontWeight={"regular"} variant="h6">All categories</Typography>
                        </div>

                        <Divider sx={{ height: 28, marginX: 2, marginY: 0.5 }} orientation="vertical" />
                        <InputBase
                            sx={{ flex: 1, fontSize: "1.25rem" }}
                            placeholder={"test"}
                        />

                        <SearchIcon />
                        <Divider sx={{ height: 28, marginX: 2, marginY: 0.5 }} orientation="vertical" />
                        <div>
                            <InputBase
                                className="text-4xl"
                                sx={{ flex: 1, fontSize: "1.25rem" }}
                                placeholder="Australia"
                            />

                        </div>
                        <RoomIcon />


                    </Paper>
                    <LoadingButton sx={{ marginLeft: 1 }} variant='contained'>Search</LoadingButton>
                </div>
                <div className="w-full h-full mt-4 flex-row gap-4 flex">
                    <Paper className="w-[33%] flex-grow-0 self-start">
                        <div className="flex flex-col gap-4 w-full px-4 py-2">
                            <div className="flex flex-col">
                                <Typography variant="h6" fontWeight={"regular"} sx={{ textAlign: "left", marginLeft: 1 }}>Price</Typography>
                                <div className="flex flex-row gap-4 items-center justify-start">

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        type="number"

                                        id="minPrice"
                                        label="Min"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                        name="minPrice"
                                    // value={email}
                                    // onChange={e => setEmail(e.target.value)}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        type="number"

                                        id="maxPrice"
                                        label="Max"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                        name="maxPrice"
                                    // value={email}
                                    // onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <Typography variant="h6" fontWeight={"regular"} sx={{ textAlign: "left", marginLeft: 1 }}>Condition</Typography>
                                <div className="grid grid-cols-2 items-center justify-start">
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={selectedConditions?.new} onChange={(e) => handleSelectCondition(e, "new")} name="new" />
                                        }
                                        label="New"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={selectedConditions?.likeNew} onChange={(e) => handleSelectCondition(e, "likeNew")} name="likeNew" />
                                        }
                                        label="Like New"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={selectedConditions?.good} onChange={(e) => handleSelectCondition(e, "good")} name="good" />
                                        }
                                        label="Good"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={selectedConditions?.fair} onChange={(e) => handleSelectCondition(e, "fair")} name="fair" />
                                        }
                                        label="Fair"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={selectedConditions?.parts} onChange={(e) => handleSelectCondition(e, "parts")} name="parts" />
                                        }
                                        label="Parts Only"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <Typography variant="h6" fontWeight={"regular"} sx={{ textAlign: "left", marginLeft: 1 }}>Seller Type</Typography>
                                <div className="grid grid-cols-2 items-center justify-start">
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={selectedSellerTypes?.individual} onChange={(e) => handleSelectSellerType(e, "individual")} name="individual" />
                                        }
                                        label="Individual"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={selectedSellerTypes?.store} onChange={(e) => handleSelectSellerType(e, "store")} name="store" />
                                        }
                                        label="Store"
                                    />
                                </div>
                            </div>
                        </div>

                    </Paper>

                    <Paper className="h-full w-full p-4 flex flex-col gap-4">
                        {
                            loadingListings ? (
                                <>
                                    {
                                        (

                                            () => {
                                                const idk = []
                                                for (let i = 0; i < 50; i++) {
                                                    idk.push(<ListingContainer orientation="HORIZONTAL"
                                                        listing={{
                                                            title: "RTX 4090",
                                                            description: "Hardly used RTX 4090. Only used for crypto mining 24/7 for 3 months.\nComes with the original…",
                                                            price: "10,000",
                                                            negotiable: true,
                                                            creation_time: 10,
                                                            cover_image: "https://www.pcworld.com/wp-content/uploads/2023/04/Nvidia-GeForce-RTX-4090-1-2.jpg?quality=50&strip=all"
                                                        }}
                                                    />)
                                                    
                                                }
                                                return idk
                                            }
                                        )()
                                    }
                                </>
                            ) : (
                                <div className="m-auto">
                                    <CircularProgress size={150} variant="indeterminate" />

                                </div>
                            )
                        }

                    </Paper>
                </div>
            </div>



        </MainPageTemplate>
    )

}

export default PageSearchListings