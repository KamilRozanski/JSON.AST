function astConverter(obj) {
  if (!obj.ast) {throw new Error(`Object not supported. Object includes no AST construction!`)}
  else {
    let htmlArr1 = [];
    let htmlArr2 = [];
    
    const createHtml = ast => {
      
      if (ast.attributes) {
        const atr = attributesConverter(ast.attributes)
        const openingTag = `<${ast.tagName}${atr}>`;
        const closingTag = `</${ast.tagName}>`
        if (ast.children) {
          htmlArr1.push(openingTag)
          htmlArr2.unshift(closingTag)
          childrenConverter(ast.children)
        }
        else {
          htmlArr1.push(openingTag, closingTag)
        }
      }
      else {
        const openingTag = `<${ast.tagName}>`;
        const closingTag = `</${ast.tagName}>`
        if (ast.children) {
          htmlArr1.push(openingTag)
          htmlArr2.unshift(closingTag)
          childrenConverter(ast.children)
        }
        else {
          htmlArr1.push(openingTag, closingTag)
        }
      }
      
    }

    const attributesConverter = attributes => {
      let result = '';
      attributes.forEach(obj => result += ` ${obj.name}="${obj.value}"`)
      return result
    }

    const childrenConverter = children => {
      return children.forEach(el => {
        el.nodeType === 'text' ? htmlArr1.push(el.value) : createHtml(el)})
    }
    
    createHtml(obj.ast)
    return htmlArr1.concat(htmlArr2).join('')
  }
}

const obj = {
  "ast": {
    "nodeType": "element",
    "tagName": "div",
    "attributes": [
      {
        "name": "class",
        "value": "profile"
      },
    ],
    "children": [
      {
        "nodeType": "element",
        "tagName": "img",
        "attributes": [
          {
            "name": "class",
            "value": "profile__avatar"
          },
          {
            "name": "src",
            "value": "https://www.thispersondoesnotexist.com/image"
          },
          {
            "name": "alt",
            "value": "Avatar"
          }
        ]
      },
      {
        "nodeType": "element",
        "tagName": "div",
        "attributes": [
          {
            "name": "class",
            "value": "profile__details"
          }
        ],
        "children": [
          {
            "nodeType": "element",
            "tagName": "p",
            "attributes": [
              {
                "name": "class",
                "value": "profile__name"
              }
            ],
            "children": [
              {
                "nodeType": "text",
                "value": "John Doe"
              }
            ]
          },
          {
            "nodeType": "element",
            "tagName": "p",
            "attributes": [
              {
                "name": "class",
                "value": "profile__phone"
              }
            ],
            "children": [
              {
                "nodeType": "text",
                "value": "+48 123 456 789"
              }
            ]
          },
          {
            "nodeType": "element",
            "tagName": "p",
            "attributes": [
              {
                "name": "class",
                "value": "profile__link"
              }
            ],
            "children": [
              {
                "nodeType": "element",
                "tagName": "a",
                "attributes": [
                  {
                    "name": "href",
                    "value": "https://przeprogramowani.pl/o-nas"
                  }
                ],
                "children": [
                  {
                    "nodeType": "text",
                    "value": "Zobacz więcej"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector("body").innerHTML = astConverter(obj);
}, false);