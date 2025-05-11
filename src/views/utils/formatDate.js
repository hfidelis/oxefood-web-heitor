export default function formatDate(dataParam) {
  if (!dataParam) {
    return "";
  }

  let arrayData = dataParam.split("-");

  return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
}