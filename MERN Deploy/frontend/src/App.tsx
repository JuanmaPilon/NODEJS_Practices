import { useEffect } from 'react';

function App() {

  useEffect(() => {
    fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(data => console.log(data))
  }, []);

  return (
    <div>
      <h1>App</h1>
    </div>
  );
}
export default App;