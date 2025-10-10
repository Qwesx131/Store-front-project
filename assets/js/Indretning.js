document.addEventListener('DOMContentLoaded', () => {
    fetch('https://dummyjson.com/products/category/home-decoration')
        .then(response => response.json())
        .then(data => {
            const productDisplay = document.getElementById('productDisplay');
            
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            container.style.gap = '2rem';
            container.style.padding = '2rem';
            container.style.flexWrap = 'wrap';
            
            data.products.slice(0, 3).forEach(product => {
                const card = document.createElement('div');
                card.innerHTML = `
                    <img src="${product.thumbnail}" 
                         alt="${product.title}"
                         style="width: 300px; height: 300px; object-fit: cover; border-radius: 8px;">
                    <h3 style="margin: 1rem 0; color: #333;">${product.title}</h3>
                    <p style="color: #666; margin-bottom: 1rem;">${product.description}</p>
                    <p style="font-size: 1.25rem; color: #2c3e50; font-weight: bold;">$${product.price}</p>
                    <p style="color: #e67e22;">Rating: ${product.rating}⭐</p>
                `;
                
                card.style.width = '300px';
                card.style.padding = '1rem';
                card.style.backgroundColor = '#fff';
                card.style.borderRadius = '12px';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                card.style.transition = 'transform 0.3s ease';
                card.style.textAlign = 'center';
                
                card.onmouseover = () => card.style.transform = 'translateY(-10px)';
                card.onmouseout = () => card.style.transform = 'translateY(0)';
                
                container.appendChild(card);
            });
            
            productDisplay.appendChild(container);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('productDisplay').innerHTML = 
                '<p style="color: red; text-align: center; padding: 2rem;">Failed to load decoration products</p>';
        });
});