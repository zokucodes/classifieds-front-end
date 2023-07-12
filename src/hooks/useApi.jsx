import { useState } from "react"
import { useGlobalContext } from "../contexts/GlobalContext"
import { CreateStore, GetMyStores, GetStaticData, GetStoreByID } from "../utils/api"

export const useApi = () => {
    const { gLoggedIn, gAddErrors, gAddStores, gAddSnackbar, gSetSnackbarsOpen, setFetched,
        gSetFetchedMyStores, gFetchedMyStores } = useGlobalContext()

    const [categories, setCategories] = useState([])
    const [hCategories, setHCategories] = useState([])
    const [attributes, setAttributes] = useState([])

    async function aGetCategories(type = "GET_ALL_CATEGORIES") {
        if ((categories.length == 0 && type == "GET_ALL_CATEGORIES") || (hCategories.length == 0 && type == "GET_ALL_CATEGORIES_HIERARCHICAL")) {
            var res = await GetStaticData(gAddErrors, { type: type })
            if (res.status == true) {
                if (type == "GET_ALL_CATEGORIES") {
                    res.content.splice(0, 1)
                    setCategories(res.content)
                } else if (type == "GET_ALL_CATEGORIES_HIERARCHICAL") {
                    setHCategories(res.content)
                }

            }
            return res
        }
        return { status: true, content: categories }
    }

    async function aGetAttributesByCategoryID(category_id) {
        const foundAttribute = attributes.find(obj => obj.category_id == category_id)
        if (!foundAttribute) {
            const res = await GetStaticData(gAddErrors, { type: "GET_ATTRIBUTES_BY_CATEGORY_ID", category_id })
            if (res.status == true) {
                setAttributes(res.content)
            }
            return res
        } else {
            return { status: true, content: attributes.filter(obj => obj.category_id == category_id) }
        }
    }

    async function aGetMyStores() {
        if (!gFetchedMyStores) {
            const res = await GetMyStores(gAddErrors)

            if (res.status == true) {
                for (let i = 0; i < res.content.length; i++) {
                    res.content[i].am_i_member = true

                }
                gAddStores(res.content, true)
                gSetFetchedMyStores(true)
                return res
            }
            return res
        }

    }

    async function aGetStoreByID(data) {
        const res = await GetStoreByID(gAddErrors, data)
        if (res.status == true) {
            gAddStores(res.content)
            return res
        }
        return res
    }

    async function aCreateStore(data, progress_function, snack_on_success) {
        const res = await CreateStore(gAddErrors, data)

        if (res.status == true) {
            res.content.am_i_member = true
            gAddStores(res.content)
            if (snack_on_success) {
                gAddSnackbar(res)
            }
            return res
        }
        return res
    }

    return {
        aCategories: categories,
        aHCategories: hCategories,
        aAttributes: attributes,
        aGetAttributesByCategoryID,
        aGetCategories,
        aGetMyStores,
        aCreateStore,
        aGetStoreByID


    }
}