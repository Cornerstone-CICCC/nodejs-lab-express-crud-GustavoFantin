"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const empRouter = (0, express_1.Router)();
const employees = [
    {
        id: (0, uuid_1.v4)(),
        firstname: "Ryoga",
        lastname: "Ishii",
        age: 23,
        isMarried: false
    },
    {
        id: (0, uuid_1.v4)(),
        firstname: "Iki",
        lastname: "Sheik",
        age: 30,
        isMarried: true
    }
];
/**
 * @route GET /employees
 * @
 */
empRouter.get('/', (req, res) => {
    res.status(200).json(employees);
});
/**
 * @route GET /employees/search?firstname=value
 */
empRouter.get('/search', (req, res) => {
    const { firstname } = req.query;
    const findEmployee = employees.filter(elem => elem.firstname.toLowerCase().includes(firstname.toLowerCase()));
    res.status(200).json(findEmployee);
});
/**
 * @route GET /employees/:id
 */
empRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const employee = employees.find(elem => elem.id === id);
    if (!employee) {
        res.status(404).send("Employee not registered or not found!");
        return;
    }
    res.status(200).json(employee);
});
/**
 * @route POST /employee
 */
empRouter.post('/', (req, res) => {
    const newEmployee = {
        id: (0, uuid_1.v4)(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        isMarried: req.body.isMarried,
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});
/**
 * @route PUT /employee/:id
 */
empRouter.put('/:id', (req, res) => {
    var _a, _b, _c, _d;
    const { id } = req.params;
    const findIndex = employees.findIndex(elem => elem.id === id);
    if (findIndex === -1) {
        res.status(404).send("Employee not registered or not found!");
        return;
    }
    const updatedEmployee = Object.assign(Object.assign({}, employees[findIndex]), { firstname: (_a = req.body.firstname) !== null && _a !== void 0 ? _a : employees[findIndex].firstname, lastname: (_b = req.body.lastname) !== null && _b !== void 0 ? _b : employees[findIndex].lastname, age: (_c = req.body.age) !== null && _c !== void 0 ? _c : employees[findIndex].age, isMarried: (_d = req.body.isMarried) !== null && _d !== void 0 ? _d : employees[findIndex].isMarried });
    employees[findIndex] = updatedEmployee;
    res.status(200).json(updatedEmployee);
});
/**
 * @route Delete /employee/:id
 */
empRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const findIndex = employees.findIndex(elem => elem.id === id);
    if (findIndex === -1) {
        res.status(404).send("Employee not registered or not found!");
        return;
    }
    employees.splice(findIndex, 1);
    res.status(200).send("Employee Deleted!");
});
exports.default = empRouter;
