export class EndpointUtil {
  public static NEST = {
    IDENTITY: {
      SERVER: {
        AUTH: "/api/auth",
        LOGOUT: "/api/auth/logout",
      },
      AUTH: {
        LOGIN: "/identity/auth/login",
        LOGOUT: "/identity/auth/logout",
        REFRESH_TOKEN: "/identity/auth/refresh-token",
        VERIFY_EMAIL: "/identity/auth/verify-email",
        REQUEST_VERIFY_ACCOUNT: "/identity/auth/request/verify",
        FORGOT_PASSWORD: "/identity/auth/forgot-password",
        RESET_PASSWORD: "/identity/auth/reset-password",
      },
      USER: {
        GET_ALL: "/identity/users",
        REGISTER: "/identity/users/register",
        GET_PROFILE: "/identity/users/profile",
        UPDATE_USER: "/identity/users/update",
        CHANGE_PASSWORD: "/identity/users/change-password",
        DELETE_USER: "/identity/users/delete",
        COUNT_USER: "/identity/users/count",
        GET_ALL_ADDRESS: "/identity/users/get/address",
      },
    },

    PRODUCT: {
      GET_ALL: "/product/get-all",
      GET_LIST: "/product",
      GET_BY_ID: "/product/get",
      GET_STOCK_BY_ID: "/product/get/stock",
      GET_BY_NAME: "/product/get/name",
      GET_BY_CATEGORY: "/product/get/category",
      GET_TOP_LEVEL_CATEGORY: "/product/category/top-level",
      GET_ALL_CATEGORY: "/product/category",
      GET_ALL_SUBCATEGORY: "/product/category/subcategory/all-level",
      CREATE_PRODUCT: "/product/create",
      UPDATE_PRODUCT: "/product/update",
      COUNT_PRODUCT: "/product/count",
    },
    CART: {
      GET_ALL: "/cart/items",
      ADD: "/cart/add",
      UPDATE: "/cart/update",
      REMOVE: "/cart/remove",
    },
    ORDER: {
      GET_ALL: "/order/orders",
      CREATE_ORDER: "/order/create",
      GET_URL_PAYMENT_VNPAY: "/order/get-link-payment",
      GET_ALL_PAYMENT_METHOD: "/order/methods",
      GET_BY_EMAIL: "/order/get/email",
      GET_BY_STATUS: "/order/get/status",
      GET_BY_EMAIL_AND_STATUS: "/order/get/email/status",
      UPDATE_STATUS: "/order/update/status",
    },
    STATISTIC: {
      GET_TOTAL_ORDER_COUNT_BY_STATUS: "/statistic/total-order",
      REVENUE_STATISTIC: "/statistic/revenue",
      ORDER_STATISTIC: "/statistic/order",
    },
    ADDRESS_DATA: {
      GET_ADDRESS_DATA_BY_PARENT_CODE: "/address/get/data",
    },
    ADDRESS: {
      CREATE_ADDRESS: "/address/user/create",
      GET_ALL_BY_USER_EMAIL: "/address/user",
      GET_DEFAULT_ADDRESS: "/address/user/default",
      UPDATE_ADDRESS: "/address/user/update",
      UPDATE_DEFAULT_ADDRESS: "/address/user/update/default",
      DELETE_ADDRESS: "/address/user/delete",
    },
  };
}
