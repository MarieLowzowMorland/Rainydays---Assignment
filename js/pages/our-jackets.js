import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import jacketBox from "../templates/jacketBox.js";
import products from "../data/products.js";

addHeaderForPage(pageNames.OUR_JACKETS);
addFooterForPage();

const jacketContainger = document.querySelector(".jacket-container");
products().then(jackets => {
  jackets
    .sort((a, b) => a.name.localeCompare(b.name, "nb"))
    .forEach(jacket =>
      jacketContainger.insertAdjacentHTML("beforeend", jacketBox(jacket))
    );

  const filterCriteria = {
    filterJackettypes: [],
    filterGenders: [],
    filterSizes: []
  };

  const filterJacket = (jacket) => {
    const { jacketType, genders, sizes } = jacket;
    const { filterJackettypes, filterGenders, filterSizes } = filterCriteria;

    if( filterJackettypes.length > 0 && !filterJackettypes.includes(jacketType.name.toLowerCase())){
      return false;
    }

    if( filterGenders.length > 0 && !genders.some(gender => filterGenders.includes(gender.toLowerCase()))){
      return false;
    }

    if( filterSizes.length > 0 && !sizes.some(size => filterSizes.includes(size.toLowerCase()))){
      return false;
    }

    return true;
  };

  const jacketBoxId = (id) => `jacket-box-${id}`;

  const filterJackets = () => {
    const shouldBeVisible = jackets
      .filter(filterJacket)
      .map(jacket => jacket.id);

    const shouldBeHidden = jackets
      .filter(jacket => !shouldBeVisible.includes(jacket.id))
      .map(jacket  => jacket.id);

    shouldBeHidden.forEach(jacketId => 
      document.getElementById(jacketBoxId(jacketId)).classList.add("hidden")
    );

    shouldBeVisible.forEach(jacketId => 
      document.getElementById(jacketBoxId(jacketId)).classList.remove("hidden")
    );
  };

  const updateFilterCriteria = (event, criteriaType) => {
    const filterName = event.target.id;
    const shouldInclude = event.target.checked;
    let criteria = filterCriteria[criteriaType];
    const alreadyIncluded = criteria.includes(filterName);

    if(shouldInclude && !alreadyIncluded){
      criteria.push(filterName);
    } else if (!shouldInclude && alreadyIncluded){
      filterCriteria[criteriaType] = criteria.filter(name => name !== filterName);
    }
    filterJackets();
  };

  const changeJacketTypeSelection = (event) => updateFilterCriteria(event, "filterJackettypes");
  const changeGenderSelection = (event) => updateFilterCriteria(event, "filterGenders");
  const changeSizeSelection = (event) => updateFilterCriteria(event, "filterSizes");

  const toggleMenu = (event) => {
    const wrapper = document.getElementById("filter-menu-wrapper");
    wrapper.classList.toggle("visible");
    if( wrapper.classList.contains("visible") ){
      wrapper.querySelectorAll("#jackettype-selection input")
        .forEach(inputElement => inputElement.addEventListener("change", changeJacketTypeSelection));
      wrapper.querySelectorAll("#gender-selection input")
        .forEach(inputElement => inputElement.addEventListener("change", changeGenderSelection));
      wrapper.querySelectorAll("#size-selection input")
        .forEach(inputElement => inputElement.addEventListener("change", changeSizeSelection));
    }
  };

  document.getElementById("toggle-menu").addEventListener("click", toggleMenu);
});