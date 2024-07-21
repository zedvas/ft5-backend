const getUsers = () => {
    return `SELECT * FROM users`
}

const addUser = (email,password) => {
    return `INSERT INTO users (email,password)
                VALUES ("${email}", "${password}");`
}

const getUserID = (email,password) => {
    return `SELECT id FROM users 
                WHERE email LIKE "${email}" AND password LIKE "${password}";`
}

const addToken = (id, token) => {
    return `INSERT INTO tokens (user_id, token)
                VALUES ("${id}", "${token}");`
}

const checkToken = (token) => {
    return `SELECT user_id 
                FROM tokens
                    WHERE token LIKE "${token}"`
}

const addMessage = (id, message) => {
    return `UPDATE users
                SET message = "${message}"
                    WHERE id = ${id}`
}

module.exports = {getUsers, addUser, getUserID, addToken, checkToken, addMessage}