import { NotificationManager } from "react-notifications"
import "react-notifications/lib/notifications.css"

import { setIsLoading } from "../../redux/util/reducer"
import { connect, socket } from "../../socket/socket"

import PasswordValidator from "password-validator"
import {
    USERNAME_MIN_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MIN_DIGITS,
    PASSWORDS_BLACKLIST,
    PASSWORD_VALIDATION_MESSAGES
} from "../../util/config"

const pwSchema = new PasswordValidator();
pwSchema.is().min(PASSWORD_MIN_LENGTH)
    .has().uppercase()
    .has().lowercase()
    .has().digits(PASSWORD_MIN_DIGITS)
    .is().not().oneOf(PASSWORDS_BLACKLIST);


export function login(inputUsername, inputPassword, dispatch, socketConnected, cb) {
    if (isUsernameValid(inputUsername)) {
        if (inputPassword !== null && inputPassword !== undefined && inputPassword !== "") {
            cb();
            dispatch(setIsLoading(true))
            if (!socketConnected) {
                connect(dispatch);
            }
            //dispatch(setUsername(inputUsername));
            socket.emit('login', { username: inputUsername, password: inputPassword });

        } else {
            NotificationManager.error("Something is wrong with the password, please try again.", 'Invalid Password', 3000);
        }
    } else {
        NotificationManager.error("Something is wrong with the username, please try again.", 'Invalid Username', 3000);
    }
}

export function signup(inputUsername, inputPassword, dispatch, socketConnected) {
    if (isUsernameValid(inputUsername)) {
        if (pswIsValid(inputPassword)) {
            dispatch(setIsLoading(true))
            if (!socketConnected) {
                connect(dispatch);
            }
            socket.emit('signup', { username: inputUsername, password: inputPassword });

        } else {
            printPasswordValidationErrors(inputPassword)
        }
    } else {
        NotificationManager.error("Username is not long enough, at least " + USERNAME_MIN_LENGTH + " characters needed.", 'Invalid Username', 3000);
    }
}

function isUsernameValid(str) {
    return !(str === undefined || str === null || str.trim().length < USERNAME_MIN_LENGTH)
}

function pswIsValid(str) {
    let invalidPasswordParams = pwSchema.validate(str, { list: true })
    return invalidPasswordParams.length === 0
}

function printPasswordValidationErrors(str) {
    let invalidPasswordParams = pwSchema.validate(str, { list: true })
    let messages = invalidPasswordParams.map(p => PASSWORD_VALIDATION_MESSAGES[p])
    messages.forEach(m => NotificationManager.error(m, 'Invalid Password', 10000))
}
