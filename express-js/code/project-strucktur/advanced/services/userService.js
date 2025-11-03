const users = [
  {
    name: "fitra maulana",
    age: 20,
  },
];

export const fetchUsers = () => {
  return users;
};

export const addUser = (name, age) => {
  if (!name) {
    throw new Error("name must be required");
  }

  if (!age) {
    throw new Error("age must be required");
  }
  const user = { name: name, age: age };

  users.push(user);

  return { name, age };
};
