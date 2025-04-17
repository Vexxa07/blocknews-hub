import React, { useState } from 'react';
import { Newspaper } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const Alerts = () => {
  const [email, setEmail] = useState("");
  const [isEmailAlertEnabled, setIsEmailAlertEnabled] = useState(false);
  const [isSMSAlertEnabled, setIsSMSAlertEnabled] = useState(false);
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const toggleEmailAlert = () => {
    setIsEmailAlertEnabled(!isEmailAlertEnabled);
  };

  const toggleSMSAlert = () => {
    setIsSMSAlertEnabled(!isSMSAlertEnabled);
  };

  const saveAlertSettings = () => {
    toast({
      title: "Alert settings saved!",
      description: "Your alert preferences have been successfully updated.",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="email" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="email">Email Alerts</TabsTrigger>
          <TabsTrigger value="sms">SMS Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Alerts</CardTitle>
              <CardDescription>
                Receive alerts directly to your email.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex items-center justify-between rounded-md border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Enable Email Alerts
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Get instant email notifications.
                  </p>
                </div>
                <Switch id="email-alerts" checked={isEmailAlertEnabled} onCheckedChange={toggleEmailAlert} />
              </div>
              <Button onClick={saveAlertSettings}>Save settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle>SMS Alerts</CardTitle>
              <CardDescription>
                Get important updates via SMS.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input type="tel" id="phone" placeholder="Enter your phone number" />
              </div>
              <div className="flex items-center justify-between rounded-md border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Enable SMS Alerts
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Receive critical alerts on your phone.
                  </p>
                </div>
                <Switch id="sms-alerts" checked={isSMSAlertEnabled} onCheckedChange={toggleSMSAlert} />
              </div>
              <Button onClick={saveAlertSettings}>Save settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Card className="w-[400px] mt-6">
        <CardHeader>
          <CardTitle>Latest News</CardTitle>
          <CardDescription>
            Stay updated with the latest market news.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Newspaper className="h-8 w-8 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Breaking: Market Surge</p>
              <Badge variant="secondary">New</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;
