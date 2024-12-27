import express from "express";
const port = 2222;
const app = express();

let products = [
  { name: "banana", deadline: 10, id: 1 },
  {
    name: "apple",
    deadline: 16,
    id: 2,
  },
];

app.use(express.json());

app.post("/products", (req, res) => {
  const { name, deadline } = req.body;
  if (!name || !deadline) {
    return res.status(400).json({ error: "Name and deadline is required!" });
  }
  const product = { name, deadline, id: products.length + 1 };
  products.push(product);
  return res.status(201).json(product);
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return res.status(400).json({ error: "Product not found!" });
  }
  res.json(product);
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, deadline } = req.body;

  const productIndex = products.findIndex((item) => item.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(400).json({ error: "Product not found!" });
  }

  const updatedProduct = { ...products[productIndex], ...req.body };
  products[productIndex] = updatedProduct;

  res.json(updatedProduct);
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const findIndex = products.filter((item) => item.id !== parseInt(id));

  if (findIndex === -1) {
    return res.status(400).json({ error: "Product is not found!" });
  }

  products = products.filter((item) => item.id !== parseInt(id));

  res.status(200).json({ message: "Product deleated successfully!" });
});

app.listen(port, () => {
  console.log(`Server is running in port http:/localhost:${port}`);
});
