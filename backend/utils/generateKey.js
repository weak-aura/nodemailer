module.exports.generateKey = () => {
  let key = '';
  for (let i = 0; i < 6; i++) {
    const digit = Math.floor(Math.random() * 10); // Генерируем случайную цифру от 0 до 9
    key += digit;
  }
  return parseInt(key);
}
