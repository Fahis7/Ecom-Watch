import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <>
      <Link to={`/product/${product.id}`}>
        <div className="group relative rounded-lg overflow-hidden bg-white hover:shadow-lg transition">
          <div className="relative border border-none rounded-lg overflow-hidden transition-all duration-500 group bg-white">
            {/* Premium Badge */}

            {/* Image with luxury overlay */}
            <div className="relative overflow-hidden h-64">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Product Details */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-serif font-medium text-gray-900 tracking-tight">
                  {product.name}
                </h3>
                <span className="text-xs uppercase tracking-widest text-gray-500 border-gray-200 pb-1">
                  {product.brand}
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <p className="text-2xl font-serif text-gray-900">
                  ${product.price.toLocaleString()}
                </p>
                <button className="px-6 py-2 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-300 border border-black hover:border-gray-800 opacity-85">
                  Acquire
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
