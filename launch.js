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

let rootPath = '/home/ashishb/Videos/Academind Tutorials/React-Ionic/' ;

let stObj = `

[
  {
    "sectionName": "Getting Started",
    "videos": [
      {
        "name": "Welcome! (4:46)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14352988",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/VeVHgpq9QxuIxsBZlBJe"
        ]
      },
      {
        "name": "What is Ionic? (4:22)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341439",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ErYGNDOzRSCU24Ijo29R"
        ]
      },
      {
        "name": "Why Ionic? (2:41)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341440",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/hMu3ZLGlQQzObkPqpNZg"
        ]
      },
      {
        "name": "Why React? (2:42)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341441",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/sUpkj6sOTpylciaTQMiL"
        ]
      },
      {
        "name": "Join the Online Learning Community",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341628"
      },
      {
        "name": "The Anatomy of an Ionic Project (3:52)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341442",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/TJmutDhRbW2k0GpSdfCC"
        ]
      },
      {
        "name": "Ionic - Behind the Scenes (5:45)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341443",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/jTKKCwZmRgibQvcXQPJm"
        ]
      },
      {
        "name": "Ionic Alternatives (4:13)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341445",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/7Q7OT7TNSOaeaStphbYg"
        ]
      },
      {
        "name": "The Ionic History (3:19)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341446",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/8pyPk1NZT6SZgUH6Ts3a"
        ]
      },
      {
        "name": "Getting The Most Out Of The Course (2:29)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341444",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/P0ae6Gb7QAaQYGpOUv6T"
        ]
      }
    ]
  },
  {
    "sectionName": "Ionic - The Basics",
    "videos": [
      {
        "name": "Module Introduction (1:02)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341456",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/CEGMeTSRPy4T3zatFnTQ"
        ]
      },
      {
        "name": "Ionic Overview (5:15)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341448",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/qjuEZv94RN2f8l4teWsR"
        ]
      },
      {
        "name": "Using Ionic Components (9:22)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341450",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/CgKYMvADTuWoQif1R7L5"
        ]
      },
      {
        "name": "More Ionic Components (6:44)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341455",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/WG587O9IRhat5k281kff"
        ]
      },
      {
        "name": "Adding JavaScript (7:10)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341453",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/hkd9oGF9RW6rfTvyUZRy"
        ]
      },
      {
        "name": "Ionic Behind the Scenes (3:24)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341451",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/6qalIgXQa2OxAmqnGPsr"
        ]
      },
      {
        "name": "Styling & The Grid (4:40)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341452",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/fwfae01sRhOMO0op4pKF"
        ]
      },
      {
        "name": "Icons & Slots (6:09)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341449",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/NN1gU9wQTqQzb4qwGIlM"
        ]
      },
      {
        "name": "Finishing Touches (6:43)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341454",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/LMzsTKFDQSONWKczjsZi"
        ]
      },
      {
        "name": "Module Resources",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14345686",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/dX1lUBWSrSkM5wbaGrPz",
          "https://cdn.fs.teachablecdn.com/k8tjqH0dTLy4LHv9pEtn",
          "https://cdn.fs.teachablecdn.com/n9jkep0SJm878uWQvf9l",
          "https://cdn.fs.teachablecdn.com/R0Y7C0UTGC3quiuSruuw"
        ]
      }
    ]
  },
  {
    "sectionName": "Combining Ionic & Reactjs",
    "videos": [
      {
        "name": "Module Introduction (1:39)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341500",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ruwV8jkSyC5Y6AKREkew"
        ]
      },
      {
        "name": "Creating a Project (9:10)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341510",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/zAwag81ET1KZtIjPj1uA"
        ]
      },
      {
        "name": "Analyzing the Created Project (5:11)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341502",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/xN0iktmbQS5nl8BirYC6",
          "https://cdn.fs.teachablecdn.com/GQVHABiUQjGhuPXViULq"
        ]
      },
      {
        "name": "TypeScript & React (5:37)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341509",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/QEi3Tb57SKKM0ga4rkjP"
        ]
      },
      {
        "name": "Ionic Components vs React Components (4:31)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341503",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/g0z29CWfTD2zIByPHIVU"
        ]
      },
      {
        "name": "Building the First User Interface (10:11)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341508",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ejhFfbUKSnSWncP186IQ"
        ]
      },
      {
        "name": "Adding React Logic (19:00)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341505",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/4CK5xdHmSYmyv9P1PegZ"
        ]
      },
      {
        "name": "Managing State (6:21)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341511",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/F4KAzh1gTjaeF5nlnsPT"
        ]
      },
      {
        "name": "Splitting the App Into Components (10:54)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341507",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/BgODpYhEQOaTFDIfMbFp"
        ]
      },
      {
        "name": "Adding More Checks (2:49)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341504",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/MdmXjYLBTnKSwPQrATRX"
        ]
      },
      {
        "name": "Displaying an Alert (7:31)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341499",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/tlkkjmsoS6y3Ydda2Vx9"
        ]
      },
      {
        "name": "App Finetuning (1:47)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341506",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/V2EgBV8XSxSK0ubgP3tq"
        ]
      },
      {
        "name": "Adding Segment Buttons (5:44)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341497",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/BOqXjTR5SSSP9zAWMJFR"
        ]
      },
      {
        "name": "Connecting Components (6:26)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341501",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/H0NQKSDLTym367gjHeFe"
        ]
      },
      {
        "name": "Adding BMI Conversion Factors (5:14)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341498",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/vt1CoHwmSIKga7bC28hb"
        ]
      },
      {
        "name": "Module Resources",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14345850",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/IwOSAkQgQPuLsdK0pBWn",
          "https://cdn.fs.teachablecdn.com/RgQTAriRkHkDeITMwlOg",
          "https://cdn.fs.teachablecdn.com/CIOi750QRCyCXxq9cf73",
          "https://cdn.fs.teachablecdn.com/oWCoaO2vQ7meCY4YCsMf",
          "https://cdn.fs.teachablecdn.com/1C797w7SOiGNgbqvPQn7",
          "https://cdn.fs.teachablecdn.com/miQkTfeMRuOIlEfQkym1",
          "https://cdn.fs.teachablecdn.com/Fdx1ALvGQLyhkfy26ti6",
          "https://cdn.fs.teachablecdn.com/X1HLP3CJRHeyTgUjXgdE",
          "https://cdn.fs.teachablecdn.com/CLgqpGhR36UrVss8Ufz1"
        ]
      }
    ]
  },
  {
    "sectionName": "Building Native Mobile Apps with Capacitor",
    "videos": [
      {
        "name": "Module Introduction (1:20)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341594",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/CiQ5gEhSxu343Izzq0eU"
        ]
      },
      {
        "name": "Building a Web App (2:27)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341598",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/fcDrQFkGRSq9bqKAYMOp"
        ]
      },
      {
        "name": "Building an Android App (10:59)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341595",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/twPOO6jJSVZXL9vyJM6C"
        ]
      },
      {
        "name": "Running the App on a Real Android Device",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14360216"
      },
      {
        "name": "Running Apps as Mobile Apps (2:04)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341596",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/VKzbe7oTkysABkVddbow"
        ]
      },
      {
        "name": "Building an iOS App (6:18)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341593",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/XlFNT0PwR5SlXBr9q251"
        ]
      },
      {
        "name": "Wrap Up (0:40)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341597",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/JC5xByQT2WpRdo8IUgUj"
        ]
      },
      {
        "name": "Module Resources",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14345984"
      }
    ]
  },
  {
    "sectionName": "Debugging",
    "videos": [
      {
        "name": "Module Introduction (0:45)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341623",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Z4LTwr4MQ1uLpoaiR9QE"
        ]
      },
      {
        "name": "Understanding Error Messages (4:31)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341624",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/B2LfPKxJQdKAKqOj1sID"
        ]
      },
      {
        "name": "Browser DevTools & Breakpoints (5:06)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341626",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/XoSocjrvQ46pnFWq9DYI"
        ]
      },
      {
        "name": "UI Debugging (2:12)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341622",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/OVh3iSITZK0gCeXOobMo"
        ]
      },
      {
        "name": "Debugging Native Apps (3:42)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341625",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/67saBOc1TYePxh1dck2c"
        ]
      },
      {
        "name": "Wrap Up (1:06)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341627",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/jEDqKrjTPeeDcn6Bcmvf"
        ]
      },
      {
        "name": "Module Resources",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14346104",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/qDTjbMdS4hcutK8uTO8w"
        ]
      }
    ]
  },
  {
    "sectionName": "Styling & Theming",
    "videos": [
      {
        "name": "Module Introduction (1:06)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341641",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/TpZvnTokTH2ngJNxvdLi"
        ]
      },
      {
        "name": "How Styling Works (6:20)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341651",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/0S94ciOUTYWvwpRoG4OQ"
        ]
      },
      {
        "name": "Getting Started with Theming & Variables (7:26)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341643",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/RKrpoIQmTUS96v5dTQ4p"
        ]
      },
      {
        "name": "Using the Ionic Color Generator (2:28)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341650",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/JqXB5PjS4ysjH3Fch0aV"
        ]
      },
      {
        "name": "Platform-specific Styles (3:57)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341648",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/PJgPo4ZTJmguuE6m8XK4"
        ]
      },
      {
        "name": "Component-specific Variables (4:27)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341647",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/M0uXYfeHR2i95YiG9gxA"
        ]
      },
      {
        "name": "Theme Variables - Summary (4:59)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341649",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/skPNW5GT12BbmIBeSkt0"
        ]
      },
      {
        "name": "The Responsive Ionic Grid (20:57)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341646",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/24MWFh8lReCM62zHiLEP"
        ]
      },
      {
        "name": "Applying the Grid to the App (5:43)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341642",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/wfPqc3HKTt2vNQLFL58n"
        ]
      },
      {
        "name": "Configuring a Component via Props (4:08)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341645",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/tbk4B2K2SWmH2edqlbbQ"
        ]
      },
      {
        "name": "Adding Custom CSS Styles (4:27)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341644",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/JKBkXGGITqKBEmr385Wo"
        ]
      },
      {
        "name": "Module Resources",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14346124",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/FdPJIfMBQ1eBugDxVPIu",
          "https://cdn.fs.teachablecdn.com/WxnO0VZbTR20vj8QyZiB",
          "https://cdn.fs.teachablecdn.com/LOhjZVrqQCOlhirURQ8P",
          "https://cdn.fs.teachablecdn.com/keMxjpG8Txu1ikTzZGYu",
          "https://cdn.fs.teachablecdn.com/zukPwEwTTRGPYQZxARIr",
          "https://cdn.fs.teachablecdn.com/hWNJpwfFSkiYrlPOd2dD"
        ]
      }
    ]
  },
  {
    "sectionName": "Navigation - Stack Navigation, Tabs, Side Drawers",
    "videos": [
      {
        "name": "Module Introduction (1:57)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341694",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/SRKPI6N1SjKuDBo4Hh1I"
        ]
      },
      {
        "name": "A First Page & Routing (8:43)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341679",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/COXikLT2RhKsLX8JDcLy",
          "https://cdn.fs.teachablecdn.com/Yvspoy31STKvS7ylje2q"
        ]
      },
      {
        "name": "Adding a Second Route (3:33)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341686",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ZaJGyirKQSjAMh6Y5yvx"
        ]
      },
      {
        "name": "Push-Pop Navigation (Stack of Pages) (7:41)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341677",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Z3UXT7NLRvqIJrhZYwsR"
        ]
      },
      {
        "name": "Programmatic Navigation (4:28)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341698",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/FI6qYh3sSByP13FJ9V8W"
        ]
      },
      {
        "name": "Adding Tabs (9:28)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341692",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/QlmFck1US9aSiH2Q9WTx"
        ]
      },
      {
        "name": "App-wide Component Style Variables (7:07)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341683",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/7aneFW7yTHyqnOhRXRYd"
        ]
      },
      {
        "name": "Adding Dummy Data (4:20)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341693",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/REilNgDqTNiXRnlryIkp"
        ]
      },
      {
        "name": "Working with Dynamic Routes (7:00)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341681",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/rxX2tNxuRYiLupBqMcOS"
        ]
      },
      {
        "name": "Styling the 'Back Button' (1:11)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341684",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/fJ1ccVIT2ypgl7z8LO3Q"
        ]
      },
      {
        "name": "Adding a Side Menu (8:55)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341685",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/A0wM5NAxRoOBo7I3uO6a"
        ]
      },
      {
        "name": "More Styling & Animation Fixes (2:27)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341697",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/6eq8Fd7wScyHjL9RySVZ"
        ]
      },
      {
        "name": "Tabs & Side Drawer Combined (8:27)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341671",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/TU6rdtjzTBmoaMIDAZDJ"
        ]
      },
      {
        "name": "Module Resources",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14346166",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/eUIsg5EjRlZhGXjpwRRQ",
          "https://cdn.fs.teachablecdn.com/awLaem9DTUyngc0viUss",
          "https://cdn.fs.teachablecdn.com/2sFxoDxGRACrRQhEPvi7",
          "https://cdn.fs.teachablecdn.com/9ixmI4riR1GbtI8wFKBn",
          "https://cdn.fs.teachablecdn.com/J0m2JRsdStqpWSu0xSWn",
          "https://cdn.fs.teachablecdn.com/AK4glowRyuNL4gwPNW1Q",
          "https://cdn.fs.teachablecdn.com/eyRwoPR9SWCpu9KQRIvM",
          "https://cdn.fs.teachablecdn.com/IzwB0feuQlGG07oaaxGq",
          "https://cdn.fs.teachablecdn.com/qKVZVZSbQJC2kxDcHjgu",
          "https://cdn.fs.teachablecdn.com/bjIvcJFyQH66JnDRFX9L",
          "https://cdn.fs.teachablecdn.com/2ANMFAPbRsOFjqHR6JCH",
          "https://cdn.fs.teachablecdn.com/K2UZojAbSdWBSRX9JvRO"
        ]
      }
    ]
  },
  {
    "sectionName": "Ionic Component Deep Dive",
    "videos": [
      {
        "name": "Module Introduction (0:52)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341706",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ycQ4GYWFQ2WRR1w2ORNn"
        ]
      },
      {
        "name": "More on the Card Component (3:40)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341716",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/CE4m8Qg0RsWh1dmeI0lJ"
        ]
      },
      {
        "name": "Rendering a List with Items (7:53)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341705",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/c1Qxz0wS2afMnZhFOJeC"
        ]
      },
      {
        "name": "Adding Actions to List Items (6:26)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341713",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Tzkwi9CQtOlPhpZPF03f"
        ]
      },
      {
        "name": "Making Items Swipable (6:08)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341720",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/9mhQwOURTemCytd9bk50"
        ]
      },
      {
        "name": "Toolbar Buttons & Floating Action Buttons (10:13)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341710",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/qgl7VdBCT1ef5LHGS3MA"
        ]
      },
      {
        "name": "Showing an Alert (5:20)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341719",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/QGTA1GOVSdaP2R0xUrQH"
        ]
      },
      {
        "name": "Presenting a Toast Message (2:39)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341712",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/lXFVrGpSJC3Qe4hBqSwh"
        ]
      },
      {
        "name": "Showing a Modal (4:18)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341717",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/JcIQzwzSs66O6xuBqGdV"
        ]
      },
      {
        "name": "Adding Modal Content (13:34)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341711",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/mN7CxxfxS4iHhC4DQj4o"
        ]
      },
      {
        "name": "Closing Sliding Items (2:17)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341721",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/CqWtUuhSSl65v5W8AAjn"
        ]
      },
      {
        "name": "Your Challenge! (1:19)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341709",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/bgc9I3aIQPCprY6fTtVT"
        ]
      },
      {
        "name": "Adding a 'New Course' Modal (7:46)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341708",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/BNwPQKk7RkopTRt57GMy"
        ]
      },
      {
        "name": "Adding a DateTime Picker (3:13)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341718",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/FFT2R3AtSIKBSCgGnSCE"
        ]
      },
      {
        "name": "Rendering a List with All Goals (8:44)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341715",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/g4DgSSsRXVcML2HsAz6u"
        ]
      },
      {
        "name": "Adding Toggle Buttons for Filtering (5:01)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341714",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/XTZV7BgEShiW0amCosLz"
        ]
      },
      {
        "name": "Refactoring Components (12:23)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341707",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/FTBHj2yHTB2YHHmmRZcv"
        ]
      },
      {
        "name": "Module Resources",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14355942",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/gq2oBZwUTYe7TkIZIOUQ",
          "https://cdn.fs.teachablecdn.com/lrC6LbBJTb6W4CgWhhTe",
          "https://cdn.fs.teachablecdn.com/3NVbr4l7RrGak8iYVLVZ",
          "https://cdn.fs.teachablecdn.com/NcXfTuySw6zjafTTBbmL",
          "https://cdn.fs.teachablecdn.com/9A2dcnZZTXKkaFtn5Hpg",
          "https://cdn.fs.teachablecdn.com/KmD4gx3sQQuB5X0dENqo",
          "https://cdn.fs.teachablecdn.com/rQAaTbpARTmmN5zlYImV",
          "https://cdn.fs.teachablecdn.com/ucs9Jh8bTa600K62sg6M",
          "https://cdn.fs.teachablecdn.com/NDFa2tBFTbyMqY9ehQFo",
          "https://cdn.fs.teachablecdn.com/nXQsguYAQRyc8OfJOs2i",
          "https://cdn.fs.teachablecdn.com/A4MYGISbTIyDVjvuOxBW",
          "https://cdn.fs.teachablecdn.com/slJQIPBKRDuD0anZvRG7",
          "https://cdn.fs.teachablecdn.com/VSatO5mFT6KsF7gKlCuQ",
          "https://cdn.fs.teachablecdn.com/UUqnI1wTRX6bPA3MhjPQ",
          "https://cdn.fs.teachablecdn.com/b2smuZA1TOms0JodbgkD"
        ]
      }
    ]
  },
  {
    "sectionName": "Handling User Input & Application State",
    "videos": [
      {
        "name": "Module Introduction (0:54)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341727",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/uuofGMJKSkKmKNZo1B9P"
        ]
      },
      {
        "name": "Fetching & Validating User Input (8:16)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341732",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/0wayWw4FT0a1syUMMODH"
        ]
      },
      {
        "name": "Passing Data to the Modal Page (4:21)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341733",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/pZVKYcpZQByifFV63Igc"
        ]
      },
      {
        "name": "Setting Up Application Context (15:10)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341728",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/RhGDdPSjRakilfeBuI4m"
        ]
      },
      {
        "name": "Adding New Courses (8:19)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341735",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/gDlVzyrTHShW5UTMIGr6"
        ]
      },
      {
        "name": "Minor Fixes (1:34)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341729",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/MscgPszlRnCxOtT1WvYe"
        ]
      },
      {
        "name": "Adding a Goal (16:07)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341730",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/C7AX6Gd8TQKr51CwBeop"
        ]
      },
      {
        "name": "Deleting & Updating Goals (13:46)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341726",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Q9DvBjxcQvSTV9WhXqQf"
        ]
      },
      {
        "name": "Handling All Goals & Fixing a Warning (4:41)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341736",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/T8vbNINRpW2abQlZCfcs"
        ]
      },
      {
        "name": "Filtering Goals (9:01)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341731",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/r9Gk0iXmR7mUN0wCe7Te"
        ]
      },
      {
        "name": "Finishing Touches (4:07)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341734",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/bsRH6oQDSDKv9l6xdhba"
        ]
      },
      {
        "name": "Module Resources",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14355979",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/05aFuL9Q8Qy3bntWUlOQ",
          "https://cdn.fs.teachablecdn.com/mzHxyzWR4yhVK7cpZgL1",
          "https://cdn.fs.teachablecdn.com/OKZUfebiRgeDsowC8t5f",
          "https://cdn.fs.teachablecdn.com/oXEXxtVSh2xqmOgp54aN",
          "https://cdn.fs.teachablecdn.com/IV7Hy6TaOfwaOgzQgjvg",
          "https://cdn.fs.teachablecdn.com/lbtD4hNyQ7Kr6DmFy9cQ",
          "https://cdn.fs.teachablecdn.com/LpVhh1ufRyyb55fSqSEX",
          "https://cdn.fs.teachablecdn.com/9NUbsgQcOTwcCfnNSdUA",
          "https://cdn.fs.teachablecdn.com/aTZmIX2GRLxKVMsKaWLe"
        ]
      }
    ]
  },
  {
    "sectionName": "Using Native Device Features",
    "videos": [
      {
        "name": "Module Introduction (2:27)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341757",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/xG45gAHTDe5FjR9F86JA"
        ]
      },
      {
        "name": "Getting Started (2:41)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341750",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/tsTRAGHeQBCaC5B68aO3",
          "https://cdn.fs.teachablecdn.com/GxrrwwimQTKa6UlCKgGR"
        ]
      },
      {
        "name": "Adding Tabs Navigation (7:52)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341748",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ZVhNvEH4S4iCUYfyuq5g"
        ]
      },
      {
        "name": "Adding Toolbar Buttons & Fabs (6:30)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341747",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/6Z5aSRc2SvWwZcNSEKtl"
        ]
      },
      {
        "name": "Theming the App (4:07)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341746",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/fY8VhINRA60155BsU4wy"
        ]
      },
      {
        "name": "Preparing the 'NewMemory' Page (5:54)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341754",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/qVjDhyFZS3STTThGjwFK"
        ]
      },
      {
        "name": "Adding Capacitor (4:26)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341751",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/uhF05a7RIOKAGtJeRBaM"
        ]
      },
      {
        "name": "Using the Device Camera (13:22)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341755",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/Xjo09GIBRgOlWnijpoA2"
        ]
      },
      {
        "name": "Adding an Image Preview (5:51)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341758",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/IR1mgw0FSpmu4Rq1EYKs"
        ]
      },
      {
        "name": "Using the Filesystem API (8:15)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341761",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/EoNqTBfRkCWJ5sfQUY7a"
        ]
      },
      {
        "name": "Collecting User Input (5:28)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341752",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/dmLjSEJcQkyr3iFwYzYb"
        ]
      },
      {
        "name": "Storing Data in Context (14:44)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341760",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/7xn4dNu5Rny7N19bbHd2"
        ]
      },
      {
        "name": "Getting Image Previews via Context (5:03)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341756",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/UjhQDLSSwyVlariiBazb"
        ]
      },
      {
        "name": "Storing & Loading Data via Device Storage (19:58)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341753",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/pT1H3pI1R8ff24MMJ9IY"
        ]
      },
      {
        "name": "Refactoring (9:29)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341770",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/GXv5QeOTIVv4om4QQAVv"
        ]
      },
      {
        "name": "Native APIs in the Browser (8:31)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14501067",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/y6FyOyfSO5g30mMREiqg"
        ]
      },
      {
        "name": "A Fallback if no Camera is available (12:16)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14501068",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/V8hYhmllSZqaMXehgy6G"
        ]
      },
      {
        "name": "Running on a Real Device (2:09)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341749",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/PQeQ5MHOR1WNxk4YuY2X"
        ]
      },
      {
        "name": "Module Resources",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14355984",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ZIKsUUFwSteYPxFUssgG",
          "https://cdn.fs.teachablecdn.com/1VPBS5EYR6qYG6t63ukF",
          "https://cdn.fs.teachablecdn.com/pqzU1lFHTsi5AtYgu61V",
          "https://cdn.fs.teachablecdn.com/Mqz0tlRQzCzMG6N587Eg",
          "https://cdn.fs.teachablecdn.com/4w9D0FUQCeMvKs8dPT9n",
          "https://cdn.fs.teachablecdn.com/xoa7QNs5TSCraWv2FlRG",
          "https://cdn.fs.teachablecdn.com/eT3Tc2nsRLi08uXBaKPz",
          "https://cdn.fs.teachablecdn.com/MFWitp1TOSLsJQIenHMA",
          "https://cdn.fs.teachablecdn.com/SlOKJcHAT6OqL5VWso6t",
          "https://cdn.fs.teachablecdn.com/aXoYsSUS02dgcqQXxIH8",
          "https://cdn.fs.teachablecdn.com/6oUj1Qc0QLyqQ35jOHcK",
          "https://cdn.fs.teachablecdn.com/BptqXWmfSXmQMk2KHJRE",
          "https://cdn.fs.teachablecdn.com/0mQXh0mQq6q7igI82Tb6",
          "https://cdn.fs.teachablecdn.com/6dk1yh34Rd2WrfR8ezyO"
        ]
      }
    ]
  },
  {
    "sectionName": "Optimizations",
    "videos": [
      {
        "name": "Module Introduction (1:39)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341793",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/OTIDu862SXCyDxP0LUz8"
        ]
      },
      {
        "name": "Sharing a Page Content Component (6:39)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341796",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/NQKMdA3pQrGN7hDBVd1y"
        ]
      },
      {
        "name": "Splitting the App into More Components (4:46)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341794",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/bDpGxPrYS16xknWv4CZH"
        ]
      },
      {
        "name": "Adding a 'Image Picker' Component (10:51)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341799",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/wvS6gDcyT6c4zAypOyMw"
        ]
      },
      {
        "name": "Re-using Types (6:03)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341798",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/KasJx5lsTtOqN3qmrRGG"
        ]
      },
      {
        "name": "Centralizing App Logic (5:06)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341795",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ldyuJpUT720FYCmvZgIO"
        ]
      },
      {
        "name": "Adding Lazy Loading (5:27)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341797",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/vEwDqa21SWiB37nxB1Uh"
        ]
      },
      {
        "name": "Module Resources",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14355990",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/PrJcShaQXW34bEg8OEKB",
          "https://cdn.fs.teachablecdn.com/GUsofTkvQJSMJryVa985",
          "https://cdn.fs.teachablecdn.com/kJmRv4eOTwK3962LwCqy",
          "https://cdn.fs.teachablecdn.com/kUtN4pxQR7utSEwoixIQ",
          "https://cdn.fs.teachablecdn.com/b0S8oT7qSaWGNyymAszE",
          "https://cdn.fs.teachablecdn.com/yytrCIsLQKeBvSkQWN3c"
        ]
      }
    ]
  },
  {
    "sectionName": "Publishing the Apps",
    "videos": [
      {
        "name": "Module Introduction (1:05)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341803",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/vYkJtWjTaqb03FbVwRJQ"
        ]
      },
      {
        "name": "Configuring the Apps (2:30)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341807",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/ZsxG3PkDSduuUoUoJuOC"
        ]
      },
      {
        "name": "Adding Icons & Splash Screens (13:04)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341808",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/DZkdjlUkRxyI4LwEKqKt",
          "https://cdn.fs.teachablecdn.com/Q8103mmTrOOoMAUhm6Pc"
        ]
      },
      {
        "name": "Publishing a Web App (5:46)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341806",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/uDdbEhICTnywSglbK5zU"
        ]
      },
      {
        "name": "Publishing an Android App (3:54)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341804",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/z2uTomilT8uwHk8tr8sf"
        ]
      },
      {
        "name": "Publishing an iOS App (4:24)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14341805",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/vMUHhWh0QtiXgVmS36UP"
        ]
      },
      {
        "name": "Module Resources",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14355993"
      }
    ]
  },
  {
    "sectionName": "Roundup",
    "videos": [
      {
        "name": "Course Roundup (2:43)",
        "link": "https://pro.academind.com/courses/ionic-react-build-cross-platform-apps-web-android-ios/lectures/14353016",
        "downloadURLs": [
          "https://cdn.fs.teachablecdn.com/zzTcUeHxQ9Ocf9sL0s57"
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
  fs.writeFileSync(rootPath + "Data.txt", JSON.stringify(obj));
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
    let downloadPath = rootPath + obj[i].sectionName + '/';
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath);
    }
    for (let j = 0; j < videoArr.length; j++) {
      await createDownloadTask(videoArr[j], i, j, downloadPath);
    }
  }
}

async function createDownloadTask(vidObj, outerIndex, innerIndex, downloadPath){
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
            const path = downloadPath + response.headers["content-disposition"].split("filename=")[1].split('"')[1];
            response.data.pipe(fs.createWriteStream(path));
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
