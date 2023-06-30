export const DEBUG_VALUES = {
    console: {
        types: {
            auth: "\x1b[33m[AUTH]\x1b[0m ",
            access: "\x1b[36m[ACCESS]\x1b[0m ",
            info: "\x1b[37m[INFO]\x1b[0m ",
            error: "\x1b[31m[ERROR]\x1b[0m ",
            debug: "\x1b[32m[DEBUG]\x1b[0m ",
            chat: "\x1b[34m[CHAT]\x1b[0m "
        },
        colors: {
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            cyan: "\x1b[36m",
            bcyan: "\x1b[1m\x1b[36m",
            bred: "\x1b[1m\x1b[31m",
            byellow: "\x1b[1m\x1b[33m",
            white: "\x1b[37m",
            bgreen: "\x1b[1m\x1b[32m"
        }
    }
}

const DEBUG_LOG_ALLOWED = import.meta.env.VITE_DEBUG_CONSOLELOG

export function DEBUG_WTC(type, message, color, err, extra) {
    /*
    WRITES TO THE CONSOLE
    -------------------------------------------------------------
    type: Type [STRING] e.g "\x1b[33m[AUTH]\x1b[0m "
    message: Message [STRING] e.g "Successfully did something"
    color: Message color [STRING] e.g "\x1b[31m"
    err: Error [STRING]
    */
    if (DEBUG_LOG_ALLOWED == "true") {
        if (err == null) {
            console.log(type + color + message + "\x1b[0m");
            if (extra) {
                console.log(extra)
            }
            return { message };
        } else {
            console.error(type + color + message + ` | ` + JSON.stringify(err) + "\x1b[0m");
            // if (extra) {
            //     console.log(extra)
            // }
            return { message, err };
        }
    }


}