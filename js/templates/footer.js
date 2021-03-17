import { MailIcon } from "./svgIcons.js";
import addValidationToForm from "../components/formValidation.js"

const addFooterForPage = () => {
  document
    .querySelector("main")
    .insertAdjacentHTML("afterend", footerTemplate());
  addValidationToForm("footer-subscribe");
}

const footerTemplate = () => /*template*/`
  <footer>
    <div class="section-content">
      <div>
        <h2 class="red-h2">Subscribe to our newsletter</h2>
        <form id="footer-subscribe">
          <div class="input-with-label-wrapper">
            <label for="e-mailSubscribe">E-mail</label>
            <input type="email" name="subscribeE-mail" id="e-mailSubscribe" required/>
            <div class="form-error" id="subscribeE-mailError"></div>
          </div>
          <button type="submit" class="add-to-cart-button" formnovalidate>
            <span>Subscribe</span>
            <span class="cart-wrapper">
              <span class="cart-background-color point-down"></span>
              ${MailIcon()}
            </span>
          </button>
        </form>
        <p>By signing up you agree to Rainydays´ <a>Privacy Policy</a></p>
      </div>
      <div>
        <h2 class="helvetica-smal-headding light-h2">Contact:</h2>
        <a href="mailto:rainydays@post.com">rainydays@post.com</a>
        <p>Nicestreet 25 0780 City Norway</p>
        <p>+47 123 45 566</p>
        <p>Copyright &copy;</p>
      </div>
    </div>
  </footer>`;

export default addFooterForPage;