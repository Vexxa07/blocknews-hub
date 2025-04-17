
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, TrendingUp, Newspaper, 
  LineChart, BarChart3, Bell, ArrowUpRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PriceChart from '@/components/dashboard/PriceChart';
import NewsList from '@/components/news/NewsList';
import MarketOverview from '@/components/markets/MarketOverview';

const Index = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    featuredCharts: false,
    news: false,
    markets: false,
    features: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, { threshold: 0.1 });
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section 
          id="hero" 
          className={`py-20 px-4 bg-gradient-to-br from-crypto-darkBg to-card relative overflow-hidden ${
            isVisible.hero ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Your Premier Blockchain News & Analysis Hub
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Stay ahead with real-time insights, in-depth analysis, and market intelligence 
                for informed blockchain and cryptocurrency decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  Latest Research <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <div className="bg-card border p-4 rounded-lg">
                  <h3 className="text-sm text-muted-foreground mb-1">Bitcoin Price</h3>
                  <p className="text-xl font-bold">$43,256.78</p>
                  <span className="text-xs text-crypto-green flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> +2.34%
                  </span>
                </div>
                <div className="bg-card border p-4 rounded-lg">
                  <h3 className="text-sm text-muted-foreground mb-1">Ethereum Price</h3>
                  <p className="text-xl font-bold">$2,876.12</p>
                  <span className="text-xs text-crypto-red flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> -0.87%
                  </span>
                </div>
                <div className="bg-card border p-4 rounded-lg">
                  <h3 className="text-sm text-muted-foreground mb-1">Market Cap</h3>
                  <p className="text-xl font-bold">$1.87T</p>
                  <span className="text-xs text-crypto-green flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> +1.23%
                  </span>
                </div>
                <div className="bg-card border p-4 rounded-lg">
                  <h3 className="text-sm text-muted-foreground mb-1">24h Volume</h3>
                  <p className="text-xl font-bold">$78.5B</p>
                  <span className="text-xs text-crypto-green flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> +3.45%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path fill="#3a80e9" d="M42.8,-72.8C54.9,-67.2,64,-54.3,71.7,-40.4C79.5,-26.5,85.8,-11.5,85.1,3.2C84.4,17.8,76.7,32.2,66.8,44.3C56.9,56.4,44.8,66.1,31.1,70.9C17.4,75.6,2.1,75.3,-12.8,73.3C-27.8,71.3,-42.3,67.5,-53.5,58.9C-64.7,50.3,-72.6,36.9,-77.7,22.2C-82.7,7.5,-84.9,-8.5,-81,-22.9C-77.2,-37.4,-67.3,-50.3,-54.6,-55.9C-41.8,-61.6,-26.1,-59.9,-12,-55.7C2.2,-51.5,14.9,-44.6,25.9,-44.3C37,-43.9,46.3,-50,53.9,-54.9C61.5,-59.8,67.3,-63.5,68.9,-60.8C70.5,-58.1,67.8,-49.2,61,-43.5" transform="translate(100 100)" />
            </svg>
          </div>
        </section>
        
        {/* Featured Charts */}
        <section 
          id="featuredCharts" 
          className={`py-16 px-4 ${
            isVisible.featuredCharts ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Featured Charts</h2>
              <Link to="/markets">
                <Button variant="outline" className="gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <PriceChart coinName="Bitcoin" coinSymbol="BTC" initialTrend="up" />
              <PriceChart coinName="Ethereum" coinSymbol="ETH" initialTrend="down" />
            </div>
          </div>
        </section>
        
        {/* Latest News */}
        <section 
          id="news"
          className={`py-16 px-4 bg-card ${
            isVisible.news ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Latest News</h2>
              <Link to="/news">
                <Button variant="outline" className="gap-1">
                  All News <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <NewsList limit={3} showFilters={false} />
          </div>
        </section>
        
        {/* Market Overview */}
        <section 
          id="markets" 
          className={`py-16 px-4 ${
            isVisible.markets ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Market Overview</h2>
              <Link to="/markets">
                <Button variant="outline" className="gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <MarketOverview limit={5} showPagination={false} />
          </div>
        </section>
        
        {/* Features */}
        <section 
          id="features" 
          className={`py-16 px-4 bg-card ${
            isVisible.features ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Comprehensive Blockchain Intelligence</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                BlockNews Hub delivers a complete suite of tools and insights to help you navigate 
                the complex world of blockchain and cryptocurrency investments with confidence.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-background p-6 rounded-lg border hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Newspaper className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">News & Updates</h3>
                <p className="text-muted-foreground">
                  Real-time blockchain and cryptocurrency news from around the world, curated by experts.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg border hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Charts</h3>
                <p className="text-muted-foreground">
                  Advanced charting tools to analyze price movements and identify market trends.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg border hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Market Analysis</h3>
                <p className="text-muted-foreground">
                  Comprehensive market data and insightful analysis to inform your investment decisions.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg border hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Price Alerts</h3>
                <p className="text-muted-foreground">
                  Customizable price alerts to never miss important market movements and opportunities.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Button size="lg" asChild>
                <Link to="/news">Explore All Features</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 px-4 bg-gradient-to-r from-crypto-blue to-primary">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stay Ahead of the Crypto Market
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of traders and investors who trust BlockNews Hub for their 
              cryptocurrency market intelligence and research.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Sign Up Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
