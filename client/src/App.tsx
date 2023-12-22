import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Shirts from './pages/Shirts';
import ShirtsDetails from './pages/ShirtsDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminShirts from './pages/AdminShirts';
import Account from './pages/Account';
import ReviewForm from './pages/ReviewForm';
import Reviews from './pages/Reviews';
import Shop from './pages/Shop';
import Checkout from './pages/CheckOut';
import Confirmation from './pages/Confirmation';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
      }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shirts" element={<Shirts />} />
          <Route path="/product/:id" element={<ShirtsDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-shirts" element={<AdminShirts />} />
          <Route path="/account" element={<Account />} />
          <Route path="/reviews/:id" element={<Reviews />} />
          <Route path="/reviews-form/:shirtId" element={<ReviewForm />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
      <Footer />
      </Router>
    </ApolloProvider>
  )
}

export default App