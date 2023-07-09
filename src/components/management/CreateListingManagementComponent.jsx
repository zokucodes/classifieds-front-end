import { Autocomplete, Avatar, Backdrop, Box, Button, Card, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, IconButton, ImageList, ImageListItem, InputAdornment, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material"
import BaseManagementComponent from "./BaseManagementComponent"
import React, { useLayoutEffect, useRef, useState } from "react"
import ListingContainer from "../listings/ListingContainer"
import CreateIcon from '@mui/icons-material/Create';
import { useGlobalContext } from "../../contexts/GlobalContext";
import { ChangeKeyName, FileChange } from "../../utils/misc";
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useApiContext } from "../../contexts/ApiContext";
import { LoadingButton } from "@mui/lab";
import { MIN_MAX_VALUES } from "../../utils/values";
import { SearchLocations } from "../../utils/api";

const CreateListingManagementComponent = () => {
    window.history.replaceState(null, "Create New Listing", "/app/manage/listings")

    const { gAddErrors, gOnlyMyStores } = useGlobalContext()
    const { aGetCategories, aCategories, aGetMyStores } = useApiContext()

    const [cities, setCities] = useState([])
    const [searchCitiesText, setSearchCitiesText] = useState("")

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedSubCategory, setSelectedSubCategory] = useState(null)

    const [selectedStore, setSelectedStore] = useState(null)
    const [selectedStoreLocation, setSelectedStoreLocation] = useState(null)

    const [selectedCity, setSelectedCity] = useState(null)

    const [storeBehalf, setStoreBehalf] = useState(false)

    const [selectedFiles, setSelectedFiles] = useState([])

    const [loadingCats, setLoadingCats] = useState(true)
    const [loadingStores, setLoadingStores] = useState(true)

    const uploadRef = useRef(null)

    const onFileChange = (e) => {
        e.stopPropagation()
        e.preventDefault()

        if (selectedFiles.length > MIN_MAX_VALUES.listing.media.max) {
            gAddErrors({ msg: "Only a maximum of 10 files are allowed" })
            uploadRef.current.value = null
            return
        }

        FileChange(e, MIN_MAX_VALUES.listing.mediaFileSize.max, ['image'], MIN_MAX_VALUES.listing.media.max - selectedFiles.length).then(res => {
            if (res.status == true) {
                res.content.hover = false
                setSelectedFiles([...selectedFiles, ...res.content])
            } else {
                gAddErrors(res.error)
            }

            uploadRef.current.value = null
        })


    }

    const handleUploadClick = (e) => {
        e.stopPropagation()
        uploadRef.current.click()
    }

    useLayoutEffect(() => {
        aGetCategories().finally(() => setLoadingCats(false))
        aGetMyStores().finally(() => setLoadingStores(false))

    }, [])

    const handleSearchCities = (e, newValue) => {
        setSearchCitiesText(newValue)
        if (newValue.trim().length >= 2) {
            SearchLocations(gAddErrors, { type: "CITY", query: newValue, country_id: 13 }).then(res => {
                if (res.status == true) {
                    setCities(res.content)
                }
            })
        } else {
            setCities([])
            setSelectedCity(null)
        }

    }

    const handleMouseEnterPhoto = (index) => {
        setSelectedFiles(prevFiles => {
            var newFiles = [...prevFiles]
            newFiles[index].hover = true
            return newFiles
        })
    }

    const handleMouseLeavePhoto = (index) => {
        setSelectedFiles(prevFiles => {
            var newFiles = [...prevFiles]
            newFiles[index].hover = false
            return newFiles
        })
    }


    const RenderPhotos = () => {
        const imgs = selectedFiles.map((item, i) => (
            <>
                {

                    < div
                        onMouseEnter={() => handleMouseEnterPhoto(i)}
                        onMouseLeave={() => handleMouseLeavePhoto(i)}
                        style={{ position: 'relative', display: 'inline-block' }}>
                        <img

                            style={{ height: "10rem", width: "10rem", objectFit: "contain" }}
                            src={item?.render}
                            srcSet={item?.render}
                            alt={item?.title}
                            loading="lazy"
                        />
                        <Backdrop
                            sx={{
                                position: 'absolute',
                                height: "100%", width: "100%",
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 1,
                                backgroundColor: `rgba(0, 0, 0, ${item?.uploadProgress > 100 ? "0.5" : "0"})`,
                            }}
                            open={true}
                        >
                            {
                                item?.uploadProgress > 100 ? (
                                    <>
                                        <CircularProgress size={80} variant="determinate" value={item?.uploadProgress} />
                                        <Typography sx={{
                                            position: 'absolute'
                                        }} variant="h6" color="text.secondary">
                                            {`${Math.round(item?.uploadProgress)}%`}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        {
                                            item?.hover && (
                                                <IconButton onClick={() => alert("Clicked delete photo")} className="translate-x-4 -translate-y-4" color="inherit" sx={{ position: "absolute", top: 0, right: 0 }}>
                                                    <CloseIcon className="bg-red-500 rounded-full" fontSize="large" />
                                                </IconButton>
                                            )
                                        }
                                    </>

                                )
                            }

                        </Backdrop>
                    </div >
                }
            </>

        ))

        // const imgs_remaining = 1 - selectedFiles.length
        // for (let i = 0; i < imgs_remaining; i++) {
        //     imgs.push(<Box>
        //         <label htmlFor="file-upload">
        //             <Button onClick={handleUploadClick} variant="outlined" sx={{ height: "10rem", cursor: "pointer", width: "10rem" }} color="inherit">
        //                 <AddPhotoAlternateIcon sx={{ scale: "4" }} />
        //             </Button>
        //         </label>

        //     </Box>
        //     )

        if (selectedFiles.length < MIN_MAX_VALUES.listing.media.max) {
            imgs.push(<Box>
                <label htmlFor="file-upload">
                    <Button onClick={handleUploadClick} variant="outlined" sx={{ height: "10rem", cursor: "pointer", width: "10rem" }} color="inherit">
                        <AddPhotoAlternateIcon sx={{ scale: "4" }} />
                    </Button>
                </label>

            </Box>
            )
        }

        return (
            imgs
        )
    }


    return (
        <BaseManagementComponent>
            <div className="flex flex-col mt-4 pb-4">

                <div className="lg:w-[50%] w-full mx-auto items-center flex flex-col h-full gap-16">
                    <div className="w-full text-left">
                        <Typography variant="h5">Essential Information</Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Listing Title"
                            name="title"
                        // value={email}
                        // onChange={e => setEmail(e.target.value)}
                        />

                        <Autocomplete
                            disablePortal
                            fullWidth
                            loading={loadingCats}
                            value={selectedCategory}
                            onChange={(e, newValue) => {
                                setSelectedCategory(newValue)
                            }}
                            getOptionLabel={(option) => option?.name}
                            options={aCategories.filter(obj => !obj.root_category_id && !obj.parent_category_id)}
                            sx={{ marginTop: "28px", marginBottom: "8px" }}
                            renderInput={(params) => <TextField {...params} label="Select a category..."
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loadingCats ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    )
                                }} />}
                        />
                        <Autocomplete
                            disabled={!selectedCategory}
                            loading={loadingCats}
                            disablePortal
                            fullWidth
                            value={selectedSubCategory}
                            onChange={(e, newValue) => {
                                setSelectedSubCategory(newValue)
                            }}
                            groupBy={(option) => {
                                const parent_name = aCategories.find(obj => (obj.id == option.parent_category_id) && option.parent_category_id)
                                return parent_name?.name
                            }}
                            getOptionLabel={(option) => option?.name}
                            options={aCategories.filter(obj => obj.root_category_id == selectedCategory?.id)}
                            sx={{ marginTop: "16px", marginBottom: "8px" }}
                            renderInput={(params) => <TextField {...params} label={!selectedCategory ? "Select a category above first..." : "Select a sub category..."}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loadingCats ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    )
                                }}
                            />}
                        />

                        <Typography fontWeight={"regular"} sx={{ marginTop: "16px" }} variant="h6">Price</Typography>
                        <div className="flex flex-row gap-6 items-center justify-start">

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type="number"

                                id="title"
                                label="Price"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                name="title"
                            // value={email}
                            // onChange={e => setEmail(e.target.value)}
                            />
                            <FormControlLabel sx={{ userSelect: "none" }} control={<Checkbox />} label="Negotiable" />
                        </div>
                    </div>

                    <div className="w-full max-h-full text-left">
                        <Typography variant="h5">Add Photos {`(${selectedFiles.length}/${MIN_MAX_VALUES.listing.media.max})`}</Typography>
                        <Typography className="pb-4" variant="body1">Up to {MIN_MAX_VALUES.listing.mediaFileSize.text} per photo</Typography>
                        <div className="w-full flex flex-col lg:flex-row gap-8 items-center lg:justify-start justify-center lg:flex-wrap">
                            {
                                RenderPhotos()
                            }
                        </div>

                        <input
                            ref={uploadRef}
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="file-upload"
                            hidden
                            multiple
                            type="file"
                            onChange={onFileChange}
                        />



                    </div>
                    <div className="w-full text-left flex flex-col">
                        <Typography variant="h5">Additional information</Typography>



                        <TextField
                            variant="outlined"
                            multiline
                            minRows={4}
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                        // value={email}
                        // onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            multiline
                            minRows={2}
                            margin="normal"
                            fullWidth
                            id="reason"
                            label="Reason for sale (optional)"
                            name="reason"
                        // value={email}
                        // onChange={e => setEmail(e.target.value)}
                        />
                        <FormControl sx={{ marginTop: "16px" }} fullWidth>
                            <InputLabel>Brand</InputLabel>
                            <Select
                                // value={age}
                                label="Brand"
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ marginTop: "16px" }} fullWidth>
                            <InputLabel>Storage Capacity</InputLabel>
                            <Select
                                // value={age}
                                label="Storage Capacity"
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ marginTop: "16px" }} fullWidth>
                            <InputLabel>RAM Memory</InputLabel>
                            <Select
                                // value={age}
                                label="RAM Memory"
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ marginTop: "16px" }} fullWidth>
                            <InputLabel>Screen Size {`(Inches)`}</InputLabel>
                            <Select
                                // value={age}
                                label="Screen Size (Inches)"
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="w-full text-left flex flex-col">
                        <Typography variant="h5">Other</Typography>
                        <Card className="flex flex-col px-4 py-2 mt-4" variant="outlined">
                            <div className="flex lg:flex-row flex-col justify-between items-center">
                                <Typography>Post on behalf of one of my stores</Typography>
                                <Switch onChange={() => setStoreBehalf(!storeBehalf)} checked={storeBehalf} />
                            </div>
                            {
                                storeBehalf ? (
                                    <>
                                        <Autocomplete
                                            disablePortal
                                            fullWidth
                                            loading={loadingStores}
                                            value={selectedStore}
                                            onChange={(e, newValue) => {
                                                setSelectedStore(newValue)
                                            }}
                                            getOptionLabel={(option) => option?.name}
                                            options={gOnlyMyStores()}
                                            sx={{ marginTop: "28px", marginBottom: "8px" }}
                                            renderInput={(params) => <TextField {...params} label="Select a store..."
                                                InputProps={{
                                                    ...params.InputProps,
                                                    endAdornment: (
                                                        <>
                                                            {loadingCats ? (
                                                                <CircularProgress color="inherit" size={20} />
                                                            ) : null}
                                                            {params.InputProps.endAdornment}
                                                        </>
                                                    )
                                                }} />}
                                        />
                                        {
                                            selectedStore?.locations?.length > 0 && (
                                                <Autocomplete
                                                    disabled={!selectedStore}
                                                    loading={loadingStores}
                                                    disablePortal
                                                    fullWidth
                                                    value={selectedStoreLocation}
                                                    onChange={(e, newValue) => {
                                                        setSelectedStoreLocation(newValue)
                                                    }}
                                                    groupBy={(option) => option?.name}
                                                    getOptionLabel={(option) => option?.name}
                                                    options={selectedStore?.locations}
                                                    sx={{ marginTop: "8px", marginBottom: "8px" }}
                                                    renderInput={(params) => <TextField {...params} label={!selectedCategory ? "Select a store location..." : "Select a store location..."}
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <>
                                                                    {loadingCats ? (
                                                                        <CircularProgress color="inherit" size={20} />
                                                                    ) : null}
                                                                    {params.InputProps.endAdornment}
                                                                </>
                                                            )
                                                        }}
                                                    />}
                                                />
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <Autocomplete
                                            disablePortal
                                            fullWidth
                                            value={selectedCity}
                                            onChange={(e, newValue) => {
                                                setSelectedCity(newValue)
                                            }}
                                            getOptionLabel={(option) => option?.name}
                                            onInputChange={handleSearchCities}
                                            options={cities}
                                            sx={{ marginTop: "28px", marginBottom: "8px" }}
                                            renderInput={(params) => <TextField {...params} label="Select a city..." />}
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            type="number"
                                            id="phone"
                                            label="Phone Number"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">+61</InputAdornment>
                                            }}
                                            autoComplete="tel-national"
                                            name="phone"
                                        // value={email}
                                        // onChange={e => setEmail(e.target.value)}
                                        />
                                    </>
                                )
                            }


                        </Card>
                    </div>
                    <LoadingButton
                        fullWidth
                        variant="contained"
                    >
                        Post Listing
                    </LoadingButton>

                </div>
            </div>



        </BaseManagementComponent>
    )
}


export default CreateListingManagementComponent




{/* <Autocomplete
                    disablePortal
                    fullWidth
                    value={selectedCategory}
                    onChange={(e, newValue) => {
                        setSelectedCategory(newValue)
                    }}
                    groupBy={(option) => {
                        const root_name = categories.find(obj => (obj.id == option.root_category_id) && !option.parent_category_id)
                        const parent_name = categories.find(obj => (obj.id == option.parent_category_id) && option.parent_category_id)
                        return root_name?.name || parent_name?.name
                    }}
                    getOptionLabel={(option) => option?.name}
                    options={categories}
                    sx={{ marginTop: "16px", marginBottom: "8px" }}
                    renderInput={(params) => <TextField {...params} label="Select a category..." />}
                    // renderGroup={(params) => {
                    //     const root_name = categories.find(obj => obj.id == params?.group)

                    //     return (
                    //         <li key={params.key}>
                    //             <Typography>{root_name?.name}</Typography>
                    //             <Typography>{params.children}</Typography>
                    //         </li>)
                    // }}
                /> */}