import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store'; // Corrected import path
import './veg.css'; // Assuming this CSS file is in the same directory

const priceRanges = [
    { value: 'Rs 1 to Rs 50', min: 1, max: 50 },
    { value: 'Rs 51 to Rs 100', min: 51, max: 100 },
    { value: 'Rs 101 to Rs 200', min: 101, max: 200 },
    { value: 'Rs 201 to Rs 500', min: 201, max: 500 },
    { value: 'More than Rs 500', min: 501, max: Infinity },
];

function Veg() {
    const dispatch = useDispatch();
    const vegProducts = useSelector((state) => state.products.veg); // Access veg products 
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRanges, setSelectedRanges] = useState([]);
    const itemsPerPage = 6;


    const handleCheckboxChange = (value) => {
        setSelectedRanges((prev) =>
            prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
        );
        setCurrentPage(1); // Reset to first page on filter change
    };

    const clearFilters = () => {
        setSelectedRanges([]);
        setCurrentPage(1);
    };

    const activeRanges = priceRanges.filter((range) =>
        selectedRanges.includes(range.value)
    );

    const filteredProducts = selectedRanges.length === 0
        ? vegProducts
        : vegProducts.filter((product) =>
            activeRanges.some(
                (range) => product.price >= range.min && product.price <= range.max
            )
        );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (loading === 'pending') {
        return (
            <div className="veg-page-container">
                <h1 className="veg-main-title">Loading products please wait mohen with deep sleep...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="veg-page-container">
                <h1 className="veg-main-title">Error loading products : {error}</h1>
            </div>
        );
    }


    return (
        <div className="veg-page-container-wrapper">
            <div className="gradient-background"></div>
            <div className="veg-page-container">
                <div className="veg-filter-section">
                    <h2 className="filter-heading">Filter by Price</h2>
                    <div className="checkbox-container-veg">
                        {priceRanges.map((range) => (
                            <label key={range.value}>
                                <input
                                    type="checkbox"
                                    checked={selectedRanges.includes(range.value)}
                                    onChange={() => handleCheckboxChange(range.value)}
                                />
                                {range.value}
                            </label>
                        ))}
                        <button onClick={clearFilters}>Clear All Filters</button>
                    </div>
                </div>

                <div className="veg-products-section">
                    <h1 className="veg-main-title">Veg Products</h1>
                    <div className="product-grid-veg">
                        {currentItems.length > 0 ? (
                            currentItems.map((product) => (
                                <div key={product.id} className="product-card-veg">
                                    {/* Use a key that is unique to the product, not the index */}
                                    <img src={product.images} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p className="product-price">₹{product.price.toFixed(2)}</p>
                                    <button
                                        className="add-to-cart-btn-veg"
                                        onClick={() => dispatch(AddToCart(product))}
                                    >
                                        Add to Cart 🛒
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                No veg products found in selected price range.
                            </p>
                        )}
                    </div>
                    <div className="veg-pagination">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={currentPage === index + 1 ? 'active' : ''}
                                onClick={() => goToPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Veg;
