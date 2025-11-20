import React,{useState,useEffect} from "react";
// import ProductList from "../ProductList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faCartShopping, faHeart as faHeartSolid, faUser, faXmark} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import ProductViewComp from "./../ProductViewComp";
import Nav from "./nav";
import { Link } from "react-router";
import Footer from "../Footer";

function NewArrivals()
{

     const [products, setProducts] = useState([]);
       const [user, setUser] = useState(() => {
      const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
      });
    
      const userId = user?.id;
    
      const [cartItems, setCartItems] = useState([]);
      const [wishlistItems, setWishlistItems] = useState([]);
      const [selectedProduct, setSelectedProduct] = useState(null); // For modal


       //to for new arrivals
         useEffect(() => {
           fetch("https://demowithecomjewel-backend.onrender.com/api/products")
             .then((res) => res.json())
             .then((data) => {
           const excludedCategories = ["earrings", "necklace", "charms","bracelet","clips","anklet","combos"];
   
           const allowedProducts=data.filter(
             (p)=> !excludedCategories.includes(p.description.toLowerCase())
           );
               setProducts(allowedProducts)})
             .catch((err) => console.error("Error fetching products:", err));
         }, []);
   
         //for limited time special
          const [limitedpro, setLimited] = useState([]);
       
         useEffect(() => {
           fetch("https://demowithecomjewel-backend.onrender.com/api/products")
             .then((res) => res.json())
             .then((data) => {
           const excludedCategories1 = ["earrings", "necklace", "charms","bracelet","clips","anklet","combos","bows","stacks"];
   
           const limitedProducts=data.filter(
             (p)=> !excludedCategories1.includes(p.description.toLowerCase())
           );
               setLimited(limitedProducts)})
             .catch((err) => console.error("Error fetching products:", err));
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
       return(
           <>
       <Nav />
            <div style={{padding:"5px",margin:"30px 0px"}}>
                <h1 style={{textAlign:"center",fontWeight:"bold"}}>New Arrivals</h1>
           
            </div>
          
   
            <div className="row latestproductrow">
             {products.map((product) => (
             <div key={product.id} className="col-xl-2 col-sm-2 col-md-2 cards card" id="cards">
              <div>
                <img
                src={`https://demowithecomjewel-backend.onrender.com${product.imageUrl}`}
                alt={product.name} 
                 onClick={() => setSelectedProduct(product)}/>

                <button className="card-button" style={{justifySelf:"end"}} onClick={() => toggleWishlist(product.id)}>                
                <FontAwesomeIcon icon={isInWishlist(product.id) ? faHeartSolid : faHeartRegular} /></button>
                 
              </div>
               <div className="card-body">
                <p className="card-title"  onClick={() => setSelectedProduct(product)}>{product.name}</p>
                
                 <p className="card-price">₹{product.price}</p>
                 <div className="cardbtndiv">
                 
                  <button className="card-button" onClick={() => toggleCart(product.id)}> {isInCart(product.id) ? "Remove" : "Add to Cart"} 
              </button>
               </div>
             </div>
             </div>
           ))}

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
   
         {/* for limited time scls */}
         <div style={{backgroundColor:"#F2BED1",padding:"5px",marginBottom:"30px",marginTop:"20px"}}>
            <h2 style={{textAlign:"center",fontWeight:"bold",color:"red",marginTop:"20px",}}>Limited Time Specials🔥</h2>
         <p style={{textAlign:"center",marginBottom:"30px"}}>"Hurry, our limited-time special is finally here! For a short time only, enjoy exclusive discounts on your favorite products. <br />These deals are too good to last, so make sure you don’t wait."</p>
   
   
         </div>
        
          <div className="row latestproductrow">
             {limitedpro.map((limitpro) => (
             <div key={limitpro.id} className="col-xl-2 col-sm-2 col-md-2 cards card" id="cards">
              <div>
                <img
                src={`https://demowithecomjewel-backend.onrender.com${limitpro.imageUrl}`}
                alt={limitpro.name}
                onClick={() => setSelectedProduct(limitpro)} />
                <button className="card-button" style={{justifySelf:"end"}}  onClick={() => toggleWishlist(limitpro.id)}>                
                    <FontAwesomeIcon icon={isInWishlist(limitpro.id) ? faHeartSolid : faHeartRegular} /></button>
                 
              </div>
               <div className="card-body">
                      <p className="card-title" onClick={() => setSelectedProduct(limitpro)}>{limitpro.name}</p>
                
                 <p className="card-price">₹{limitpro.price}</p>
                 
                  <div className="cardbtndiv">
                 
                  <button className="card-button" onClick={() => toggleCart(limitpro.id)}> {isInCart(limitpro.id) ? "Remove from Cart" : "Add to Cart"} 
              </button>
             </div>
             </div>
             </div>
           ))}

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

      {/* to show all product */}

        <div className="prolisthome" style={{textAlign:"center",marginTop:"30px",marginBottom:"30px",padding:"10px",backgroundColor:"#F8E8EE"}}>
            <h4 style={{marginBottom:"20px"}}>Elevating women's style with curated collections <br />that
        capture the timeless allure of pearls.</h4>
          <Link to="/productspage">View More  {'>>'} </Link>

        </div>

        {/* our promise in every order */}

       
        

        <Footer />
        </>
    );
}

export default NewArrivals;