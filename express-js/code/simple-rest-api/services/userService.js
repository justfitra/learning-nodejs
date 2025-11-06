const users = [
  {
    id: 1,
    username: "Fitra Maulana",
    age: 20,
    password: "12345323",
  },
  {
    id: 2,
    username: "Tutur Budi P",
    age: 20,
    password: "eeees",
  },
];

export const get = (id) => {
  if (id) {
    return users.filter((res) => res.id === id);
  } else {
    return users;
  }
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
