import React, { useState } from 'react';
import './home.css';
import { Link, useNavigate } from 'react-router-dom';

const categories = [

  { name: 'Italian', img: '/images/italian.jpg' ,route:'/italian'},
  { name: 'Chinese', img: '/images/chinesefood.jpg',route:'/chinese' },
  { name: 'Burgers', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  { name: 'Pizzas', img: '/images/pizzaaa.jpg', route: '/pizza'},
  {name:'Desserts',img:'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', route:'/dessert'},

];

const dishes = [
  { name: 'Spicy Chicken Biryani', img: '/images/chicken-biryani.jpg' },
  { name: 'Italian Pasta', img: '/images/lasagna.jpg' ,route:'/italian'},
  { name: 'Chinese Dumplings', img: '/images/dim-sum.jpg' },
  { name: 'Double Cheeseburger', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  { name: 'BBQ Chicken Pizza', img: '/images/bbq-chicken.jpg' },
];

const Home = () => {
  const year = new Date().getFullYear();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Basic routing based on search query
    const lowerCaseQuery = searchQuery.toLowerCase();
    if (lowerCaseQuery.includes('italian')) {
      navigate('/italian');
    } else if (lowerCaseQuery.includes('chinese')) {
      navigate('/chinese');
    } else if (lowerCaseQuery.includes('pizza')) {
      navigate('/pizza');
    }
    else if (lowerCaseQuery.includes('dessert')) {
      navigate('/dessert');
    }
    else if (lowerCaseQuery.includes('snacks')) {
      navigate('/snacks');
    }
    else {
      alert(`Searching for "${searchQuery}".  No specific page implemented for that. Showing Home Page`); // changed to alert
      setSearchQuery('');
    }
  };

  return (
    <main className="home-page" role="main">
      <header>

      </header>

      <section className="hero-section" aria-label="Hero section with promotional message">
        <div className="floating-img cooking1" aria-hidden="true"></div>
        <div className="floating-img cooking2" aria-hidden="true"></div>
        <div className="floating-img cooking3" aria-hidden="true"></div>
        <div className="hero-content">
          <h2 className="hero-title">Order Delicious Food Online</h2>
          <p className="hero-subtitle">Find the best restaurants & dishes near you</p>
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search restaurants or dishes"
              aria-label="Search restaurants or dishes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit"  aria-label="Search">Search</button>
          </form>
        </div>
      </section>

      <section className="categories-section" aria-label="Popular food categories">
          <h2>Popular Cuisines</h2>
        <div className="categories-slider" tabIndex={0} role="list">
          {categories.map(({ name, img, route }, i) => (
            <div key={i} className="category-item" role="listitem" tabIndex={0} style={{ animationDelay: `${i * 0.15}s` }}>
              {route ? (
                <Link to={route}>
                  <img src={img} alt={`${name} cuisine`} loading="lazy" />
                  <span>{name}</span>
                </Link>
              ) : (
                <>
                  <img src={img} alt={`${name} cuisine`} loading="lazy" />
                  <span>{name}</span>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="food-carousel" aria-label="Popular dishes carousel">
          <h3>Delicious Dishes</h3>
          <div className="carousel-wrapper" tabIndex={0} role="list">
            {dishes.map(({ name, img, route }, i) => ( // Added route here
              <div key={i} className="food-card" role="listitem" tabIndex={0}>
                {route ? ( // Added this conditional rendering
                  <Link to={route}>
                    <img src={img} alt={name} loading="lazy" />
                    <span>{name}</span>
                  </Link>
                ) : (
                  <>
                    <img src={img} alt={name} loading="lazy" />
                    <span>{name}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-us-section" aria-label="About Us Section">
        <div className="about-us-content">
          <h2>About Us</h2>
          <p>
            Welcome to FoodZone, your one-stop destination for ordering delicious food online.
            We connect you with the best restaurants in your area, offering a wide variety of cuisines
            to satisfy your cravings.  Our mission is to make food ordering quick, easy, and enjoyable.
          </p>
          <p>
            At FoodZone, we believe that food is not just about sustenance, but also about the
            experience. We strive to provide you with a seamless online ordering process,
            from browsing menus to secure payment and timely delivery.
          </p>
          <p>
            We partner with a diverse range of restaurants, from local favorites to
            well-known chains, to bring you the best culinary options.  Whether you're in the mood
            for Italian, Chinese, burgers, pizza, or something else, FoodZone has you covered.
          </p>
        </div>
      </section>

      <footer className="home-footer" role="contentinfo">
        <p>© {year} FoodZone. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Home;

