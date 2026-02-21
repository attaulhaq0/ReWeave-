import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { UploadCloud, CheckCircle2, Loader2, Sparkles, ArrowRight, AlertTriangle, Lock } from 'lucide-react';

interface CreateListingProps {
  onComplete: () => void;
}

export function CreateListing({ onComplete }: CreateListingProps) {
  const { createListing, currentUser } = useApp();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  // Form state
  const [weightKg, setWeightKg] = useState('2500');
  const [minOrderKg, setMinOrderKg] = useState('500');
  const [floorPricePkr, setFloorPricePkr] = useState('150000');
  const [buyNowPrice, setBuyNowPrice] = useState('180000');

  const isKybVerified = currentUser?.kybStatus === 'VERIFIED';

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Simulate file upload
      setImages(['https://picsum.photos/seed/newwaste/800/600']);
      setIsProcessing(true);
      setStep(2);
      
      // Simulate AI processing delay
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
    }
  };

  const handlePublish = (status: 'ACTIVE' | 'DRAFT') => {
    createListing({
      materialType: 'COTTON',
      colorClass: 'LIGHT',
      grade: 'A',
      weightKg: parseInt(weightKg),
      minOrderKg: parseInt(minOrderKg),
      floorPricePkr: parseInt(floorPricePkr),
      buyNowPrice: buyNowPrice ? parseInt(buyNowPrice) : undefined,
      status,
      auctionEndAt: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days
      images,
      aiClassification: {
        materialType: { value: 'COTTON', confidence: 0.94 },
        colorClass: { value: 'LIGHT', confidence: 0.89 },
        grade: { value: 'A', confidence: 0.87 },
        estimatedWeightKg: { value: parseInt(weightKg), method: 'volume_estimation' },
        fiberBlend: { cotton: 1.0 },
        defectDetected: false,
        recyclabilityScore: 0.91,
        suggestedUseCases: ['fiber_recycling', 'yarn_spinning']
      }
    });

    alert(`Listing saved as ${status}!`);
    onComplete();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-primary mb-2">List New Waste</h1>
        <p className="text-gray-500">Upload photos of your textile waste for AI classification.</p>
      </div>

      {!isKybVerified && (
        <div className="mb-6 bg-brand-warning/10 border border-brand-warning/20 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-brand-warning shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-brand-warning">KYB Verification Pending</h3>
            <p className="text-sm text-brand-warning/80 mt-1">
              Your business verification is currently pending. You can create listings and save them as drafts, but you cannot publish them to the marketplace until verified.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-primary -z-10 rounded-full transition-all duration-500`} style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
        
        {[1, 2, 3].map((s) => (
          <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white ${step >= s ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
            {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="border-dashed border-2 border-gray-300 bg-gray-50/50">
          <CardContent className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6 text-brand-primary">
              <UploadCloud className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Waste Photos</h3>
            <p className="text-gray-500 mb-8 max-w-md">
              Drag and drop images or click to browse. Our AI will automatically classify the material, color, and grade.
            </p>
            <div className="relative">
              <Input 
                type="file" 
                multiple 
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleUpload}
              />
              <Button size="lg" className="pointer-events-none">Select Files</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent className="p-8 min-h-[400px] flex flex-col items-center justify-center">
            {isProcessing ? (
              <div className="text-center space-y-6">
                <Loader2 className="w-16 h-16 text-brand-primary animate-spin mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold text-brand-primary mb-2">AI is analyzing your images...</h3>
                  <p className="text-gray-500">Detecting material composition, color class, and grade.</p>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="flex items-center gap-3 mb-6 text-brand-accent">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Classification Complete</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="rounded-xl overflow-hidden bg-gray-100 aspect-video">
                    <img src={images[0]} alt="Uploaded waste" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-500 mb-1">Detected Material</p>
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-lg">100% Cotton</p>
                        <span className="text-xs font-medium text-brand-accent bg-brand-accent/10 px-2 py-1 rounded-full">94% Confidence</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-500 mb-1">Color Class</p>
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-lg">Light Colors</p>
                        <span className="text-xs font-medium text-brand-accent bg-brand-accent/10 px-2 py-1 rounded-full">89% Confidence</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-500 mb-1">Estimated Grade</p>
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-lg">Grade A (Clean Offcuts)</p>
                        <span className="text-xs font-medium text-brand-accent bg-brand-accent/10 px-2 py-1 rounded-full">87% Confidence</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setStep(1)}>Retake Photos</Button>
                  <Button onClick={() => setStep(3)} className="flex items-center gap-2">
                    Confirm & Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-brand-primary">Listing Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Total Weight (kg)</label>
                <Input type="number" value={weightKg} onChange={e => setWeightKg(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Minimum Order (kg)</label>
                <Input type="number" value={minOrderKg} onChange={e => setMinOrderKg(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Floor Price (PKR)</label>
                <Input type="number" value={floorPricePkr} onChange={e => setFloorPricePkr(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Buy Now Price (Optional)</label>
                <Input type="number" value={buyNowPrice} onChange={e => setBuyNowPrice(e.target.value)} />
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200 flex justify-end gap-4">
              <Button variant="outline" onClick={() => handlePublish('DRAFT')}>Save as Draft</Button>
              <Button 
                onClick={() => handlePublish('ACTIVE')} 
                className="bg-brand-accent hover:bg-brand-accent/90 flex items-center gap-2"
                disabled={!isKybVerified}
              >
                {!isKybVerified && <Lock className="w-4 h-4" />}
                {isKybVerified ? 'Publish Listing' : 'Publish Locked (KYB Pending)'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
