import { User } from "./src/models/userModel.js";

export const seed = async () => {
  const bulk = [];

  for (let i = 0; i < 10000; i++) {
    bulk.push({
      insertOne: {
        document: {
          name: "user" + i,
          age: Math.floor(Math.random() * 50),
          email: `user${i}@mail.com`,
          createdAt: new Date(Date.now() - Math.random() * 1e9),
        },
      },
    });
  }

  await User.bulkWrite(bulk);
  console.log("Done seeding");
};
