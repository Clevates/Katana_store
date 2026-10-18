if (!localStorage.getItem('admin_credentials')) {
    localStorage.setItem('admin_credentials', JSON.stringify({ user: 'admin', pass: '1234' }));
}

function login() {
    const user = document.getElementById('admin-user').value;
    const pass = document.getElementById('admin-pass').value;
    const creds = JSON.parse(localStorage.getItem('admin_credentials'));

    if (user === creds.user && pass === creds.pass) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('dashboard-section').classList.remove('hidden');
        renderAdminProducts();
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
}

function logout() {
    document.getElementById('dashboard-section').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('admin-pass').value = '';
}

let currentImageBase64 = "";

document.getElementById('prod-img').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            currentImageBase64 = event.target.result;
            const preview = document.getElementById('img-preview');
            preview.src = currentImageBase64;
            preview.classList.remove('hidden');
        };
        reader.readAsDataURL(file); 
    }
});

let adminProducts = JSON.parse(localStorage.getItem('admin_products')) || [];

function addProduct(e) {
    e.preventDefault();
    
    const newProduct = {
        id: Date.now(), 
        name: document.getElementById('prod-name').value,
        price: parseFloat(document.getElementById('prod-price').value),
        category: document.getElementById('prod-category').value,
        desc: document.getElementById('prod-desc').value,
        img: currentImageBase64
    };

    adminProducts.push(newProduct);
    localStorage.setItem('admin_products', JSON.stringify(adminProducts));
    
    document.getElementById('add-product-form').reset();
    document.getElementById('img-preview').classList.add('hidden');
    currentImageBase64 = "";
    
    renderAdminProducts();
    alert("Article ajouté avec succès ! Il est visible sur la page d'accueil.");
}

function deleteProduct(id) {
    adminProducts = adminProducts.filter(p => p.id !== id);
    localStorage.setItem('admin_products', JSON.stringify(adminProducts));
    renderAdminProducts();
}

function renderAdminProducts() {
    const container = document.getElementById('admin-product-list');
    container.innerHTML = "";

    if (adminProducts.length === 0) {
        container.innerHTML = "<p class='text-gray-400'>Aucun article ajouté par l'admin.</p>";
        return;
    }

    adminProducts.forEach(product => {
        container.innerHTML += `
            <div class="bg-gray-800 p-4 rounded-xl border border-gray-600 flex items-center gap-4">
                <img src="${product.img}" class="w-20 h-20 object-cover rounded">
                <div class="flex-grow">
                    <h4 class="font-bold text-lg">${product.name}</h4>
                    <p class="text-sm text-gray-400">${product.price} €</p>
                </div>
                <button onclick="deleteProduct(${product.id})" class="bg-red-500 text-white p-2 rounded hover:bg-red-700">X</button>
            </div>
        `;
    });
}