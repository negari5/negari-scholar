import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { useSubscriptions } from '@/contexts/SubscriptionContext';

interface SubscriptionPlansProps {
  onSelectPlan: (subscriptionType: string) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onSelectPlan }) => {
  const { subscriptions } = useSubscriptions();

  const activePlans = subscriptions.filter(sub => sub.is_active);

  return (
    <div className="space-y-12 py-8">
      {/* Subscription Tiers */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-negari-indigo mb-2">Choose Your Subscription</h3>
          <p className="text-muted-foreground">Select a plan that fits your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {activePlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative hover:shadow-lg transition-all duration-200 ${
                plan.popular ? 'border-negari-orange border-2' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-negari-orange text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-negari-indigo">{plan.name}</CardTitle>
                <CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-negari-indigo">
                      {plan.currency === 'USD' ? '$' : plan.currency}
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.duration}</span>
                  </div>
                  {plan.trialDays > 0 && (
                    <p className="text-sm text-negari-orange mt-2">
                      {plan.trialDays}-day free trial
                    </p>
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-negari-orange mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-negari-orange hover:bg-negari-indigo' 
                      : 'bg-negari-indigo hover:bg-negari-orange'
                  }`}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Account Types */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-negari-indigo mb-2">Select Your Journey Path</h3>
          <p className="text-muted-foreground">Choose the path that matches your academic stage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            {
              id: 'junior',
              title: 'Negari Junior',
              subtitle: 'Grades 10-11',
              description: 'Early preparation and foundation building',
              color: 'border-green-400'
            },
            {
              id: 'starter',
              title: 'Starter Kit',
              subtitle: 'Grade 12',
              description: 'Exam preparation and document readiness',
              color: 'border-blue-400'
            },
            {
              id: 'senior',
              title: 'Negari Senior',
              subtitle: 'Post-Grade 12',
              description: 'Scholarship exploration and applications',
              color: 'border-purple-400'
            },
            {
              id: 'rise',
              title: 'Negari RISE',
              subtitle: 'Alternative Track',
              description: 'Alternative pathways and skill building',
              color: 'border-orange-400'
            }
          ].map((type) => (
            <Card 
              key={type.id}
              className={`hover:shadow-lg transition-all duration-200 border-2 ${type.color}`}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-lg text-negari-indigo">{type.title}</CardTitle>
                <CardDescription className="font-medium text-negari-orange">
                  {type.subtitle}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  {type.description}
                </p>

                <Button
                  onClick={() => onSelectPlan(type.id)}
                  variant="outline"
                  className="w-full border-negari-indigo hover:bg-negari-indigo hover:text-white"
                >
                  Select {type.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;