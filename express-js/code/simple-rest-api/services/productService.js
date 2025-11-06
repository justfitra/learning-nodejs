const products = [
  {
    id: 1,
    name: "Kopi Arabika Gayo",
    category: "Minuman",
    price: 55000,
    stock: 25,
    description:
      "Kopi arabika dari dataran tinggi Gayo, aroma kuat dan cita rasa khas.",
    createdAt: "2025-10-18T10:00:00Z",
  },
  {
    id: 2,
    name: "Kaos Polos Oversized",
    category: "Fashion",
    price: 95000,
    stock: 12,
    description: "Kaos polos bahan katun combed 30s, nyaman dipakai harian.",
    createdAt: "2025-10-18T10:05:00Z",
  },
  {
    id: 3,
    name: "Headphone Wireless ZX",
    category: "Elektronik",
    price: 320000,
    stock: 8,
    description:
      "Headphone Bluetooth dengan noise cancelling dan baterai tahan 20 jam.",
    createdAt: "2025-10-18T10:10:00Z",
  },
  {
    id: 4,
    name: "Buku Clean Code",
    category: "Buku",
    price: 180000,
    stock: 30,
    description:
      "Panduan menulis kode yang rapi, efisien, dan mudah dipelihara.",
    createdAt: "2025-10-18T10:15:00Z",
  },
  {
    id: 5,
    name: "Tas Ransel Waterproof",
    category: "Aksesoris",
    price: 125000,
    stock: 15,
    description:
      "Tas ransel anti air, muat laptop 15 inci, cocok untuk kerja dan kuliah.",
    createdAt: "2025-10-18T10:20:00Z",
  },
];

export const get = (id) => {
  if (id) {
    return products.filter((res) => res.id === id);
  }

  return products;
};

export const post = (id, name, category, price, stock, description) => {
  if (!id) {
    id = 5 + 1;
  }
  if (!name) {
    throw new Error("Product name must be required");
  }
  if (!category) {
    throw new Error("Product category must be required");
  }
  if (!price) {
    throw new Error("Product price must be required");
  }
  if (!stock) {
    stock = 1;
  }
  if (!description) {
    throw new Error("Product description must be required");
  }
  const createdAt = new Date().toUTCString();

  products.push({
    id: id,
    name: name,
    category: category,
    price: price,
    stock: stock,
    description: description,
    createdAt: createdAt,
  });

  return products;
};
