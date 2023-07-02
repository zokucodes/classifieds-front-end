export const ERROR_MESSAGE_STRINGS = {
    generic: ["Something went wrong", "An error has occurred"],
    user_error: ["Bad Request"],
    server_error: ["Internal Server Error"],
    auth_error: []
}

export function GetValidDOBRange() {
    return {
        min: new Date('1915-01-01'),
        max: new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate() - 1)
    }
}


export const COUNTRIES_ARRAY = [
    {
        "id": 1,
        "label": "Afghanistan"
    },
    {
        "id": 2,
        "label": "Albania"
    },
    {
        "id": 3,
        "label": "Algeria"
    },
    {
        "id": 4,
        "label": "American Samoa"
    },
    {
        "id": 5,
        "label": "Andorra"
    },
    {
        "id": 6,
        "label": "Angola"
    },
    {
        "id": 7,
        "label": "Anguilla"
    },
    {
        "id": 8,
        "label": "Antarctica"
    },
    {
        "id": 9,
        "label": "Antigua And Barbuda"
    },
    {
        "id": 10,
        "label": "Argentina"
    },
    {
        "id": 11,
        "label": "Armenia"
    },
    {
        "id": 12,
        "label": "Aruba"
    },
    {
        "id": 13,
        "label": "Australia"
    },
    {
        "id": 14,
        "label": "Austria"
    },
    {
        "id": 15,
        "label": "Azerbaijan"
    },
    {
        "id": 16,
        "label": "Bahamas The"
    },
    {
        "id": 17,
        "label": "Bahrain"
    },
    {
        "id": 18,
        "label": "Bangladesh"
    },
    {
        "id": 19,
        "label": "Barbados"
    },
    {
        "id": 20,
        "label": "Belarus"
    },
    {
        "id": 21,
        "label": "Belgium"
    },
    {
        "id": 22,
        "label": "Belize"
    },
    {
        "id": 23,
        "label": "Benin"
    },
    {
        "id": 24,
        "label": "Bermuda"
    },
    {
        "id": 25,
        "label": "Bhutan"
    },
    {
        "id": 26,
        "label": "Bolivia"
    },
    {
        "id": 27,
        "label": "Bosnia and Herzegovina"
    },
    {
        "id": 28,
        "label": "Botswana"
    },
    {
        "id": 29,
        "label": "Bouvet Island"
    },
    {
        "id": 30,
        "label": "Brazil"
    },
    {
        "id": 31,
        "label": "British Indian Ocean Territory"
    },
    {
        "id": 32,
        "label": "Brunei"
    },
    {
        "id": 33,
        "label": "Bulgaria"
    },
    {
        "id": 34,
        "label": "Burkina Faso"
    },
    {
        "id": 35,
        "label": "Burundi"
    },
    {
        "id": 36,
        "label": "Cambodia"
    },
    {
        "id": 37,
        "label": "Cameroon"
    },
    {
        "id": 38,
        "label": "Canada"
    },
    {
        "id": 39,
        "label": "Cape Verde"
    },
    {
        "id": 40,
        "label": "Cayman Islands"
    },
    {
        "id": 41,
        "label": "Central African Republic"
    },
    {
        "id": 42,
        "label": "Chad"
    },
    {
        "id": 43,
        "label": "Chile"
    },
    {
        "id": 44,
        "label": "China"
    },
    {
        "id": 45,
        "label": "Christmas Island"
    },
    {
        "id": 46,
        "label": "Cocos (Keeling) Islands"
    },
    {
        "id": 47,
        "label": "Colombia"
    },
    {
        "id": 48,
        "label": "Comoros"
    },
    {
        "id": 49,
        "label": "Republic Of The Congo"
    },
    {
        "id": 50,
        "label": "Democratic Republic Of The Congo"
    },
    {
        "id": 51,
        "label": "Cook Islands"
    },
    {
        "id": 52,
        "label": "Costa Rica"
    },
    {
        "id": 53,
        "label": "Cote D'Ivoire (Ivory Coast)"
    },
    {
        "id": 54,
        "label": "Croatia (Hrvatska)"
    },
    {
        "id": 55,
        "label": "Cuba"
    },
    {
        "id": 56,
        "label": "Cyprus"
    },
    {
        "id": 57,
        "label": "Czech Republic"
    },
    {
        "id": 58,
        "label": "Denmark"
    },
    {
        "id": 59,
        "label": "Djibouti"
    },
    {
        "id": 60,
        "label": "Dominica"
    },
    {
        "id": 61,
        "label": "Dominican Republic"
    },
    {
        "id": 62,
        "label": "East Timor"
    },
    {
        "id": 63,
        "label": "Ecuador"
    },
    {
        "id": 64,
        "label": "Egypt"
    },
    {
        "id": 65,
        "label": "El Salvador"
    },
    {
        "id": 66,
        "label": "Equatorial Guinea"
    },
    {
        "id": 67,
        "label": "Eritrea"
    },
    {
        "id": 68,
        "label": "Estonia"
    },
    {
        "id": 69,
        "label": "Ethiopia"
    },
    {
        "id": 70,
        "label": "External Territories of Australia"
    },
    {
        "id": 71,
        "label": "Falkland Islands"
    },
    {
        "id": 72,
        "label": "Faroe Islands"
    },
    {
        "id": 73,
        "label": "Fiji Islands"
    },
    {
        "id": 74,
        "label": "Finland"
    },
    {
        "id": 75,
        "label": "France"
    },
    {
        "id": 76,
        "label": "French Guiana"
    },
    {
        "id": 77,
        "label": "French Polynesia"
    },
    {
        "id": 78,
        "label": "French Southern Territories"
    },
    {
        "id": 79,
        "label": "Gabon"
    },
    {
        "id": 80,
        "label": "Gambia The"
    },
    {
        "id": 81,
        "label": "Georgia"
    },
    {
        "id": 82,
        "label": "Germany"
    },
    {
        "id": 83,
        "label": "Ghana"
    },
    {
        "id": 84,
        "label": "Gibraltar"
    },
    {
        "id": 85,
        "label": "Greece"
    },
    {
        "id": 86,
        "label": "Greenland"
    },
    {
        "id": 87,
        "label": "Grenada"
    },
    {
        "id": 88,
        "label": "Guadeloupe"
    },
    {
        "id": 89,
        "label": "Guam"
    },
    {
        "id": 90,
        "label": "Guatemala"
    },
    {
        "id": 91,
        "label": "Guernsey and Alderney"
    },
    {
        "id": 92,
        "label": "Guinea"
    },
    {
        "id": 93,
        "label": "Guinea-Bissau"
    },
    {
        "id": 94,
        "label": "Guyana"
    },
    {
        "id": 95,
        "label": "Haiti"
    },
    {
        "id": 96,
        "label": "Heard and McDonald Islands"
    },
    {
        "id": 97,
        "label": "Honduras"
    },
    {
        "id": 98,
        "label": "Hong Kong S.A.R."
    },
    {
        "id": 99,
        "label": "Hungary"
    },
    {
        "id": 100,
        "label": "Iceland"
    },
    {
        "id": 101,
        "label": "India"
    },
    {
        "id": 102,
        "label": "Indonesia"
    },
    {
        "id": 103,
        "label": "Iran"
    },
    {
        "id": 104,
        "label": "Iraq"
    },
    {
        "id": 105,
        "label": "Ireland"
    },
    {
        "id": 106,
        "label": "Israel"
    },
    {
        "id": 107,
        "label": "Italy"
    },
    {
        "id": 108,
        "label": "Jamaica"
    },
    {
        "id": 109,
        "label": "Japan"
    },
    {
        "id": 110,
        "label": "Jersey"
    },
    {
        "id": 111,
        "label": "Jordan"
    },
    {
        "id": 112,
        "label": "Kazakhstan"
    },
    {
        "id": 113,
        "label": "Kenya"
    },
    {
        "id": 114,
        "label": "Kiribati"
    },
    {
        "id": 115,
        "label": "Korea North"
    },
    {
        "id": 116,
        "label": "Korea South"
    },
    {
        "id": 117,
        "label": "Kuwait"
    },
    {
        "id": 118,
        "label": "Kyrgyzstan"
    },
    {
        "id": 119,
        "label": "Laos"
    },
    {
        "id": 120,
        "label": "Latvia"
    },
    {
        "id": 121,
        "label": "Lebanon"
    },
    {
        "id": 122,
        "label": "Lesotho"
    },
    {
        "id": 123,
        "label": "Liberia"
    },
    {
        "id": 124,
        "label": "Libya"
    },
    {
        "id": 125,
        "label": "Liechtenstein"
    },
    {
        "id": 126,
        "label": "Lithuania"
    },
    {
        "id": 127,
        "label": "Luxembourg"
    },
    {
        "id": 128,
        "label": "Macau S.A.R."
    },
    {
        "id": 129,
        "label": "Macedonia"
    },
    {
        "id": 130,
        "label": "Madagascar"
    },
    {
        "id": 131,
        "label": "Malawi"
    },
    {
        "id": 132,
        "label": "Malaysia"
    },
    {
        "id": 133,
        "label": "Maldives"
    },
    {
        "id": 134,
        "label": "Mali"
    },
    {
        "id": 135,
        "label": "Malta"
    },
    {
        "id": 136,
        "label": "Man (Isle of)"
    },
    {
        "id": 137,
        "label": "Marshall Islands"
    },
    {
        "id": 138,
        "label": "Martinique"
    },
    {
        "id": 139,
        "label": "Mauritania"
    },
    {
        "id": 140,
        "label": "Mauritius"
    },
    {
        "id": 141,
        "label": "Mayotte"
    },
    {
        "id": 142,
        "label": "Mexico"
    },
    {
        "id": 143,
        "label": "Micronesia"
    },
    {
        "id": 144,
        "label": "Moldova"
    },
    {
        "id": 145,
        "label": "Monaco"
    },
    {
        "id": 146,
        "label": "Mongolia"
    },
    {
        "id": 147,
        "label": "Montserrat"
    },
    {
        "id": 148,
        "label": "Morocco"
    },
    {
        "id": 149,
        "label": "Mozambique"
    },
    {
        "id": 150,
        "label": "Myanmar"
    },
    {
        "id": 151,
        "label": "Namibia"
    },
    {
        "id": 152,
        "label": "Nauru"
    },
    {
        "id": 153,
        "label": "Nepal"
    },
    {
        "id": 154,
        "label": "Netherlands Antilles"
    },
    {
        "id": 155,
        "label": "Netherlands The"
    },
    {
        "id": 156,
        "label": "New Caledonia"
    },
    {
        "id": 157,
        "label": "New Zealand"
    },
    {
        "id": 158,
        "label": "Nicaragua"
    },
    {
        "id": 159,
        "label": "Niger"
    },
    {
        "id": 160,
        "label": "Nigeria"
    },
    {
        "id": 161,
        "label": "Niue"
    },
    {
        "id": 162,
        "label": "Norfolk Island"
    },
    {
        "id": 163,
        "label": "Northern Mariana Islands"
    },
    {
        "id": 164,
        "label": "Norway"
    },
    {
        "id": 165,
        "label": "Oman"
    },
    {
        "id": 166,
        "label": "Pakistan"
    },
    {
        "id": 167,
        "label": "Palau"
    },
    {
        "id": 168,
        "label": "Palestinian Territory Occupied"
    },
    {
        "id": 169,
        "label": "Panama"
    },
    {
        "id": 170,
        "label": "Papua new Guinea"
    },
    {
        "id": 171,
        "label": "Paraguay"
    },
    {
        "id": 172,
        "label": "Peru"
    },
    {
        "id": 173,
        "label": "Philippines"
    },
    {
        "id": 174,
        "label": "Pitcairn Island"
    },
    {
        "id": 175,
        "label": "Poland"
    },
    {
        "id": 176,
        "label": "Portugal"
    },
    {
        "id": 177,
        "label": "Puerto Rico"
    },
    {
        "id": 178,
        "label": "Qatar"
    },
    {
        "id": 179,
        "label": "Reunion"
    },
    {
        "id": 180,
        "label": "Romania"
    },
    {
        "id": 181,
        "label": "Russia"
    },
    {
        "id": 182,
        "label": "Rwanda"
    },
    {
        "id": 183,
        "label": "Saint Helena"
    },
    {
        "id": 184,
        "label": "Saint Kitts And Nevis"
    },
    {
        "id": 185,
        "label": "Saint Lucia"
    },
    {
        "id": 186,
        "label": "Saint Pierre and Miquelon"
    },
    {
        "id": 187,
        "label": "Saint Vincent And The Grenadines"
    },
    {
        "id": 188,
        "label": "Samoa"
    },
    {
        "id": 189,
        "label": "San Marino"
    },
    {
        "id": 190,
        "label": "Sao Tome and Principe"
    },
    {
        "id": 191,
        "label": "Saudi Arabia"
    },
    {
        "id": 192,
        "label": "Senegal"
    },
    {
        "id": 193,
        "label": "Serbia"
    },
    {
        "id": 194,
        "label": "Seychelles"
    },
    {
        "id": 195,
        "label": "Sierra Leone"
    },
    {
        "id": 196,
        "label": "Singapore"
    },
    {
        "id": 197,
        "label": "Slovakia"
    },
    {
        "id": 198,
        "label": "Slovenia"
    },
    {
        "id": 199,
        "label": "Smaller Territories of the UK"
    },
    {
        "id": 200,
        "label": "Solomon Islands"
    },
    {
        "id": 201,
        "label": "Somalia"
    },
    {
        "id": 202,
        "label": "South Africa"
    },
    {
        "id": 203,
        "label": "South Georgia"
    },
    {
        "id": 204,
        "label": "South Sudan"
    },
    {
        "id": 205,
        "label": "Spain"
    },
    {
        "id": 206,
        "label": "Sri Lanka"
    },
    {
        "id": 207,
        "label": "Sudan"
    },
    {
        "id": 208,
        "label": "Suriname"
    },
    {
        "id": 209,
        "label": "Svalbard And Jan Mayen Islands"
    },
    {
        "id": 210,
        "label": "Swaziland"
    },
    {
        "id": 211,
        "label": "Sweden"
    },
    {
        "id": 212,
        "label": "Switzerland"
    },
    {
        "id": 213,
        "label": "Syria"
    },
    {
        "id": 214,
        "label": "Taiwan"
    },
    {
        "id": 215,
        "label": "Tajikistan"
    },
    {
        "id": 216,
        "label": "Tanzania"
    },
    {
        "id": 217,
        "label": "Thailand"
    },
    {
        "id": 218,
        "label": "Togo"
    },
    {
        "id": 219,
        "label": "Tokelau"
    },
    {
        "id": 220,
        "label": "Tonga"
    },
    {
        "id": 221,
        "label": "Trinidad And Tobago"
    },
    {
        "id": 222,
        "label": "Tunisia"
    },
    {
        "id": 223,
        "label": "Turkey"
    },
    {
        "id": 224,
        "label": "Turkmenistan"
    },
    {
        "id": 225,
        "label": "Turks And Caicos Islands"
    },
    {
        "id": 226,
        "label": "Tuvalu"
    },
    {
        "id": 227,
        "label": "Uganda"
    },
    {
        "id": 228,
        "label": "Ukraine"
    },
    {
        "id": 229,
        "label": "United Arab Emirates"
    },
    {
        "id": 230,
        "label": "United Kingdom"
    },
    {
        "id": 231,
        "label": "United States"
    },
    {
        "id": 232,
        "label": "United States Minor Outlying Islands"
    },
    {
        "id": 233,
        "label": "Uruguay"
    },
    {
        "id": 234,
        "label": "Uzbekistan"
    },
    {
        "id": 235,
        "label": "Vanuatu"
    },
    {
        "id": 236,
        "label": "Vatican City State (Holy See)"
    },
    {
        "id": 237,
        "label": "Venezuela"
    },
    {
        "id": 238,
        "label": "Vietnam"
    },
    {
        "id": 239,
        "label": "Virgin Islands (British)"
    },
    {
        "id": 240,
        "label": "Virgin Islands (US)"
    },
    {
        "id": 241,
        "label": "Wallis And Futuna Islands"
    },
    {
        "id": 242,
        "label": "Western Sahara"
    },
    {
        "id": 243,
        "label": "Yemen"
    },
    {
        "id": 244,
        "label": "Yugoslavia"
    },
    {
        "id": 245,
        "label": "Zambia"
    },
    {
        "id": 246,
        "label": "Zimbabwe"
    }
]

export const STATES_ARRAY = [
    {
        id: 273,
        name: "Victoria",
        country_id: 13
    }
]

export const VALID_VALUES = {
    searchLocations: {
        type: ["STATE", "CITY"]
    }
}

export const ENV_SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL