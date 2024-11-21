import { useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

// Componente App, es el componente renderizado
function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  //  Añadir productos al carrito
  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists >= 0) { // Existe en el carrito
      if(cart[itemExists].quantity >= quantityMin) return 
      const updateCart = [...cart];
      updateCart[itemExists].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
      setMessage(`El producto ${item.name} se añadio al carrito`)
      cleanMessage()
    }
  }
  // Eliminar productos del carrito
  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }
  // Incremento de cantidades
  function increaseQuantity(id) {
    const updateCart = cart.map((item) => {
      if (item.id === id) {
        const quantityMin = Math.min(item.quantity + 1, 5);
        if (quantityMin === 5) {
          setMessage(`No puedes agregar más de 5 unidades de ${item.name}`);
          cleanMessage();
        } else {
          setMessage("");
        }
        return { ...item, quantity: quantityMin };
      }
      return item;
    });
    setCart(updateCart);
  }
  // Decremento de cantidades
  function decrementQuantity(id) {
    const decrementItem = cart.map((item) => {
      if (item.id === id) {
        const quantityMax = Math.max(item.quantity - 1, 1);

        return { ...item, quantity: quantityMax };
      }
      return item;
    });
    setCart(decrementItem);
  }

  // Duración del mensaje y limpieza
  const cleanMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decrementQuantity={decrementQuantity}
        message={message}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* Footer corregido */}
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
