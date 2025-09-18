import React, { useState } from 'react';
import { Play, Users, MessageCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { LegalDocument, UserRole } from '../types';

interface ScenarioSimulatorProps {
  document: LegalDocument;
  userRole: UserRole;
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ document, userRole }) => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const scenarios = [
    {
      id: 'early-termination',
      title: 'Early Lease Termination',
      description: 'You need to move out before your lease ends due to a job change',
      difficulty: 'medium',
      relevantRoles: ['tenant'],
      estimatedTime: '5 minutes',
      steps: [
        {
          type: 'user',
          speaker: 'You',
          message: 'Hi, I need to discuss terminating my lease early. I got a job offer in another city.',
          context: 'Initial contact with landlord'
        },
        {
          type: 'landlord',
          speaker: 'Landlord',
          message: 'I understand your situation. According to our lease agreement, early termination requires 60 days notice and a penalty fee.',
          context: 'Landlord refers to lease terms'
        },
        {
          type: 'user',
          speaker: 'You',
          message: 'What exactly is the penalty fee? I\'ve read through the lease but the language is confusing.',
          context: 'Seeking clarification on terms'
        },
        {
          type: 'landlord',
          speaker: 'Landlord',
          message: 'The penalty is equivalent to 2 months rent, so that would be $5,000 total. However, I can waive one month if you help find a replacement tenant.',
          context: 'Negotiation opportunity'
        },
        {
          type: 'user',
          speaker: 'You',
          message: 'That seems fair. I can start showing the apartment and post listings. When would I need to move out?',
          context: 'Accepting negotiated terms'
        }
      ],
      outcome: {
        result: 'Successful negotiation with reduced penalty',
        keyPoints: [
          'Early termination fee reduced from $5,000 to $2,500',
          'You help find replacement tenant',
          '60-day notice period maintained',
          'Security deposit can be applied to penalty'
        ],
        lessonsLearned: [
          'Reading lease terms carefully helps in negotiations',
          'Landlords may be flexible when you cooperate',
          'Helping find replacement tenants can reduce costs'
        ]
      }
    },
    {
      id: 'maintenance-dispute',
      title: 'Property Maintenance Dispute',
      description: 'The heating system broke and landlord is slow to respond',
      difficulty: 'high',
      relevantRoles: ['tenant'],
      estimatedTime: '7 minutes',
      steps: [
        {
          type: 'user',
          speaker: 'You',
          message: 'The heating hasn\'t worked for 3 days now. It\'s freezing in my apartment and this needs to be fixed immediately.',
          context: 'Emergency maintenance request'
        },
        {
          type: 'landlord',
          speaker: 'Landlord',
          message: 'I\'ve contacted a repair service but they\'re backed up. According to the lease, you\'re responsible for maintenance issues.',
          context: 'Landlord avoiding responsibility'
        },
        {
          type: 'user',
          speaker: 'You',
          message: 'That\'s not correct. The lease states I\'m responsible for minor repairs, but heating systems are the landlord\'s responsibility.',
          context: 'Citing lease terms'
        },
        {
          type: 'landlord',
          speaker: 'Landlord',
          message: 'Let me review the lease again. You\'re right - I\'ll get an emergency repair service out today, even if it costs more.',
          context: 'Landlord accepts responsibility'
        }
      ],
      outcome: {
        result: 'Quick resolution by knowing your rights',
        keyPoints: [
          'Emergency repairs completed same day',
          'No cost to tenant',
          'Established clear maintenance responsibilities',
          'Landlord covers emergency service fees'
        ],
        lessonsLearned: [
          'Know which repairs are landlord vs tenant responsibility',
          'Keep records of maintenance requests',
          'Cite specific lease clauses when needed'
        ]
      }
    },
    {
      id: 'freelance-scope',
      title: 'Project Scope Expansion',
      description: 'Client wants additional work beyond the original contract',
      difficulty: 'medium',
      relevantRoles: ['freelancer'],
      estimatedTime: '4 minutes',
      steps: [
        {
          type: 'client',
          speaker: 'Client',
          message: 'We love the initial design! Can you also create a mobile app version? This should be quick since you already have the design.',
          context: 'Client requesting scope change'
        },
        {
          type: 'user',
          speaker: 'You',
          message: 'I\'m glad you like it! The mobile app would be additional work beyond our current contract. Let me prepare a separate proposal for that.',
          context: 'Professional boundary setting'
        },
        {
          type: 'client',
          speaker: 'Client',
          message: 'But isn\'t this just adapting the existing design? I thought it would be included in the original price.',
          context: 'Client pushback on additional costs'
        },
        {
          type: 'user',
          speaker: 'You',
          message: 'Our contract specifically covers web design. Mobile app development requires different skills and additional time. I can offer a 20% discount since we\'re already working together.',
          context: 'Referencing contract while offering compromise'
        }
      ],
      outcome: {
        result: 'Professional boundary maintained with additional revenue',
        keyPoints: [
          'Additional project secured with 20% discount',
          'Clear scope boundaries established',
          'Client relationship maintained',
          'Original project timeline unaffected'
        ],
        lessonsLearned: [
          'Always refer back to the original contract',
          'Scope creep should be addressed immediately',
          'Offer compromises while maintaining boundaries'
        ]
      }
    }
  ];

  const relevantScenarios = scenarios.filter(scenario => 
    scenario.relevantRoles.includes(userRole)
  );

  const handleStartSimulation = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setCurrentStep(0);
    setIsSimulating(true);
  };

  const handleNextStep = () => {
    const scenario = scenarios.find(s => s.id === selectedScenario);
    if (scenario && currentStep < scenario.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setCurrentStep(0);
    setIsSimulating(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (selectedScenario && isSimulating) {
    const scenario = scenarios.find(s => s.id === selectedScenario)!;
    const currentStepData = scenario.steps[currentStep];
    const isComplete = currentStep === scenario.steps.length - 1;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{scenario.title}</h2>
            <p className="text-gray-600">Step {currentStep + 1} of {scenario.steps.length}</p>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Exit Simulation
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / scenario.steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Dialogue */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-full ${
              currentStepData.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <Users className={`h-6 w-6 ${
                currentStepData.type === 'user' ? 'text-blue-600' : 'text-gray-600'
              }`} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-semibold text-gray-900">{currentStepData.speaker}</h4>
                <span className="text-sm text-gray-500">• {currentStepData.context}</span>
              </div>
              
              <div className={`p-4 rounded-lg ${
                currentStepData.type === 'user' 
                  ? 'bg-blue-50 border-l-4 border-blue-500' 
                  : 'bg-gray-50 border-l-4 border-gray-400'
              }`}>
                <p className="text-gray-800">{currentStepData.message}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Context: {currentStepData.context}
            </div>
            
            {!isComplete ? (
              <button
                onClick={handleNextStep}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Continue</span>
                <MessageCircle className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsSimulating(false)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="h-4 w-4" />
                <span>See Outcome</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (selectedScenario && !isSimulating) {
    const scenario = scenarios.find(s => s.id === selectedScenario)!;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Scenario Complete</h2>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Try Another Scenario
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Outcome</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{scenario.outcome.result}</h4>
                  <ul className="space-y-2">
                    {scenario.outcome.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-sm text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Lessons</h3>
            <ul className="space-y-3">
              {scenario.outcome.lessonsLearned.map((lesson, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="p-1 bg-blue-100 rounded-full mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700">{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">What's Next?</h3>
          <p className="text-blue-800 mb-4">
            This scenario demonstrates how understanding your legal document helps in real-world situations. 
            Try other scenarios or use the Clause Rewriter to better understand your contract terms.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsSimulating(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Replay Scenario
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Try Different Scenario
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Scenario Simulation</h2>
        <p className="text-lg text-gray-600">
          Practice real-world situations based on your legal document. See how different scenarios might play out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relevantScenarios.map((scenario) => (
          <div key={scenario.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Play className="h-6 w-6 text-blue-600" />
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                {scenario.difficulty}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{scenario.title}</h3>
            <p className="text-gray-600 mb-4">{scenario.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>⏱ {scenario.estimatedTime}</span>
              <span>{scenario.steps.length} steps</span>
            </div>
            
            <button
              onClick={() => handleStartSimulation(scenario.id)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Simulation
            </button>
          </div>
        ))}
      </div>

      {relevantScenarios.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No scenarios available</h3>
          <p className="text-gray-600">
            Change your user role to see relevant scenarios for your situation.
          </p>
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">How Scenarios Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Play className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Interactive Dialogue</h4>
              <p className="text-sm text-gray-600">Step through realistic conversations</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Real Outcomes</h4>
              <p className="text-sm text-gray-600">See likely results and consequences</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Learn Key Lessons</h4>
              <p className="text-sm text-gray-600">Understand important legal concepts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};