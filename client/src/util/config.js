export const SERVER_ADDRESS = "http://localhost:8080"


//Login
export const USERNAME_MIN_LENGTH = 4
export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MIN_DIGITS = 1
export const PASSWORDS_BLACKLIST = ['Password111', 'Password123']
export const PASSWORD_VALIDATION_MESSAGES = {
    "min": "Password is too short, al least " + PASSWORD_MIN_LENGTH + " characters needed.\n",
    "digits": "At least " + PASSWORD_MIN_DIGITS + " number is needed.\n",
    "uppercase": "There are no uppercase letters, at least 1 is needed.\n",
    "lowercase": "There are no lowercase letters, at least 1 is needed.\n",
    "oneOf": "Your password is too simple, please change it!.\n",
}

//Home
export const PARTY_MIN_LENGTH = 6
export const PARTY_MAX_LENGTH = 12



//Sleep util
export const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


export const FILTERS_NUM = 20

export const FILTERS = {
    1: "invert(52%) sepia(80%) saturate(1375%) hue-rotate(79deg) brightness(116%) contrast(127%)", // yellow
    2: "invert(14%) sepia(88%) saturate(3149%) hue-rotate(235deg) brightness(111%) contrast(159%)", // blue
    3: "invert(32%) sepia(91%) saturate(6994%) hue-rotate(354deg) brightness(104%) contrast(126%)", // red
    4: "invert(48%) sepia(92%) saturate(5291%) hue-rotate(212deg) brightness(107%) contrast(120%)", // green
    5: "invert(85%) sepia(95%) saturate(1445%) hue-rotate(296deg) brightness(99%) contrast(89%)", // purple
    6: "invert(32%) sepia(90%) saturate(6311%) hue-rotate(36deg) brightness(108%) contrast(108%)", // orange
    7: "invert(79%) sepia(11%) saturate(420%) hue-rotate(216deg) brightness(88%) contrast(80%)", // cyan
    8: "invert(81%) sepia(69%) saturate(1346%) hue-rotate(141deg) brightness(92%) contrast(90%)", // pink
    9: "invert(54%) sepia(96%) saturate(197%) hue-rotate(298deg) brightness(99%) contrast(88%)", // teal
    10: "invert(17%) sepia(92%) saturate(3775%) hue-rotate(287deg) brightness(97%) contrast(112%)", // lime
    11: "invert(73%) sepia(55%) saturate(442%) hue-rotate(182deg) brightness(84%) contrast(86%)", // indigo
    12: "invert(23%) sepia(57%) saturate(1735%) hue-rotate(331deg) brightness(99%) contrast(107%)", // brown
    13: "invert(78%) sepia(63%) saturate(1584%) hue-rotate(274deg) brightness(84%) contrast(82%)", // olive
    14: "invert(76%) sepia(27%) saturate(1193%) hue-rotate(241deg) brightness(95%) contrast(86%)", // maroon
    15: "invert(79%) sepia(45%) saturate(303%) hue-rotate(156deg) brightness(85%) contrast(79%)", // navy
    16: "invert(73%) sepia(84%) saturate(2807%) hue-rotate(207deg) brightness(103%) contrast(99%)", // light brown
    17: "invert(9%) sepia(96%) saturate(7477%) hue-rotate(247deg) brightness(90%) contrast(144%)", // light blue
    18: "invert(64%) sepia(9%) saturate(2174%) hue-rotate(301deg) brightness(108%) contrast(103%)", // light green
    19: "invert(25%) sepia(99%) saturate(3886%) hue-rotate(85deg) brightness(103%) contrast(104%)", // light red
    20: "invert(21%) sepia(72%) saturate(7467%) hue-rotate(358deg) brightness(105%) contrast(121%)", // light purple
}
