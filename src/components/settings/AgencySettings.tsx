
import React, { useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; 
import { useToast } from '@/hooks/use-toast';
import { Building, Upload, MapPin } from 'lucide-react';

const AgencySettings = () => {
  const { toast } = useToast();
  const [agencyName, setAgencyName] = useState('AgencyUnison');
  const [address, setAddress] = useState('123 Agency St, Business District');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [email, setEmail] = useState('contact@agencyunison.com');
  const [workingHours, setWorkingHours] = useState('Monday-Friday, 9:00 AM - 5:00 PM');

  const handleSaveAgencyInfo = () => {
    toast({
      title: "Agency settings updated",
      description: "Your agency information has been updated successfully.",
    });
  };

  const handleLogoUpload = () => {
    toast({
      title: "Logo uploaded",
      description: "Your agency logo has been updated successfully.",
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Agency Settings</CardTitle>
        <CardDescription>
          Configure your agency details and branding
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Agency Details</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agency-name">Agency Name</Label>
              <Input 
                id="agency-name" 
                value={agencyName} 
                onChange={(e) => setAgencyName(e.target.value)} 
                placeholder="Your Agency Name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="agency-address">Agency Address</Label>
              <Textarea 
                id="agency-address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="Full address"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agency-phone">Contact Phone</Label>
                <Input 
                  id="agency-phone" 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="agency-email">Contact Email</Label>
                <Input 
                  id="agency-email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="contact@youragency.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="working-hours">Working Hours</Label>
              <Input 
                id="working-hours" 
                value={workingHours} 
                onChange={(e) => setWorkingHours(e.target.value)} 
                placeholder="e.g., Monday-Friday, 9:00 AM - 5:00 PM"
              />
            </div>
          </div>
          
          <Button onClick={handleSaveAgencyInfo} className="mt-2">
            Save Agency Details
          </Button>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium">Agency Logo</h3>
          
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden rounded-md">
              <Building className="h-12 w-12 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <Button onClick={handleLogoUpload} variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                <span>Upload New Logo</span>
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                JPG, PNG or SVG. Recommended size 512x512px.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default AgencySettings;
