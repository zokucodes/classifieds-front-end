import { useEffect, useState } from 'react';
import { MakeID, getCookie } from '../utils/misc';
import { Alert, Snackbar } from '@mui/material';

const c_sessionID = getCookie('sessionID')

export const useGlobal = () => {


    const [isLoggedIn, setIsLoggedIn] = useState(c_sessionID ? true : false)

    const [isMobile, setIsMobile] = useState(false)
    const [errors, setErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    const [colorMode, setColorMode] = useState('light')

    const [items, setItems] = useState([])
    const [snackbars, setSnackbars] = useState([])
    const [snackbarsOpen, setSnackbarsOpen] = useState(false)


    const [stores, setStores] = useState([])
    const [fetchedMyStores, setFetchedMyStores] = useState(false)

    const [listings, setListings] = useState([])

    const gCloseSnackbars = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarsOpen(false);
    }


    //#region Global stuff
    const gToggleColorMode = () => {
        setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }

    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        handleResize()
    }, [])

    useEffect(() => {
        window.addEventListener("resize", handleResize)


        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, [isMobile])

    const gAddSnackbar = (data, autoHideDuration = 6000) => {
        setSnackbarsOpen(true)

        setSnackbars([...snackbars, (
            <Snackbar open={snackbarsOpen} autoHideDuration={autoHideDuration} onClose={gCloseSnackbars}>
                <Alert onClose={gCloseSnackbars} severity={data?.status ? "success" : "error"} sx={{ width: '100%' }}>
                    {data?.message || "null"}
                </Alert>
            </Snackbar>
        )]);

    }

    const gAddItems = (items_to_add, position = "START") => {
        if (!Array.isArray(items_to_add)) {
            items_to_add = [items_to_add]
        }
        if (position) {
            setItems([items_to_add, ...items]);
        } else {
            setItems([...items, items_to_add]);
        }

    }

    const gSetItems = (items_to_add) => {
        if (Array.isArray(items_to_add)) {
            setItems(items_to_add)
        } else {
            setItems([items_to_add])
        }

    }

    const gClearItems = () => {
        setItems([])
        setShowErrors(false)
    }

    const gAddErrors = (errors_to_add) => {

        if (!Array.isArray(errors_to_add)) {
            errors_to_add = [errors_to_add]
        }
        for (let i = 0; i < errors_to_add.length; i++) {
            errors_to_add[i].id = MakeID(5)

        }
        setErrors([...errors_to_add, ...errors]);
        setShowErrors(true)
    }

    const gRemoveErrorByID = (id) => {
        setShowErrors(false)
        setErrors((prevErrors) => {
            var newErrors = [...prevErrors]
            var filterederrs = newErrors.filter(obj => obj.id != id)
            return filterederrs
        });
    }

    const gClearErrors = () => {
        setErrors([])
        setShowErrors(false)
    }

    //#endregion




    // useEffect(() => {
    //     setStores([
    //         {
    //             icon_url: "https://img.freepik.com/premium-vector/online-shop-logo-design-template-perfect-ecommerce-sale-store-shop-discount-web_695238-64.jpg",
    //             name: "Quick Shop",
    //             description: "From household items to server equipment, we’ve got you covered!",
    //             active_listings_count: 100,
    //             categories: [{ name: "Home & Garden" }, { name: "Clothing & Jewellery" }, { name: "Electronics & Computer" }],
    //             status: "UNPUBLISHED"
    //         },
    //         {
    //             icon_url: "https://img.freepik.com/free-vector/creative-gradient-laptop-logo-template_23-2149010269.jpg",
    //             name: "TECHLOGO",
    //             active_listings_count: 12,
    //             categories: [{ name: "Electronics & Computer" }],
    //             status: "PUBLISHED"
    //         }
    //     ])
    // }, [])

    //#region Stores

    function gGetStoreIndexByID(store_id) {
        for (let i = 0; i < stores.length; i++) {
            if (stores[i].id == store_id) {
                return i
            }

        }
        return null
    }

    function gGetListingIndexByID(listing_id) {
        for (let i = 0; i < listings.length; i++) {
            if (listings[i].id == listing_id) {
                return i
            }

        }
        return null
    }

    function gAddStores(data, replaceMine = false) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        setStores((prevStores) => {
            var newStores = [...prevStores];
            if (replaceMine) {
                newStores = newStores.filter(obj => !obj?.am_i_member)
            }


            for (var store of data) {
                let foundStore = false;
                for (let i = 0; i < newStores.length; i++) {
                    if (newStores[i].id === store.id) {
                        newStores[i] = store;
                        foundStore = true;
                        break;
                    }
                }
                if (!foundStore) {
                    newStores.unshift(store);
                }
            }
            return newStores;
        });
    }

    function gAddListings(data, replaceMine = false) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        setListings((prevStores) => {
            var newStores = [...prevStores];
            if (replaceMine) {
                newStores = newStores.filter(obj => !obj?.am_i_member)
            }


            for (var store of data) {
                let foundStore = false;
                for (let i = 0; i < newStores.length; i++) {
                    if (newStores[i].id === store.id) {
                        newStores[i] = store;
                        foundStore = true;
                        break;
                    }
                }
                if (!foundStore) {
                    newStores.unshift(store);
                }
            }
            return newStores;
        });
    }


    function gOnlyMyStores() {
        return stores.filter(obj => obj?.am_i_member == true)
    }


    function gRemoveStoreByID(id) {
        setStores(prevStores => {
            var newStores = [...prevStores]
            for (let i = 0; i < newStores.length; i++) {
                if (newStores[i].id == id) {
                    newStores.splice(i, 1)
                    break
                }

            }

            return newStores
        })
    }

    //#endregion


    return (
        {
            isMobile,
            gLoggedIn: isLoggedIn,
            gSetLoggedIn: setIsLoggedIn,

            gErrors: errors,
            gItems: items,
            gAddItems,
            gSetItems,
            gClearItems,

            gSnackbars: snackbars,
            gAddSnackbar,
            gSnackbarsOpen: snackbarsOpen,
            gSetSnackbarsOpen: setSnackbarsOpen,

            gShowErrors: showErrors,
            gSetShowErrors: setShowErrors,
            gAddErrors,
            gRemoveErrorByID,
            gClearErrors,

            gColorMode: colorMode,
            gSetColorMode: setColorMode,
            gToggleColorMode,

            gOnlyMyStores,
            gFetchedMyStores: fetchedMyStores,
            gSetFetchedMyStores: setFetchedMyStores,
            gStores: stores,
            gAddStores,
            gRemoveStoreByID,
            gGetStoreIndexByID,

            gAddListings,
            gListings: listings,
            gGetListingIndexByID

        }
    );
};


export default useGlobal;
