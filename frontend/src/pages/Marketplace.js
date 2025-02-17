import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Marketplace.css"; // Custom styles
import M from "materialize-css";

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Number of products per page

  useEffect(() => {
    // Initialize Materialize Carousel
    const elems = document.querySelectorAll(".carousel");
    const instances = M.Carousel.init(elems, { fullWidth: true, indicators: true });

    // Auto-slide function
    const interval = setInterval(() => {
      const carouselInstance = M.Carousel.getInstance(elems[0]);
      if (carouselInstance) {
        carouselInstance.next(); // Move to next slide
      }
    }, 4000); // Change slide every 4 seconds

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:3001/products") // Replace with backend API
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container">
      {/* Slider Section */}
      <div className="carousel carousel-slider">
        <a className="carousel-item" href="#two!">
          <img src="https://ng.jumia.is/cms/0-1-weekly-cps/0-2025/Week_8/Ramadan-deals/712X384.jpg" alt="Slide 2" />
        </a>
        <a className="carousel-item" href="#three!">
          <img src="https://ng.jumia.is/cms/0-1-initiatives/flashsale/2024/Desktop_Homepage_Slider__712x384.jpg" alt="Slide 3" />
        </a>
        <a className="carousel-item" href="#one!">
          <img src="https://ng.jumia.is/cms/0-1-initiatives/Magic-hour/2025/February/_712x384.jpg" alt="Slide 1" />
        </a>
      </div>

      {/* Products Section */}
      <h1 className="center-align">🛍️ Shop with Blue</h1>
      <div className="row">
        {currentProducts.map((product) => (
          <div key={product.id} className="col s12 m6 l3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      

      {/* Pagination Controls */}
      <div className="pagination-container">
        <button className="pagination-arrow" onClick={prevPage} disabled={currentPage === 1}>
          &lt;
        </button>
        <span className="page-number">{currentPage} of {totalPages}</span>
        <button className="pagination-arrow" onClick={nextPage} disabled={indexOfLastProduct >= products.length}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Marketplace;
