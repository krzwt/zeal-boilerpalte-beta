// swiperInit.js
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const initHomeSlider = () => {
    return new Swiper('.home-slider', {
        loop: true,
        navigation: {
            nextEl: '.home-next',
            prevEl: '.home-prev',
        },
        pagination: {
            el: '.home-pagination',
            clickable: true,
        },
    });
};

export const initTestimonialSlider = () => {
    return new Swiper('.testimonial-slider', {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 30,
        pagination: {
            el: '.testimonial-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
            },
        },
    });
};
