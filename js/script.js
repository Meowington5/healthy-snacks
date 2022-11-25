
window.addEventListener('DOMContentLoaded', event => {

  // Navbar shrink function
  var navbarShrink = function () {
      const navbarCollapsible = document.body.querySelector('#mainNav');
      if (!navbarCollapsible) {
          return;
      }
      if (window.scrollY === 0) {
          navbarCollapsible.classList.remove('navbar-shrink')
      } else {
          navbarCollapsible.classList.add('navbar-shrink')
      }

  };

  // Shrink the navbar 
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
      new bootstrap.ScrollSpy(document.body, {
          target: '#mainNav',
          offset: 74,
      });
  };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
      responsiveNavItem.addEventListener('click', () => {
          if (window.getComputedStyle(navbarToggler).display !== 'none') {
              navbarToggler.click();
          }
      });
  });

});

let subtotal = 0;

const calculateImpuestos = subtotal => {
  const Impuestos = subtotal * 0.13;
  const formattedImpuestos = Impuestos.toFixed(2);
  return formattedImpuestos;
};

const calculateTotal = subtotal => {
  const Impuestos = calculateImpuestos(subtotal);
  const total = parseFloat(subtotal) + parseFloat(Impuestos);
  const formattedTotal = total.toFixed(2);
  return formattedTotal;
};

const getImgLink = title => {
  let imgLink;
  switch (title) {
    case 'Cápsulas de Spirulina Orgánica':
      imgLink = 'https://cdn.shopify.com/s/files/1/2514/1798/products/WEB1-FRASCO-100CAP---Spirulina-Organica_370x_crop_center.jpg?v=1619833620';
      break;
    case 'Cápsulas de Aguaje Atomizado':
      imgLink = 'https://cdn.shopify.com/s/files/1/2514/1798/products/capsulas-de-aguaje-atomizado-795009_370x_crop_center.jpg?v=1603583289';
      break;
    case 'Cápsulas de Cúrcuma Orgánica':
      imgLink = 'https://cdn.shopify.com/s/files/1/2514/1798/products/WEB1-FRASCO-100CAP---Curcuma-Organica_370x_crop_center.jpg?v=1619216205';
      break;
    case 'Aguaymanto deshidratado':
      imgLink = 'https://cdn.shopify.com/s/files/1/2514/1798/products/WEB1100GR-Aguaymanto-01_450x_crop_center.jpg';
      break;
    case 'Camu Camu Atomizado Orgánico en Polvo':
      imgLink = 'https://cdn.shopify.com/s/files/1/2514/1798/products/WEB-1-100GR---Camu-Camu-Atomizado_450x_crop_center.jpg';
      break;
    case 'Harina de Linaza':
      imgLink = 'https://cdn.shopify.com/s/files/1/2514/1798/products/WEB-1-100GR---Harina-de-Linaza.jpg?v=1629828431';
      break;
    case 'Cápsulas de Chanca Piedra':
      imgLink = 'https://cdn.shopify.com/s/files/1/2514/1798/products/WEB1-FRASCO-100CAP---Chancapiedra-en-Capsulas_1024x1024.jpg?v=1619941634';
      break;
    case 'Sacha Inchi Orgánico Tostado Sin Sal':
      imgLink = 'https://cdn.shopify.com/s/files/1/2514/1798/products/sachainchi_1024x1024.jpg?v=1615204812';
      break;       
    default:
      imgLink = 'https://cdn.shopify.com/s/files/1/2514/1798/products/WEB-1-100GR---Camu-Camu-Atomizado_450x_crop_center.jpg';}

  return imgLink;
};

$('.add-button').on('click', function () {
  const title = $(this).data('title');
  const price = $(this).data('price');
  const imgLink = getImgLink(title);

  const element = `
    <li class="cart-item">
      <img src="${imgLink}" alt="${title}">
      <div class="cart-item-dets">
        <p class="cart-item-heading">${title}</p>
        <p class="g-price">$${price}</p>
      </div>
    </li>
  `;
  $('.cart-items').append(element);

  subtotal = subtotal + price;

  const formattedSubtotal = subtotal.toFixed(2);
  const Impuestos = calculateImpuestos(subtotal);
  const total = calculateTotal(subtotal);

  $('.cart-math').html(`
    <p class="cart-math-item">
      <span class="cart-math-header">Subtotal:</span>
      <span class="g-price subtotal">$${formattedSubtotal}</span>
    </p>
    <p class="cart-math-item">
      <span class="cart-math-header">Impuestos:</span>
      <span class="g-price Impuestos">$${Impuestos}</span>
    </p>
    <p class="cart-math-item">
      <span class="cart-math-header">Total:</span>
      <span class="g-price total">$${total}</span>
    </p>
  `);
});