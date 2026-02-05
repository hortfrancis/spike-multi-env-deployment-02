const env = import.meta.env;

// Using Vite mode to track environments 
const ENVIRONMENT = import.meta.env.MODE;

function App() {

  console.log('Environment Variables:', env);


  return (
    <div className='App'>
      <h1>Spike Multi-Env Deployment 01</h1>
      <p><em>Spike project to explore and describe how to handle automated deployment to multiple environments, using Git & GitHub.</em></p>
      <p><strong>Current environment: <code>{ENVIRONMENT}</code></strong></p>
    </div>
  )
}

export default App
