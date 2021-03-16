import { LogoIcon, MenuIcon, ShoppingCartIcon, SearchIcon } from "./svgIcons.js";

export const pageNames = {
  INDEX: "index",
  OUR_JACKETS: "our-jackets",
  JACKET: "jacket",
  ABOUT: "about",
  CONTACT: "contact",
  CHECKOUT: "checkout"
}

const addHeaderForPage = (pageName) => document
  .querySelector("main")
  .insertAdjacentHTML("beforebegin", headerTemplate(pageName));


const headerTemplate = (pageName) => `
<header>
  <nav>
    <input
      id="menu-visible"
      type="checkbox"
      class="screen-reader-only desktop-hidden"
    />
    <div>
      <a href="index.html" class="logo-link">
        ${LogoIcon()}
      </a>
      <div class="filler desktop-hidden"></div>
      <a href="checkout.html" class="svg-button desktop-hidden">
        ${ShoppingCartIcon()}
      </a>
      <label class="desktop-hidden" for="menu-visible">
        ${MenuIcon()}
      </label>
    </div>
    <div class="menu">
      <div class="search desktop-hidden">
        <div class="svg-button">
          ${SearchIcon()}
        </div>
        <div class="searchbar input-with-label-wrapper shorter">
          <label for="search-small">Search</label>
          <input type="text" name="search" id="search-small" />
        </div>
      </div>
      <ul>
        <li><a href="ourJackets.html" class="${pageName === pageNames.OUR_JACKETS ? "active" : ""}">Our Jackets</a></li>
        <li><a href="about.html" class="${pageName === pageNames.ABOUT ? "active" : ""}">About</a></li>
        <li><a href="contact.html" class="${pageName === pageNames.CONTACT ? "active" : ""}">Contact</a></li>
      </ul>
      <div class="filler"></div>

      <div class="searchbar input-with-label-wrapper shorter tablet-hidden">
        <label for="search">Search</label>
        <input type="text" name="search" id="search" />
      </div>

      <div class="svg-button tablet-hidden">
        ${SearchIcon()}
      </div>
      <div id="nav-shopping-cart" class="tablet-hidden">
        <input
          type="checkbox"
          id="shopping-cart-visible"
          class="screen-reader-only"
        />
        <label for="shopping-cart-visible" class="svg-button">
          ${ShoppingCartIcon()}
        </label>
        <div id="cart-circle">
          <p>1</p>
        </div>
        <label for="shopping-cart-visible" id="overlay"></label>
        <section id="cart-overlay">
          <section>
            <h2 class="red-h2">Your cart</h2>
            <p class="smal-blue-text center-text">Number of items</p>
            <ul>
              <li>
                <div class="split-wrapper">
                  <img
                    class="split-50"
                    src="images/jacket1.png"
                    alt="Picture of jacket"
                  />

                  <div class="split-50 jacket-chekout-info">
                    <h3>Jacket name</h3>
                    <p>Gore tex jacket</p>

                    <div class="jacket-options-grid">
                      <label for="size">Size</label>
                      <select name="size" id="size">
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>

                      <label for="color">Color</label>
                      <select name="color" id="color">
                        <option value="purple">Pruple</option>
                        <option value="green">Green</option>
                        <option value="yellow">Yellow</option>
                        <option value="blue">Blue</option>
                        <option value="black">Black</option>
                      </select>
                    </div>
                    <div class="one-liner">
                      <button class="circle">-</button>
                      <p>1</p>
                      <button class="circle">+</button>
                    </div>
                    <p class="bold">NOK 2000,-</p>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          <section class="payment-overview">
            <h2 class="red-h2">Payment overview</h2>
            <div class="split-wrapper">
              <div class="split-60 left-text">
                <p>Sum products</p>
                <p>Shipping</p>
                <aside>Estimated time for shipping is 3-4 days</aside>
              </div>
              <div class="split-40 right-text">
                <p>NOK 2000,-</p>
                <p>Free</p>
              </div>
            </div>
            <div class="split-wrapper">
              <p class="split-60 left-text">Total</p>
              <p class="split-40 right-text">NOK 2000,-</p>
            </div>
            <div id="doubble-line"></div>
            <a href="checkout.html" class="add-to-cart-button">
              <span class="helvetica">Go to checkout</span>
              <span class="cart-wrapper">
                <span class="cart-background-color point-down"></span>
                  ${ShoppingCartIcon()}
              </span>
            </a>
          </section>
        </section>
      </div>
    </div>
  </nav>
</header>`;

export default addHeaderForPage;