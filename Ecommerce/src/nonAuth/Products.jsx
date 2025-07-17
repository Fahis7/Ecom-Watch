import Navbar from "../layout/Navbar";
import { useEffect, useState, useRef } from "react";
import { GetProducts } from "../api/GetProducts";
import ProductCard from "../common/components/ProductCard";
import Footer from "../layout/Footer";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const intervalRef = useRef(null);

  const bannerImages = [
    {
      url: "https://media.rolex.com/image/upload/q_auto:eco/f_auto/c_limit,w_1920/v1722242026/rolexcom/collection/family-pages/classic-watches/day-date/family-page/2024/classic-watches-day-date-M228238-0066_2401jva_002",
      title: "Crafted Perfection",
      subtitle: "Masterpieces made by the finest watchmakers",
    },
    {
      url: "https://media.rolex.com/image/upload/q_auto:eco/f_auto/c_limit,w_1920/v1/rolexcom/model-page/gallery/m226570-0001/m226570-0001_v03",
      title: "Timeless Elegance",
      subtitle: "Discover watches that transcend generations",
    },
    {
      url: "https://patek-res.cloudinary.com/dfsmedia/0906caea301d42b3b8bd23bd656d1711/175678-51883",
      title: "Precision and Legacy",
      subtitle: "Where time meets tradition and excellence",
    },
  ];

  // Extract unique brands from products
  const brands = ["All", ...new Set(products.map((product) => product.brand))];

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await GetProducts();
      setProducts(data);
      setFilteredProducts(data);
    };

    fetchProducts();

    // Corrected banner rotation logic
    intervalRef.current = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (selectedBrand === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.brand === selectedBrand)
      );
    }
  }, [selectedBrand, products]);

  return (
    <div className="min-h-screen bg-ivory-50">
      <Navbar />

      {/* Banner section - Removed fade effect */}
      <div className="w-full h-[75vh] relative overflow-hidden">
        <img
          src={bannerImages[currentBannerIndex].url}
          alt="Luxury Watch Banner"
          className="w-full h-full object-cover object-[50%_60%]"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-8">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            {bannerImages[currentBannerIndex].title}
          </h1>
          <p className="text-xl text-white max-w-2xl mb-8">
            {bannerImages[currentBannerIndex].subtitle}
          </p>
        </div>
      </div>

      {/* Rest of your existing code remains exactly the same */}
      <div className="w-[75%] mx-auto py-8 flex justify-center space-x-6">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${
              selectedBrand === brand
                ? "text-gold-400 border-b-2 border-gold-400"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      <div className="w-[75%] mx-auto pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              description={product.description}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
