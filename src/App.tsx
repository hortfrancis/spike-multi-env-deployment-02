const env = import.meta.env;

// Using Vite mode to track environments 
const ENVIRONMENT = import.meta.env.MODE;

const PACKAGE_VERSION = import.meta.env.VITE_PACKAGE_VERSION;

function App() {

  // A generic change, to test `npm version` (#1) 

  console.log('Environment Variables:', env);

  return (
    <div className='App'>
      <h1>Spike Multi-Env Deployment 02</h1>
      <p><em>Spike project to explore and describe how to handle automated deployment to multiple environments, using Git & GitHub.</em></p>
      GitHub repo: <a target='_blank' href='https://github.com/hortfrancis/spike-multi-env-deployment-02/'>github.com/hortfrancis/spike-multi-env-deployment-02</a>
      <hr />

      <p>npm package version: <code>{PACKAGE_VERSION}</code></p>
      <hr />

      Test commit on `main`, so I can merge `main` to `release/0.1.0` 
      I am a frog 
      
      ---
      
      Test commit change: 
      Making a test commit in branch `release/0.1.0 

      <hr />
      
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
      {ENVIRONMENT === 'pp' && (
        <>
          <p>This <code>pp</code> deployment will deploy when a <strong>tag with the pattern</strong> <code>v*-pp</code> is pushed.</p>
          <p>For example, <code>v1.0.0-pp</code>.</p>
        </>
      )}
      {ENVIRONMENT === 'prod' && (
        <>
          <p>This <code>prod</code> deployment will deploy when a <strong>tag with the pattern</strong> <code>v*</code> is pushed, without any suffix.</p>
          <p>For example, <code>v1.0.0</code>.</p>
        </>
      )}
    </div>
  );
};

export default App;
