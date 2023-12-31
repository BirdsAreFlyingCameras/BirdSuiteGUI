import {json} from "stream/consumers";

export async function BirdScanPost(URLorIP:string, ScanType:string, PortRange?:string) {

    if (ScanType == 'CustomScan' && PortRange == null){
        throw new Error('Custom Scan Must Have Port Range')
    }

    let PostData: any

    if (ScanType == 'Custom'){

        PostData = {
            URLorIP:URLorIP,
            ScanType:ScanType,
            InputRange:PortRange
        }
    } else {
         PostData = {
            URLorIP:URLorIP,
            ScanType:ScanType
        }
    }

    const response = await fetch('http://localhost:8000/BirdScan', {
        method: 'POST',
        body: JSON.stringify(PostData),
        headers: { 'Content-Type': 'application/json' },
    });
    const content = await response.json();

    return content;
}

export function DisplayErrorMessage(ErrorMessage:string, ErrorBoxID:string) {

    const ErrorBox = document.getElementById(ErrorBoxID)

    ErrorBox.innerHTML = `<b class="ErrorMessage">${ErrorMessage}</b>`

}

export function GetDimensions(ElementID) {

    let ElementToCompute = document.getElementById(ElementID)

    let ElementHeight = ElementToCompute.offsetHeight
    let ElementWidth = ElementToCompute.offsetWidth

    return {ElementHeight, ElementWidth}


}

export async function BirdScanOutputTable(JsonData, TableID) {

    let TableDiv = TableID

    let JsonParsed = JsonData

    console.log(`JsonParsed: ${JsonParsed}`)

    let PortNumbers = Object.keys(JsonParsed)

    let Services = Object.values(JsonParsed)

    let BirdScanContainer = document.getElementById('BirdScanContainer')

    let BirdScanMain = document.getElementById('BirdScanMain')

    let Table = document.createElement('table')


    let Dimensions = GetDimensions('BirdScanMain')


    let TableHeight = Dimensions.ElementHeight
    let TableWidth = Dimensions.ElementWidth

    console.log(`Table Height: ${TableHeight}`)
    console.log(`Table Width: ${TableWidth}`)


    BirdScanMain.classList.toggle('BirdScanMain')
    BirdScanMain.classList.toggle('BirdScanMainTableDisplayed')

    Table.classList.add('BirdScanTable')

    Table.innerHTML = '<th class="ServiceHeader">Service</th><th class="PortHeader">Port</th>'

    PortNumbers.forEach((PortNumber, index) => {

        const Service = Services[index]

        console.log(PortNumber)
        console.log(Service)


        let NewRow = Table.insertRow()


        NewRow.innerHTML = `<tr><td class="TableService">${Service}</td> <td class="TablePort">${PortNumber}</td></tr>`

        Table.appendChild(NewRow)

        TableDiv.appendChild(Table)
    })


    let DownloadButton = document.createElement('button')

    DownloadButton.setAttribute('id', 'DownloadButton')

    DownloadButton.classList.add('DownloadButton')

    DownloadButton.textContent = 'Download'

    TableDiv.appendChild(DownloadButton)

    TableDiv.style.height = `${TableHeight}px`

    TableDiv.classList.add('TableDivActive')

    BirdScanContainer.appendChild(TableDiv)

}

export async function DownloadBirdScanResult(JsonData, URLorIP, FileType) {

    let PostData = {
        "JsonData":JsonData,
        "URLorIP": URLorIP,
        "FileType":FileType
    }

    const response = await fetch('http://127.0.0.1:8000/BirdScan/Download', {
        method: 'POST',
        body: JSON.stringify(PostData),
        headers: { 'Content-Type': 'application/json' },
    });
    // Assuming the server responds with a file stream
    const blob = await response.blob();

    // Creating a URL for the blob
    const downloadUrl = window.URL.createObjectURL(blob);

    // Creating a temporary anchor element to trigger download
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'downloaded_result'; // You can add a file extension based on FileType
    document.body.appendChild(a);
    a.style.display = 'none';
    a.click();

    // Clean up
    document.body.removeChild(a);
    window.URL.revokeObjectURL(downloadUrl);

    console.log('Request Sent')
}
export async function BirdGlancePost(URL:string) {


    let PostData = {
            URL:URL,
        }

    const response = await fetch('http://localhost:8000/BirdGlance', {
        method: 'POST',
        body: JSON.stringify(PostData),
        headers: { 'Content-Type': 'application/json' },
    });
    const content = await response.json();

    return content;
}

export async function BirdGlanceDisplayResults(JsonData) {


    let BirdGlanceResultsMain = document.getElementById('BirdGlanceResultsMain')
    let BirdGlanceResultsContainer = document.getElementById('BirdGlanceContainer')

    let BirdGlanceContainer = document.getElementById('BirdGlanceContainer')
    let BirdGlanceMain = document.getElementById('BirdGlanceMain')


    BirdGlanceResultsMain.classList.toggle('BirdGlaceResultsNotToggled')
    BirdGlanceResultsMain.classList.toggle('BirdGlanceResultsMain')

    let IP = JsonData['IP Address']
    let HostName = JsonData['Hostname']
    let ISP = JsonData['ISP']
    let Country = JsonData['Country']
    let StateOrRegion = JsonData['State or Region']
    let City = JsonData['City']


    let ResultsFromJson = `IP Address:${IP} 
                           HostName: ${HostName} 
                           ISP: ${ISP} 
                           Country: ${Country} 
                           State or Region: ${StateOrRegion} 
                           City: ${City}`

    BirdGlanceResultsMain.innerText = ResultsFromJson

    BirdGlanceMain.classList.toggle('BirdGlanceMain')
    BirdGlanceMain.classList.toggle('BirdGlaceResultsToggled')



    let Dimensions = GetDimensions('BirdGlanceMain')

    let MainWindowHeight = Dimensions.ElementHeight
    let MainWindowWidth = Dimensions.ElementWidth

    console.log(`Base Window Height: ${MainWindowHeight}`)

    let SubWindowStyle = window.getComputedStyle(BirdGlanceResultsMain)

    let SubWindowPaddingHeightTop = SubWindowStyle.getPropertyValue('padding-top')
    let SubWindowPaddingHeightBottom = SubWindowStyle.getPropertyValue('padding-bottom')

    let SubWindowBorderTop = SubWindowStyle.getPropertyValue('border-top')
    let SubWindowBorderBottom = SubWindowStyle.getPropertyValue('border-bottom')

    SubWindowBorderTop = SubWindowBorderTop.replace(/px$/, '')
    SubWindowBorderBottom = SubWindowBorderBottom.replace(/px$/, '')

    SubWindowPaddingHeightTop = SubWindowPaddingHeightTop.replace(/px$/, '')
    SubWindowPaddingHeightBottom = SubWindowPaddingHeightBottom.replace(/px$/, '')

    let TotalPaddingHeight = parseFloat(SubWindowPaddingHeightTop) + parseFloat(SubWindowPaddingHeightBottom)
    let TotalBorderSize = parseFloat(SubWindowBorderTop) + parseFloat(SubWindowBorderBottom)


    let NewHeight = MainWindowHeight - TotalPaddingHeight - TotalBorderSize

    console.log(NewHeight)


    BirdGlanceResultsMain.style.removeProperty('height')
    BirdGlanceResultsMain.style.height = `${NewHeight}px`
    console.log(`Subwindow Height: ${BirdGlanceResultsMain.style.height}`)
}