import express, { Request, Response, Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { Employee } from '../types/employee'

const empRouter = Router()

const employees: Employee[] = [
    {
        id: uuidv4(),
        firstname: "Ryoga",
        lastname: "Ishii",
        age: 23,
        isMarried: false
    },
    {
        id: uuidv4(),
        firstname: "Iki",
        lastname: "Sheik",
        age: 30,
        isMarried: true
    }
]

/**
 * @route GET /employees
 * @
 */
empRouter.get('/', (req: Request, res:Response) => {
    res.status(200).json(employees)
})


/**
 * @route GET /employees/search?firstname=value
 */
empRouter.get('/search', (req:Request<{}, {}, {}, { firstname: string } >, res:Response) => {
    const { firstname } = req.query
    const findEmployee: Employee[] = employees.filter(elem => elem.firstname.toLowerCase().includes(firstname.toLowerCase()))
    res.status(200).json(findEmployee)
})


/**
 * @route GET /employees/:id
 */
empRouter.get('/:id', (req:Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const employee = employees.find(elem => elem.id === id)

    if (!employee) {
        res.status(404).send("Employee not registered or not found!")
        return
    }

    res.status(200).json(employee)
})

/**
 * @route POST /employee
 */
empRouter.post('/', (req: Request<{}, {}, Omit<Employee,'id'>>, res: Response) => {
    const newEmployee = {
        id: uuidv4(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        isMarried: req.body.isMarried,
    }

    employees.push(newEmployee)
    res.status(201).json(newEmployee)
})

/**
 * @route PUT /employee/:id
 */
empRouter.put('/:id', (req: Request<{ id: string }, {}, Partial<Employee>>, res: Response) => {
    const { id } = req.params
    const findIndex = employees.findIndex(elem => elem.id === id)

    if (findIndex === -1) {
        res.status(404).send("Employee not registered or not found!")
        return
    }

    const updatedEmployee = {
        ...employees[findIndex],
        firstname: req.body.firstname ?? employees[findIndex].firstname,
        lastname: req.body.lastname ?? employees[findIndex].lastname,
        age: req.body.age  ?? employees[findIndex].age,
        isMarried: req.body.isMarried  ?? employees[findIndex].isMarried
    }

    employees[findIndex] = updatedEmployee
    res.status(200).json(updatedEmployee)
})

/**
 * @route Delete /employee/:id
 */

empRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const findIndex = employees.findIndex(elem => elem.id === id)

    if (findIndex === -1) {
        res.status(404).send("Employee not registered or not found!")
        return
    }

    employees.splice(findIndex, 1)
    res.status(200).send("Employee Deleted!")
})


export default empRouter