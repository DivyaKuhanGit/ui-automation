import { getEnumKeyByEnumValue } from "../../utils/enum.util";

export const elements = {
  // this is ugly, waiting for a data-cy tag on this
  languageControl: () => cy.get('[data-cy="language-menu"]'),
  userMenu: () => cy.get('[data-testid="MoreVertOutlinedIcon"]'),
  logOutMenuAction: () => cy.get("[data-cy=logout]"),
};

export const actions = {
  verifyLanguage(expectedLang: SupportedLanguage) {
    try {
      elements
        .languageControl()
        .invoke("text")
        .then((text1) => {
          expect(expectedLang).to.equal(
            mapStringToSupportedLang(text1 as any as string)
          );
        });
    } catch (e) {
      console.log(e);
    }

    return actions;
  },

  logOut() {
    elements.userMenu().click();
    elements.logOutMenuAction().click();

    return actions;
  },

  // setLanguage(lang: SupportedLanguage) {
  //   // TODO
  //   return this;
  // }
};

export enum SupportedLanguage {
  ENGLISH = "en",
  ENGLISH_BRITISH = "en-GB",
  FRENCH = "fr",
  JAPANESE = "ja",
  ROMANIAN = "ro",
  GREEK = "cy",
}

function mapStringToSupportedLang(mapMe: string): SupportedLanguage {
  let enumKey = getEnumKeyByEnumValue(SupportedLanguage, mapMe);
  return <any>SupportedLanguage[enumKey];
}
