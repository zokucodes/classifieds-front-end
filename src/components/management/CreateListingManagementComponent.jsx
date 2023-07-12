import { Autocomplete, Avatar, Backdrop, Box, Button, Card, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, IconButton, ImageList, ImageListItem, InputAdornment, InputLabel, MenuItem, Select, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
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
import { MIN_MAX_VALUES, VALID_VALUES } from "../../utils/values";
import { SearchLocations } from "../../utils/api";

const CreateListingManagementComponent = () => {
    window.history.replaceState(null, "Create New Listing", "/app/manage/listings")

    const { gAddErrors, gOnlyMyStores, isMobile } = useGlobalContext()
    const { aGetCategories, aCategories, aGetMyStores, aGetAttributesByCategoryID } = useApiContext()

    const [cities, setCities] = useState([])
    const [attributes, setAttributes] = useState([])


    const [searchCitiesText, setSearchCitiesText] = useState("")

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedSubCategory, setSelectedSubCategory] = useState(null)

    const [selectedAttrOptions, setSelectedAttrOptions] = useState([])

    const [selectedStore, setSelectedStore] = useState(null)
    const [selectedStoreLocation, setSelectedStoreLocation] = useState(null)





    //Essential
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(null)
    const [negotiable, setNegotiable] = useState(false)

    //Photos
    const [selectedFiles, setSelectedFiles] = useState([])

    //Additional
    const [description, setDescription] = useState("")
    const [condition, setCondition] = useState(null)
    const [reason, setReason] = useState(null)
    const [reasonText, setReasonText] = useState("")

    //Store behalf
    const [storeBehalf, setStoreBehalf] = useState(false)

    //Individual sale
    const [selectedCity, setSelectedCity] = useState(null)
    const [phone, setPhone] = useState("")

    const [fieldState, setFieldState] = useState({});

    const handleFocus = (fieldName) => {
        setFieldState((prevFieldState) => ({
            ...prevFieldState,
            [fieldName]: true,
        }));
    };

    const handleBlur = (fieldName) => {
        setFieldState((prevFieldState) => ({
            ...prevFieldState,
            [fieldName]: false,
        }));
    };






    const [loadingCats, setLoadingCats] = useState(true)
    const [loadingStores, setLoadingStores] = useState(false)
    const [loadedStores, setLoadedStores] = useState(false)

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

    const handleToggleStoreBehalf = (e) => {
        e.stopPropagation()

        if (storeBehalf) {
            setSelectedStore(null)
            setSelectedStoreLocation(null)
        }
        setStoreBehalf(!storeBehalf)

        if (!loadedStores) {
            setLoadingStores(true)
            aGetMyStores(res => {
                if (res.status == true) {
                    setLoadedStores(true)
                }

            }).finally(() => {
                setLoadingStores(false)
            })
        }


    }

    const handleChangeSubcategory = (e, newValue) => {
        if (selectedSubCategory != newValue) {
            if (newValue) {
                aGetAttributesByCategoryID(newValue.id).then(res => {
                    if (res.status == true) {
                        setAttributes(res.content)
                    }
                })
            }
            setSelectedAttrOptions([])
            setSelectedSubCategory(newValue)

        }



    }

    const handleSelectAttrOption = (e) => {
        const foundAttr = selectedAttrOptions.find(obj => obj == e.target.value)
        if (!foundAttr) {
            setSelectedAttrOptions([...selectedAttrOptions, e.target.value])
        }

    }

    const handleChangePrice = (e) => {
        e.preventDefault()

        if (e.target.value > MIN_MAX_VALUES.listing.price.max) {
            setFieldState({ ...fieldState, price: "Super high prices will be reviewed :)" })
        } else {
            setFieldState({ ...fieldState, price: "" })
        }
        //setPrice(Number(e.target.value).toFixed(2))
        setPrice(e.target.value)


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
                                            item?.hover || isMobile && (
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
            <div className="flex flex-col mt-4 pb-16">

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
                            value={title}
                            helperText={fieldState.title ? 'Enter a short and descriptive title for your listing' : ''}
                            onFocus={() => handleFocus('title')}
                            onBlur={() => handleBlur('title')}

                            onChange={e => setTitle(e.target.value)}
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
                            onChange={handleChangeSubcategory}
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

                        <div className="flex flex-col lg:flex-row w-full">
                            <div className="flex flex-col w-full">
                                <Typography fontWeight={"regular"} sx={{ marginTop: "16px" }} variant="h6">Price</Typography>
                                <div className="flex flex-row gap-6 items-center justify-start">

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        type="number"

                                        id="price"
                                        label="Price"
                                        inputProps={{
                                            step: 0.05,
                                            min: 0
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}

                                        name="price"
                                        value={price}
                                        onChange={handleChangePrice}
                                        helperText={fieldState.price || ''}
                                        onFocus={() => handleFocus('price')}
                                        onBlur={() => handleBlur('price')}
                                    />
                                    <FormControlLabel sx={{ userSelect: "none" }} control={<Checkbox checked={negotiable} onChange={() => setNegotiable(!negotiable)} />} label="Negotiable" />
                                </div>

                            </div>
                            <div className="w-full">
                                <Typography fontWeight={"regular"} sx={{ marginTop: "16px" }} variant="h6">Payment Method</Typography>
                                <FormControl required sx={{ marginTop: "16px" }} fullWidth>
                                    <InputLabel>Payment Method</InputLabel>
                                    <Select
                                        value={reason}
                                        label="Payment Method"
                                        onChange={(e) => setReason(e.target.value)}
                                    >
                                        {
                                            VALID_VALUES.listingPaymentMethods.map((option, i) => (
                                                <MenuItem key={`paymentMethod.${i}`} value={option.id}>{option.text}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <Typography fontWeight={"regular"} sx={{ marginTop: "16px" }} variant="h6">Condition</Typography>
                        <ToggleButtonGroup
                            sx={{ marginTop: "16px" }}
                            value={condition}
                            exclusive
                            onChange={(e, newValue) => setCondition(newValue)}
                        >
                            {
                                VALID_VALUES.listingConditions.map((option, i) => (
                                    <ToggleButton color="primary" key={`condition.${i}`} value={option.id}>{option.text}</ToggleButton>
                                ))
                            }
                        </ToggleButtonGroup>

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
                            id="fileUpload"
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
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            helperText={fieldState.description ? 'To get you started, here are some things you can talk about: Issues with the item (if any), sale conditions, warranty' : ''}
                            onFocus={() => handleFocus('description')}
                            onBlur={() => handleBlur('description')}
                        />
                        <FormControl sx={{ marginTop: "16px" }} fullWidth>
                            <InputLabel>Reason for sale {"(optional)"}</InputLabel>
                            <Select
                                value={reason}
                                label="Reason for sale (optional)"
                                onChange={(e) => setReason(e.target.value)}
                            >
                                {
                                    VALID_VALUES.listingReasons.map((option, i) => (
                                        <MenuItem key={`reason.option.${i}`} value={option.id}>{option.text}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            multiline
                            minRows={2}
                            margin="normal"
                            fullWidth
                            id="reason"
                            label="Describe reason for sale (optional)"
                            name="reason"
                            value={reasonText}
                            onChange={e => setReasonText(e.target.value)}
                            helperText={fieldState.reasonText ? '(Optional) Provide some information about why you are selling your item' : ''}
                            onFocus={() => handleFocus('reasonText')}
                            onBlur={() => handleBlur('reasonText')}
                        />


                    </div>


                    {
                        attributes.length > 0 && (
                            <div className="w-full text-left flex flex-col">
                                <Typography variant="h5">Specific information {"(optional)"}</Typography>
                                {
                                    attributes.map((data, i) => (
                                        <FormControl key={`attribute.${data?.attribute_id}`} sx={{ marginTop: "16px" }} fullWidth>
                                            <InputLabel>{data?.name}</InputLabel>
                                            <Select
                                                label={data?.name}
                                                onChange={handleSelectAttrOption}
                                            >
                                                {
                                                    data.options.map(option => (
                                                        <MenuItem key={`attribute.option.${option?.id}`} value={option.id}>{option.text}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    ))
                                }
                            </div>
                        )
                    }

                    <div className="w-full text-left flex flex-col">
                        <Typography variant="h5">Other</Typography>
                        <Card className="flex flex-col px-4 py-2 mt-4" variant="outlined">
                            <div className="flex lg:flex-row flex-col justify-between items-center">
                                <Typography>Post on behalf of one of my stores</Typography>
                                <Switch onChange={handleToggleStoreBehalf} checked={storeBehalf} />
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
                                            value={phone}
                                            onChange={e => {
                                                if (e.target.value.length < 11) {
                                                    setPhone(e.target.value)
                                                }

                                            }}
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



        </BaseManagementComponent >
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