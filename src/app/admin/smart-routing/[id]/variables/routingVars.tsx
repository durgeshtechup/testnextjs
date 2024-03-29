export const routing = {
  type: "CONDITION",
  condition_type: "SOLO",
  conditions: {
    type: "EQUALS",
    left: { type: "VARIABLE", name: "geo-location" },
    right: { type: "STATIC", value: "India" },
  },
  "1": {
    type: "ACTION",
    action: {
      type: "FUNCTION",
      name: "process_payment",
      arguments: [{ type: "STATIC", name: "gateway", value: "stripe" }],
    },
  },
  "0": {
    type: "CONDITION",
    condition_type: "OR",
    conditions: [
      {
        type: "EQUALS",
        left: { type: "VARIABLE", name: "amount" },
        right: { type: "STATIC", value: 150 },
      },
      {
        type: "GREATER_THAN",
        left: { type: "VARIABLE", name: "amount" },
        right: { type: "STATIC", value: 700 },
      },
    ],
    "1": {
      type: "ACTION",
      action: {
        type: "FUNCTION",
        name: "process_payment",
        arguments: [{ type: "STATIC", name: "gateway", value: "sipe" }],
      },
    },
    "0": {
      type: "CONDITION",
      condition_type: "AND",
      conditions: [
        {
          type: "LESS_THAN",
          left: { type: "VARIABLE", name: "amount" },
          right: { type: "STATIC", value: 500 },
        },
        {
          type: "GREATER_THAN",
          left: { type: "VARIABLE", name: "amount" },
          right: { type: "STATIC", value: 260 },
        },
      ],
      "1": {
        type: "ACTION",
        action: {
          type: "FUNCTION",
          name: "process_payment",
          arguments: [{ type: "STATIC", name: "gateway", value: "blumon" }],
        },
      },
    },
  },
};



export const allCountries = [
  { name: "Select", code: "" },
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "AndorrA", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, The Democratic Republic of the", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and Mcdonald Islands", code: "HM" },
  { name: "Holy See (Vatican City State)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran, Islamic Republic Of", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Korea, Republic of", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libyan Arab Jamahiriya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia, Federated States of", code: "FM" },
  { name: "Moldova, Republic of", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "Netherlands Antilles", code: "AN" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestinian Territory, Occupied", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reunion", code: "RE" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "RWANDA", code: "RW" },
  { name: "Saint Helena", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia and Montenegro", code: "CS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan, Province of China", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands, British", code: "VG" },
  { name: "Virgin Islands, U.S.", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabw", code: "ZN" },
];

export const allCardType = [
  { name: "Select", value: "" },
  { name: "VISA", value: "VISA" },
  { name: "MasterCard", value: "MasterCard" },
  { name: "American Express", value: "AmericanExpress" },
  { name: "Discover", value: "Discover" },
];

export const allCurrency = [
  { name: "Select", value: "" },
  { name : "USD", value: "USD"},
  { name : "AED", value: "AED"},
  { name : "AFN", value: "AFN"},
  { name : "ALL", value: "ALL"},
  { name : "AMD", value: "AMD"},
  { name : "ANG", value: "ANG"},
  { name : "AOA", value: "AOA"},
  { name : "ARS", value: "ARS"},
  { name : "AUD", value: "AUD"},
  { name : "AWG", value: "AWG"},
  { name : "AZN", value: "AZN"},
  { name : "BAM", value: "BAM"},
  { name : "BBD", value: "BBD"},
  { name : "BDT", value: "BDT"},
  { name : "BGN", value: "BGN"},
  { name : "BIF", value: "BIF"},
  { name : "BMD", value: "BMD"},
  { name : "BND", value: "BND"},
  { name : "BOB", value: "BOB"},
  { name : "BRL", value: "BRL"},
  { name : "BSD", value: "BSD"},
  { name : "BWP", value: "BWP"},
  { name : "BYN", value: "BYN"},
  { name : "BZD", value: "BZD"},
  { name : "CAD", value: "CAD"},
  { name : "CDF", value: "CDF"},
  { name : "CHF", value: "CHF"},
  { name : "CLP", value: "CLP"},
  { name : "CNY", value: "CNY"},
  { name : "COP", value: "COP"},
  { name : "CRC", value: "CRC"},
  { name : "CVE", value: "CVE"},
  { name : "CZK", value: "CZK"},
  { name : "DJF", value: "DJF"},
  { name : "DKK", value: "DKK"},
  { name : "DOP", value: "DOP"},
  { name : "DZD", value: "DZD"},
  { name : "EGP", value: "EGP"},
  { name : "ETB", value: "ETB"},
  { name : "EUR", value: "EUR"},
  { name : "FJD", value: "FJD"},
  { name : "FKP", value: "FKP"},
  { name : "GBP", value: "GBP"},
  { name : "GEL", value: "GEL"},
  { name : "GIP", value: "GIP"},
  { name : "GMD", value: "GMD"},
  { name : "GNF", value: "GNF"},
  { name : "GTQ", value: "GTQ"},
  { name : "GYD", value: "GYD"},
  { name : "HKD", value: "HKD"},
  { name : "HNL", value: "HNL"},
  { name : "HTG", value: "HTG"},
  { name : "HUF", value: "HUF"},
  { name : "IDR", value: "IDR"},
  { name : "ILS", value: "ILS"},
  { name : "INR", value: "INR"},
  { name : "ISK", value: "ISK"},
  { name : "JMD", value: "JMD"},
  { name : "JPY", value: "JPY"},
  { name : "KES", value: "KES"},
  { name : "KGS", value: "KGS"},
  { name : "KHR", value: "KHR"},
  { name : "KMF", value: "KMF"},
  { name : "KRW", value: "KRW"},
  { name : "KYD", value: "KYD"},
  { name : "KZT", value: "KZT"},
  { name : "LAK", value: "LAK"},
  { name : "LBP", value: "LBP"},
  { name : "LKR", value: "LKR"},
  { name : "LRD", value: "LRD"},
  { name : "LSL", value: "LSL"},
  { name : "MAD", value: "MAD"},
  { name : "MDL", value: "MDL"},
  { name : "MGA", value: "MGA"},
  { name : "MKD", value: "MKD"},
  { name : "MMK", value: "MMK"},
  { name : "MNT", value: "MNT"},
  { name : "MOP", value: "MOP"},
  { name : "MRO", value: "MRO"},
  { name : "MUR", value: "MUR"},
  { name : "MVR", value: "MVR"},
  { name : "MWK", value: "MWK"},
  { name : "MXN", value: "MXN"},
  { name : "MYR", value: "MYR"},
  { name : "MZN", value: "MZN"},
  { name : "NAD", value: "NAD"},
  { name : "NGN", value: "NGN"},
  { name : "NIO", value: "NIO"},
  { name : "NOK", value: "NOK"},
  { name : "NPR", value: "NPR"},
  { name : "NZD", value: "NZD"},
  { name : "PAB", value: "PAB"},
  { name : "PEN", value: "PEN"},
  { name : "PGK", value: "PGK"},
  { name : "PHP", value: "PHP"},
  { name : "PKR", value: "PKR"},
  { name : "PLN", value: "PLN"},
  { name : "PYG", value: "PYG"},
  { name : "QAR", value: "QAR"},
  { name : "RON", value: "RON"},
  { name : "RSD", value: "RSD"},
  { name : "RUB", value: "RUB"},
  { name : "RWF", value: "RWF"},
  { name : "SAR", value: "SAR"},
  { name : "SBD", value: "SBD"},
  { name : "SCR", value: "SCR"},
  { name : "SEK", value: "SEK"},
  { name : "SGD", value: "SGD"},
  { name : "SHP", value: "SHP"},
  { name : "SLE", value: "SLE"},
  { name : "SOS", value: "SOS"},
  { name : "SRD", value: "SRD"},
  { name : "STD", value: "STD"},
  { name : "SZL", value: "SZL"},
  { name : "THB", value: "THB"},
  { name : "TJS", value: "TJS"},
  { name : "TOP", value: "TOP"},
  { name : "TRY", value: "TRY"},
  { name : "TTD", value: "TTD"},
  { name : "TWD", value: "TWD"},
  { name : "TZS", value: "TZS"},
  { name : "UAH", value: "UAH"},
  { name : "UGX", value: "UGX"},
  { name : "UYU", value: "UYU"},
  { name : "UZS", value: "UZS"},
  { name : "VND", value: "VND"},
  { name : "VUV", value: "VUV"},
  { name : "WST", value: "WST"},
  { name : "XAF", value: "XAF"},
  { name : "XCD", value: "XCD"},
  { name : "XOF", value: "XOF"},
  { name : "XPF", value: "XPF"},
  { name : "YER", value: "YER"},
  { name : "ZAR", value: "ZAR"},
  { name : "ZMW", value: "ZMW"}
 
];

export const allDays = [
  { name: "Select", value: "" },
  { name: "Sunday", value: "Sunday" },
  { name: "Monday", value: "Monday" },
  { name: "Tuesday", value: "Tuesday" },
  { name: "Wednesday", value: "Wednesday" },
  { name: "Thursday", value: "Thursday" },
  { name: "Friday", value: "Friday" },
  { name: "Saturday", value: "Saturday" },
];

