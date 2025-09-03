// Elementos DOM
const searchButton = document.querySelector('.search-button');
const inputGroups = document.querySelectorAll('.input-group input');
const header = document.querySelector('.header');

// Elementos DOM adicionales
const searchTabs = document.querySelectorAll('.search-tab');
const chatButton = document.querySelector('.chat-button');
const chatPopup = document.querySelector('.chat-popup');
const chatClose = document.querySelector('.chat-close');
const counterBtns = document.querySelectorAll('.counter-btn');
const dropdownItems = document.querySelectorAll('.dropdown-item');

// Mejora de la animación del header al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mejora del efecto de focus en los inputs
inputGroups.forEach(input => {
    const inputGroup = input.parentElement;
    
    input.addEventListener('focus', () => {
        inputGroup.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        inputGroup.classList.remove('focused');
    });
});

// Funcionalidad de las pestañas de búsqueda
if (searchTabs) {
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover clase active de todas las pestañas
            searchTabs.forEach(t => t.classList.remove('active'));
            // Añadir clase active a la pestaña clickeada
            tab.classList.add('active');
        });
    });
}

// Funcionalidad para los elementos del dropdown
if (dropdownItems) {
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            const value = this.textContent.trim();
            const input = this.closest('.input-group').querySelector('input');
            input.value = value;
            this.closest('.dropdown-content').classList.remove('show');
        });
    });
}

// Funcionalidad para los botones de contador
if (counterBtns) {
    counterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const countElement = this.parentElement.querySelector('.guest-count');
            let count = parseInt(countElement.textContent);
            
            if (this.classList.contains('decrease') && count > 1) {
                count--;
            } else if (this.classList.contains('increase')) {
                count++;
            }
            
            countElement.textContent = count;
        });
    });
}

// Funcionalidad del chat
if (chatButton && chatPopup) {
    chatButton.addEventListener('click', () => {
        chatPopup.classList.toggle('active');
    });
    
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatPopup.classList.remove('active');
        });
    }
    
    // Simulación de mensajes en el chat
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input button');
    
    if (chatSendBtn && chatInput && chatMessages) {
        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Añadir mensaje del usuario
                addMessage('user', message);
                chatInput.value = '';
                
                // Simular respuesta después de un breve retraso
                setTimeout(() => {
                    addMessage('bot', '¡Gracias por tu mensaje! Un agente se pondrá en contacto contigo pronto.');
                }, 1000);
            }
        }
        
        function addMessage(type, text) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}-message`;
            messageDiv.innerHTML = `<p>${text}</p>`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Mensaje de bienvenida
        setTimeout(() => {
            addMessage('bot', '¡Hola! ¿En qué podemos ayudarte hoy?');
        }, 1000);
    }
}

// Mejora de la simulación de búsqueda
searchButton.addEventListener('click', () => {
    const loadingText = 'Buscando...';
    const originalText = searchButton.textContent;
    
    searchButton.disabled = true;
    searchButton.textContent = loadingText;
    searchButton.classList.add('loading');
    
    // Simulamos una búsqueda con resultados más interactivos
    setTimeout(() => {
        searchButton.disabled = false;
        searchButton.textContent = originalText;
        searchButton.classList.remove('loading');
        
        // Crear un modal de resultados
        const resultsModal = document.createElement('div');
        resultsModal.className = 'results-modal';
        resultsModal.innerHTML = `
            <div class="results-content">
                <div class="results-header">
                    <h3>Resultados de búsqueda</h3>
                    <button class="close-results">&times;</button>
                </div>
                <div class="results-body">
                    <p>Hemos encontrado 15 opciones que coinciden con tu búsqueda.</p>
                    <div class="loading-animation">
                        <div class="spinner"></div>
                        <p>Cargando resultados...</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(resultsModal);
        
        // Cerrar el modal al hacer clic en el botón de cerrar
        const closeBtn = resultsModal.querySelector('.close-results');
        closeBtn.addEventListener('click', () => {
            resultsModal.remove();
        });
        
        // Simular carga de resultados
        setTimeout(() => {
            const resultsBody = resultsModal.querySelector('.results-body');
            resultsBody.innerHTML = `
                <p>Hemos encontrado 15 opciones que coinciden con tu búsqueda.</p>
                <p>Esta es una simulación. En una aplicación real, aquí verías los resultados de tu búsqueda.</p>
                <button class="btn-primary view-all-results">Ver todos los resultados</button>
            `;
            
            const viewAllBtn = resultsBody.querySelector('.view-all-results');
            viewAllBtn.addEventListener('click', () => {
                resultsModal.remove();
                alert('Esta funcionalidad estará disponible próximamente.');
            });
        }, 2000);
    }, 2000);
});

// Animaciones para las cards de destinos
function animateDestinationCards() {
    const cards = document.querySelectorAll('.destination-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Inicialización mejorada de la página
document.addEventListener('DOMContentLoaded', () => {
    // Añadir clase para animación de entrada
    document.body.classList.add('loaded');
    
    // Activar la primera pestaña por defecto
    if (searchTabs && searchTabs.length > 0) {
        searchTabs[0].classList.add('active');
    }
    
    // Inicializar animaciones para las cards
    animateDestinationCards();
    
    // Añadir estilos CSS adicionales para animaciones
    const style = document.createElement('style');
    style.textContent = `
        .results-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .results-content {
            background-color: white;
            border-radius: 16px;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        }
        
        .results-header {
            padding: 1rem;
            border-bottom: 1px solid #eaeaea;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .results-body {
            padding: 2rem;
        }
        
        .close-results {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        .loading-animation {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 2rem 0;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #1B4F72;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .message {
            margin-bottom: 1rem;
            padding: 0.8rem;
            border-radius: 8px;
            max-width: 80%;
        }
        
        .user-message {
            background-color: #1B4F72;
            color: white;
            align-self: flex-end;
            margin-left: auto;
        }
        
        .bot-message {
            background-color: #f1f1f1;
            color: #333;
            align-self: flex-start;
        }
        
        .chat-messages {
            display: flex;
            flex-direction: column;
        }
        
        .destination-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .destination-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    document.head.appendChild(style);
});

// Funcionalidad del chat
if (chatButton) {
    const chatContainer = document.querySelector('.chat-container');
    const closeChat = document.querySelector('.close-chat');
    
    chatButton.addEventListener('click', () => {
        chatContainer.classList.toggle('active');
    });
    
    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatContainer.classList.remove('active');
        });
    }
    
    // Simulación de mensajes en el chat
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.send-message');
    
    if (chatSendBtn && chatInput && chatMessages) {
        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Añadir mensaje del usuario
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message user-message';
                messageDiv.textContent = message;
                chatMessages.appendChild(messageDiv);
                chatInput.value = '';
                
                // Simular respuesta después de un breve retraso
                setTimeout(() => {
                    const botDiv = document.createElement('div');
                    botDiv.className = 'message bot';
                    botDiv.textContent = '¡Gracias por tu mensaje! Un agente se pondrá en contacto contigo pronto.';
                    chatMessages.appendChild(botDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }
    }
}

// Añadir funcionalidad al botón de cerrar del banner promocional
document.addEventListener('DOMContentLoaded', function() {
    const closeBanner = document.querySelector('.close-banner');
    const promoBanner = document.querySelector('.promo-banner');

    if (closeBanner && promoBanner) {
        closeBanner.addEventListener('click', () => {
            promoBanner.style.display = 'none';
        });
    }
    
    // Añadir botón de cierre al banner promocional si no existe
    if (promoBanner && !closeBanner) {
        const closeButton = document.createElement('button');
        closeButton.className = 'close-banner';
        closeButton.innerHTML = '&times;';
        promoBanner.appendChild(closeButton);
        
        closeButton.addEventListener('click', () => {
            promoBanner.style.display = 'none';
        });
    }
});