#! /usr/bin/env node
import inquirer from "inquirer";
// Initialize user balance and pin code
let myBalance = 10000; // Dollar
let myPin = 1234;
// Print welcome message
console.log("Welcome to GMMusani - ATM Machine");
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "enter your pin",
        type: "number",
    },
]);
if (pinAnswer.pin === myPin) {
    console.log("Correct pin code!!!");
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "please select option",
            type: "list",
            choices: ["withdraw", "check balance"],
        },
    ]);
    if (operationAns.operation === "withdraw") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                message: "select a withdrawal method",
                type: "list",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "select Amount",
                    choices: [1000, 2000, 5000, 10000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withdraw successfully`);
                console.log(`Your remaining balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "enter your amount",
                    type: "number",
                },
            ]);
            if (amountAns.amount > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(`Your remaining balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log("your account balance is: " + myBalance);
    }
}
else {
    console.log("incorrect pin code!!!");
}
