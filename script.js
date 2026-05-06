// ===== DADOS DOS PETS COM IMAGENS REAIS =====
const pets = [
    {
        id: 1,
        name: 'Max',
        type: 'dog',
        breed: 'Golden Retriever',
        age: '2 anos',
        location: 'Curitiba, PR',
        image: 'images/pet-dog-golden-1.png',
        description: 'Max é um Golden Retriever amigável e energético que adora brincar e fazer novos amigos. Perfeito para famílias ativas!'
    },
    {
        id: 2,
        name: 'Luna',
        type: 'cat',
        breed: 'Gato Laranja',
        age: '1 ano',
        location: 'Londrina, PR',
        image: 'images/pet-cat-orange-1.png',
        description: 'Luna é uma gata carinhosa e brincalhona. Adora receber atenção e é ótima companhia para apartamentos.'
    },
    {
        id: 3,
        name: 'Rex',
        type: 'dog',
        breed: 'Labrador',
        age: '3 anos',
        location: 'Maringá, PR',
        image: 'images/pet-dog-black-1.png',
        description: 'Rex é um Labrador leal e protetor. Excelente cão de família que adora estar perto de crianças.'
    },
    {
        id: 4,
        name: 'Coelho',
        type: 'rabbit',
        breed: 'Coelho Branco',
        age: '1 ano',
        location: 'Ponta Grossa, PR',
        image: 'images/pet-rabbit-white-1.png',
        description: 'Coelho é dócil e calmo. Perfeito para quem procura um pet tranquilo e fácil de cuidar.'
    },
    {
        id: 5,
        name: 'Miau',
        type: 'cat',
        breed: 'Gato Branco',
        age: '2 anos',
        location: 'Cascavel, PR',
        image: 'images/pet-cat-white-1.png',
        description: 'Miau é um gato elegante e independente. Gosta de espaço próprio mas também aprecia carinho.'
    },
    {
        id: 6,
        name: 'Bidu',
        type: 'dog',
        breed: 'Cocker Spaniel',
        age: '1 ano',
        location: 'Foz do Iguaçu, PR',
        image: 'images/pet-dog-small-1.png',
        description: 'Bidu é um Cocker Spaniel fofo e afetuoso. Adora passear e é muito obediente.'
    },
    {
        id: 7,
        name: 'Piu',
        type: 'bird',
        breed: 'Periquito',
        age: '1 ano',
        location: 'Apucarana, PR',
        image: 'images/pet-bird-colorful-1.png',
        description: 'Piu é um periquito colorido e cantador. Traz alegria e movimento para qualquer casa.'
    },
    {
        id: 8,
        name: 'Totó',
        type: 'dog',
        breed: 'Vira-lata',
        age: '2 anos',
        location: 'Paranaguá, PR',
        image: 'images/pet-dog-brown-1.png',
        description: 'Totó é um vira-lata dócil e grato. Merece uma segunda chance e muito amor.'
    }
];

// ===== DADOS DE DEPOIMENTOS =====
const testimonials = [
    {
        text: 'O PetMatch me ajudou a encontrar meu melhor amigo! Max é perfeito para minha família.',
        author: 'Maria Silva',
        role: 'Adotante'
    },
    {
        text: 'Adorei a plataforma. Encontrei exatamente o que procurava!',
        author: 'João Santos',
        role: 'Adotante'
    },
    {
        text: 'PetMatch nos ajudou a colocar mais de 50 animais em lares amorosos.',
        author: 'Organização XYZ',
        role: 'Abrigo de Animais'
    }
];

// ===== ESTADO DA APLICAÇÃO =====
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentCarouselIndex = 0;
let currentTestimonialIndex = 0;
let filteredPets = [...pets];
let isSignupMode = false;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    renderPets();
    updateUserUI();
    setupCarousel();
    setupTestimonials();
    console.log('🐾 PetMatch iniciado com sucesso!');
    console.log('Total de pets disponíveis:', pets.length);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Login Modal
    document.getElementById('loginBtn').addEventListener('click', openLoginModal);
    document.getElementById('closeLoginModal').addEventListener('click', closeLoginModal);
    document.getElementById('submitLoginBtn').addEventListener('click', handleSubmit);
    document.getElementById('signupLink').addEventListener('click', toggleSignupMode);

    // Pet Modal
    document.getElementById('closePetModal').addEventListener('click', closePetModal);

    // Navegação
    document.querySelectorAll('[onclick*="navigateToPage"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const page = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            navigateToPage(page);
        });
    });

    // Filtros de Pets
    document.getElementById('searchInput').addEventListener('input', filterPets);
    document.getElementById('filterType').addEventListener('change', filterPets);

    // Carousel
    document.getElementById('prevSlide').addEventListener('click', prevSlide);
    document.getElementById('nextSlide').addEventListener('click', nextSlide);

    // Testimonials
    document.querySelectorAll('.indicator').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentTestimonialIndex = parseInt(e.target.dataset.index);
            updateTestimonial();
        });
    });

    // Fechar modal ao clicar no backdrop
    document.getElementById('loginModal').addEventListener('click', (e) => {
        if (e.target.id === 'loginModal') closeLoginModal();
    });

    document.getElementById('petModal').addEventListener('click', (e) => {
        if (e.target.id === 'petModal') closePetModal();
    });

    // Enter para enviar formulário
    document.getElementById('password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSubmit();
    });
}

// ===== AUTENTICAÇÃO =====
function openLoginModal() {
    isSignupMode = false;
    updateModalUI();
    document.getElementById('loginModal').classList.add('active');
    document.getElementById('email').focus();
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
    resetLoginForm();
}

function toggleSignupMode() {
    isSignupMode = !isSignupMode;
    updateModalUI();
    document.getElementById('email').focus();
}

function updateModalUI() {
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitLoginBtn');
    const nameGroup = document.getElementById('nameGroup');
    const signupLink = document.getElementById('signupLink');

    if (isSignupMode) {
        modalTitle.textContent = 'Cadastre-se';
        submitBtn.textContent = 'Criar Conta';
        nameGroup.style.display = 'block';
        signupLink.textContent = 'Voltar ao Login';
    } else {
        modalTitle.textContent = 'Entrar';
        submitBtn.textContent = 'Entrar';
        nameGroup.style.display = 'none';
        signupLink.textContent = 'Cadastre-se';
    }
}

function handleSubmit() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const name = document.getElementById('name').value.trim();
    const userType = document.querySelector('input[name="userType"]:checked').value;

    if (!email || !password) {
        showAlert('Por favor, preencha todos os campos!', 'error');
        return;
    }

    if (isSignupMode && !name) {
        showAlert('Por favor, preencha seu nome!', 'error');
        return;
    }

    if (password.length < 6) {
        showAlert('A senha deve ter pelo menos 6 caracteres!', 'error');
        return;
    }

    const user = {
        email,
        name: isSignupMode ? name : email.split('@')[0],
        userType,
        loginTime: new Date().toISOString(),
        isNewUser: isSignupMode
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUser = user;
    updateUserUI();
    closeLoginModal();

    const message = isSignupMode 
        ? `Bem-vindo ao PetMatch, ${user.name}! Sua conta foi criada com sucesso.`
        : `Bem-vindo de volta, ${user.name}!`;
    
    showAlert(message, 'success');
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateUserUI();
    showAlert('Você foi desconectado com sucesso!', 'success');
}

function updateUserUI() {
    const loginBtn = document.getElementById('loginBtn');
    if (currentUser) {
        loginBtn.textContent = `${currentUser.name} (Sair)`;
        loginBtn.onclick = logout;
        loginBtn.style.backgroundColor = '#2BA84A';
    } else {
        loginBtn.textContent = 'Entrar';
        loginBtn.onclick = openLoginModal;
        loginBtn.style.backgroundColor = '#0066CC';
    }
}

function resetLoginForm() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('name').value = '';
    document.querySelector('input[name="userType"]').checked = true;
}

// ===== NOTIFICAÇÕES =====
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#2BA84A' : type === 'error' ? '#EF4444' : '#0066CC'};
        color: white;
        border-radius: 0.5rem;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// ===== NAVEGAÇÃO =====
function navigateToPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const page = document.getElementById(pageName + 'Page');
    if (page) {
        page.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// ===== RENDERIZAR PETS =====
function renderPets(petsToRender = pets) {
    const petsGrid = document.getElementById('petsGrid');
    petsGrid.innerHTML = '';

    if (petsToRender.length === 0) {
        petsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #999;">Nenhum pet encontrado com esses critérios.</p>';
        return;
    }

    petsToRender.forEach(pet => {
        const petCard = createPetCard(pet);
        petsGrid.appendChild(petCard);
    });
}

function createPetCard(pet) {
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}" class="pet-card-image">
        <div class="pet-card-content">
            <h3 class="pet-card-name">${pet.name}</h3>
            <p class="pet-card-info"><strong>Raça:</strong> ${pet.breed}</p>
            <p class="pet-card-info"><strong>Idade:</strong> ${pet.age}</p>
            <p class="pet-card-info"><strong>Local:</strong> ${pet.location}</p>
        </div>
    `;

    card.addEventListener('click', () => openPetModal(pet));
    return card;
}

// ===== MODAL DE DETALHES DO PET =====
function openPetModal(pet) {
    document.getElementById('petImage').src = pet.image;
    document.getElementById('petName').textContent = pet.name;
    document.getElementById('petDescription').textContent = pet.description;
    document.getElementById('petType').textContent = 
        pet.type === 'dog' ? 'Cão' : 
        pet.type === 'cat' ? 'Gato' : 
        pet.type === 'rabbit' ? 'Coelho' : 'Pássaro';
    document.getElementById('petBreed').textContent = pet.breed;
    document.getElementById('petAge').textContent = pet.age;
    document.getElementById('petLocation').textContent = pet.location;

    document.getElementById('adoptBtn').onclick = () => {
        if (!currentUser) {
            showAlert('Você precisa estar logado para adotar!', 'error');
            closePetModal();
            setTimeout(openLoginModal, 500);
            return;
        }
        showAlert(`🎉 Parabéns! Você iniciou o processo de adoção de ${pet.name}!`, 'success');
        closePetModal();
    };

    document.getElementById('petModal').classList.add('active');
}

function closePetModal() {
    document.getElementById('petModal').classList.remove('active');
}

// ===== FILTROS =====
function filterPets() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter = document.getElementById('filterType').value;

    filteredPets = pets.filter(pet => {
        const matchesSearch = 
            pet.name.toLowerCase().includes(searchTerm) ||
            pet.breed.toLowerCase().includes(searchTerm) ||
            pet.location.toLowerCase().includes(searchTerm);

        const matchesType = !typeFilter || pet.type === typeFilter;

        return matchesSearch && matchesType;
    });

    renderPets(filteredPets);
}

// ===== CAROUSEL =====
function setupCarousel() {
    showCarouselSlide(currentCarouselIndex);
}

function showCarouselSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    currentCarouselIndex = (index + slides.length) % slides.length;

    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentCarouselIndex].classList.add('active');
}

function prevSlide() {
    showCarouselSlide(currentCarouselIndex - 1);
}

function nextSlide() {
    showCarouselSlide(currentCarouselIndex + 1);
}

// Auto-advance carousel
setInterval(() => {
    nextSlide();
}, 6000);

// ===== TESTIMONIALS =====
function setupTestimonials() {
    updateTestimonial();
}

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonialIndex];
    document.getElementById('testimonialText').textContent = `"${testimonial.text}"`;
    document.getElementById('testimonialAuthor').textContent = `${testimonial.author} - ${testimonial.role}`;

    document.querySelectorAll('.indicator').forEach((btn, idx) => {
        btn.classList.toggle('active', idx === currentTestimonialIndex);
    });
}
