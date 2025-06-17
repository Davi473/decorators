test("Test user register", async () => {
  const response = await fetch("http://localhost:3000/user/register", {
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