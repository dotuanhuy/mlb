export const API_VERSION = 'v1'
export const BACKEND_URL = 'http://localhost:8080'
export const path = {
    HOMEPAGE: '/',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    SYSTEM: '/system',
    LOGIN_SUCCESS: '/login-success',

    MANAGE: '/system/manage',
    MANAGE_USER: '/system/manage/user',
    MANAGE_USER_CREATE: '/system/manage/user/create',
    MANAGE_USER_EDIT: '/system/manage/user/edit',
    MANAGE_USER_DETAIL: '/system/manage/user/detail',

    MANAGE_CATEGORY_PRODUCT: '/system/manage/category',
    MANAGE_PRODUCT_TYPE: '/system/manage/product-type',
    MANAGE_PRODUCT_TYPE_UPDATE: '/system/manage/product-type/update',

    MANAGE_PRODUCTS: '/system/manage/products',
    MANAGE_PRODUCTS_SHOES: '/system/manage/products/shoes',
    MANAGE_PRODUCTS_SHOES_CREATE: '/system/manage/products/shoes/create',
    MANAGE_PRODUCTS_SHOES_EDIT: '/system/manage/products/shoes/edit',
    MANAGE_PRODUCTS_SHOES_DETAIL: '/system/manage/products/shoes/detail',

    MANAGE_PRODUCTS_BAG_BALO: '/system/manage/products/bag-balo',
    MANAGE_PRODUCTS_BAG_BALO_CREATE: '/system/manage/products/bag-balo/create',
    MANAGE_PRODUCTS_BAG_BALO_EDIT: '/system/manage/products/bag-balo/edit',
    MANAGE_PRODUCTS_BAG_BALO_DETAIL: '/system/manage/products/bag-balo/detail',

    MANAGE_PRODUCTS_HAT: '/system/manage/products/hat',
    MANAGE_PRODUCTS_HAT_CREATE: '/system/manage/products/hat/create',
    MANAGE_PRODUCTS_HAT_EDIT: '/system/manage/products/hat/edit',
    MANAGE_PRODUCTS_HAT_DETAIL: '/system/manage/products/hat/detail',

    MANAGE_PRODUCTS_CLOTHES: '/system/manage/products/clothes',
    MANAGE_PRODUCTS_CLOTHES_CREATE: '/system/manage/products/clothes/create',
    MANAGE_PRODUCTS_CLOTHES_EDIT: '/system/manage/products/clothes/edit',
    MANAGE_PRODUCTS_CLOTHES_DETAIL: '/system/manage/products/clothes/detail',

    MANAGE_DISCOUNT: '/system/manage/discount',
    MANAGE_DISCOUNT_CREATE: '/system/manage/discount/create',
    MANAGE_DISCOUNT_EDIT: '/system/manage/discount/edit',

    MANAGE_ORDER: '/system/manage/order',
    MANAGE_ORDER_DETAIL: '/system/manage/order/detail',

    MANAGE_REPORT: '/system/manage/report',

    // MANAGE_PRODUCTS_IMAGE_ADD: '/system/manage/products/add-image',
    // MANAGE_PRODUCTS_DESCRIPTION_ADD: '/system/manage/products/add-description',

    GIAY_MLB: '/giay-mlb',
    BIGBALL_CHUNKY: '/giay-mlb-bigball-chunky',
    MULE: '/giay-mlb-mule',
    CHUNKY_LINER: '/giay-mlb-chunky-liner',
    GIAY_MLB_PLAYBALL: '/giay-mlb-playball',
    CHUNKY_CLASSIC: '/giay-mlb-chunky-classic',
    CHUNKY_JOGGER: '/giay-mlb-chunky-jogger',
    SANDALS: '/dep-mlb',

    BACKPACK: '/balo-mlb',
    TUI_MLB: '/tui-mlb',
    BUCKET_BAG: '/tui-mlb-bucket-bag',
    HIP_SACK: '/tui-mlb-hip-stack',
    HOBO_BAG: '/tui-mlb-hobo-bag',
    CROSS_BAG: '/tui-mlb-cross-bag',
    TOTE_BAG: '/tui-mlb-tote-bag',
    PHONE_POUCH: '/tui-mlb-phone-pouch',

    MU_NON_MLB: '/mu-non-mlb',
    BALL_CAP: '/non-mlb-ball-cap',
    BUCKET: '/non-mlb-bucket-hat',
    SUN_CAP: '/non-mlb-sun-cap',

    OUTFIT_MLB: '/outfit-mlb',
    TSHIRT: '/ao-thun-mlb',
    SHORTS: '/quan-short-mlb',
    SKIRT_DRESS: '/chan-vay-dam-mlb',

    ACCOUNT: '/account',
    ACCOUNT_CHANGE_PASSWORD: '/account/changepassword',

    SEARCH_PRODUCT: '/search',
    FAVOURITE: '/favorite',
    CART: '/cart',

    TUTORIAL_SIZE: '/size-mlb',

    PRODUCT: '/product',

    CHECKOUT: '/checkout',
    ORDER_TRACKING: '/order-tracking',
    ORDER_TRACKING_DETAIL: '/order-tracking/detail'
}

export const allCode = {
    GENDER: 'GENDER',
    ROLE: 'ROLE',
    LOGO: 'LOGO',
    COLOR: 'COLOR',
    DISCOUNT: 'DISCOUNT',
    BRAND: 'BRAND',
    SIZEGIAY: 'SIZEGIAY',
    SIZEAO: 'SIZEAO'
}

export const Active = {
    SHOSE: 'Giày',
    BAG_BALO: 'Túi-balo',
    HAT: 'Mũ',
    CLOTHES: 'Quần-áo',
    CATEGORY: 'Category',
    PRODUCT_TYPE: 'Product type',
}

export const TitleProduct = {
    GS: 'Shoe',
    TB: 'Balo',
    MN: 'Hat',
    AQ: 'Clothes'
}

export const Role = {
    ADMIN: 'R1',
    USER: 'R2'
}

export const categorieType = {
    SHOES_SANDAL: 'GS',
    BAG_BALO: 'TB',
    HAT: 'MN',
    CLOTHES: 'AQ'
}


export const listShoesSandals = {
    SHOES: 'G1',
    SANDAL: 'G2'
}

export const listBag = {
    BALO: 'B1',
    BAG: 'B2'
}

export const listHat = {
    HAT1: 'M1',
    HAT2: 'M2'
}

export const listClothes = {
    SHIRT: 'A1',
    DRESS1: 'A2',
    SHORTS: 'A3',
    DRESS2: 'A4'
}

export const ListColorsProduct = {
    'Trắng': 'White',
    'Đen': 'Black',
    'Xám': 'Gray',
    'Nâu': 'Brown',
    'Xanh lam': 'Blue',
    'Xanh lục': 'Green',
    'Hồng': 'Pink',
    'Hồng nhạt': 'LightPink',
    'Đỏ': 'Red',
    'Cam': 'Orange',
    'Vàng': 'Yellow'
}

export const passwordLength = {
    minLength: 8,
    maxLength: 20
}

export const optionSortContant = {
    SORT_AZ: 'AZ',
    SORT_ZA: 'ZA',
    PRICE_LOW_TO_HIGH: 'lowToHigh',
    PRICE_HIGH_TO_LOW: 'highToLow',
}

export const LIMIT_HOME_SHOES = 8
export const limit_page = 5
export const limit_list_search = 4
export const LIMIT_SLIDER_PRODUCT = 9

export const typeShoesSandanl = {
    BIGBALL_CHUNKY: 'BigBall Chunky',
    MULE: 'Mule',
    CHUNKY_LINER: 'Chunky Liner',
    GIAY_MLB_PLAYBALL: 'Playball',
    CHUNKY_CLASSIC: 'Chunky Classic',
    GIAY_MLB_CHUNKY_RUNNRE: 'Chunky Runner',
    SANDALS: 'Sandal'
}

export const typeBagBalo = {
    BACKPACK: 'Balo',
    BUCKET_BAG: 'Bucket Bag',
    HIP_SACK: 'Hip Sack',
    HOBO_BAG: 'Hobo Bag',
    CROSS_BAG: 'Cross Bag',
    TOTE_BAG: 'Tote Bag',
    PHONE_POUCH: 'Phone Pouch'
}

export const typeHat = {
    BALL_CAP: 'Ball Cap',
    BUCKET_HAT: 'Bucket Hat',
    SUN_CAP: 'Sun Cap'
}

export const typeClothes = {
    TSHIRT: 'Áo',
    SHORTS: 'Quần',
    SKIRT_DRESS: 'Đầm, Váy',
}

export const typeStep = {
    DOWN: 'down',
    UP: 'up'
}

export const MAX_LENGTH_IMAGE = 12

export const SHIPPING_FEE = 35000

export const orderStatus = {
    WAIT_CONFIRMATION: 'wait confirmation',
    SHIPPING: 'shipping',
    FINISHED: 'finished',
}

export const orderStatusObj = {
    'wait confirmation': 'Chờ xác nhận',
    'shipping': 'Đang giao',
    'finished': 'Đã giao',
}

export const shippingMethod = {
    'express': 'Giao hàng hỏa tốc',
    'cod': 'Giao hàng tiêu chuẩn'
}

export const paymentMethod = {
    'paypal': 'Thanh toán qua paypal',
    'cod': 'Thanh toán khi nhận hàng'
}

export const GENDERS = [
    {
        value: 'Nam',
        label: 'Nam'
    },
    {
        value: 'Nữ',
        label: 'Nữ'
    },
    {
        value: 'Khác',
        label: 'Khác'
    }
]
export const KEY_ORDERID = 'TqbZCDy26E'
export const KEY_AES = 'hgfhfgsaadgf'

export const BEGIN_YEAR = 2023
export const NEXT_YEAR = 2

export const VARIABLE = {
    email: 'Email',
    password: 'Mật khẩu',
    rePassword: 'Mật khẩu',
    firstName: 'Họ',
    lastName: 'Tên',
    fullName: 'Họ và tên',
    phone: 'Số điện thoại',
    value: 'Mã giảm giá',
    price: 'Giá bán',
    birthDate: 'Ngày sinh',
    gender: 'Giới tính'
} 
