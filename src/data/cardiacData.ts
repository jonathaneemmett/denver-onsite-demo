// Centralized data structure for all cardiac imaging intelligence components

export interface CardiacCenter {
  id: string;
  name: string;
  location: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  
  // Facility Classification
  type: 'whale' | 'excellence' | 'upAndComing' | 'emerging';
  
  // Core Metrics
  volumes: {
    echoMonthly: number;
    cmrMonthly: number;
    cctaMonthly: number;
    structuralMonthly: number;
  };
  
  // Growth & Performance
  growth: {
    echoYoY: number;
    cmrYoY: number;
    cctaYoY: number;
    structuralYoY: number;
  };
  
  // Ratios & Efficiency
  ratios: {
    echoToCmr: number;
    cctaAdoptionRate: number;
    utilizationRate: number;
  };
  
  // Market Intelligence
  market: {
    totalAddressableMarket: number;
    currentPenetration: number;
    competitivePosition: 'leader' | 'challenger' | 'follower' | 'niche';
    riskScore: number;
  };
  
  // Operational Status
  operations: {
    hasStructuralProgram: boolean;
    staffingGap: boolean;
    equipmentAge: number;
    referralPattern: 'internal' | 'external' | 'mixed';
  };
  
  // Demographics
  demographics: {
    totalPopulation: number;
    age65Plus: number;
    cardiovascularRisk: number;
    insuranceMix: {
      medicare: number;
      commercial: number;
      medicaid: number;
      uninsured: number;
    };
  };
  
  // Financial
  financial: {
    avgReimbursement: number;
    costPerProcedure: number;
    netRevenue: number;
  };
}

// Consolidated cardiac imaging intelligence data
export const cardiacCenters: CardiacCenter[] = [
  {
    id: '1',
    name: 'Metro Cardiac Institute',
    location: 'Downtown Medical District',
    region: 'Metropolitan Area',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    type: 'whale',
    volumes: {
      echoMonthly: 280,
      cmrMonthly: 45,
      cctaMonthly: 120,
      structuralMonthly: 35
    },
    growth: {
      echoYoY: 12,
      cmrYoY: 28,
      cctaYoY: 35,
      structuralYoY: 45
    },
    ratios: {
      echoToCmr: 6.2, // 280/45
      cctaAdoptionRate: 78,
      utilizationRate: 85
    },
    market: {
      totalAddressableMarket: 15000,
      currentPenetration: 32,
      competitivePosition: 'leader',
      riskScore: 85
    },
    operations: {
      hasStructuralProgram: true,
      staffingGap: true,
      equipmentAge: 2,
      referralPattern: 'mixed'
    },
    demographics: {
      totalPopulation: 850000,
      age65Plus: 14.2,
      cardiovascularRisk: 28.5,
      insuranceMix: { medicare: 35, commercial: 45, medicaid: 15, uninsured: 5 }
    },
    financial: {
      avgReimbursement: 1200,
      costPerProcedure: 450,
      netRevenue: 33750 // (1200-450) * 45 CMR/month
    }
  },
  {
    id: '2',
    name: 'Northshore Heart Center',
    location: 'Suburban Medical Campus',
    region: 'Northern Suburbs',
    coordinates: { lat: 40.8176, lng: -73.9482 },
    type: 'excellence',
    volumes: {
      echoMonthly: 195,
      cmrMonthly: 38,
      cctaMonthly: 85,
      structuralMonthly: 22
    },
    growth: {
      echoYoY: 8,
      cmrYoY: 22,
      cctaYoY: 28,
      structuralYoY: 15
    },
    ratios: {
      echoToCmr: 5.1, // 195/38
      cctaAdoptionRate: 85,
      utilizationRate: 92
    },
    market: {
      totalAddressableMarket: 12000,
      currentPenetration: 28,
      competitivePosition: 'leader',
      riskScore: 78
    },
    operations: {
      hasStructuralProgram: true,
      staffingGap: false,
      equipmentAge: 1,
      referralPattern: 'internal'
    },
    demographics: {
      totalPopulation: 420000,
      age65Plus: 18.5,
      cardiovascularRisk: 25.1,
      insuranceMix: { medicare: 42, commercial: 48, medicaid: 8, uninsured: 2 }
    },
    financial: {
      avgReimbursement: 1250,
      costPerProcedure: 420,
      netRevenue: 31540 // (1250-420) * 38 CMR/month
    }
  },
  {
    id: '3',
    name: 'West Regional Medical',
    location: 'Community Health Network',
    region: 'Western Districts',
    coordinates: { lat: 40.6892, lng: -74.0445 },
    type: 'upAndComing',
    volumes: {
      echoMonthly: 145,
      cmrMonthly: 15,
      cctaMonthly: 32,
      structuralMonthly: 8
    },
    growth: {
      echoYoY: 25,
      cmrYoY: 65,
      cctaYoY: 82,
      structuralYoY: 120
    },
    ratios: {
      echoToCmr: 9.7, // 145/15 - high ratio indicates opportunity
      cctaAdoptionRate: 42,
      utilizationRate: 68
    },
    market: {
      totalAddressableMarket: 8500,
      currentPenetration: 18,
      competitivePosition: 'challenger',
      riskScore: 72
    },
    operations: {
      hasStructuralProgram: false,
      staffingGap: true,
      equipmentAge: 4,
      referralPattern: 'external'
    },
    demographics: {
      totalPopulation: 320000,
      age65Plus: 11.2,
      cardiovascularRisk: 31.4,
      insuranceMix: { medicare: 28, commercial: 38, medicaid: 25, uninsured: 9 }
    },
    financial: {
      avgReimbursement: 1100,
      costPerProcedure: 480,
      netRevenue: 9300 // (1100-480) * 15 CMR/month
    }
  },
  {
    id: '4',
    name: 'Eastern Heart & Vascular',
    location: 'Regional Medical Center',
    region: 'Eastern Corridor',
    coordinates: { lat: 40.7505, lng: -73.8067 },
    type: 'upAndComing',
    volumes: {
      echoMonthly: 220,
      cmrMonthly: 25,
      cctaMonthly: 58,
      structuralMonthly: 15
    },
    growth: {
      echoYoY: 18,
      cmrYoY: 48,
      cctaYoY: 55,
      structuralYoY: 85
    },
    ratios: {
      echoToCmr: 8.8, // 220/25 - high opportunity
      cctaAdoptionRate: 58,
      utilizationRate: 74
    },
    market: {
      totalAddressableMarket: 11200,
      currentPenetration: 25,
      competitivePosition: 'challenger',
      riskScore: 81
    },
    operations: {
      hasStructuralProgram: true,
      staffingGap: true,
      equipmentAge: 3,
      referralPattern: 'mixed'
    },
    demographics: {
      totalPopulation: 680000,
      age65Plus: 15.7,
      cardiovascularRisk: 29.8,
      insuranceMix: { medicare: 32, commercial: 42, medicaid: 18, uninsured: 8 }
    },
    financial: {
      avgReimbursement: 1180,
      costPerProcedure: 465,
      netRevenue: 17875 // (1180-465) * 25 CMR/month
    }
  },
  {
    id: '5',
    name: 'South Bay Cardiac Center',
    location: 'Community Hospital',
    region: 'Southern Zone',
    coordinates: { lat: 40.6501, lng: -73.9496 },
    type: 'emerging',
    volumes: {
      echoMonthly: 95,
      cmrMonthly: 8,
      cctaMonthly: 18,
      structuralMonthly: 3
    },
    growth: {
      echoYoY: 35,
      cmrYoY: 125,
      cctaYoY: 180,
      structuralYoY: 200
    },
    ratios: {
      echoToCmr: 11.9, // 95/8 - very high ratio, major opportunity
      cctaAdoptionRate: 28,
      utilizationRate: 45
    },
    market: {
      totalAddressableMarket: 6800,
      currentPenetration: 12,
      competitivePosition: 'follower',
      riskScore: 88
    },
    operations: {
      hasStructuralProgram: false,
      staffingGap: true,
      equipmentAge: 6,
      referralPattern: 'external'
    },
    demographics: {
      totalPopulation: 290000,
      age65Plus: 12.9,
      cardiovascularRisk: 35.2,
      insuranceMix: { medicare: 25, commercial: 32, medicaid: 32, uninsured: 11 }
    },
    financial: {
      avgReimbursement: 1050,
      costPerProcedure: 520,
      netRevenue: 4240 // (1050-520) * 8 CMR/month
    }
  }
];

// Derived analytics that components can use
export const getAnalytics = () => {
  const totalCenters = cardiacCenters.length;
  
  // KPI Calculations
  const totalEcho = cardiacCenters.reduce((sum, center) => sum + center.volumes.echoMonthly, 0);
  const totalCmr = cardiacCenters.reduce((sum, center) => sum + center.volumes.cmrMonthly, 0);
  const totalCcta = cardiacCenters.reduce((sum, center) => sum + center.volumes.cctaMonthly, 0);
  
  // Opportunity Analysis
  const criticalNeedFacilities = cardiacCenters.filter(c => c.ratios.echoToCmr > 9).length;
  const highOpportunityFacilities = cardiacCenters.filter(c => c.ratios.echoToCmr >= 6 && c.ratios.echoToCmr <= 9).length;
  const optimizedFacilities = cardiacCenters.filter(c => c.ratios.echoToCmr < 6).length;
  
  // Growth Analysis
  const avgCmrGrowth = cardiacCenters.reduce((sum, c) => sum + c.growth.cmrYoY, 0) / totalCenters;
  const avgCctaGrowth = cardiacCenters.reduce((sum, c) => sum + c.growth.cctaYoY, 0) / totalCenters;
  
  // Financial Analysis
  const totalRevenue = cardiacCenters.reduce((sum, c) => sum + c.financial.netRevenue, 0);
  const avgReimbursement = cardiacCenters.reduce((sum, c) => sum + c.financial.avgReimbursement, 0) / totalCenters;
  
  // Market Analysis
  const totalTam = cardiacCenters.reduce((sum, c) => sum + c.market.totalAddressableMarket, 0);
  const avgPenetration = cardiacCenters.reduce((sum, c) => sum + c.market.currentPenetration, 0) / totalCenters;
  
  // Facility Type Distribution
  const facilityTypes = {
    whale: cardiacCenters.filter(c => c.type === 'whale').length,
    excellence: cardiacCenters.filter(c => c.type === 'excellence').length,
    upAndComing: cardiacCenters.filter(c => c.type === 'upAndComing').length,
    emerging: cardiacCenters.filter(c => c.type === 'emerging').length
  };
  
  // Staffing Gap Analysis
  const staffingGapCenters = cardiacCenters.filter(c => c.operations.staffingGap).length;
  
  return {
    totals: {
      centers: totalCenters,
      echoVolume: totalEcho,
      cmrVolume: totalCmr,
      cctaVolume: totalCcta,
      revenue: totalRevenue,
      tam: totalTam
    },
    opportunities: {
      criticalNeed: criticalNeedFacilities,
      highOpportunity: highOpportunityFacilities,
      optimized: optimizedFacilities,
      staffingGaps: staffingGapCenters
    },
    growth: {
      avgCmrGrowth: Math.round(avgCmrGrowth),
      avgCctaGrowth: Math.round(avgCctaGrowth)
    },
    financial: {
      totalRevenue,
      avgReimbursement: Math.round(avgReimbursement)
    },
    market: {
      avgPenetration: Math.round(avgPenetration)
    },
    facilities: facilityTypes
  };
};

// Utility functions for components
export const getFacilityById = (id: string) => cardiacCenters.find(c => c.id === id);
export const getFacilitiesByType = (type: CardiacCenter['type']) => cardiacCenters.filter(c => c.type === type);
export const getFacilitiesByRegion = (region: string) => cardiacCenters.filter(c => c.region === region);
export const getTopPerformers = (metric: keyof CardiacCenter['growth'], limit = 3) => 
  [...cardiacCenters].sort((a, b) => b.growth[metric] - a.growth[metric]).slice(0, limit);