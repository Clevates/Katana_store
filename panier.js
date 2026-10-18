let cart = JSON.parse(localStorage.getItem('katana_cart')) || [];

function renderCart() {
    const container = document.getElementById('cart-container');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total-price');
    
    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p class='text-xl text-gray-400 text-center py-10'>Votre panier est actuellement vide.</p>";
        subtotalElement.innerText = "0 €";
        totalElement.innerText = "0 €";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;
        const imgSrc = item.img ? item.img : 'https://via.placeholder.com/150/000000/FFFFFF/?text=Katana';
        
        container.innerHTML += `
            <div class="flex items-center gap-6 bg-gray-700 p-4 rounded-xl">
                <img src="${imgSrc}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg shadow">
                <div class="flex-grow">
                    <h3 class="text-xl font-bold">${item.name}</h3>
                    <p class="text-red-400 font-black text-lg mt-1">${item.price} €</p>
                </div>
                <button onclick="removeFromCart(${index})" class="text-gray-400 hover:text-red-500 font-bold p-2 text-2xl transition" title="Supprimer l'article">&times;</button>
            </div>
        `;
    });

    subtotalElement.innerText = `${total} €`;
    totalElement.innerText = `${total} €`;
}

function removeFromCart(index) {
    cart.splice(index, 1); 
    localStorage.setItem('katana_cart', JSON.stringify(cart));
    renderCart(); 
}

function checkout() {
    if(cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }
    alert("Redirection vers la passerelle de paiement sécurisée... (Simulation)");
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});