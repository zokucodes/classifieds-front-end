import { Avatar, Box, Button, CircularProgress, InputBase, Paper, TextField, Typography } from "@mui/material"
import BaseManagementComponent from "./BaseManagementComponent"
import { useEffect, useLayoutEffect, useState } from "react"
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import StoreContainer from "../stores/StoreContainer";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { CompareStringsIgnoringPunctuation } from "../../utils/misc";
import { CreateStoreModal } from "../stores/CreateStoreModal";
import { useApiContext } from "../../contexts/ApiContext";


const UserStoresManagementComponent = () => {
    window.history.replaceState(null, "My Stores", "/app/manage/stores")

    const { gStores, gOnlyMyStores, gAddItems } = useGlobalContext()
    const { aGetMyStores } = useApiContext()

    const [loadingStores, setLoadingStores] = useState(true)

    const [searchText, setSearchText] = useState("")

    const [stores, setStores] = useState(gOnlyMyStores() || [])

    useLayoutEffect(() => {
        aGetMyStores().finally(() => {
            setLoadingStores(false)
        })
    }, [])




    const filterStoresBySearchQuery = () => {
        setStores(prevStores => {
            var newStores = [...prevStores]
            const stext = searchText.trim().toLowerCase()
            return newStores.filter(obj => {
                if (CompareStringsIgnoringPunctuation(obj.name, stext) || CompareStringsIgnoringPunctuation(obj?.description, stext)) {
                    return true
                } else {
                    if (!Array.isArray(obj?.categories)) {
                        return false
                    } else {
                        for (var category of obj.categories) {
                            if (CompareStringsIgnoringPunctuation(category.name, stext)) {
                                return true
                            }
                        }
                        return false
                    }

                }
            })
        })
    }
    useEffect(() => {
        if (searchText.trim().length > 0) {
            filterStoresBySearchQuery()
        } else {
            setStores(gOnlyMyStores())
        }

    }, [searchText])

    useEffect(() => {

        setStores(gOnlyMyStores())

    }, [gStores])

    const handleClickCreateStore = (e) => {
        e.stopPropagation()
        e.preventDefault()
        gAddItems(<CreateStoreModal />)
    }



    return (
        <BaseManagementComponent>
            <div style={{ marginBottom: 2, marginLeft: 1 }} className="w-full flex gap-8">
                <Typography textAlign={"left"} variant="h4">My Stores</Typography>
                <Button onClick={handleClickCreateStore} startIcon={<CreateIcon />} variant="contained" color="primary" sx={{ minWidth: 'fit-content' }}>
                    Create New Store
                </Button>
            </div>


            <Paper elevation={3} variant="outlined" className=' px-4 py-2 w-full flex flex-row mx-auto mt-8 items-center justify-center'>
                <InputBase
                    sx={{ flex: 1 }}
                    placeholder={"Search my stores..."}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />

                <SearchIcon />


            </Paper>


            <div style={{ overflow: loadingStores ? "hidden" : "auto" }} className="mt-8 w-full justify-start items-start flex flex-row flex-wrap gap-4 overflow-y-auto">
                {
                    stores.length > 0 ? (
                        stores.map(data => (
                            <StoreContainer key={data?.id} store={data} />

                        ))
                    ) : loadingStores ? (
                        <Box className="w-full items-center justify-center h-full" sx={{ display: 'flex' }}>
                            <CircularProgress size={80} />
                        </Box>
                    ) : ("No stores")
                }

            </div>


        </BaseManagementComponent>
    )
}

export default UserStoresManagementComponent