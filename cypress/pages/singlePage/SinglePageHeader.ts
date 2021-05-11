export class SinglePageHeader {
  public isLoggedIn(): boolean {
    try {
      cy.get('[style="margin-left: auto;"] > .MuiButtonBase-root > .MuiButton-label').then(
        ($el) => {
          return Cypress.dom.isVisible($el);
        }
      );
    } catch (e) {
      console.log(e);
      // no log in button, so logged in assuming header is present at all
      return false;
    }
  }

  public clickLogin(): SinglePageHeader {
    cy.get('[class="MuiButton-label"]').click();
    return this;
  }

  public getLanguige(): SupportedLanguige {
    const langTag = '.jss3 > .MuiButtonBase-root > .MuiButton-label';

    try {
      cy.get(langTag)
        .invoke('text')
        .then((text1) => {
          console.log(`LAng = ${text1}`);
          return mapStringToSupportedLang((text1 as any) as string);
        });
    } catch (e) {
      console.log(e);
    }

    return undefined;
  }

  public setLanguige(lang: SupportedLanguige) {
    return this;
  }
}

export enum SupportedLanguige {
  ENGLISH = 'en',
  ENGLISH_BRITISH = 'en-GB',
  FRENCH = 'fr',
  JAPANESE = 'ja',
  ROMANIAN = 'ro',
  GREEK = 'cy'
}

// TODO: this is crying for a generic implimentation and a custom exception
export function mapStringToSupportedLang(mapMe: string): SupportedLanguige {
  console.log(`Trying to map = ${mapMe}`);
  let enumKey = getEnumKeyByEnumValue(SupportedLanguige, mapMe);

  console.log(`Final: = ${enumKey}`);

  return <any>SupportedLanguige[enumKey];
}

export function getEnumKeyByEnumValue(myEnum: any, enumValue: number | string): string {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : '';
}
