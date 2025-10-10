async function searchBar() {
    const searchInput = document.getElementById('search');
    const productDisplay = document.getElementById('productDisplay');
    let originalContent = productDisplay.innerHTML; // Store original content

    searchInput.addEventListener('input', async (event) => {
        const query = event.target.value.trim();
        
        // Return to original content if search is empty
        if (query.length === 0) {
            productDisplay.innerHTML = originalContent;
            return;
        }

        if (query.length < 3) {
            return;
        }

        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
            const data = await response.json();
            displaySearchResults(data.products);
        } catch (error) {
            console.error('Error:', error);
            productDisplay.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <p>Error loading results</p>
                    <button onclick="resetSearch()">Reset Search</button>
                </div>`;
        }
    });
}

function displaySearchResults(products) {
    const productDisplay = document.getElementById('productDisplay');
    
    if (products.length === 0) {
        productDisplay.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p>No products found</p>
                <button onclick="resetSearch()">Reset Search</button>
            </div>`;
        return;
    }

    const resultsContainer = document.createElement('div');
    resultsContainer.style.display = 'flex';
    resultsContainer.style.flexWrap = 'wrap';
    resultsContainer.style.gap = '20px';
    resultsContainer.style.padding = '20px';

    products.forEach(product => {
        const card = document.createElement('div');
        card.style.border = '1px solid #ddd';
        card.style.padding = '15px';
        card.style.borderRadius = '8px';
        card.style.width = '250px';
        
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" 
                 style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px;">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;
        resultsContainer.appendChild(card);
    });

    productDisplay.innerHTML = '';
    productDisplay.appendChild(resultsContainer);
}

function resetSearch() {
    const searchInput = document.getElementById('search');
    searchInput.value = '';
    productDisplay.innerHTML = originalContent;
}

let originalContent;

document.addEventListener('DOMContentLoaded', () => {
    originalContent = document.getElementById('productDisplay').innerHTML;
    searchBar();
});