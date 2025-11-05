const users = [
  {
    username: "Fitra Maulana",
    age: 20,
    password: "12345323",
  },
  {
    username: "Tutur Budi P",
    age: 20,
    password: "eeees",
  },
];

export const get = () => {
  return users;
};

export const post = (username, age, password) => {
  if (!username) {
    throw new Error("Username must be required");
  }

  if (!age) {
    throw new Error("Age must be required");
  }

  if (!password) {
    throw new Error("Password must be required");
  }

  users.push({
    username: username,
    age: age,
    password: password,
  });

  return { username, age };
};
