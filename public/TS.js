var CommonButton = document.getElementById('CommonScanButton');
var FullScanButton = document.getElementById('FullScanButton');
var CustomScanButton = document.getElementById('CustomScanButton');
var RangeInputBox = document.getElementById('CustomScanRangeInput');
var SubmitButton = document.getElementById('SubmitButton');
function handleButtonClick(value) {
    var ScanType = value;
    console.log("Value: ".concat(value));
    console.log("ScanType: ".concat(ScanType));
    var CheckBoxButtonList = ['CommonScanButton', 'FullScanButton', 'CustomScanButton'];
    CheckBoxButtonList.forEach(function (ButtonName) {
        var Button = document.getElementById("".concat(ButtonName));
        if (ButtonName != ScanType) {
            Button.checked = false;
            if (ButtonName == 'CustomScanButton' && RangeInputBox.classList.contains('Toggled')) {
                RangeInputBox.classList.toggle('Toggled');
                RangeInputBox.classList.toggle('NotToggled');
            }
        }
        else {
            if (ButtonName != 'CustomScanButton') {
                if (Button.classList.contains('Checked')) {
                    Button.checked = false;
                }
            }
        }
    });
    CommonButton.addEventListener('click', function () {
        handleButtonClick('CommonScanButton');
        CommonButton.classList.toggle('Checked');
        CommonButton.classList.toggle('NotChecked');
    });
    FullScanButton.addEventListener('click', function () {
        handleButtonClick('FullScanButton');
        FullScanButton.classList.toggle('Checked');
        FullScanButton.classList.toggle('NotChecked');
    });
    CustomScanButton.addEventListener('click', function () {
        handleButtonClick('CustomScanButton');
        CustomScanButton.classList.toggle('Checked');
        CustomScanButton.classList.toggle('NotChecked');
        RangeInputBox.classList.toggle('NotToggled');
        RangeInputBox.classList.toggle('Toggled');
        if (RangeInputBox.classList.contains('Toggled')) {
            RangeInputBox.innerHTML = '<b>Range: </b> 0, <input type="text">';
        }
        else {
            RangeInputBox.innerHTML = '';
        }
    });
    SubmitButton.addEventListener('click', function () {
        var URLorIP = document.getElementById('URLorIP');
        if (CustomScanButton.classList.contains('Checked')) {
            var PortRange = document.getElementById('CustomScanRangeInput');
            console.log("Port Range: ".concat(PortRange.value));
        }
        console.log("URL or IP: ".concat(URLorIP.value));
    });
}
//# sourceMappingURL=TS.js.map