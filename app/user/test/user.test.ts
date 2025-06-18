test("Test user register", async () => {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: "Fulano",
      userPassword: "123456",
      userEmail: `${Math.random()}@example.com`,
    }),
  });

  expect(response.status).toBe(201);
  const data = await response.json();
  expect(data.message).toBe("User registered successfully");
});


test("Test user login", async () => {
  const user = {
    userName: "Fulano",
    userPassword: "123456",
    userEmail: `${Math.random()}@example.com`
  }
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  expect(response.status).toBe(201);
  const loginResponse = await fetch("http://localhost:3000/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail: user.userEmail,
      userPassword: user.userPassword,
    }),
  });
  expect(loginResponse.status).toBe(201);
  const loginData = await loginResponse.json();
  expect(loginData.token).toBeDefined();
});