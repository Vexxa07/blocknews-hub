
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MarketOverview from '@/components/markets/MarketOverview';
import PriceChart from '@/components/dashboard/PriceChart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, CandlestickChart, BarChart3,
  TrendingUp, TrendingDown, DollarSign, ArrowDown, ArrowUp
} from 'lucide-react';

const Markets = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="bg-card py-12 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-6">Crypto Markets</h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Track real-time cryptocurrency prices, market statistics, trading volumes, and historical data 
              for thousands of cryptocurrencies across global exchanges.
            </p>

            {/* Market Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-background border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <h3 className="text-xl font-bold">$1.86T</h3>
                  </div>
                  <span className="text-crypto-green flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" /> 1.3%
                  </span>
                </div>
              </div>
              <div className="bg-background border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">24h Volume</p>
                    <h3 className="text-xl font-bold">$75.4B</h3>
                  </div>
                  <span className="text-crypto-red flex items-center">
                    <ArrowDown className="h-4 w-4 mr-1" /> 2.8%
                  </span>
                </div>
              </div>
              <div className="bg-background border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">BTC Dominance</p>
                    <h3 className="text-xl font-bold">42.1%</h3>
                  </div>
                  <span className="text-crypto-green flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" /> 0.2%
                  </span>
                </div>
              </div>
              <div className="bg-background border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Cryptos</p>
                    <h3 className="text-xl font-bold">14,382</h3>
                  </div>
                  <span className="text-crypto-green flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Charts */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">Featured Charts</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <PriceChart coinName="Bitcoin" coinSymbol="BTC" initialTrend="volatile" />
              <PriceChart coinName="Ethereum" coinSymbol="ETH" initialTrend="up" />
            </div>
          </div>
        </section>

        {/* Market Data Tabs */}
        <section className="py-12 px-4 bg-card border-t">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">Market Data</h2>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-muted/50 p-1 mb-8">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  All Cryptocurrencies
                </TabsTrigger>
                <TabsTrigger value="gainers" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Top Gainers
                </TabsTrigger>
                <TabsTrigger value="losers" className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Top Losers
                </TabsTrigger>
                <TabsTrigger value="volume" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Volume Leaders
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <MarketOverview />
              </TabsContent>

              <TabsContent value="gainers">
                <MarketOverview />
                {/* In a full implementation, this would show filtered data */}
              </TabsContent>

              <TabsContent value="losers">
                <MarketOverview />
                {/* In a full implementation, this would show filtered data */}
              </TabsContent>

              <TabsContent value="volume">
                <MarketOverview />
                {/* In a full implementation, this would show filtered data */}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Market Sentiment */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Market Sentiment</h2>
              <Button variant="outline">View Details</Button>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Fear & Greed Index</h3>
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xl">
                      54
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold">Neutral</p>
                      <p className="text-sm text-muted-foreground">
                        Yesterday: Greed (62)
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">BTC Liquidations (24h)</h3>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Longs</span>
                      <span className="font-semibold text-crypto-red">$67.8M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shorts</span>
                      <span className="font-semibold text-crypto-green">$42.1M</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Open Interest</h3>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>BTC</span>
                      <span className="font-semibold">$16.7B</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ETH</span>
                      <span className="font-semibold">$8.2B</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Markets;
