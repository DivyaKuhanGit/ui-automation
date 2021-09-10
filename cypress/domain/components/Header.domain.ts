export const elements = {
  langControl: () => cy.get("header").get("button").find('span'),
};

export const actions = {
  verifyLanguige(expectedLang: SupportedLanguige) {
    try {
      elements
        .langControl()
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

  // setLanguige(lang: SupportedLanguige) {
  //   // TODO
  //   return this;
  // }
};

export enum SupportedLanguige {
  ENGLISH = "en",
  ENGLISH_BRITISH = "en-GB",
  FRENCH = "fr",
  JAPANESE = "ja",
  ROMANIAN = "ro",
  GREEK = "cy",
}

function mapStringToSupportedLang(mapMe: string): SupportedLanguige {
  let enumKey = getEnumKeyByEnumValue(SupportedLanguige, mapMe);
  return <any>SupportedLanguige[enumKey];
}

// TODO: move this to shared utils ? in this or separate package
function getEnumKeyByEnumValue(
  myEnum: any,
  enumValue: number | string
): string {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : "";
}
