import { useEffect, useState } from 'react';
import { MakeID } from '../utils/misc';

export const useGlobal = () => {
    const [isMobile, setIsMobile] = useState(false)
    const [errors, setErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    const [colorMode, setColorMode] = useState('light')

    const [items, setItems] = useState([])

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



    return (
        {
            isMobile,

            gErrors: errors,
            gItems: items,
            gAddItems,
            gSetItems,
            gClearItems,

            gShowErrors: showErrors,
            gSetShowErrors: setShowErrors,
            gAddErrors,
            gRemoveErrorByID,
            gClearErrors,

            gColorMode: colorMode,
            gSetColorMode: setColorMode,
            gToggleColorMode

        }
    );
};


export default useGlobal;
