
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MeetingCalendar from '@/components/MeetingCalendar';
import { useUser } from '@/components/UserProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import { Globe, Download, AlertCircle } from 'lucide-react';

const Meetings = () => {
  const { isAdmin } = useUser();
  const isMobile = useIsMobile();
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [showWebsite, setShowWebsite] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteUrl(e.target.value);
  };

  const viewWebsite = () => {
    if (websiteUrl) {
      setShowWebsite(true);
    }
  };

  const closeWebsite = () => {
    setShowWebsite(false);
  };

  // Function to ensure URL has proper protocol
  const formatUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Meeting Scheduler</h1>
        
        <div className="flex space-x-2">
          <a 
            href="https://play.google.com/store" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center h-10 px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            <span className={isMobile ? "hidden" : "inline"}>Play Store</span>
          </a>
          
          <a 
            href="https://apps.apple.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center h-10 px-3 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-900 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            <span className={isMobile ? "hidden" : "inline"}>App Store</span>
          </a>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList className="w-full md:w-auto flex">
          <TabsTrigger value="calendar" className="flex-1 md:flex-none">Calendar View</TabsTrigger>
          <TabsTrigger value="list" className="flex-1 md:flex-none">List View</TabsTrigger>
          <TabsTrigger value="website" className="flex-1 md:flex-none">Website Decoder</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin" className="flex-1 md:flex-none">Admin Controls</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-4">
          <MeetingCalendar />
        </TabsContent>
        
        <TabsContent value="list">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="text-center py-8 md:py-10">
                <h3 className="text-lg font-medium mb-2">List View</h3>
                <p className="text-muted-foreground">
                  This feature is coming soon. Check back later for a comprehensive list view of meetings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="website">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Website Decoder</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-2">
                <Input 
                  type="url" 
                  placeholder="Enter website URL (e.g., https://example.com)" 
                  value={websiteUrl} 
                  onChange={handleUrlChange} 
                  className="flex-1"
                />
                <Button onClick={viewWebsite} disabled={!websiteUrl}>
                  <Globe className="h-4 w-4 mr-2" />
                  View Website
                </Button>
              </div>
              
              {showWebsite ? (
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Button variant="destructive" size="sm" onClick={closeWebsite}>
                      Close
                    </Button>
                  </div>
                  <div className="w-full bg-white rounded-md overflow-hidden border border-gray-200 relative">
                    <iframe 
                      src={formatUrl(websiteUrl)} 
                      title="Website Preview"
                      className="w-full h-[70vh]"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-md border border-dashed border-gray-300 dark:border-gray-700">
                  <div className="text-center space-y-2">
                    <Globe className="h-8 w-8 mx-auto text-gray-400" />
                    <h3 className="text-sm font-medium">Enter a URL to decode and view a website</h3>
                    <p className="text-xs text-muted-foreground">
                      The website will be displayed here in a secure iframe
                    </p>
                  </div>
                </div>
              )}
              
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <strong>Note:</strong> Some websites may block being displayed in an iframe due to security policies. If a website doesn't appear, try opening it directly in a new tab.
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-center sm:text-left">
                  <h3 className="font-medium text-blue-700 dark:text-blue-300">Mobile App Download</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Get our mobile app for a better experience on the go</p>
                </div>
                <div className="flex gap-2 justify-center sm:justify-end">
                  <a 
                    href="https://play.google.com/store" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Play Store
                  </a>
                  
                  <a 
                    href="https://apps.apple.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-900 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    App Store
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {isAdmin && (
          <TabsContent value="admin">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="text-center py-8 md:py-10">
                  <h3 className="text-lg font-medium mb-2">Admin Controls</h3>
                  <p className="text-muted-foreground">
                    As an admin, you'll soon be able to create meeting templates, set team availability, and manage meeting resources.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Meetings;
