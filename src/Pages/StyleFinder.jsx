import { useMemo, useState } from "react";
import { usePageMeta } from "../hooks/usePageMeta";

const marketplaces = [
  {
    id: "uzum",
    name: "Uzum Market",
    createUrl: (query) => `https://uzum.uz/uz/search?query=${encodeURIComponent(query)}`,
    note: "O'zbekistondagi tez yetkazib berish variantlari.",
  },
  {
    id: "asaxiy",
    name: "Asaxiy",
    createUrl: (query) => `https://asaxiy.uz/uz/product?key=${encodeURIComponent(query)}`,
    note: "Kiyim va aksessuarlarni mahalliy narxlarda tekshirib ko'ring.",
  },
  {
    id: "wildberries",
    name: "Wildberries",
    createUrl: (query) => `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(query)}`,
    note: "Turli brendlar bo'yicha katta katalog.",
  },
  {
    id: "aliexpress",
    name: "AliExpress",
    createUrl: (query) => `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(query)}`,
    note: "Arzon alternativalarni topish uchun.",
  },
  {
    id: "google-lens",
    name: "Google Lens",
    createUrl: () => "https://lens.google.com/upload",
    note: "Rasmga o'xshash kiyimlarni AI orqali topadi.",
  },
];

export default function StyleFinder() {
  usePageMeta("Rasm orqali kiyim topish", "Rasm yuklab o'xshash kiyimlarni marketplace sahifalarida qidiring.");

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [form, setForm] = useState({
    itemType: "hoodie",
    color: "",
    gender: "unisex",
    budget: "any",
  });

  const searchQuery = useMemo(() => {
    const parts = [form.itemType, form.gender === "any" ? "" : form.gender, form.color, form.budget === "any" ? "" : form.budget]
      .map((value) => value.trim())
      .filter(Boolean);

    return parts.join(" ");
  }, [form]);

  const onImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);
    setSelectedImage(file);
    setPreviewUrl(url);
  };

  const onFieldChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">AI Style Finder</p>
        <h1 className="mt-3 text-3xl font-bold text-white md:text-5xl">Rasmga qarab kiyim toping</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
          Kiyim rasmi yuklang, qidiruv parametrlarini tanlang va Uzum, Wildberries, AliExpress kabi saytlar orqali o&apos;xshash mahsulotlarni toping.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <label className="mb-3 block text-sm font-semibold text-white">1) Rasm yuklang</label>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="file-input file-input-bordered w-full border-white/20 bg-slate-950/80 text-slate-200"
          />

          <div className="mt-4 rounded-xl border border-dashed border-white/15 bg-slate-950/60 p-3">
            {previewUrl ? (
              <img src={previewUrl} alt="Yuklangan kiyim rasmi" className="h-72 w-full rounded-lg object-cover" />
            ) : (
              <div className="grid h-72 place-items-center rounded-lg bg-slate-900 text-slate-400">Rasm hali tanlanmagan</div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm font-semibold text-white">2) Qidiruv filtrlari</p>

          <div className="mt-4 space-y-4">
            <label className="block text-sm text-slate-200">
              Kiyim turi
              <select
                name="itemType"
                value={form.itemType}
                onChange={onFieldChange}
                className="mt-1 w-full rounded-lg border border-white/20 bg-slate-950 px-3 py-2"
              >
                <option value="hoodie">Hoodie</option>
                <option value="t-shirt">T-shirt</option>
                <option value="jacket">Kurtka</option>
                <option value="pants">Shim</option>
                <option value="dress">Ko&apos;ylak</option>
                <option value="sneakers">Krossovka</option>
              </select>
            </label>

            <label className="block text-sm text-slate-200">
              Rang (ixtiyoriy)
              <input
                name="color"
                value={form.color}
                onChange={onFieldChange}
                placeholder="masalan: qora, oq, bej"
                className="mt-1 w-full rounded-lg border border-white/20 bg-slate-950 px-3 py-2"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Kim uchun
              <select
                name="gender"
                value={form.gender}
                onChange={onFieldChange}
                className="mt-1 w-full rounded-lg border border-white/20 bg-slate-950 px-3 py-2"
              >
                <option value="unisex">Unisex</option>
                <option value="women">Ayollar</option>
                <option value="men">Erkaklar</option>
                <option value="kids">Bolalar</option>
              </select>
            </label>

            <label className="block text-sm text-slate-200">
              Narx oralig&apos;i
              <select
                name="budget"
                value={form.budget}
                onChange={onFieldChange}
                className="mt-1 w-full rounded-lg border border-white/20 bg-slate-950 px-3 py-2"
              >
                <option value="any">Farqi yo&apos;q</option>
                <option value="budget">Arzon</option>
                <option value="mid-range">O&apos;rtacha</option>
                <option value="premium">Premium</option>
              </select>
            </label>
          </div>

          <div className="mt-6 rounded-lg border border-cyan-300/20 bg-cyan-400/5 px-3 py-2 text-sm text-cyan-100">
            Qidiruv so&apos;rovi: <span className="font-semibold">{searchQuery || "—"}</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <p className="text-sm font-semibold text-white">3) Sotib olish linklari</p>
        <p className="mt-1 text-sm text-slate-300">
          Quyidagi tugmalar sizni mos qidiruv sahifalariga olib boradi. Eng yaxshi natija uchun Google Lens&apos;ga ham rasmingizni yuklang.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {marketplaces.map((marketplace) => (
            <a
              key={marketplace.id}
              href={marketplace.createUrl(searchQuery)}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/15 bg-slate-950/70 p-4 transition hover:border-cyan-300/70 hover:-translate-y-0.5"
            >
              <p className="font-semibold text-white">{marketplace.name}</p>
              <p className="mt-1 text-xs text-slate-400">{marketplace.note}</p>
            </a>
          ))}
        </div>

        {!selectedImage && (
          <p className="mt-4 text-xs text-amber-300">Maslahat: aniqroq natija uchun avval kiyim rasmini yuklang.</p>
        )}
      </div>
    </section>
  );
}
