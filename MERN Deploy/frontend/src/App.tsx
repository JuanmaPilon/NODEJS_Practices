import { useEffect,useState } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/products`)
    .then(response => response.json())
    .then(data => setProducts(data))
  }, []);

  return <div>
    <h1>Products</h1>
    
    <form
  onSubmit={async (e) => {
        e.preventDefault();
      const name = e.target[0].value;
      const price = e.target[1].value;
      const description = e.target[2].value;

      const res = await fetch(`${BACKEND_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
          description,
        })
      });
        const data = await res.json();
        console.log(data);
        setProducts([...products, data]);
      }}
  >
      <input type="text" placeholder='Name'/>
      <input type="text" placeholder='Price'/>
    <input type="text" placeholder='Description'/>
      <button type="submit">Create</button>

    </form>
    {
      products.map(product => (
        <div key={product._id} style={
          {
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            display: 'inline-block',
          }
        }>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))
    }
  </div>
}
export default App;