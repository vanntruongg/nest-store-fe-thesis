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
      },
      USER: {
        GET_ALL: "/identity/users",
        REGISTER: "/identity/users/register",
        GET_PROFILE: "/identity/users/profile",
        UPDATE_USER: "/identity/users/update",
        CHANGE_PASSWORD: "/identity/users/change-password",
        DELETE_USER: "/identity/users/delete",
        ACTIVE_ACCOUNT: "/identity/users/active",
        COUNT_USER: "/identity/users/count",
        GET_ALL_ADDRESS: "/identity/users/get/address",
        SEARCH_BY_NAME: "/identity/users/search/name",
        FORGOT_PASSWORD: "/identity/users/forgot-password",
        RESET_PASSWORD: "/identity/users/reset-password",
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
      CATEGORY: {
        CREATE: "/product/category/create",
        UPDATE: "/product/category/update",
        GET_ALL: "/product/category",
        GET_ALL_PARENT_BY_ID: "/product/category/get/all-parent",
      },
      SEARCH_BY_NAME: "/product/search/name",
    },
    CART: {
      GET_ALL: "/cart/items",
      GET_BY_PRODUCT_ID: "/cart/items/product-id",
      COUNT: "/cart/count",
      ADD: "/cart/add",
      UPDATE: "/cart/update",
      DELETE: "/cart/delete",
    },
    ORDER: {
      GET_ALL: "/order/orders",
      CREATE_ORDER: "/order/create",
      GET_URL_PAYMENT_VNPAY: "/order/get-link-payment",
      GET_ALL_PAYMENT_METHOD: "/order/payment-method",
      GET_MY_ORDER: "/order/get/my-order",
      GET_BY_STATUS: "/order/get/status",
      GET_BY_USER_AND_STATUS: "/order/get/user/status",
      UPDATE_STATUS: "/order/update/status",
      SEARCH_BY_ID: "/order/search",
    },
    ORDER_PAYMENT: {
      GET_BY_ORDER_ID: "/payments/get/order",
      GET_ALL_PAYMENT_METHOD: "/order/payment-method",
    },
    PAYMENT: {
      VN_PAY: "/payments/create/vnpay",
    },
    STATISTIC: {
      GET_TOTAL_ORDER_COUNT_BY_STATUS: "/order/statistic/total-order",
      REVENUE: "/order/statistic/revenue",
      ORDER_STATISTIC: "/order/statistic/order",
      EXPORT_CSV_MONTHLY_STATS_ORDER:
        "order/statistic/export-csv-monthly-stats",
    },
    ADDRESS_DATA: {
      GET_ADDRESS_DATA_BY_PARENT_CODE: "/address/get/data",
    },
    ADDRESS: {
      USER: {
        CREATE_ADDRESS: "/address/user/create",
        GET_ALL_BY_USER_EMAIL: "/address/user",
        GET_DEFAULT_ADDRESS: "/address/user/default",
        UPDATE_ADDRESS: "/address/user/update",
        UPDATE_DEFAULT_ADDRESS: "/address/user/update/default",
        DELETE_ADDRESS: "/address/user/delete",
      },
      ORDER: {
        GET_DELIVERY_ADDRESS: "/address/order/get",
      },
    },
    INVENTORY: {
      GET_BY_PRODUCT_ID: "/inventory/get",
      UPDATE: "/inventory/update",
      GET_BY_PRODUCT_ID_AND_SIZE: "/inventory/get/size/id",
    },
    RATING: {
      GET_RATING_LIST: "/ratings/get/products",
      CREATE_RATING: "/ratings",
      DELETE_RATING: "/ratings/delete",
      UPVOTE_RATING: "/ratings/upvote",
      MOST_UPVOTE_RATING: "/ratings/get/product",
      GET_AVERAGE_STAR_OF_PRODUCT: "/ratings/get/product",
      GET_RATING_STAR_PERCENTAGE: "/ratings/get/product",
    },
    AI: {
      ORDER: {
        PREDICTION: "/ai/order/predict",
      },
      REVENUE: {
        PREDICTION: "/ai/revenue/predict",
      },
    },
  };
}
