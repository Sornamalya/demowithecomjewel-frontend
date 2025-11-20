import React, { useEffect, useState } from "react";
import Nav from "./nav";
import Footer from "../Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import ProductViewComp from "../ProductViewComp";

function Products(){

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const userId = user?.id;

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // For modal

  // Fetch all products
  useEffect(() => {
    fetch("https://demowithecomjewel-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Fetch user's cart and wishlist
  useEffect(() => {
    if (userId) {
      fetch(`https://demowithecomjewel-backend.onrender.com/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
           const cartIds = (data.cart || []).map((item) =>
            item.productId ?? item.product?.id
          );
          const wishlistIds = (data.wishlist || []).map((item) =>
            item.productId ?? item.product?.id
          );

          setCartItems(cartIds);
          setWishlistItems(wishlistIds);
        })
        .catch((err) => console.error("User fetch error:", err));
    }
  }, [userId]);

  // Toggle Cart
  const toggleCart = async (productId) => {
    if (!user) return alert("Please login first");

    try {
      const res = await fetch(`https://demowithecomjewel-backend.onrender.com/api/users/cart/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity: 1 }),
      });
      if (!res.ok) throw new Error("Failed to toggle cart");

        const updatedCart = await res.json();
      const updatedIds = updatedCart.map((item) =>
        item.productId ?? item.product?.id
      );
      setCartItems(updatedIds);
    } catch (err) {
      console.error("Cart toggle error:", err);
    }
  };

  // Toggle Wishlist
  const toggleWishlist = async (productId) => {
    if (!user) return alert("Please login first");

    try {
      const res = await fetch(
        `https://demowithecomjewel-backend.onrender.com/api/users/wishlist/toggle`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, productId }),
        }
      );
      if (!res.ok) throw new Error("Failed to toggle wishlist");

       const updatedWishlist = await res.json();
      const updatedIds = updatedWishlist.map((item) =>
        item.productId ?? item.product?.id
      );
      setWishlistItems(updatedIds);

    } 
    
    catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  };

  // Check if product is in cart or wishlist
  // ✅ Check if product is in cart/wishlist
  const isInCart = (productId) => cartItems.includes(productId);
  const isInWishlist = (productId) => wishlistItems.includes(productId);

  return (
    <div>
      <Nav />
      <h1 style={{ textAlign: "center", margin: "30px 0px" }}>All Products</h1>
      <div className="row latestproductrow">
        {products.map((product) => {
          // const isInCart = cartArray.some(
          //   (item) => item.productId === product.id
          // );
          // const inInWishlist = user?.wishlist?.includes(product.id);

          return (
            <div key={product.id} className="col-xl-2 col-sm-2 col-md-2 cards card" id="cards" > 
              <div>
                <img
                  src={`https://demowithecomjewel-backend.onrender.com${product.imageUrl}`}
                  alt={product.name}
                  onClick={() => setSelectedProduct(product)}
                />
                <button
                  className="card-button"
                  onClick={() => toggleWishlist(product.id)}>                
                  <FontAwesomeIcon icon={isInWishlist(product.id) ? faHeartSolid : faHeartRegular} />
                </button>
              </div>
              <div className="card-body">
                <p className="card-title" onClick={() => setSelectedProduct(product)}>{product.name}</p>
                <p className="card-price">₹{product.price}</p>
                <div className="cardbtndiv">
                  <button    className="card-button" onClick={() => toggleCart(product.id)}> {isInCart(product.id) ? "Remove " : "Add to Cart"} 
                  </button>
                </div>
              </div>
            </div>
          );
        })}
         {/* Modal */}
              {selectedProduct && (
                <ProductViewComp
                  product={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                  toggleCart={toggleCart}
                  toggleWishlist={toggleWishlist}
                  isInCart={isInCart(selectedProduct.id)}
                  isInWishlist={isInWishlist(selectedProduct.id)}
                  
                />
              )}
      </div>
      <Footer />
    </div>
  );
}

export default Products;
