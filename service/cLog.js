require("../config/env")

const outPut = async (a, b, c) => {
    if (typeof(a) == "undefined"){
        a = ''
    }
    if (typeof(b) == "undefined"){
        b = ''
    }
    if (typeof(c) == "undefined"){
        c = ''
    }
    console.log(a, b, c)
}

module.exports = {
    outPut
}