const defaultProducts = [
    { id: 1, name: "Katana du Dragon", price: 399, desc: "Lame en acier forgé, finition artisanale.", category: "classique", img: "image/katananagoya.jpg" },
    { id: 2, name: "Katana de l'Ombre", price: 349, desc: "Fourreau noir mat, tsuba minimaliste.", category: "classique", img: "image/KatanaJin.webp" },
    { id: 3, name: "Katana Impérial", price: 499, desc: "Lame pliée, détails dorés authentiques.", category: "classique", img: "image/katanasenkei.jpg" },
    { id: 4, name: "Katana Hakina", price: 299, desc: "Lame décorative parfaite pour le cosplay.", category: "replique", img: "image/katanakoi.webp" },
    { id: 5, name: "Katana Ishin", price: 349, desc: "Idéal pour les expositions et passionnés.", category: "replique", img: "image/katana8.jpg" },
    { id: 6, name: "Katana Hoshin", price: 499, desc: "Édition spéciale, forgé par un maître artisan.", category: "limite", img: "image/katana7.webp" }
];

function getProducts() {
    const adminProducts = JSON.parse(localStorage.getItem('admin_products')) || [];
    return [...defaultProducts, ...adminProducts];
}

function renderProducts() {
    const grid = document.getElementById("katana-grid");
    if (!grid) return;
    
    grid.innerHTML = "";
    const products = getProducts();

    products.forEach(product => {
        let badgeColor = product.category === 'limite' ? 'bg-red-200 text-red-800' : (product.category === 'replique' ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-black');
        
        grid.innerHTML += `
        <div data-category="${product.category}" class="katana-card bg-white rounded-2xl border-2 border-black transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl overflow-hidden flex flex-col">
            <img src="${product.img}" alt="${product.name}" class="w-full h-64 object-cover border-b-2 border-black">
            <div class="p-6 flex-grow flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-2xl font-black">${product.name}</h3>
                        <span class="${badgeColor} text-xs font-bold px-2 py-1 rounded uppercase">${product.category}</span>
                    </div>
                    <p class="text-gray-600 font-medium mb-4">${product.desc}</p>
                </div>
                <div class="flex flex-col gap-4 mt-4">
                    <span class="text-2xl font-black">${product.price} €</span>
                    <button onclick="addToCart('${product.name}', ${product.price}, '${product.img}')" class="w-full bg-black text-white px-4 py-3 rounded-lg font-bold hover:bg-rose-600 transition duration-400">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>`;
    });
}

function filtreKatana(categorie) {
    const cards = document.querySelectorAll('.katana-card');
    cards.forEach(card => {
        if (categorie === 'tous' || card.getAttribute('data-category') === categorie) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

let cart = JSON.parse(localStorage.getItem('katana_cart')) || [];

function addToCart(name, price, img) {
    cart.push({ name: name, price: price, img: img });
    localStorage.setItem('katana_cart', JSON.stringify(cart));
    updateCartCounter();
    alert(`${name} a été ajouté à votre panier !`);
}

function updateCartCounter() {
    const counter = document.getElementById('cart-counter');
    if(counter) {
        counter.textContent = cart.length;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartCounter();

    const menuToggle = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("mobile-nav-menu");

    if (menuToggle && navMenu) {
        const setMenuOpen = (isOpen) => {
            navMenu.classList.toggle("hidden", !isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
        };

        menuToggle.addEventListener("click", () => {
            setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
        });

        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenuOpen(false));
        });
    }
});
    