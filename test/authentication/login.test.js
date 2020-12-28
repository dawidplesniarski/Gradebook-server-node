const request = require('supertest');
const app = require('../../app');

const correctUserLoginData = {
    login: 'dawid',
    password: 'dawid'
}
const incorrectUserLoginData = {
    login: 'dawid',
    password: 'incorrect'
}
const correctEmployeeLoginData = {
    login: 'agnieszka',
    password: 'agnieszka'
}
const incorrectEmployeeLoginData = {
    login: 'agnieszka',
    password: 'incorrect'
}

test('should login as a student', async () => {
    await request(app).post('/users/login')
        .send(correctUserLoginData)
        .expect(200)
})

test('should not login', async () => {
    await request(app).post('/users/login')
        .send(incorrectUserLoginData)
        .expect(403)
})

test('should login as an employee', async () => {
    await request(app).post('/employee/login')
        .send(correctEmployeeLoginData)
        .expect(200)
})

test('should not login as an employee', async () => {
    await request(app).post('/users/login')
        .send(incorrectEmployeeLoginData)
        .expect(403)
})