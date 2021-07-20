import { LeftHandNavigationMenu } from './LeftHandNavigationMenu';

const LOCALIZATION_LANGUIGE_CONTROL = '.jss3 > .MuiButtonBase-root > .MuiButton-label';
const LOGIN_BUTTON = '[class="MuiButton-label"]';

export class SinglePageHeader {
  public validateLoggedOut() {
    cy.get('[style="margin-left: auto;"] > .MuiButtonBase-root > .MuiButton-label')
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('Login');
      });

    return this;
  }

  public clickLogin(): SinglePageHeader {
    cy.get('[class="MuiButton-label"]').click();
    return this;
  }

  public verifyLanguige(expectedLang: SupportedLanguige) {
    try {
      cy.get(LOCALIZATION_LANGUIGE_CONTROL)
        .invoke('text')
        .then((text1) => {
          expect(expectedLang).to.equal(mapStringToSupportedLang(text1 as any as string));
        });
    } catch (e) {
      console.log(e);
    }

    return this;
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

export enum LogInState {
  LOGED_IN,
  LOGGED_OUT
}

function mapStringToSupportedLang(mapMe: string): SupportedLanguige {
  let enumKey = getEnumKeyByEnumValue(SupportedLanguige, mapMe);
  return <any>SupportedLanguige[enumKey];
}

// TODO: move this to shared utils ? in this or separate package
function getEnumKeyByEnumValue(myEnum: any, enumValue: number | string): string {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : '';
}
