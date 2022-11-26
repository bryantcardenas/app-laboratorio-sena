import Items from "../models/items.js"

const itemsPost = async (req, res) => {
  const { codigo, nombre, precio, estado, duracion } = req.body;
  let salt = bcryptjs.genSaltSync(10);
  const items = new Items({ codigo, nombre, precio, estado, duracion });
  items.password = bcryptjs.hashSync(password, salt);
  await items.save();
  res.json({
    msg: "registro exitoso",
  });
};


export { itemsPost }