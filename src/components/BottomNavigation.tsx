
import { useState } from "react";
import { Home, Search, Compass, MessageSquare, User, Users, Info } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface BottomNavigationProps {
  onNotification: (title: string, description: string) => void;
}

const BottomNavigation = ({ onNotification }: BottomNavigationProps) => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();
  const { t } = useLanguage();

  const getHomePath = () => {
    if (profile?.user_type === 'student') return '/student';
    if (profile?.user_type === 'mentor') return '/mentor';
    if (profile?.user_type === 'parent') return '/parent';
    if (profile?.user_type === 'school') return '/school';
    if (profile?.is_admin || profile?.is_super_admin) return '/admin';
    return '/student'; // Default to student dashboard for authenticated users
  };

  const navItems = [
    { id: "home", icon: Home, label: t('home'), path: getHomePath() },
    { id: "explore", icon: Search, label: t('explore'), path: "/explore" },
    { id: "mentors", icon: Users, label: t('mentors'), path: "/mentors" },
    { id: "journey", icon: Compass, label: t('journey'), path: "/journey" },
    { id: "messages", icon: MessageSquare, label: t('messages'), path: "/messages" },
    { id: "info", icon: Info, label: t('info'), path: "/info" },
    { id: "profile", icon: User, label: t('profile'), path: "/profile" },
  ];

  const handleTabClick = (tabId: string, label: string, path: string) => {
    setActiveTab(tabId);
    navigate(path);
    if (tabId !== "home") {
      onNotification(
        `${label} Section`,
        `Welcome to the ${label} section! Explore all the features available here.`
      );
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id, item.label, item.path)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 hover-bounce ${
                  isActive 
                    ? 'text-negari-orange bg-negari-orange/10' 
                    : 'text-gray-500 hover:text-negari-indigo hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? 'animate-bounce-gentle' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div className="w-1 h-1 bg-negari-orange rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
