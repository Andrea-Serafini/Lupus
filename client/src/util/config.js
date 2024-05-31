//icons
import wolfIcon from "../img/SVG/ICONS/LUPO_icon.svg"
import villagerIcon from "../img/SVG/ICONS/ABITANTE_icon.svg"
import alphaIcon from "../img/SVG/ICONS/LUPO_ALPHA_icon.svg"
import bodyguardIcon from "../img/SVG/ICONS/BODYGUARD_icon.svg"
import clairvoyantIcon from "../img/SVG/ICONS/VEGGENTE_icon.svg"
//bw
import wolfIconBw from "../img/SVG/ICONS/LUPO_iconBW.svg"
import villagerIconBw from "../img/SVG/ICONS/ABITANTE_iconBW.svg"
import alphaIconBw from "../img/SVG/ICONS/LUPO_ALPHA_iconBW.svg"
import bodyguardIconBw from "../img/SVG/ICONS/BODYGUARD_iconBW.svg"
import clairvoyantIconBw from "../img/SVG/ICONS/VEGGENTE_iconBW.svg"

//it
import wolfCardIt from "../img/SVG/CARDS/it/LUPO_card.svg"
import villagerCardIt from "../img/SVG/CARDS/it/ABITANTE_card.svg"
import alphaCardIt from "../img/SVG/CARDS/it/LUPO_ALPHA_card.svg"
import bodyguardCardIt from "../img/SVG/CARDS/it/BODYGUARD_OP_card.svg"
import clairvoyantCardIt from "../img/SVG/CARDS/it/VEGGENTE_card.svg"
//en
import wolfCardEn from "../img/SVG/CARDS/en/LUPO_card_en.svg"
import villagerCardEn from "../img/SVG/CARDS/en/ABITANTE_card_en.svg"
import alphaCardEn from "../img/SVG/CARDS/en/LUPO_ALPHA_card_en.svg"
import bodyguardCardEn from "../img/SVG/CARDS/en/BODYGUARD_OP_card_en.svg"
import clairvoyantCardEn from "../img/SVG/CARDS/en/VEGGENTE_card_en.svg"
//it_bw
import wolfCardItBw from "../img/SVG/CARDS/it_bw/LUPO_cardBW.svg"
import villagerCardItBw from "../img/SVG/CARDS/it_bw/ABITANTE_cardBW.svg"
import alphaCardItBw from "../img/SVG/CARDS/it_bw/LUPO_ALPHA_cardBW.svg"
import bodyguardCardItBw from "../img/SVG/CARDS/it_bw/BODYGUARD_OP_cardBW.svg"
import clairvoyantCardItBw from "../img/SVG/CARDS/it_bw/VEGGENTE_cardBW.svg"
//en_bw
import wolfCardEnBw from "../img/SVG/CARDS/en_bw/LUPO_card_enBW.svg"
import villagerCardEnBw from "../img/SVG/CARDS/en_bw/ABITANTE_card_enBW.svg"
import alphaCardEnBw from "../img/SVG/CARDS/en_bw/LUPO_ALPHA_card_enBW.svg"
import bodyguardCardEnBw from "../img/SVG/CARDS/en_bw/BODYGUARD_OP_card_enBW.svg"
import clairvoyantCardEnBw from "../img/SVG/CARDS/en_bw/VEGGENTE_card_enBW.svg"


export const LUPUS_SERVER_ADDRESS_ONLINE = "https://wise-resolved-wasp.ngrok-free.app" 
export const LUPUS_SERVER_ADDRESS_LOCAL = "http://localhost:"
export const LUPUS_SERVER_PORT = process.env.REACT_APP_SERVER_PORT || "8080"  

export const LUPUS_SERVER_ADDRESS = process.env.REACT_APP_ONLINE ? LUPUS_SERVER_ADDRESS_ONLINE : LUPUS_SERVER_ADDRESS_LOCAL+LUPUS_SERVER_PORT
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


export const FILTERS_NUM = 21

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

//Language
if (sessionStorage.getItem("lupusLanguage") == null) {
    sessionStorage.setItem("lupusLanguage", "en");
}
export const LANGUAGE = sessionStorage.getItem("lupusLanguage");

//Game
export const MIN_PLAYERS = 8
export const WOLF_STD_NUM = 3

export const ROLES = {
    1: "Wolf",
    2: "Villager"
}
export const ROLES_INDEX = {
    "Wolf": 1,
    "Villager": 2
}
export const ROLES_ICONS = {
    1: wolfIcon,
    2: villagerIcon
}

export const EXTRAS = {
    1: "Alpha Wolf",
    2: "Bodyguard",
    3: "Clairvoyant"
}
export const EXTRAS_INDEX = {
    "Alpha Wolf": 1,
    "Bodyguard": 2,
    "Clairvoyant": 3
}
export const EXTRAS_ICONS = {
    1: alphaIcon,
    2: bodyguardIcon,
    3: clairvoyantIcon
}


export let CARDS
export let CARDS_BW

if (LANGUAGE === "en") {
    CARDS = {
        "Wolf": wolfCardEn,
        "Villager": villagerCardEn,
        "Alpha Wolf": alphaCardEn,
        "Bodyguard": bodyguardCardEn,
        "Clairvoyant": clairvoyantCardEn
    }
    CARDS_BW = {
        "Wolf": wolfCardEnBw,
        "Villager": villagerCardEnBw,
        "Alpha Wolf": alphaCardEnBw,
        "Bodyguard": bodyguardCardEnBw,
        "Clairvoyant": clairvoyantCardEnBw
    }
} else if (LANGUAGE === "it") {
    CARDS = {
        "Wolf": wolfCardIt,
        "Villager": villagerCardIt,
        "Alpha Wolf": alphaCardIt,
        "Bodyguard": bodyguardCardIt,
        "Clairvoyant": clairvoyantCardIt
    }
    CARDS_BW = {
        "Wolf": wolfCardItBw,
        "Villager": villagerCardItBw,
        "Alpha Wolf": alphaCardItBw,
        "Bodyguard": bodyguardCardItBw,
        "Clairvoyant": clairvoyantCardItBw
    }
}


export const ICONS = {
    "Wolf": wolfIcon,
    "Villager": villagerIcon,
    "Alpha Wolf": alphaIcon,
    "Bodyguard": bodyguardIcon,
    "Clairvoyant": clairvoyantIcon
}

export const ICONS_BW = {
    "Wolf": wolfIconBw,
    "Villager": villagerIconBw,
    "Alpha Wolf": alphaIconBw,
    "Bodyguard": bodyguardIconBw,
    "Clairvoyant": clairvoyantIconBw
}

export const TURNS = {
    "Wolf": 1,
    "Alpha Wolf": 1,
    "Bodyguard": 2,
    "Clairvoyant": 3,
    "Villager": 4
}

export const PHASES = {
    1: "night",
    2: "Bodyguard",
    3: "Clairvoyant",
    4: "day"
}
export const PHASE_ORDER = {
    "night": 1,
    "Bodyguard": 2,
    "Clairvoyant": 3,
    "day": 4
}

