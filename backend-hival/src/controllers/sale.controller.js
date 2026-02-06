import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

export const createSale = async (req, res) => {
  try {
    const { client, products } = req.body;

    let total = 0;

    for (const item of products) {
      const product = await Product.findById(item.product);

      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          message: `Stock insuficiente para ${product?.name}`
        });
      }

      product.stock -= item.quantity;
      await product.save();

      total += product.price * item.quantity;
      item.price = product.price;
    }

    const sale = await Sale.create({ client, products, total });
    res.status(201).json(sale);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("client")
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
