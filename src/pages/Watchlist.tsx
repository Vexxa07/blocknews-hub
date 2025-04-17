
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PriceChart from '@/components/dashboard/PriceChart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus, X, Save, Star, Trash2, Settings2,
  Search, Pencil, Eye, EyeOff, MoreHorizontal, AlertTriangle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

// Sample cryptocurrency data
const generateCryptoData = () => [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
    price: 45678.32,
    change24h: 2.34,
    high24h: 46120.50,
    low24h: 44980.25,
    marketCap: 867543210000,
    volume24h: 24500876000,
    inWatchlist: true,
    alertsSet: true,
    notes: 'Key resistance at $48,500. Support at $42,800.'
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    price: 2456.78,
    change24h: -1.45,
    high24h: 2520.30,
    low24h: 2430.10,
    marketCap: 298765432100,
    volume24h: 15678543000,
    inWatchlist: true,
    alertsSet: true,
    notes: 'Watching for break above $2,600'
  },
  {
    id: 3,
    name: 'Binance Coin',
    symbol: 'BNB',
    logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
    price: 345.67,
    change24h: 0.89,
    high24h: 352.40,
    low24h: 339.50,
    marketCap: 57658765000,
    volume24h: 2345876000,
    inWatchlist: true,
    alertsSet: false,
    notes: ''
  },
  {
    id: 4,
    name: 'Solana',
    symbol: 'SOL',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
    price: 123.45,
    change24h: 5.67,
    high24h: 125.60,
    low24h: 116.20,
    marketCap: 45678123000,
    volume24h: 3456789000,
    inWatchlist: true,
    alertsSet: false,
    notes: 'Strong momentum, watch for pullback'
  },
  {
    id: 5,
    name: 'Cardano',
    symbol: 'ADA',
    logo: 'https://cryptologos.cc/logos/cardano-ada-logo.svg',
    price: 0.54,
    change24h: -2.31,
    high24h: 0.56,
    low24h: 0.52,
    marketCap: 19876543000,
    volume24h: 1234567000,
    inWatchlist: false,
    alertsSet: false,
    notes: ''
  },
  {
    id: 6,
    name: 'XRP',
    symbol: 'XRP',
    logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg',
    price: 0.67,
    change24h: 1.23,
    high24h: 0.68,
    low24h: 0.65,
    marketCap: 34567890000,
    volume24h: 2345678000,
    inWatchlist: false,
    alertsSet: false,
    notes: ''
  }
];

const Watchlist = () => {
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      const data = generateCryptoData();
      setCryptoData(data);
      
      // Filter only items in watchlist
      const watchlistItems = data.filter(crypto => crypto.inWatchlist);
      setWatchlist(watchlistItems);
      
      // Set default selected crypto to first in watchlist
      if (watchlistItems.length > 0) {
        setSelectedCrypto(watchlistItems[0]);
        setNotes(watchlistItems[0].notes);
      }
      
      setIsLoading(false);
    }, 800);
  }, []);

  const toggleWatchlist = (id: number) => {
    const updatedData = cryptoData.map(crypto => 
      crypto.id === id 
        ? { ...crypto, inWatchlist: !crypto.inWatchlist } 
        : crypto
    );
    
    setCryptoData(updatedData);
    
    // Update watchlist
    setWatchlist(updatedData.filter(crypto => crypto.inWatchlist));
  };

  const handleSaveNotes = () => {
    if (!selectedCrypto) return;
    
    // Update notes in crypto data
    const updatedData = cryptoData.map(crypto => 
      crypto.id === selectedCrypto.id 
        ? { ...crypto, notes } 
        : crypto
    );
    
    setCryptoData(updatedData);
    
    // Update watchlist
    setWatchlist(updatedData.filter(crypto => crypto.inWatchlist));
    
    // Update selected crypto
    setSelectedCrypto({ ...selectedCrypto, notes });
    
    setIsEditing(false);
  };

  const handleDeleteSelected = () => {
    const updatedData = cryptoData.map(crypto => 
      selectedItems.includes(crypto.id) 
        ? { ...crypto, inWatchlist: false } 
        : crypto
    );
    
    setCryptoData(updatedData);
    setWatchlist(updatedData.filter(crypto => crypto.inWatchlist));
    setSelectedItems([]);
  };

  const filteredCryptos = cryptoData.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatNumber = (num: number, digits = 2) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(digits)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(digits)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(digits)}K`;
    } else {
      return `$${num.toFixed(digits)}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="bg-card py-12 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-6">Watchlist</h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Track your favorite cryptocurrencies, set price alerts, and keep notes to 
              stay informed about market movements and opportunities.
            </p>
          </div>
        </div>

        <section className="py-8 px-4">
          <div className="container mx-auto">
            <Tabs defaultValue="watchlist" className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                <TabsList>
                  <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
                  <TabsTrigger value="explore">Explore</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  {selectedItems.length > 0 ? (
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="gap-1"
                      onClick={handleDeleteSelected}
                    >
                      <Trash2 className="h-4 w-4" /> 
                      Remove ({selectedItems.length})
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="gap-1">
                      <Settings2 className="h-4 w-4" /> 
                      Settings
                    </Button>
                  )}
                </div>
              </div>
              
              <TabsContent value="watchlist">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Watchlist Table */}
                  <div className="lg:col-span-2 rounded-md border overflow-x-auto">
                    {isLoading ? (
                      <div className="flex justify-center items-center h-72">
                        <div className="animate-pulse-slow text-muted-foreground">
                          Loading watchlist...
                        </div>
                      </div>
                    ) : watchlist.length === 0 ? (
                      <div className="flex flex-col justify-center items-center h-72">
                        <Star className="h-16 w-16 text-muted-foreground/30 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Your watchlist is empty</h3>
                        <p className="text-muted-foreground mb-6">
                          Add cryptocurrencies to keep track of them
                        </p>
                        <Button>Explore Cryptocurrencies</Button>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">
                              <Checkbox 
                                checked={selectedItems.length === watchlist.length}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedItems(watchlist.map(crypto => crypto.id));
                                  } else {
                                    setSelectedItems([]);
                                  }
                                }}
                              />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">24h %</TableHead>
                            <TableHead className="text-right">Market Cap</TableHead>
                            <TableHead className="text-right">Alerts</TableHead>
                            <TableHead className="w-12"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {watchlist.map((crypto) => (
                            <TableRow 
                              key={crypto.id} 
                              className={cn(
                                "cursor-pointer",
                                selectedCrypto?.id === crypto.id ? "bg-muted" : ""
                              )}
                              onClick={() => {
                                setSelectedCrypto(crypto);
                                setNotes(crypto.notes);
                              }}
                            >
                              <TableCell className="pr-0" onClick={(e) => e.stopPropagation()}>
                                <Checkbox 
                                  checked={selectedItems.includes(crypto.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedItems([...selectedItems, crypto.id]);
                                    } else {
                                      setSelectedItems(selectedItems.filter(id => id !== crypto.id));
                                    }
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <img 
                                    src={crypto.logo} 
                                    alt={crypto.symbol}
                                    className="h-6 w-6 mr-2"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=" + crypto.symbol.charAt(0);
                                    }}
                                  />
                                  <div>
                                    <div className="font-medium">{crypto.name}</div>
                                    <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </TableCell>
                              <TableCell 
                                className={cn(
                                  "text-right font-medium",
                                  crypto.change24h >= 0 ? "text-crypto-green" : "text-crypto-red"
                                )}
                              >
                                {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h.toFixed(2)}%
                              </TableCell>
                              <TableCell className="text-right">
                                {formatNumber(crypto.marketCap)}
                              </TableCell>
                              <TableCell className="text-right">
                                {crypto.alertsSet ? (
                                  <div className="flex justify-end">
                                    <span className="inline-flex items-center bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 text-xs px-2 py-0.5 rounded">
                                      <AlertTriangle className="h-3 w-3 mr-1" />
                                      Set
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </TableCell>
                              <TableCell onClick={(e) => e.stopPropagation()}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => toggleWatchlist(crypto.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                  
                  {/* Crypto Details */}
                  <div>
                    {selectedCrypto ? (
                      <div className="space-y-6">
                        <PriceChart 
                          coinName={selectedCrypto.name} 
                          coinSymbol={selectedCrypto.symbol} 
                          initialTrend={selectedCrypto.change24h >= 0 ? "up" : "down"} 
                        />
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-semibold">24h Stats</h3>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">24h High</span>
                                <span className="font-medium">${selectedCrypto.high24h.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">24h Low</span>
                                <span className="font-medium">${selectedCrypto.low24h.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">24h Volume</span>
                                <span className="font-medium">{formatNumber(selectedCrypto.volume24h)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Market Cap</span>
                                <span className="font-medium">{formatNumber(selectedCrypto.marketCap)}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-semibold">Notes</h3>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => setIsEditing(!isEditing)}
                              >
                                {isEditing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                              </Button>
                            </div>
                            
                            {isEditing ? (
                              <div>
                                <textarea
                                  className="w-full p-2 rounded-md border min-h-[100px] bg-background text-sm"
                                  value={notes}
                                  onChange={(e) => setNotes(e.target.value)}
                                  placeholder="Add your notes about this cryptocurrency..."
                                />
                                <div className="flex justify-end mt-2">
                                  <Button 
                                    size="sm" 
                                    className="gap-1"
                                    onClick={handleSaveNotes}
                                  >
                                    <Save className="h-4 w-4" /> Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="min-h-[100px] text-sm">
                                {selectedCrypto.notes ? (
                                  <p>{selectedCrypto.notes}</p>
                                ) : (
                                  <p className="text-muted-foreground italic">No notes yet. Click the pencil icon to add notes.</p>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                        
                        <div className="flex justify-between">
                          <Button variant="outline" className="gap-1" asChild>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4" /> View Details
                            </a>
                          </Button>
                          <Button variant="outline" className="gap-1">
                            <AlertTriangle className="h-4 w-4" /> Set Alert
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center h-72 border rounded-lg">
                        <EyeOff className="h-12 w-12 text-muted-foreground/30 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No selection</h3>
                        <p className="text-muted-foreground text-center">
                          Select a cryptocurrency from your watchlist to see details
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="explore">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="relative flex-grow">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search cryptocurrencies..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">24h %</TableHead>
                          <TableHead className="text-right">Market Cap</TableHead>
                          <TableHead className="text-right">Volume (24h)</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          Array(5).fill(0).map((_, index) => (
                            <TableRow key={index}>
                              <TableCell colSpan={6}>
                                <div className="h-10 bg-muted/50 rounded animate-pulse-slow"></div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : filteredCryptos.map((crypto) => (
                          <TableRow key={crypto.id}>
                            <TableCell>
                              <div className="flex items-center">
                                <img 
                                  src={crypto.logo} 
                                  alt={crypto.symbol}
                                  className="h-6 w-6 mr-2"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=" + crypto.symbol.charAt(0);
                                  }}
                                />
                                <div>
                                  <div className="font-medium">{crypto.name}</div>
                                  <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell 
                              className={cn(
                                "text-right font-medium",
                                crypto.change24h >= 0 ? "text-crypto-green" : "text-crypto-red"
                              )}
                            >
                              {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h.toFixed(2)}%
                            </TableCell>
                            <TableCell className="text-right">
                              {formatNumber(crypto.marketCap)}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatNumber(crypto.volume24h)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                  "h-8 w-8 p-0",
                                  crypto.inWatchlist && "text-yellow-500"
                                )}
                                onClick={() => toggleWatchlist(crypto.id)}
                              >
                                <Star className={cn("h-4 w-4", crypto.inWatchlist && "fill-yellow-500")} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Create Watchlist */}
        <section className="py-12 px-4 bg-card border-t">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Create Your Custom Watchlists</h2>
              <p className="text-muted-foreground mb-8">
                Organize your portfolio with multiple watchlists for different investment strategies or asset classes.
                Set up alerts to never miss important price movements.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-primary/10 border-dashed border-2 border-primary/50 hover:border-primary transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-48">
                    <Plus className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-semibold text-center">Create New Watchlist</h3>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex flex-col justify-between p-6 h-48">
                    <div>
                      <h3 className="font-semibold mb-2">DeFi Portfolio</h3>
                      <p className="text-xs text-muted-foreground">6 assets</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Last updated: Today</span>
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex flex-col justify-between p-6 h-48">
                    <div>
                      <h3 className="font-semibold mb-2">NFT Tokens</h3>
                      <p className="text-xs text-muted-foreground">4 assets</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Last updated: Yesterday</span>
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Watchlist;
