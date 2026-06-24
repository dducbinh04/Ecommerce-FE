export const productCategories = [
  { id: "11111111-1111-1111-1111-111111111111", name: "Phụ kiện cao cấp" },
  { id: "22222222-2222-2222-2222-222222222222", name: "Thời trang nữ" },
  { id: "33333333-3333-3333-3333-333333333333", name: "Điện tử công nghệ" },
  { id: "44444444-4444-4444-4444-444444444444", name: "Nước hoa & Mỹ phẩm" },
];

export const adminProducts = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    name: "Đồng hồ Sapphire Horizon",
    description: "Đồng hồ cao cấp phong cách tối giản.",
    quantity: 24,
    price: 12500000,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=220&q=85",
    categoryId: productCategories[0].id,
    categoryName: productCategories[0].name,
  },
  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    name: "Túi xách Ebony Minimalist",
    description: "Thiết kế tinh gọn cho phong cách hiện đại.",
    quantity: 12,
    price: 8200000,
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=220&q=85",
    categoryId: productCategories[1].id,
    categoryName: productCategories[1].name,
  },
  {
    id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    name: "Tai nghe Wireless Onyx",
    description: "Tai nghe không dây chống ồn.",
    quantity: 0,
    price: 5500000,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=220&q=85",
    categoryId: productCategories[2].id,
    categoryName: productCategories[2].name,
  },
  {
    id: "dddddddd-dddd-dddd-dddd-dddddddddddd",
    name: "Nước hoa Aurelian Essence",
    description: "Hương thơm thanh lịch và sang trọng.",
    quantity: 52,
    price: 3950000,
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=220&q=85",
    categoryId: productCategories[3].id,
    categoryName: productCategories[3].name,
  },
];

export const editableProduct = {
  id: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
  name: "Đồng hồ Lumina Chronograph Limited",
  description:
    "Đồng hồ giới hạn với bộ máy chính xác và thiết kế hiện đại.",
  price: 45000000,
  quantity: 12,
  imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=90",
  categoryId: productCategories[0].id,
  categoryName: productCategories[0].name,
};

export const blankProduct = {
  name: "",
  description: "",
  price: "",
  quantity: "",
  imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=90",
  categoryId: "",
};
