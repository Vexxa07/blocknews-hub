
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PriceChart from '@/components/dashboard/PriceChart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3, PieChart, LineChart, TrendingUp, TrendingDown,
  DollarSign, Globe, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Tooltip as RechartsTooltip
} from 'recharts';

// Sample pie chart data
const marketDominanceData = [
  { name: 'Bitcoin', value: 42.5, color: '#3a80e9' },
  { name: 'Ethereum', value: 18.2, color: '#9b59b6' },
  { name: 'Stablecoins', value: 12.1, color: '#4caf50' },
  { name: 'BNB', value: 4.3, color: '#f1c40f' },
  { name: 'Solana', value: 3.1, color: '#e74c3c' },
  { name: 'XRP', value: 2.8, color: '#3498db' },
  { name: 'Cardano', value: 1.9, color: '#2ecc71' },
  { name: 'Others', value: 15.1, color: '#95a5a6' }
];

const Analysis = () => {
  // Animation for sentiment cards
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Sample market sentiment indicators
  const sentimentIndicators = [
    { 
      name: 'Market Sentiment', 
      value: 'Bullish', 
      icon: TrendingUp, 
      color: 'text-crypto-green', 
      bgColor: 'bg-crypto-green/10', 
      description: 'Overall market sentiment is bullish with increasing on-chain activity and positive price action.'
    },
    { 
      name: 'Bitcoin Fear & Greed', 
      value: '65', 
      icon: TrendingUp, 
      color: 'text-amber-500', 
      bgColor: 'bg-amber-500/10', 
      description: 'The Fear & Greed Index is currently indicating Greed, suggesting potential caution.'
    },
    { 
      name: 'Liquidations (24h)', 
      value: '$187M', 
      icon: ArrowDownRight, 
      color: 'text-crypto-red', 
      bgColor: 'bg-crypto-red/10', 
      description: 'Total liquidations in the past 24h with shorts outpacing longs.'
    },
    { 
      name: 'Institutional Flows', 
      value: 'Positive', 
      icon: ArrowUpRight, 
      color: 'text-crypto-green', 
      bgColor: 'bg-crypto-green/10', 
      description: 'Institutional flows remain positive with increased ETF inflows over the past week.'
    }
  ];

  // Technical analysis indicators
  const technicalIndicators = [
    { name: 'BTC RSI (14)', value: 62, status: 'Neutral' },
    { name: 'BTC MACD', value: 'Bullish', status: 'Strong' },
    { name: 'BTC MA (200)', value: 'Above', status: 'Bullish' },
    { name: 'BTC Bollinger Bands', value: 'Upper', status: 'Overbought' },
    { name: 'ETH RSI (14)', value: 57, status: 'Neutral' },
    { name: 'ETH MACD', value: 'Bullish', status: 'Weak' },
    { name: 'ETH MA (200)', value: 'Above', status: 'Bullish' },
    { name: 'ETH Bollinger Bands', value: 'Middle', status: 'Neutral' },
  ];

  // On-chain metrics
  const onChainMetrics = [
    { metric: 'BTC Active Addresses', value: '1.02M', change: '+3.2%' },
    { metric: 'BTC Network Hash Rate', value: '512 EH/s', change: '+1.7%' },
    { metric: 'ETH Active Addresses', value: '675K', change: '+2.5%' },
    { metric: 'ETH Staking Rate', value: '25.6%', change: '+0.3%' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="bg-card py-12 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-6">Market Analysis</h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Get real-time technical, fundamental, and sentiment analysis for cryptocurrency markets, 
              helping you make more informed trading and investment decisions.
            </p>

            {/* Sentiment Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
              {sentimentIndicators.map((indicator, index) => (
                <div
                  key={indicator.name}
                  className="relative overflow-hidden"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Card className={`border transition-all duration-300 ${
                    hoveredIndex === index ? 'border-primary shadow-md' : ''
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-full ${indicator.bgColor}`}>
                          <indicator.icon className={`h-6 w-6 ${indicator.color}`} />
                        </div>
                        <span className={`text-lg font-bold ${indicator.color}`}>
                          {indicator.value}
                        </span>
                      </div>
                      <h3 className="font-medium">{indicator.name}</h3>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {indicator.description}
                      </p>
                    </CardContent>
                  </Card>
                  <div 
                    className={`absolute inset-0 bg-primary/5 transform pointer-events-none transition-transform duration-500 ease-in-out ${
                      hoveredIndex === index ? 'translate-y-0' : 'translate-y-full'
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Tabs */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <Tabs defaultValue="technical" className="w-full">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Analysis Dashboard</h2>
                <TabsList>
                  <TabsTrigger value="technical" className="gap-1">
                    <LineChart className="h-4 w-4" />
                    <span className="hidden sm:inline">Technical</span>
                  </TabsTrigger>
                  <TabsTrigger value="fundamental" className="gap-1">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Fundamental</span>
                  </TabsTrigger>
                  <TabsTrigger value="sentiment" className="gap-1">
                    <PieChart className="h-4 w-4" />
                    <span className="hidden sm:inline">Sentiment</span>
                  </TabsTrigger>
                  <TabsTrigger value="onchain" className="gap-1">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">On-Chain</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Technical Analysis */}
              <TabsContent value="technical" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <PriceChart coinName="Bitcoin" coinSymbol="BTC" initialTrend="up" />
                  <div className="bg-card rounded-lg border p-6 overflow-hidden">
                    <h3 className="text-lg font-semibold mb-4">Technical Indicators</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {technicalIndicators.map((indicator, index) => (
                        <div key={index} className="flex justify-between p-2 border-b">
                          <span className="text-sm text-muted-foreground">{indicator.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{indicator.value}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              indicator.status === 'Bullish' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                              indicator.status === 'Bearish' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}>
                              {indicator.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Fundamental Analysis */}
              <TabsContent value="fundamental" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="col-span-1 md:col-span-2">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-6">Market Dominance</h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPie>
                            <RechartsTooltip />
                            <Pie
                              data={marketDominanceData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                              label={({name, value}) => `${name}: ${value}%`}
                            >
                              {marketDominanceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </RechartsPie>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Market Overview</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Market Cap</span>
                          <span className="font-medium">$1.86T</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">24h Volume</span>
                          <span className="font-medium">$75.4B</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">BTC Dominance</span>
                          <span className="font-medium">42.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ETH Dominance</span>
                          <span className="font-medium">18.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stablecoin Market Cap</span>
                          <span className="font-medium">$225.3B</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">DeFi TVL</span>
                          <span className="font-medium">$96.8B</span>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <Button variant="outline" className="w-full">View Detailed Report</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Sentiment Analysis */}
              <TabsContent value="sentiment" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Social Sentiment</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Twitter Sentiment (BTC)</span>
                            <span className="text-sm font-medium">65% Positive</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-crypto-green h-2.5 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Reddit Sentiment (BTC)</span>
                            <span className="text-sm font-medium">58% Positive</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-crypto-green h-2.5 rounded-full" style={{ width: '58%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Twitter Sentiment (ETH)</span>
                            <span className="text-sm font-medium">62% Positive</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-crypto-green h-2.5 rounded-full" style={{ width: '62%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Reddit Sentiment (ETH)</span>
                            <span className="text-sm font-medium">53% Positive</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-crypto-green h-2.5 rounded-full" style={{ width: '53%' }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Market Psychology</h3>
                      <div className="flex justify-center mb-6">
                        <div className="w-full max-w-xs">
                          <div className="relative h-6 bg-gradient-to-r from-crypto-red via-amber-500 to-crypto-green rounded-full overflow-hidden">
                            <div className="absolute top-0 left-[54%] h-6 w-0.5 bg-white animate-pulse"></div>
                            <div className="absolute -top-0.5 left-[53%] h-7 w-4 bg-white/20"></div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs">
                            <span>Extreme Fear</span>
                            <span>Fear</span>
                            <span>Neutral</span>
                            <span>Greed</span>
                            <span>Extreme Greed</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mt-8">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fear & Greed Index</span>
                          <span className="font-medium">65 (Greed)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Futures Funding Rate</span>
                          <span className="font-medium text-crypto-green">+0.02%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Long/Short Ratio</span>
                          <span className="font-medium">1.32</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Put/Call Ratio</span>
                          <span className="font-medium">0.86</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* On-Chain Analysis */}
              <TabsContent value="onchain" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">On-Chain Metrics</h3>
                      <div className="space-y-4">
                        {onChainMetrics.map((metric, index) => (
                          <div key={index} className="flex justify-between items-center p-2 border-b">
                            <span className="text-muted-foreground">{metric.metric}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{metric.value}</span>
                              <span className={`text-xs ${
                                metric.change.startsWith('+') 
                                  ? 'text-crypto-green'
                                  : 'text-crypto-red'
                              }`}>
                                {metric.change}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Whale Activity</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium mb-2">BTC Exchange Flows (24h)</h4>
                          <div className="flex items-center">
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-muted-foreground">Inflow</span>
                                <span className="text-xs font-medium">32,450 BTC</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-1.5">
                                <div className="bg-crypto-red h-1.5 rounded-full" style={{ width: '65%' }}></div>
                              </div>
                            </div>
                            <div className="mx-4 text-center">
                              <ArrowDownRight className="h-6 w-6 text-crypto-red mx-auto" />
                              <span className="text-xs text-muted-foreground">Net</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-muted-foreground">Outflow</span>
                                <span className="text-xs font-medium">28,760 BTC</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-1.5">
                                <div className="bg-crypto-green h-1.5 rounded-full" style={{ width: '57%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">ETH Exchange Flows (24h)</h4>
                          <div className="flex items-center">
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-muted-foreground">Inflow</span>
                                <span className="text-xs font-medium">245,200 ETH</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-1.5">
                                <div className="bg-crypto-red h-1.5 rounded-full" style={{ width: '48%' }}></div>
                              </div>
                            </div>
                            <div className="mx-4 text-center">
                              <ArrowUpRight className="h-6 w-6 text-crypto-green mx-auto" />
                              <span className="text-xs text-muted-foreground">Net</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-muted-foreground">Outflow</span>
                                <span className="text-xs font-medium">276,500 ETH</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-1.5">
                                <div className="bg-crypto-green h-1.5 rounded-full" style={{ width: '55%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <h4 className="text-sm font-medium mb-3">Recent Whale Transactions</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">2,150 BTC moved to unknown wallet</span>
                              <span>2h ago</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">15,300 ETH moved from Binance</span>
                              <span>3h ago</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">1,840 BTC moved to Coinbase</span>
                              <span>5h ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Analysis Tools */}
        <section className="py-12 px-4 bg-card border-t">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Analysis Tools</h2>
              <Button>View All Tools</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <LineChart className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Technical Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Advanced technical indicators and chart patterns to analyze price movements.
                  </p>
                  <Button variant="outline" className="w-full">Open Tool</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <BarChart3 className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Market Scanner</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Find trading opportunities with our real-time market scanner.
                  </p>
                  <Button variant="outline" className="w-full">Open Tool</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <Globe className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">On-Chain Analytics</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Analyze blockchain data to identify trends and whale activity.
                  </p>
                  <Button variant="outline" className="w-full">Open Tool</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <DollarSign className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Portfolio Analyzer</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track and analyze your portfolio performance and allocation.
                  </p>
                  <Button variant="outline" className="w-full">Open Tool</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Analysis;
