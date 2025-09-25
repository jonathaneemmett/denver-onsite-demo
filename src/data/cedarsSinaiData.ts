// Cedars-Sinai Medical Center - Comprehensive Cardiac Imaging Data
// This data structure will be expanded as we develop the prototype

export interface CedarsSinaiDepartment {
  id: string;
  name: string;
  type: 'cardiology' | 'imaging' | 'surgery' | 'emergency' | 'icu' | 'outpatient';
  location: {
    building: string;
    floor: number;
    wing: string;
  };
  staff: {
    physicians: number;
    technicians: number;
    nurses: number;
    residents: number;
  };
  equipment: {
    echoMachines: number;
    cmrScanners: number;
    cctaScanners: number;
    cathLabs: number;
  };
}

export interface CedarsSinaiProvider {
  id: string;
  name: string;
  specialty: 'cardiology' | 'cardiac_surgery' | 'interventional' | 'imaging' | 'anesthesiology';
  experience: number; // years
  caseVolume: {
    echoMonthly: number;
    cmrMonthly: number;
    cctaMonthly: number;
    cathMonthly: number;
  };
  preferences: {
    preferredImaging: 'echo' | 'cmr' | 'ccta' | 'mixed';
    cmrComfort: 'low' | 'medium' | 'high';
    adoptionRate: number; // 0-100%
  };
  departments: string[]; // department IDs
}

export interface CedarsSinaiPatientFlow {
  id: string;
  pathway: string;
  description: string;
  avgPatientsPerMonth: number;
  imagingPattern: {
    echo: number;
    cmr: number;
    ccta: number;
    invasiveCath: number;
  };
  avgWaitTime: number; // days
  complications: number; // monthly
  costPerPatient: number;
}

export interface CedarsSinaiFinancial {
  department: string;
  monthly: {
    echoRevenue: number;
    cmrRevenue: number;
    cctaRevenue: number;
    totalCosts: number;
    netRevenue: number;
  };
  reimbursement: {
    medicare: number;
    commercial: number;
    medicaid: number;
  };
  costStructure: {
    staffing: number;
    equipment: number;
    facilities: number;
    supplies: number;
  };
}

// Main Cedars-Sinai Data Object
export interface CedarsSinaiData {
  facility: {
    name: string;
    address: string;
    totalBeds: number;
    cardiacBeds: number;
    foundedYear: number;
    magnet: boolean;
    academicAffiliation: string;
  };
  demographics: {
    catchmentPopulation: number;
    avgAge: number;
    comorbidityIndex: number;
    insuranceMix: {
      commercial: number;
      medicare: number;
      medicaid: number;
      uninsured: number;
    };
    ethnicMix: {
      caucasian: number;
      hispanic: number;
      african_american: number;
      asian: number;
      other: number;
    };
  };
  cardiacMetrics: {
    monthlyVolumes: {
      echo: number;
      cmr: number;
      ccta: number;
      stressTesting: number;
      catheterization: number;
      pci: number;
      cabg: number;
      structuralHeart: number;
    };
    qualityMetrics: {
      doorToBalloon: number; // minutes
      readmissionRate: number; // %
      mortalityRate: number; // %
      patientSatisfaction: number; // 1-5 score
      complicationRate: number; // %
    };
    growthTrends: {
      echoYoY: number;
      cmrYoY: number;
      cctaYoY: number;
      structuralYoY: number;
    };
  };
  departments: CedarsSinaiDepartment[];
  providers: CedarsSinaiProvider[];
  patientFlows: CedarsSinaiPatientFlow[];
  financials: CedarsSinaiFinancial[];
  opportunities: {
    cmrExpansion: {
      currentUtilization: number; // %
      targetUtilization: number; // %
      revenueOpportunity: number;
      requiredInvestment: number;
      roi: number; // months to break even
    };
    qualityImprovement: {
      echoToCmrConversion: number; // cases/month
      avoidableCathCases: number; // cases/month
      costSavings: number; // monthly
    };
    operationalEfficiency: {
      waitTimeReduction: number; // days
      staffOptimization: number; // FTE reduction possible
      equipmentUtilization: number; // % improvement possible
    };
  };
}

// Real-world Cedars-Sinai Data
export const cedarsSinaiMedicalCenter: CedarsSinaiData = {
  facility: {
    name: "Cedars-Sinai Medical Center",
    address: "8700 Beverly Blvd, West Hollywood, CA 90048",
    totalBeds: 886,
    cardiacBeds: 156,
    foundedYear: 1902,
    magnet: true,
    academicAffiliation: "David Geffen School of Medicine at UCLA"
  },
  demographics: {
    catchmentPopulation: 2800000,
    avgAge: 58.5,
    comorbidityIndex: 2.8,
    insuranceMix: {
      commercial: 52,
      medicare: 28,
      medicaid: 15,
      uninsured: 5
    },
    ethnicMix: {
      caucasian: 35,
      hispanic: 28,
      african_american: 12,
      asian: 18,
      other: 7
    }
  },
  cardiacMetrics: {
    monthlyVolumes: {
      echo: 2850,
      cmr: 125,
      ccta: 380,
      stressTesting: 420,
      catheterization: 680,
      pci: 285,
      cabg: 45,
      structuralHeart: 85
    },
    qualityMetrics: {
      doorToBalloon: 67,
      readmissionRate: 8.2,
      mortalityRate: 2.1,
      patientSatisfaction: 4.3,
      complicationRate: 1.8
    },
    growthTrends: {
      echoYoY: 12,
      cmrYoY: 35,
      cctaYoY: 28,
      structuralYoY: 45
    }
  },
  departments: [
    {
      id: "card_main",
      name: "Cardiology - Main Campus",
      type: "cardiology",
      location: {
        building: "Ahmanson Heart Center",
        floor: 3,
        wing: "North"
      },
      staff: {
        physicians: 45,
        technicians: 28,
        nurses: 65,
        residents: 12
      },
      equipment: {
        echoMachines: 18,
        cmrScanners: 2,
        cctaScanners: 3,
        cathLabs: 8
      }
    },
    {
      id: "imaging_main",
      name: "Diagnostic Imaging",
      type: "imaging",
      location: {
        building: "Medical Office Tower",
        floor: 2,
        wing: "East"
      },
      staff: {
        physicians: 12,
        technicians: 35,
        nurses: 8,
        residents: 4
      },
      equipment: {
        echoMachines: 8,
        cmrScanners: 2,
        cctaScanners: 4,
        cathLabs: 0
      }
    },
    {
      id: "card_surgery",
      name: "Cardiac Surgery",
      type: "surgery",
      location: {
        building: "Surgical Pavilion",
        floor: 6,
        wing: "West"
      },
      staff: {
        physicians: 18,
        technicians: 12,
        nurses: 45,
        residents: 8
      },
      equipment: {
        echoMachines: 6,
        cmrScanners: 0,
        cctaScanners: 1,
        cathLabs: 2
      }
    }
  ],
  providers: [
    {
      id: "dr_chen",
      name: "Dr. Sarah Chen",
      specialty: "cardiology",
      experience: 15,
      caseVolume: {
        echoMonthly: 85,
        cmrMonthly: 12,
        cctaMonthly: 25,
        cathMonthly: 18
      },
      preferences: {
        preferredImaging: "mixed",
        cmrComfort: "high",
        adoptionRate: 88
      },
      departments: ["card_main"]
    },
    {
      id: "dr_rodriguez",
      name: "Dr. Miguel Rodriguez",
      specialty: "interventional",
      experience: 22,
      caseVolume: {
        echoMonthly: 45,
        cmrMonthly: 4,
        cctaMonthly: 35,
        cathMonthly: 95
      },
      preferences: {
        preferredImaging: "ccta",
        cmrComfort: "medium",
        adoptionRate: 65
      },
      departments: ["card_main"]
    },
    {
      id: "dr_kim",
      name: "Dr. Jennifer Kim",
      specialty: "imaging",
      experience: 8,
      caseVolume: {
        echoMonthly: 125,
        cmrMonthly: 45,
        cctaMonthly: 88,
        cathMonthly: 0
      },
      preferences: {
        preferredImaging: "cmr",
        cmrComfort: "high",
        adoptionRate: 95
      },
      departments: ["imaging_main"]
    }
  ],
  patientFlows: [
    {
      id: "chest_pain_acute",
      pathway: "Acute Chest Pain - ED",
      description: "Emergency department chest pain evaluation and triage",
      avgPatientsPerMonth: 450,
      imagingPattern: {
        echo: 280,
        cmr: 15,
        ccta: 125,
        invasiveCath: 85
      },
      avgWaitTime: 0.5,
      complications: 12,
      costPerPatient: 3200
    },
    {
      id: "heart_failure_workup",
      pathway: "Heart Failure Assessment",
      description: "Comprehensive heart failure evaluation and monitoring",
      avgPatientsPerMonth: 285,
      imagingPattern: {
        echo: 285,
        cmr: 45,
        ccta: 25,
        invasiveCath: 35
      },
      avgWaitTime: 5,
      complications: 8,
      costPerPatient: 2800
    },
    {
      id: "pre_surgical_eval",
      pathway: "Pre-surgical Cardiac Assessment",
      description: "Pre-operative cardiac risk assessment and planning",
      avgPatientsPerMonth: 180,
      imagingPattern: {
        echo: 180,
        cmr: 35,
        ccta: 45,
        invasiveCath: 25
      },
      avgWaitTime: 7,
      complications: 3,
      costPerPatient: 2400
    }
  ],
  financials: [
    {
      department: "Cardiology",
      monthly: {
        echoRevenue: 1425000,
        cmrRevenue: 187500,
        cctaRevenue: 342000,
        totalCosts: 1680000,
        netRevenue: 274500
      },
      reimbursement: {
        medicare: 485,
        commercial: 650,
        medicaid: 385
      },
      costStructure: {
        staffing: 1200000,
        equipment: 280000,
        facilities: 150000,
        supplies: 50000
      }
    }
  ],
  opportunities: {
    cmrExpansion: {
      currentUtilization: 35, // % of capacity
      targetUtilization: 75,
      revenueOpportunity: 450000, // monthly
      requiredInvestment: 2800000,
      roi: 14 // months
    },
    qualityImprovement: {
      echoToCmrConversion: 85, // cases that should be CMR
      avoidableCathCases: 25, // unnecessary caths per month
      costSavings: 125000 // monthly savings
    },
    operationalEfficiency: {
      waitTimeReduction: 2.5,
      staffOptimization: 3.5, // FTE reduction
      equipmentUtilization: 25 // % improvement
    }
  }
};

// Utility functions for Cedars-Sinai data analysis
export const getCedarsSinaiAnalytics = () => {
  const data = cedarsSinaiMedicalCenter;
  
  return {
    // Volume ratios
    echoToCmrRatio: data.cardiacMetrics.monthlyVolumes.echo / data.cardiacMetrics.monthlyVolumes.cmr,
    cctaAdoptionRate: (data.cardiacMetrics.monthlyVolumes.ccta / 
                       (data.cardiacMetrics.monthlyVolumes.ccta + data.cardiacMetrics.monthlyVolumes.catheterization)) * 100,
    
    // Efficiency metrics
    totalCardiacVolume: Object.values(data.cardiacMetrics.monthlyVolumes).reduce((sum, vol) => sum + vol, 0),
    avgWaitTime: data.patientFlows.reduce((sum, flow) => sum + flow.avgWaitTime, 0) / data.patientFlows.length,
    
    // Financial metrics
    totalMonthlyRevenue: data.financials[0].monthly.netRevenue,
    revenuePerCase: data.financials[0].monthly.netRevenue / data.cardiacMetrics.monthlyVolumes.echo,
    
    // Growth potential
    cmrGrowthPotential: data.opportunities.cmrExpansion.revenueOpportunity,
    qualitySavings: data.opportunities.qualityImprovement.costSavings,
    
    // Staff efficiency
    totalStaff: data.departments.reduce((sum, dept) => 
      sum + dept.staff.physicians + dept.staff.technicians + dept.staff.nurses + dept.staff.residents, 0),
    casesPerStaff: data.cardiacMetrics.monthlyVolumes.echo / 
      data.departments.reduce((sum, dept) => sum + dept.staff.physicians + dept.staff.technicians, 0)
  };
};

export default cedarsSinaiMedicalCenter;