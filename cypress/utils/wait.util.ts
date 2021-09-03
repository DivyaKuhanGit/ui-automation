/**
 * @param getElement - element to keep trying to fetch before returning failure if timed out
 */
export function retryTillHappy(getElement: Function, maxRetryCount = 5) {
  () => {
    let counter = 0;
    do {
      counter++;
      try {
        console.log('starting retry logic');

        getElement({setTimeout:60000});

        break;
      } catch (e) {
        cy.wait(500);
        console.log(`Retry attempt : ${counter}`);
        // nope, not there
      }
    } while (counter < maxRetryCount);
  };
}
