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

    let JsonParsed = JSON.parse(JsonData)

    console.log(`JsonParsed: ${JsonParsed}`)

    let PortNumbers = Object.keys(JsonParsed)

    let Services = Object.values(JsonParsed)

    let Table = document.createElement('table')

    Table.innerHTML = '<th>Port</th><th>Service</th>'

    for (let PortNumber in PortNumbers) {
        for (let Service in Services){

            console.log(PortNumber)
            console.log(Service)

            let NewRow = Table.insertRow()


            let RowData = `<tr><td>${PortNumber}</td> <td>${Service}</td></tr>`

            NewRow.innerHTML = RowData

            Table.appendChild(NewRow)


        }

    }

    TableDiv.appendChild(Table)

}