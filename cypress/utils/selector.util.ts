export function clickLiByEnumValue(cyGetElement: Function, enumStringValue: string) {
  let elementNotFound = true;
  cyGetElement()
    .find('li')
    .each(($el: { text: () => string; click: () => void; }) => {
      if ($el.text() === enumStringValue.trim()) {
        elementNotFound = false;
        $el.click();
      }
    })
    .then(() => {
      if (elementNotFound) {
        throw new Error(`Failed to find <li> element with value "${enumStringValue}"`);
      }
    });
}


export function findTableElementByContainingText(cyGetElement: Function, containsString: string) {
  let elementNotFound = true;
  cyGetElement()
    .find('tr')
    .each(($el: { text: () => string; click: () => void; }) => {
      console.log(`Looking at : ${$el.text()}`)
      if ($el.text() === containsString.trim()) {
        elementNotFound = false;
        return $el;
      }
    })
    .then(() => {
      if (elementNotFound) {
        throw new Error(`Failed to find <tr> element with value "${containsString}"`);
      }
    });
}
