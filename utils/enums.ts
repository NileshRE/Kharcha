enum AppRoutes {
  HOME = "/",
  EXPENSESDBOARD = "/dashboard/expenses",
  INVESTMENTSDBOARD = "/dashboard/investments",
  OUTSTANDINGSDBOARD = "/dashboard/outstandings",
  INCOMESDBOARD = "/dashboard/income",
  ADDROUTE = "/add",
  LOGIN = "/login",
  PROFILE = "/profile",
  NOTIFICATION = "/notification",
}

enum PaymentMode {
  CASH = "cash",
  ONLINE = "online",
  UPI = "upi",
  AUTO = "auto-debit",
  CARD = "card",
  NETBANKING = "net-banking",
  BANK = "bank",
}

enum OutstandingStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

enum OutstandingCategory {
  LENT = "lent",
  BORROWED = "borrowed",
}

enum OutstandingIcon {
  LENT = "arrow-up",
  BORROWED = "arrow-down",
}

enum CategoryIcon {
  FOOD = "food",
  AIRPLANE = "airplane",
  SHOPPING = "shopping",
  HEART_PULSE = "heart-pulse",
  MOVIE = "movie",
  SCHOOL = "school",
  YOUTUBE_SUBSCRIPTION = "youtube-subscription",
  CREDIT_CARD = "credit-card",
  PIGGY_BANK = "piggy-bank",
  GAMEPAD = "gamepad",
  WALLET = "wallet",
  LIGHTBULB = "lightbulb-on",
  FAMILY = "account-group",
  PET = "dog",
  HELP = "help-circle",
}

const CategoryIconMap: Record<string, string> = {
  Food: CategoryIcon.FOOD,
  Travel: CategoryIcon.AIRPLANE,
  Shopping: CategoryIcon.SHOPPING,
  Health: CategoryIcon.HEART_PULSE,
  Entertainment: CategoryIcon.MOVIE,
  Education: CategoryIcon.SCHOOL,
  Subscription: CategoryIcon.YOUTUBE_SUBSCRIPTION,
  Credit: CategoryIcon.CREDIT_CARD,
  Savings: CategoryIcon.PIGGY_BANK,
  Gaming: CategoryIcon.GAMEPAD,
  Wallet: CategoryIcon.WALLET,
  Utilities: CategoryIcon.LIGHTBULB,
  Family: CategoryIcon.FAMILY,
  Pet: CategoryIcon.PET,
  Other: CategoryIcon.HELP,
};

enum PaymentModesIcon {
  CASH = "cash",
  UPI = "qrcode-scan",
  CARD = "credit-card",
  BANK = "bank",
  WALLET = "wallet",
  OTHER = "help",
}

const PaymentModesIconMap: Record<string, string> = {
  cash: PaymentModesIcon.CASH,
  upi: PaymentModesIcon.UPI,
  card: PaymentModesIcon.CARD,
  bank: PaymentModesIcon.BANK,
  wallet: PaymentModesIcon.WALLET,
  other: PaymentModesIcon.OTHER,
};

export {
  AppRoutes,
  CategoryIcon,
  CategoryIconMap,
  OutstandingCategory,
  OutstandingIcon,
  OutstandingStatus,
  PaymentMode,
  PaymentModesIcon,
  PaymentModesIconMap,
};
