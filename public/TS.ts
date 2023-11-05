const CommonButton = document.getElementById('CommonScanButton') as HTMLButtonElement

const FullScanButton = document.getElementById('FullScanButton') as HTMLButtonElement

const CustomScanButton = document.getElementById('CustomScanButton') as HTMLButtonElement
const RangeInputBox = document.getElementById('CustomScanRangeInput') as HTMLInputElement

const SubmitButton = document.getElementById('SubmitButton')

function handleButtonClick(value: string): void {
    let ScanType = value
    console.log(`Value: ${value}`)
    console.log(`ScanType: ${ScanType}`)

    const CheckBoxButtonList = ['CommonScanButton', 'FullScanButton', 'CustomScanButton']

    CheckBoxButtonList.forEach(ButtonName =>{
            let Button = document.getElementById(`${ButtonName}`) as HTMLInputElement

            if (ButtonName != ScanType){

                Button.checked = false

                if (ButtonName == 'CustomScanButton' && RangeInputBox.classList.contains('Toggled')){
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

        RangeInputBox.innerHTML = '<b>Range: </b> 0, <input type="text">';

    } else {
        RangeInputBox.innerHTML = ''
    }
})

SubmitButton.addEventListener('click', () => {

    let URLorIP = document.getElementById('URLorIP') as HTMLInputElement

    if (CustomScanButton.classList.contains('Checked')){

        let PortRange = document.getElementById('CustomScanRangeInput') as HTMLInputElement
        console.log(`Port Range: ${PortRange.value}`)
    }

    console.log(`URL or IP: ${URLorIP.value}`)


    })
}