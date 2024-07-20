const createToken = () => {
    return (Math.round(Math.random() * 1000) )+ "" + Date.now()
}

module.exports = createToken