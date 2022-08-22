import { API } from "./options";

//GET
const getAll = () => API.get("/memory/getAll");
const getSingle = (data) => API.get(`/memory/getSingle/${data._id}`);
const getTags = () => API.get("/memory/getTags");
const search = ({ query, tags }) =>
  API.get(`/memory/search?query=${query}&tags=${tags}`);

//POST
const create = (data) => API.post("/memory/create", data);

//PATCH
const update = (data) => API.patch("/memory/update", data);
const like = (data) => API.patch("/memory/like", data);

//DELETE
const _delete = (data) => API.delete("/memory/delete", { data });

export default {
  create,
  getAll,
  getSingle,
  getTags,
  search,
  update,
  like,
  _delete,
};
