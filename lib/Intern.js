// Create and export the Intern class

const Employee = require("./Employee")

class Intern extends Employee {
    constructor(name, id, email, special) {
        super(name, id, email)
        this.school = special
    }

    getRole() {
        return "Intern"
    }

    getSchool() {
        return this.school
    }
}

module.exports = Intern;