export function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    const randomString = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  
    return randomString;
}