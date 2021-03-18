const insulationType = {
  REGULAR: "Regular (15°C/5°C)",
  ENHANCED: "Enhanced (10°C/-5°C)",
  OPTIMUM: "Optimum (0°C/-20°C)"
}

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

export const propertyType = {
  WINDPROOF: "Windproof",
  WATERPROOF: "Waterproof",
  INSULATING: "Insulating",
  BREATHING: "Breathing"
}

export const size = {
  XS: "SX",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL"
}

export const gender = {
  WOMEN: "Women",
  MEN: "Men",
  UNISEX: "Unisex"
}

export const jacketType = {
  RUNNING: "Running",
  SKIING: "Skiing",
  DOWNHILL: "Down hill skiing",
  HIKING: "Hiking",
  CANOEING: "Canoeing",
  SNOWBOARD: "Snowboard"
}

export const color = {
  PLUM_PURPLE: { 
    "name": "Plum Purple",
    "hex": "#9c51b6"
  },
  PACIFIC_BLUE: { 
    "name": "Pacific Blue",
    "hex": "#9c51b6"
  }
}

const colorUrl = (color) => color.name.replaceAll(/\s/ig, "_");

export const findJacketById = (id) => 
    products.find(product => product.id === id);

const products = [
  {
    "id": "J01",
    "name": "Tonekollen",
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
    "name": "Blåhø",
    "discountPercentage": 30,
    "price": 3500,
    "jacketType": jacketType.HIKING,
    "propities": [
      property(propertyType.WATERPROOF),
      property(propertyType.WINDPROOF),
      property(propertyType.BREATHING),
    ],
    "genders": [gender.MEN, gender.WOMEN],
    "sizes": [
      size.S,
      size.M,
      size.L,
    ],
    "colors": [
      color.PACIFIC_BLUE,
      color.PLUM_PURPLE
    ],
    "imageUrl": (color) => `images/hiking_${colorUrl(color)}.png`,
    "imageDescription": "Long sleves and a high neck with a cool zipper in the front"
  }
];

export default products;