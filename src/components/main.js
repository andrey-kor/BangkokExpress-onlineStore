import Carousel from './carousel.js';
import slides from '../assets/data/slides.js';

import RibbonMenu from './ribbonMenu.js'
import categories from '../assets/data/categories.js';

import StepSlider from './stepSlider.js';
import ProductsGrid from './productsGrid.js';

import CartIcon from './cartIcon.js';
import Cart from './cart.js';

import productsJSON from '../assets/data/products.json'

export default class Main {

    constructor() {
      this.carousel = new Carousel(slides);
      this.ribbonMenu = new RibbonMenu(categories);
      this.stepSlider = new StepSlider({steps: 5, value: 3});
      this.cartIcon = new CartIcon();
      this.cart = new Cart(this.cartIcon);
    }
  
    render() {
      document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
      document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
      document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
      document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);
  
    //   return fetch(productsJSON)
    //     .then (responce => responce.json())
    //     .then (products => {
          this.products = productsJSON;
          this.productsGrid = new ProductsGrid(this.products);
  
          document.querySelector('[data-products-grid-holder]').innerHTML = '';
          document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);
        
          this.productsGrid.updateFilter({
            noNuts: document.querySelector('#nuts-checkbox').checked,
            vegeterianOnly: document.querySelector('#vegeterian-checkbox').checked,
            maxSpiciness: this.stepSlider.value,
            category: this.ribbonMenu.value
          });
  
          document.body.addEventListener('product-add', (event) => {
            const targetProduct = this.products.find(prod => prod.id === event.detail);
            this.cart.addProduct(targetProduct);
          })
  
          document.body.addEventListener('slider-change', (event) => {
            this.productsGrid.updateFilter({
              maxSpiciness: event.detail
            })
          })
  
          document.body.addEventListener('ribbon-select', (event) => {        
            this.productsGrid.updateFilter({
              category: event.detail
            })
          })
  
          document.body.addEventListener('change', (event) => {        
            if (event.target.closest('#nuts-checkbox')) {
              this.productsGrid.updateFilter({
                noNuts: event.target.checked
              });
            }
            else if (event.target.closest('#vegeterian-checkbox')) {
              this.productsGrid.updateFilter({
                vegeterianOnly: event.target.checked
              });
            }
          })
        
    }
  }