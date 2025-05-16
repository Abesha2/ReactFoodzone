import React, { useState } from 'react';

import { AddToCart } from './store';
import './snacks.css';
import { useDispatch, useSelector,  } from 'react-redux';

const priceRanges = [
    { value: 'Rs 1 to Rs 50', min: 1, max: 50 },
    { value: 'Rs 51 to Rs 100', min: 51, max: 100 },
    { value: 'Rs 101 to Rs 200', min: 101, max: 200 },
    { value: 'Rs 201 to Rs 500', min: 201, max: 500 },
    { value: 'More than Rs 500', min: 501, max: Infinity },
];

function Snacks() {
    const dispatch = useDispatch();
    const snackItems = useSelector((state) => state.products.snacks || []);

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRanges, setSelectedRanges] = useState([]);

    const itemsPerPage = 6;

    const handleCheckboxChange = (value) => {
        setSelectedRanges((prev) =>
            prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
        );
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSelectedRanges([]);
        setCurrentPage(1);
    };

    const activeRanges = priceRanges.filter((range) =>
        selectedRanges.includes(range.value)
    );

    const filteredProducts = selectedRanges.length === 0
        ?snackItems


        : snackItems .filter((product) =>
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

    return (
        <div className="snacks-page-container-wrapper">
            <div className="gradient-background"></div>
            <div className="snacks-page-container">
                <div className="snacks-filter-section">
                    <h2 className="filter-heading">Filter by Price</h2>
                    <div className="checkbox-container-sna">
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
                <div className="snacks-products-section">
                    <h1 className="snacks-main-title">Snacks</h1>
                    <div className="product-grid-sna">
                        {currentItems.length > 0 ? (
                            currentItems.map((product) => (
                                <div key={product.id} className="product-card-sna">
                                    <img src={product.images} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p className="product-price">₹{product.price.toFixed(2)}</p>
                                    <button
                                        className="add-to-cart-btn-sna"
                                        onClick={() => dispatch(AddToCart(product))}
                                    >
                                        Add to Cart 🛒
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                No snacks found in selected price range.
                            </p>
                        )}
                    </div>
                    <div className="snacks-pagination">
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

export default Snacks;
