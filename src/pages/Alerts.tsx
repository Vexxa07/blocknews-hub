
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bell, ArrowDown, ArrowUp, Plus, Trash2, 
  Check, AlertTriangle, Trash, CheckCircle2, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

// Sample alerts data
const generateAlertsData = () => {
  return [
    {
      id: 1,
      crypto: {
        name: 'Bitcoin',
        symbol: 'BTC',
        logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
        currentPrice: 45678.32
      },
      type: 'price',
      condition: 'above',
      value: 48000,
      repeat: false,
      isActive: true,
      createdAt: '2025-04-15T10:30:00Z'
    },
    {
      id: 2,
      crypto: {
        name: 'Ethereum',
        symbol: 'ETH',
        logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
        currentPrice: 2456.78
      },
      type: 'price',
      condition: 'below',
      value: 2200,
      repeat: true,
      isActive: true,
      createdAt: '2025-04-14T15:45:00Z'
    },
    {
      id: 3,
      crypto: {
        name: 'Solana',
        symbol: 'SOL',
        logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
        currentPrice: 123.45
      },
      type: 'percentage',
      condition: 'change',
      value: 5,
      repeat: false,
      isActive: true,
      createdAt: '2025-04-13T09:15:00Z'
    },
    {
      id: 4,
      crypto: {
        name: 'Binance Coin',
        symbol: 'BNB',
        logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
        currentPrice: 345.67
      },
      type: 'price',
      condition: 'above',
      value: 360,
      repeat: true,
      isActive: false,
      createdAt: '2025-04-12T11:20:00Z'
    }
  ];
};

// Sample notifications
const generateNotifications = () => {
  return [
    {
      id: 1,
      type: 'alert',
      message: 'Bitcoin (BTC) price rose above $45,000',
      timestamp: '2025-04-16T09:30:00Z',
      read: false
    },
    {
      id: 2,
      type: 'alert',
      message: 'Ethereum (ETH) price dropped below $2,500',
      timestamp: '2025-04-16T07:15:00Z',
      read: true
    },
    {
      id: 3,
      type: 'news',
      message: 'SEC approves new spot Bitcoin ETF applications',
      timestamp: '2025-04-15T18:45:00Z',
      read: true
    },
    {
      id: 4,
      type: 'system',
      message: 'Your weekly market report is now available',
      timestamp: '2025-04-15T12:00:00Z',
      read: false
    },
    {
      id: 5,
      type: 'alert',
      message: 'Solana (SOL) price changed by +7% in the last 24h',
      timestamp: '2025-04-14T22:10:00Z',
      read: true
    }
  ];
};

// List of cryptocurrencies for the new alert form
const cryptoOptions = [
  { name: 'Bitcoin', symbol: 'BTC', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg', price: 45678.32 },
  { name: 'Ethereum', symbol: 'ETH', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg', price: 2456.78 },
  { name: 'Binance Coin', symbol: 'BNB', logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg', price: 345.67 },
  { name: 'Solana', symbol: 'SOL', logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg', price: 123.45 },
  { name: 'Cardano', symbol: 'ADA', logo: 'https://cryptologos.cc/logos/cardano-ada-logo.svg', price: 0.54 },
  { name: 'XRP', symbol: 'XRP', logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg', price: 0.67 },
];

const Alerts = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('current');
  
  // New alert form state
  const [showNewAlertForm, setShowNewAlertForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    crypto: cryptoOptions[0],
    type: 'price',
    condition: 'above',
    value: '',
    repeat: false
  });
  
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setAlerts(generateAlertsData());
      setNotifications(generateNotifications());
      setIsLoading(false);
    }, 800);
  }, []);
  
  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert deleted",
      description: "Your alert has been successfully removed."
    });
  };
  
  const handleToggleAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };
  
  const handleDeleteAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "Notifications cleared",
      description: "All notifications have been removed."
    });
  };
  
  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  const handleCreateAlert = () => {
    // Validate form
    if (!newAlert.value) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Please enter a valid alert value."
      });
      return;
    }
    
    // Create new alert
    const newAlertItem = {
      id: alerts.length + 1,
      crypto: newAlert.crypto,
      type: newAlert.type,
      condition: newAlert.condition,
      value: Number(newAlert.value),
      repeat: newAlert.repeat,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    setAlerts([newAlertItem, ...alerts]);
    setShowNewAlertForm(false);
    setNewAlert({
      crypto: cryptoOptions[0],
      type: 'price',
      condition: 'above',
      value: '',
      repeat: false
    });
    
    toast({
      title: "Alert created",
      description: `New alert for ${newAlertItem.crypto.symbol} has been created.`
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="bg-card py-12 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-6">Price Alerts & Notifications</h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Set up alerts to get notified when cryptocurrencies reach specific price targets
              or experience significant price movements.
            </p>
          </div>
        </div>

        <section className="py-8 px-4">
          <div className="container mx-auto">
            <Tabs defaultValue="current" onValueChange={setActiveTab}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                <TabsList>
                  <TabsTrigger value="current">
                    <Bell className="h-4 w-4 mr-2" /> 
                    Your Alerts
                  </TabsTrigger>
                  <TabsTrigger value="notifications">
                    <div className="relative">
                      <AlertTriangle className="h-4 w-4 mr-2" /> 
                      Notifications
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  {activeTab === 'current' ? (
                    <Button 
                      className="gap-1" 
                      onClick={() => setShowNewAlertForm(!showNewAlertForm)}
                    >
                      <Plus className="h-4 w-4" /> 
                      New Alert
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={handleMarkAllAsRead}
                        disabled={unreadCount === 0}
                      >
                        <Check className="h-4 w-4" /> 
                        Mark All Read
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={handleDeleteAllNotifications}
                        disabled={notifications.length === 0}
                      >
                        <Trash className="h-4 w-4" /> 
                        Clear All
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              {/* New Alert Form */}
              {showNewAlertForm && (
                <Card className="mb-6 animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Create New Alert</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => setShowNewAlertForm(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Cryptocurrency</label>
                          <select 
                            className="w-full p-2 rounded-md border bg-background"
                            value={newAlert.crypto.symbol}
                            onChange={(e) => {
                              const selected = cryptoOptions.find(c => c.symbol === e.target.value);
                              if (selected) {
                                setNewAlert({ ...newAlert, crypto: selected });
                              }
                            }}
                          >
                            {cryptoOptions.map(crypto => (
                              <option key={crypto.symbol} value={crypto.symbol}>
                                {crypto.name} ({crypto.symbol})
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Alert Type</label>
                          <select 
                            className="w-full p-2 rounded-md border bg-background"
                            value={newAlert.type}
                            onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
                          >
                            <option value="price">Price Alert</option>
                            <option value="percentage">Percentage Change</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Condition</label>
                          <select 
                            className="w-full p-2 rounded-md border bg-background"
                            value={newAlert.condition}
                            onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
                          >
                            {newAlert.type === 'price' ? (
                              <>
                                <option value="above">Price above</option>
                                <option value="below">Price below</option>
                              </>
                            ) : (
                              <option value="change">% Change in 24h</option>
                            )}
                          </select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">
                            {newAlert.type === 'price' ? 'Price Value' : 'Percentage Value'}
                          </label>
                          <div className="relative">
                            <span className="absolute left-2 top-2">
                              {newAlert.type === 'price' ? '$' : ''}
                            </span>
                            <input
                              type="number"
                              className="w-full p-2 pl-6 rounded-md border bg-background"
                              placeholder={newAlert.type === 'price' ? '0.00' : '0'}
                              value={newAlert.value}
                              onChange={(e) => setNewAlert({ ...newAlert, value: e.target.value })}
                            />
                            {newAlert.type === 'percentage' && (
                              <span className="absolute right-2 top-2">%</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={newAlert.repeat}
                            onCheckedChange={(checked) => setNewAlert({ ...newAlert, repeat: checked })}
                          />
                          <label className="text-sm font-medium">Repeat alert</label>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 md:border-t-0 md:border-l md:pl-6 md:pt-0">
                        <h4 className="font-medium mb-3">Alert Summary</h4>
                        <div className="flex items-center mb-4">
                          <img 
                            src={newAlert.crypto.logo} 
                            alt={newAlert.crypto.symbol}
                            className="h-8 w-8 mr-2"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/32x32?text=" + newAlert.crypto.symbol.charAt(0);
                            }}
                          />
                          <div>
                            <div className="font-medium">{newAlert.crypto.name}</div>
                            <div className="text-xs text-muted-foreground">{newAlert.crypto.symbol}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm mb-6">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Current Price</span>
                            <span className="font-medium">${newAlert.crypto.price.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Alert Type</span>
                            <span className="font-medium capitalize">{newAlert.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Condition</span>
                            <span className="font-medium capitalize">{newAlert.condition}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Value</span>
                            <span className="font-medium">
                              {newAlert.type === 'price' ? '$' : ''}{newAlert.value || '0'}
                              {newAlert.type === 'percentage' ? '%' : ''}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Repeat</span>
                            <span className="font-medium">{newAlert.repeat ? 'Yes' : 'No'}</span>
                          </div>
                        </div>
                        
                        <Button className="w-full" onClick={handleCreateAlert}>
                          Create Alert
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <TabsContent value="current">
                {isLoading ? (
                  <div className="py-12 text-center">
                    <div className="animate-pulse-slow text-muted-foreground">
                      Loading alerts...
                    </div>
                  </div>
                ) : alerts.length === 0 ? (
                  <div className="py-16 text-center border rounded-lg">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No alerts yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Create price alerts to get notified when cryptocurrencies reach your target prices
                    </p>
                    <Button onClick={() => setShowNewAlertForm(true)}>
                      Create Your First Alert
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <Card key={alert.id} className={cn(
                        "hover:border-primary/50 transition-all duration-200",
                        !alert.isActive && "opacity-60"
                      )}>
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div className="flex items-center">
                              <img 
                                src={alert.crypto.logo} 
                                alt={alert.crypto.symbol}
                                className="h-10 w-10 mr-3"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://placehold.co/40x40?text=" + alert.crypto.symbol.charAt(0);
                                }}
                              />
                              <div>
                                <div className="flex items-center">
                                  <h3 className="font-semibold">{alert.crypto.name}</h3>
                                  <span className="text-xs text-muted-foreground ml-2">
                                    ({alert.crypto.symbol})
                                  </span>
                                  {alert.type === 'percentage' && (
                                    <Badge variant="outline" className="ml-2">
                                      % Change
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm flex items-center mt-1">
                                  <span>Alert when price is </span>
                                  {alert.condition === 'above' ? (
                                    <span className="text-crypto-green flex items-center mx-1">
                                      <ArrowUp className="h-3 w-3 mr-0.5" /> above
                                    </span>
                                  ) : alert.condition === 'below' ? (
                                    <span className="text-crypto-red flex items-center mx-1">
                                      <ArrowDown className="h-3 w-3 mr-0.5" /> below
                                    </span>
                                  ) : (
                                    <span className="mx-1">changes by</span>
                                  )}
                                  <span className="font-medium">
                                    {alert.type === 'price' && '$'}
                                    {alert.value.toLocaleString()}
                                    {alert.type === 'percentage' && '%'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                              <div className="text-xs text-muted-foreground text-right">
                                <div>Created {formatDate(alert.createdAt)}</div>
                                <div className="mt-1">
                                  {alert.repeat ? 'Repeating alert' : 'One-time alert'}
                                </div>
                              </div>
                              
                              <Separator orientation="vertical" className="hidden sm:block h-10" />
                              
                              <div className="flex items-center gap-2 sm:flex-col">
                                <div className="flex items-center">
                                  <Switch 
                                    checked={alert.isActive}
                                    onCheckedChange={() => handleToggleAlert(alert.id)}
                                  />
                                  <span className="ml-2 text-sm">
                                    {alert.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleDeleteAlert(alert.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="notifications">
                {isLoading ? (
                  <div className="py-12 text-center">
                    <div className="animate-pulse-slow text-muted-foreground">
                      Loading notifications...
                    </div>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="py-16 text-center border rounded-lg">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      You don't have any notifications at the moment
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={cn(
                          "p-4 border rounded-lg flex justify-between items-center",
                          notification.read ? "bg-background" : "bg-primary/5"
                        )}
                      >
                        <div className="flex items-center">
                          <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center mr-3",
                            notification.type === 'alert' 
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                              : notification.type === 'news'
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                          )}>
                            {notification.type === 'alert' ? (
                              <AlertTriangle className="h-5 w-5" />
                            ) : notification.type === 'news' ? (
                              <Newspaper className="h-5 w-5" />
                            ) : (
                              <Bell className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{notification.message}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(notification.timestamp)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleDeleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Alert Settings */}
        <section className="py-12 px-4 bg-card border-t">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Alert Settings</h2>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Price Alerts</div>
                          <div className="text-sm text-muted-foreground">
                            Notify when cryptocurrencies reach your target prices
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">News Alerts</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications for important crypto news
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Market Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Daily summaries of market conditions
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Email Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Receive alerts via email in addition to on-site notifications
                          </div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-4">Notification Channels</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Email Address for Alerts
                        </label>
                        <Input 
                          type="email" 
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Mobile Number for SMS Alerts (Premium Feature)
                        </label>
                        <div className="relative">
                          <Input 
                            type="tel" 
                            placeholder="+1 (555) 123-4567" 
                            disabled
                          />
                          <span className="absolute right-2 top-2 text-xs bg-muted px-2 py-0.5 rounded">
                            Premium
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button>Save Preferences</Button>
                    </div>
                  </div>
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

export default Alerts;
