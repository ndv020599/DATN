const omitPasswordHelper = {
    omitPasswordList: (data) => {
        return data.map(item => {
            const {password, ...userWithoutPassword} = item
            return userWithoutPassword
        })
    }
}

module.exports = omitPasswordHelper;