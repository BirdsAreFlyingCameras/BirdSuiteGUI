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


export function DisplayErrorMessage(ErrorMessage:string) {

    const ErrorBox = document.getElementById('ErrorBox')

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

    DownloadButton.classList.add('DownloadButton')

    DownloadButton.textContent = 'Download'

    TableDiv.appendChild(DownloadButton)

    TableDiv.style.height = `${TableHeight}px`

    TableDiv.classList.add('TableDivActive')

    BirdScanContainer.appendChild(TableDiv)


    }

