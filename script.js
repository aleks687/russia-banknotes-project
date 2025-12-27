// Меню для мобильных устройств
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами
    document.querySelectorAll('.stat-card, .banknote-card, .city-item').forEach(el => {
        observer.observe(el);
    });
    
    // Плавный скролл для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Интерактивные точки на карте
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const cityName = this.getAttribute('title');
            alert(`Город: ${cityName}\nНажмите "Коллекция" в меню для подробной информации!`);
        });
    });
    
    // Анимация чисел в статистике
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-card h3');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 30);
        });
    }
    
    // Запуск анимации статистики при попадании в область видимости
    const statsSection = document.querySelector('.stats');
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
            statsObserver.unobserve(statsSection);
        }
    }, { threshold: 0.5 });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Добавление класса для анимации
    document.querySelectorAll('.banknote-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Функция для викторины (будет в quiz.html)
function checkAnswer(questionNumber, selectedAnswer, correctAnswer) {
    const resultElement = document.getElementById(`result-${questionNumber}`);
    if (selectedAnswer === correctAnswer) {
        resultElement.innerHTML = '<span style="color: green;">✓ Правильно!</span>';
        resultElement.style.color = 'green';
        return 1;
    } else {
        resultElement.innerHTML = `<span style="color: red;">✗ Неправильно. Правильный ответ: ${correctAnswer}</span>`;
        resultElement.style.color = 'red';
        return 0;
    }
}