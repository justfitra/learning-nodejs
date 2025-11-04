const users = [
  {
    name: "fitra maulana",
    age: 20,
  },
];

export const fetchUser = () => {
  return users;
};

export const addUser = (name, age) => {
  if (!name || !age) {
    throw new Error("name or age must be required");
  }

  const user = { name: name, age: age };

  users.push(user);

  return user;
};

export const detailUser = (name) => {
  if (!name) {
    throw new Error("name must be required for find name");
  }

  const user = users.find((res) => res.name === name);

  return user;
};
