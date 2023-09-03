import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryMarkup = galleryItems.map((item) => {
  const imgElement = document.createElement("img");
  imgElement.classList.add("gallery__image");
  imgElement.setAttribute("src", item.preview);
  imgElement.setAttribute("data-source", item.original);
  imgElement.setAttribute("alt", item.description);
  const linkElement = document.createElement("a");
  linkElement.prepend(imgElement);
  linkElement.classList.add("gallery__link");
  linkElement.setAttribute("href", item.original);
  const divElement = document.createElement("div");
  divElement.prepend(linkElement);
  divElement.classList.add("gallery__item");
  const listElement = document.createElement("li");
  listElement.prepend(divElement);
  return listElement;
});

const gallery = document.querySelector(".gallery");
gallery.prepend(...galleryMarkup);

let imgModal;
let isModalOpen = false;

function createImgModal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  event.preventDefault();
  //console.log(event.target.dataset.source);
  imgModal = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="1280">
`);
  imgModal.show();
  isModalOpen = true;
}

gallery.addEventListener("click", createImgModal);

function handleEscapeKey(event) {
  if (isModalOpen && event.key === "Escape") {
    imgModal.close();
    isModalOpen = false;
  }
}

document.addEventListener("keydown", handleEscapeKey);
