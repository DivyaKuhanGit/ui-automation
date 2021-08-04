export function retryTillHappy(getElement: Function) {
  const retries = 5;
  let counter = 0;
  do {
    counter++;
    try {
      getElement();
      break;
    } catch (e) {
      cy.wait(500);
      // nope, not there
    }
  } while (counter < retries);
}
