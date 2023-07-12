import axios from 'axios'
import validator from 'validator'
import { DEBUG_VALUES, DEBUG_WTC } from './debug'
import { DateInRange, FilterObjectByList, IsValueInRange } from './misc'
import { GetValidDOBRange, MIN_MAX_VALUES, VALID_VALUES } from './values'

const ENV_API_URL = import.meta.env.VITE_API_URL

function HandleAPIError(res, addError, message = { color: DEBUG_VALUES.console.colors.bred, type: DEBUG_VALUES.console.types.error, message: "Unspecified Error" }) {
    if (!message?.color) {
        message.color = DEBUG_VALUES.console.colors.bred
    }

    if (!message?.type) {
        message.type = DEBUG_VALUES.console.types.error
    }

    if (!message?.message) {
        message.message = "Unspecified Error"
    }

    if (typeof res?.response?.data?.error !== 'undefined' && res?.response?.data) {
        for (let i = 0; i < res.response.data.error.length; i++) {
            res.response.data.error[i].code = res?.response?.status

        }
        addError(res.response.data.error)
        DEBUG_WTC(message.type, message.message, message.color, res.response.data, res)
        return { status: false, error: [{ msg: message?.message }] }
    } else if (!res?.response?.data) {
        addError([{ msg: "Cannot reach server", code: null }])
        DEBUG_WTC(message.type, "Cannot reach server", message.color, res, res)
        return { status: false, error: [{ msg: "Cannot reach server" }] }
    } else {
        addError([{ msg: res?.message ? res.message : "Unspecified Error", code: res?.response?.status }])
        DEBUG_WTC(message.type, message.message, message.color, res, res)
        return { status: false, error: [{ msg: res?.message ? res.message : "Unspecified Error" }] }
    }

}


export async function Login(addError, DATA) {
    try {

        try {
            var errs = []

            if (typeof DATA?.email !== 'string') {
                errs.push({ code: 400, msg: `Email must be a string` })
            } else if (!validator.isEmail(DATA.email)) {
                errs.push({ code: 400, msg: `Email is not in the right format` })


            } else {
                if (typeof DATA?.password !== 'string') {
                    errs.push({ code: 400, msg: `Password must be a string` })
                } else if (validator.isEmpty(DATA.password)) {
                    errs.push({ code: 400, msg: `Password cannot be empty` })
                }
            }


            if (errs.length > 0) {
                addError(errs)
                return { status: false, error: errs }
            }

        } catch (err) {
            return { status: false, error: [{ msg: "Unspecified error" }] }
        }

        const dataToSend = FilterObjectByList(DATA, ['email', 'password'])
        let res = await axios.post(`${ENV_API_URL}/auth/login`, dataToSend, { withCredentials: true })
        DEBUG_WTC(DEBUG_VALUES.console.types.auth, `User logged in as ${DATA?.email}`, DEBUG_VALUES.console.colors.green)
        return res.data
    } catch (err) {
        return HandleAPIError(err, addError, { message: `Failed to login as user ${DATA?.email}`, type: DEBUG_VALUES.console.types.auth }, err?.response?.status)
    }
}


export async function VerifyEmail(addError, DATA) {
    try {

        try {
            var errs = []

            if (typeof DATA?.token !== 'string') {
                errs.push({ code: 400, msg: `Token must be a string` })
            } else if (validator.isEmpty(DATA?.token)) {
                errs.push({ code: 400, msg: "Token not set. Maybe you didn't copy the entire link?" })
            }


            if (errs.length > 0) {
                AddErrorArrayToContext(errs, addError)
                return { status: false, error: errs }
            }

        } catch (err) {
            return { status: false, error: [{ msg: "Unspecified error" }] }
        }
        const dataToSend = FilterObjectByList(DATA, [
            'token'])
        const res = await axios.post(`${ENV_API_URL}/auth/VerifyEmail`, dataToSend, { withCredentials: true })
        DEBUG_WTC(DEBUG_VALUES.console.types.auth, `Verified email successfully`, DEBUG_VALUES.console.colors.green)
        return res.data
    } catch (err) {
        return HandleAPIError(err, addError, { message: `Failed to verify email`, type: DEBUG_VALUES.console.types.auth }, err?.response?.status)
    }
}

export async function Register(addError, DATA) {
    try {

        try {
            var errs = []

            //first_name
            if (typeof DATA?.first_name !== 'string') {
                errs.push({ code: 400, msg: `First name must be a string` })
            } else if (DATA.first_name.length == 0 || DATA.first_name.length > 20) {
                errs.push({ code: 400, msg: `First name must be 1-20 characters long` })
            } else if (!(/^[a-zA-Z ]*$/.test(DATA.first_name))) {
                errs.push({ code: 400, msg: `First name can only contain letters and spaces` })
            }

            //last_name
            if (typeof DATA?.last_name !== 'string') {
                errs.push({ code: 400, msg: `Last name must be a string` })
            } else if (DATA.last_name.length == 0 || DATA.last_name.length > 50) {
                errs.push({ code: 400, msg: `Last name must be 1-50 characters long` })
            } else if (!(/^[a-zA-Z ]*$/.test(DATA.last_name))) {
                errs.push({ code: 400, msg: `Last name can only contain letters and spaces` })
            }

            if (typeof DATA?.email !== 'string') {
                errs.push({ code: 400, msg: `Email must be a string` })
            } else if (!validator.isEmail(DATA.email)) {
                errs.push({ code: 400, msg: `Email is not in the right format` })


            } else {
                if (typeof DATA?.password !== 'string') {
                    errs.push({ code: 400, msg: `Password must be a string` })
                } else if (DATA.password.length < 8 || DATA.password.length > 255) {
                    errs.push({ code: 400, msg: `Password must be 8-255 characters long` })
                } else {
                    if (DATA?.confirm_password != DATA.password) {
                        errs.push({ code: 400, msg: `Confirm password does not match` })
                    }
                }
            }

            if (!Number.isSafeInteger(DATA?.state_id)) {
                errs.push({ code: 400, msg: `State ID must be an integer` })
            }

            const validDOBRange = GetValidDOBRange()

            if (!DateInRange(validDOBRange.min, validDOBRange.max, DATA?.birth_date)) {
                errs.push({ code: 400, msg: `Date of birth must be between ${validDOBRange.min.getFullYear()} and ${validDOBRange.max.getFullYear()}.` })
            }


            if (errs.length > 0) {
                addError(errs)
                return { status: false, error: errs }
            }

        } catch (err) {
            return { status: false, error: [{ msg: "Unspecified error" }] }
        }

        const dataToSend = FilterObjectByList(DATA, [
            'email',
            'password',
            'confirm_password',
            'first_name',
            'last_name',
            'birth_date',
            'state_id'
        ])
        const res = await axios.post(`${ENV_API_URL}/auth/register`, dataToSend, { withCredentials: true })
        DEBUG_WTC(DEBUG_VALUES.console.types.auth, `User registered successfully as ${DATA?.email}`, DEBUG_VALUES.console.colors.green)
        return res.data
    } catch (err) {
        return HandleAPIError(err, addError, { message: `Failed to register user ${DATA?.email}`, type: DEBUG_VALUES.console.types.auth }, err?.response?.status)
    }
}


export async function SearchLocations(addError, DATA) {
    try {

        try {
            var errs = []

            if (typeof DATA?.query !== 'string') {
                errs.push({ code: 400, msg: `Query must be a string` })
            } else if (validator.isEmpty(DATA?.query)) {
                errs.push({ code: 400, msg: "Query cannot be empty" })
            }

            if (typeof DATA?.type === 'string') {
                if (!VALID_VALUES.searchLocations.type.includes(DATA?.type)) {
                    errs.push({ code: 400, msg: `Query must be a string` })
                }
            }

            if (typeof DATA?.country_id !== 'undefined') {
                if (!Number.isSafeInteger(DATA?.country_id)) {
                    errs.push({ code: 400, msg: "Country ID must be an integer" })
                }
            }


            if (errs.length > 0) {
                AddErrorArrayToContext(errs, addError)
                return { status: false, error: errs }
            }

        } catch (err) {
            return { status: false, error: [{ msg: "Unspecified error" }] }
        }
        const dataToSend = FilterObjectByList(DATA, [
            'type',
            'country_id',
            'query'
        ])
        const res = await axios.get(`${ENV_API_URL}/utils/SearchLocations`, { params: dataToSend })
        DEBUG_WTC(DEBUG_VALUES.console.types.auth, `Fetched ${res.data.content.length} locations`, DEBUG_VALUES.console.colors.green)
        return res.data
    } catch (err) {
        return HandleAPIError(err, addError, { message: `Failed to fetch locations`, type: DEBUG_VALUES.console.types.auth }, err?.response?.status)
    }
}



export async function ForgotPassword(addError, DATA) {
    try {

        try {
            var errs = []

            if (typeof DATA?.email !== 'string') {
                errs.push({ code: 400, msg: `Email must be a string` })
            } else if (!validator.isEmail(DATA.email)) {
                errs.push({ code: 400, msg: `Email is not in the right format` })
            }



            if (errs.length > 0) {
                AddErrorArrayToContext(errs, addError)
                return { status: false, error: errs }
            }

        } catch (err) {
            return { status: false, error: [{ msg: "Unspecified error" }] }
        }
        const dataToSend = FilterObjectByList(DATA, [
            'email'
        ])
        const res = await axios.post(`${ENV_API_URL}/auth/ForgotPassword`, dataToSend)
        DEBUG_WTC(DEBUG_VALUES.console.types.auth, `Send password reset request to ${DATA?.email}`, DEBUG_VALUES.console.colors.green)
        return res.data
    } catch (err) {
        return HandleAPIError(err, addError, { message: `Failed to send password reset`, type: DEBUG_VALUES.console.types.auth }, err?.response?.status)
    }
}


export async function ResetPasswordFromEmail(addError, DATA) {
    try {

        try {
            var errs = []

            if (typeof DATA?.token !== 'string') {
                errs.push({ code: 400, msg: `Token must be a string` })
            } else if (validator.isEmpty(DATA?.token)) {
                errs.push({ code: 400, msg: "Token not set. Maybe you didn't copy the entire link?" })
            }

            if (typeof DATA?.new_password !== 'string') {
                errs.push({ code: 400, msg: `Password must be a string` })
            } else if (DATA.new_password.length < 8 || DATA.new_password.length > 255) {
                errs.push({ code: 400, msg: `Password must be 8-255 characters long` })
            } else {
                if (DATA?.confirm_password != DATA.new_password) {
                    errs.push({ code: 400, msg: `Confirm password does not match` })
                }
            }


            if (errs.length > 0) {
                AddErrorArrayToContext(errs, addError)
                return { status: false, error: errs }
            }

        } catch (err) {
            return { status: false, error: [{ msg: "Unspecified error" }] }
        }
        const dataToSend = FilterObjectByList(DATA, [
            'token',
            'new_password',
            'confirm_password'
        ])
        const res = await axios.post(`${ENV_API_URL}/auth/ResetPasswordFromEmail`, dataToSend)
        DEBUG_WTC(DEBUG_VALUES.console.types.auth, `Successfully reset password`, DEBUG_VALUES.console.colors.green)
        return res.data
    } catch (err) {
        return HandleAPIError(err, addError, { message: `Failed to reset password`, type: DEBUG_VALUES.console.types.auth }, err?.response?.status)
    }
}





export async function GetStaticData(addError, DATA) {
    try {

        try {
            var errs = []


            if (
                DATA?.type != "CATEGORY_DEPTH_0" &&
                DATA?.type != "CATEGORY_DEPTH_1" &&
                DATA?.type != "CATEGORY_DEPTH_2" &&
                DATA?.type != "GET_SUB_CATEGORIES_BY_ID" &&
                DATA?.type != "GET_ALL_CATEGORIES" &&
                DATA?.type != "GET_ALL_CATEGORIES_HIERARCHICAL" &&
                DATA?.type != "GET_ATTRIBUTES_BY_CATEGORY_ID"
            ) {
                errs.push({ code: 400, msg: `Type is invalid` })
            }



            if (errs.length > 0) {
                AddErrorArrayToContext(errs, addError)
                return { status: false, error: errs }
            }

        } catch (err) {
            return { status: false, error: [{ msg: "Unspecified error" }] }
        }
        const dataToSend = FilterObjectByList(DATA, [
            'type',
            'category_id'
        ])
        const res = await axios.get(`${ENV_API_URL}/utils/data/GetStaticData`, { params: dataToSend })
        DEBUG_WTC(DEBUG_VALUES.console.types.auth, `Fetched ${res.data.content.length} data`, DEBUG_VALUES.console.colors.green)
        return res.data
    } catch (err) {
        return HandleAPIError(err, addError, { message: `Failed to fetch data`, type: DEBUG_VALUES.console.types.auth }, err?.response?.status)
    }
}


export async function GetMyStores(addError) {
    try {
        const res = await axios.get(`${ENV_API_URL}/stores/GetMyStores`, { withCredentials: true })
        DEBUG_WTC(DEBUG_VALUES.console.types.auth, `Successfully fetched stores`, DEBUG_VALUES.console.colors.green)
        return res.data
    } catch (err) {
        return HandleAPIError(err, addError, { message: `Failed to fetch stores`, type: DEBUG_VALUES.console.types.auth }, err?.response?.status)
    }
}



export async function CreateStore(addError, DATA) {
    try {

        try {
            var errs = []

            if (typeof DATA?.name !== 'string') {
                errs.push({ code: 400, msg: `Name must be a string` })
            } else if (IsValueInRange(MIN_MAX_VALUES.store.name.min, MIN_MAX_VALUES.store.name.max, DATA.name)) {
                errs.push({ code: 400, msg: `Name must be ${MIN_MAX_VALUES.store.name.min}-${MIN_MAX_VALUES.store.name.max} characters long` })
            }

            if (typeof DATA?.description === 'string') {
                if (IsValueInRange(MIN_MAX_VALUES.store.description.min, MIN_MAX_VALUES.store.description.max, DATA.description)) {
                    errs.push({ code: 400, msg: `Description must be ${MIN_MAX_VALUES.store.description.min}-${MIN_MAX_VALUES.store.description.max} characters long` })
                }
            }


            if (DATA?.categories?.length == 0) {
                errs.push({ code: 400, msg: `Categories must contain a minimum of ${MIN_MAX_VALUES.store.categories.min} items and a maximum of ${MIN_MAX_VALUES.store.categories.max} items` })

            }

            if (errs.length > 0) {
                AddErrorArrayToContext(errs, addError)
                return { status: false, error: errs }
            }

        } catch (err) {
            return { status: false, error: [{ msg: "Unspecified error" }] }
        }
        const dataToSend = FilterObjectByList(DATA, [
            'name',
            'description',
            'categories'
        ])
        const res = await axios.post(`${ENV_API_URL}/stores/CreateStore`, dataToSend, { withCredentials: true })
        DEBUG_WTC(DEBUG_VALUES.console.types.auth, `Successfully created store`, DEBUG_VALUES.console.colors.green)
        return res.data
    } catch (err) {
        return HandleAPIError(err, addError, { message: `Failed to create store`, type: DEBUG_VALUES.console.types.auth }, err?.response?.status)
    }
}



export async function GetStoreByID(addError, DATA) {
    try {

        try {
            var errs = []


            if (!Number.isInteger(DATA?.store_id)) {
                errs.push({ code: 400, msg: `Store ID must be an integer` })
            }


            if (errs.length > 0) {
                AddErrorArrayToContext(errs, addError)
                return { status: false, error: errs }
            }

        } catch (err) {
            return { status: false, error: [{ msg: "Unspecified error" }] }
        }
        const dataToSend = FilterObjectByList(DATA, [
            'store_id'
        ])
        const res = await axios.get(`${ENV_API_URL}/stores/GetStoreByID`, { params: dataToSend })
        DEBUG_WTC(DEBUG_VALUES.console.types.auth, `Fetched store`, DEBUG_VALUES.console.colors.green)
        return res.data
    } catch (err) {
        return HandleAPIError(err, addError, { message: `Failed to fetch store`, type: DEBUG_VALUES.console.types.auth }, err?.response?.status)
    }
}
