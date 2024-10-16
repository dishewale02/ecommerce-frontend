import React from "react";
import { useCategory } from "../../contexts/CategoryContext";

const MainContent = () => {
  const { categories } = useCategory();

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative">
        <img
          src="https://via.placeholder.com/1920x500?text=Amazon+Style+Banner"
          alt="Hero Banner"
          className="w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">Welcome to MyShop</h2>
        </div>
      </section>

      {/* Category Section */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Shop by Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              className="bg-gray-100 p-4 text-center rounded-lg hover:bg-gray-200 transition"
            >
              <img
                src={`https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so`}
                alt={category.id}
                className="mb-4 mx-auto"
              />
              <h3 className="text-lg font-medium text-gray-800">
                {category.name}
              </h3>
            </button>
          ))}
        </div>
      </section>

      {/* Product Recommendations */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Recommended for You
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(8)
            .fill()
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
              >
                <img
                  src={`https://via.placeholder.com/150?text=Product+${
                    idx + 1
                  }`}
                  alt={`Product ${idx + 1}`}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h4 className="text-lg font-semibold text-gray-800">
                  Product {idx + 1}
                </h4>
                <p className="text-gray-600">$19.99</p>
                <button className="bg-yellow-500 text-black mt-4 px-4 py-2 rounded">
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
};

export default MainContent;
