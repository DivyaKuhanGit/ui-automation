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
