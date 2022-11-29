import Footer from "./components/Footer";
import GenerateMBI from "./components/GenerateMBI";
import VerifyMBI from "./components/VerifyMBI";


function App() {


  const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.REACT_APP_API

  return (
    <div className="App">

      {!host && 
        <div className="container">
          <h1>Application Error</h1>
          <p>Environment variable missing - REACT_APP_API</p>  
        </div>
      }

      {host &&
        <div className="container py-4">
        
          <header>
            <h1>Medicare Beneficiary Identifier</h1>
          </header>

          <p>Full Stack Engineering Take Home Coding Challenge</p>
          <div className="row border-top p-3">
            <div className="col-sm-7">
              
              <div className="py-3">
                <GenerateMBI host={host} />
              </div>

              <div className="py-3">
                <VerifyMBI host={host} />
              </div>
            
            </div>
            
            <div className="col-sm-5">
              <img className="img-fluid float-left" alt="" src="medicare-lady.png" />
            </div>
          
          </div>


        
          <footer className="pt-3 text-muted border-top">
            <Footer />
          </footer>
        </div>
      }

    </div>
      
  );
}

export default App;
