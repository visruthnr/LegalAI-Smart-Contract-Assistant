import React from 'react';
import { User, Briefcase, Building, Home, ShoppingCart } from 'lucide-react';
import { UserRole } from '../types';

interface UserProfileProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userRole, onRoleChange }) => {
  const roles = [
    {
      id: 'tenant' as UserRole,
      title: 'Tenant/Renter',
      description: 'Looking at rental agreements, lease terms',
      icon: Home,
      color: 'blue',
      priorities: ['Rent terms', 'Security deposits', 'Maintenance responsibilities', 'Termination clauses']
    },
    {
      id: 'freelancer' as UserRole,
      title: 'Freelancer',
      description: 'Reviewing client contracts and service agreements',
      icon: Briefcase,
      color: 'green',
      priorities: ['Payment terms', 'Scope of work', 'Intellectual property', 'Termination clauses']
    },
    {
      id: 'startup' as UserRole,
      title: 'Startup Founder',
      description: 'Analyzing investor agreements, partnerships',
      icon: Building,
      color: 'purple',
      priorities: ['Equity terms', 'Voting rights', 'Exit clauses', 'Board composition']
    },
    {
      id: 'employee' as UserRole,
      title: 'Employee',
      description: 'Understanding employment contracts, NDAs',
      icon: User,
      color: 'orange',
      priorities: ['Compensation', 'Benefits', 'Non-compete clauses', 'Termination conditions']
    },
    {
      id: 'consumer' as UserRole,
      title: 'Consumer',
      description: 'Reading terms of service, privacy policies',
      icon: ShoppingCart,
      color: 'pink',
      priorities: ['Privacy rights', 'Refund policies', 'Data usage', 'Service limitations']
    }
  ];

  const currentRoleData = roles.find(role => role.id === userRole);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h2>
        <p className="text-lg text-gray-600">
          Select your role to get personalized document analysis and relevant clause highlighting.
        </p>
      </div>

      {/* Role Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = userRole === role.id;
          
          return (
            <button
              key={role.id}
              onClick={() => onRoleChange(role.id)}
              className={`p-6 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                isSelected
                  ? `border-${role.color}-500 bg-${role.color}-50 shadow-md`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`inline-flex p-3 rounded-lg mb-4 ${
                isSelected
                  ? `bg-${role.color}-100`
                  : 'bg-gray-100'
              }`}>
                <Icon className={`h-6 w-6 ${
                  isSelected
                    ? `text-${role.color}-600`
                    : 'text-gray-600'
                }`} />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{role.title}</h3>
              <p className="text-gray-600 mb-4">{role.description}</p>
              
              {isSelected && (
                <div className="bg-white bg-opacity-70 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-800 mb-2">Your priorities:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {role.priorities.map((priority, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 bg-${role.color}-500 rounded-full`}></div>
                        <span>{priority}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Current Profile Summary */}
      {currentRoleData && (
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Profile</h3>
          
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg bg-${currentRoleData.color}-100`}>
              <currentRoleData.icon className={`h-8 w-8 text-${currentRoleData.color}-600`} />
            </div>
            
            <div className="flex-1">
              <h4 className="text-lg font-medium text-gray-900 mb-2">{currentRoleData.title}</h4>
              <p className="text-gray-600 mb-4">{currentRoleData.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Focus Areas</h5>
                  <ul className="space-y-1">
                    {currentRoleData.priorities.map((priority, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                        <div className={`w-1.5 h-1.5 bg-${currentRoleData.color}-500 rounded-full`}></div>
                        <span>{priority}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Personalized Features</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Role-specific clause highlighting</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Tailored risk assessments</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Relevant scenario simulations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Customized question suggestions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};