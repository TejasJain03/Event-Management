const generateRandomID = () => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let randomID = ''
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomID += characters[randomIndex]
  }
  return randomID
}

module.exports=generateRandomID