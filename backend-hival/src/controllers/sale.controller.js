import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

export const createSale = async (req, res) => {
  try {
    const { products, client } = req.body;

    if (!client) {
      return res.status(400).json({ message: "Cliente requerido" });
    }

    let total = 0;
    const saleProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Stock insuficiente: ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();

      total += product.price * item.quantity;

      saleProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    const sale = await Sale.create({
      client,
      products: saleProducts,
      total
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error("ERROR CREATE SALE:", error);
    res.status(500).json({ message: "Error creando venta" });
  }
};

export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("client", "name email")
      .populate("products.product", "name price")
      .sort({ createdAt: -1 });

    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener ventas" });
  }
};