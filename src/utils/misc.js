import { DEBUG_VALUES, DEBUG_WTC } from "./debug";

export function MakeID(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export function GetRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



export function GetFromArrayByKeyValue(ARRAY, KEY, VALUE, MATCHCASE, MULTIPLE) {
    if (MULTIPLE == true) {
        var tempList = []
        for (let i = 0; i < ARRAY.length; i++) {
            if (typeof ARRAY[i][KEY] !== 'undefined') {
                if (Number.isInteger(ARRAY[i][KEY]) || Number.isInteger(VALUE)) {
                    if (ARRAY[i][KEY] == VALUE) {
                        return ARRAY[i]
                    }
                } else {
                    if ((MATCHCASE == true ? ARRAY[i][KEY] : ARRAY[i][KEY].toLowerCase()).indexOf(MATCHCASE == true ? VALUE : VALUE.toLowerCase()) !== -1) {
                        tempList.push(ARRAY[i])
                    }
                }

            }

        }
        return tempList
    } else {
        for (let i = 0; i < ARRAY.length; i++) {

            if (typeof ARRAY[i][KEY] !== 'undefined') {
                if (Number.isInteger(ARRAY[i][KEY]) || Number.isInteger(VALUE)) {
                    if (ARRAY[i][KEY] == VALUE) {
                        return ARRAY[i]
                    }
                } else {
                    if ((MATCHCASE == true ? ARRAY[i][KEY] : ARRAY[i][KEY].toLowerCase()).indexOf(MATCHCASE == true ? VALUE : VALUE.toLowerCase()) !== -1) {
                        return ARRAY[i]
                    }
                }

            }


        }
        return null
    }
}


export function ShuffleArray(ARRAY) {
    var temp = [...ARRAY]
    for (let i = temp.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    return temp
}


export function HasKeyValuePair(obj, key, value) {
    for (let k in obj) {
        if (k === key && obj[k] === value) {
            return true;
        }
    }
    return false;
}



export function GetVideoURLsFromString(STRING) {
    let regex = /(\bhttps?:\/\/\S+\b)/gi;
    var contentURLs = STRING.match(regex);
    var vidUrls = []
    if (contentURLs) {
        for (let i = 0; i < contentURLs.length; i++) {
            if (contentURLs[i].startsWith("https://www.youtube.com/watch?v=")) {
                contentURLs[i] = contentURLs[i].replace('/watch?v=', '/embed/')
                vidUrls.push(contentURLs[i])

            } else if (contentURLs[i].startsWith("https://youtu.be/")) {
                contentURLs[i] = contentURLs[i].replace("https://youtu.be/", "https://www.youtube.com/embed/");

                vidUrls.push(contentURLs[i])
            } else if (contentURLs[i].startsWith("https://m.youtube.com/")) {
                contentURLs[i] = contentURLs[i].replace('https://m.youtube.com/watch?v=', 'https://www.youtube.com/embed/')

                vidUrls.push(contentURLs[i])
            }

        }
        return vidUrls
    } else {
        return vidUrls
    }
}


export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}




export function FilterObjectByList(original_obj, allowed_keys) {

    return Object.keys(original_obj)
        .filter(key => allowed_keys.includes(key))
        .reduce((obj, key) => {
            obj[key] = original_obj[key]
            return obj
        }, {})
}



export function DateInRange(from, to, check) {
    try {
        var fDate, lDate, cDate;
        fDate = Date.parse(from);
        lDate = Date.parse(to);
        cDate = Date.parse(check);

        if ((cDate <= lDate && cDate >= fDate)) {
            return true;
        }
        return false;
    } catch (err) {
        console.error(err)
        return null
    }

}

export function CapitaliseString(string, mode = "first") {
    try {
        string = string.toLowerCase()
        if (mode == "first") {
            return string.charAt(0).toUpperCase() + string.slice(1);
        } else if (mode == "each_word") {
            return string
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
        }
    } catch (err) {
        console.error(err)
        return null
    }


}


export function FixMultipleSpacesInString(string) {
    return string.replace(/  +/g, ' ')
}


export function TrimStringToLength(text, max_length) {
    try {
        if (text.length > max_length - 3) {
            return text.substring(0, max_length).trimEnd() + "..."
        }
        else {
            return text
        }
    } catch (err) {
        DEBUG_WTC(DEBUG_VALUES.console.types.error, `Failed to trim string. Maybe it wasn't a string?`, DEBUG_VALUES.console.colors.red)
        return "Error"
    }

}
