import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { useLanguage } from '@/contexts/LanguageContext';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/MockAuthContext';
import { useToast } from '@/hooks/use-toast';
import SuperAdminSystemControls from '@/components/SuperAdminSystemControls';
import AdminProfileEditor from '@/components/AdminProfileEditor';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { 
  Users, Award, MessageSquare, Settings, Plus, Edit3, Trash2, 
  Shield, UserCheck, UserX, Calendar, Globe, BookOpen, Crown,
  Monitor, UserCog, Send, User, ExternalLink, Mail, Phone,
  MapPin, CheckCircle, AlertCircle, Info, Archive, Ban, 
  Image, BarChart3, DollarSign, Languages, Eye, Upload,
  ChevronDown, TrendingUp, FileText, Building
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import ViewWebsiteSelector from '@/components/ViewWebsiteSelector';
import MentorRegistrationForm from '@/components/MentorRegistrationForm';
import SchoolRegistrationForm from '@/components/SchoolRegistrationForm';

interface Scholarship {
  id: string;
  title: string;
  description: string;
  provider: string;
  country: string;
  university: string;
  field_of_study: string[];
  degree_level: string[];
  amount_min: number;
  amount_max: number;
  currency: string;
  application_deadline: string;
  is_active: boolean;
  featured: boolean;
  application_url?: string;
}

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  user_type: string;
  city: string;
  phone: string;
  is_admin: boolean;
  is_super_admin: boolean;
  status: 'active' | 'archived' | 'banned';
  created_at: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  announcement_type: string;
  target_user_types: string[];
  priority: string;
  is_active: boolean;
  expires_at: string;
}

interface Ad {
  id: string;
  title: string;
  description: string;
  image_url: string;
  target_url: string;
  is_active: boolean;
  placement: string;
  start_date: string;
  end_date: string;
}

interface Subscription {
  id: string;
  name: string;
  price: number;
  features: string[];
  is_active: boolean;
  currency: string;
  trial_days?: number;
}

const AdminDashboard: React.FC = () => {
  const { profile, user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { subscriptions, setSubscriptions, addSubscription, updateSubscription, deleteSubscription } = useSubscriptions();
  const { t } = useLanguage();
  const isSuperAdminUI = !!(profile?.is_super_admin || user?.email === 'negari@gmail.com');
  const isAdminUI = !!(profile?.is_admin || isSuperAdminUI);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // State for all data
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  // subscriptions now come from context

  // Form states
  const [showScholarshipForm, setShowScholarshipForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showAdForm, setShowAdForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Settings states
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: 'Negari Platform',
    tagline: 'Your Journey to Success Starts Here',
    heroTitle: 'Unlock Your Potential',
    heroSubtitle: 'Find scholarships, track your progress, and achieve your dreams',
    primaryColor: '#FF6B35',
    secondaryColor: '#2D3748',
    logo: '',
    contactEmail: 'support@negari.com',
    contactPhone: '+1234567890'
  });

  const [paymentSettings, setPaymentSettings] = useState({
    chapaPublicKey: '',
    chapaSecretKey: '',
    enableChapa: false,
    currency: 'ETB'
  });

  const [languageSettings, setLanguageSettings] = useState({
    defaultLanguage: 'english',
    enabledLanguages: ['english', 'amharic'],
    googleTranslateApiKey: ''
  });

  // Additional settings states
  const [footerSettings, setFooterSettings] = useState({
    companyName: 'Negari Platform',
    description: 'Empowering Ethiopian students to achieve their educational dreams through scholarships and mentorship.',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: '',
      tiktok: '',
      telegram: ''
    },
    contactInfo: {
      email: 'support@negari.com',
      phone: '+251-911-000000',
      address: 'Addis Ababa, Ethiopia'
    },
    showNewsletterSignup: true
  });

  const [smtpSettings, setSmtpSettings] = useState({
    host: '',
    port: '587',
    username: '',
    password: '',
    fromEmail: '',
    fromName: 'Negari Platform',
    enableSSL: true
  });

  const [cookieSettings, setCookieSettings] = useState({
    enableCookieNotice: true,
    cookieNoticeText: 'We use cookies to enhance your experience on our platform.',
    necessaryCookies: true,
    analyticalCookies: false,
    marketingCookies: false,
    privacyPolicyUrl: '/privacy-policy'
  });

  const [recaptchaSettings, setRecaptchaSettings] = useState({
    enableRecaptcha: false,
    siteKey: '',
    secretKey: '',
    threshold: 0.5,
    enableOnForms: ['contact', 'registration', 'application']
  });

  const [showMentorForm, setShowMentorForm] = useState(false);
  const [showSchoolForm, setShowSchoolForm] = useState(false);

  // Form data
  const [scholarshipForm, setScholarshipForm] = useState({
    title: '',
    description: '',
    provider: '',
    country: '',
    university: '',
    field_of_study: [],
    degree_level: [],
    amount_min: '',
    amount_max: '',
    currency: 'USD',
    application_deadline: '',
    is_active: true,
    featured: false,
    application_url: ''
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: '',
    announcement_type: 'general',
    target_user_types: ['starter', 'senior', 'rise', 'junior'],
    target_community: 'all', // New field
    target_pathway: 'all',   // New field
    target_subscription: 'all', // New field
    priority: 'medium',
    expires_at: ''
  });

  const [userForm, setUserForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    user_type: 'starter',
    is_admin: false,
    phone: '',
    city: ''
  });

  const [adForm, setAdForm] = useState({
    title: '',
    description: '',
    image_url: '',
    target_url: '',
    placement: 'banner',
    target_subscription: 'all', // New field for subscription targeting
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    if (isAdminUI) {
      fetchData();
    }
  }, [profile, isAdminUI]);

  const fetchData = async () => {
    try {
      // Mock data
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'negari@gmail.com',
          first_name: 'Super',
          last_name: 'Admin',
          full_name: 'Super Admin',
          user_type: 'super_admin',
          city: 'System City',
          phone: '+1234567890',
          is_admin: true,
          is_super_admin: true,
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          email: 'student@test.com',
          first_name: 'Test',
          last_name: 'Student',
          full_name: 'Test Student',
          user_type: 'student',
          city: 'Test City',
          phone: '+1234567891',
          is_admin: false,
          is_super_admin: false,
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          email: 'parent@test.com',
          first_name: 'Test',
          last_name: 'Parent',
          full_name: 'Test Parent',
          user_type: 'parent',
          city: 'Parent City',
          phone: '+1234567892',
          is_admin: false,
          is_super_admin: false,
          status: 'archived',
          created_at: new Date().toISOString()
        }
      ];

      const mockScholarships: Scholarship[] = [
        {
          id: '1',
          title: 'Fulbright Program',
          description: 'International educational exchange program',
          provider: 'U.S. State Department',
          country: 'United States',
          university: 'Various',
          field_of_study: ['All Fields'],
          degree_level: ['master', 'phd'],
          amount_min: 25000,
          amount_max: 50000,
          currency: 'USD',
          application_deadline: '2024-10-15',
          is_active: true,
          featured: true
        }
      ];

      const mockAnnouncements: Announcement[] = [
        {
          id: '1',
          title: 'Welcome to Negari Platform!',
          content: 'We are excited to have you join our community.',
          announcement_type: 'general',
          target_user_types: ['starter', 'senior', 'rise', 'junior'],
          priority: 'medium',
          is_active: true,
          expires_at: '2024-12-31'
        }
      ];

      const mockAds: Ad[] = [
        {
          id: '1',
          title: 'Study Abroad Consultation',
          description: 'Get expert advice on studying abroad',
          image_url: '/placeholder-ad.jpg',
          target_url: 'https://example.com',
          is_active: true,
          placement: 'banner',
          start_date: '2024-01-01',
          end_date: '2024-12-31'
        }
      ];

      // Remove mockSubscriptions setup since we use context
      setUsers(mockUsers);
      setScholarships(mockScholarships);
      setAnnouncements(mockAnnouncements);
      setAds(mockAds);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleScholarshipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...scholarshipForm,
        amount_min: scholarshipForm.amount_min ? parseFloat(scholarshipForm.amount_min) : 0,
        amount_max: scholarshipForm.amount_max ? parseFloat(scholarshipForm.amount_max) : 0,
      };

      if (editingItem) {
        setScholarships(prev => prev.map(s => 
          s.id === editingItem.id ? { ...s, ...data } : s
        ));
        toast({ title: "Success", description: "Scholarship updated successfully." });
      } else {
        const newScholarship: Scholarship = {
          id: Date.now().toString(),
          ...data,
          field_of_study: data.field_of_study || [],
          degree_level: data.degree_level || []
        };
        setScholarships(prev => [newScholarship, ...prev]);
        toast({ title: "Success", description: "Scholarship created successfully." });
      }

      resetScholarshipForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save scholarship.",
        variant: "destructive"
      });
    }
  };

  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        setAnnouncements(prev => prev.map(a => 
          a.id === editingItem.id ? { ...a, ...announcementForm } : a
        ));
        toast({ title: "Success", description: "Announcement updated successfully." });
      } else {
        const newAnnouncement: Announcement = {
          id: Date.now().toString(),
          ...announcementForm,
          is_active: true
        };
        setAnnouncements(prev => [newAnnouncement, ...prev]);
        toast({ title: "Success", description: "Announcement created successfully." });
      }

      resetAnnouncementForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save announcement.",
        variant: "destructive"
      });
    }
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        setUsers(prev => prev.map(u => 
          u.id === editingItem.id ? { 
            ...u, 
            ...userForm, 
            full_name: `${userForm.first_name} ${userForm.last_name}`.trim() 
          } : u
        ));
        toast({ title: "Success", description: "User updated successfully." });
      } else {
        const newUser: User = {
          id: Date.now().toString(),
          ...userForm,
          full_name: `${userForm.first_name} ${userForm.last_name}`.trim(),
          is_super_admin: false,
          status: 'active',
          created_at: new Date().toISOString()
        };
        setUsers(prev => [newUser, ...prev]);
        toast({ title: "Success", description: "User created successfully." });
      }

      resetUserForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save user.",
        variant: "destructive"
      });
    }
  };

  const handleAdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        setAds(prev => prev.map(a => 
          a.id === editingItem.id ? { ...a, ...adForm } : a
        ));
        toast({ title: "Success", description: "Ad updated successfully." });
      } else {
        const newAd: Ad = {
          id: Date.now().toString(),
          ...adForm,
          is_active: true
        };
        setAds(prev => [newAd, ...prev]);
        toast({ title: "Success", description: "Ad created successfully." });
      }

      resetAdForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save ad.",
        variant: "destructive"
      });
    }
  };

  const updateUserStatus = (userId: string, status: 'active' | 'archived' | 'banned') => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, status } : u
    ));
    toast({ 
      title: "Success", 
      description: `User ${status === 'active' ? 'activated' : status} successfully.` 
    });
  };

  const toggleUserAdmin = (userId: string, isAdmin: boolean) => {
    if (!isSuperAdminUI) {
      toast({
        title: "Access Denied",
        description: "Only Super Admins can manage admin privileges.",
        variant: "destructive"
      });
      return;
    }

    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, is_admin: !isAdmin } : u
    ));
    
    toast({
      title: "Success",
      description: `User ${!isAdmin ? 'promoted to' : 'removed from'} admin.`
    });
  };

  const deleteItem = (table: string, id: string, itemName: string) => {
    if (!confirm(`Are you sure you want to delete this ${itemName}?`)) return;

    try {
      if (table === 'scholarships') {
        setScholarships(prev => prev.filter(s => s.id !== id));
      } else if (table === 'announcements') {
        setAnnouncements(prev => prev.filter(a => a.id !== id));
      } else if (table === 'ads') {
        setAds(prev => prev.filter(a => a.id !== id));
      } else if (table === 'users') {
        setUsers(prev => prev.filter(u => u.id !== id));
      }
      
      toast({
        title: "Success",
        description: `${itemName} deleted successfully.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete ${itemName}.`,
        variant: "destructive"
      });
    }
  };

  const resetScholarshipForm = () => {
    setScholarshipForm({
      title: '',
      description: '',
      provider: '',
      country: '',
      university: '',
      field_of_study: [],
      degree_level: [],
      amount_min: '',
      amount_max: '',
      currency: 'USD',
      application_deadline: '',
      is_active: true,
      featured: false,
      application_url: ''
    });
    setEditingItem(null);
    setShowScholarshipForm(false);
  };

  const resetAnnouncementForm = () => {
    setAnnouncementForm({
      title: '',
      content: '',
      announcement_type: 'general',
      target_user_types: ['starter', 'senior', 'rise', 'junior'],
      target_community: 'all',
      target_pathway: 'all', 
      target_subscription: 'all',
      priority: 'medium',
      expires_at: ''
    });
    setEditingItem(null);
    setShowAnnouncementForm(false);
  };

  const resetUserForm = () => {
    setUserForm({
      email: '',
      first_name: '',
      last_name: '',
      user_type: 'starter',
      is_admin: false,
      phone: '',
      city: ''
    });
    setEditingItem(null);
    setShowUserForm(false);
  };

  const resetAdForm = () => {
    setAdForm({
      title: '',
      description: '',
      image_url: '',
      target_url: '',
      placement: 'banner',
      target_subscription: 'all',
      start_date: '',
      end_date: ''
    });
    setEditingItem(null);
    setShowAdForm(false);
  };

  const editScholarship = (scholarship: Scholarship) => {
    setScholarshipForm({
      title: scholarship.title,
      description: scholarship.description || '',
      provider: scholarship.provider,
      country: scholarship.country,
      university: scholarship.university || '',
      field_of_study: scholarship.field_of_study || [],
      degree_level: scholarship.degree_level || [],
      amount_min: scholarship.amount_min?.toString() || '',
      amount_max: scholarship.amount_max?.toString() || '',
      currency: scholarship.currency,
      application_deadline: scholarship.application_deadline || '',
      is_active: scholarship.is_active,
      featured: scholarship.featured,
      application_url: scholarship.application_url || ''
    });
    setEditingItem(scholarship);
    setShowScholarshipForm(true);
  };

  const editAnnouncement = (announcement: Announcement) => {
    setAnnouncementForm({
      title: announcement.title,
      content: announcement.content,
      announcement_type: announcement.announcement_type,
      target_user_types: announcement.target_user_types,
      target_community: 'all',
      target_pathway: 'all', 
      target_subscription: 'all',
      priority: announcement.priority,
      expires_at: announcement.expires_at || ''
    });
    setEditingItem(announcement);
    setShowAnnouncementForm(true);
  };

  const editUser = (user: User) => {
    setUserForm({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      user_type: user.user_type,
      is_admin: user.is_admin,
      phone: user.phone,
      city: user.city
    });
    setEditingItem(user);
    setShowUserForm(true);
  };

  const editAd = (ad: Ad) => {
    setAdForm({
      title: ad.title,
      description: ad.description,
      image_url: ad.image_url,
      target_url: ad.target_url,
      placement: ad.placement,
      target_subscription: 'all',
      start_date: ad.start_date,
      end_date: ad.end_date
    });
    setEditingItem(ad);
    setShowAdForm(true);
  };

  const [showViewWebsiteDialog, setShowViewWebsiteDialog] = useState(false);
  
  const [exportSettings, setExportSettings] = useState({
    dataType: 'users',
    format: 'json',
    dateFrom: '',
    dateTo: ''
  });
  
  const handleViewWebsite = () => {
    setShowViewWebsiteDialog(true);
  };

  const handleViewWebsitePage = (page: string = '/') => {
    window.open(page, '_blank');
    setShowViewWebsiteDialog(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateSubscriptionField = (id: string, field: string, value: any) => {
    updateSubscription(id, { [field]: value });
  };

  const addSubscriptionFeature = (id: string, feature: string) => {
    if (!feature.trim()) return;
    const subscription = subscriptions.find(s => s.id === id);
    if (subscription) {
      updateSubscription(id, { features: [...subscription.features, feature] });
    }
  };

  const removeSubscriptionFeature = (id: string, featureIndex: number) => {
    const subscription = subscriptions.find(s => s.id === id);
    if (subscription) {
      updateSubscription(id, {
        features: subscription.features.filter((_, index) => index !== featureIndex)
      });
    }
  };

  const handleDataExport = () => {
    let dataToExport: any = [];
    let filename = '';

    // Get data based on selection
    switch (exportSettings.dataType) {
      case 'users':
        dataToExport = users;
        filename = 'users-export';
        break;
      case 'scholarships':
        dataToExport = scholarships;
        filename = 'scholarships-export';
        break;
      case 'announcements':
        dataToExport = announcements;
        filename = 'announcements-export';
        break;
      case 'ads':
        dataToExport = ads;
        filename = 'ads-export';
        break;
      case 'subscriptions':
        dataToExport = subscriptions;
        filename = 'subscriptions-export';
        break;
      case 'all':
        dataToExport = { users, scholarships, announcements, ads, subscriptions };
        filename = 'complete-platform-export';
        break;
      default:
        dataToExport = users;
        filename = 'users-export';
    }

    // Filter by date if specified
    if (exportSettings.dateFrom || exportSettings.dateTo) {
      // Add timestamp to filename if date filtering is used
      filename += `_${exportSettings.dateFrom || 'start'}_to_${exportSettings.dateTo || 'end'}`;
    }

    // Export based on format
    switch (exportSettings.format) {
      case 'json':
        exportAsJSON(dataToExport, filename);
        break;
      case 'csv':
        exportAsCSV(dataToExport, filename);
        break;
      case 'xlsx':
        exportAsExcel(dataToExport, filename);
        break;
      case 'pdf':
        exportAsPDF(dataToExport, filename);
        break;
      default:
        exportAsJSON(dataToExport, filename);
    }

    toast({
      title: "Export Successful",
      description: `${exportSettings.dataType} data exported as ${exportSettings.format.toUpperCase()}`
    });
  };

  const exportAsJSON = (data: any, filename: string) => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    downloadFile(blob, `${filename}.json`);
  };

  const exportAsCSV = (data: any[], filename: string) => {
    if (!Array.isArray(data) || data.length === 0) return;
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => 
      Object.values(item).map(val => 
        typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
      ).join(',')
    );
    
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    downloadFile(blob, `${filename}.csv`);
  };

  const exportAsExcel = (data: any, filename: string) => {
    // Simple Excel-like format (TSV)
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/vnd.ms-excel' });
    downloadFile(blob, `${filename}.xlsx`);
  };

  const exportAsPDF = (data: any, filename: string) => {
    // Simple PDF content (HTML to PDF conversion would require additional library)
    const content = `Platform Report - ${exportSettings.dataType}\n\nGenerated: ${new Date().toLocaleString()}\n\nData:\n${JSON.stringify(data, null, 2)}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    downloadFile(blob, `${filename}.pdf`);
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerateReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      totalScholarships: scholarships.length,
      activeScholarships: scholarships.filter(s => s.is_active).length,
      totalAnnouncements: announcements.length,
      activeAnnouncements: announcements.filter(a => a.is_active).length,
      totalAds: ads.length,
      activeAds: ads.filter(a => a.is_active).length,
      subscriptionBreakdown: subscriptions.map(s => ({
        name: s.name,
        price: s.price,
        active: s.is_active
      })),
      userTypeDistribution: {
        students: users.filter(u => u.user_type === 'student').length,
        mentors: users.filter(u => u.user_type === 'mentor').length,
        parents: users.filter(u => u.user_type === 'parent').length,
        schools: users.filter(u => u.user_type === 'school').length,
        admins: users.filter(u => u.is_admin).length
      }
    };

    exportAsJSON(reportData, `platform-analytics-report-${new Date().toISOString().slice(0,10)}`);
    
    toast({
      title: "Report Generated",
      description: "Comprehensive platform analytics report has been generated and downloaded."
    });
  };

  if (!isAdminUI) {
    return (
      <div className="min-h-screen bg-sunrise-gradient flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-sunrise-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-negari-orange mx-auto mb-4"></div>
          <p className="text-negari-indigo font-medium">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sunrise-gradient">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Crown className={`h-8 w-8 ${isSuperAdminUI ? 'text-yellow-500' : 'text-blue-500'}`} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isSuperAdminUI ? 'Super Admin' : 'Admin'} Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  {isSuperAdminUI 
                    ? 'Full system control and management capabilities'
                    : 'Manage scholarships, users, and content'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewWebsite}
                className="flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>View Website</span>
              </Button>
              <AdminProfileEditor adminUser={profile || user} />
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="w-full overflow-x-auto mb-6">
            <TabsList className="grid w-full grid-cols-9 min-w-max">
              <TabsTrigger value="overview" className="flex items-center space-x-2 whitespace-nowrap">
                <Monitor className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="scholarships" className="flex items-center space-x-2 whitespace-nowrap">
                <BookOpen className="h-4 w-4" />
                <span>Scholarships</span>
              </TabsTrigger>
              <TabsTrigger value="announcements" className="flex items-center space-x-2 whitespace-nowrap">
                <MessageSquare className="h-4 w-4" />
                <span>Announcements</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2 whitespace-nowrap">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </TabsTrigger>
              {isSuperAdminUI && (
                <TabsTrigger value="mentors" className="flex items-center space-x-2 whitespace-nowrap">
                  <UserCheck className="h-4 w-4" />
                  <span>Mentors & Schools</span>
                </TabsTrigger>
              )}
              <TabsTrigger value="subscriptions" className="flex items-center space-x-2 whitespace-nowrap">
                <DollarSign className="h-4 w-4" />
                <span>Subscriptions</span>
              </TabsTrigger>
              <TabsTrigger value="ads" className="flex items-center space-x-2 whitespace-nowrap">
                <Image className="h-4 w-4" />
                <span>Ads</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center space-x-2 whitespace-nowrap">
                <BarChart3 className="h-4 w-4" />
                <span>Reports</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2 whitespace-nowrap">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Active: {users.filter(u => u.status === 'active').length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Scholarships</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{scholarships.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Active: {scholarships.filter(s => s.is_active).length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Announcements</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{announcements.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Active: {announcements.filter(a => a.is_active).length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Ads</CardTitle>
                  <Image className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{ads.filter(a => a.is_active).length}</div>
                  <p className="text-xs text-muted-foreground">
                    Total: {ads.length}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">New user registered: {users[users.length - 1]?.full_name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm">New scholarship added to database</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">System announcement published</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-4 w-4 text-secondary" />
                      <span className="text-sm">Monthly user growth: +15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Server Status</span>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Response</span>
                      <Badge className="bg-green-100 text-green-800">Fast</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Backup</span>
                      <span className="text-sm text-muted-foreground">2 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Students</span>
                      <span className="font-semibold">{users.filter(u => u.user_type === 'student').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mentors</span>
                      <span className="font-semibold">{users.filter(u => u.user_type === 'mentor').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Parents</span>
                      <span className="font-semibold">{users.filter(u => u.user_type === 'parent').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Schools</span>
                      <span className="font-semibold">{users.filter(u => u.user_type === 'school').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New Users</span>
                      <span className="font-semibold text-green-600">+127</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Applications</span>
                      <span className="font-semibold text-blue-600">+89</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Scholarships</span>
                      <span className="font-semibold text-purple-600">+15</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="font-semibold text-secondary ">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full justify-start" onClick={() => setActiveTab('announcements')}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      New Announcement
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => setActiveTab('scholarships')}>
                      <Award className="h-4 w-4 mr-2" />
                      Add Scholarship
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => setActiveTab('users')}>
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => setActiveTab('reports')}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Scholarship Management</h2>
                <p className="text-gray-600">Create and manage scholarship opportunities</p>
              </div>
              <Dialog open={showScholarshipForm} onOpenChange={setShowScholarshipForm}>
                <DialogTrigger asChild>
                  <Button onClick={() => setShowScholarshipForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Scholarship
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Edit Scholarship' : 'Add New Scholarship'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleScholarshipSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={scholarshipForm.title}
                          onChange={(e) => setScholarshipForm({...scholarshipForm, title: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="provider">Provider *</Label>
                        <Input
                          id="provider"
                          value={scholarshipForm.provider}
                          onChange={(e) => setScholarshipForm({...scholarshipForm, provider: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={scholarshipForm.description}
                        onChange={(e) => setScholarshipForm({...scholarshipForm, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={scholarshipForm.country}
                          onChange={(e) => setScholarshipForm({...scholarshipForm, country: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="university">University</Label>
                        <Input
                          id="university"
                          value={scholarshipForm.university}
                          onChange={(e) => setScholarshipForm({...scholarshipForm, university: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="amount_min">Min Amount</Label>
                        <Input
                          id="amount_min"
                          type="number"
                          value={scholarshipForm.amount_min}
                          onChange={(e) => setScholarshipForm({...scholarshipForm, amount_min: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="amount_max">Max Amount</Label>
                        <Input
                          id="amount_max"
                          type="number"
                          value={scholarshipForm.amount_max}
                          onChange={(e) => setScholarshipForm({...scholarshipForm, amount_max: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <Select value={scholarshipForm.currency} onValueChange={(value) => setScholarshipForm({...scholarshipForm, currency: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="ETB">ETB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="application_deadline">Application Deadline</Label>
                      <Input
                        id="application_deadline"
                        type="date"
                        value={scholarshipForm.application_deadline}
                        onChange={(e) => setScholarshipForm({...scholarshipForm, application_deadline: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="application_url">Application URL</Label>
                      <Input
                        id="application_url"
                        type="url"
                        value={scholarshipForm.application_url}
                        onChange={(e) => setScholarshipForm({...scholarshipForm, application_url: e.target.value})}
                        placeholder="https://"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_active"
                          checked={scholarshipForm.is_active}
                          onCheckedChange={(checked) => setScholarshipForm({...scholarshipForm, is_active: checked})}
                        />
                        <Label htmlFor="is_active">Active</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={scholarshipForm.featured}
                          onCheckedChange={(checked) => setScholarshipForm({...scholarshipForm, featured: checked})}
                        />
                        <Label htmlFor="featured">Featured</Label>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={resetScholarshipForm}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingItem ? 'Update' : 'Create'} Scholarship
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{scholarship.title}</span>
                          {scholarship.featured && <Badge>Featured</Badge>}
                          <Badge variant={scholarship.is_active ? "default" : "secondary"}>
                            {scholarship.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-gray-600">{scholarship.provider} • {scholarship.country}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editScholarship(scholarship)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteItem('scholarships', scholarship.id, 'scholarship')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-2">{scholarship.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>Amount: ${scholarship.amount_min?.toLocaleString()} - ${scholarship.amount_max?.toLocaleString()}</div>
                      <div>Deadline: {scholarship.application_deadline}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Announcement Management</h2>
                <p className="text-gray-600">Create and manage platform announcements</p>
              </div>
              <Dialog open={showAnnouncementForm} onOpenChange={setShowAnnouncementForm}>
                <DialogTrigger asChild>
                  <Button onClick={() => setShowAnnouncementForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Announcement
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Edit Announcement' : 'Add New Announcement'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={announcementForm.title}
                        onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        value={announcementForm.content}
                        onChange={(e) => setAnnouncementForm({...announcementForm, content: e.target.value})}
                        rows={4}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="announcement_type">Type</Label>
                        <Select value={announcementForm.announcement_type} onValueChange={(value) => setAnnouncementForm({...announcementForm, announcement_type: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="feature">New Feature</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={announcementForm.priority} onValueChange={(value) => setAnnouncementForm({...announcementForm, priority: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Targeting Options */}
                    <div className="space-y-4 border-t pt-4">
                      <h4 className="font-semibold text-primary">Targeting Options</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="target_community">Negari Community</Label>
                          <Select value={announcementForm.target_community} onValueChange={(value) => setAnnouncementForm({...announcementForm, target_community: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Communities</SelectItem>
                              <SelectItem value="students">Students</SelectItem>
                              <SelectItem value="mentors">Mentors</SelectItem>
                              <SelectItem value="parents">Parents</SelectItem>
                              <SelectItem value="schools">Schools</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="target_pathway">Negari Pathway</Label>
                          <Select value={announcementForm.target_pathway} onValueChange={(value) => setAnnouncementForm({...announcementForm, target_pathway: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Pathways</SelectItem>
                              <SelectItem value="starter">Starter Pathway</SelectItem>
                              <SelectItem value="senior">Senior Pathway</SelectItem>
                              <SelectItem value="rise">Rise Pathway</SelectItem>
                              <SelectItem value="junior">Junior Pathway</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="target_subscription">Subscription Model</Label>
                          <Select value={announcementForm.target_subscription} onValueChange={(value) => setAnnouncementForm({...announcementForm, target_subscription: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Subscribers</SelectItem>
                              <SelectItem value="freemium">Freemium</SelectItem>
                              <SelectItem value="basic">Basic Plan</SelectItem>
                              <SelectItem value="premium">Premium Plan</SelectItem>
                              <SelectItem value="enterprise">Enterprise Plan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="expires_at">Expires At</Label>
                      <Input
                        id="expires_at"
                        type="date"
                        value={announcementForm.expires_at}
                        onChange={(e) => setAnnouncementForm({...announcementForm, expires_at: e.target.value})}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={resetAnnouncementForm}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingItem ? 'Update' : 'Create'} Announcement
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{announcement.title}</span>
                          <Badge variant={announcement.priority === 'high' ? 'destructive' : announcement.priority === 'medium' ? 'default' : 'secondary'}>
                            {announcement.priority}
                          </Badge>
                          <Badge variant={announcement.is_active ? "default" : "secondary"}>
                            {announcement.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-gray-600">{announcement.announcement_type}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editAnnouncement(announcement)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteItem('announcements', announcement.id, 'announcement')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-2">{announcement.content}</p>
                    <div className="text-sm text-gray-600">
                      Expires: {announcement.expires_at || 'Never'}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">User Management</h2>
                <p className="text-gray-600">Manage platform users and their access</p>
              </div>
              <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
                <DialogTrigger asChild>
                  <Button onClick={() => setShowUserForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Edit User' : 'Add New User'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleUserSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first_name">First Name *</Label>
                        <Input
                          id="first_name"
                          value={userForm.first_name}
                          onChange={(e) => setUserForm({...userForm, first_name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="last_name">Last Name *</Label>
                        <Input
                          id="last_name"
                          value={userForm.last_name}
                          onChange={(e) => setUserForm({...userForm, last_name: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userForm.email}
                        onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={userForm.phone}
                          onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={userForm.city}
                          onChange={(e) => setUserForm({...userForm, city: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="user_type">User Type</Label>
                      <Select value={userForm.user_type} onValueChange={(value) => setUserForm({...userForm, user_type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="starter">Starter</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                          <SelectItem value="rise">Rise</SelectItem>
                          <SelectItem value="junior">Junior</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {isSuperAdminUI && (
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_admin"
                          checked={userForm.is_admin}
                          onCheckedChange={(checked) => setUserForm({...userForm, is_admin: checked})}
                        />
                        <Label htmlFor="is_admin">Admin User</Label>
                      </div>
                    )}
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={resetUserForm}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingItem ? 'Update' : 'Create'} User
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div>
                          {user.is_super_admin ? (
                            <Crown className="h-5 w-5 text-yellow-500" />
                          ) : user.is_admin ? (
                            <Shield className="h-5 w-5 text-blue-500" />
                          ) : (
                            <User className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{user.full_name}</span>
                            {user.is_super_admin && <Badge variant="secondary">Super Admin</Badge>}
                            {user.is_admin && !user.is_super_admin && <Badge>Admin</Badge>}
                            <Badge 
                              variant={
                                user.status === 'active' ? 'default' : 
                                user.status === 'archived' ? 'secondary' : 'destructive'
                              }
                            >
                              {user.status}
                            </Badge>
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            {user.email} • {user.user_type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {user.status === 'active' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateUserStatus(user.id, 'archived')}
                              title="Archive User"
                            >
                              <Archive className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateUserStatus(user.id, 'banned')}
                              title="Ban User"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {user.status !== 'active' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateUserStatus(user.id, 'active')}
                            title="Activate User"
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {isSuperAdminUI && !user.is_super_admin && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleUserAdmin(user.id, user.is_admin)}
                            title={user.is_admin ? "Remove Admin" : "Make Admin"}
                            className={user.is_admin ? "text-red-600 hover:text-red-700" : "text-blue-600 hover:text-blue-700"}
                          >
                            {user.is_admin ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editUser(user)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        {!user.is_super_admin && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteItem('users', user.id, 'user')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>Phone: {user.phone || 'N/A'}</div>
                      <div>City: {user.city || 'N/A'}</div>
                      <div>Created: {new Date(user.created_at).toLocaleDateString()}</div>
                      <div>Type: {user.user_type}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mentors & Schools Tab */}
          {isSuperAdminUI && (
            <TabsContent value="mentors" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Mentor & School Management</h2>
                  <p className="text-gray-600">Manage mentors, school managers, and their permissions</p>
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => setShowMentorForm(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Mentor
                  </Button>
                  <Button onClick={() => setShowSchoolForm(true)} variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add School
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="mentors" className="w-full">
                <TabsList>
                  <TabsTrigger value="mentors">Mentors</TabsTrigger>
                  <TabsTrigger value="schools">School Managers</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                </TabsList>

                <TabsContent value="mentors" className="space-y-4">
                  <div className="grid gap-4">
                    {users.filter(u => u.user_type === 'mentor').map((mentor) => (
                      <Card key={mentor.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <UserCheck className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{mentor.full_name}</h3>
                                <p className="text-sm text-gray-600">{mentor.email}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="secondary">Mentor</Badge>
                                  <Badge variant={mentor.status === 'active' ? 'default' : 'destructive'}>
                                    {mentor.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit3 className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => deleteItem('users', mentor.id, 'mentor')}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div>Phone: {mentor.phone || 'N/A'}</div>
                            <div>City: {mentor.city || 'N/A'}</div>
                            <div>Joined: {new Date(mentor.created_at).toLocaleDateString()}</div>
                            <div>Status: {mentor.status}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {users.filter(u => u.user_type === 'mentor').length === 0 && (
                      <Card>
                        <CardContent className="pt-6 text-center text-gray-500">
                          No mentors found. Add mentors to help guide students.
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="schools" className="space-y-4">
                  <div className="grid gap-4">
                    {users.filter(u => u.user_type === 'school_manager').map((manager) => (
                      <Card key={manager.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                                <Building className="h-6 w-6 text-secondary" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{manager.full_name}</h3>
                                <p className="text-sm text-gray-600">{manager.email}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="outline">School Manager</Badge>
                                  <Badge variant={manager.status === 'active' ? 'default' : 'destructive'}>
                                    {manager.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit3 className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => deleteItem('users', manager.id, 'school manager')}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {users.filter(u => u.user_type === 'school_manager').length === 0 && (
                      <Card>
                        <CardContent className="pt-6 text-center text-gray-500">
                          No school managers found. Add school managers to oversee institutional partnerships.
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="applications" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Mentor and school manager applications will appear here.</p>
                        <p className="text-sm mt-2">Users can apply to become mentors or school managers through the platform.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          )}

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Subscription Management</h2>
                <p className="text-gray-600">Manage subscription plans and pricing</p>
              </div>
            </div>

            <div className="grid gap-6">
              {subscriptions.map((subscription) => (
                <Card key={subscription.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Input
                            value={subscription.name}
                            onChange={(e) => updateSubscription(subscription.id, { name: e.target.value })}
                            className="text-xl font-bold border-none px-0 focus:ring-0"
                          />
                          <Badge variant={subscription.is_active ? "default" : "secondary"}>
                            {subscription.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4" />
                          <Input
                            type="number"
                            step="0.01"
                            value={subscription.price}
                            onChange={(e) => updateSubscription(subscription.id, { price: parseFloat(e.target.value) })}
                            className="w-20 border-none px-0 focus:ring-0"
                          />
                          <Select 
                            value={subscription.currency} 
                            onValueChange={(value) => updateSubscription(subscription.id, { currency: value })}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="ETB">ETB</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-sm text-gray-600">per month</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={subscription.is_active}
                          onCheckedChange={(checked) => updateSubscription(subscription.id, { is_active: checked })}
                        />
                        <Label>Active</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={subscription.recommended}
                          onCheckedChange={(checked) => updateSubscription(subscription.id, { recommended: checked })}
                        />
                        <Label>Recommended</Label>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label className="text-sm font-medium">Features</Label>
                      <div className="space-y-2 mt-2">
                        {subscription.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <Input
                              value={feature}
                              onChange={(e) => {
                                const newFeatures = [...subscription.features];
                                newFeatures[index] = e.target.value;
                                updateSubscription(subscription.id, { features: newFeatures });
                              }}
                              className="flex-1 border-none px-0 focus:ring-0"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSubscriptionFeature(subscription.id, index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div className="flex items-center space-x-2">
                          <Input
                            placeholder="Add new feature"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                const input = e.target as HTMLInputElement;
                                if (input.value.trim()) {
                                  addSubscriptionFeature(subscription.id, input.value.trim());
                                  input.value = '';
                                }
                              }
                            }}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                              if (input?.value.trim()) {
                                addSubscriptionFeature(subscription.id, input.value.trim());
                                input.value = '';
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add New Subscription */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Subscription Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const newSubscription = {
                    id: Date.now().toString(),
                    name: formData.get('name') as string,
                    price: parseFloat(formData.get('price') as string),
                    duration: '/month',
                    trialDays: parseInt(formData.get('trial_days') as string) || 0,
                    features: (formData.get('features') as string).split('\n').filter(f => f.trim()),
                    popular: false,
                    recommended: false,
                    color: 'border-primary',
                    currency: formData.get('currency') as string,
                    is_active: true
                  };
                  addSubscription(newSubscription);
                  (e.target as HTMLFormElement).reset();
                  toast({ title: "Success", description: "New subscription plan created." });
                }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Plan Name</Label>
                      <Input name="name" required placeholder="e.g., Basic, Premium" />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input name="price" type="number" step="0.01" required placeholder="0.00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select name="currency">
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="ETB">ETB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="trial_days">Trial Period (Days)</Label>
                      <Input name="trial_days" type="number" placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="features">Features (one per line)</Label>
                    <Textarea name="features" rows={4} placeholder="Basic scholarship search&#10;Profile creation&#10;Email support" />
                  </div>
                  <Button type="submit">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Subscription Plan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ads Tab */}
          <TabsContent value="ads" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Advertisement Management</h2>
                <p className="text-gray-600">Manage platform advertisements and placements</p>
              </div>
              <Dialog open={showAdForm} onOpenChange={setShowAdForm}>
                <DialogTrigger asChild>
                  <Button onClick={() => setShowAdForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Advertisement
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Edit Advertisement' : 'Add New Advertisement'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAdSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={adForm.title}
                        onChange={(e) => setAdForm({...adForm, title: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={adForm.description}
                        onChange={(e) => setAdForm({...adForm, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="image_url">Image URL *</Label>
                      <Input
                        id="image_url"
                        type="url"
                        value={adForm.image_url}
                        onChange={(e) => setAdForm({...adForm, image_url: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="target_url">Target URL *</Label>
                      <Input
                        id="target_url"
                        type="url"
                        value={adForm.target_url}
                        onChange={(e) => setAdForm({...adForm, target_url: e.target.value})}
                        placeholder="https://example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="placement">Placement</Label>
                      <Select value={adForm.placement} onValueChange={(value) => setAdForm({...adForm, placement: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="banner">Banner</SelectItem>
                          <SelectItem value="sidebar">Sidebar</SelectItem>
                          <SelectItem value="footer">Footer</SelectItem>
                          <SelectItem value="popup">Popup</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start_date">Start Date</Label>
                        <Input
                          id="start_date"
                          type="date"
                          value={adForm.start_date}
                          onChange={(e) => setAdForm({...adForm, start_date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="end_date">End Date</Label>
                        <Input
                          id="end_date"
                          type="date"
                          value={adForm.end_date}
                          onChange={(e) => setAdForm({...adForm, end_date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="target_subscription">Target Subscription Tier</Label>
                        <Select value={adForm.target_subscription} onValueChange={(value) => setAdForm({...adForm, target_subscription: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Subscribers</SelectItem>
                            <SelectItem value="freemium">Freemium</SelectItem>
                            <SelectItem value="basic">Basic Plan</SelectItem>
                            <SelectItem value="premium">Premium Plan</SelectItem>
                            <SelectItem value="enterprise">Enterprise Plan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={resetAdForm}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingItem ? 'Update' : 'Create'} Advertisement
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {ads.map((ad) => (
                <Card key={ad.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{ad.title}</span>
                          <Badge variant={ad.is_active ? "default" : "secondary"}>
                            {ad.is_active ? "Active" : "Inactive"}
                          </Badge>
                          <Badge variant="outline">{ad.placement}</Badge>
                        </CardTitle>
                        <p className="text-sm text-gray-600">{ad.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editAd(ad)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteItem('ads', ad.id, 'advertisement')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>Target: <a href={ad.target_url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{ad.target_url}</a></div>
                      <div>Image: <a href={ad.image_url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View</a></div>
                      <div>Start: {ad.start_date || 'N/A'}</div>
                      <div>End: {ad.end_date || 'N/A'}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Reports & Analytics</h2>
              <p className="text-gray-600">Platform usage statistics and insights</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>User Growth</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Users:</span>
                      <span className="font-medium">{users.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Users:</span>
                      <span className="font-medium text-green-600">{users.filter(u => u.status === 'active').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Archived Users:</span>
                      <span className="font-medium text-yellow-600">{users.filter(u => u.status === 'archived').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Banned Users:</span>
                      <span className="font-medium text-red-600">{users.filter(u => u.status === 'banned').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Scholarship Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Scholarships:</span>
                      <span className="font-medium">{scholarships.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Scholarships:</span>
                      <span className="font-medium text-green-600">{scholarships.filter(s => s.is_active).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Featured Scholarships:</span>
                      <span className="font-medium text-blue-600">{scholarships.filter(s => s.featured).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Value:</span>
                      <span className="font-medium">
                        ${scholarships.reduce((sum, s) => sum + (s.amount_max || 0), 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>User Types</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['starter', 'senior', 'rise', 'junior', 'parent', 'student'].map(type => (
                      <div key={type} className="flex justify-between">
                        <span className="capitalize">{type}:</span>
                        <span className="font-medium">{users.filter(u => u.user_type === type).length}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Content Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Active Announcements:</span>
                      <span className="font-medium">{announcements.filter(a => a.is_active).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Ads:</span>
                      <span className="font-medium">{ads.filter(a => a.is_active).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Admin Users:</span>
                      <span className="font-medium">{users.filter(u => u.is_admin).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Super Admins:</span>
                      <span className="font-medium">{users.filter(u => u.is_super_admin).length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="exportType">Select Data to Export</Label>
                    <Select value={exportSettings.dataType} onValueChange={(value) => setExportSettings({...exportSettings, dataType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose data type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="users">Users Data</SelectItem>
                        <SelectItem value="scholarships">Scholarships</SelectItem>
                        <SelectItem value="announcements">Announcements</SelectItem>
                        <SelectItem value="ads">Advertisements</SelectItem>
                        <SelectItem value="subscriptions">Subscriptions</SelectItem>
                        <SelectItem value="all">All Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="fileFormat">File Format</Label>
                    <Select value={exportSettings.format} onValueChange={(value) => setExportSettings({...exportSettings, format: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose format..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON (.json)</SelectItem>
                        <SelectItem value="csv">CSV (.csv)</SelectItem>
                        <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                        <SelectItem value="pdf">PDF Report (.pdf)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateFrom">From Date</Label>
                      <Input
                        id="dateFrom"
                        type="date"
                        value={exportSettings.dateFrom}
                        onChange={(e) => setExportSettings({...exportSettings, dateFrom: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateTo">To Date</Label>
                      <Input
                        id="dateTo"
                        type="date"
                        value={exportSettings.dateTo}
                        onChange={(e) => setExportSettings({...exportSettings, dateTo: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDataExport()}
                      className="flex-1"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Export {exportSettings.dataType || 'Data'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleGenerateReport()}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Export Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>Total Users: <span className="font-semibold">{users.length}</span></div>
                      <div>Total Scholarships: <span className="font-semibold">{scholarships.length}</span></div>
                      <div>Active Announcements: <span className="font-semibold">{announcements.filter(a => a.is_active).length}</span></div>
                      <div>Active Ads: <span className="font-semibold">{ads.filter(a => a.is_active).length}</span></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Platform Settings</h2>
              <p className="text-gray-600">Configure platform settings and integrations</p>
            </div>

            <Tabs defaultValue="website" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="website">Website</TabsTrigger>
                <TabsTrigger value="footer">Footer</TabsTrigger>
                <TabsTrigger value="smtp">SMTP</TabsTrigger>
                <TabsTrigger value="cookies">Cookies</TabsTrigger>
                <TabsTrigger value="recaptcha">reCAPTCHA</TabsTrigger>
                <TabsTrigger value="language">Language</TabsTrigger>
              </TabsList>

              <TabsContent value="website" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Website Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input
                          id="siteName"
                          value={websiteSettings.siteName}
                          onChange={(e) => setWebsiteSettings({...websiteSettings, siteName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="tagline">Tagline</Label>
                        <Input
                          id="tagline"
                          value={websiteSettings.tagline}
                          onChange={(e) => setWebsiteSettings({...websiteSettings, tagline: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="heroTitle">Hero Title</Label>
                      <Input
                        id="heroTitle"
                        value={websiteSettings.heroTitle}
                        onChange={(e) => setWebsiteSettings({...websiteSettings, heroTitle: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                      <Textarea
                        id="heroSubtitle"
                        value={websiteSettings.heroSubtitle}
                        onChange={(e) => setWebsiteSettings({...websiteSettings, heroSubtitle: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <Input
                          id="primaryColor"
                          type="color"
                          value={websiteSettings.primaryColor}
                          onChange={(e) => setWebsiteSettings({...websiteSettings, primaryColor: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="secondaryColor">Secondary Color</Label>
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={websiteSettings.secondaryColor}
                          onChange={(e) => setWebsiteSettings({...websiteSettings, secondaryColor: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={websiteSettings.contactEmail}
                          onChange={(e) => setWebsiteSettings({...websiteSettings, contactEmail: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPhone">Contact Phone</Label>
                        <Input
                          id="contactPhone"
                          value={websiteSettings.contactPhone}
                          onChange={(e) => setWebsiteSettings({...websiteSettings, contactPhone: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        toast({ title: "Success", description: "Website settings saved successfully." });
                      }}
                    >
                      Save Website Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5" />
                      <span>Payment Integration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableChapa"
                        checked={paymentSettings.enableChapa}
                        onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enableChapa: checked})}
                      />
                      <Label htmlFor="enableChapa">Enable Chapa Payment</Label>
                    </div>
                    <div>
                      <Label htmlFor="chapaPublicKey">Chapa Public Key</Label>
                      <Input
                        id="chapaPublicKey"
                        type="password"
                        value={paymentSettings.chapaPublicKey}
                        onChange={(e) => setPaymentSettings({...paymentSettings, chapaPublicKey: e.target.value})}
                        placeholder="Enter your Chapa public key"
                      />
                    </div>
                    <div>
                      <Label htmlFor="chapaSecretKey">Chapa Secret Key</Label>
                      <Input
                        id="chapaSecretKey"
                        type="password"
                        value={paymentSettings.chapaSecretKey}
                        onChange={(e) => setPaymentSettings({...paymentSettings, chapaSecretKey: e.target.value})}
                        placeholder="Enter your Chapa secret key"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Default Currency</Label>
                      <Select value={paymentSettings.currency} onValueChange={(value) => setPaymentSettings({...paymentSettings, currency: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ETB">Ethiopian Birr (ETB)</SelectItem>
                          <SelectItem value="USD">US Dollar (USD)</SelectItem>
                          <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={() => {
                        toast({ title: "Success", description: "Payment settings saved successfully." });
                      }}
                    >
                      Save Payment Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="language" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Languages className="h-5 w-5" />
                      <span>Language & Translation</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="defaultLanguage">Default Language</Label>
                      <Select value={languageSettings.defaultLanguage} onValueChange={(value) => setLanguageSettings({...languageSettings, defaultLanguage: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="amharic">አማርኛ (Amharic)</SelectItem>
                          <SelectItem value="oromifa">Afaan Oromoo (Oromifa)</SelectItem>
                          <SelectItem value="tigrigna">ትግርኛ (Tigrigna)</SelectItem>
                          <SelectItem value="somali">Soomaali (Somali)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Enabled Languages</Label>
                      <div className="space-y-2 mt-2">
                        {['english', 'amharic', 'oromifa', 'tigrigna', 'somali'].map(lang => (
                          <div key={lang} className="flex items-center space-x-2">
                            <Switch
                              checked={languageSettings.enabledLanguages.includes(lang)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setLanguageSettings({
                                    ...languageSettings,
                                    enabledLanguages: [...languageSettings.enabledLanguages, lang]
                                  });
                                } else {
                                  setLanguageSettings({
                                    ...languageSettings,
                                    enabledLanguages: languageSettings.enabledLanguages.filter(l => l !== lang)
                                  });
                                }
                              }}
                            />
                            <Label className="capitalize">
                              {lang === 'amharic' ? 'አማርኛ (Amharic)' :
                               lang === 'oromifa' ? 'Afaan Oromoo (Oromifa)' :
                               lang === 'tigrigna' ? 'ትግርኛ (Tigrigna)' :
                               lang === 'somali' ? 'Soomaali (Somali)' :
                               'English'}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="googleTranslateApiKey">Google Translate API Key</Label>
                      <Input
                        id="googleTranslateApiKey"
                        type="password"
                        value={languageSettings.googleTranslateApiKey}
                        onChange={(e) => setLanguageSettings({...languageSettings, googleTranslateApiKey: e.target.value})}
                        placeholder="Enter your Google Translate API key"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Required for automatic translation features
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        toast({ title: "Success", description: "Language settings saved successfully." });
                      }}
                    >
                      Save Language Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="footer" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Footer Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={footerSettings.companyName}
                        onChange={(e) => setFooterSettings({...footerSettings, companyName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={footerSettings.description}
                        onChange={(e) => setFooterSettings({...footerSettings, description: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="facebook">Facebook URL</Label>
                        <Input
                          id="facebook"
                          value={footerSettings.socialLinks.facebook}
                          onChange={(e) => setFooterSettings({
                            ...footerSettings, 
                            socialLinks: {...footerSettings.socialLinks, facebook: e.target.value}
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter">Twitter URL</Label>
                        <Input
                          id="twitter"
                          value={footerSettings.socialLinks.twitter}
                          onChange={(e) => setFooterSettings({
                            ...footerSettings, 
                            socialLinks: {...footerSettings.socialLinks, twitter: e.target.value}
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="instagram">Instagram URL</Label>
                        <Input
                          id="instagram"
                          value={footerSettings.socialLinks.instagram}
                          onChange={(e) => setFooterSettings({
                            ...footerSettings, 
                            socialLinks: {...footerSettings.socialLinks, instagram: e.target.value}
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input
                          id="linkedin"
                          value={footerSettings.socialLinks.linkedin}
                          onChange={(e) => setFooterSettings({
                            ...footerSettings, 
                            socialLinks: {...footerSettings.socialLinks, linkedin: e.target.value}
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="youtube">YouTube URL</Label>
                        <Input
                          id="youtube"
                          value={footerSettings.socialLinks.youtube}
                          onChange={(e) => setFooterSettings({
                            ...footerSettings, 
                            socialLinks: {...footerSettings.socialLinks, youtube: e.target.value}
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="tiktok">TikTok URL</Label>
                        <Input
                          id="tiktok"
                          value={footerSettings.socialLinks.tiktok}
                          onChange={(e) => setFooterSettings({
                            ...footerSettings, 
                            socialLinks: {...footerSettings.socialLinks, tiktok: e.target.value}
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="telegram">Telegram URL</Label>
                        <Input
                          id="telegram"
                          value={footerSettings.socialLinks.telegram}
                          onChange={(e) => setFooterSettings({
                            ...footerSettings, 
                            socialLinks: {...footerSettings.socialLinks, telegram: e.target.value}
                          })}
                        />
                      </div>
                    </div>
                    <Button onClick={() => toast({ title: "Success", description: "Footer settings saved." })}>
                      Save Footer Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="smtp" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SMTP Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="smtpHost">SMTP Host</Label>
                        <Input
                          id="smtpHost"
                          value={smtpSettings.host}
                          onChange={(e) => setSmtpSettings({...smtpSettings, host: e.target.value})}
                          placeholder="smtp.gmail.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="smtpPort">Port</Label>
                        <Input
                          id="smtpPort"
                          value={smtpSettings.port}
                          onChange={(e) => setSmtpSettings({...smtpSettings, port: e.target.value})}
                          placeholder="587"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="smtpUsername">Username</Label>
                      <Input
                        id="smtpUsername"
                        value={smtpSettings.username}
                        onChange={(e) => setSmtpSettings({...smtpSettings, username: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPassword">Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={smtpSettings.password}
                        onChange={(e) => setSmtpSettings({...smtpSettings, password: e.target.value})}
                      />
                    </div>
                    <Button onClick={() => toast({ title: "Success", description: "SMTP settings saved." })}>
                      Save SMTP Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cookies" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cookie Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={cookieSettings.enableCookieNotice}
                        onCheckedChange={(checked) => setCookieSettings({...cookieSettings, enableCookieNotice: checked})}
                      />
                      <Label>Enable Cookie Notice</Label>
                    </div>
                    <div>
                      <Label htmlFor="cookieNoticeText">Cookie Notice Text</Label>
                      <Textarea
                        id="cookieNoticeText"
                        value={cookieSettings.cookieNoticeText}
                        onChange={(e) => setCookieSettings({...cookieSettings, cookieNoticeText: e.target.value})}
                      />
                    </div>
                    <Button onClick={() => toast({ title: "Success", description: "Cookie settings saved." })}>
                      Save Cookie Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recaptcha" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>reCAPTCHA Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={recaptchaSettings.enableRecaptcha}
                        onCheckedChange={(checked) => setRecaptchaSettings({...recaptchaSettings, enableRecaptcha: checked})}
                      />
                      <Label>Enable reCAPTCHA</Label>
                    </div>
                    <div>
                      <Label htmlFor="siteKey">Site Key</Label>
                      <Input
                        id="siteKey"
                        value={recaptchaSettings.siteKey}
                        onChange={(e) => setRecaptchaSettings({...recaptchaSettings, siteKey: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="secretKey">Secret Key</Label>
                      <Input
                        id="secretKey"
                        type="password"
                        value={recaptchaSettings.secretKey}
                        onChange={(e) => setRecaptchaSettings({...recaptchaSettings, secretKey: e.target.value})}
                      />
                    </div>
                    <Button onClick={() => toast({ title: "Success", description: "reCAPTCHA settings saved." })}>
                      Save reCAPTCHA Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

        </Tabs>
      </div>
      
      {/* Dialogs */}
      <ViewWebsiteSelector 
        open={showViewWebsiteDialog}
        onOpenChange={setShowViewWebsiteDialog}
        onSelectPage={handleViewWebsitePage}
      />
      
      <MentorRegistrationForm 
        open={showMentorForm}
        onOpenChange={setShowMentorForm}
      />
      
      <SchoolRegistrationForm 
        open={showSchoolForm}
        onOpenChange={setShowSchoolForm}
      />
    </div>
  );
};

export default AdminDashboard;