import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

function createGalleryElement(item) {
  const imgElement = document.createElement("img");
  imgElement.classList.add("gallery__image");
  imgElement.setAttribute("src", item.preview);
  imgElement.setAttribute("data-source", item.original);
  imgElement.setAttribute("alt", item.description);
  const linkElement = document.createElement("a");
  linkElement.prepend(imgElement);
  linkElement.classList.add("gallery__link");
  linkElement.setAttribute("href", item.original);
  const listElement = document.createElement("li");
  listElement.prepend(linkElement);
  listElement.classList.add("gallery__item");
  return listElement;
}

const galleryMarkup = galleryItems.map((picture) =>
  createGalleryElement(picture)
);

const gallery = document.querySelector(".gallery");
gallery.prepend(...galleryMarkup);

function createImgModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  //console.log(event.target.dataset.source);
  const imgModal = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="1280">
`);
  imgModal.show();

  function handleEscape(event) {
    if (event.key === "Escape") {
      imgModal.close();
      document.removeEventListener("keydown", handleEscape);
    }
  }

  document.addEventListener("keydown", handleEscape);
}

gallery.addEventListener("click", createImgModal);
