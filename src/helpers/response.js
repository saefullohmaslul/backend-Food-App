const response = {
    success: (res,data,message) => {
        const result = {
            message: message,
            success: true,
            code: 200,
            data: data,
        }
        res.json(result)
    },
    failed: (res,data,message) => {
        const result = {
            message: message,
            success: false,
            code: 403,
            data: [],
        }
        res.json(result)
    }
}

module.exports = response