
//Bird Scan TS

import {
    BirdGlanceDisplayResults,
    BirdScanOutputTable,
    BirdScanPost,
    DisplayErrorMessage,
    DownloadBirdScanResult
} from './utils.js'

const CommonButton = document.getElementById('CommonScanButton') as HTMLButtonElement

const FullScanButton = document.getElementById('FullScanButton') as HTMLButtonElement

const CustomScanButton = document.getElementById('CustomScanButton') as HTMLButtonElement
const RangeInputBox = document.getElementById('CustomScanRangeInput') as HTMLInputElement

const SubmitButton = document.getElementById('SubmitButton')

const ErrorBox = document.getElementById('ErrorBox')

console.log('JS Script Loaded')

function handleButtonClick(value: string): void {
    let ScanType = value

    const ButtonDict = {'CommonScanButton': CommonButton, 'FullScanButton':FullScanButton, 'CustomScanButton':CustomScanButton}

    let HtmlButtons = Object.keys(ButtonDict)

    HtmlButtons.forEach(ButtonName => {
            let Button = document.getElementById(`${ButtonName}`) as HTMLInputElement

            if (ButtonName != ScanType) {

                let TSButtonVal = ButtonDict[`${ButtonName}`]


                if (TSButtonVal.classList.contains('Checked')){

                    TSButtonVal.classList.toggle('Checked')
                    TSButtonVal.classList.toggle('NotChecked')

                }

                Button.checked = false

                if (ButtonName == 'CustomScanButton' && RangeInputBox.classList.contains('Toggled')) {
                    RangeInputBox.classList.toggle('Toggled');
                    RangeInputBox.classList.toggle('NotToggled');

                }

            } else {

                if (ButtonName != 'CustomScanButton') {

                    if (Button.classList.contains('Checked')) {

                        Button.checked = false

                    }

                }
            }
        })
    }

CommonButton.addEventListener('click', () => {

    handleButtonClick('CommonScanButton');

    CommonButton.classList.toggle('Checked');

    CommonButton.classList.toggle('NotChecked');

})

FullScanButton.addEventListener('click', () => {

    handleButtonClick('FullScanButton');

    FullScanButton.classList.toggle('Checked');

    FullScanButton.classList.toggle('NotChecked');

})

CustomScanButton.addEventListener('click', () => {

    handleButtonClick('CustomScanButton');


    CustomScanButton.classList.toggle('Checked');

    CustomScanButton.classList.toggle('NotChecked');


    RangeInputBox.classList.toggle('NotToggled');
    RangeInputBox.classList.toggle('Toggled');

    if (RangeInputBox.classList.contains('Toggled')) {

        RangeInputBox.innerHTML = '<div class="PortRangeInputDiv">Range: 0, <input type="text" placeholder="65353" id="PortRangeInput"></div>';

    } else {
        RangeInputBox.innerHTML = ''
    }
})

SubmitButton.addEventListener('click', async () => {

    let URLorIPInput = document.getElementById('URLorIP') as HTMLInputElement

    let TableDiv = document.getElementById('TableDiv')

    let URLorIP = URLorIPInput.value

    if (URLorIP == "") {

        DisplayErrorMessage("A Url or IP is Required", "ErrorBox")
        return console.log("A Url or IP is Required")

    }

    console.log(`URL or IP: ${URLorIP}`)

    if (CommonButton.classList.contains('Checked')) {
        let ScanType = 'Common'
        console.log(`Scan Type: ${ScanType}`)

        let PostData = {

            URLorIP:URLorIP,
            ScanType:ScanType

        }


        console.log(PostData)

        console.log(JSON.stringify(PostData))

        try {
            const result = await BirdScanPost(URLorIP, ScanType)
            console.log('Common scan completed');
            console.log(result);

            let ResultStr = JSON.stringify(result)

            let JsonDataParsed = JSON.parse(ResultStr)

            BirdScanOutputTable(JsonDataParsed, TableDiv)

            function GetJsonData() {
                return JsonDataParsed
            }
            function GetURLorIP() {
                return URLorIP
            }
            function GetFileType() {
                let FileType = 'txt' /* will update to work will CSV later */
                return FileType

            }

            const DownloadButton = document.getElementById('DownloadButton') as HTMLButtonElement

            if (DownloadButton) {
                console.log('Download Button Loaded')
                DownloadButton.addEventListener('click', async () => {

                    let JsonData = GetJsonData();
                    let URLorIP = GetURLorIP()
                    let FileType = GetFileType()

                    console.log(JsonData)
                    console.log(URLorIP)


                    await DownloadBirdScanResult(JsonData, URLorIP, 'txt')

                })


            }


        } catch (error) {
            console.error('An error occurred:', error.message);

        }
    }

    if (FullScanButton.classList.contains('Checked')) {

        let ScanType = 'Full'

        let PostData = {

            URLorIP:URLorIP,
            ScanType:ScanType

        }

        console.log(`Scan Type: ${ScanType}`)

        console.log(`Post Data: ${JSON.stringify(PostData)}`)

        try {
            const result = await BirdScanPost(URLorIP, ScanType)
            console.log('Full scan completed');
            console.log(result);

            let ResultStr = JSON.stringify(result)

            let JsonDataParsed = JSON.parse(ResultStr)

            BirdScanOutputTable(JsonDataParsed, TableDiv)

            function GetJsonData() {
                return JsonDataParsed
            }
            function GetURLorIP() {
                return URLorIP
            }
            function GetFileType() {
                let FileType = 'txt' /* will update to work will CSV later */
                return FileType

            }

            const DownloadButton = document.getElementById('DownloadButton') as HTMLButtonElement

            if (DownloadButton) {
                console.log('Download Button Loaded')
                DownloadButton.addEventListener('click', async () => {

                    let JsonData = GetJsonData();
                    let URLorIP = GetURLorIP()
                    let FileType = GetFileType()

                    console.log(JsonData)
                    console.log(URLorIP)


                    await DownloadBirdScanResult(JsonData, URLorIP, 'txt')

                })


            }


        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    if (CustomScanButton.classList.contains('Checked')) {

        let PortRangeInput = document.getElementById('PortRangeInput') as HTMLInputElement

        let PortRange = PortRangeInput.value

        if (PortRange == "") {
            DisplayErrorMessage("Custom Scan Requires A Port Range","ErrorBox")
            return console.log('Custom Scan Requires A Port Range')

        }

        let ScanType = 'Custom'

        let PostData = {
            URLorIP: URLorIP,
            ScanType: ScanType,
            InputRange: PortRange
        }

        console.log(`Scan Type: ${ScanType}`)
        console.log(`Post Data: ${JSON.stringify(PostData)}`)


        try {
            const result = await BirdScanPost(URLorIP, ScanType, PortRange)
            console.log('Custom scan completed');
            console.log(result);

            let ResultStr = JSON.stringify(result)

            let JsonDataParsed = JSON.parse(ResultStr)

            BirdScanOutputTable(JsonDataParsed, TableDiv)

            function GetJsonData() {
                return JsonDataParsed
            }
            function GetURLorIP() {
                return URLorIP
            }
            function GetFileType() {
                let FileType = 'txt' /* will update to work will CSV later */
                return FileType

            }

            const DownloadButton = document.getElementById('DownloadButton') as HTMLButtonElement

            if (DownloadButton) {
                console.log('Download Button Loaded')
                DownloadButton.addEventListener('click', async () => {

                    let JsonData = GetJsonData();
                    let URLorIP = GetURLorIP()
                    let FileType = GetFileType()

                    console.log(JsonData)
                    console.log(URLorIP)


                    await DownloadBirdScanResult(JsonData, URLorIP, 'txt')

                })


            }


        }
        catch (error) {
            console.error('An error occurred:', error.message);
        }


    }


})



//Bird Glance TS

import {BirdGlancePost} from './utils.js'


const SubmitButtonBirdGlance = document.getElementById('SubmitButton-BirdGlance')
let URLInput = document.getElementById('URLInput-BirdGlance') as HTMLInputElement

SubmitButtonBirdGlance.addEventListener('click', async () => {

    let URL = URLInput.value

    if (URL == "") {

        DisplayErrorMessage("A Url or IP is Required", "ErrorBox-BirdGlance")
        return console.log("A Url is Required")

    }

    const Results = await BirdGlancePost(URL)

    console.log(Results)

    BirdGlanceDisplayResults(Results)


})