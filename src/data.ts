import { Listing, User, Order, Bid } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u_1', email: 'farhan@factory.com', role: 'SUPPLIER', fullName: 'Farhan Ahmed', companyName: 'Farhan Textiles Ltd.', kybStatus: 'VERIFIED' },
  { id: 'u_2', email: 'sadia@recycler.com', role: 'BUYER', fullName: 'Sadia Khan', companyName: 'EcoFibers PK' },
  { id: 'u_3', email: 'admin@reweave.ai', role: 'ADMIN', fullName: 'Hamid Ali', companyName: 'ReWeave' }
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'lst_1',
    supplierId: 'u_1',
    supplierName: 'Farhan Textiles Ltd.',
    supplierLocation: 'Faisalabad, PK',
    materialType: 'COTTON',
    colorClass: 'LIGHT',
    grade: 'A',
    weightKg: 2500,
    minOrderKg: 500,
    floorPricePkr: 150000,
    buyNowPrice: 180000,
    status: 'ACTIVE',
    auctionEndAt: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    images: [
      'https://picsum.photos/seed/cotton1/800/600',
      'https://picsum.photos/seed/cotton2/800/600'
    ],
    aiClassification: {
      materialType: { value: 'COTTON', confidence: 0.94 },
      colorClass: { value: 'LIGHT', confidence: 0.89 },
      grade: { value: 'A', confidence: 0.87 },
      estimatedWeightKg: { value: 2450, method: 'volume_estimation' },
      fiberBlend: { cotton: 0.95, polyester: 0.05 },
      defectDetected: false,
      recyclabilityScore: 0.91,
      suggestedUseCases: ['fiber_recycling', 'yarn_spinning']
    },
    currentBidPkr: 155000,
    bidsCount: 3,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'lst_2',
    supplierId: 'u_1',
    supplierName: 'Nishat Mills',
    supplierLocation: 'Lahore, PK',
    materialType: 'DENIM',
    colorClass: 'DENIM',
    grade: 'B',
    weightKg: 5000,
    minOrderKg: 1000,
    floorPricePkr: 200000,
    status: 'ACTIVE',
    auctionEndAt: new Date(Date.now() + 86400000 * 1).toISOString(),
    images: [
      'https://picsum.photos/seed/denim1/800/600'
    ],
    aiClassification: {
      materialType: { value: 'DENIM', confidence: 0.98 },
      colorClass: { value: 'DENIM', confidence: 0.99 },
      grade: { value: 'B', confidence: 0.82 },
      estimatedWeightKg: { value: 5100, method: 'volume_estimation' },
      fiberBlend: { cotton: 0.98, elastane: 0.02 },
      defectDetected: true,
      recyclabilityScore: 0.85,
      suggestedUseCases: ['shredding', 'insulation']
    },
    currentBidPkr: 210000,
    bidsCount: 7,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'lst_3',
    supplierId: 'u_1',
    supplierName: 'Crescent Bahuman',
    supplierLocation: 'Karachi, PK',
    materialType: 'POLYESTER',
    colorClass: 'DARK',
    grade: 'A',
    weightKg: 1200,
    minOrderKg: 200,
    floorPricePkr: 80000,
    buyNowPrice: 100000,
    status: 'ACTIVE',
    auctionEndAt: new Date(Date.now() + 86400000 * 5).toISOString(),
    images: [
      'https://picsum.photos/seed/poly1/800/600'
    ],
    aiClassification: {
      materialType: { value: 'POLYESTER', confidence: 0.91 },
      colorClass: { value: 'DARK', confidence: 0.95 },
      grade: { value: 'A', confidence: 0.88 },
      estimatedWeightKg: { value: 1150, method: 'volume_estimation' },
      fiberBlend: { polyester: 1.0 },
      defectDetected: false,
      recyclabilityScore: 0.75,
      suggestedUseCases: ['chemical_recycling', 'filling']
    },
    bidsCount: 0,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];

export const MOCK_ORDERS: Order[] = [];
export const MOCK_BIDS: Bid[] = [];
