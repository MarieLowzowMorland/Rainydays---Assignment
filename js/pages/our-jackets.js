import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import jacketBox from "../templates/jacketBox.js";
import products from "../data/products.js";
import { propertyType } from "../data/categories.js";

addHeaderForPage(pageNames.OUR_JACKETS);
addFooterForPage();

const jacketContainger = document.querySelector(".jacket-container");
products().then(jackets => {
  document.getElementById("loader").remove();
  document.getElementById("filter").classList.remove("hidden");

  jackets
    .sort((a, b) => a.name.localeCompare(b.name, "nb"))
    .forEach(jacket =>
      jacketContainger.insertAdjacentHTML("beforeend", jacketBox(jacket))
    );

  const filterCriteria = {
    filterJackettypes: [],
    filterGenders: [],
    filterSizes: [],
    filterProperties: []
  };

  const passPropertycheck = (filterProperties, jacket) => {
    const properties = jacket.properties;
    const waterproofProperty = properties.find(property => propertyType.WATERPROOF === property.type);
    const windproofProperty = properties.find(property => propertyType.WINDPROOF === property.type);
    const insulatingProperty = properties.find(property => propertyType.INSULATING === property.type);
    const breathingProperty = properties.find(property => propertyType.BREATHING === property.type);

    if(filterProperties.includes("water-proof") && (!waterproofProperty || parseInt(waterproofProperty.rating) < 11)){
      return false;
    }

    if(filterProperties.includes("wind-proof") && (!windproofProperty || parseInt(windproofProperty.rating) >= 8)){
      return false;
    }

    if(filterProperties.includes("winter-lined") && (!insulatingProperty || !insulatingProperty.rating.includes("Optimum"))){
      return false;
    }

    if(filterProperties.includes("ventilated") && (!breathingProperty || parseInt(breathingProperty.rating) >= 7)){
      return false;
    }

    return true;
  }

  const filterJacket = (jacket) => {
    const { jacketType, genders, sizes } = jacket;
    const { filterJackettypes, filterGenders, filterSizes, filterProperties } = filterCriteria;

    if( filterJackettypes.length > 0 && !filterJackettypes.includes(jacketType.name.toLowerCase())){
      return false;
    }

    if( filterGenders.length > 0 && !genders.some(gender => filterGenders.includes(gender.toLowerCase()))){
      return false;
    }

    if( filterSizes.length > 0 && !sizes.some(size => filterSizes.includes(size.toLowerCase()))){
      return false;
    }

    if( filterProperties.length > 0 && !passPropertycheck(filterProperties, jacket)){
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

  const updateFilterCriteria = (filterName, shouldInclude, criteriaType) => {
    let criteria = filterCriteria[criteriaType];
    const alreadyIncluded = criteria.includes(filterName);

    if(shouldInclude && !alreadyIncluded){
      criteria.push(filterName);
    } else if (!shouldInclude && alreadyIncluded){
      filterCriteria[criteriaType] = criteria.filter(name => name !== filterName);
    }
    filterJackets();
  };

  const genderFilter = new URLSearchParams(location.search).get("gender");
  if(genderFilter){
    document.querySelector(`#gender-selection #${genderFilter}`).checked = true;
    updateFilterCriteria(genderFilter, true, "filterGenders");
  }

  const changeJacketTypeSelection = (event) => updateFilterCriteria(event.target.id, event.target.checked, "filterJackettypes");
  const changeGenderSelection = (event) => updateFilterCriteria(event.target.id, event.target.checked, "filterGenders");
  const changeSizeSelection = (event) => updateFilterCriteria(event.target.id, event.target.checked, "filterSizes");
  const changePropertiesSelection = (event) => updateFilterCriteria(event.target.id, event.target.checked, "filterProperties");

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
      wrapper.querySelectorAll("#properties-selection input")
        .forEach(inputElement => inputElement.addEventListener("change", changePropertiesSelection));
    }
  };

  document.getElementById("toggle-menu").addEventListener("click", toggleMenu);
});