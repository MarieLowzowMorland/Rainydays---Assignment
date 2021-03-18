import { insulationType, propertyType, jacketType, gender, color, size} from "./categories.js";

export const salePrice = (price, discountPercentage) => {
  if(discountPercentage <= 0){
    return /*template*/`<p class="price">NOK ${price}</p>`;
  }

  return /*template*/`<p class="price sale">NOK ${price * (100 - discountPercentage)/100}</p>`;
};

export const oldPrice = (price, discountPercentage) => {
  if(discountPercentage <= 0){
    return /*template*/`<div class="price-filler"></div>`;
  }

  return /*template*/`<p class="price strike-through">NOK ${price}</p>`;
};

const property = (type) => {
  switch(type){
    case propertyType.WATERPROOF: 
      /*
        Waterproof Rating (mm)	Water Resistance Provided
        0-5,000 mm	No resistance to some resistance to moisture.
        6,000-10,000 mm	Rainproof and waterproof under light pressure.
        11,000-15,000 mm	Rainproof and waterproof except under high pressure.
        16,000-20,000 mm	Rainproof and waterproof under high pressure.
      */
      return {
        "type": type,
        "description": "The product have taped seams, durable membrane and will keep you protected through an entire day of demanding weather. Withstands a strong water pressure (up to 1000 cm water column)",
        "rating": "14,000mm"
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
        "type": type,
        "description": "Protects against extreme wind and conditions, both through the construction of the garment and the taped and windproof membrane",
        "rating": "5 CFM"
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
        "type": type,
        "description": "A comfort temperature ranging from + 15 to - 20 degrees Celsius. Winter jackets for really cold winter days both on and off the mountains",
        "rating": insulationType.ENHANCED
      };
    case propertyType.BREATHING: 
      /*
        Gore-Tex fabrics are measured using a different method known as Resistance to Evaporative Heat Loss (or RET). In this method the lower the number, the more breathable a fabric is.

        <9 will give you a good level of breathability for general outdoor use
        <6 will give you a good level of breathability for more active use
        <4 or under will give you the best level of breathability for highly aerobic use.*/
      return {
        "type": type,
        "description": "Breathes extremely well and provides good sweat transportation even during high-intensity activities. Will perform optimal moisture transportation when it’s around 10 – 15 degrees Celsius",
        "rating": "5 RET"
      };
  }
}

const colorUrl = (color) => color.name.replaceAll(/\s/ig, "_");

export const findJacketById = (id) => 
    products.find(product => product.id === id);

const products = [
  {
    "id": "J01",
    "name": "Stetind",
    "discountPercentage": 0,
    "price": 2000,
    "jacketType": jacketType.SKIING,
    "propities": [
      property(propertyType.WATERPROOF),
      {...property(propertyType.WINDPROOF), rating: "1 CFM"},
      property(propertyType.INSULATING),
    ],
    "genders": [gender.UNISEX],
    "sizes": [
      size.S,
      size.M,
      size.L,
    ],
    "colors": [
      color.PLUM_PURPLE
    ],
    "imageUrl": (color) => `images/hiking_${colorUrl(color)}.png`,
    "imageDescription": "A wonder to behold, long sleves and a high neck with a cool zipper in the front"
  },
  {
    "id": "J02",
    "name": "Tonekollen",
    "discountPercentage": 30,
    "price": 3500,
    "jacketType": jacketType.HIKING,
    "propities": [
      property(propertyType.WATERPROOF),
      property(propertyType.WINDPROOF),
      property(propertyType.BREATHING),
      {...property(propertyType.INSULATING), rating: insulationType.REGULAR},
    ],
    "genders": [gender.MEN, gender.WOMEN],
    "sizes": [
      size.S,
      size.M,
      size.L,
    ],
    "colors": [
      color.DUST_BLUE,
      color.PACIFIC_BLUE,
      color.PLUM_PURPLE,
      color.MUSTARD,
    ],
    "imageUrl": (color) => `images/hiking_${colorUrl(color)}.png`,
    "imageDescription": "Long sleves and a high neck with a cool zipper in the front"
  },
  {
    "id": "J03",
    "name": "Galdhøpiggen",
    "discountPercentage": 20,
    "price": 5000,
    "jacketType": jacketType.SNOWBOARD,
    "propities": [
      {...property(propertyType.WATERPROOF), rating: "16,000 mm"},
      {...property(propertyType.WINDPROOF), rating: "4 CFM"},
      {...property(propertyType.INSULATING), rating: insulationType.OPTIMUM},
      {...property(propertyType.BREATHING), rating: "7 RET"}
    ],
    "genders": [gender.MEN, gender.WOMEN],
    "sizes": [
      size.M,
      size.L,
      size.XL,
    ],
    "colors": [
      color.PACIFIC_BLUE,
      color.PLUM_PURPLE
    ],
    "imageUrl": (color) => `images/hiking_${colorUrl(color)}.png`,
    "imageDescription": "Long sleves and a high neck with a cool zipper in the front"
  },
  {
    "id": "J04",
    "name": "Blanksjø",
    "discountPercentage": 70,
    "price": 5000,
    "jacketType": jacketType.CANOEING,
    "propities": [
      {...property(propertyType.WATERPROOF), rating: "16,000 mm"},
      {...property(propertyType.WINDPROOF), rating: "4 CFM"},
      {...property(propertyType.INSULATING), rating: insulationType.REGULAR},
      {...property(propertyType.BREATHING), rating: "2 RET"}
    ],
    "genders": [gender.UNISEX],
    "sizes": [
      size.XS,
      size.S,
      size.M,
      size.L,
      size.XL,
    ],
    "colors": [
      color.FOREST_GREEN,
      color.GRAS_GREEN,
      color.BLACK
    ],
    "imageUrl": (color) => `images/everyday_${colorUrl(color)}.png`,
    "imageDescription": "Breathable jacket with multiple zippers, hood and a cool zipper in the front"
  },
  {
    "id": "J05",
    "name": "Glomma",
    "discountPercentage": 70,
    "price": 5000,
    "jacketType": jacketType.CANOEING,
    "propities": [
      {...property(propertyType.WATERPROOF), rating: "13,000 mm"},
      {...property(propertyType.WINDPROOF), rating: "4 CFM"},
      {...property(propertyType.INSULATING), rating: insulationType.REGULAR},
      {...property(propertyType.BREATHING), rating: "3 RET"}
    ],
    "genders": [gender.UNISEX],
    "sizes": [
      size.XS,
      size.S,
      size.M,
      size.L,
      size.XL,
    ],
    "colors": [
      color.BLACK,
      color.FOREST_GREEN,
      color.GRAS_GREEN,
    ],
    "imageUrl": (color) => `images/everyday_${colorUrl(color)}.png`,
    "imageDescription": "Breathable jacket with multiple zippers, hood and a cool zipper in the front"
  },
  
  {
    "id": "J06",
    "name": "Snota",
    "discountPercentage": 0,
    "price": 2000,
    "jacketType": jacketType.HIKING,
    "propities": [
      {...property(propertyType.WATERPROOF), rating: "20,000 mm"},
      {...property(propertyType.WINDPROOF), rating: "4 CFM"},
      {...property(propertyType.INSULATING), rating: insulationType.OPTIMUM},
      {...property(propertyType.BREATHING), rating: "7 RET"}
    ],
    "genders": [
      gender.WOMEN, 
      gender.MEN
    ],
    "sizes": [
      size.XS,
      size.S,
      size.M,
      size.L,
      size.XL,
    ],
    "colors": [
      color.MUSTARD,
      color.DUST_BLUE,
      color.PACIFIC_BLUE,
    ],
    "imageUrl": (color) => `images/hiking_${colorUrl(color)}.png`,
    "imageDescription": "Breathable jacket with multiple zippers, hood and a cool zipper in the front"
  },
  {
    "id": "J07",
    "name": "Trollhetta",
    "discountPercentage": 0,
    "price": 3000,
    "jacketType": jacketType.HIKING,
    "propities": [
      {...property(propertyType.WATERPROOF), rating: "16,000 mm"},
      {...property(propertyType.WINDPROOF), rating: "4 CFM"},
      {...property(propertyType.INSULATING), rating: insulationType.OPTIMUM},
      {...property(propertyType.BREATHING), rating: "7 RET"}
    ],
    "genders": [
      gender.WOMEN, 
      gender.MEN
    ],
    "sizes": [
      size.XS,
      size.S,
      size.M,
      size.L,
      size.XL,
    ],
    "colors": [
      color.DUST_BLUE,
      color.MUSTARD,
      color.PACIFIC_BLUE
    ],
    "imageUrl": (color) => `images/hiking_${colorUrl(color)}.png`,
    "imageDescription": "Breathable jacket with multiple zippers, hood and a cool zipper in the front"
  },
  {
    "id": "J08",
    "name": "Gjende",
    "discountPercentage": 20,
    "price": 5000,
    "jacketType": jacketType.CANOEING,
    "propities": [
      {...property(propertyType.WATERPROOF), rating: "13,000 mm"},
      {...property(propertyType.WINDPROOF), rating: "4 CFM"},
      {...property(propertyType.INSULATING), rating: insulationType.REGULAR},
      {...property(propertyType.BREATHING), rating: "3 RET"}
    ],
    "genders": [gender.UNISEX],
    "sizes": [
      size.XS,
      size.S,
      size.M,
      size.L,
      size.XL,
    ],
    "colors": [
      color.GRAS_GREEN,
      color.BLACK,
      color.FOREST_GREEN,
    ],
    "imageUrl": (color) => `images/everyday_${colorUrl(color)}.png`,
    "imageDescription": "Breathable jacket with multiple zippers, hood and a cool zipper in the front"
  },

];

export default products;