import { useState } from "react";

export function ProductGallery({ product }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const galleryImages = Array.isArray(product.images) && product.images.length
        ? product.images
        : product.imageUrl
            ? [product.imageUrl]
            : [];

    if (!galleryImages.length) {
        return null;
    }

    return (
        <section className="grid gap-4 md:grid-cols-[72px_1fr]">
            <div className="order-2 flex gap-3 md:order-1 md:flex-col">
                {galleryImages.map((image, index) => (
                    <button
                        key={image}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`h-20 w-20 shrink-0 border bg-white p-1 transition hover:border-luxe-primary ${index === selectedImageIndex ? "border-luxe-primary" : "border-luxe-line"}`}
                        aria-label={`Xem ảnh sản phẩm ${index + 1}`}
                    >
                        <img className="h-full w-full object-cover" src={image} alt={`${product.name} ${index + 1}`} />
                    </button>
                ))}
            </div>
            <div className="relative order-1 min-h-[520px] bg-white md:order-2">
                <img className="h-full min-h-[520px] w-full object-cover object-center" src={galleryImages[selectedImageIndex]} alt={product.name} />
                <button className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white text-luxe-ink shadow-sm" aria-label="Phóng to ảnh">
                    ⌕
                </button>
            </div>
        </section>
    );
}
