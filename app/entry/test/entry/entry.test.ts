import { GetByIdEntry } from "../../src/application/usecase/entry/GetByIdEntry";
import { Save } from "../../src/application/usecase/entry/Save";
import { EntryRepositoryMemory } from "../../src/infra/repository/EntryRepository";

test("entry", async () => {
    const repository = new EntryRepositoryMemory();
    const getEntry = new GetByIdEntry(repository);
    const saveEntry = new Save(repository);
    const input = {
        idUser: "user1",
        description: "Salary",
        category: "income",
        amount: 5000,
        currency: "USD",
        date: "2023-10-01"
    };
    saveEntry.execute(input);
    const outputGet = await getEntry.execute({
        idUser: "user1"
    });
    expect(outputGet[0].description).toBe("Salary");
    expect(outputGet[0].category).toBe("income");
    expect(outputGet[0].amount).toBe(5000);
    expect(outputGet[0].currency).toBe("USD");
});

import axios from "axios";
test("entry api", async () => {
    const user = {
        name: "Test User",
        email: `${Math.random()}@gmail.com`,
        password: "123"
    };
    // Register user
    await axios.post("http://localhost:3000/users", user);
    // Login user
    const loginResponse: any = await axios.put("http://localhost:3000/users", user);
    const token = loginResponse.data.token;
    // Save entry
    const entry = {
        description: "Casa",
        category: "expense",
        amount: 100,
        currency: "USD",
        date: "2023-10-01"
    };
    const responseSave: any = await axios.post("http://localhost:3000/entry", entry, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    expect(responseSave.data.id).toBeDefined();
    // Get entry
    const responseGet: any = await axios.get("http://localhost:3000/entry", {
        headers: {
            Authorization: `Bearer ${token}`
        }       
    });
    expect(responseGet.data[0].description).toBe("Casa");
    expect(responseGet.data[0].category).toBe("expense");
    expect(responseGet.data[0].amount).toBe(100);
    expect(responseGet.data[0].currency).toBe("USD");
});

test("entry test", async () => {
    const user = {
        name: "Test User",
        email: `${Math.random()}@gmail.com`,
        password: "123"
    };
    await axios.post("http://localhost:3000/users", user);
    const loginResponse: any = await axios.put("http://localhost:3000/users", user);
    const token = loginResponse.data.token;
    const entry = {
        description: "Casa",
        category: "expense",
        amount: 100,
        currency: "USD",
        date: "2023-10-01"
    };
    await axios.post("http://localhost:3000/entry", entry, {headers: {Authorization: `Bearer ${token}`}});
    entry.currency = "BRL"
    await axios.post("http://localhost:3000/entry", entry, {headers: {Authorization: `Bearer ${token}`}});
    entry.currency = "EUR"
    await axios.post("http://localhost:3000/entry", entry, {headers: {Authorization: `Bearer ${token}`}});
    entry.currency = "EUR";
    entry.date = "2023-11-01"
    await axios.post("http://localhost:3000/entry", entry, {headers: {Authorization: `Bearer ${token}`}});
    const valor = await axios.get("http://localhost:3000/entry/month", {headers: {Authorization: `Bearer ${token}`}});
    console.log(valor.data)
});
