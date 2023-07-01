import axios from 'axios'
import validator from 'validator'
import { DEBUG_VALUES, DEBUG_WTC } from './debug'
import { FilterObjectByList } from './misc'

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

    if (typeof res?.response?.data?.error !== 'undefined') {
        for (let i = 0; i < res.response.data.error.length; i++) {
            res.response.data.error[i].code = res?.response?.status

        }
        addError(res.response.data.error)
        DEBUG_WTC(message.type, message.message, message.color, res.response.data, res)
        return { status: false, error: [{ msg: message?.message }] }
    } else {
        addError([{ msg: res?.message ? res.message : "Unspecified Error", code: res?.response?.status }])
        DEBUG_WTC(message.type, message.message, message.color, err, res)
        return { status: false, error: [{ msg: res?.message ? res.message : "Unspecified Error" }] }
    }

}


export async function Login(addError, DATA) {
    try {

        try {
            var errs = []

            if (typeof DATA.email !== 'string') {
                errs.push({ code: 400, msg: `Email must be a string` })
            } else if (!validator.isEmail(DATA.email)) {
                errs.push({ code: 400, msg: `Email is not in the right format` })


            } else {
                if (typeof DATA.password !== 'string') {
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
        let res = await axios.post(`${ENV_API_URL}/auth/login`, DATA, { withCredentials: true })
        DEBUG_WTC(DEBUG_VALUES.console.types.auth, `User logged in as ${DATA?.email}`, DEBUG_VALUES.console.colors.green)
        return res.data
    } catch (err) {
        return HandleAPIError(err, addError, { message: `Failed to login as user ${DATA?.email}`, type: DEBUG_VALUES.console.types.auth }, err.response.status)
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
        return HandleAPIError(err, addError, { message: `Failed to verify email`, type: DEBUG_VALUES.console.types.auth }, err.response.status)
    }
}