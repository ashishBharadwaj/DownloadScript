const fs = require("fs");
const chromeLauncher = require("chrome-launcher");
const CDP = require("chrome-remote-interface");
const Path = require('path')
const Listr = require('listr')
const Axios = require('axios')

// Optional: set logging level of launcher to see its output.
// Install it using: npm i --save lighthouse-logger
// const log = require('lighthouse-logger');
// log.setLevel('info');

/**
 * Launches a debugging instance of Chrome.
 * @param {boolean=} headless True (default) launches Chrome in headless mode.
 *     False launches a full version of Chrome.
 * @return {Promise<ChromeLauncher>}
 */
function launchChrome(headless = true) {
  return chromeLauncher.launch({
    // port: 9222, // Uncomment to force a specific port of your choice.
    chromeFlags: [headless ? "--headless" : ""]
  });
}

let rootPath = Path.resolve(__dirname,"downloads", "CSS - The Complete Guide");

let stObj = `

[
  {
    "sectionName": "Responsive Design",
    "videos": [      
      {
        "name": "Making the Plans Responsive (8:35)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913677",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/AgDHJVHuS4ak0BUccFKb"
        ]
      },
      {
        "name": "Your Challenge (6:06)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913671",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Y612GYOUTbGUJ8krKsag"
        ]
      },
      {
        "name": "Assignment - Responsive Websites (Problem) (3:00)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913666",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ACARseZ5TdOYnwqEAIwk"
        ]
      },
      {
        "name": "Assignment - Responsive Websites (Solution) (8:07)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913673",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/d2ec7h1pT1iThyUMwiEz"
        ]
      },
      {
        "name": "Working with Logical Operators (8:13)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913660",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/1qZlgIMtQXmqvLGgBiZc"
        ]
      },
      {
        "name": "Improving the Customers Page (14:58)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913663",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/zuaGnjWnQ2m01rUKmj7s"
        ]
      },
      {
        "name": "Improving the Packages Page (5:41)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913672",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/5sl1fMwRrKd6xQ2DaC8R"
        ]
      },
      {
        "name": "Cleaning Up the Navigation Bar (4:39)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913664",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/4XxAI9HYQOew9Mu54olt"
        ]
      },
      {
        "name": "Positioning our Footer Correctly (10:09)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913674",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/vW0iNtDWQlW7fy4jV87t"
        ]
      },
      {
        "name": "Wrap Up (2:15)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913662",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/TALpHNTYT4OpilscVfsb"
        ]
      },
      {
        "name": "Useful Resources & Links",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/14456719",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/U0bmw75zTv2h3jXJu0x3",
          "https://cdn.fs.teachablecdn.com/oqs8AMUTO2YmIXcoTHDY",
          "https://cdn.fs.teachablecdn.com/rh5iuiDkQlqYKqOw4Cuh",
          "https://cdn.fs.teachablecdn.com/HFhxnJhrTLCVQ8KDuIU5",
          "https://cdn.fs.teachablecdn.com/tlD6AV8uSWezRa5IwBo4",
          "https://cdn.fs.teachablecdn.com/g8irQnaNSceuBARs1eZm",
          "https://cdn.fs.teachablecdn.com/MOUsGxPeTnyXiCv6fNDg"
        ]
      }
    ]
  },
  {
    "sectionName": "Adding & Styling Forms",
    "videos": [
      {
        "name": "Module Introduction (1:32)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913695",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ScIgKRJAShqZtldOkVT0"
        ]
      },
      {
        "name": "Adding the Unstyled Form (2:37)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913700",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/zsCzMNuYTEOWJEmFPBSj"
        ]
      },
      {
        "name": "Page Initialization (6:35)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913697",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/jposoVdSSrWvfhpR7KBv"
        ]
      },
      {
        "name": "Understanding Advanced Attribute Selectors (6:02)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913694",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/TqDMZ9GQQVOrHo9i8tWu"
        ]
      },
      {
        "name": "Working on the General Layout (7:15)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913692",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/uZDcmY7TOSvb5IRdpuVY"
        ]
      },
      {
        "name": "Restyling the Form Elements (6:29)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913693",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/mPOvcBTlQcmOmboByADg"
        ]
      },
      {
        "name": "Styling the Checkbox (6:52)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913696",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/TB0NcVNSVurBizBjS8bG"
        ]
      },
      {
        "name": "Providing Validation Feedback (8:50)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913691",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/a08WAdQQDGt7ZmMscdWA"
        ]
      },
      {
        "name": "Styling the Signup Button (3:42)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913699",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/jVPsZQ2QryQl7UleTVVQ"
        ]
      },
      {
        "name": "Fixing a Broken Link",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/14488028"
      },
      {
        "name": "Wrap Up (1:29)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913698",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/hSn26XsWTLes03uhuW58"
        ]
      },
      {
        "name": "Useful Resources & Links",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/14456720",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Tiwqjdh0Q7IO5kpQaSge",
          "https://cdn.fs.teachablecdn.com/VakLJEMzTbKWGlG1HTyP",
          "https://cdn.fs.teachablecdn.com/mW0FzuuHT2WuCcRqy0hc",
          "https://cdn.fs.teachablecdn.com/k2Hl2OhRuarkIpbwEHQm",
          "https://cdn.fs.teachablecdn.com/PVTCKIM1THqqlKdsyyDt",
          "https://cdn.fs.teachablecdn.com/JR3JHZRTdWXJccf1j286"
        ]
      }
    ]
  },
  {
    "sectionName": "Working with Text and Fonts",
    "videos": [
      {
        "name": "Module Introduction (1:20)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913707",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/4OiegLDR7OwcAY8SnGLS"
        ]
      },
      {
        "name": "Comparing Generic Families & Font Families (2:56)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913717",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ooiSYFU6TmCzt4YHXkBx"
        ]
      },
      {
        "name": "Understanding the Browser Settings (6:17)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913715",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ca4byGkYS4GaYsgJlQa7"
        ]
      },
      {
        "name": "Using the Default Font Families (6:53)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913705",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/s988vYhjSTKx1f4np7Bn"
        ]
      },
      {
        "name": "Understanding the 'font-family' Syntax (6:18)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913708",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/WCpX2p1yQO63SLqQRxoX"
        ]
      },
      {
        "name": "Working with Locally Saved Fonts (3:50)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913709",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/qUwgPGKSaWAYTtOnG1yg"
        ]
      },
      {
        "name": "Working with Google Fonts (10:28)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913714",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/gpLdNx0SRzCIsHQ2Y0EP"
        ]
      },
      {
        "name": "Understanding Font Faces & 'font-style' (6:49)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913716",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/5pD4tm4sT0iwwRqFdHix"
        ]
      },
      {
        "name": "Importing our Custom Fonts (9:03)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913712",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/BJrppRSuT5y534BM23yn"
        ]
      },
      {
        "name": "Understanding Font Formats (5:41)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913706",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/2VSihbAESTC8U1yMKeAb"
        ]
      },
      {
        "name": "Diving into Font Properties (3:10)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913721",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/h3mwIqvS3SksVPEH4czZ"
        ]
      },
      {
        "name": "Adding 'letter-spacing' (4:43)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913710",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/AWpC7I8eReC3cnfBNiqF"
        ]
      },
      {
        "name": "Changing the Line Height (6:07)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913713",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/enCBKJ7OTRqiMHHHY1E3"
        ]
      },
      {
        "name": "Applying 'text-decoration' & 'text-shadow' (5:51)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913719",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Edj0A7ORlOhutm4pu13e"
        ]
      },
      {
        "name": "Understanding the 'font' Shorthand (8:39)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913718",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/zOIv1yrwT6emOmr3vjVT"
        ]
      },
      {
        "name": "Loading Performance & 'font-display' (9:49)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913711",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ENaRWGRcyKSBHsOVVRPQ"
        ]
      },
      {
        "name": "Wrap Up (3:47)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913720",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/CotUKwlQfiIzIkeZrMOG"
        ]
      },
      {
        "name": "Useful Resources & Links",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/14456721",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/CAoyXDjlQ9SZcSd1Y5AN",
          "https://cdn.fs.teachablecdn.com/uYJqnvlMRkivrIgAabb8",
          "https://cdn.fs.teachablecdn.com/6TCHyT52TzqRcMca3FAb",
          "https://cdn.fs.teachablecdn.com/BbTtjNJRTYSB4W4ukbnJ",
          "https://cdn.fs.teachablecdn.com/Kp966GNjTCKJjq9qA18b",
          "https://cdn.fs.teachablecdn.com/Q65rLWlhReiTYxNofSIL",
          "https://cdn.fs.teachablecdn.com/C4z9wYN5TAWuPTWNCy9g",
          "https://cdn.fs.teachablecdn.com/DhXA2iyTRbSrl3cn7Jy1"
        ]
      }
    ]
  },
  {
    "sectionName": "Adding Flexbox to our Project",
    "videos": [
      {
        "name": "Optional: Expert Track Introduction (3:23)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913753",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/6mgmN5QDT6OV46JvvWFZ"
        ]
      },
      {
        "name": "Module Introduction (1:31)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913734",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/t9smiuoISlKznbFEFthe"
        ]
      },
      {
        "name": "How we Could Improve our Project (2:58)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913751",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/61IeoKmS96DC7Tcopc6K"
        ]
      },
      {
        "name": "Understanding Flexbox (3:18)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913739",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/8oJCc1FQ8OusD9FI9BaM"
        ]
      },
      {
        "name": "Creating a Flex Container (5:33)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913742",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/bxXdGiYTSmuYLCBeq4GO"
        ]
      },
      {
        "name": "Using 'flex-direction' & 'flex-wrap' (5:35)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913737",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/wzCPO0kzS5GsCd2wxapY"
        ]
      },
      {
        "name": "Understanding the Importance of Main Axis & Cross Axis (7:27)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913740",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/A7bZc8PpSjKodl3pD2Tz"
        ]
      },
      {
        "name": "Working with 'align-items' & 'justify-content' (10:59)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913747",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/1HoPFLtSTTS6VNEKUQvf"
        ]
      },
      {
        "name": "And What About 'align-content'? (2:40)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913749",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/tXP85KxSwSCizci6dxWw"
        ]
      },
      {
        "name": "Improving the Navigation Bar with Flexbox (12:02)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913750",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/k9HQ4gIEQISzUhoCr8mj"
        ]
      },
      {
        "name": "Your Challenge - Working on the Mobile Navigation Bar (4:16)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913752",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/xBMArZkhSTeICUvqAetZ"
        ]
      },
      {
        "name": "Improving the Footer (5:35)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913736",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ddndCUOsQ1lbjj0xF7l9"
        ]
      },
      {
        "name": "Assignment - Flexbox (Problem) (4:19)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913741",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/JPKKd58mSW6p9yxoyXJB"
        ]
      },
      {
        "name": "Assignment - Flexbox (Solution) (8:32)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913735",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/WlTsBF4sSdajUVCaALJb"
        ]
      },
      {
        "name": "Flexbox and the Z-Index",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/14488070"
      },
      {
        "name": "Adding Flexbox to the Customers Page (3:16)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913738",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ukCm3scRsGiESUCqU59x"
        ]
      },
      {
        "name": "Using the 'order' Property for a Flex Item (6:07)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913746",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/6yWteGGBQUqFsSOv5UBA"
        ]
      },
      {
        "name": "Working with 'align-self' (2:44)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913733",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/op9BYQllSs6WSARUzNjv"
        ]
      },
      {
        "name": "Understanding 'flex-grow' (7:35)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913744",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Zyl5PTLuQmCMZ4WZA0Jc"
        ]
      },
      {
        "name": "Applying 'flex-shrink' (3:12)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913743",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/lEijxJNHS8WiW4ONLNzX"
        ]
      },
      {
        "name": "Comparing 'flex-basis' vs 'width' & 'height' (8:35)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913745",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/DkzaF4H7TByGMrjdlKnH"
        ]
      },
      {
        "name": "Wrap Up (3:52)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913748",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/3k2nfFSdSkCrSYzMtvOR"
        ]
      },
      {
        "name": "Useful Resources & Links",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/14456723",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/g2apfPMmQFVoKViUitEi",
          "https://cdn.fs.teachablecdn.com/j4cwYWRl66PnvPU0Ke1A",
          "https://cdn.fs.teachablecdn.com/lACjDdDLTN2CqxmUzk5i",
          "https://cdn.fs.teachablecdn.com/jaIKp20QRtiOm2BlxFOV",
          "https://cdn.fs.teachablecdn.com/t7bqkrRrSl6x4kyMZ7eG",
          "https://cdn.fs.teachablecdn.com/8AmlvloUTkytPZo1sXnn",
          "https://cdn.fs.teachablecdn.com/7ahDlc5qTEKzqcfVHwF6",
          "https://cdn.fs.teachablecdn.com/o6C0Br0ITAmW1MGxgGl3",
          "https://cdn.fs.teachablecdn.com/E5ukMhR5RpCDMOceZnUq"
        ]
      }
    ]
  },
  {
    "sectionName": "Using the CSS Grid",
    "videos": [
      {
        "name": "Module Introduction (1:14)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913840",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/QiTQBVajSN28r4IOYiir"
        ]
      },
      {
        "name": "What is the CSS Grid? (1:27)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913875",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/fjKnQ327SKegVpkFwhbJ"
        ]
      },
      {
        "name": "Getting Started (2:22)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913859",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/vhglBmORXiZwrYnVS1iP"
        ]
      },
      {
        "name": "Turning a Container into a Grid (3:21)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913849",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ZSyPY7DNQzOWQcnrUIkq"
        ]
      },
      {
        "name": "Defining Columns & Rows (5:49)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913841",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/4XACXjPaTkGb9nreIvN5"
        ]
      },
      {
        "name": "Positioning Child Elements in a Grid (4:13)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913846",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/pj6ZUAzRUGVjlfR5QTZd"
        ]
      },
      {
        "name": "Using 'element-sizing', 'repeat' & 'minmax' (6:45)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913882",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/H2hQgxYQSHapF38tBstk"
        ]
      },
      {
        "name": "Advanced Element Positioning (6:30)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913843",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/vJP4wu8oSiS84LWL81p7"
        ]
      },
      {
        "name": "Working with Named Lines (3:53)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913881",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/1FvoDpslRse5IGX6X7Dy"
        ]
      },
      {
        "name": "Assignment - Grid (Problem) (0:49)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913850",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/PQjxgT4LQH6Jhp728trx"
        ]
      },
      {
        "name": "Assignment - Grid (Solution) (9:14)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913852",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/nsQeMSQR6Omq7syDbhFf"
        ]
      },
      {
        "name": "Understanding Column & Row Shorthands (2:54)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913877",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/KKGSQLiQv2q7OqMOi8g7"
        ]
      },
      {
        "name": "Working with Gaps (2:33)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913845",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/eR5T2wdRv25pqPEaz5ni"
        ]
      },
      {
        "name": "Adding Named Template Areas (6:39)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913879",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/8aODCwJHQJapGDRTYEFQ"
        ]
      },
      {
        "name": "Assignment - Diving Deeper (Problem) (0:38)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913857",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/N7lviG1uSeKH9AzEnCqn"
        ]
      },
      {
        "name": "Assignment - Diving Deeper (Solution) (3:22)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913854",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Yg6pKahmQg2BsZgVKHlR"
        ]
      },
      {
        "name": "Creating Automatically Generated Grid Areas (7:10)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913837",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Sjio1BPeRnGoeFWAjFWM"
        ]
      },
      {
        "name": "Using the Grid on our Project (9:10)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913853",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/GZQ1WKlTjgsgBIJmbl1w"
        ]
      },
      {
        "name": "Working with 'fit-content' (3:31)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913839",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/g6jkm7qgTkKLbt53BJVu"
        ]
      },
      {
        "name": "Positioning Grid Elements (3:35)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913844",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/zcxGm1fASs6Z6YH7jFkt"
        ]
      },
      {
        "name": "Positioning the Entire Grid Content (3:17)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913876",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/JxnNzmDJShebPaki8kdM"
        ]
      },
      {
        "name": "Positioning Elements Individually (1:34)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913838",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/SR2xmJGgSDSEX3LgR2zx"
        ]
      },
      {
        "name": "Understanding Responsive Grids (5:30)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913848",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/5f2h2b3BQxeOLDUpxKeF"
        ]
      },
      {
        "name": "Applying Autoflow (6:39)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913880",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/srtY3LEkTXexAfux3PbL"
        ]
      },
      {
        "name": "Comparing the Explicit & Implicit Grid (2:31)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913847",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/f1x426Y0RpuM0d0dqQzZ"
        ]
      },
      {
        "name": "Understanding 'auto-fill' & 'auto-fit' (3:33)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913867",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Dz37vMztRXiHnd5d2JgK"
        ]
      },
      {
        "name": "Creating a Dense Grid (3:22)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913855",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/g9CcNmwSpy79oDXmMqS3"
        ]
      },
      {
        "name": "Styling the Project Form with Grid (9:45)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913842",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/KHiPWdlxSDaKCJLUeJVu"
        ]
      },
      {
        "name": "Comparing Grid & Flexbox (2:27)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913878",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/JhRsP6NR9m2B1ElSz3uA"
        ]
      },
      {
        "name": "Next Steps (1:31)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913858",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/6xgtKlDpTTWOsfZnE8Pr"
        ]
      },
      {
        "name": "Wrap Up (3:49)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913856",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/5qqNrtkTx2N8IrXJ0dPg"
        ]
      },
      {
        "name": "Useful Resources & Links",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/14456725",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/PcnslljQgiCjMQy30WQT",
          "https://cdn.fs.teachablecdn.com/C6RNR7z1RPi9cexy15d0",
          "https://cdn.fs.teachablecdn.com/6V7AUFMDQKu3MctQxanM",
          "https://cdn.fs.teachablecdn.com/1uiIeT9LRlamATKrmKLO",
          "https://cdn.fs.teachablecdn.com/e2v3ir9xTPWmScy5LOR5",
          "https://cdn.fs.teachablecdn.com/WqkYmDIiQ0uDNKFnS65M",
          "https://cdn.fs.teachablecdn.com/5KTvbzc0Spe9GhgKkyTz",
          "https://cdn.fs.teachablecdn.com/jJhSyVtvQD2XAHWeWW6x",
          "https://cdn.fs.teachablecdn.com/Hp3dE4iTR62ND0HCGZJq",
          "https://cdn.fs.teachablecdn.com/Ic6RcnarRTiovySSxLN3",
          "https://cdn.fs.teachablecdn.com/dqxjdOl9SguFzYdvhbqx",
          "https://cdn.fs.teachablecdn.com/P6mkqgJfSPaWN8WsLI3s",
          "https://cdn.fs.teachablecdn.com/6IpXJY2cQHaBe90sne2M",
          "https://cdn.fs.teachablecdn.com/vxYYu5r8SSaVDUXQIDLL",
          "https://cdn.fs.teachablecdn.com/2Mtz6ELVQ9uVJvjKDWzx",
          "https://cdn.fs.teachablecdn.com/hm2B4tFkSUGoSab3sqtt"
        ]
      }
    ]
  },
  {
    "sectionName": "Transforming Elements with CSS Transforms",
    "videos": [
      {
        "name": "Module Introduction (0:31)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913890",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/lYx0RexT7Kyyd64cDSQg"
        ]
      },
      {
        "name": "Rotating Elements and setting transform-origin (3:45)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913895",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/4tptteS5CMuIRvePtww1"
        ]
      },
      {
        "name": "Using Rotate and Translate (4:57)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913897",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/NZUAK3ydSqeMrn8mmlxw"
        ]
      },
      {
        "name": "Working with 'skew' and 'scale' (6:18)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913898",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/EagEQCXNQTygMwkf94bx"
        ]
      },
      {
        "name": "Applying Transformation Shorthands (2:23)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913891",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/5skMcXzNTJy7cpThNRqb"
        ]
      },
      {
        "name": "Rotating Elements in 3 Dimensions (4:19)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913888",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/UYzSrQBqRakEJL7pKTGg"
        ]
      },
      {
        "name": "Understanding the 'perspective' Property (3:37)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913889",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/EKEdLUqWS2SWtl5QT5Tn"
        ]
      },
      {
        "name": "Moving Elements along the Z-Axis with 'translateZ' (3:54)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913892",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/rKGD5cq0SlizEcpD0RSN"
        ]
      },
      {
        "name": "Rotating the Container with 'transform style' (3:44)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913893",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/5B9F6zMRR6qwnO2hZQmD"
        ]
      },
      {
        "name": "Flipping Elements & 'backface-visibility' (1:15)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913894",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/NyQuAZGFT8uV4lN2Bgcq"
        ]
      },
      {
        "name": "Wrap Up (1:14)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913896",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/s0ZGyirGRvaC5p4FywVs"
        ]
      },
      {
        "name": "Useful Resources & Links",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/14456726",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/u8VfQWy0T3KQc3cqwIV9",
          "https://cdn.fs.teachablecdn.com/PJuh8QfuQKyvrXtrzZjA",
          "https://cdn.fs.teachablecdn.com/WeLM85nVTNeuo8RpR1TJ",
          "https://cdn.fs.teachablecdn.com/5T0rtaSWSnWMvGsNFyPg",
          "https://cdn.fs.teachablecdn.com/aqnNSeSR2SvT9wfDN1lV",
          "https://cdn.fs.teachablecdn.com/YnnRjQhCTuWNtD9sCdjV",
          "https://cdn.fs.teachablecdn.com/64VoZszuTdqx1G7FyTBn",
          "https://cdn.fs.teachablecdn.com/DfjwBxpSQraP2hJcS3eD"
        ]
      }
    ]
  },
  {
    "sectionName": "Transitions & Animations in CSS",
    "videos": [
      {
        "name": "Module Introduction (0:22)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913911",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/MscE6fTEeZ5JnryqusZQ"
        ]
      },
      {
        "name": "Understanding and Applying Transitions (7:23)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913920",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/fippQpPkQiq9sieMMN6d"
        ]
      },
      {
        "name": "CSS 'transition' Property Deep Dive",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/14488207"
      },
      {
        "name": "Working with Timing Functions (2:50)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913919",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/BswFqSsZT6avMm4JZXXZ"
        ]
      },
      {
        "name": "Transitions & 'display' (6:11)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913915",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/eSckBd9SQer6tsPLZAlJ"
        ]
      },
      {
        "name": "Assignment - CSS Transitions (Problem) (0:48)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913913",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/XNRRzsCNS5W6jUNB1a6N"
        ]
      },
      {
        "name": "Assignment - CSS Transitions (Solution) (2:12)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913916",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/4FnapRCFQHifJ8vWStjH"
        ]
      },
      {
        "name": "Using CSS Animations (9:00)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913912",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ppiiCUk1TQyBfXzOSXUU"
        ]
      },
      {
        "name": "CSS 'animation' Property Deep Dive",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/14488219"
      },
      {
        "name": "Adding Multiple Keyframes (3:22)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913921",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/WU1OZrzfT5mukcD8t8fC"
        ]
      },
      {
        "name": "Adding Animations to our Customers Page (3:59)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913910",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/1Hy6OVZ1Q6FHTPtxMy0a"
        ]
      },
      {
        "name": "Assignment - Animations (Problem) (0:33)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913917",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/rqLZLG6QU6KP2NpO9arw"
        ]
      },
      {
        "name": "Assignment - Animations (Solution) (3:03)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913909",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Sune3YTlSQOmdR56IKei"
        ]
      },
      {
        "name": "Using JavaScript Animation Event Listeners (3:24)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913918",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/1ARg6d9TdCHic3CesvA2"
        ]
      },
      {
        "name": "Wrap Up (1:35)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913914",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/m5DGgZTKCwZngomrshrw"
        ]
      },
      {
        "name": "Useful Resources & Links",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/14456727",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/uaBnYRmQEyFXia1vPJh3",
          "https://cdn.fs.teachablecdn.com/sbQqjwlRRe9DPAzpPR5Q",
          "https://cdn.fs.teachablecdn.com/EswgeWSoQYOvM8QZ9vGj",
          "https://cdn.fs.teachablecdn.com/JA7c3Ut3TeS06fg8kWji",
          "https://cdn.fs.teachablecdn.com/8U925xWZREKNHRI4HgIl",
          "https://cdn.fs.teachablecdn.com/pPSpfO1kTZq6nVpI5Ho3",
          "https://cdn.fs.teachablecdn.com/8CG39VINQ2u55d0AMTJT"
        ]
      }
    ]
  },
  {
    "sectionName": "Writing Future-Proof CSS Code",
    "videos": [
      {
        "name": "Module Introduction (0:34)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913950",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Uupost6eSnaCtxhQvyxF"
        ]
      },
      {
        "name": "CSS Modules & Their Working Groups (1:55)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913945",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/5uInlTP5QeHdU83QqhYL"
        ]
      },
      {
        "name": "Using CSS Variables (7:31)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913949",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/GLg6cN1mRrRAso4IJtKD"
        ]
      },
      {
        "name": "Understanding & Using Vendor Prefixes (4:47)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913952",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/3HR7Vu4QQ3KDA74qDLVa"
        ]
      },
      {
        "name": "Which Prefixes Should You Use? (2:58)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913947",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/bV1WBRSCSUGjjHZBfEc7"
        ]
      },
      {
        "name": "Detecting Browser Support with @supports (5:09)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913951",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/H7TDIkIKSjORIJacLJNP"
        ]
      },
      {
        "name": "Polyfills (2:45)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913953",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/USiwE40vS12CMhjbBjyB"
        ]
      },
      {
        "name": "Eliminating Cross-Browser Inconsistencies (2:58)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913944",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/BVSeoqIUSyaKGdFFptUw"
        ]
      },
      {
        "name": "How to Name CSS Classes (4:52)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913948",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/JHnXh2fhQ3CWS0zuHEbH"
        ]
      },
      {
        "name": "Vanilla CSS vs Frameworks (8:36)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913943",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/KgHnjsWQpJCaZ5HKsPAY"
        ]
      },
      {
        "name": "Wrap Up (4:16)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913946",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/WjlP0L2lTAKJkYxWsBqg"
        ]
      },
      {
        "name": "Useful Resources & Links",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/14456728",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/mRPQVmsbT3WQJmdksLQM",
          "https://cdn.fs.teachablecdn.com/JDvM9eNWQgqFPXs7Vkw9",
          "https://cdn.fs.teachablecdn.com/ue6yQEHS0azmDfUER380"
        ]
      }
    ]
  },
  {
    "sectionName": "Introducing Sass (Syntactically Awesome Style Sheets)",
    "videos": [
      {
        "name": "Module Introduction (0:42)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913982",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/6bb3Mf1FRhKQEqYW4TEB"
        ]
      },
      {
        "name": "What is Sass & Scss? (3:30)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913977",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/mXXokiISE68EpcYs9Qnr"
        ]
      },
      {
        "name": "Installing Sass (4:25)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913969",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/uy5LHVUQ6qWkSsI9YbJe"
        ]
      },
      {
        "name": "Things to be Improved with Sass (1:33)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913972",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/BoaaNPqZQDQ9vpdfzd1w"
        ]
      },
      {
        "name": "Nesting Selectors (6:35)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913975",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/tjy50PjQM4jAXQTN5CwG"
        ]
      },
      {
        "name": "Adding Nested Properties (1:27)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913973",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/2pOMG0uiS5GYcUzAKFkg"
        ]
      },
      {
        "name": "Understanding Variables (3:05)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913967",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/D2yleeAjT16roXn9TIod"
        ]
      },
      {
        "name": "Storing Lists & Maps in Variables (5:58)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913983",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/cipBtDwHRTehXJEOVIn6"
        ]
      },
      {
        "name": "Built-In Functions (3:18)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913971",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/4twC0VshSydM9bzb33Tx"
        ]
      },
      {
        "name": "Assignment - Sass (Problem) (0:49)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913978",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/1lgpSWCPQhqKFEEHfYgd"
        ]
      },
      {
        "name": "Assignment - Sass (Solution) (3:42)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913980",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ycHnzJv7Sp6atwl2BTwG"
        ]
      },
      {
        "name": "Adding Simple Arithmetics (2:24)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913966",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/CPUJrjWlTRObt4jvaFxN"
        ]
      },
      {
        "name": "Adding Better Import and Partials (4:46)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913970",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/s3vToF2Qh6YY0bOBYbXQ"
        ]
      },
      {
        "name": "Improving Media Queries (2:24)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913981",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/nHFIOUKNTv6VMgcYz8Es"
        ]
      },
      {
        "name": "Understanding Inheritance (3:33)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913976",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Je9j6MpXTK21XsMuAtAo"
        ]
      },
      {
        "name": "Adding Mixins (6:45)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913979",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/3amKXYZFSz2D7i8WIwS0"
        ]
      },
      {
        "name": "Using the Ampersand Operator (2:57)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913968",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/IbiiiGOfQyOFTBQ4JNfZ"
        ]
      },
      {
        "name": "Wrap Up (1:13)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913974",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/a8bObtzqQjSZKOK8NJuf"
        ]
      },
      {
        "name": "Useful Resources & Links",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/14456729",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/859x89sQeOjrHAS2sOqc",
          "https://cdn.fs.teachablecdn.com/GitYKOwrTty2WPpo1AxC",
          "https://cdn.fs.teachablecdn.com/ZFI0XSK6SJGWLGBiKwLe",
          "https://cdn.fs.teachablecdn.com/PcNLkfP6Q6o5UqT5ynpw",
          "https://cdn.fs.teachablecdn.com/yzRoe7AwSrKjWBoruIPg"
        ]
      }
    ]
  },
  {
    "sectionName": "Course Roundup",
    "videos": [
      {
        "name": "Course Roundup (1:56)",
        "link": "https://pro.academind.com/courses/css-the-complete-guide-2020-incl-flexbox-grid-sass/lectures/13913995",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Z3vJPd0FSsKF2143qDim"
        ]
      }
    ]
  }
]

`
let obj = JSON.parse(stObj);
init();
async function init(){
  //await getDownloadURLS();
  await downloadVideos();
}
async function getDownloadURLS() {
  const chrome = await launchChrome(false);
  for (let i = 0; i < obj.length; i++) {
    let videoArr = obj[i].videos;
    for (let j = 0; j < videoArr.length; j++) {
      await navigate(chrome, videoArr[j].link, i, j);
    }
  }
  fs.writeFileSync(rootPath + "//Data.txt", JSON.stringify(obj));
}
async function navigate(chrome, url, outerIndex, innerIndex) {
  try {
    const protocol = await CDP({ port: chrome.port});

    // Extract the DevTools protocol domains we need and enable them.
    // See API docs: https://chromedevtools.github.io/devtools-protocol/
    const { Page, Runtime } = protocol;
    await Promise.all([Page.enable(), Runtime.enable()]);

    await Page.navigate({ url: url });

    // Wait for window.onload before doing stuff.
    await Page.loadEventFired();    
    const anchorListQuerry = "(function(){return Array.from(document.getElementsByClassName('download')).map(e=>e.href).join('---->>>>')})();";
        // Evaluate the JS expression in the page.
    const anchorListString = await Runtime.evaluate({ expression: anchorListQuerry });
    if(anchorListString && anchorListString.result && anchorListString.result.value){
      if( anchorListString.result.value.includes("cdn.fs.teachablecdn.com")){
        const arrAnchorUrls =  anchorListString.result.value.split("---->>>>");
        if(arrAnchorUrls && arrAnchorUrls.length>0){  
          obj[outerIndex].videos[innerIndex].downloadURLs = [];        
          for(let j = 0;j<arrAnchorUrls.length;j++){
            obj[outerIndex].videos[innerIndex].downloadURLs.push(arrAnchorUrls[j]);
          }
        }
      }
    }
    protocol.close();
  } catch (error) {
    console.log(error);
  }
}
async function downloadVideos(){
  for (let i = 0; i < obj.length; i++) {
    let videoArr = obj[i].videos;
    let downloadPath =Path.resolve(  rootPath , obj[i].sectionName);
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath);
    }
    for (let j = 0; j < videoArr.length; j++) {
      await createDownloadTask(videoArr[j], i, j);
    }
  }
}

async function createDownloadTask(vidObj, outerIndex, innerIndex){
  if(vidObj && vidObj.downloadURLs && vidObj.downloadURLs.length > 0){
    const tasks = [] 
    for(let i = 0;i< vidObj.downloadURLs.length; i++){
      tasks.push(
        {
          title: 'Downloading Files For -> ' + obj[outerIndex].videos[innerIndex].name + ' --> of Section -> ' + obj[outerIndex].sectionName,
          task: async (ctx, task) => {
            const url = vidObj.downloadURLs[i];          
      
            const response = await Axios({
              method: 'GET',
              url: url,
              responseType: 'stream'
            })
            const path = Path.resolve(rootPath, obj[outerIndex].sectionName ,response.headers["content-disposition"].split("filename=")[1].split('"')[1])
            response.data.pipe(fs.createWriteStream(path))
      
            return new Promise((resolve, reject) => {
              response.data.on('end', () => {
                resolve()
              })
      
              response.data.on('error', err => {
                reject(err)
              })
            })
          }
        }
      )
    }    
    try{
      const tasklist = new Listr(tasks)
      await tasklist.run();
    }
    catch(error){
      console.log(error);
    }
  }
  
} 
