
import { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample data - in a real app, this would come from an API
const generateChartData = (days: number, trend: 'up' | 'down' | 'volatile') => {
  const data = [];
  let baseValue = 40000 + Math.random() * 5000;
  
  for (let i = 0; i < days; i++) {
    let change;
    
    if (trend === 'up') {
      change = (Math.random() * 200) - 50; // More likely to go up
    } else if (trend === 'down') {
      change = (Math.random() * 200) - 150; // More likely to go down
    } else {
      change = (Math.random() * 400) - 200; // Volatile, equal chance up or down
    }
    
    baseValue += change;
    if (baseValue < 30000) baseValue = 30000; // Set a floor
    if (baseValue > 50000) baseValue = 50000; // Set a ceiling
    
    data.push({
      date: new Date(Date.now() - (days - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Math.round(baseValue),
      volume: Math.round(Math.random() * 10000 + 5000),
    });
  }
  
  return data;
};

interface PriceChartProps {
  coinName: string;
  coinSymbol: string;
  initialTrend?: 'up' | 'down' | 'volatile';
}

const PriceChart = ({ 
  coinName, 
  coinSymbol, 
  initialTrend = 'up' 
}: PriceChartProps) => {
  const [timeFrame, setTimeFrame] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [trend, setTrend] = useState<'up' | 'down' | 'volatile'>(initialTrend);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      let days;
      switch (timeFrame) {
        case '1D': days = 24; break; // Hourly for 1 day
        case '1W': days = 7; break;
        case '1M': days = 30; break;
        case '3M': days = 90; break;
        case '1Y': days = 365; break;
        default: days = 30;
      }
      
      const data = generateChartData(days, trend);
      setChartData(data);
      
      // Set current price and change
      if (data.length > 1) {
        const current = data[data.length - 1].price;
        const previous = data[data.length - 2].price;
        setCurrentPrice(current);
        setPriceChange(((current - previous) / previous) * 100);
      }
      
      setIsLoading(false);
    }, 500);
  }, [timeFrame, trend]);

  // Function to simulate changing trends when user interacts
  const changeTrend = () => {
    const trends: ('up' | 'down' | 'volatile')[] = ['up', 'down', 'volatile'];
    const currentIndex = trends.indexOf(trend);
    const nextIndex = (currentIndex + 1) % trends.length;
    setTrend(trends[nextIndex]);
  };

  return (
    <div className="bg-card rounded-lg p-4 border shadow-sm animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div onClick={changeTrend} className="cursor-pointer">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {coinName} <span className="text-muted-foreground">({coinSymbol})</span>
          </h3>
          {!isLoading && (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">${currentPrice.toLocaleString()}</span>
              <span 
                className={cn(
                  "flex items-center text-sm",
                  priceChange >= 0 ? "text-crypto-green" : "text-crypto-red"
                )}
              >
                {priceChange >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                {Math.abs(priceChange).toFixed(2)}%
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          {(['1D', '1W', '1M', '3M', '1Y'] as const).map((time) => (
            <Button
              key={time}
              variant={timeFrame === time ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeFrame(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="animate-pulse-slow text-muted-foreground">Loading chart data...</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={priceChange >= 0 ? "#4caf50" : "#ff4d4d"} 
                    stopOpacity={0.8}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={priceChange >= 0 ? "#4caf50" : "#ff4d4d"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }} 
              />
              <YAxis 
                domain={['dataMin - 500', 'dataMax + 500']} 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.375rem' 
                }}
                labelStyle={{ fontWeight: 'bold' }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Price']}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={priceChange >= 0 ? "#4caf50" : "#ff4d4d"} 
                fillOpacity={0.2}
                fill="url(#colorPrice)" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        <div className="flex justify-between items-center">
          <span>24h Volume: ${Math.round(Math.random() * 1000000000).toLocaleString()}</span>
          <span>Market Cap: ${Math.round(Math.random() * 100000000000).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
