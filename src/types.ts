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

export interface Listing {
  id: string;
  supplierName: string;
  supplierLocation: string;
  materialType: MaterialType;
  colorClass: ColorClass;
  grade: WasteGrade;
  weightKg: number;
  minOrderKg: number;
  floorPricePkr: number;
  buyNowPrice?: number;
  status: 'DRAFT' | 'ACTIVE' | 'SOLD';
  auctionEndAt: string;
  images: string[];
  aiClassification: AIClassification;
  currentBidPkr?: number;
  bidsCount: number;
  createdAt: string;
}
