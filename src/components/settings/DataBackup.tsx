
import React, { useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { FileText, Upload, Save, Database } from 'lucide-react';

const DataBackup = () => {
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState('csv');
  const [backupName, setBackupName] = useState('');
  const [selectedBackup, setSelectedBackup] = useState('');
  const [importFile, setImportFile] = useState<File | null>(null);
  
  const backups = [
    { id: '1', name: 'Weekly Backup', date: 'May 21, 2023', size: '2.3 MB' },
    { id: '2', name: 'Monthly Backup', date: 'May 1, 2023', size: '3.5 MB' },
    { id: '3', name: 'Quarterly Backup', date: 'April 1, 2023', size: '5.2 MB' },
  ];

  const handleExportData = () => {
    toast({
      title: "Data export started",
      description: `Your data is being exported in ${exportFormat.toUpperCase()} format.`,
    });
  };

  const handleImportData = () => {
    if (!importFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to import.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Data import started",
      description: `Importing data from ${importFile.name}.`,
    });
  };

  const handleCreateBackup = () => {
    if (!backupName) {
      toast({
        title: "Backup name required",
        description: "Please enter a name for your backup.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Backup created",
      description: `Backup "${backupName}" has been created successfully.`,
    });
    
    setBackupName('');
  };

  const handleRestoreBackup = () => {
    if (!selectedBackup) {
      toast({
        title: "No backup selected",
        description: "Please select a backup to restore.",
        variant: "destructive"
      });
      return;
    }
    
    const backup = backups.find(b => b.id === selectedBackup);
    
    toast({
      title: "Backup restored",
      description: `Backup "${backup?.name}" has been restored successfully.`,
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Data & Backup</CardTitle>
        <CardDescription>
          Export, import, backup, and restore your data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium">Export Data</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="export-format">Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger id="export-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="self-end">
              <Button onClick={handleExportData} className="w-full gap-2">
                <FileText className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium">Import Data</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="import-file">File</Label>
              <Input 
                id="import-file" 
                type="file" 
                onChange={(e) => setImportFile(e.target.files ? e.target.files[0] : null)} 
              />
              <p className="text-sm text-muted-foreground">
                Supported formats: CSV, JSON, XLSX
              </p>
            </div>
            
            <div className="self-end">
              <Button onClick={handleImportData} variant="outline" className="w-full gap-2">
                <Upload className="h-4 w-4" />
                <span>Import Data</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Save className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-medium">Create Backup</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="backup-name">Backup Name</Label>
              <Input 
                id="backup-name" 
                value={backupName} 
                onChange={(e) => setBackupName(e.target.value)} 
                placeholder="e.g., Weekly Backup - May 2023"
              />
            </div>
            
            <div className="self-end">
              <Button onClick={handleCreateBackup} className="w-full gap-2">
                <Save className="h-4 w-4" />
                <span>Create Backup</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-medium">Restore Backup</h3>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium text-muted-foreground">Select</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Size</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {backups.map((backup) => (
                      <tr key={backup.id} className="hover:bg-muted/30">
                        <td className="p-3">
                          <input 
                            type="radio" 
                            name="backup" 
                            id={`backup-${backup.id}`}
                            checked={selectedBackup === backup.id}
                            onChange={() => setSelectedBackup(backup.id)}
                            className="rounded-full"
                          />
                        </td>
                        <td className="p-3">{backup.name}</td>
                        <td className="p-3">{backup.date}</td>
                        <td className="p-3">{backup.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <Button onClick={handleRestoreBackup} variant="outline" className="gap-2">
              <Database className="h-4 w-4" />
              <span>Restore Selected Backup</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default DataBackup;
