// Define libraries and required file paths
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");


const team = []

// An array of questions to prompt inquirer npm
const promptUser =
    [
        {
            type: "list",
            message: "What role are you?",
            name: "role",
            choices: ['manager', 'engineer', 'intern', 'quit']
        },
        {
            type: "input",
            message: "What is your name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is your ID number?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your Email address?",
            name: "email",
        },
        {
            type: "input",
            name: "special",
            message: function (response) {
                switch (response.role) {
                    case "Engineer":
                        return "Github:"
                    case "Intern":
                        return "School:"
                    case "Manager":
                        return "Office Number:"
                }
            }
        }

    ]

// Create a recursive function to add new team members

function buildTeam() {
    inquirer.prompt({
        type: "confirm",
        name: "add",
        message: "Add new team member?"
    }).then(({ add }) => {
        switch (add) {
            case true:
                addMember();
                break;
            case false:
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdir("output", () => {
                        writeHTML()
                    })
                } else {
                    writeHTML()
                }
        }
    })
}

// Inquirer prompts and creates new team member based on role
function addMember() {
    inquirer.prompt(promptUser)
        .then(response => {
            const parameters = [response.name, response.id, response.email, response.special]
            switch (response.role) {
                case "Engineer":
                    team.push(new Engineer(...parameters));
                    break;
                case "Intern":
                    team.push(new Intern(...parameters));
                    break;
                case "Manager":
                    team.push(new Manager(...parameters));
                    break;
            }
            buildTeam()
        })
}

// Writes to team.html file in the output folder using HTML returned from the render function

function writeHTML() {
    fs.writeFile(outputPath, render(team), (err) => {
        err ? console.error(err) : console.log("success")
    })
}

// Launch application
buildTeam()