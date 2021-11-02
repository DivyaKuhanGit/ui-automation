export function extractKeysFromStringEnum(theEnum: any): string[] {
  let result: string[] = [];
  for (var enumMember in theEnum) {
    var isValueProperty = parseInt(enumMember, 10) >= 0;
    if (isValueProperty) {
      result.push(theEnum[enumMember]);
    }
  }

  return result;
}


export function getEnumKeyByEnumValue(
  myEnum: any,
  enumValue: number | string
): string {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : "";
}
