import PropTypes from 'prop-types';

//  Componente Guitar
function Guitar({ guitar, addToCart }) {
  // Destructuramos las propiedades del objeto "guitar"
  const {  name, image, description, price } = guitar;

  // const handleClick = (guitar) => {
  //   setCart([...cart, guitar ])
  // }

  return (
    <div className="col-md-6 col-lg-4 my-4 d-flex align-items-center">
      <div className="row w-100">
        {/* Imagen de la guitarra */}
        <div className="col-4">
          <img
            className="img-fluid"
            src={`/img/${image}.jpg`}
            alt={`Imagen de la guitarra ${name}`}
          />
        </div>
        {/* Información de la guitarra */}
        <div className="col-8">
          <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
          <p>{description}</p>
          <p className="fw-bold text-primary fs-3">${price}</p>
          <button 
          type="button"
          className="btn btn-dark w-100"
          onClick= {() => addToCart(guitar)}
          > Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

// Validación de PropTypes para asegurar que recibimos los datos correctos
Guitar.propTypes = {

  guitar: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Guitar;
