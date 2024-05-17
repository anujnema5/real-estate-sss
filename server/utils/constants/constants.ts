/* Validation related constants */
export const USERNAME_NOT_FOUND = "User name can't be empty.";
export const USERLASTNAME_NOT_FOUND = "User last name can't be empty.";
export const USERID_NOT_FOUND = "User Id can't be empty.";
export const EMAIL_NOT_FOUND = "Email can't be empty.";
export const GENDER_NOT_FOUND = "Gender can't be empty.";
export const PASSWORD_NOT_FOUND = "Password can't be empty.";
export const USER_NOT_FOUND = "User does not exist.";
export const VENDOR_NOT_FOUND = "Vendor not found"
export const ADMIN_NOT_FOUND = "Admin not found"
export const SUBSCRIPTION_NOT_FOUND = "Subscription not found"
export const PACKAGE_NOT_FOUND = "Package not found";
export const ADMIN_ALREADY_EXIST = "Admin already exist";
export const SOMETHING_WENT_WRONG_GENERATING_TOKEN = "Something went wrong while generating the token."

/* General Errors constants */
export const ROUTE_NOT_FOUND = "You are at the wrong place.";
export const SERVER_ERROR_MESSAGE = "Something bad happened. It's not you, it's me.";
export const MIDDLEWARE_NOT_FOUND = "Developer alert!! Please initialize middleware";

// 2xx Success
export const OK_HTTP_CODE = 200;
export const CREATED_HTTP_CODE = 201;
export const ACCEPTED_HTTP_CODE = 202;
export const NO_CONTENT_HTTP_CODE = 204;

// 3xx Redirection
export const MOVED_PERMANENTLY_HTTP_CODE = 301;
export const FOUND_HTTP_CODE = 302;
export const NOT_MODIFIED_HTTP_CODE = 304;

// 4xx Client Errors
export const BAD_REQUEST_HTTP_CODE = 400;
export const UNAUTHORIZED_HTTP_CODE = 401;
export const FORBIDDEN_HTTP_CODE = 403;
export const NOT_FOUND_HTTP_CODE = 404;
export const METHOD_NOT_ALLOWED_HTTP_CODE = 405;
export const CONFLICT_HTTP_CODE = 409;

// 5xx Server Errors
export const INTERNAL_SERVER_ERROR_HTTP_CODE = 500;
export const NOT_IMPLEMENTED_HTTP_CODE = 501;
export const BAD_GATEWAY_HTTP_CODE = 502;
export const SERVICE_UNAVAILABLE_HTTP_CODE = 503;
export const GATEWAY_TIMEOUT_HTTP_CODE = 504;
export const HTTP_VERSION_NOT_SUPPORTED_HTTP_CODE = 505;

/* Route related constants */
export const USER_REGISTRATION_OK = "User registration successful.";
export const USER_REGISTRATION_FAILED = "User registration unsuccessful.";
export const USER_LOGIN_OK = "User logged in.";
export const USER_LOGIN_FAILED = "User logged in failed";

/* Other common message constants */
export const RESOURCE_NOT_FOUND = "Resource not found.";
export const INTERNAL_SERVER_ERROR = "Internal server error.";
export const UNAUTHORIZED_ACCESS = "Unauthorized access.";
export const INVALID_REQUEST = "Invalid request.";
export const OPERATION_SUCCESSFUL = "Operation successful.";
export const OPERATION_FAILED = "Operation failed.";

/* Success messages */
export const DATA_FETCHED_SUCCESSFULLY = "Data fetched successfully.";
export const RECORD_CREATED_SUCCESSFULLY = "Record created successfully.";
export const RECORD_UPDATED_SUCCESSFULLY = "Record updated successfully.";
export const RECORD_DELETED_SUCCESSFULLY = "Record deleted successfully.";
export const FILE_UPLOADED_SUCCESSFULLY = "File uploaded successfully.";
export const OPERATION_COMPLETED_SUCCESSFULLY = "Operation completed successfully.";

/* Error messages */
export const DATA_FETCH_FAILED = "Failed to fetch data.";
export const RECORD_CREATION_FAILED = "Failed to create record.";
export const RECORD_UPDATE_FAILED = "Failed to update record.";
export const RECORD_DELETION_FAILED = "Failed to delete record.";
export const FILE_UPLOAD_FAILED = "File upload failed.";
export const OPERATION_FAILED_GENERIC = "Operation failed.";

/* Authentication and Authorization messages */
export const LOGIN_SUCCESSFUL = "Login successful.";
export const LOGIN_FAILED = "Login failed.";
export const LOGOUT_SUCCESSFUL = "Logout successful.";
export const UNAUTHORIZED_ACCESS_MESSAGE = "Unauthorized access. Please log in.";
export const PERMISSION_DENIED_MESSAGE = "Permission denied.";
export const REFERESH_TOKEN_NOT_FOUND = "Referesh token not found";
export const NON_VALID_REFERESH_TOKEN = "Referesh token is not valid";
export const TOKEN_EXPIRE_OR_USED = "Token already expire or used previously"
export const TOKEN_REFERESHED = "Token successfully refereshed"

/* Validation and Input messages */
export const INVALID_INPUT = "Invalid input. Please check your input data.";
export const MISSING_REQUIRED_FIELDS = "Missing required fields.";
export const INVALID_CREDENTIALS = "Invalid credentials.";
export const EMAIL_ALREADY_EXISTS = "Email already exists.";
export const USERNAME_ALREADY_EXISTS = "Username already exists.";
export const INCORRECT_PASSWORD = "Incorrect Password"
export const PASSWORD_TOO_WEAK = "Password is too weak.";
export const EMAIL_PASSWORD_REQUIRED  = "Email and Password required for login"
export const EMAIL_PHONENUMBER_REQUIRED  = "Invalid email and phone number"
export const USERNAME_OR_EMAIL_REQUIRED = "Username or email is required."
export const COULDNT_FOUND_YOU_ACCOUNT = "couldn't found your account"
export const BLOCKED_ACCOUNT = "Sorry your account is blocked"

/* General messages */
export const PAGE_NOT_FOUND = "Page not found.";
export const BOOKING_NOT_FOUND = "Booking not found"
export const UNDER_MAINTENANCE = "Under maintenance. Please try again later.";
export const INVALID_OPERATION = "Invalid operation.";
export const NETWORK_ERROR = "Network error. Please check your connection.";
export const RESOURCE_LIMIT_EXCEEDED = "Resource limit exceeded.";
export const UNEXPECTED_ERROR = "An unexpected error occurred.";

/* APP Specific messages */
export const BOOKING_CANCALLED_SUCCESS = "Booking cancelled successfully.";
export const BOOKING_ALREADY_REJECTED_BY_VENDOR = "Booking is already rejected by vendor."
export const BOOKING_ALREADY_EXIST = "Booking already exist."
export const BOOKING_CREATED_SUCCESS = "Booking created successfully."
export const CONFLICTING_THE_RECORD = "You are conflicting the record"
export const CONFLICTING_THE_VENDOR_AND_PROPERTYID = "You are conflicting vendor and propertyId"
export const PROPERTY_DONT_EXIST = "property does not exist";