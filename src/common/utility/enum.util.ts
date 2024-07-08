enum EAllAllowHttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

enum EUserStatus {
  ACTIVE = "Hoạt động",
  PENDING_VERIFICATION = "Chờ xác thực",
  LOCKED = "Bị khóa",
  DELETED = "Đã xóa",
}

enum ERole {
  "ADMIN" = "Quản trị viên",
  "USER" = "Người dùng",
}

enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

enum EErrorCode {
  "UNAUTHORIZED" = 401,
  "FORM_ERROR" = 420,
}
enum EPayment {
  "COD" = "Thanh toán khi nhận hàng",
  "VN_PAY" = "Ví VN Pay",
}

enum ELayoutProduct {
  "GRID" = "Lưới",
  "LIST" = "Danh sách",
}

export {
  EAllAllowHttpMethod,
  EUserStatus,
  ERole,
  EErrorCode,
  ELayoutProduct,
  EPayment,
  UserRole,
};
