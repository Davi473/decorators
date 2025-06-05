import { UserRepositoryMemory } from "../../src/infra/repository/UserRepository"
import Register from "../../src/application/usecase/user/Register";
import Login from "../../src/application/usecase/user/Login";
import axios from "axios";

test("register", async () => {
    const repository = new UserRepositoryMemory();
    const register = new Register(repository);
    const user = {
        name: "funalo Tal",
        email: `${Math.random()}@gmail.com`,
        password: "123"
    }
    const response = await register.execute(user);
    expect(typeof response.id).toBe("string");
});

test("token", async () => {
    const repository = new UserRepositoryMemory();
    const register = new Register(repository);
    const login = new Login(repository);
    const user = {
        name: "funalo Tal",
        email: `${Math.random()}@gmail.com`,
        password: "123"
    }
    await register.execute(user);
    const response = await login.execute(user);
    expect(typeof response.token).toBe("string");
});

test("Register Api", async () => {
    const user = {
        name: "funalo Tal",
        email: `${Math.random()}@gmail.com`,
        password: "123"
    }
    const responseData = await axios.post("http://localhost:3000/users", user);
    const response: any = responseData.data;
    expect(typeof response.id).toBe("string");
});

test("Login Api", async () => {
    const user = {
        name: "funalo Tal",
        email: `${Math.random()}@gmail.com`,
        password: "123"
    }
    await axios.post("http://localhost:3000/users", user);
    const responseData = await axios.put("http://localhost:3000/users", user);
    const response: any = responseData.data;
    expect(typeof response.token).toBe("string");
});

test("Me Api", async () => {
    const user = {
        name: "funalo Tal",
        email: `${Math.random()}@gmail.com`,
        password: "123"
    }
    await axios.post("http://localhost:3000/users", user);
    const responseLoginData = await axios.put("http://localhost:3000/users", user);
    const responseLogin: any = responseLoginData.data;
    const responseMeData: any = await axios.get("http://localhost:3000/users/me", {headers: {
        Authorization: `Bearer ${responseLogin.token}`
    }})
    const responseMe = responseMeData.data;
    expect(typeof responseMe.idUser).toBe("string");
    expect(responseMe.name).toBe(user.name);
    expect(responseMe.email).toBe(user.email);
});