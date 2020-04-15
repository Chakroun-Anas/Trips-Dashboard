/*
 * Turn the map<String, Object> to an Object so it can be converted to JSON
 */
export function mapToObj(inputMap: Map<any, any>) {
  let obj: any = {};
  inputMap.forEach(function (value, key) {
    obj[key] = value;
  });
  return obj;
}
