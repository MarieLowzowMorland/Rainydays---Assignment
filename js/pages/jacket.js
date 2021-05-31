import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import { salePrice, oldPrice, findJacketById } from "../data/products.js";
import { propertyType } from "../data/categories.js";
import { addToCart } from "../data/cartStorage.js";
import { ShoppingCartIcon, WaterproofIcon, WindproofIcon, InsulationIcon, BreathingIcon } from "../templates/svgIcons.js";
import { colorOption, sizeOption} from "../templates/jacketBox.js";
import { addSuccessMessage } from "../components/formValidation.js";

addHeaderForPage(pageNames.JACKET);
addFooterForPage();

const jacketId = new URLSearchParams(location.search).get("id");
findJacketById(jacketId).then(jacket => {
  document.getElementById("loader").remove();
  
  let selectedColor = jacket.colors[0];
  let selectedSize = jacket.sizes[0];

  const newSelectedColor = (colorId) => {
    const color = jacket.colors.find(color => color.id === colorId);
    selectedColor = color;
    document.querySelector(".image-wrapper img").src = jacket.imageUrl(color); 
  };

  const colorChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { checked, value } = event.target;
    if( checked ) {
      newSelectedColor(value);
    }
  }

  const newSelectedSize = (sizeId) => {
    const size = jacket.sizes.find(size => size === sizeId);
    selectedSize = size; 
  };

  const sizeChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { checked, value } = event.target;
    if( checked ) {
      newSelectedSize(value);
    }
  };

  const propertyDescription = (property, iconFunction) => {
    if( !property ) {
      return "";
    }

    const { description, rating} = property;
    return /*template*/`
      <div class="split-wrapper paragraph-wrapper  property-description">
        <div class="split-20 image-wrapper">
          ${ iconFunction() }
        </div> 
        <div class="split-80">
          <p class="rating">${rating}</p>
          <p>${description}</p>
        </div>      
      </div>`
  };

  const jacketDescription = (jacket) => {
    const {id, name, price, discountPercentage, jacketType, colors, imageUrl, imageDescription, properties, sizes, genders} = jacket;
    const waterproofProperty = properties.find(property => propertyType.WATERPROOF === property.type);
    const windproofProperty = properties.find(property => propertyType.WINDPROOF === property.type);
    const insulatingProperty = properties.find(property => propertyType.INSULATING === property.type);
    const breathingProperty = properties.find(property => propertyType.BREATHING === property.type);

    const waterproofHtmlDescription = propertyDescription(waterproofProperty, WaterproofIcon);
    const windproofHtmlDescription = propertyDescription(windproofProperty, WindproofIcon);
    const insulatingHtmlDescription = propertyDescription(insulatingProperty, InsulationIcon);
    const breathingHtmlDescription = propertyDescription(breathingProperty, BreathingIcon);

    return /*template*/`
      <section class="split-wrapper tablet-block">
        <div class="split-50 image-wrapper">
          <img src="${imageUrl(colors[0])}" alt="${imageDescription}" />
        </div>
        <div class="split-50">
          <h2>
            ${name}
            ${jacketType.icon()}
          </h2>
        
          <p>Product information</p>
          <p>
            Lorem ipsumNequi omnit quasit eost aut fugit ut estium susam
            fuga. Ficaepe liatque porepera dolorporum que del et est et que
            et anis cum nos volorpor aut a doluptatem dolupta temqui aut
            demolup tibuscitem.
          </p>
          <a href="#product-description-anchor" aria-label="Read more about product description">Read more >></a>
        
          <form id="jacket-form">
            <fieldset class="only-content">
              <p>Color:</p>
              <div class="jacket-colors">
                ${colors.map(color => colorOption(id, color, selectedColor)).join("")}
              </div>
            </fieldset>
            <fieldset class="only-content">
              <p>Size:</p>
              <div class="jacket-sizes">
                ${sizes.map(size => sizeOption(id, size, selectedSize)).join("")}
              </div>
            </fieldset>
            <p>
              ${salePrice(price, discountPercentage)}
              ${oldPrice(price, discountPercentage)} 
            </p>
            <button for="shopping-cart-visible" class="add-to-cart-button">
              <span>Add to cart</span>
              <span class="cart-wrapper">
                <span class="cart-background-color point-down"></span>
                ${ShoppingCartIcon()}
              </span>
            </button>
          </form>
        </div>
      </section>
      <section>
        <div id="product-description-anchor" class="anchor"></div>
        <div>
          <h3>Product description</h3>
          <div class="split-wrapper mobile-block">
            <div class="split-50">
              <p>
                Nequi omnit quasit eost aut fugit ut estium susam fuga. Ficaepe
                liatque porepera dolorporum que del et est et que et anis cum nos
                volorpor aut a doluptatem dolupta temqui aut demolup tibuscitem.
                Ita quia cori dolore plicide pore con ni ommolorrum quae optatent
                quam dolorum facea sequam nam facipsum quo bearchi citiunt esendae
                vel minus sunt, nit eatqui num estiisi nctios por mi, que volore
                voluptas eum solo optatquam, aut fuga. Fuga. Hendit maxim
                hitatibus. Nequi omnit quasit eost aut fugit ut estium susam fuga. Ficaepe
                liatque porepera dolorporum que del et est et que et anis cum nos
                volorpor aut a doluptatem dolupta temqui aut demolup tibuscitem.
                Ita quia cori dolore plicide pore con ni ommolorrum quae optatent
                quam dolorum facea sequam nam facipsum quo bearchi citiunt esendae
                vel minus sunt, nit eatqui num estiisi nctios por mi, que volore
                voluptas eum solo optatquam, aut fuga. Fuga. Hendit maxim
                hitatibus.
              </p>
            </div>
            <div class="split-50">
              ${ waterproofHtmlDescription }
              ${ windproofHtmlDescription }
              ${ insulatingHtmlDescription }
              ${ breathingHtmlDescription }
            </div>
          </div>
        </div>
      </section>`;
  };

  const jacketPage = document.querySelector(".grey-card");
  jacketPage.insertAdjacentHTML("afterbegin", jacketDescription(jacket));

  document.querySelectorAll("main .jacket-colors input")
    .forEach(colorOption => colorOption.addEventListener("change", colorChange));

  document.querySelectorAll("main .jacket-sizes input")
    .forEach(sizeOption => sizeOption.addEventListener("change", sizeChange));


  const form = document.getElementById("jacket-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(jacketId, selectedColor, selectedSize);
    addSuccessMessage("Jacket added to cart");
  });

  const keyboardSelectLabel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.keyCode === 13) {
      const forId = event.target.getAttribute("for");
      if(forId){
        document.getElementById(forId).click();
      }
    }
  };

  document.querySelectorAll("input[type=radio] + label")
    .forEach(label => label.addEventListener("keyup", keyboardSelectLabel));
});