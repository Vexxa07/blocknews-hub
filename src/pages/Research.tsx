
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search, Filter, FileText, Download, Star, ArrowRight,
  Clock, UserCircle, Calendar, Layers, Tag
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Sample research reports
const researchReports = [
  {
    id: '1',
    title: 'The State of Blockchain 2025: Technology Trends and Market Outlook',
    summary: 'In-depth analysis of current blockchain technology trends, market projections, and emerging use cases across industries.',
    coverImage: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: 'Apr 15, 2025',
    author: 'Blockchain Research Team',
    readTime: '30 min',
    tags: ['Market Analysis', 'Technology', 'Trends'],
    category: 'Industry Report',
    rating: 4.8,
    downloadCount: 2345
  },
  {
    id: '2',
    title: 'DeFi Ecosystem Analysis: Protocols, Risks, and Future Innovations',
    summary: 'Comprehensive analysis of the decentralized finance ecosystem, major protocols, risk assessment, and innovation roadmap.',
    coverImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: 'Apr 10, 2025',
    author: 'DeFi Research Lab',
    readTime: '45 min',
    tags: ['DeFi', 'Risk Analysis', 'Innovation'],
    category: 'Sector Analysis',
    rating: 4.6,
    downloadCount: 1876
  },
  {
    id: '3',
    title: 'Central Bank Digital Currencies: Global Progress and Implementation Challenges',
    summary: 'A global overview of CBDC development across major economies, technical approaches, and implementation challenges.',
    coverImage: 'https://images.unsplash.com/photo-1621501103258-3e135c8c1fda?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: 'Apr 5, 2025',
    author: 'Monetary Policy Research Group',
    readTime: '35 min',
    tags: ['CBDC', 'Regulation', 'Central Banks'],
    category: 'Policy Research',
    rating: 4.7,
    downloadCount: 2103
  },
  {
    id: '4',
    title: 'NFT Market Evolution: From Digital Art to Utility Applications',
    summary: 'An analysis of how the NFT market has evolved from primarily art-focused to utility-based applications across industries.',
    coverImage: 'https://images.unsplash.com/photo-1646328334264-fd0e37996154?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: 'Mar 28, 2025',
    author: 'Digital Assets Research',
    readTime: '25 min',
    tags: ['NFTs', 'Digital Assets', 'Market Analysis'],
    category: 'Trend Report',
    rating: 4.5,
    downloadCount: 1589
  },
  {
    id: '5',
    title: 'Layer 2 Scaling Solutions: Technical Analysis and Performance Comparison',
    summary: 'Technical deep dive into leading Layer 2 scaling solutions for Ethereum, including performance benchmarks and security analysis.',
    coverImage: 'https://images.unsplash.com/photo-1639815188546-c43c240e8335?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: 'Mar 22, 2025',
    author: 'Blockchain Technology Lab',
    readTime: '40 min',
    tags: ['Layer 2', 'Scaling', 'Technical Analysis'],
    category: 'Technical Report',
    rating: 4.9,
    downloadCount: 2678
  },
  {
    id: '6',
    title: 'Regulatory Landscape of Crypto Assets: Global Approaches and Future Directions',
    summary: 'Analysis of regulatory approaches to cryptocurrency across major jurisdictions and projections of future regulatory trends.',
    coverImage: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: 'Mar 15, 2025',
    author: 'Crypto Regulation Task Force',
    readTime: '35 min',
    tags: ['Regulation', 'Policy', 'Compliance'],
    category: 'Regulatory Analysis',
    rating: 4.7,
    downloadCount: 1943
  }
];

// Categories for filtering
const categories = [
  'All Categories', 'Industry Report', 'Sector Analysis', 'Technical Report', 
  'Policy Research', 'Trend Report', 'Regulatory Analysis'
];

const Research = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  // Filter reports based on search term and category
  const filteredReports = researchReports.filter(report => {
    const matchesSearch = searchTerm === '' || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || 
      report.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="bg-card py-12 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-4">Blockchain Research</h1>
            <p className="text-muted-foreground text-lg max-w-3xl mb-8">
              Access in-depth research reports, analysis, and insights on blockchain technology,
              cryptocurrencies, market trends, and industry developments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search research reports..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <select 
                  className="px-3 py-2 bg-muted rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <Button variant="outline" size="icon" title="More filters">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Report */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8">Featured Research</h2>
            
            <div className="bg-card rounded-lg border overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img 
                    src={researchReports[0].coverImage}
                    alt={researchReports[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="outline" className="mb-3">
                    {researchReports[0].category}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-3">
                    {researchReports[0].title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {researchReports[0].summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {researchReports[0].tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <UserCircle className="h-4 w-4" />
                      {researchReports[0].author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {researchReports[0].date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {researchReports[0].readTime}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(researchReports[0].rating) 
                              ? 'fill-yellow-500 text-yellow-500' 
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm">({researchReports[0].rating})</span>
                    </div>
                    
                    <Button className="gap-2">
                      <Download className="h-4 w-4" /> Download Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Reports List */}
        <section className="py-12 px-4 bg-card border-t">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8">Research Reports</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map(report => (
                <Card key={report.id} className="overflow-hidden border hover:shadow-md transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={report.coverImage}
                      alt={report.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      {report.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                      <Link to={`/research/${report.id}`} className="hover:text-primary transition-colors">
                        {report.title}
                      </Link>
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {report.summary}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {report.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {report.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{report.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {report.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {report.downloadCount.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-0.5">
                        {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${
                              i < Math.floor(report.rating) 
                                ? 'fill-yellow-500 text-yellow-500' 
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs">({report.rating})</span>
                      </div>
                      
                      <Button variant="outline" size="sm" asChild className="gap-1 text-xs">
                        <Link to={`/research/${report.id}`}>
                          View Report <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Show empty state if no results */}
            {filteredReports.length === 0 && (
              <div className="text-center py-12 border rounded-lg">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No reports found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All Categories');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Research Newsletter */}
        <section className="py-12 px-4 bg-gradient-to-r from-crypto-blue to-crypto-purple">
          <div className="container mx-auto text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Research Updates</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Get weekly research reports, market analysis, and expert insights 
              directly in your inbox every Tuesday.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 placeholder:text-white/60 text-white"
              />
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </div>
            
            <p className="text-xs text-white/70 mt-4">
              Your data is secure. We never share your information with third parties.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Research;
