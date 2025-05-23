import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store';
import './nonveg.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const priceRanges = [
    { value: 'Rs 1 to Rs 50', min: 1, max: 50 },
    { value: 'Rs 51 to Rs 100', min: 51, max: 100 },
    { value: 'Rs 101 to Rs 200', min: 101, max: 200 },
    { value: 'Rs 201 to Rs 500', min: 201, max: 500 },
    { value: 'More than Rs 500', min: 501, max: Infinity },
];

function NonVeg() {
    const dispatch = useDispatch();
    const nonVegProducts = useSelector((state) => state.products.nonveg || []);

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRanges, setSelectedRanges] = useState([]);

    const itemsPerPage = 6;

    const handleCheckboxChange = (value) => {
        setSelectedRanges((prev) =>
            prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
        );
        setCurrentPage(1);
    };

    const activeRanges = priceRanges.filter((range) =>
        selectedRanges.includes(range.value)
    );

    const filteredProducts =
        selectedRanges.length === 0
            ? nonVegProducts
            : nonVegProducts.filter((product) =>
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

    const handleAddToCart = (product) => {
        dispatch(AddToCart(product));
        toast.success(`${product.name} added to cart! 🛒`, {
            position: 'top-right',
            autoClose: 2000,
        });
    };

    return (
        <div className="nonveg-page-container">
            {/* Toast Component */}
            <ToastContainer position="bottom-center" autoClose={2000} />

            <div className="nonveg-filter-section">
                <h2 className="filter-heading">Filter by Price</h2>
                <div className="checkbox-container-non">
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
                    <button onClick={() => setSelectedRanges([])}>Clear All Filters</button>
                </div>
            </div>

            <div className="nonveg-products-section">
                <h1 className='nonveg-main-title'>Non-Veg Products</h1>
                <div className="product-grid-non">
                    {currentItems.length > 0 ? (
                        currentItems.map((product, index) => (
                            <div key={index} className="product-card-non">
                                <img src={product.images} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.category}</p>
                                <p className="product-price">₹{product.price.toFixed(2)}</p>
                                <button
                                    className="add-to-cart-btn-non"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart 🛒
                                </button>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            No non-veg products found in selected price range.
                        </p>
                    )}
                </div>
                <div className="nonveg-pagination">
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
    );
}

export default NonVeg;