
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, GraduationCap, Award, Clock, Users, Home, ExternalLink, DollarSign, Calendar, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface UniversityItem {
  name: string;
  location: string; 
  type: string;
  rating: string;
  tuition?: string;
  acceptance?: string;
  programs?: string[];
  website?: string;
  description?: string;
}

interface ScholarshipItem {
  name: string;
  location: string;
  type: string;
  deadline: string;
  amount?: string;
  eligibility?: string[];
  requirements?: string[];
  website?: string;
  description?: string;
}

type ExplorationItem = UniversityItem | ScholarshipItem;

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<ExplorationItem | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const explorationCategories = [
    {
      title: "Universities & Colleges",
      icon: GraduationCap,
      items: [
        { 
          name: "MIT", 
          location: "Cambridge, MA", 
          type: "Technology", 
          rating: "4.9",
          tuition: "$57,986/year",
          acceptance: "4.1%",
          programs: ["Computer Science", "Engineering", "Mathematics", "Physics"],
          website: "https://mit.edu",
          description: "Massachusetts Institute of Technology is a private research university known for its programs in engineering, technology, and science. MIT has been at the forefront of technological innovation for over 150 years."
        },
        { 
          name: "Stanford University", 
          location: "Stanford, CA", 
          type: "Research", 
          rating: "4.8",
          tuition: "$56,169/year",
          acceptance: "3.9%",
          programs: ["Business", "Computer Science", "Engineering", "Medicine"],
          website: "https://stanford.edu",
          description: "Stanford University is a leading research university located in Silicon Valley. Known for its entrepreneurial spirit and strong ties to the tech industry."
        },
        { 
          name: "Oxford University", 
          location: "Oxford, UK", 
          type: "Traditional", 
          rating: "4.9",
          tuition: "£9,250-37,510/year",
          acceptance: "17.5%",
          programs: ["Philosophy", "History", "Literature", "Sciences"],
          website: "https://ox.ac.uk",
          description: "The University of Oxford is the oldest university in the English-speaking world, with evidence of teaching as early as 1096. It comprises 38 constituent colleges."
        },
        { 
          name: "University of Toronto", 
          location: "Toronto, Canada", 
          type: "Research", 
          rating: "4.7",
          tuition: "CAD $58,160/year",
          acceptance: "43%",
          programs: ["Medicine", "Engineering", "Business", "Arts & Science"],
          website: "https://utoronto.ca",
          description: "The University of Toronto is a public research university and one of the top universities globally, known for its diverse academic programs and research excellence."
        }
      ] as UniversityItem[]
    },
    {
      title: "Scholarship Opportunities",
      icon: Award,
      items: [
        { 
          name: "Fulbright Program", 
          location: "Global", 
          type: "Graduate", 
          deadline: "Oct 2024",
          amount: "Full funding",
          eligibility: ["Bachelor's degree", "Strong academic record", "Leadership experience"],
          requirements: ["Application form", "Essays", "Letters of recommendation", "Transcripts"],
          website: "https://fulbrightprogram.org",
          description: "The Fulbright Program is the flagship international educational exchange program sponsored by the U.S. government, designed to foster mutual understanding between nations."
        },
        { 
          name: "Rhodes Scholarship", 
          location: "Oxford, UK", 
          type: "Graduate", 
          deadline: "Sep 2024",
          amount: "Full funding + stipend",
          eligibility: ["Undergraduate degree", "Outstanding academic achievement", "Leadership qualities"],
          requirements: ["Academic transcripts", "Personal statement", "References", "Interview"],
          website: "https://rhodesscholarship.org",
          description: "The Rhodes Scholarship is an international postgraduate award for students to study at the University of Oxford, established in 1903."
        },
        { 
          name: "Gates Cambridge", 
          location: "Cambridge, UK", 
          type: "Graduate", 
          deadline: "Dec 2024",
          amount: "Full cost of studying",
          eligibility: ["Outstanding intellectual ability", "Leadership potential", "Commitment to improving others' lives"],
          requirements: ["Research proposal", "References", "Academic transcripts", "Gates Cambridge statement"],
          website: "https://gatescambridge.org",
          description: "Gates Cambridge Scholarships are awarded to outstanding applicants from countries outside the UK to pursue a full-time postgraduate degree at Cambridge."
        },
        { 
          name: "Chevening Scholarship", 
          location: "UK", 
          type: "Masters", 
          deadline: "Nov 2024",
          amount: "Full funding",
          eligibility: ["Work experience", "Leadership potential", "Academic excellence"],
          requirements: ["Online application", "References", "Essays", "Interview"],
          website: "https://chevening.org",
          description: "Chevening Scholarships are the UK government's global scholarship programme, funded by the Foreign and Commonwealth Office and partner organisations."
        }
      ] as ScholarshipItem[]
    }
  ];

  const filteredCategories = explorationCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  const hasRating = (item: ExplorationItem): item is UniversityItem => {
    return 'rating' in item;
  };

  const hasDeadline = (item: ExplorationItem): item is ScholarshipItem => {
    return 'deadline' in item;
  };

  const openDetailModal = (item: ExplorationItem) => {
    setSelectedItem(item);
  };

  const applyToOpportunity = (item: ExplorationItem) => {
    toast({
      title: `Application Started`,
      description: `Opening application process for ${item.name}...`,
    });
    
    // Simulate opening external link
    if ('website' in item && item.website) {
      window.open(item.website, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/80 to-purple-50/80 backdrop-blur-sm px-4 py-4 sm:py-8">
      <div className="container mx-auto space-y-6 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex items-center gap-2 hover:bg-negari-orange hover:text-white rounded-lg"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-negari-indigo mb-4">Explore Opportunities</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover universities, scholarships, and educational opportunities worldwide
            </p>
          </div>
          <div></div>
        </div>

        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search universities, scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/90 backdrop-blur-sm rounded-lg"
          />
        </div>

        {filteredCategories.map((category) => {
          const Icon = category.icon;
          return (
            <section key={category.title} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-negari-orange/20 rounded-lg">
                  <Icon className="h-6 w-6 text-negari-orange" />
                </div>
                <h2 className="text-2xl font-bold text-negari-indigo">{category.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item, index) => (
                  <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-negari-indigo">{item.name}</CardTitle>
                        {hasRating(item) && (
                          <Badge variant="secondary" className="bg-negari-gold/20 text-negari-gold">
                            ⭐ {item.rating}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-negari-indigo">
                          {item.type}
                        </Badge>
                        {hasDeadline(item) && (
                          <div className="flex items-center gap-1 text-sm text-orange-600">
                            <Clock className="h-3 w-3" />
                            <span>{item.deadline}</span>
                          </div>
                        )}
                        {hasRating(item) && item.tuition && (
                          <div className="flex items-center gap-1 text-sm text-green-600">
                            <DollarSign className="h-3 w-3" />
                            <span className="text-xs">{item.tuition}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.description || `Learn more about ${item.name} and their programs.`}
                      </p>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => openDetailModal(item)}
                              variant="outline"
                              size="sm"
                              className="flex-1 border-negari-orange text-negari-orange hover:bg-negari-orange hover:text-white rounded-lg"
                            >
                              Learn More
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-sm rounded-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2 text-negari-indigo">
                                <Icon className="h-5 w-5" />
                                {item.name}
                              </DialogTitle>
                            </DialogHeader>
                            
                            <Tabs defaultValue="overview" className="w-full">
                              <TabsList className="grid grid-cols-3 w-full">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="details">Details</TabsTrigger>
                                <TabsTrigger value="apply">Apply</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="overview" className="space-y-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span>{item.location}</span>
                                  </div>
                                  
                                  {hasRating(item) && (
                                    <>
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">Rating:</span>
                                        <Badge className="bg-negari-gold/20 text-negari-gold">⭐ {item.rating}</Badge>
                                      </div>
                                      {item.acceptance && (
                                        <div className="flex items-center gap-2">
                                          <Users className="h-4 w-4 text-gray-400" />
                                          <span className="text-sm">Acceptance Rate: {item.acceptance}</span>
                                        </div>
                                      )}
                                    </>
                                  )}
                                  
                                  {hasDeadline(item) && (
                                    <>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm">Deadline: {item.deadline}</span>
                                      </div>
                                      {item.amount && (
                                        <div className="flex items-center gap-2">
                                          <DollarSign className="h-4 w-4 text-gray-400" />
                                          <span className="text-sm">Funding: {item.amount}</span>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                                
                                <p className="text-gray-700">{item.description}</p>
                              </TabsContent>
                              
                              <TabsContent value="details" className="space-y-4">
                                {hasRating(item) && item.programs && (
                                  <div>
                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                      <BookOpen className="h-4 w-4" />
                                      Popular Programs
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {item.programs.map((program, i) => (
                                        <Badge key={i} variant="outline">{program}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {hasDeadline(item) && (
                                  <>
                                    {item.eligibility && (
                                      <div>
                                        <h4 className="font-semibold mb-2">Eligibility Criteria</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                          {item.eligibility.map((criterion, i) => (
                                            <li key={i}>{criterion}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    
                                    {item.requirements && (
                                      <div>
                                        <h4 className="font-semibold mb-2">Required Documents</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                          {item.requirements.map((req, i) => (
                                            <li key={i}>{req}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </>
                                )}
                              </TabsContent>
                              
                              <TabsContent value="apply" className="space-y-4">
                                <div className="text-center space-y-4">
                                  <h3 className="text-lg font-semibold">Ready to Apply?</h3>
                                  <p className="text-gray-600">
                                    Take the next step towards your educational goals by applying to {item.name}.
                                  </p>
                                  
                                  <div className="flex flex-col gap-3">
                                    <Button
                                      onClick={() => applyToOpportunity(item)}
                                      className="w-full bg-negari-orange hover:bg-negari-indigo text-white"
                                    >
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      Visit Official Website
                                    </Button>
                                    
                                    <Button
                                      onClick={() => toast({
                                        title: "Added to Favorites",
                                        description: `${item.name} has been saved to your favorites for easy access later.`
                                      })}
                                      variant="outline"
                                      className="w-full border-negari-orange text-negari-orange hover:bg-negari-orange hover:text-white"
                                    >
                                      Save to Favorites
                                    </Button>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          onClick={() => applyToOpportunity(item)}
                          size="sm"
                          className="bg-negari-orange hover:bg-negari-indigo text-white rounded-lg"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Apply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;
