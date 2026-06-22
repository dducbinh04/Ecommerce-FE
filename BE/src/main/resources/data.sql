INSERT INTO categories(id, name) VALUES
('11111111-1111-1111-1111-111111111111', 'Electronics'),
('22222222-2222-2222-2222-222222222222', 'Books'),
('33333333-3333-3333-3333-333333333333', 'Fashion'),
('44444444-4444-4444-4444-444444444444', 'Home & Kitchen'),
('55555555-5555-5555-5555-555555555555', 'Sports'),
('66666666-6666-6666-6666-666666666666', 'Beauty'),
('77777777-7777-7777-7777-777777777777', 'Toys'),
('88888888-8888-8888-8888-888888888888', 'Automotive'),
('99999999-9999-9999-9999-999999999999', 'Office'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Pet Supplies');

INSERT INTO products
(id, name, description, image_url, price, quantity, category_id)
VALUES
(
'b1111111-1111-1111-1111-111111111111',
'iPhone 15 Pro',
'Apple flagship smartphone',
'https://example.com/iphone15.jpg',
29990000,
50,
'11111111-1111-1111-1111-111111111111'
),

(
'b2222222-2222-2222-2222-222222222222',
'MacBook Air M3',
'Lightweight laptop from Apple',
'https://example.com/macbook.jpg',
32990000,
20,
'11111111-1111-1111-1111-111111111111'
),

(
'b3333333-3333-3333-3333-333333333333',
'Clean Code',
'Software engineering book',
'https://example.com/cleancode.jpg',
450000,
100,
'22222222-2222-2222-2222-222222222222'
),

(
'b4444444-4444-4444-4444-444444444444',
'Java Concurrency in Practice',
'Advanced Java programming book',
'https://example.com/jcip.jpg',
600000,
40,
'22222222-2222-2222-2222-222222222222'
),

(
'b5555555-5555-5555-5555-555555555555',
'Nike Air Max',
'Comfortable running shoes',
'https://example.com/nike.jpg',
2500000,
60,
'33333333-3333-3333-3333-333333333333'
),

(
'b6666666-6666-6666-6666-666666666666',
'Blender X200',
'High power kitchen blender',
'https://example.com/blender.jpg',
1800000,
15,
'44444444-4444-4444-4444-444444444444'
),

(
'b7777777-7777-7777-7777-777777777777',
'Dumbbell Set',
'Adjustable dumbbells',
'https://example.com/dumbbell.jpg',
1200000,
30,
'55555555-5555-5555-5555-555555555555'
),

(
'b8888888-8888-8888-8888-888888888888',
'Face Wash',
'Gentle daily cleanser',
'https://example.com/facewash.jpg',
150000,
80,
'66666666-6666-6666-6666-666666666666'
),

(
'b9999999-9999-9999-9999-999999999999',
'Lego City',
'Creative building blocks',
'https://example.com/lego.jpg',
900000,
25,
'77777777-7777-7777-7777-777777777777'
),

(
'baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
'Office Chair',
'Ergonomic office chair',
'https://example.com/chair.jpg',
3200000,
18,
'99999999-9999-9999-9999-999999999999'
);