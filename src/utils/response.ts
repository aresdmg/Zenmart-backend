class ApiResponse {
    statusCode: number;
    data: object;
    message: string;
    success: boolean;

    constructor(statusCode: number, data: Object, message: string = "Success") {
        this.statusCode = statusCode;
        this.message = message;
        this.success = true;
        this.data = data;
    }
}

class ApiError {
    statusCode: number;
    errors?: Error;
    message: string;
    success: boolean;

    constructor(statusCode: number, message: string = "Something went wrong", errors?: Error) {
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        if (errors) {
            this.errors = errors;
        }
    }
}

export { ApiResponse, ApiError } 