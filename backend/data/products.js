import fetch from "node-fetch";

// @desc    Get all products (from Escuelajs API)
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res) => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products?limit=100&offset=0");
    const data = await response.json();

    // transform into your format (optional)
    const products = data.map((item) => ({
      id: item.id, // numeric ID from API
      name: item.title,
      price: item.price,
      description: item.description,
      category: item.category?.name || "uncategorized",
      image: item.images?.[0] || "",
      rating: 4.0, // dummy value
      numReviews: Math.floor(Math.random() * 100),
      countInStock: Math.floor(Math.random() * 200) + 1,
    }));

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

// @desc    Get single product by ID (from Escuelajs API)
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    const item = await response.json();

    if (!item || item.id == null) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = {
      id: item.id,
      name: item.title,
      price: item.price,
      description: item.description,
      category: item.category?.name || "uncategorized",
      image: item.images?.[0] || "",
      rating: 4.0,
      numReviews: Math.floor(Math.random() * 100),
      countInStock: Math.floor(Math.random() * 200) + 1,
    };

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};
