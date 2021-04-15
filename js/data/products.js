import {
  insulationType,
  propertyType,
  jacketType,
  gender,
  color,
  size,
} from "./categories.js";

export const salePrice = (price, discountPercentage) => {
  if (discountPercentage <= 0) {
    return /*template*/ `<p class="price">NOK ${price}</p>`;
  }

  return /*template*/ `<p class="price sale">NOK ${
    (price * (100 - discountPercentage)) / 100
  }</p>`;
};

export const oldPrice = (price, discountPercentage) => {
  if (discountPercentage <= 0) {
    return /*template*/ `<div class="price-filler"></div>`;
  }

  return /*template*/ `<p class="price strike-through">NOK ${price}</p>`;
};

const property = (type) => {
  switch (type) {
    case propertyType.WATERPROOF:
      /*
        Waterproof Rating (mm)	Water Resistance Provided
        0-5,000 mm	No resistance to some resistance to moisture.
        6,000-10,000 mm	Rainproof and waterproof under light pressure.
        11,000-15,000 mm	Rainproof and waterproof except under high pressure.
        16,000-20,000 mm	Rainproof and waterproof under high pressure.
      */
      return {
        type: type,
        description:
          "The product have taped seams, durable membrane and will keep you protected through an entire day of demanding weather. Withstands a strong water pressure (up to 1000 cm water column)",
        rating: "14,000mm",
      };
    case propertyType.WINDPROOF:
      /*
        Windproof Rating	Summary
        60 CFM	Not Very Windproof
        20 CFM	Somewhat Windproof
        10 – 5 CFM	Moderately Windproof
        1 CFM	Windproof
      */
      return {
        type: type,
        description:
          "Protects against extreme wind and conditions, both through the construction of the garment and the taped and windproof membrane",
        rating: "5 CFM",
      };
    case propertyType.INSULATING:
      /*
        REGULAR
        Insulating warmth for every day comfort at a temperature range of approximately 15°C/5°C
        ENHANCED
        Enhanced performance for colder climes at a temperature range of approximately 10°C/-5°C
        OPTIMUM
        Optimum insulation for extreme conditions at a temperature range of approximately 0°C/-20°C
      */
      return {
        type: type,
        description:
          "A comfort temperature ranging from + 15 to - 20 degrees Celsius. Winter jackets for really cold winter days both on and off the mountains",
        rating: insulationType.ENHANCED,
      };
    case propertyType.BREATHING:
      /*
        Gore-Tex fabrics are measured using a different method known as Resistance to Evaporative Heat Loss (or RET). In this method the lower the number, the more breathable a fabric is.

        <9 will give you a good level of breathability for general outdoor use
        <6 will give you a good level of breathability for more active use
        <4 or under will give you the best level of breathability for highly aerobic use.*/
      return {
        type: type,
        description:
          "Breathes extremely well and provides good sweat transportation even during high-intensity activities. Will perform optimal moisture transportation when it’s around 10 – 15 degrees Celsius",
        rating: "5 RET",
      };
  }
};

const colorUrl = (color) => color.name.replaceAll(/\s/gi, "_");

const getAttributeWithName = (attributes, attributeName) =>
  attributes.find((attribute) => attributeName === attribute.name);

const getAttributeContaining = (attributes, attributeName) =>
  attributes.find((attribute) => attribute.name.includes(attributeName));

const parseAttribute = (attributes, attributeName, type) =>
  getAttributeWithName(attributes, attributeName).options.map(
    (option) => type[option]
  );

const getProperties = (attributes) => {
  return ["WINDPROOF", "WATERPROOF", "INSULATING", "BREATHING"]
    .map((attributeName) => getAttributeWithName(attributes, attributeName))
    .filter((attribute) => attribute)
    .map((attribute) => {
      let rating = attribute.options[0];
      if (attribute.name === "INSULATING") {
        rating = insulationType[rating];
      }
      return { ...property(propertyType[attribute.name]), rating };
    });
};

const toJacketInfo = (jacketFromApi) => {
  const {
    id,
    name,
    attributes,
    categories,
    featured,
    images,
    on_sale,
    sale_price,
    regular_price,
  } = jacketFromApi;

  let discountPercentage = 0;
  if (on_sale) {
    discountPercentage = 100 - (Number.parseFloat(sale_price) / Number.parseFloat(regular_price)) * 100;
  }

  const colors = parseAttribute(attributes, "Color options", color);
  const sizes = parseAttribute(attributes, "SIZES", size);
  const genders = parseAttribute(attributes, "GENDERS", gender);

  return {
    id,
    name,
    discountPercentage,
    price: Number.parseFloat(regular_price),
    jacketType: jacketType[categories[0].name],
    colors,
    featured,
    sizes,
    genders,
    propities: getProperties(attributes),
    featuredImage: images[0],
    imageUrl: (color) => getAttributeContaining(images, colorUrl(color).toLowerCase()).src,
    imageDescription: images[0].alt,
  };

};

// https://stackoverflow.com/questions/37837931/how-to-go-about-caching-promises-when-working-with-the-new-fetch-api
let cache = {};
const cachingFetchJSON = (url) => {
  if (!cache[url]) {
    cache[url] = fetch(url).then((resp) => resp.json());
  } 
  return cache[url];
};

const apiProductUrl =
  "https://morlanddesign.one/rainydays-admin/wp-json/wc/v3/openproducts/";
export const findJacketById = async (id) => {
  try {
    const jacketFromWP = await cachingFetchJSON(`${apiProductUrl}${id}`);
    return toJacketInfo(jacketFromWP);
  } catch (error) {
    console.log(error);
  }
};

const products = async () => {
  try {
    return cachingFetchJSON(`${apiProductUrl}?per_page=50`)
      .then((jackets) => jackets.map(toJacketInfo));
  } catch (error) {
    console.log(error);
  }
};

export default products;
