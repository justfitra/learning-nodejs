const asyncTimeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

async function getUser() {
  try {
    await asyncTimeout(2000);
    return "user data";
  } catch (err) {
    throw "error";
  }
}

async function getPosts() {
  try {
    await asyncTimeout(3000);
    return "posts data";
  } catch (err) {
    throw "error";
  }
}

async function getComments() {
  try {
    await asyncTimeout(1000);
    return "comments data";
  } catch (err) {
    throw "error";
  }
}

const main = async () => {
  //   return Promise.all([getUser(), getComments(), getPosts()]).then((res) =>
  //     console.log(res)
  //   );
  const users = await getUser();
  const posts = await getPosts();
  const comments = await getComments();
  return 0;
};

main();
