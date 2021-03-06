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
const userInput =
    [
        {
            type: "list",
            message: "What is your role in the company?",
            name: "role",
            choices: ['Manager', 'Engineer', 'Intern', 'Quit']
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
            message: (response) => {
                switch (response.role) {
                    case "Engineer":
                        return "Github:";
                    case "Intern":
                        return "School:";
                    case "Manager":
                        return "Office Number:";
                }
            }
        }

    ]

// Create a recursive function to add new team members

function createTeam() {
    inquirer.prompt({
        type: "confirm",
        name: "add",
        message: "Add new team member?"
    }).then(add => {

        if (add === true) {
            createMember()
        };
        if (add === false) {
            createHTML()
        }
    });
}

// Inquirer prompts and creates new team member based on role
function createMember() {
    inquirer.prompt(userInput)
        .then(response => {
            const results = [response.name, response.id, response.email, response.special]

            if (response.role === "Engineer") {
                team.push(new Engineer(...results))
            };
            if (response.role === "Intern") {
                team.push(new Intern(...results))
            };
            if (response.role === "Manager") {
                team.push(new Manager(...results))
            }
            else { return }

            createTeam()
        })
}

// Writes to team.html file in the output folder using HTML returned from the render function

function createHTML() {
    fs.writeFile(outputPath, render(team), (err) => {
        err ? console.error(err) : console.log("success", team)
    })
}

// Launch application

createTeam()