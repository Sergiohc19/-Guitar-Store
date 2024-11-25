import { useState, useEffect } from "react";
import { db } from "../data/db";


export const useCart = () => {
    
    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
      };
    
      const [data] = useState(db);
      const [cart, setCart] = useState(initialCart);
      const [message, setMessage] = useState("");
    
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);
    
    
      const minItem = 1;
      const maxItem = 5;
    
      //  Añadir productos al carrito
      function addToCart(item) {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    
        if (itemExists >= 0) {
          // Existe en el carrito
          if (cart[itemExists].quantity >= maxItem) return
          const updateCart = [...cart];
          updateCart[itemExists].quantity++
          setCart(updateCart);
        } else {
          item.quantity = 1
          setCart([...cart, item]);
          setMessage(`El producto ${item.name} se añadio al carrito`);
          clearMessage();
        }
      }
      // Eliminar productos del carrito
      function removeFromCart(id) {
        setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
      }
      // Incremento de cantidades
      function increaseQuantity(id) {
        const updateCart = cart.map((item) => {
          if (item.id === id && item.quantity < maxItem) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          } else if (item.id === id && item.quantity === maxItem) {
            setMessage(`You cannot add more than ${maxItem} units of ${item.name}`);
            clearMessage();
          }
          return item;
        });
      
        setCart(updateCart);
      }
      
      // Decremento de cantidades
      function decrementQuantity(id) {
        const updateCart = cart.map((item) => {
          if (item.id === id && item.quantity > minItem) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        setCart(updateCart);
      }
    
      // Duración del mensaje y limpieza
      const clearMessage = () => {
        setTimeout(() => {
          setMessage("");
        }, 3000);
      };
    
      // Limpiar el carrito
      function clearCart(e) {
        setCart([]);
      }

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decrementQuantity,
        message
    }
}
