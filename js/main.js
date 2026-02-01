//*********************************************************burger, overlay, scroll
    $(document).ready(function() {
    let hasScrolled = false;
    
    // Инициализация
    $('.heder__top').removeClass('heder__top-open');
    $('.overlay').removeClass('overlay--show');
    
    $('.burger, .overlay').on('click', function(e){
        e.preventDefault();
        
        const $headerTop = $('.heder__top');
        const $overlay = $('.overlay');
        const $burger = $('.burger');
        
        // Только одно переключение для каждого элемента!
        $headerTop.toggleClass('heder__top-open');
        $overlay.toggleClass('overlay--show');
        
        const isMenuOpen = $headerTop.hasClass('heder__top-open');
        
        if (isMenuOpen) {
            // Если открываем меню - убираем фон у бургера
            $burger.removeClass('burger--follow');
        } else {
            // Если закрываем меню - проверяем нужен ли фон
            if (hasScrolled && $(window).scrollTop() > 0) {
                $burger.addClass('burger--follow');
            } else {
                $burger.removeClass('burger--follow');
            }
        }
    });
    
    // Обработчик прокрутки
    $(window).on('scroll', function () {
        if (!hasScrolled) {
            hasScrolled = true;
        }
        
        // Если меню открыто - не меняем фон при скролле
        if ($('.heder__top').hasClass('heder__top-open')) {
            return;
        }
        
        if(hasScrolled && $(window).scrollTop() > 0) {
            $('.burger').addClass('burger--follow');
        } else {
            $('.burger').removeClass('burger--follow');
        }
    });
});
  // *************************************************** ФОРМА *********************************************
  // Устанавливаем минимальную дату - сегодняшний день
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date();
            const todayFormatted = today.toISOString().split('T')[0];
            document.getElementById('date').min = todayFormatted;
            
            // Устанавливаем дату на 7 дней вперед по умолчанию
            const defaultDate = new Date();
            defaultDate.setDate(today.getDate() + 7);
            const defaultDateFormatted = defaultDate.toISOString().split('T')[0];
            document.getElementById('date').value = defaultDateFormatted;
        });

        // Получаем элементы формы
        const form = document.getElementById('hikeForm');
        const submitBtn = document.getElementById('submitBtn');
        const participantsInput = document.getElementById('participants');

        // Функция для форматирования даты на русском
        function formatDateRussian(dateString) {
            const date = new Date(dateString);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            return date.toLocaleDateString('ru-RU', options);
        }

        // Обработчик изменения количества участников
        participantsInput.addEventListener('input', function() {
            if (this.value < 4) {
                this.setCustomValidity('Минимум 4 участника');
                submitBtn.classList.add('form__button--disabled');
            } else if (this.value > 20) {
                this.setCustomValidity('Максимум 20 участников');
                submitBtn.classList.add('form__button--disabled');
            } else {
                this.setCustomValidity('');
                submitBtn.classList.remove('form__button--disabled');
            }
        });

        // Обработчик отправки формы
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Получаем значения полей
            const locationSelect = document.getElementById('location');
            const locationText = locationSelect.options[locationSelect.selectedIndex].text;
            const dateValue = document.getElementById('date').value;
            const participantsValue = document.getElementById('participants').value;
            
            // Проверяем валидность формы
            if (!form.checkValidity()) {
                alert('Пожалуйста, заполните все поля правильно!');
                return;
            }
            
            // Форматируем дату
            const formattedDate = formatDateRussian(dateValue);
            
            // Формируем сообщение
            const message = 
                `✅ Ваша заявка принята!\n\n` +
                `📍 Локация: ${locationText}\n` +
                `📅 Дата похода: ${formattedDate}\n` +
                `👥 Количество участников: ${participantsValue}\n\n` +
                `Мы свяжемся с вами в течение 24 часов для подтверждения.`;
            
            // Показываем результат
            alert(message);
            
            // Здесь обычно отправка данных на сервер
            // form.submit(); // раскомментировать для реальной отправки
            
            // Очистка формы (опционально)
            // form.reset();
            // document.getElementById('participants').value = 4;
            // submitBtn.classList.remove('form__button--disabled');
        });

        // Дополнительная валидация при изменении полей
        form.querySelectorAll('.form__select, .form__input').forEach(function(field) {
            field.addEventListener('change', function() {
                if (form.checkValidity()) {
                    submitBtn.classList.remove('form__button--disabled');
                } else {
                    submitBtn.classList.add('form__button--disabled');
                }
            });
        });
        // *************************************** СЛАЙДЕР famos *************************************************
         document.addEventListener('DOMContentLoaded', function() {
            // Элементы
            const sliderContainer = document.querySelector('.famos__content');
            const slides = document.querySelectorAll('.famos__img');
            const arrowPrev = document.querySelector('.slider-arrow.prev');
            const arrowNext = document.querySelector('.slider-arrow.next');
            const dotsContainer = document.querySelector('.slider-dots');
            
            // Конфигурация
            const SLIDES_PER_VIEW = 3;
            let currentPosition = 0;
            const totalSlides = slides.length;
            
            // Рассчитываем ширину одного слайда
            function getSlideWidth() {
                if (slides[0]) {
                    const slideStyle = window.getComputedStyle(slides[0]);
                    const slideWidth = slides[0].offsetWidth;
                    const gap = parseInt(window.getComputedStyle(sliderContainer).gap) || 20;
                    return slideWidth + gap;
                }
                return 0;
            }
            
            // Создаем точки-индикаторы
            function createDots() {
                const totalDots = Math.max(1, totalSlides - SLIDES_PER_VIEW + 1);
                
                for (let i = 0; i < totalDots; i++) {
                    const dot = document.createElement('button');
                    dot.className = 'slider-dot';
                    if (i === 0) dot.classList.add('active');
                    
                    dot.addEventListener('click', () => {
                        goToSlide(i);
                    });
                    
                    dotsContainer.appendChild(dot);
                }
            }
            
            // Переход к определенному слайду
            function goToSlide(position) {
                // Проверяем границы
                if (position > totalSlides - SLIDES_PER_VIEW) {
                    currentPosition = 0; // Возвращаемся к началу
                } else if (position < 0) {
                    currentPosition = totalSlides - SLIDES_PER_VIEW; // Идем в конец
                } else {
                    currentPosition = position;
                }
                
                // Рассчитываем смещение
                const slideWidth = getSlideWidth();
                const translateX = currentPosition * slideWidth;
                
                // Применяем трансформацию
                sliderContainer.style.transform = `translateX(-${translateX}px)`;
                
                // Обновляем точки
                updateDots();
                
                // Лог для отладки
                console.log(`Текущая позиция: ${currentPosition}, Смещение: ${translateX}px`);
            }
            
            // Обновление точек-индикаторов
            function updateDots() {
                const dots = document.querySelectorAll('.slider-dot');
                const totalDots = dots.length;
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentPosition);
                });
            }
            
            // Следующие 3 слайда
            function nextSlide() {
                goToSlide(currentPosition + 1);
            }
            
            // Предыдущие 3 слайда
            function prevSlide() {
                goToSlide(currentPosition - 1);
            }
            
          
            // Инициализация
            function initSlider() {
                // Создаем точки
                createDots();
                
                // Назначаем обработчики стрелок
                arrowPrev.addEventListener('click', prevSlide);
                arrowNext.addEventListener('click', nextSlide);
                
                
                // Пересчет при изменении размера окна
                window.addEventListener('resize', () => {
                    goToSlide(currentPosition);
                });
                
                // Клавиатурная навигация
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') prevSlide();
                    if (e.key === 'ArrowRight') nextSlide();
                });
            }
            
            // Запускаем слайдер
            initSlider();
            
            // Для отладки
            console.log('Слайдер инициализирован');
            console.log(`Всего слайдов: ${totalSlides}, Показывается: ${SLIDES_PER_VIEW}`);
        });
        // ***************************************************************************************fancybox
        Fancybox.bind('[data-fancybox="gallery"]', {
  loop: true,              // Бесконечный цикл в галерее
  animationEffect: "zoom", // Эффект при открытии
  transitionEffect: "slide", // Эффект переключения
  thumbs: {
    autoStart: true       // Показывать миниатюры сразу
  },
  toolbar: "zoom|slideshow|thumbs|close" // Кнопки в панели
});
/*****************************************************слайдер шеринг ****************************** */

document.addEventListener('DOMContentLoaded', function() {
    function initMobileSlider() {
        // Только для мобильных
        if (window.innerWidth > 670) return;
        
        const sliderContainer = document.querySelector('.sharing__slider');
        const dotsContainer = document.querySelector('.sharing-dots');
        const originalImages = document.querySelectorAll('.sharing__content a[data-fancybox]');
        
        if (!sliderContainer || !dotsContainer || originalImages.length === 0) return;
        
        // Очищаем и создаем слайды
        sliderContainer.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        originalImages.forEach((imgLink, index) => {
            // Слайд
            const slide = document.createElement('div');
            slide.className = 'sharing__slide';
            
            const newLink = imgLink.cloneNode(true);
            slide.appendChild(newLink);
            sliderContainer.appendChild(slide);
            
            // Точка
            const dot = document.createElement('button');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        const slides = document.querySelectorAll('.sharing__slide');
        const dots = document.querySelectorAll('.dot');
        let current = 0;
        
        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            current = index;
            sliderContainer.style.transform = `translateX(-${current * 100}%)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === current);
            });
        }
        
        // Свайп
        let startX = 0;
        let isDragging = false;
        
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            sliderContainer.style.transition = 'none';
        });
        
        sliderContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            const translateX = current * 100 + (diff / sliderContainer.offsetWidth) * 100;
            
            sliderContainer.style.transform = `translateX(-${translateX}%)`;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            isDragging = false;
            sliderContainer.style.transition = 'transform 0.3s ease';
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToSlide(current + 1);
                } else {
                    goToSlide(current - 1);
                }
            } else {
                goToSlide(current);
            }
        });
        
    }
    
    // Запускаем при загрузке и изменении размера
    initMobileSlider();
    window.addEventListener('resize', initMobileSlider);
});
/************************************************************************************************** */
// Слайдер для секции abouttravel (только для мобильных)
// Слайдер для секции abouttravel (до 670px)
document.addEventListener('DOMContentLoaded', function() {
    // Функция инициализации слайдера
    function initAboutTravelSlider() {
        // Проверяем ширину экрана
        if (window.innerWidth > 670) {
            // На десктопе не инициализируем слайдер
            return;
        }
        
        // Элементы
        const sliderContainer = document.querySelector('.abouttravel__slider-container .abouttravel__slider');
        const dotsContainer = document.querySelector('.abouttravel-dots');
        
        if (!sliderContainer || !dotsContainer) return;
        
        // Получаем оригинальные карточки из десктопной версии
        const originalCards = document.querySelectorAll('.abouttravel__content .abouttravel__1wrap');
        
        if (originalCards.length === 0) {
            console.log('Карточки не найдены');
            return;
        }
        
        // Очищаем контейнеры
        sliderContainer.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        // Создаем слайды из оригинальных карточек
        originalCards.forEach((card, index) => {
            // Создаем слайд
            const slide = document.createElement('div');
            slide.className = 'abouttravel__slide';
            
            // Клонируем карточку
            const clonedCard = card.cloneNode(true);
            slide.appendChild(clonedCard);
            sliderContainer.appendChild(slide);
            
            // Создаем точку
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        const slides = document.querySelectorAll('.abouttravel__slide');
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Функция перехода к слайду
        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            currentSlide = index;
            
            // Перемещаем слайдер
            sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Обновляем точки
            const dots = document.querySelectorAll('.abouttravel-dots .slider-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        // Свайп-навигация
        let startX = 0;
        let isDragging = false;
        
        
        // Тач-события
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            sliderContainer.style.transition = 'none';
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            const translateX = currentSlide * 100 - (diff / sliderContainer.parentElement.offsetWidth) * 100;
            
            sliderContainer.style.transform = `translateX(-${translateX}%)`;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            isDragging = false;
            sliderContainer.style.transition = 'transform 0.3s ease';
            
            const endX = e.changedTouches[0].clientX;
            const diff = endX - startX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToSlide(currentSlide - 1);
                } else {
                    goToSlide(currentSlide + 1);
                }
            } else {
                goToSlide(currentSlide);
            }
        });
        
      
        
        
        sliderContainer.addEventListener('touchend', () => {
            setTimeout(() => {
                autoplayInterval = setInterval(() => {
                    goToSlide(currentSlide + 1);
                }, 4000);
            }, 3000);
        });
        
        console.log('Слайдер abouttravel инициализирован');
    }
    
    // Инициализация при загрузке
    initAboutTravelSlider();
    
    // Повторная инициализация при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            initAboutTravelSlider();
        }, 100);
    });
});

/********************************************слайдер для фото************ */ 

