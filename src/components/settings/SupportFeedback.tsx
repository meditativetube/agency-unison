
import React, { useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from '@/hooks/use-toast';
import { HelpCircle, MessageSquare, AlertTriangle, Star } from 'lucide-react';

const SupportFeedback = () => {
  const { toast } = useToast();
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  
  const faqs = [
    {
      question: 'How do I invite team members?',
      answer: 'You can invite team members by going to Settings > User Management and clicking "Add New User". Enter their email address and set their permissions, then click "Send Invitation".'
    },
    {
      question: 'Can I change my subscription plan?',
      answer: 'Yes, you can change your subscription plan at any time by going to Settings > Subscription & Billing. Choose the plan that fits your needs and click "Update Plan".'
    },
    {
      question: 'How do I export my data?',
      answer: 'To export your data, go to Settings > Data & Backup. Choose your preferred format (CSV, JSON, PDF, or Excel) and click "Export Data".'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take data security very seriously. All your data is encrypted both in transit and at rest. We use industry-standard security measures to protect your information.'
    },
    {
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking "Forgot password?" on the login screen. Enter your email address, and we\'ll send you a link to reset your password.'
    }
  ];

  const handleContactSupport = () => {
    if (!supportSubject || !supportMessage) {
      toast({
        title: "Missing information",
        description: "Please fill in both subject and message fields.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Support request sent",
      description: "We've received your message and will respond shortly.",
    });
    
    setSupportSubject('');
    setSupportMessage('');
  };

  const handleReportProblem = () => {
    if (!problemDescription) {
      toast({
        title: "Problem description required",
        description: "Please describe the problem you're experiencing.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Problem reported",
      description: "Thank you for reporting this issue. Our team will investigate.",
    });
    
    setProblemDescription('');
  };

  const handleSubmitFeedback = () => {
    if (!feedbackMessage || !rating) {
      toast({
        title: "Incomplete feedback",
        description: "Please provide both a rating and feedback message.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback! We appreciate your input.",
    });
    
    setFeedbackMessage('');
    setRating(null);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Support & Feedback</CardTitle>
        <CardDescription>
          Get help, report issues, or provide feedback
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
          </div>
          
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <Collapsible key={index} className="border rounded-md">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left font-medium">
                  {faq.question}
                  <span className="text-lg">+</span>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 text-sm text-muted-foreground border-t">
                  {faq.answer}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium">Contact Support</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="support-subject">Subject</Label>
              <Input 
                id="support-subject" 
                value={supportSubject} 
                onChange={(e) => setSupportSubject(e.target.value)} 
                placeholder="What do you need help with?"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="support-message">Message</Label>
              <Textarea 
                id="support-message" 
                value={supportMessage} 
                onChange={(e) => setSupportMessage(e.target.value)} 
                placeholder="Describe your issue in detail"
                rows={4}
              />
            </div>
            
            <Button onClick={handleContactSupport} className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Send Message</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-medium">Report a Problem</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="problem-description">Problem Description</Label>
              <Textarea 
                id="problem-description" 
                value={problemDescription} 
                onChange={(e) => setProblemDescription(e.target.value)} 
                placeholder="Describe the issue you're experiencing"
                rows={4}
              />
            </div>
            
            <Button onClick={handleReportProblem} variant="outline" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Report Problem</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-medium">Give Feedback</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      rating && star <= rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
                    } hover:text-yellow-500 focus:outline-none transition-colors`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedback-message">Your Feedback</Label>
              <Textarea 
                id="feedback-message" 
                value={feedbackMessage} 
                onChange={(e) => setFeedbackMessage(e.target.value)} 
                placeholder="Tell us what you think about our app"
                rows={4}
              />
            </div>
            
            <Button onClick={handleSubmitFeedback} variant="outline" className="gap-2">
              <Star className="h-4 w-4" />
              <span>Submit Feedback</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default SupportFeedback;
