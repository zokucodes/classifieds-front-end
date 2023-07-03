import { Autocomplete, Chip, CircularProgress, TextField, Typography } from "@mui/material"
import { BaseModal } from "../common/BaseModal"
import { LoadingButton } from "@mui/lab"
import { useApiContext } from "../../contexts/ApiContext"
import React, { useLayoutEffect, useRef, useState } from "react"
import { IsValueInRange } from "../../utils/misc"
import { MIN_MAX_VALUES } from "../../utils/values"

export const CreateStoreModal = () => {

    const { aCategories, aGetCategories, aCreateStore } = useApiContext()

    const [selectedCategories, setSelectedCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const [loadingCreate, setLoadingCreate] = useState(false)

    const [loading, setLoading] = useState(true)

    const [catError, setCatError] = useState(false)

    const modalRef = useRef(null)

    useLayoutEffect(() => {
        aGetCategories().finally(() => setLoading(false))

    }, [])

    const handleClickCategory = (e, newValue) => {
        e.stopPropagation()
        e.preventDefault()
        if (selectedCategories.length > 0) {
            if (!IsValueInRange(MIN_MAX_VALUES.store.categories.min, MIN_MAX_VALUES.store.categories.max, selectedCategories.length + 1)) {
                setCatError(true)
                return
            }
        }
        setCatError(false)
        setSelectedCategories(newValue)


    }

    const handleClickCreateStore = (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (!IsValueInRange(MIN_MAX_VALUES.store.categories.min, MIN_MAX_VALUES.store.categories.max, selectedCategories.length)) {
            setCatError(true)
            return
        }
        setLoadingCreate(true)

        const idArray = selectedCategories.map(obj => obj.id)

        aCreateStore({
            name: name,
            description: description,
            categories: idArray
        }, null, true)
            .then(res => {
                if (res.status == true) {
                    modalRef.current.onClose()
                }
            })
            .finally(() => {
                setLoadingCreate(false)
            })

    }

    return (
        <BaseModal ref={modalRef} heading={{
            title: "Create New Store",
            subtitle: {
                text: (
                    <>
                        <Typography
                            sx={{ textAlign: "center" }}
                            variant="h6" fontWeight={"regular"}>Note: Store will not be published upon creation. This must be done manually.</Typography>
                    </>

                ),
            }
        }}
            bottomElements={<LoadingButton
                loading={loadingCreate}
                onClick={handleClickCreateStore}
                fullWidth variant="contained">
                Create New Store
            </LoadingButton>}
        >
            <div>
                <TextField
                    value={name}
                    onChange={e => setName(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Store Name"
                    name="name"
                />
                <TextField
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                />
                <Autocomplete
                    disablePortal
                    fullWidth
                    multiple
                    loading={loading}
                    value={selectedCategories}
                    onChange={handleClickCategory}
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                            <Chip
                                label={option?.name}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    groupBy={(option) => {
                        const root_name = aCategories.find(obj => (!obj.root_category_id && !obj.parent_category_id) && option?.root_category_id == obj.id)
                        return root_name?.name
                    }}
                    getOptionLabel={(option) => option?.name}
                    options={aCategories}
                    sx={{ marginTop: "16px", marginBottom: "8px" }}
                    renderInput={(params) => <TextField
                        error={catError}
                        helperText={catError && `You must select ${MIN_MAX_VALUES.store.categories.min}-${MIN_MAX_VALUES.store.categories.max} categories`} {...params} label={"Select categories"}

                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            )
                        }}

                    />}
                />
            </div>



        </BaseModal>
    )
}