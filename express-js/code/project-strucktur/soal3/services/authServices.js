const user = {
  username: "fitra maulana",
  password: "qwertyuiop",
};

export const auth = (username, password) => {
  if (!username) {
    throw new Error("Username must be required");
  }

  if (typeof username !== "string") {
    throw new Error("Username must be string");
  }

  if (!password) {
    throw new Error("Password must be required");
  }

  if (password !== user.password) {
    throw new Error("Pasword incorrect");
  }

  if (username.trim() !== user.username.trim()) {
    throw new Error("Username incorrect");
  }

  return user;
};
