
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NewsList from '@/components/news/NewsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Newspaper, Globe, Code, Briefcase, 
  Factory, ShieldCheck, LineChart, Box
} from 'lucide-react';

const News = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All News', icon: Newspaper },
    { id: 'markets', name: 'Markets', icon: LineChart },
    { id: 'technology', name: 'Technology', icon: Code },
    { id: 'business', name: 'Business', icon: Briefcase },
    { id: 'regulation', name: 'Regulation', icon: ShieldCheck },
    { id: 'defi', name: 'DeFi', icon: Globe },
    { id: 'nft', name: 'NFTs', icon: Box },
    { id: 'mining', name: 'Mining', icon: Factory },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="bg-card py-12 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-6">Blockchain News</h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Stay informed with the latest news, trends, and developments in the blockchain 
              and cryptocurrency industry from trusted sources around the globe.
            </p>

            <div className="mt-8">
              <Tabs defaultValue="all" className="w-full">
                <div className="overflow-x-auto pb-2">
                  <TabsList className="bg-muted/50 p-1">
                    {categories.map(category => (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id}
                        className="flex items-center gap-2"
                      >
                        <category.icon className="h-4 w-4" />
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {categories.map(category => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="pt-8">
                      <NewsList />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Never Miss a Story</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to get daily updates on the most important 
              blockchain news and developments directly to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input 
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              By subscribing, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default News;
