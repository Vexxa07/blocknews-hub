
import { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Star, Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample crypto market data
const generateMarketData = () => {
  const cryptos = [
    { name: 'Bitcoin', symbol: 'BTC', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg' },
    { name: 'Ethereum', symbol: 'ETH', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg' },
    { name: 'Binance Coin', symbol: 'BNB', logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg' },
    { name: 'Solana', symbol: 'SOL', logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg' },
    { name: 'Cardano', symbol: 'ADA', logo: 'https://cryptologos.cc/logos/cardano-ada-logo.svg' },
    { name: 'XRP', symbol: 'XRP', logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg' },
    { name: 'Polkadot', symbol: 'DOT', logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg' },
    { name: 'Dogecoin', symbol: 'DOGE', logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg' },
    { name: 'Avalanche', symbol: 'AVAX', logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg' },
    { name: 'Chainlink', symbol: 'LINK', logo: 'https://cryptologos.cc/logos/chainlink-link-logo.svg' },
  ];

  return cryptos.map((crypto, index) => {
    const price = index === 0 ? 40000 + (Math.random() * 5000)
              : index === 1 ? 2000 + (Math.random() * 500)
              : Math.random() * 300;
    
    const change24h = Math.random() > 0.5
      ? Math.random() * 15  // positive
      : -Math.random() * 15; // negative
    
    const change7d = Math.random() > 0.5
      ? Math.random() * 25  // positive
      : -Math.random() * 25; // negative
    
    return {
      id: index + 1,
      name: crypto.name,
      symbol: crypto.symbol,
      logo: crypto.logo,
      price: price,
      change24h: change24h,
      change7d: change7d,
      marketCap: price * (10000000 + Math.random() * 50000000000),
      volume24h: price * (1000000 + Math.random() * 5000000000),
      circulatingSupply: (10000000 + Math.random() * 1000000000),
      favorite: false,
    };
  });
};

interface MarketOverviewProps {
  limit?: number;
  showSearch?: boolean;
  showPagination?: boolean;
}

const MarketOverview = ({ 
  limit, 
  showSearch = true,
  showPagination = true
}: MarketOverviewProps) => {
  const [marketData, setMarketData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: 'marketCap', direction: 'desc' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      const data = generateMarketData();
      setMarketData(data);
      setFilteredData(data);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Filter based on search
    if (searchTerm.trim() === '') {
      setFilteredData(marketData);
    } else {
      const filtered = marketData.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, marketData]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
      direction = key === 'name' ? 'asc' : 'desc';
    }
    
    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    setSortConfig({ key, direction });
    setFilteredData(sorted);
  };

  const toggleFavorite = (id: number) => {
    setMarketData(prevData => 
      prevData.map(item => 
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
    
    setFilteredData(prevData => 
      prevData.map(item => 
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  // Display limited items if limit prop is provided
  const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

  // Format large numbers
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
    <div className="space-y-4 animate-fade-in">
      {showSearch && (
        <div className="flex items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search cryptocurrency..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead className="w-10">#</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('name')}
                  className="flex items-center font-medium"
                >
                  Name
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('price')}
                  className="flex items-center font-medium"
                >
                  Price
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('change24h')}
                  className="flex items-center font-medium"
                >
                  24h %
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('change7d')}
                  className="flex items-center font-medium"
                >
                  7d %
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('marketCap')}
                  className="flex items-center font-medium"
                >
                  Market Cap
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('volume24h')}
                  className="flex items-center font-medium"
                >
                  Volume (24h)
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, index) => (
                <TableRow key={index}>
                  {Array(7).fill(0).map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <div className="h-6 bg-muted/50 rounded animate-pulse-slow"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : displayedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              displayedData.map((coin) => (
                <TableRow key={coin.id} className="hover:bg-muted/50 cursor-pointer">
                  <TableCell className="pr-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(coin.id);
                      }}
                    >
                      <Star
                        className={cn(
                          "h-4 w-4",
                          coin.favorite ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                        )}
                      />
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{coin.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <img 
                        src={coin.logo} 
                        alt={coin.symbol}
                        className="h-5 w-5 mr-2"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/20x20?text=" + coin.symbol.charAt(0);
                        }}
                      />
                      <div>
                        <span className="font-medium">{coin.name}</span>
                        <span className="text-xs text-muted-foreground ml-1">{coin.symbol}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "font-medium",
                      coin.change24h >= 0 ? "text-crypto-green" : "text-crypto-red"
                    )}
                  >
                    {coin.change24h >= 0 ? "+" : ""}{coin.change24h.toFixed(2)}%
                  </TableCell>
                  <TableCell
                    className={cn(
                      "font-medium",
                      coin.change7d >= 0 ? "text-crypto-green" : "text-crypto-red"
                    )}
                  >
                    {coin.change7d >= 0 ? "+" : ""}{coin.change7d.toFixed(2)}%
                  </TableCell>
                  <TableCell>{formatNumber(coin.marketCap)}</TableCell>
                  <TableCell>{formatNumber(coin.volume24h)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {showPagination && !isLoading && filteredData.length > 0 && (
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-muted-foreground">
            Showing {displayedData.length} of {filteredData.length} results
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketOverview;
