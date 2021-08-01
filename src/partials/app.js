const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const ISOPEN_CLASS_NAME = 'is-open';
const gallery = document.querySelector("ul.gallery.js-gallery");
let currentImage;

const createTamplate = element => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${element.original}"
  >
    <img
      class="gallery__image"
      src="${element.preview}"
      data-source="${element.original}"
      alt="${element.description}"
    />
  </a>
</li>`;
};

const handlerClick = event => {
  const elm = event.target;
  const curElm = event.currentTarget;
  const lightbox = document.querySelector("div.lightbox");
  const lightboxImg = document.querySelector(".lightbox__image");

  function closeLightbox() {
    lightbox.classList.remove(ISOPEN_CLASS_NAME);
    lightboxImg.src = "";
    lightboxImg.alt = "";
    lightbox.removeEventListener('click', handlerClick);
    document.removeEventListener('keyup', handlerClick);
  };

  function showBigImage(elm) {
    lightboxImg.src = elm.dataset.source;
    lightboxImg.alt = elm.alt;
  };

  event.stopImmediatePropagation();
  if (curElm.nodeName === "A") {
    event.preventDefault();
  };

  if (event.type === 'keyup' && event.code === 'Escape') closeLightbox();

  if (elm.nodeName === "BUTTON") {
    switch (elm.dataset.action) {
      case "close-lightbox":
        closeLightbox();
        break;
      case "left-lightbox":
        currentImage = currentImage.parentElement.parentElement.previousElementSibling.querySelector("." + currentImage.className);
        showBigImage(currentImage);
        break;
      case "right-lightbox":
        currentImage = currentImage.parentElement.parentElement.nextElementSibling.querySelector("." + currentImage.className);
        showBigImage(currentImage);
        break;
    };
  };

  if (elm.nodeName === "DIV" && elm.classList.contains("lightbox__overlay")) closeLightbox();
  if (elm.classList.contains("lightbox__image") || elm.classList.contains("lightbox__content")) {
    closeLightbox();
    return;
    };

  if (elm.nodeName === "IMG") {
  
    //відображаємо модальне вікно та ініціалізуємо його елементи
    lightbox.classList.add(ISOPEN_CLASS_NAME);
    lightbox.addEventListener('click', handlerClick);
    document.addEventListener('keyup', handlerClick);

    //відображаємо поточне зображення
    showBigImage(elm);

    //зберігаємо поточне відкрите зображення
    currentImage = elm;
    
  };
};


const markupArray = galleryItems.map(elm => createTamplate(elm));
gallery.insertAdjacentHTML('afterbegin', markupArray.join(""));

gallery.addEventListener('click', handlerClick);
gallery.addEventListener('mousedown', handlerClick);
gallery.addEventListener('mouseup', handlerClick);