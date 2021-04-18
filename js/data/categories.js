import { IconHiking, IconDowhill, IconRunning, IconSkiing, IconSnowboard, IconCanoeing } from "../templates/svgIcons.js"

export const insulationType = {
  REGULAR: "Regular (15°C/5°C)",
  ENHANCED: "Enhanced (10°C/-5°C)",
  OPTIMUM: "Optimum (0°C/-20°C)"
}

export const propertyType = {
  WINDPROOF: "Windproof",
  WATERPROOF: "Waterproof",
  INSULATING: "Insulating",
  BREATHING: "Breathing"
}

export const size = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL"
}

export const gender = {
  WOMAN: "Woman",
  MAN: "Man",
  UNISEX: "Unisex"
}

export const jacketType = {
  RUNNING: {
    "name":"Running", 
    "icon": IconRunning
  },
  SKIING: {
    "name": "Skiing",
    "icon": IconSkiing
  },
  DOWNHILL: {
    "name": "Down hill skiing",
    "icon": IconDowhill
  },
  HIKING: {
    "name": "Hiking",
    "icon": IconHiking
  },
  CANOEING: {
    "name": "Canoeing",
    "icon": IconCanoeing
  },
  SNOWBOARD: {
    "name": "Snowboard",
    "icon": IconSnowboard
  }
};

export const color = {
  PLUM_PURPLE: { 
    "id": "plum_purple",
    "name": "Plum Purple",
    "hex": "#69404F"
  },
  PACIFIC_BLUE: { 
    "id": "pacific_blue",
    "name": "Pacific Blue",
    "hex": "#295868"
  },
  FOREST_GREEN: {
    "id": "forest_green" ,
    "name": "Forest Green",
    "hex": "#42541F"
  },
  BLACK: {
    "id": "black" ,
    "name": "Black",
    "hex": "#1D1D1D"
  },
  GRAS_GREEN: {
    "id": "gras_green" ,
    "name": "Gras Green",
    "hex": "#718D2D"
  },
  MUSTARD: {
    "id": "mustard" ,
    "name": "Mustard",
    "hex": "#BE6607"
  },
  DUST_BLUE: {
    "id": "dust_blue" ,
    "name": "Dust Blue",
    "hex": "#3A4656"
  }
};