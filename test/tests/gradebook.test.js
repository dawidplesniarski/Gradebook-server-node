const request = require('supertest');
const app = require('../../app');
const grade = require('../../models/Grades');
const Course = require('../../models/Course');


afterAll(async () => {
    await grade.deleteMany({studentAlbum: 'test'});
    await Course.deleteMany({courseName: 'test'});
})

const gradeMock = {
    studentAlbum: "test",
    grade: "4",
    subject: "5f7df2a78290ce072e3ee66d"
}

const correctStudentLoginMock = {
    login: 'dawid',
    password: 'dawid'
}
const incorrectStudentLoginMock = {
    login: 'dawid',
    password: 'incorrect'
}
const correctEmployeeLoginMock = {
    login: 'agnieszka',
    password: 'agnieszka'
}
const incorrectEmployeeLoginMock = {
    login: 'agnieszka',
    password: 'incorrect'
}

const courseMock = {
    courseName: "test"
}

const tokenMock = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvdXJzZUlkIjpbeyJfaWQiOiI1ZjY1Y2Q2MGNjMDk0YjA0N" +
    "DAxMzAwYmYiLCJjb3Vyc2VOYW1lIjoiSW5mb3JtYXR5a2EiLCJfX3YiOjB9LHsiX2lkIjoiNWY2Y2Y5NzI1MmUxNzMxMjY5NTRkMWI2IiwiY291cnNl" +
    "TmFtZSI6IkF1dG9tYXR5a2EgaSByb2JvdHlrYSIsIl9fdiI6MH1dLCJzZW1lc3RlcnMiOls2LDFdLCJfaWQiOiI1ZjczOGE3OTE2YmQwOTA5YzRkMzh" +
    "hMGQiLCJuYW1lIjoiRGF3aWQiLCJsYXN0TmFtZSI6IlBsZcWbbmlhcnNraSIsImFsYnVtTm8iOiIzMDc4NSIsImlzRW5hYmxlZCI6dHJ1ZSwibG9naW" +
    "4iOiJkYXdpZCIsInBhc3N3b3JkIjoiJDJhJDEwJEJWVXM0LzN2MVpUL1dLWGwvSWxwTmVuMlRVZHRiWXRmbzZoZ0lzVFowVFNsVm01blE0MExtIiwid" +
    "W5pdmVyc2l0eUlkIjp7Il9pZCI6IjVmNjVkZDVlNmViZmMyMDZmZjBkOWNmNSIsInVuaXZlcnNpdHlOYW1lIjoiUFdTWiIsIl9fdiI6MH0sImltYWdl" +
    "VXJsIjoiaHR0cHM6Ly9hdmF0YXJzMS5naXRodWJ1c2VyY29udGVudC5jb20vdS80OTMyNDQxOT9zPTQ2MCZ1PTQ4MDRkZTMxMjFkNmI5MmFkODlhNmE" +
    "2Yzk3YTcyMzZmODk5MDkwOTkmdj00IiwiZW1haWwiOiJkYXdpZEB3cC5wbCIsIl9fdiI6MH0sImlhdCI6MTYwNDI0Nzg3MX0.XbMCsEzywpmhdjVX17" +
    "E1KQdCU51Na02Sbzy2LJta464";

/* Grade Tests section */

test('should add new student grade', async () => {
         await request(app)
            .post('/grades/addGrade')
            .set('Authorization', tokenMock)
            .send(gradeMock)
            .expect(201)
    }
)

test('should return student grades', async () => {
        await request(app)
            .get('/grades/findByAlbum/test')
            .expect(200)
    }
)

/* Authentication tests */

test('should login as a student', async () => {
    await request(app).post('/users/login')
        .send(correctStudentLoginMock)
        .expect(200)
})

test('should not login as a student', async () => {
    await request(app).post('/users/login')
        .send(incorrectStudentLoginMock)
        .expect(403)
})

test('should login as an employee', async () => {
    await request(app).post('/employee/login')
        .send(correctEmployeeLoginMock)
        .expect(200)
})

test('should not login as an employee', async () => {
    await request(app).post('/users/login')
        .send(incorrectEmployeeLoginMock)
        .expect(403)
})

/* Courses tests */

test('should add new course', async () => {
    await request(app).post('/course/addCourse')
        .send(courseMock)
        .expect(201)
})