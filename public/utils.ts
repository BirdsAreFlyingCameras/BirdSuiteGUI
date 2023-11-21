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





export async function BirdScanOutputTable(JsonData, TableID) {

    let TableDiv = TableID

    let JsonParsed = JsonData


    console.log(`JsonParsed: ${JsonParsed}`)

    let PortNumbers = Object.keys(JsonParsed)

    let Services = Object.values(JsonParsed)


    let Table = document.createElement('table')

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



    }

