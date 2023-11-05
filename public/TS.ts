
const CommonButton = document.getElementById('CommonScanButton') as HTMLButtonElement

const FullScanButton = document.getElementById('FullScanButton') as HTMLButtonElement

const CustomScanButton = document.getElementById('CustomScanButton') as HTMLButtonElement
const RangeInputBox = document.getElementById('CustomScanRangeInput') as HTMLInputElement

const SubmitButton = document.getElementById('SubmitButton')

console.log('test')

function handleButtonClick(value: string): void {
    let ScanType = value

    const ButtonDict = {'CommonScanButton': CommonButton, 'FullScanButton':FullScanButton, 'CustomScanButton':CustomScanButton}

    let HtmlButtons = Object.keys(ButtonDict)
    let TSButtons = Object.values(ButtonDict)

    HtmlButtons.forEach(ButtonName => {
        TSButtons.forEach(TSButton => {
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

        RangeInputBox.innerHTML = '<b>Range: </b> 0, <input type="text" id="PortRangeInput">';

    } else {
        RangeInputBox.innerHTML = ''
    }
})

SubmitButton.addEventListener('click', () => {

    let URLorIPInput = document.getElementById('URLorIP') as HTMLInputElement

    let URLorIP = URLorIPInput.value

    console.log(`URL or IP: ${URLorIP}`)

    if (CommonButton.classList.contains('Checked')){
        let ScanType = 'CommonScan'
        console.log(`Scan Type: ${ScanType}`)

    }

    if (FullScanButton.classList.contains('Checked')){

        let ScanType = 'FullScan'
        console.log(`Scan Type: ${ScanType}`)


    }

    if (CustomScanButton.classList.contains('Checked')) {

        let ScanType = 'CustomScan'

        let PortRangeInput = document.getElementById('PortRangeInput') as HTMLInputElement

        let PortRange = PortRangeInput.value

        console.log(`Port Range: ${PortRange}`)
        console.log(`Scan Type: ${ScanType}`)

    }




})