import React,{useState,useEffect} from "react";
import Design1 from "./images/design1.png";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faCartShopping, faHeart as faHeartSolid, faUser, faXmark} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import Nav from "./navbar1/nav";
import ProductViewComp from "./ProductViewComp";



function ProductCategoryButton()
{

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
     const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
      });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const userId = user?.id;
  
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // For modal

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products from API
  useEffect(() => {
    fetch("https://demowithecomjewel-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        const excludedCategories = ["bows", "clusters", "stacks"];

        const allowedProducts=data.filter(
          (p)=> !excludedCategories.includes(p.description.toLowerCase())
        );

        const uniqueCategories = [
        ...new Set(allowedProducts.map((p) => p.description))
      ];
        setProducts(allowedProducts);
        setFilteredProducts(allowedProducts);
      setCategories(uniqueCategories);
    })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.description === category));
    }
  };

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
      } catch (err) {
        console.error("Wishlist toggle error:", err);
      }
    };
  
    // Check if product is in cart or wishlist
  // ✅ Check if product is in cart/wishlist
  const isInCart = (productId) => cartItems.includes(productId);
  const isInWishlist = (productId) => wishlistItems.includes(productId);

  return(
    <div>
        <div className="quotes" style={{backgroundColor:"#F8E8EE"}}>
             <h2>Expressing your beauty with our Product</h2>
          <h1 style={{color:"#dd2c88"}}>⋆⋅☆⋅⋆───⋆⋅☆⋅⋆───⋆⋅☆⋅⋆</h1>  
         <p>Discover elegance in our carefully selected jewelry collection that beautifully captures the timeless charm of pearls.<br />
         Each piece celebrates femininity, expresses individuality, and enhances your unique style.</p>

        </div>

       <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "30px",textAlign:"center" }}>Filter by Category</h2>

      {/* Desktop: Category Buttons */}
      {!isMobile ? (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px",justifyContent:"center" }}>
          <button className="cat-btn"
            onClick={() => handleCategoryChange("All")}
            style={{
              backgroundColor: selectedCategory === "All" ? "#dd2c88" : "#f3f2f2ff",
              color: "black",
              padding: "8px 12px",
              border: "1px solid",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            All
          </button>
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(cat)}
              style={{
               backgroundColor: selectedCategory === cat ? "#dd2c88" : "#f3f2f2ff",
                  color: "black",
                  padding: "8px 12px",
               border: "1px solid",
               borderRadius: "10px",
             cursor: "pointer"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      ) : (
        // Mobile: Dropdown
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "5px",
            border: "1px solid #f3f2f2ff",
            marginBottom: "20px",
            width: "auto"
            
          }}
        >
          <option value="All">All</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      )}

      {/* Filtered Products */}
        {/* <Nav /> */}
          <div className="row filterrow" >
   {filteredProducts.length > 0 ? (
     filteredProducts.map((product) => (
       <div className="col-xl-2 col-sm-2 col-md-2 cards card" id="cards" 
         key={product.id}
        >
         <div>
           <img
           src={`https://demowithecomjewel-backend.onrender.com${product.imageUrl}`}
           alt={product.name}
           onClick={() => setSelectedProduct(product)} />
           <button className="card-button" style={{justifySelf:"end"}}  onClick={() => toggleWishlist(product.id)}> 
              <FontAwesomeIcon icon={isInWishlist(product.id) ? faHeartSolid : faHeartRegular} /></button>
         </div> 
         
           <div className="card-body">
              <p className="card-title" onClick={() => setSelectedProduct(product)}>{product.name}</p>
        
         <p className="card-price">₹{product.price}</p>
         <div className="cardbtndiv">
         
            <button className="card-button" onClick={() =>toggleCart(product.id)}> {isInCart(product.id) ? "Remove" : "Add to Cart"} 
           </button>

         </div>
           </div>
       </div>
     ))
          
        ) : (
          <p>No products available for this category.</p>
        )}
      </div>
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
   </div>
  );
}

export default ProductCategoryButton;