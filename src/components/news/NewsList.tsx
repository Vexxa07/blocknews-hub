
import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, Filter, TrendingUp, CalendarClock, 
  ArrowDownAZ, Flame, ArrowUpWideNarrow, Loader
} from 'lucide-react';

// Sample crypto news data
const sampleNewsData = [
  {
    id: '1',
    title: 'Bitcoin Price Breaks $45,000 as Market Sentiment Improves',
    summary: 'Bitcoin has surged past $45,000 for the first time in weeks as market sentiment shows signs of improvement following recent regulatory clarity from key markets.',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    source: 'CryptoInsider',
    date: 'Apr 17, 2025',
    readTime: '5 min',
    category: 'Markets',
    url: '#'
  },
  {
    id: '2',
    title: 'Ethereum Layer 2 Solutions See Record Transaction Volume',
    summary: 'Ethereum Layer 2 scaling solutions have recorded their highest ever transaction volumes this week, signaling increased adoption of these technologies to overcome Ethereum\'s scalability issues.',
    imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    source: 'BlockchainTimes',
    date: 'Apr 16, 2025',
    readTime: '4 min',
    category: 'Technology',
    url: '#'
  },
  {
    id: '3',
    title: 'SEC Approves First Spot Ethereum ETF Applications',
    summary: 'In a landmark decision, the Securities and Exchange Commission has approved the first batch of spot Ethereum ETF applications, paving the way for institutional investment in the second-largest cryptocurrency.',
    imageUrl: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    source: 'CryptoNews',
    date: 'Apr 15, 2025',
    readTime: '6 min',
    category: 'Regulation',
    url: '#'
  },
  {
    id: '4',
    title: 'Central Banks Accelerate CBDC Development Amid Private Stablecoin Growth',
    summary: 'Central banks worldwide are ramping up their central bank digital currency (CBDC) initiatives as private stablecoins continue to gain market share in the global payments landscape.',
    imageUrl: 'https://images.unsplash.com/photo-1565373679580-fc0cb7ed90f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    source: 'Global Finance',
    date: 'Apr 14, 2025',
    readTime: '7 min',
    category: 'CBDCs',
    url: '#'
  },
  {
    id: '5',
    title: 'DeFi Protocols Reach $100 Billion in Total Value Locked',
    summary: 'Decentralized Finance (DeFi) has achieved a major milestone with total value locked (TVL) across protocols surpassing $100 billion, reflecting growing confidence in decentralized financial services.',
    imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    source: 'DeFi Daily',
    date: 'Apr 13, 2025',
    readTime: '5 min',
    category: 'DeFi',
    url: '#'
  },
  {
    id: '6',
    title: 'NFT Market Shows Signs of Recovery After Year-Long Slump',
    summary: 'The non-fungible token (NFT) market is showing promising signs of recovery following a prolonged downturn, with trading volumes increasing across major marketplaces and renewed interest from collectors.',
    imageUrl: 'https://images.unsplash.com/photo-1646157126615-aa6c7b6465ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    source: 'NFT Insider',
    date: 'Apr 12, 2025',
    readTime: '4 min',
    category: 'NFTs',
    url: '#'
  }
];

// More categories for filtering
const categories = [
  'All', 'Markets', 'Technology', 'Regulation', 
  'CBDCs', 'DeFi', 'NFTs', 'Mining', 'Security'
];

// Sort options
const sortOptions = [
  { label: 'Latest', icon: CalendarClock },
  { label: 'Trending', icon: TrendingUp },
  { label: 'Most Popular', icon: Flame },
  { label: 'Alphabetical', icon: ArrowDownAZ },
];

interface NewsListProps {
  limit?: number;
  showFilters?: boolean;
}

const NewsList = ({ limit, showFilters = true }: NewsListProps) => {
  const [news, setNews] = useState(sampleNewsData);
  const [filteredNews, setFilteredNews] = useState(sampleNewsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  useEffect(() => {
    // Filter news based on search term and category
    setIsLoading(true);
    
    setTimeout(() => {
      let result = [...news];
      
      // Filter by search term
      if (searchTerm) {
        result = result.filter(
          item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filter by category
      if (selectedCategory !== 'All') {
        result = result.filter(item => item.category === selectedCategory);
      }
      
      // Sort the news
      switch (sortBy) {
        case 'Latest':
          // Already sorted by date in the sample data
          break;
        case 'Alphabetical':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'Trending':
        case 'Most Popular':
          // Randomly shuffle for demo purposes
          result.sort(() => Math.random() - 0.5);
          break;
        default:
          break;
      }
      
      setFilteredNews(result);
      setIsLoading(false);
    }, 300);
  }, [news, searchTerm, selectedCategory, sortBy]);

  // Display limited items if limit prop is provided
  const displayedNews = limit ? filteredNews.slice(0, limit) : filteredNews;
  
  // Categories to display initially (when not showing all)
  const displayedCategories = showMoreCategories 
    ? categories 
    : categories.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {showFilters && (
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search news..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon" title="Filter">
                <Filter className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon" title="Sort">
                <ArrowUpWideNarrow className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-2 flex-wrap">
              {displayedCategories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
              
              {categories.length > 5 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMoreCategories(!showMoreCategories)}
                  className="text-xs"
                >
                  {showMoreCategories ? 'Show Less' : `+${categories.length - 5} More`}
                </Button>
              )}
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {sortOptions.map(option => (
                <Button
                  key={option.label}
                  variant={sortBy === option.label ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy(option.label)}
                  className="flex items-center gap-1 text-xs whitespace-nowrap"
                >
                  <option.icon className="h-3.5 w-3.5" />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="flex flex-col items-center">
            <Loader className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Loading news...</p>
          </div>
        </div>
      ) : displayedNews.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-card">
          <p className="text-xl font-semibold">No results found</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSortBy('Latest');
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedNews.map((item) => (
            <NewsCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
