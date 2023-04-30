import logo from './logo.svg';
import './App.scss';
import { Component, useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home, Login } from './components';
import { CookieContext} from './context/CookieContext';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error)
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  const { user} = useContext(CookieContext);
  console.log(user)
  const ProtectedRoute = ({children})=>{
    if(!user){
      return <Navigate to="/login"/>;
    }
    return children;
  }
  return (
    
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route index element={
                <ProtectedRoute>
                <Home />
                </ProtectedRoute>
              } />
              <Route path='login' element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
  );
}

export default App;
