import { useState } from "react"
import { useGlobalContext } from "../contexts/GlobalContext"
import { CreateStore, GetMyStores, GetStaticData } from "../utils/api"

export const useApi = () => {
    const { gLoggedIn, gAddErrors, gAddStores, gAddSnackbar, gSetSnackbarsOpen, setFetched,
        gSetFetchedMyStores, gFetchedMyStores } = useGlobalContext()

    const [categories, setCategories] = useState([])

    async function aGetCategories() {
        if (categories.length == 0) {
            var res = await GetStaticData(gAddErrors, { type: "GET_ALL_CATEGORIES" })
            if (res.status == true) {
                res.content.splice(0, 1)
                setCategories(res.content)
            }
            return res
        }
        return { status: true, content: categories }
    }

    async function aGetMyStores() {
        if (!gFetchedMyStores) {
            const res = await GetMyStores(gAddErrors)

            if (res.status == true) {
                gAddStores(res.content)
                gSetFetchedMyStores(true)
                return res
            }
            return res
        }

    }

    async function aCreateStore(data, progress_function, snack_on_success) {
        const res = await CreateStore(gAddErrors, data)

        if (res.status == true) {
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
        aGetCategories,
        aGetMyStores,
        aCreateStore


    }
}