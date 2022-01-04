import { createStore } from '@/utils/store-util';

export const [useData, updateData] = createStore({
  "elements": [
    {
      "id": 0,
      "name": "page",
      "type": [
        "page0",
        "page1"
      ],
      "selectedtype": 0,
      "pagearray": [
        [

        ]
      ],
      "pagelayoutarray":[
        [
          25,25,25,25,
          25,25,25,25
        ]
      ],
      "pagestylearray":[
        {"backgroundimg":"", "backgroundcolor":"#F0F2F5"}
      ],
      "canchild":[0],
      "deletedpage":[],
    }
  ],
  "templates":[
    {
      "id": 0,
      "name": "organism",
      "pageid": 0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "type": [
        "content-container",
        "left-side-bar",
        "top-bar-black",
        "top-bar-white"
      ],
      "selectedtype": 0,
      "canchild": [1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      "grid":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"],
      "selectedgrid":0,
      "selectedarea":[0],
      "style":"",
      "comptype":"master",
      "complevel":"organism",
      "showtree":true,
      "dir": null,
      "statedir":null
    },
    {
      "id": 1,
      "name": "moleculecontainer",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],

      "type": [
        "molecule-container"
      ],
      "selectedtype": 0,
      "childarray": [],
      "canchild": [2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      "style":"",
      "comptype":"master",
      "complevel":"",
      "showtree":false,
      "dir": null,
      "statedir":null
    },
    {
      "id": 2,
      "name": "molecule",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "type": [
        "card",
        "item",
        "space-between-item"
      ],
      "selectedtype": 0,
      "canchild": [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      "style":"",
      "comptype":"master",
      "complevel":"molecule",
      "showtree":true,
      "dir": null,
      "statedir":null
    },
    {
      "id": 3,
      "name": "container",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "type": [
        "label-row",
        "item-column",
        "img-grid"
      ],
      "selectedtype": 0,
      "childarray": [],
      "canchild": [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      "style":"",
      "comptype":"master",
      "complevel":"",
      "showtree":false,
      "dir": null,
      "statedir":null
    },
    {
      "id": 4,
      "name": "subcontainer",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "type": [
        "label-row",
        "item-column",
        "img-grid"
      ],
      "selectedtype": 0,
      "childarray": [],
      "canchild": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      "style":"",
      "comptype":"master",
      "complevel":"",
      "showtree":false,
      "dir": null,
      "statedir":null
    },
    {
      "id": 5,
      "name": "img",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "type": [
        "card-img",
        "fit-container-height-img",
        "img-container"
      ],
      "selectedtype": 0,
      "img":"",
      "style":"",
      "comptype":"master",
      "complevel":"atom",
      "showtree":false,
      "dir": null,
      "statedir":null
    },
    {
      "id": 6,
      "name": "text",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "type": [
        "card-title",
        "regular-btn"
      ],
      "selectedtype": 0,
      "input": "这里",
      "style":"",
      "comptype":"master",
      "complevel":"atom",
      "showtree":false,
      "dir": null,
      "statedir":null
    },
    {
      "id": 7,
      "name": "atom",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "type": [
        "card-title",
        "regular-btn"
      ],
      "selectedtype": 0,
      "input": "这里",
      "style":"",
      "img": ["muse", "logo"],
      "whichimg":0,
      "canchild": [5, 6],
      "comptype":"master",
      "complevel":"atom",
      "showtree":true,
      "dir": null,
      "statedir":null
    },
    {
      "id": 8,
      "name": "generalcheckablecard",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "option" :{
        "size": ["small", "default", "large'"],
        "type": ["round", "circle"],
        "border": [0, 1, 2]
      },
      "childarray": [],
      "canchild": [3, 4, 5, 6, 7, 12, 14, 15, 16, 19],
      "comptype":"general",
      "complevel":"molecule",
      "showtree":true,
      "dir": null,
      "statedir":null
    },
    {
      "id": 9,
      "name": "generalmenu",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "type": [
        "menu"
      ],
      "selectedtype": 0,
      "alloptions" :{
        "theme":{
          "index":0, 
          "options":[
            "dark", 
            "light"
          ]
        }
      },
      "childarray": [],
      "canchild": [10, 11],
      "selectedkey": null,
      "comptype":"general",
      "complevel":"atom",
      "showtree":true,
      "dir": null,
      "statedir":null
    },
    {
      "id": 10,
      "name": "generalsubmenu",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "type": [
        "submenu"
      ],
      "selectedtype": 0,
      "childarray": [],
      "canchild": [11],
      "input": "PNG12",
      "comptype":"general",
      "complevel":"",
      "showtree":true,
      "dir": null,
      "statedir":null
    },
    {
      "id": 11,
      "name": "generalmenuitem",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "type": [
        "menuitem"
      ],
      "selectedtype": 0,
      "input": "PNG12",
      "comptype":"general",
      "complevel":"",
      "showtree":true,
      "dir": null,
      "statedir":null
    },
    {
      "id": 12,
      "name": "generalbreadcrumb",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "option" :{
        "size": ["small", "default", "large'"],
        "type": ["round", "circle"],
        "border": [0, 1, 2]
      },
      "childarray": [],
      "canchild": [19],
      "selectedcrumb": null,
      "comptype":"general",
      "complevel":"atom",
      "showtree":true,
      "dir": null,
      "statedir":null
    },
    {
      "id": 13,
      "name": "generalbreadcrumbitem",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "option" :{
        "size": ["small", "default", "large'"],
        "type": ["round", "circle"],
        "border": [0, 1, 2]
      },
      "input":"cao",
      "comptype":"general",
      "complevel":"",
      "showtree":true,
      "dir": null,
      "statedir":null
    },
    {
      "id": 14,
      "name": "generalbutton",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "alloptions":{
        "size":{
          "index":0, 
          "options":[
            "xs", 
            "small", 
            "defualt", 
            "large"
          ]
        },
        "ghost":{
          "index":0, 
          "options":[
            "default", 
            "solid", 
            "dashed", 
            "reverse", 
            "text", 
            "text-hover"
          ]
        },
        "shape":{
          "index":0, 
          "options":[
            "round", 
            "oval", 
            "circle", 
            "square"
          ]
        },
        "level":{
          "index":0, 
          "options":[
            "primary", 
            "neutral", 
            "danger"
          ]
        }
      },
      "input":"button",
      "comptype":"general",
      "complevel":"atom",
      "showtree":true,
      "dir": null,
      "statedir":null
    },
    {
      "id": 15,
      "name": "generalinput",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "input": "search text",
      "comptype":"general",
      "complevel":"atom",
      "showtree":true,
      "dir": null,
      "statedir":null
    },
    {
      "id": 16,
      "name": "mastertree",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "type": [
        "submenu"
      ],
      "selectedtype": 0,
      "childarray": [],
      "canchild": [17, 18],
      "selectedkey":null,
      "input": "PNG12",
      "style":"",
      "comptype":"master",
      "complevel":"atom",
      "showtree":true,
      "dir": null,
      "statedir":null
    },
    {
      "id": 17,
      "name": "mastertreenode",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "type": [
        "submenu"
      ],
      "selectedtype": 0,
      "childarray": [],
      "canchild": [18],
      "input": "PNG12",
      "open": true,
      "style":"",
      "comptype":"",
      "dir": null,
      "statedir":null
    },
    {
      "id": 18,
      "name": "mastertreeleaf",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "type": [
        "submenu"
      ],
      "selectedtype": 0,
      "input": "PNG12",
      "style":"",
      "comptype":"master",
      "complevel":"",
      "dir": null,
      "statedir":null
    },
    {
      "id": 19,
      "name": "generalpagination",
      "parentid": 0,
      "parentstate":0,
      "state":[[]],
      "whichstate":0,
      "deletedstate":[],
      "input": "20",
      "default": 2,
      "comptype":"general",
      "complevel":"atom",
      "showtree":true,
      "dir": null,
      "statedir":null
    }
  ],
  
  selected:0,
  selectedtemplate:0,
  edit: false,
  whicheditor:"elements",
  whichpage:0,
  whichstate:0,
  pretempnum:0,
  preelenum:0
});
