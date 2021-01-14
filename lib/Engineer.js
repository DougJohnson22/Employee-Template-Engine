// Create and export the Engineer class

const Employee = require("./Employee")

class Engineer extends Employee {
    constructor(name, id, email, special) {
        super(name, id, email)
        this.github = special
    }

    getRole() {
        return "Engineer"
    }
    getGithub() {
        return this.github
    }
}

module.exports = Engineer;