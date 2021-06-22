function generateEmail(input) {
    let inputTable = input.split("\n");

    let manuallyClosed = 0;
    let cardIssue = 0;

    let competition = [];
    const regex = /no|none|None|-/;

    const cardProblems = ["call_issuer", "card_type_not_accepted", "declined", "expired_card", "fraud_security_code", "fraud_stolen_card", "insufficient_funds", "invalid_account_number", "invalid_transaction", "no_billing_information", "processor_unavailable", "restricted_card"];

    for (let index = 0; index < inputTable.length; index++) {
        inputTable[index] = inputTable[index].split("\t");
    }

    for (let index = 0; index < inputTable.length; index++) {
        if (inputTable[index][0] == "yes") manuallyClosed++;
        if (inputTable[index][1] == "yes") cardIssue++;
    }

    inputTable.forEach(element => {
        if (element.length > 6) {
            for (let index = 6; index < element.length; index++) {
                element[5] += " " + element[index];
            }
        }
    });

    document.getElementById('output').innerHTML += "Churns: <br><br>Manually closed: " + manuallyClosed + "<br>Card issues: " + cardIssue + "<br><br>";

    cardProblems.forEach(element => {
        let n = 0;
        for (let index = 0; index < inputTable.length; index++) {
            if (inputTable[index][2] == element) n++;
        }
        if (n > 0) document.getElementById('output').innerHTML += element + ": " + n + "<br>";
    });

    inputTable.forEach(element => {
        if (!regex.test(element[5])) competition.push(element[5])
    });

    competition.sort();

    document.getElementById('output').innerHTML += "<br>Competition:" + competition.join("<br>");

    console.log(inputTable);
    /*  console.log("manual: " + manuallyClosed);
        console.log("card: " + cardIssue);
        console.log(competition.sort()); */

}

function copyEmail() {
    const range = document.createRange();
    range.selectNode(document.getElementById('output'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}