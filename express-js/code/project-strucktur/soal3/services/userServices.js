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
