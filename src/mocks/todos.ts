import { rest } from "msw";

import { json } from "../helpers/mock";
// import IOneApi from "react-declarative/model/IOneApi";

const users = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
];

export default [
  rest.get("/users", json(users)),
  ...users.map((user) => rest.get(`/users/${user.id}`, json(user))),
];

export const getUserInfo = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:3000/users?id=${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error so it can be handled elsewhere, if needed.
  }
};
