import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GraduationCap, ChevronDown, Target, Users, Award, BookOpen, Brain, Sparkles, Star, Mail, Phone, MapPin, Shield, Globe, Smartphone, FileText, Heart, TrendingUp, Clock, Zap, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/MockAuthContext";
import AuthButton from "@/components/AuthButton";
import AuthModal from "@/components/AuthModal";
import SelfAssessment from "@/components/SelfAssessment";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from "react";
const LandingPage = () => {
  const { profile } = useAuth();
  const { subscriptions } = useSubscriptions();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  // Remove the mock subscription types - now using context
  // const subscriptionTypes = [ ... ];

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Basic SEO for landing page
  useEffect(() => {
    document.title = "Negari — Open Doors to Global Opportunities";
    const desc = "AI-powered scholarship companion guiding Ethiopian students from Grade 10 to global opportunities.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

    // Listen for custom auth modal events
    const handleOpenAuthModal = () => setShowAuthModal(true);
    window.addEventListener('open-auth-modal', handleOpenAuthModal);
    
    return () => {
      window.removeEventListener('open-auth-modal', handleOpenAuthModal);
    };
  }, []);

  if (showAssessment) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Button 
              onClick={() => setShowAssessment(false)}
              variant="outline"
              className="mb-4"
            >
              ← Back to Home
            </Button>
          </div>
          <SelfAssessment />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      {/* Sticky Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/8100b743-8748-46c8-952a-e50f9e5f88e0.png" 
              alt="Negari Logo" 
              className="h-10 w-10"
            />
            <span className={`font-comfortaa font-bold text-xl ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>Negari</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
              <Button 
                size="sm"
                onClick={() => setShowAuthModal(true)}
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full"
              >
                {t('start_journey')}
              </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col">
        {/* Header */}
        <div className="relative z-10 hidden">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/8100b743-8748-46c8-952a-e50f9e5f88e0.png" 
              alt="Negari Logo" 
              className="h-12 w-12"
            />
            <span className="font-comfortaa font-bold text-2xl text-white">Negari</span>
            {profile?.is_admin && (
              <Badge variant="secondary" className="bg-negari-gold text-negari-navy">
                Admin
              </Badge>
            )}
          </div>
          <AuthButton />
        </div>

        {/* Floating Graduation Caps */}
        <div className="absolute inset-0 overflow-hidden">
          <GraduationCap className="absolute top-10 left-10 h-16 w-16 text-amber-400/30 animate-bounce" style={{animationDelay: '0s', animationDuration: '8s'}} />
          <GraduationCap className="absolute top-20 right-20 h-12 w-12 text-sky-400/25 animate-bounce" style={{animationDelay: '1s', animationDuration: '10s'}} />
          <GraduationCap className="absolute top-32 left-1/4 h-20 w-20 text-amber-400/20 animate-bounce" style={{animationDelay: '2s', animationDuration: '7s'}} />
          <GraduationCap className="absolute bottom-32 right-1/4 h-14 w-14 text-sky-400/35 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '9s'}} />
          <GraduationCap className="absolute bottom-20 left-20 h-18 w-18 text-amber-400/30 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '11s'}} />
        </div>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-6 relative z-10">
          <div className="mb-6 animate-fade-in-up">
            <img 
              src="/lovable-uploads/8100b743-8748-46c8-952a-e50f9e5f88e0.png" 
              alt="Negari Logo"
              className="h-28 w-28 mx-auto rounded-lg shadow-[0_0_40px_rgba(56,189,248,0.6)]"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-comfortaa font-bold text-white mb-6 animate-fade-in-up">
            Negari is Here to<br />
            <span className="text-sky-400">Open Doors</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            AI-powered scholarship companion guiding Ethiopian students from Grade 10 to global opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Button 
              size="lg" 
              onClick={() => setShowAuthModal(true)}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-6 text-lg rounded-full"
            >
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowAssessment(true)}
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold px-8 py-6 text-lg rounded-full backdrop-blur-sm"
            >
              Assessment Test
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
            <div className="flex flex-col items-center text-white/60">
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* What is Negari Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-comfortaa font-bold text-gray-900 mb-6">
              What is Negari?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Four specialized pathways designed to meet every Ethiopian student where they are and guide them to where they want to be.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Starter Kit */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-amber-500/20 rounded-xl">
                    <BookOpen className="h-8 w-8 text-amber-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-comfortaa text-gray-900">Starter Kit</CardTitle>
                <CardDescription className="text-gray-600">
                  Perfect for Grade 10-12 students beginning their scholarship journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">Essay Writing Coach</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">Scholarship Database</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">Application Tracker</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Senior */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-sky-500/20 rounded-xl">
                    <Users className="h-8 w-8 text-sky-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-comfortaa text-gray-900">Senior</CardTitle>
                <CardDescription className="text-gray-600">
                  Advanced tools for graduating students and university applicants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    <span className="text-sm">AI Interview Prep</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    <span className="text-sm">Document Vault</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    <span className="text-sm">Mentor Network</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* RISE */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-amber-500/20 rounded-xl">
                    <Sparkles className="h-8 w-8 text-amber-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-comfortaa text-gray-900">RISE</CardTitle>
                <CardDescription className="text-gray-600">
                  Elite pathway for exceptional students aiming for top global universities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">Personal Counselor</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">Research Opportunities</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">Leadership Development</span>
                  </li>
                </ul>
                <Badge className="mt-4 bg-amber-500/20 text-amber-600 border-amber-500/30">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>

            {/* Jr. */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-sky-500/20 rounded-xl">
                    <Brain className="h-8 w-8 text-sky-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-comfortaa text-gray-900">Jr.</CardTitle>
                <CardDescription className="text-gray-600">
                  Early preparation tools for middle school students (Grades 7-9)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    <span className="text-sm">Study Skills</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    <span className="text-sm">Career Exploration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    <span className="text-sm">Foundation Building</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Moved here */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-comfortaa font-bold text-gray-900 mb-6">{t('stay_updated')}</h2>
            <p className="text-xl text-gray-600 mb-12">{t('newsletter_desc')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 max-w-md mx-auto">
              <Input type="email" placeholder={t('email_placeholder')} className="flex-1" />
              <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8">{t('subscribe_now')}</Button>
            </div>
            <div className="text-center mb-12">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => window.open('https://t.me/negarischolars', '_blank')}
              >
                <MessageSquare className="h-4 w-4" />
                {t('join_telegram')}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-sky-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Weekly Opportunities</h3>
                <p className="text-gray-600">Fresh scholarship opportunities curated specifically for Ethiopian students</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Success Stories</h3>
                <p className="text-gray-600">Inspiring stories from students who've achieved their dreams</p>
              </div>
              <div className="text-center">
                <div className="bg-sky-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Platform Updates</h3>
                <p className="text-gray-600">Be the first to know about new features and improvements</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">We respect your privacy. Unsubscribe at any time. No spam, guaranteed.</p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-comfortaa font-bold text-gray-900 mb-8">
              The Problem We Solve
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="text-8xl md:text-9xl font-bold text-amber-500 mb-4">85%</div>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Over 85% of Ethiopian students don't pass national exams, but we believe this doesn't define their potential or limit their destiny.
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Traditional education systems often fail to recognize diverse talents and alternative pathways to success. Many brilliant minds are left behind simply because they don't fit a narrow definition of academic achievement.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-comfortaa font-bold text-gray-900 mb-4">Our Belief</h3>
            <blockquote className="text-2xl md:text-3xl font-medium text-sky-500 italic mb-6">
              "Talent shouldn't be lost to circumstance."
            </blockquote>
            <p className="text-lg text-gray-600">
              Negari believes that every Ethiopian student has the potential to achieve greatness when given the right tools, guidance, and opportunities.
            </p>
            <p className="text-lg text-gray-600 mt-4">
              We're building bridges where traditional systems build walls, creating alternative pathways to global education and career opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Powerful Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-comfortaa font-bold text-gray-900 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to navigate your educational journey and unlock global opportunities, all in one intelligent platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-sky-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-500/20 transition-colors">
                <Brain className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Essay Coach</h3>
              <p className="text-gray-600">Get personalized feedback on your scholarship essays with AI-powered writing assistance</p>
            </div>

            <div className="text-center group">
              <div className="bg-amber-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors">
                <Target className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Scholarship Finder</h3>
              <p className="text-gray-600">Discover relevant scholarships from our comprehensive database of global opportunities</p>
            </div>

            <div className="text-center group">
              <div className="bg-sky-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-500/20 transition-colors">
                <Globe className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Offline Toolkit</h3>
              <p className="text-gray-600">Access essential tools and resources even without internet connectivity</p>
            </div>

            <div className="text-center group">
              <div className="bg-amber-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors">
                <Shield className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Document Vault</h3>
              <p className="text-gray-600">Securely store and organize all your academic documents and certificates</p>
            </div>

            <div className="text-center group">
              <div className="bg-sky-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-500/20 transition-colors">
                <Users className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Parent & Mentor Portal</h3>
              <p className="text-gray-600">Connect with mentors and keep parents involved in your academic journey</p>
            </div>

            <div className="text-center group">
              <div className="bg-amber-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">RISE Pathway</h3>
              <p className="text-gray-600">Elite program for exceptional students targeting top global universities</p>
            </div>

            <div className="text-center group">
              <div className="bg-sky-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-500/20 transition-colors">
                <BookOpen className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Jr. Prep Tools</h3>
              <p className="text-gray-600">Early preparation tools for middle school students to build strong academic foundations</p>
            </div>

            <div className="text-center group">
              <div className="bg-amber-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors">
                <Smartphone className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile First</h3>
              <p className="text-gray-600">Optimized for mobile devices to ensure accessibility for all Ethiopian students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <SubscriptionPlans onSelectPlan={(plan) => setShowAuthModal(true)} />
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-comfortaa font-bold text-gray-900 mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start with a free trial and find the perfect plan for your educational journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptions.map((plan) => (
              <Card key={plan.id} className={`relative hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'scale-105 border-2 border-secondary' : plan.color}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-secondary text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-comfortaa text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">{plan.duration}</span>
                  </div>
                  <Badge variant="outline" className="mt-2">
                    <Clock className="h-3 w-3 mr-1" />
                    {plan.trialDays} days free trial
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-full shrink-0"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-secondary hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'} text-white`}
                    onClick={() => setShowAuthModal(true)}
                  >
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-comfortaa font-bold text-gray-900 mb-6">
              Student Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from Ethiopian students who've transformed their futures with Negari
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-xl border-0">
              <CardContent className="p-8">
                <blockquote className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                  "Negari's AI essay coach helped me write a winning scholarship essay. I received a full scholarship to study Engineering in Canada!"
                </blockquote>
                <div className="flex items-center">
                  <div className="bg-sky-500 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mr-4">
                    MT
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Meron Tadesse</h4>
                    <p className="text-gray-600">Grade 12 Student</p>
                    <p className="text-gray-500 text-sm">Addis Ababa Science Academy</p>
                    <Badge className="mt-2 bg-amber-500/20 text-amber-600">Senior</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl border-0">
              <CardContent className="p-8">
                <blockquote className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                  "Through Negari's scholarship database, I found and won a scholarship to study Medicine in Germany. My dreams came true!"
                </blockquote>
                <div className="flex items-center">
                  <div className="bg-amber-500 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mr-4">
                    DA
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Daniel Abebe</h4>
                    <p className="text-gray-600">University Freshman</p>
                    <p className="text-gray-500 text-sm">Jimma University</p>
                    <Badge className="mt-2 bg-sky-500/20 text-sky-600">Starter Kit</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl border-0">
              <CardContent className="p-8">
                <blockquote className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                  "The mentorship program connected me with alumni who guided me through my MBA application to Harvard Business School!"
                </blockquote>
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mr-4">
                    SM
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Sara Mekonnen</h4>
                    <p className="text-gray-600">MBA Student</p>
                    <p className="text-gray-500 text-sm">Harvard Business School</p>
                    <Badge className="mt-2 bg-green-500/20 text-green-600">RISE</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Join the Negari Community */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-comfortaa font-bold text-gray-900 mb-6">Join the Negari Community</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Whether you're a student, parent, mentor, or educator, there's a place for you in our mission to transform Ethiopian education.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-sky-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Students</h3>
                <p className="text-gray-600 mb-4">Take control of your educational journey and unlock global opportunities</p>
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Start My Journey
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-amber-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Parents</h3>
                <p className="text-gray-600 mb-4">Support your child's dreams with tools designed for family involvement</p>
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  Support My Child
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-sky-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mentors</h3>
                <p className="text-gray-600 mb-4">Guide the next generation of Ethiopian leaders and changemakers</p>
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Become a Guide
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-sky-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Schools</h3>
                <p className="text-gray-600 mb-4">Empower your students with comprehensive scholarship and career guidance</p>
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Bring Negari to My Classroom
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">10K+</div>
              <p className="text-gray-600">Students Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">500+</div>
              <p className="text-gray-600">Scholarships Won</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">50+</div>
              <p className="text-gray-600">Countries Reached</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1000+</div>
              <p className="text-gray-600">Mentors Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/lovable-uploads/8100b743-8748-46c8-952a-e50f9e5f88e0.png" 
              alt="Negari Logo" 
              className="h-8 w-8"
            />
            <span className="font-comfortaa font-bold text-xl">Negari</span>
          </div>
          <p className="text-white/70 mb-4">
            The future is yours. We're just here to guide you.
          </p>
          <p className="text-white/50 text-sm">
            © 2024 Negari. All rights reserved.
          </p>
        </div>
      </footer>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default LandingPage;
