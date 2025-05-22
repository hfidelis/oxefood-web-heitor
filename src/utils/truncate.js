export default function truncate(value, length) {
  if (!value) {
    return '';
  }

  const stringValue = value.toString();

  if (stringValue.length <= length) {
    return stringValue;
  }

  return `${stringValue.slice(0, length)}...`;
}