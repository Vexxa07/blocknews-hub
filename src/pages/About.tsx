
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Newspaper, LineChart, Database, Shield, 
  Clock, Award, Users, MessageSquare
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="bg-card py-16 px-4 border-b">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About BlockNews Hub</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your comprehensive source for blockchain news, market analysis, and investment insights.
              We're dedicated to providing accurate, timely, and actionable information for crypto investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Our Services</Button>
              <Button variant="outline" size="lg">Contact Us</Button>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  BlockNews Hub was founded with a clear mission: to demystify the complex world of 
                  blockchain technology and cryptocurrency investments through reliable reporting, 
                  data-driven analysis, and accessible educational resources.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We believe that informed investors make better decisions. That's why we're committed 
                  to providing timely news, in-depth research, and powerful analytical tools that empower 
                  our users to navigate the volatile crypto markets with confidence.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our team of experts works around the clock to monitor market movements, analyze trends, 
                  and deliver insights that help you stay ahead in the fast-evolving world of digital assets.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-primary/10 rounded-lg p-8 relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 rounded-full" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Our Core Values</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Accuracy & Integrity</h4>
                          <p className="text-muted-foreground">We verify information and maintain journalistic standards</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Timeliness</h4>
                          <p className="text-muted-foreground">Delivering news and analysis when it matters most</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Excellence</h4>
                          <p className="text-muted-foreground">Continuous improvement in our content and tools</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-16 px-4 bg-card border-t">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Services</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                BlockNews Hub provides a comprehensive suite of tools and resources designed to 
                keep you informed and help you make data-driven investment decisions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <Newspaper className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Blockchain News</h3>
                  <p className="text-muted-foreground">
                    Breaking news and in-depth coverage of the most important events in the blockchain and cryptocurrency space.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <LineChart className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Market Analysis</h3>
                  <p className="text-muted-foreground">
                    Technical and fundamental analysis to help you understand market trends and identify trading opportunities.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <Database className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Research Reports</h3>
                  <p className="text-muted-foreground">
                    Comprehensive reports on blockchain projects, market segments, and emerging trends in the industry.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Price Alerts</h3>
                  <p className="text-muted-foreground">
                    Customizable alerts to notify you of significant price movements and market opportunities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Meet the experts behind BlockNews Hub, a diverse team of blockchain specialists, 
                market analysts, and tech enthusiasts dedicated to bringing you the best crypto insights.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">James Wilson</h3>
                <p className="text-primary">Founder & CEO</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Blockchain expert with 10+ years in fintech and cryptocurrency markets.
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">Sarah Chen</h3>
                <p className="text-primary">Chief Research Officer</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Former Wall Street analyst specializing in emerging technologies and digital assets.
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">Michael Rodriguez</h3>
                <p className="text-primary">Technical Analyst</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Crypto trader and technical analyst with expertise in market patterns and indicators.
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">Emily Johnson</h3>
                <p className="text-primary">Head of Content</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Technology journalist with a focus on blockchain innovation and cryptocurrency markets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-card border-t">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                See how BlockNews Hub has helped investors and enthusiasts stay informed and make better decisions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-background">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "BlockNews Hub has been instrumental in my cryptocurrency investment journey. 
                    The real-time alerts and in-depth analysis have helped me make informed decisions 
                    in this volatile market."
                  </p>
                  <div className="flex items-center">
                    <div className="rounded-full overflow-hidden w-10 h-10 mr-3">
                      <img 
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Robert T.</h4>
                      <p className="text-xs text-muted-foreground">Crypto Investor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-background">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "The research reports from BlockNews Hub provide deep insights that I haven't 
                    found anywhere else. Their analysis on emerging blockchain technologies has 
                    given me an edge in identifying promising projects early."
                  </p>
                  <div className="flex items-center">
                    <div className="rounded-full overflow-hidden w-10 h-10 mr-3">
                      <img 
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Jessica K.</h4>
                      <p className="text-xs text-muted-foreground">Blockchain Developer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-background">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "As a financial advisor, I need reliable sources of information for my clients 
                    interested in crypto investments. BlockNews Hub has become my go-to resource for 
                    accurate market data and insightful analysis."
                  </p>
                  <div className="flex items-center">
                    <div className="rounded-full overflow-hidden w-10 h-10 mr-3">
                      <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Daniel M.</h4>
                      <p className="text-xs text-muted-foreground">Financial Advisor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions, feedback, or need assistance? Our team is here to help.
                  Get in touch with us through any of the following channels.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">General Inquiries</h4>
                      <p className="text-muted-foreground">info@blocknewshub.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Media Relations</h4>
                      <p className="text-muted-foreground">media@blocknewshub.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Technical Support</h4>
                      <p className="text-muted-foreground">support@blocknewshub.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="font-semibold mb-4">Connect with Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-muted p-2 rounded-full hover:bg-primary/10 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="bg-muted p-2 rounded-full hover:bg-primary/10 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="bg-muted p-2 rounded-full hover:bg-primary/10 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="bg-muted p-2 rounded-full hover:bg-primary/10 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">First Name</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Last Name</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Subject</label>
                        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background">
                          <option>General Inquiry</option>
                          <option>Technical Support</option>
                          <option>Business Collaboration</option>
                          <option>Feedback</option>
                          <option>Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Message</label>
                        <textarea 
                          rows={5}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                        ></textarea>
                      </div>
                      
                      <Button className="w-full">Send Message</Button>
                    </form>
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

export default About;
