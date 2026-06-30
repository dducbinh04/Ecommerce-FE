import { useEffect, useMemo, useState } from "react";

function isDataUrl(value) {
  return typeof value === "string" && value.startsWith("data:image/");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

function toImageList(product) {
  return [
    ...(Array.isArray(product.images) ? product.images : []),
    ...(Array.isArray(product.imageUrls) ? product.imageUrls : []),
    product.imageUrl,
  ].filter(Boolean);
}

function splitImageUrls(value) {
  return value
    .split(/\r?\n|,/)
    .map((url) => url.trim())
    .filter(Boolean);
}

export function ProductBasicForm({ mode, product, categories = [] }) {
  const isEdit = mode === "edit";
  const initialImages = toImageList(product);
  const [imageMode, setImageMode] = useState(initialImages.some((image) => !isDataUrl(image)) ? "url" : "file");
  const [imagePreviews, setImagePreviews] = useState(initialImages);

  useEffect(() => {
    const nextImages = toImageList(product);
    setImagePreviews(nextImages);
    setImageMode(nextImages.some((image) => !isDataUrl(image)) ? "url" : "file");
  }, [product.imageUrl, product.images, product.imageUrls, product.name, isEdit]);

  const previewLabel = useMemo(() => {
    if (imagePreviews.length === 0) {
      return "Chưa có ảnh";
    }

    return imageMode === "file" ? `${imagePreviews.length} ảnh tải lên` : `${imagePreviews.length} ảnh từ URL`;
  }, [imageMode, imagePreviews.length]);

  async function handleFileChange(event) {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) {
      return;
    }

    const dataUrls = await Promise.all(files.map(readFileAsDataUrl));
    setImageMode("file");
    setImagePreviews(dataUrls.filter(Boolean));
  }

  function handleUrlChange(event) {
    const nextUrls = splitImageUrls(event.target.value);
    setImageMode("url");
    setImagePreviews(nextUrls);
  }

  return (
    <section className="overflow-hidden border border-luxe-line bg-white shadow-sm">
      <div className="border-b border-luxe-line px-6 py-5">
        <h2 className="text-lg font-bold text-luxe-ink">Thông tin sản phẩm</h2>
        <p className="mt-2 text-sm text-luxe-mutedText">Giữ các trường khớp với API: tên, mô tả, giá, số lượng, ảnh và danh mục.</p>
      </div>

      <div className="grid gap-5 p-6 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Tên sản phẩm</span>
          <input
            name="name"
            className="h-11 w-full border border-luxe-line bg-luxe-muted px-4 text-sm outline-none transition focus:border-luxe-gold"
            defaultValue={product.name}
            placeholder="Ví dụ: Đồng hồ Heritage Silver Edition"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Danh mục</span>
          <select
            name="categoryId"
            className="h-11 w-full border border-luxe-line bg-luxe-muted px-4 text-sm outline-none transition focus:border-luxe-gold"
            defaultValue={product.categoryId}
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Số lượng</span>
          <input
            name="quantity"
            type="number"
            min="0"
            className="h-11 w-full border border-luxe-line bg-luxe-muted px-4 text-sm outline-none transition focus:border-luxe-gold"
            defaultValue={product.quantity}
            placeholder="0"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Giá bán</span>
          <input
            name="price"
            type="number"
            min="0"
            className="h-11 w-full border border-luxe-line bg-luxe-muted px-4 text-sm outline-none transition focus:border-luxe-gold"
            defaultValue={product.price}
            placeholder="0"
          />
        </label>

        <div className="md:col-span-2">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Ảnh sản phẩm</span>
            <div className="flex gap-2">
              <button
                type="button"
                className={`h-9 px-4 text-xs font-bold uppercase tracking-[0.12em] transition ${
                  imageMode === "file" ? "bg-luxe-primary text-white" : "border border-luxe-line text-luxe-mutedText hover:border-luxe-primary hover:text-luxe-ink"
                }`}
                onClick={() => setImageMode("file")}
              >
                Tải file
              </button>
              <button
                type="button"
                className={`h-9 px-4 text-xs font-bold uppercase tracking-[0.12em] transition ${
                  imageMode === "url" ? "bg-luxe-primary text-white" : "border border-luxe-line text-luxe-mutedText hover:border-luxe-primary hover:text-luxe-ink"
                }`}
                onClick={() => setImageMode("url")}
              >
                Nhập URL
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-dashed border-luxe-line bg-luxe-surface p-4">
              {imageMode === "file" ? (
                <label className="block cursor-pointer">
                  <span className="mb-2 block text-sm font-semibold text-luxe-ink">Tải ảnh từ máy lên</span>
                  <input
                    name="files"
                    type="file"
                    accept="image/*"
                    multiple
                    className="block w-full text-sm text-luxe-mutedText file:mr-4 file:h-10 file:border-0 file:bg-luxe-primary file:px-4 file:text-sm file:font-bold file:text-white hover:file:bg-luxe-primarySoft"
                    onChange={handleFileChange}
                  />
                  <p className="mt-2 text-xs text-luxe-mutedText">Có thể chọn nhiều file ảnh trong cùng một lần.</p>
                </label>
              ) : (
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-luxe-ink">Dán URL ảnh từ mạng ngoài</span>
                  <textarea
                    name="imageUrlInput"
                    className="min-h-28 w-full resize-none border border-luxe-line bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-luxe-gold"
                    defaultValue={initialImages.filter((image) => !isDataUrl(image)).join("\n")}
                    onChange={handleUrlChange}
                    placeholder="https://...\nhttps://..."
                  />
                  <p className="mt-2 text-xs text-luxe-mutedText">Mỗi URL một dòng hoặc cách nhau bằng dấu phẩy.</p>
                </label>
              )}

              {imageMode === "url"
                ? imagePreviews.map((image) => <input key={image} type="hidden" name="imageUrls" value={image} readOnly />)
                : null}
            </div>

            <div className="overflow-hidden rounded-2xl border border-luxe-line bg-white">
              <div className="border-b border-luxe-line px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Xem trước</p>
              </div>
              <div className="min-h-56 bg-luxe-muted p-3">
                {imagePreviews.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {imagePreviews.map((image, index) => (
                      <img
                        key={`${image}-${index}`}
                        className="aspect-square w-full rounded-lg border border-white object-cover"
                        src={image}
                        alt={`${product.name || "Ảnh sản phẩm"} ${index + 1}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-48 items-center justify-center px-6 text-center text-sm text-luxe-mutedText">
                    Chưa có ảnh để xem trước
                  </div>
                )}
              </div>
              <div className="px-4 py-3 text-xs text-luxe-mutedText">
                <span className="font-semibold text-luxe-ink">{previewLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-luxe-mutedText">Mô tả</span>
          <textarea
            name="description"
            className="min-h-36 w-full resize-none border border-luxe-line bg-luxe-muted px-4 py-3 text-sm leading-6 outline-none transition focus:border-luxe-gold"
            defaultValue={product.description}
            placeholder="Mô tả ngắn về sản phẩm..."
          />
        </label>

        {isEdit ? <input name="id" type="hidden" defaultValue={product.id} /> : null}
      </div>
    </section>
  );
}
