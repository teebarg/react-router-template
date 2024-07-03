class UnauthorizedError extends Error {
    status: number;
    constructor(message: string = "An error occurred, please contact an administrator", status: number = 500) {
        super(message);
        this.status = status;
    }
}

export default UnauthorizedError;
