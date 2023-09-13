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


export function ChangeKeyName(obj, from = 'name', to = 'label') {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => ChangeKeyName(item));
    }

    const newObj = {};
    for (const key in obj) {
        if (key === from) {
            newObj[to] = ChangeKeyName(obj[key]);
        } else {
            newObj[key] = ChangeKeyName(obj[key]);
        }
    }
    return newObj;
}


export async function FileChange(e, max_size, allowed_filetypes = ['image'], max_files) {
    var files

    if (!e.target.files || e.target.files.length == 0) {
        if (e?.clipboardData?.files?.length == 0) {
            return { status: false, error: [{ msg: 'No files selected' }] }
        }
        files = e.clipboardData.files
    } else {
        files = e.target.files
    }

    if (max_files != null) {
        if (files.length > max_files) {
            return { status: false, error: [{ msg: `Maximum of ${max_files} files reached` }] }
        }
    }


    var files_return = []
    for (var file of files) {
        if (file.size > (max_size || 10485760)) {
            return { status: false, error: [{ msg: !max_size ? 'Each file must be less than 10 MB' : `Each file must be less than ${Math.ceil(max_size / 1048576)} MB` }] }
        }

        for (var filetype of allowed_filetypes) {
            if (!file.type.includes(filetype)) {
                allowed_filetypes = allowed_filetypes.join(', ')
                return { status: false, error: [{ msg: `Only ${allowed_filetypes} files are allowed` }] }
            }
        }

        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            await new Promise(resolve => reader.onload = () => resolve())
            files_return.push({ id: MakeID(10), render: reader.result, file, name: file?.name, type: file.type, uploadProgress: 0 })
        }

    }
    return { status: true, content: files_return }



}


export function CompareStringsIgnoringPunctuation(str1, str2, mode = "INCLUDES") {

    if (!str1 || !str2) {
        return false
    }
    const punctuationRegex = /[^\w\s]|_/g;
    const cleanStr1 = str1.toLowerCase().replace(punctuationRegex, '');
    const cleanStr2 = str2.toLowerCase().replace(punctuationRegex, '');
    if (mode == "INCLUDES") {
        return cleanStr1.includes(cleanStr2);
    } else {
        return cleanStr1 === cleanStr2;
    }

}


export function IsValueInRange(low, high, value) {
    if (typeof value === 'string') {
        value = value.length
    }

    if (low == null) {
        return (value <= high)
    }
    if (high == null) {
        return (value >= low)
    }

    return (value >= low && value <= high)
}

export function ConvertTimeFromServer(TIMESTRING, mode = "db") {
    const dateString = TIMESTRING;
    let givenDate;

    if (mode === "db") {
        try {
            const [timeString, dateStringFormatted] = dateString.split(' ');
            const [hours, minutes, seconds] = timeString.split(':');
            const [day, month, year] = dateStringFormatted.split('-');

            givenDate = new Date(`${month}/${day}/${year} ${hours}:${minutes}:${seconds}`);
        } catch (err) {
            givenDate = new Date(Date.parse(TIMESTRING));
        }
    } else {
        try {
            const [time, date] = TIMESTRING.split(" ");
            const [hours, minutes, seconds] = time.split(":");
            const [day, month, year] = date.split("-");

            givenDate = new Date(year, month - 1, day, hours, minutes, seconds);
        } catch (err) {
            givenDate = new Date(Date.parse(TIMESTRING));
        }
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - givenDate.getTime()) / 1000);

    if (diffInSeconds <= 1) {
        return { diff: `Now`, original: TIMESTRING };
    } else if (diffInSeconds < 60) {
        return { diff: `${diffInSeconds} sec`, original: TIMESTRING };
    } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        return { diff: `${diffInMinutes} minutes`, original: TIMESTRING };
    } else if (diffInSeconds < 86400) {
        const diffInHours = Math.floor(diffInSeconds / 3600);
        return { diff: `${diffInHours} hours`, original: TIMESTRING };
    } else {
        const diffInDays = Math.floor(diffInSeconds / 86400);
        return { diff: `${diffInDays} days`, original: TIMESTRING };
    }
}