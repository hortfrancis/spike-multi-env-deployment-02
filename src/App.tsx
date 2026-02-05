const env = import.meta.env;

// Using Vite mode to track environments 
const ENVIRONMENT = import.meta.env.MODE;

function App() {

  console.log('Environment Variables:', env);


  return (
    <div className='App'>
      <h1>Spike Multi-Env Deployment 01</h1>
      <p><em>Spike project to explore and describe how to handle automated deployment to multiple environments, using Git & GitHub.</em></p>
      <p><strong>Current environment: <code className='highlight-environment'>{ENVIRONMENT}</code></strong></p>
      {ENVIRONMENT === 'dev' && (
        <p>This <code>dev</code> deployment will deploy on <strong>any push</strong> to branch <code>main</code>.</p>
      )}
      {ENVIRONMENT === 'uat' && (
        <>
          <p>This <code>uat</code> deployment will deploy when a <strong>tag with the pattern</strong> <code>v*-uat</code> is pushed.</p>
          <p>For example, <code>v1.0.0-uat</code>.</p>
        </>
      )}
    </div>
  );
};

export default App;
