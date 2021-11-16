const maxRecursionDepth = 30;

export function loadAllPages(pages: number, level = 0): any {
  if (level > maxRecursionDepth || pages > maxRecursionDepth) {
    throw `Exceeded recursion depth of ${maxRecursionDepth}`;
  }
  if (level >= pages) {
    return;
  }

  return cy
    .get('button:not([disabled])[data-cy*="-load-more-button"]')
    .then((e) => {
      cy.wrap(e).click();
      return loadAllPages(pages, level + 1);
    });
}

export type GenericTotalItemsResponse = {
  body: {
    totalItems: number;
  };
};
