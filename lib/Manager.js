// Create and export the Manager class

const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name, id, email, special) {
        super(name, id, email)
        this.officeNumber = special
    }

    getRole() {
        return "Manager"
    }
    getOfficeNumber() {
        return this.officeNumber
    }
}

module.exports = Manager;