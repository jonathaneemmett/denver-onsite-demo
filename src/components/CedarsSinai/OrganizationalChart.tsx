'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faStethoscope,
  faMicroscope,
  faHeart,
  faUserMd,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

interface Leader {
  id: string;
  name: string;
  title: string;
  department: string;
  credentials: string;
  specialties: string[];
  societies: string[];
  reportsTo?: string;
  image?: string;
}

const leadershipData: Leader[] = [
  {
    id: 'marban',
    name: 'Eduardo Marbán',
    title: 'Executive Director',
    department: 'Smidt Heart Institute',
    credentials: 'MD, PhD',
    specialties: [
      'Cardiac Electrophysiology',
      'Regenerative Medicine', 
      'Cardiac Progenitor Cells',
      'Clinical Cardiology'
    ],
    societies: [
      'American Heart Association',
      'American College of Cardiology',
      'Heart Rhythm Society',
      'International Society for Stem Cell Research'
    ]
  },
  {
    id: 'albert',
    name: 'Christine M. Albert',
    title: 'Chair, Department of Cardiology',
    department: 'Cardiology',
    credentials: 'MD, MPH',
    specialties: [
      'Heart Rhythm Disorders',
      'Arrhythmia Prevention',
      'Clinical Research',
      'Preventive Cardiology'
    ],
    societies: [
      'American Heart Association',
      'Heart Rhythm Society',
      'American College of Cardiology',
      'European Society of Cardiology'
    ],
    reportsTo: 'marban'
  },
  {
    id: 'chikwe',
    name: 'Joanna Chikwe',
    title: 'Chair, Department of Cardiac Surgery',
    department: 'Cardiac Surgery',
    credentials: 'MD, FRCS',
    specialties: [
      'Robotic Mitral Valve Repair',
      'Coronary Revascularization',
      'Minimally Invasive Procedures',
      'Heart Valve Surgery'
    ],
    societies: [
      'Society of Thoracic Surgeons',
      'American Association for Thoracic Surgery',
      'International Society for Minimally Invasive Cardiothoracic Surgery',
      'American Heart Association'
    ],
    reportsTo: 'marban'
  },
  {
    id: 'pressman',
    name: 'Barry D. Pressman',
    title: 'Chair, Imaging Department',
    department: 'Diagnostic Imaging',
    credentials: 'MD, FACR',
    specialties: [
      'Head & Neck Radiology',
      'Neuroradiology',
      'Cardiac Imaging',
      'Medical Imaging Innovation'
    ],
    societies: [
      'Radiological Society of North America',
      'American College of Radiology',
      'Society for Cardiovascular Magnetic Resonance',
      'American Society of Neuroradiology'
    ]
  }
];

interface OrganizationalChartProps {
	hospitalName?: string;
}

export function OrganizationalChart({ hospitalName = 'Cedars-Sinai Medical Center' }: OrganizationalChartProps) {
  const getLeaderIcon = (department: string) => {
    switch (department) {
      case 'Smidt Heart Institute':
        return faHeart;
      case 'Cardiology':
        return faStethoscope;
      case 'Cardiac Surgery':
        return faUserMd;
      case 'Diagnostic Imaging':
        return faMicroscope;
      default:
        return faUser;
    }
  };


  const director = leadershipData.find(leader => leader.id === 'marban');
  const departmentHeads = leadershipData.filter(leader => leader.reportsTo === 'marban');
  const independentDept = leadershipData.filter(leader => !leader.reportsTo && leader.id !== 'marban');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="mb-4 text-center border-b border-gray-200 pb-3">
        <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center justify-center">
          <FontAwesomeIcon icon={faUsers} className="w-4 h-4 text-slate-600 mr-2" />
          {hospitalName?.split(' ')[0] || 'Cedars-Sinai'} Leadership
        </h2>
        <p className="text-sm text-gray-600">
          Smidt Heart Institute & Cardiac Services
        </p>
      </div>

      <div className="space-y-6">
        {/* Executive Director - Top Level */}
        {director && (
          <div className="relative">
            {/* Executive Box */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300 rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                    <FontAwesomeIcon icon={getLeaderIcon(director.department)} className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900">{director.name}</h3>
                  <p className="text-sm font-semibold text-gray-700">{director.credentials}</p>
                  <p className="text-sm font-bold text-slate-800 mt-1">{director.title}</p>
                  <p className="text-xs text-gray-600 mt-1 px-2 py-1 bg-white/50 rounded-full inline-block">
                    {director.department}
                  </p>
                </div>
                
                <div className="mt-4 space-y-3 text-xs">
                  <div className="bg-white/70 rounded-lg p-3 border border-slate-200">
                    <div className="font-bold text-gray-900 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      Specialties
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {director.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-1 rounded-md text-xs font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-slate-200">
                    <div className="font-bold text-gray-900 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                      Professional Societies
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {director.societies.map((society, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-1 rounded-md text-xs">
                          {society.replace('American ', '').replace('Society of ', '').replace('Association for ', '')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hierarchy Lines */}
            <div className="flex justify-center mt-4">
              <div className="w-px h-8 bg-slate-400"></div>
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-px bg-slate-400"></div>
            </div>
            <div className="flex justify-center space-x-6 mt-0">
              {departmentHeads.map((_, idx) => (
                <div key={idx} className="w-px h-8 bg-slate-400"></div>
              ))}
            </div>
          </div>
        )}

        {/* Department Heads */}
        {departmentHeads.length > 0 && (
          <div className="space-y-4">
            {departmentHeads.map((leader) => (
              <div key={leader.id} className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FontAwesomeIcon icon={getLeaderIcon(leader.department)} className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <h4 className="font-bold text-base text-gray-900">{leader.name}</h4>
                      <p className="text-sm font-semibold text-gray-700">{leader.credentials}</p>
                      <p className="text-sm font-bold text-slate-800">{leader.title}</p>
                      <p className="text-xs text-gray-600 mt-1 px-2 py-1 bg-white/70 rounded-full inline-block border border-slate-200">
                        {leader.department}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3 text-xs">
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <div className="font-bold text-gray-900 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          Specialties
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {leader.specialties.map((specialty, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-1 rounded text-xs">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <div className="font-bold text-gray-900 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                          Professional Societies
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {leader.societies.map((society, idx) => (
                            <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-1 rounded text-xs">
                              {society.replace('American ', '').replace('Society of ', '').replace('Association for ', '')}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Independent Departments */}
        {independentDept.length > 0 && (
          <div className="border-t-2 border-slate-300 pt-6 mt-8">
            <div className="text-center mb-4">
              <h3 className="font-bold text-sm text-gray-800 bg-amber-100 border border-amber-300 px-4 py-2 rounded-full inline-block">
                <FontAwesomeIcon icon={faMicroscope} className="w-3 h-3 mr-2 text-amber-600" />
                Independent Departments
              </h3>
            </div>
            <div className="space-y-4">
              {independentDept.map((leader) => (
                <div key={leader.id} className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 shadow-md relative">
                  <div className="absolute right-3 top-3">
                    <div className="w-3 h-3 bg-amber-500 rounded-full shadow-sm" title="Independent Department"></div>
                  </div>
                  
                  <div className="flex items-start gap-4 pr-6">
                    <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <FontAwesomeIcon icon={getLeaderIcon(leader.department)} className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-3">
                        <h4 className="font-bold text-base text-gray-900">{leader.name}</h4>
                        <p className="text-sm font-semibold text-gray-700">{leader.credentials}</p>
                        <p className="text-sm font-bold text-amber-800">{leader.title}</p>
                        <p className="text-xs text-gray-600 mt-1 px-2 py-1 bg-white/70 rounded-full inline-block border border-amber-300">
                          {leader.department}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3 text-xs">
                        <div className="bg-white rounded-lg p-3 border border-amber-200">
                          <div className="font-bold text-gray-900 mb-2 flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            Specialties
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {leader.specialties.map((specialty, idx) => (
                              <span key={idx} className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-1 rounded text-xs">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-amber-200">
                          <div className="font-bold text-gray-900 mb-2 flex items-center">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                            Professional Societies
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {leader.societies.map((society, idx) => (
                              <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-1 rounded text-xs">
                                {society.replace('American ', '').replace('Society of ', '').replace('Association for ', '')}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}