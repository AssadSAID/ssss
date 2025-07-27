const data = {
    cars: [
        { id: "car1", name: "Rexton Phase 1", description: "Voiture compacte et économique", image: "RextonPhase1.jpg", price: 78 },
        { id: "car2", name: "Grand Starex", description: "Minibus confortable et climatisé, parfait pour les groupes ou les familles nombreuses, avec une grande capacité de bagages et un intérieur spacieux pour des trajets en toute tranquillité.", image: "GrandStarex.jpg", price: 100 },
        { id: "car3", name: "Rexton W RX7", description: "SUV spacieux et robuste, idéal pour les familles ou les longs trajets touristiques, alliant confort, puissance et sécurité sur tous types de routes.", image: "rexton_W.jpg", price: 90 }
    ],
    trips: [
        { id: "trip1", name: "Dakar - Saly", price: 15000 },
        { id: "trip2", name: "Dakar - Saint-Louis", price: 20000 },
        { id: "trip3", name: "Dakar - Mbour", price: 12000 }
    ],
    pickups: [
        { id: "pickup1", name: "Aéroport de Dakar", price: 2000 },
        { id: "pickup2", name: "Centre-ville Dakar", price: 1000 },
        { id: "pickup3", name: "Hôtel Radisson", price: 1500 }
    ]
};

function loadCars() {
    const carsList = document.getElementById('cars-list');
    if (carsList) {
        carsList.innerHTML = data.cars.map(car => `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="${car.image}" alt="${car.name}" class="w-full h-48 object-cover cursor-pointer" onclick="openModal('${car.image}', '${car.name}')">
                <div class="p-4">
                    <h3 class="text-xl font-semibold">${car.name}</h3>
                    <p class="text-gray-600">${car.description}</p>
                    <p class="text-gray-600">Prix par jour incluant chauffeur, entretien et assurance; Carburant non inclus : ${car.price} Euro</p>
                </div>
            </div>
        `).join('');
    }
}

function openModal(imageSrc, carName) {
    const modal = document.createElement('div');
    modal.id = 'carModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-4 max-w-3xl w-full">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold">${carName}</h3>
                <button onclick="closeModal()" class="text-gray-600 hover:text-gray-800">&times;</button>
            </div>
            <img src="${imageSrc}" alt="${carName}" class="w-full h-auto max-h-[80vh] object-contain">
        </div>
    `;
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.getElementById('carModal');
    if (modal) {
        modal.remove();
    }
}

function loadTrips() {
    const tripsList = document.getElementById('trips-list');
    if (tripsList) {
        tripsList.innerHTML = data.trips.map(trip => `
            <div class="bg-white rounded-lg shadow-lg p-4">
                <h3 class="text-xl font-semibold">${trip.name}</h3>
                <p class="text-gray-600">Prix : ${trip.price} FCFA</p>
            </div>
        `).join('');
    }
}

function loadPickups() {
    const pickupList = document.getElementById('pickup-list');
    if (pickupList) {
        pickupList.innerHTML = data.pickups.map(pickup => `
            <div class="bg-white rounded-lg shadow-lg p-4">
                <h3 class="text-xl font-semibold">${pickup.name}</h3>
                <p class="text-gray-600">Frais : ${pickup.price} FCFA</p>
            </div>
        `).join('');
    }
}

function loadBookingOptions() {
    const carSelect = document.getElementById('car');
    const tripSelect = document.getElementById('trip');
    const pickupSelect = document.getElementById('pickup');

    if (carSelect) {
        carSelect.innerHTML = '<option value="">Sélectionnez une voiture</option>' + 
            data.cars.map(car => `<option value="${car.id}" data-price="${car.price}">${car.name}</option>`).join('');
    }
    if (tripSelect) {
        tripSelect.innerHTML = '<option value="">Sélectionnez un trajet</option>' + 
            data.trips.map(trip => `<option value="${trip.id}" data-price="${trip.price}">${trip.name}</option>`).join('');
    }
    if (pickupSelect) {
        pickupSelect.innerHTML = '<option value="">Sélectionnez un point</option>' + 
            data.pickups.map(pickup => `<option value="${pickup.id}" data-price="${pickup.price}">${pickup.name}</option>`).join('');
    }

    [carSelect, tripSelect, pickupSelect].forEach(select => {
        if (select) {
            select.addEventListener('change', calculateTotalPrice);
        }
    });
}

function calculateTotalPrice() {
    const carSelect = document.getElementById('car');
    const tripSelect = document.getElementById('trip');
    const pickupSelect = document.getElementById('pickup');
    const totalPriceElement = document.getElementById('total-price');

    let total = 0;
    if (carSelect && carSelect.value) total += parseInt(carSelect.options[carSelect.selectedIndex].dataset.price);
    if (tripSelect && tripSelect.value) total += parseInt(tripSelect.options[tripSelect.selectedIndex].dataset.price);
    if (pickupSelect && pickupSelect.value) total += parseInt(pickupSelect.options[pickupSelect.selectedIndex].dataset.price);

    if (totalPriceElement) {
        totalPriceElement.textContent = `${total} FCFA`;
    }
}

function submitContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if (name && email && message) {
        alert('Message envoyé avec succès !');
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}

function initiatePayment() {
    const carSelect = document.getElementById('car');
    const tripSelect = document.getElementById('trip');
    const pickupSelect = document.getElementById('pickup');
    const date = document.getElementById('date').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const totalPrice = document.getElementById('total-price').textContent;

    if (carSelect.value && tripSelect.value && pickupSelect.value && date && name && email && phone) {
        const paymentData = {
            invoice: {
                total_amount: parseInt(totalPrice),
                description: `Réservation: ${carSelect.options[carSelect.selectedIndex].text} - ${tripSelect.options[tripSelect.selectedIndex].text} - ${pickupSelect.options[pickupSelect.selectedIndex].text}`
            },
            store: {
                name: "Explorez le Monde",
                website_url: window.location.origin
            },
            customer: {
                name: name,
                email: email,
                phone: phone
            },
            actions: {
                return_url: `${window.location.origin}/booking.html`,
                cancel_url: `${window.location.origin}/booking.html`
            }
        };

        console.log('Envoi à PayDunya:', paymentData);
        alert('Redirection vers PayDunya pour le paiement...');
        sendConfirmationEmail(email, paymentData);
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}

function sendConfirmationEmail(email, paymentData) {
    console.log(`Envoi de confirmation à ${email}:`, paymentData);
    alert(`Confirmation envoyée à ${email}`);
}

document.addEventListener('DOMContentLoaded', () => {
    loadCars();
    loadTrips();
    loadPickups();
    loadBookingOptions();
});