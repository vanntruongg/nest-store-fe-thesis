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

enum ELayoutProduct {
  "GRID" = "Lưới",
  "LIST" = "Danh sách",
}

enum EPaymentMethod {
  COD = "COD",
  VNPAY = "VNPAY",
}

export {
  EAllAllowHttpMethod,
  EUserStatus,
  ERole,
  EErrorCode,
  ELayoutProduct,
  UserRole,
  EPaymentMethod,
};
