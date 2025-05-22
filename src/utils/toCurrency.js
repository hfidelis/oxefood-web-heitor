export default function toCurrency(value) {
  if (!value) {
    return ''
  }

  const OPTIONS = {
    style: 'currency',
    currency: 'BRL',
  }

  return new Intl.NumberFormat('pt-BR', OPTIONS).format(value)
}