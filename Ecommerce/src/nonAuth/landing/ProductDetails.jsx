import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { ProductsApi } from "../../data/ApiEndPoints";
import NavbarBlack from "../../layout/NavbarBlack";
import Footer from "../../layout/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [fullscreenMedia, setFullscreenMedia] = useState(null);

  useEffect(() => {
    fetch(`${ProductsApi}/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div className="p-20 text-center">Loading...</div>;

  return (
    <>
      <NavbarBlack />

      <div className="min-h-screen bg-white px-6 py-16 flex items-center justify-center">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-16">
          {/* Left: Product Image */}
          <div className="w-full md:w-2/4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[600px] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Right: Product Info */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-serif text-gray-800">
              {product.name}
            </h1>
            <p className="text-2xl text-gold-600">
              ${product.price.toLocaleString()}
            </p>
            <p className="text-gray-600 text-sm">{product.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <button className="px-6 py-3 bg-black text-white uppercase tracking-wider opacity-85">
                Add to Cart
              </button>
              <button className="px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-all">
                <FaHeart className="inline mr-2" />
                Add to Wishlist
              </button>
            </div>

            {/* Media Thumbnails */}
            <div className="pt-10 grid grid-cols-3 gap-4">
              {/* Image 1 */}
              <img
                src={product.gallery?.[0]}
                alt="Watch view 1"
                className="w-full h-32 object-cover rounded cursor-pointer hover:scale-105 transition"
                onClick={() => setFullscreenMedia(product.gallery?.[0])}
              />

              {/* Image 2 */}
              <img
                src={product.gallery?.[1]}
                alt="Watch view 2"
                className="w-full h-32 object-cover rounded cursor-pointer hover:scale-105 transition"
                onClick={() => setFullscreenMedia(product.gallery?.[1])}
              />

              {/* Video with Play Icon Overlay */}
              <div
                className="relative w-full h-32 rounded cursor-pointer overflow-hidden hover:scale-105 transition"
                onClick={() => setFullscreenMedia(product.video)}
              >
                <video
                  src={product.video}
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="bg-white/70 p-3 rounded-full shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="black"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="black"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Media Modal */}
      {fullscreenMedia && (
        <div
          onClick={() => setFullscreenMedia(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-pointer"
        >
          {fullscreenMedia.endsWith(".mp4") ||
          fullscreenMedia.endsWith(".webm") ? (
            <video
              src={fullscreenMedia}
              autoPlay
              controls
              className="w-screen h-screen object-contain"
            />
          ) : (
            <img
              src={fullscreenMedia}
              alt="Preview"
              className="w-screen h-screen object-contain"
            />
          )}
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductDetails;
