import React from 'react';

var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export default function formateNumber(number){

    var tier = Math.log10(Math.abs(number)) / 3 | 0;
    if(tier == 0) return number;
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;
    return scaled.toFixed(0) + suffix;
}


export function truncateReactElements(elements, maxChars) {
    let totalChars = 0;
    const result = [];
  
    for (const el of elements) {
      if (typeof el === 'string') {
        if (totalChars >= maxChars) break;
        const remaining = maxChars - totalChars;
        if (el.length <= remaining) {
          result.push(el);
          totalChars += el.length;
        } else {
          result.push(el.substring(0, remaining));
          totalChars += remaining;
          break;
        }
      } else if (React.isValidElement(el)) {
        const children = React.Children.toArray(el.props.children);
        const truncatedChildren = truncateReactElements(children, maxChars - totalChars);
        if (truncatedChildren.length > 0) {
          result.push(React.cloneElement(el, {}, truncatedChildren));
          // подсчет символов внутри
          const countChars = (child) =>
            typeof child === 'string'
              ? child.length
              : React.Children.toArray(child.props.children).reduce((sum, c) => sum + countChars(c), 0);
          totalChars += truncatedChildren.reduce((sum, c) => sum + countChars(c), 0);
        }
      }
    }
  
    return result;
  }