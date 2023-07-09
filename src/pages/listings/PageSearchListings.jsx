import { Autocomplete, CircularProgress, Divider, InputBase, Paper, Popper, TextField, Typography } from "@mui/material"
import MainPageTemplate from "../templates/MainPageTemplate"
import { LoadingButton } from "@mui/lab"
import { useLayoutEffect, useState } from "react";
import { useApiContext } from "../../contexts/ApiContext";
import SearchIcon from '@mui/icons-material/Search';
import RoomIcon from '@mui/icons-material/Room';
import SubjectIcon from '@mui/icons-material/Subject';

const PageSearchListings = () => {
    const { aGetCategories, aCategories } = useApiContext()

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [showCats, setShowCats] = useState(false)

    const [loadingCats, setLoadingCats] = useState(true)

    const [catAnchor, setCatAnchor] = useState(null)

    useLayoutEffect(() => {
        aGetCategories().finally(() => setLoadingCats(false))
    }, [])

    const handleClickCategories = (event) => {
        setCatAnchor(catAnchor ? null : event.currentTarget);
    };

    const open = Boolean(catAnchor);


    return (
        <MainPageTemplate NAV_ENABLED={true} NAV_OPTIONS={{ hideSearchBar: true }}>
            <Paper className='lg:w-[40%] px-4 py-[3px] w-full flex flex-row ml-8 items-center justify-center'>
                <div onClick={handleClickCategories} className="flex flex-row gap-2">
                    <SubjectIcon />
                    <Typography variant="body1">All categories</Typography>
                </div>

                <div className="flex flex-col">

                    <Popper
                        sx={{ width: "10%" }}
                        open={open}
                        anchorEl={catAnchor}
                    >
                        {
                            !showCats && (
                                <Autocomplete
                                    loading={loadingCats}
                                    disablePortal
                                    fullWidth
                                    value={selectedCategory}
                                    onChange={(e, newValue) => {
                                        setSelectedCategory(newValue)
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
                            )
                        }
                    </Popper>

                </div>

                <Divider sx={{ height: 28, marginX: 2, marginY: 0.5 }} orientation="vertical" />
                <InputBase
                    sx={{ flex: 1 }}
                    placeholder={"test"}
                />

                <SearchIcon />
                <Divider sx={{ height: 28, marginX: 2, marginY: 0.5 }} orientation="vertical" />
                <div >
                    <InputBase
                        sx={{ flex: 1 }}
                        placeholder="Australia"
                    />

                </div>
                <RoomIcon />


            </Paper>
            <LoadingButton sx={{ marginLeft: 1 }} variant='contained'>Search</LoadingButton>
        </MainPageTemplate>
    )

}

export default PageSearchListings