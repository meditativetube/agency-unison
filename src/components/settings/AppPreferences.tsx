
import React, { useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from '@/hooks/use-toast';
import { Language, Moon, DollarSign, Clock } from 'lucide-react';

const AppPreferences = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [language, setLanguage] = useState('en-US');
  const [currency, setCurrency] = useState('USD');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [timeFormat, setTimeFormat] = useState('12h');

  const handleSavePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your app preferences have been updated successfully.",
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>App Preferences</CardTitle>
        <CardDescription>
          Customize your app experience with personalized settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Language className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium">Language</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Display Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="en-GB">English (UK)</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-medium">Theme</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Color Theme</Label>
              <div className="flex items-center gap-4">
                <Button 
                  onClick={toggleTheme} 
                  variant="outline"
                  className="w-full justify-start"
                >
                  {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </Button>
                <div className="h-10 w-10 rounded-md border flex items-center justify-center">
                  <div className={`h-6 w-6 rounded-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-yellow-400'}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium">Currency</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Display Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                  <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                  <SelectItem value="CAD">Canadian Dollar (CA$)</SelectItem>
                  <SelectItem value="AUD">Australian Dollar (A$)</SelectItem>
                  <SelectItem value="CNY">Chinese Yuan (¥)</SelectItem>
                  <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-medium">Date & Time Format</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger id="date-format">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  <SelectItem value="DD.MM.YYYY">DD.MM.YYYY</SelectItem>
                  <SelectItem value="DD MMM YYYY">DD MMM YYYY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time-format">Time Format</Label>
              <Select value={timeFormat} onValueChange={setTimeFormat}>
                <SelectTrigger id="time-format">
                  <SelectValue placeholder="Select time format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour (01:30 PM)</SelectItem>
                  <SelectItem value="24h">24-hour (13:30)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Button onClick={handleSavePreferences} className="mt-4">
          Save Preferences
        </Button>
      </CardContent>
    </>
  );
};

export default AppPreferences;
