class NotFoundData {
    constructor(message) {
        this.message = message;
        this.status = 404;
    }
}


class NotAuthError {
    constructor(message) {
        this.message = message;
        this.status = 401;
    }
}

exports.NotFoundData = NotFoundData;
exports.NotAuthError = NotAuthError;