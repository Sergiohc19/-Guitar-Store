
function Header() {

    const name = "Juan"
    const total = 100


return (
    // Formas de fragmentar

    //* 1.  Fragment
    //?  Import { Fragment } from  "react"

    //? <Fragment>
    //? <h1>Total a pagar: {total}  </h1>
    //? <h2>Hola: {name}  </h2>
    //? </Fragment>

    //* 2. React.Fragment
    //?  Import React from  "react"
    
   //?   <React.Fragment>
   //?  <h1>Total a pagar: {total}  </h1>
   //?  <h2>Hola: {name}  </h2>
   //?  </React.Fragment>


//* 3. Sin importar nada y con <> y </>  , esta es la mejor forma
   
    <>
    <h1>Total a pagar: {total}  </h1>
    <h2>Hola: {name}  </h2>
    </>

    )
}

export default Header