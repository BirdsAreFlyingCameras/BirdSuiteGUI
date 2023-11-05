
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

