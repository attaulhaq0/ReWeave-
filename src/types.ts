export type MaterialType = 'COTTON' | 'POLYESTER' | 'BLEND' | 'DENIM' | 'KNIT' | 'NYLON' | 'WOOL';
export type ColorClass = 'WHITE' | 'LIGHT' | 'DARK' | 'MIXED' | 'DENIM';
export type WasteGrade = 'A' | 'B' | 'C' | 'MIXED';

export interface AIClassification {
  materialType: { value: MaterialType; confidence: number };
  colorClass: { value: ColorClass; confidence: number };
  grade: { value: WasteGrade; confidence: number };
  estimatedWeightKg: { value: number; method: string };
  fiberBlend: Record<string, number>;
  defectDetected: boolean;
  recyclabilityScore: number;
  suggestedUseCases: string[];
}

export type ListingStatus = 'DRAFT' | 'ACTIVE' | 'SOLD' | 'CANCELLED' | 'EXPIRED';

export interface Listing {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierLocation: string;
  materialType: MaterialType;
  colorClass: ColorClass;
  grade: WasteGrade;
  weightKg: number;
  minOrderKg: number;
  floorPricePkr: number;
  buyNowPrice?: number;
  status: ListingStatus;
  auctionEndAt: string;
  images: string[];
  aiClassification: AIClassification;
  currentBidPkr?: number;
  bidsCount: number;
  createdAt: string;
}

export type UserRole = 'SUPPLIER' | 'BUYER' | 'ADMIN';
export type KYBStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  companyName: string;
  kybStatus?: KYBStatus;
}

export interface Bid {
  id: string;
  listingId: string;
  buyerId: string;
  amountPkr: number;
  createdAt: string;
}

export interface Order {
  id: string;
  listingId: string;
  supplierId: string;
  buyerId: string;
  finalPricePkr: number;
  status: 'PENDING' | 'PAID' | 'DELIVERED' | 'DISPUTED';
  createdAt: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
}
