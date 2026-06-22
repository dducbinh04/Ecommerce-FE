export const productCategories = [
  { id: "watches", name: "Phụ kiện cao cấp" },
  { id: "fashion", name: "Thời trang nữ" },
  { id: "tech", name: "Điện tử công nghệ" },
  { id: "beauty", name: "Nước hoa & Mỹ phẩm" },
];

export const adminProducts = [
  {
    id: "sapphire-horizon",
    name: "Đồng hồ Sapphire Horizon",
    sku: "SKU: LUM-001",
    categoryId: "watches",
    category: "Phụ kiện cao cấp",
    price: "12.500.000đ",
    stock: 24,
    status: "Còn hàng",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=220&q=85",
  },
  {
    id: "ebony-minimalist",
    name: "Túi xách Ebony Minimalist",
    sku: "SKU: LUM-042",
    categoryId: "fashion",
    category: "Thời trang nữ",
    price: "8.200.000đ",
    stock: 12,
    status: "Còn hàng",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=220&q=85",
  },
  {
    id: "onyx-wireless",
    name: "Tai nghe Wireless Onyx",
    sku: "SKU: LUM-089",
    categoryId: "tech",
    category: "Điện tử công nghệ",
    price: "5.500.000đ",
    stock: 0,
    status: "Hết hàng",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=220&q=85",
  },
  {
    id: "aurelian-essence",
    name: "Nước hoa Aurelian Essence",
    sku: "SKU: LUM-112",
    categoryId: "beauty",
    category: "Nước hoa & Mỹ phẩm",
    price: "3.950.000đ",
    stock: 52,
    status: "Còn hàng",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=220&q=85",
  },
];

export const editableProduct = {
  id: "chronograph-limited",
  name: "Đồng hồ Lumina Chronograph Limited",
  brand: "LUMINA Elite",
  sku: "LUM-CHR-2024-BLK",
  categoryId: "watches",
  category: "Đồng hồ Cao cấp",
  description:
    "Chiếc đồng hồ Lumina Chronograph là biểu tượng của sự sang trọng và chính xác. Được chế tác từ thép không gỉ 316L với mặt kính Sapphire chống trầy xước, bộ máy tự động Thụy Sĩ đảm bảo hiệu suất vượt trội trong mọi hoàn cảnh. Phiên bản giới hạn với dây đeo da cá sấu thủ công.",
  price: "45000000",
  salePrice: "38500000",
  stock: "12",
  weight: "150",
  status: "Đang hiển thị",
  images: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=90",
    "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=500&q=85",
    "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=500&q=85",
  ],
};

export const blankProduct = {
  name: "",
  brand: "",
  sku: "LUM-HSE-001",
  categoryId: "",
  category: "",
  description: "",
  price: "0",
  salePrice: "0",
  stock: "",
  weight: "",
  status: "Công khai",
  images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=90"],
};
