import {
  Category,
  CategoryIcon,
  OutstandingCategory,
  OutstandingIcon,
  SubCategory,
} from "./enums";

export const CategorySubCategoryMap: Record<Category, SubCategory[]> = {
  [Category.FOOD]: [
    SubCategory.GROCERIES,
    SubCategory.RESTAURANTS,
    SubCategory.SNACKS,
    SubCategory.COFFEE,
  ],
  [Category.TRAVEL]: [
    SubCategory.FUEL,
    SubCategory.FLIGHT,
    SubCategory.TRAIN,
    SubCategory.BUS,
    SubCategory.CAB,
    SubCategory.TOLLS,
  ],
  [Category.SHOPPING]: [
    SubCategory.CLOTHING,
    SubCategory.ELECTRONICS,
    SubCategory.HOME,
    SubCategory.GIFTS,
  ],
  [Category.UTILITIES]: [
    SubCategory.ELECTRICITY,
    SubCategory.WATER,
    SubCategory.INTERNET,
    SubCategory.MOBILE,
    SubCategory.GAS,
  ],
  [Category.HEALTH]: [
    SubCategory.MEDICINES,
    SubCategory.DOCTOR,
    SubCategory.INSURANCE,
  ],
  [Category.EDUCATION]: [
    SubCategory.TUITION,
    SubCategory.BOOKS,
    SubCategory.COURSES,
  ],
  [Category.ENTERTAINMENT]: [
    SubCategory.MOVIES,
    SubCategory.EVENTS,
    SubCategory.GAMES,
  ],
  [Category.SUBSCRIPTIONS]: [
    SubCategory.OTT,
    SubCategory.SOFTWARE,
    SubCategory.CLOUD,
  ],
  [Category.INVESTMENT]: [
    SubCategory.STOCKS,
    SubCategory.MUTUAL_FUNDS,
    SubCategory.CRYPTO,
    SubCategory.FD,
  ],
  [Category.LOAN]: [
    SubCategory.EMI,
    SubCategory.PERSONAL_LOAN,
    SubCategory.CREDIT_CARD,
  ],
  [Category.SAVINGS]: [], // Add if needed
  [Category.FAMILY]: [
    SubCategory.CHILDREN,
    SubCategory.PARENTS,
    SubCategory.SPOUSE,
  ],
  [Category.PETS]: [
    SubCategory.PET_FOOD,
    SubCategory.VET,
    SubCategory.GROOMING,
  ],
  [Category.OTHER]: [SubCategory.MISC],
};

export const CategoryIconMap: Record<Category, CategoryIcon> = {
  [Category.FOOD]: CategoryIcon.FOOD,
  [Category.TRAVEL]: CategoryIcon.AIRPLANE,
  [Category.SHOPPING]: CategoryIcon.SHOPPING,
  [Category.UTILITIES]: CategoryIcon.LIGHTBULB,
  [Category.HEALTH]: CategoryIcon.HEART_PULSE,
  [Category.EDUCATION]: CategoryIcon.SCHOOL,
  [Category.ENTERTAINMENT]: CategoryIcon.MOVIE,
  [Category.SUBSCRIPTIONS]: CategoryIcon.YOUTUBE_SUBSCRIPTION,
  [Category.INVESTMENT]: CategoryIcon.PIGGY_BANK,
  [Category.LOAN]: CategoryIcon.CREDIT_CARD,
  [Category.SAVINGS]: CategoryIcon.WALLET,
  [Category.FAMILY]: CategoryIcon.FAMILY,
  [Category.PETS]: CategoryIcon.PET,
  [Category.OTHER]: CategoryIcon.HELP,
};

export const OutstandingIconMap: Record<OutstandingCategory, OutstandingIcon> =
  {
    [OutstandingCategory.LENT]: OutstandingIcon.LENT,
    [OutstandingCategory.BORROWED]: OutstandingIcon.BORROWED,
  };
