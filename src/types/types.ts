export interface SymbolType {
  _id: string;
  name: string;
  type: number;
  url: string;
  price: number;
  height: number;
  width: number;
  alt: string;
}

export interface CreateSymbolType {
  name: string;
  alt: string;
  price: number;
  type: number;
  image: File;
}

export interface StoneType {
  _id: string;
  name: string;
  price: number;
  alt: string;
  description?: string;
  height: number;
  width: number;
  depth: number;
  url: {
    frontUrl: string;
    leftUrl: string;
    rightUrl: string;
    backUrl: string;
    topUrl: string;
  };
}
export interface CreateStoneType {
  name: string;
  description?: string;
  alt: string;
  price: number;
  frontImage: File;
  leftImage?: File;
  rightImage?: File;
  backImage?: File;
}

export interface PositionType {
  x: number;
  y: number;
}

export interface ProductType {
  _id?: string;
  stone?: StoneType;
  symbols?: [
    {
      symbol: SymbolType;
      position: PositionType;
    }
  ];
  firstName?: string;
  lastName?: string;
  dateOnPlate?: string;
  birthdayOnPlate?: string;
  price?: string;
}

export interface DraggableItemType {
  symbol: SymbolType;
  position: PositionType;
}

export interface OrderDataType {
  subscriberInfo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  deliveryInfo: {
    address: string;
    locationName?: string;
    deliveryNumber?: string;
    deliveryTime?: string;
  };
}

export interface OrderStateType {
  order: OrderDataType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface ProductInfoType {
  stoneId: string;
  droppedSymbols?: DraggableItemType[];
  firstName?: string;
  lastName?: string;
  dateOnPlate?: string;
  birthdayOnPlate?: string;
  price: number;
}

export interface AuthType {
  email: string;
  password: string;
}

export interface CreatePaymentInfo {
  price: Number;
  productId: String;
  email: String;
}
