
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import PersonalizedWelcome from "@/components/PersonalizedWelcome";
import ProgressTracker from "@/components/ProgressTracker";
import ReadinessTools from "@/components/ReadinessTools";
import ScholarshipExplorer from "@/components/ScholarshipExplorer";
import EnhancedSuccessStories from "@/components/EnhancedSuccessStories";
import FamilySupport from "@/components/FamilySupport";
import UpdatesAnnouncements from "@/components/UpdatesAnnouncements";
import BottomNavigation from "@/components/BottomNavigation";
import AuthButton from "@/components/AuthButton";
import { useAuth } from "@/contexts/AuthContext";
import ProfileCompletion from "@/components/ProfileCompletion";
import DreamTracker from "@/components/DreamTracker";
import UserTypeBasedContent from "@/components/UserTypeBasedContent";
import HeroLanding from "@/components/HeroLanding";
import LandingPage from "@/components/LandingPage";
import { Target, Brain, Globe, Users, Award, Bell, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AuthenticatedIndex = () => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const navigate = useNavigate();

  // Show profile completion if profile is not complete
  console.log('AuthenticatedIndex - profile:', profile);
  if (profile && !profile.has_completed_profile) {
    console.log('Showing profile completion form');
    return <ProfileCompletion onComplete={() => {
      console.log('Profile completion callback triggered');
      // Force a reload to refetch the profile and navigate properly
      window.location.href = '/';
    }} />;
  }

  console.log('Showing landing page for authenticated user');
  // Show landing page for authenticated users with completed profile
  return (
    <div className="min-h-screen overflow-auto">
      <LandingPage />
    </div>
  );
};

export default AuthenticatedIndex;
