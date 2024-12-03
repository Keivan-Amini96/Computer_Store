let products = [];

// Fetch products from the JSON file
fetch('./products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        const isProductDetailPage = checkIfProductDetailPage();
        if (isProductDetailPage) {
            fetchProductDetails(); // Render product details
        } else {
            applyInitialFilters(); // Apply filters for product list
        }
    })
    .catch(error => console.error('Error fetching products:', error));

// Function to check if the current page is a product detail page
function checkIfProductDetailPage() {
    return window.location.pathname.includes('productDetail.html');
}

// -------------------- Product Listing Functions --------------------

// To apply initial filters (for category parameter)
function applyInitialFilters() {
    const selectedCategory = getUrlParameter('category');
    if (selectedCategory) {
        const categoryDropdown = document.getElementById('categories');
        if (categoryDropdown) {
            categoryDropdown.value = selectedCategory;
        }
        filterProducts(); // Apply the filters
    } else {
        renderProducts(products); // Default render
    }
}

// To render products
function renderProducts(productsToRender) {
    const productsContainer = document.querySelector('.products');
    if (!productsContainer) return;

    productsContainer.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="viewDetails(${product.id})">View Details</button>
        `;

        productsContainer.appendChild(productCard);
    });
}

// To get URL parameters
function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Filter products based on selected filters
function filterProducts() {
    const selectedCategory = document.getElementById('categories').value;
    const selectedBrand = document.getElementById('brands').value;
    const priceRange = document.getElementById('price-range').value;

    const filteredProducts = products.filter(product => {
        const isCategoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
        const isBrandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
        const isPriceMatch = product.price <= priceRange;

        return isCategoryMatch && isBrandMatch && isPriceMatch;
    });

    renderProducts(filteredProducts);
}

// Sort products based on selected option
function sortProducts() {
    const sortOption = document.getElementById('sort').value;

    const sortedProducts = [...products];

    if (sortOption === 'price-low-high') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'popularity') {
        sortedProducts.sort((a, b) => b.popularity - a.popularity); // Assuming products have a 'popularity' field
    }

    renderProducts(sortedProducts);
}

// View product details
function viewDetails(productId) {
    window.location.href = `productDetail.html?id=${productId}`;
}

// Event listeners for filters
const categoryDropdown = document.getElementById('categories');
const brandDropdown = document.getElementById('brands');
const priceRange = document.getElementById('price-range');
const sortDropdown = document.getElementById('sort');

if (categoryDropdown) categoryDropdown.addEventListener('change', filterProducts);
if (brandDropdown) brandDropdown.addEventListener('change', filterProducts);
if (priceRange) priceRange.addEventListener('input', filterProducts);
if (sortDropdown) sortDropdown.addEventListener('change', sortProducts);

// -------------------- Product Detail Functions --------------------

// To fetch and render product details
function fetchProductDetails() {
    const productId = getProductIdFromUrl();
    const product = products.find((p) => p.id === parseInt(productId));

    if (product) {
        renderProductDetails(product);
    } else {
        console.error('Product not found');
    }
}

// To get the product ID from the URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// To render product details dynamically on the page
function renderProductDetails(product) {
    document.querySelector('#main-image').src = product.gallery[0];
    document.querySelector('.product-info h1').textContent = product.name;
    document.querySelector('.product-info .price').textContent = `$${product.price}`;
    document.querySelector('.product-info .availability span').textContent = product.availability;
    document.querySelector('.product-info .description').textContent = product.description;

    const thumbnailsContainer = document.querySelector('.gallery-thumbnails');
    thumbnailsContainer.innerHTML = ''; // Clear existing thumbnails

    product.gallery.forEach((image) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = product.name;
        thumbnail.onclick = () => {
            document.querySelector('#main-image').src = image;
        };
        thumbnailsContainer.appendChild(thumbnail);
    });
}
