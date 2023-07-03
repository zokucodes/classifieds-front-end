import { Autocomplete, Avatar, Backdrop, Box, Button, CircularProgress, ImageList, ImageListItem, TextField, Typography } from "@mui/material"
import BaseManagementComponent from "./BaseManagementComponent"
import React, { useLayoutEffect, useRef, useState } from "react"
import ListingContainer from "../listings/ListingContainer"
import CreateIcon from '@mui/icons-material/Create';
import { useGlobalContext } from "../../contexts/GlobalContext";
import { ChangeKeyName, FileChange } from "../../utils/misc";
import Grid from '@mui/material/Unstable_Grid2';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useApiContext } from "../../contexts/ApiContext";

const CreateListingManagementComponent = () => {
    window.history.replaceState(null, "Create New Listing", "/app/manage/listings")

    const { gAddErrors } = useGlobalContext()
    const { aGetCategories, aCategories } = useApiContext()

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedSubCategory, setSelectedSubCategory] = useState(null)

    const [selectedFiles, setSelectedFiles] = useState([])

    const [loadingCats, setLoadingCats] = useState(true)

    const uploadRef = useRef(null)

    const onFileChange = (e) => {
        e.stopPropagation()
        e.preventDefault()

        if (selectedFiles.length > 5) {
            gAddErrors({ msg: "Only a maximum of 5 files are allowed" })
            uploadRef.current.value = null
            return
        }

        FileChange(e, undefined, ['image'], 5 - selectedFiles.length).then(res => {
            if (res.status == true) {
                setSelectedFiles([...selectedFiles, ...res.content])
            } else {
                gAddErrors(res.error)
            }

            uploadRef.current.value = null
        })


    }

    const handleUploadClick = (e) => {
        e.stopPropagation()
        //e.preventDefault()
        uploadRef.current.click()
    }

    useLayoutEffect(() => {
        aGetCategories().finally(() => setLoadingCats(false))

    }, [])


    const RenderPhotos = () => {
        const imgs = selectedFiles.map((item) => (
            <>
                {
                    item?.uploadProgress < 100 && (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
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
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                }}
                                open={true}
                            >
                                <CircularProgress size={80} variant="determinate" value={100} />
                                <Typography sx={{
                                    position: 'absolute'
                                }} variant="h6" color="text.secondary">
                                    {`${Math.round(100)}%`}
                                </Typography>
                            </Backdrop>
                        </div>
                    )
                }
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                </Box>
            </>

        ))

        const imgs_remaining = 5 - selectedFiles.length
        for (let i = 0; i < imgs_remaining; i++) {
            imgs.push(<Box>
                <label htmlFor="file-upload">
                    <Button onClick={handleUploadClick} variant="outlined" sx={{ height: "10rem", width: "10rem" }} color="inherit">
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
        <BaseManagementComponent title={"Create New Listing"}>
            <div className="flex flex-col mt-4">

                <div className="w-full justify-center items-center flex flex-col flex-wrap gap-8 overflow-y-auto">
                    <div className="w-[30%]">
                        <Typography variant="h5">Select a category</Typography>
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
                            sx={{ marginTop: "16px", marginBottom: "8px" }}
                            renderInput={(params) => <TextField {...params} label="Select a category..."
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loadingCats ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
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
                                        <React.Fragment>
                                            {loadingCats ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    )
                                }}
                            />}
                        />
                    </div>

                    <div className="w-[69%]">
                        <Typography className="pb-4" variant="h5">Add Photos</Typography>

                        <Grid
                            container spacing={{ xs: 2, md: 3 }} gap={4} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {
                                RenderPhotos()
                            }
                        </Grid>
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