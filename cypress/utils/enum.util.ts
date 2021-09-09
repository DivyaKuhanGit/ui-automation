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
