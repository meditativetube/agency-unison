
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Plus, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useUser } from './UserProvider';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters long' }),
  date: z.date({ required_error: 'A date is required' }),
  startTime: z.string().min(1, { message: 'Start time is required' }),
  duration: z.string().min(1, { message: 'Duration is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  type: z.string().min(1, { message: 'Meeting type is required' }),
  description: z.string().optional(),
});

type Event = z.infer<typeof formSchema> & {
  id: string;
  participants: string[];
};

const MeetingCalendar = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Weekly Sync',
      date: new Date(),
      startTime: '10:00',
      duration: '1 hour',
      location: 'Conference Room A',
      type: 'Recurring',
      description: 'Weekly team sync meeting to discuss progress and blockers',
      participants: ['1', '2', '3']
    },
    {
      id: '2',
      title: 'Project Kickoff',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      startTime: '14:00',
      duration: '1.5 hours',
      location: 'Virtual Meeting',
      type: 'One-time',
      description: 'Project kickoff meeting for the new client project',
      participants: ['1', '2', '4']
    }
  ]);
  const { allUsers } = useUser();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      startTime: '09:00',
      duration: '1 hour',
      location: '',
      type: 'One-time',
      description: '',
    },
  });

  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const newEvent: Event = {
      ...data,
      id: Date.now().toString(),
      participants: selectedParticipants,
    };
    
    setEvents([...events, newEvent]);
    setSelectedParticipants([]);
    form.reset();
    
    toast({
      title: "Event created",
      description: `${data.title} has been scheduled for ${format(data.date, 'PPP')}`,
    });
  };

  const eventsForSelectedDate = date ? events.filter(
    event => event.date.toDateString() === date.toDateString()
  ) : [];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  const findUserById = (id: string) => {
    return allUsers.find(user => user.id === id);
  };

  return (
    <div className="grid gap-6 md:grid-cols-7">
      <Card className="md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <div className="mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Schedule a new event</DialogTitle>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter event title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="30 mins">30 mins</SelectItem>
                                <SelectItem value="1 hour">1 hour</SelectItem>
                                <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                                <SelectItem value="2 hours">2 hours</SelectItem>
                                <SelectItem value="3 hours">3 hours</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meeting Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="One-time">One-time</SelectItem>
                              <SelectItem value="Recurring">Recurring</SelectItem>
                              <SelectItem value="Internal">Internal</SelectItem>
                              <SelectItem value="External">External</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div>
                      <FormLabel>Participants</FormLabel>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {allUsers.map(user => (
                          <Button
                            key={user.id}
                            type="button"
                            variant={selectedParticipants.includes(user.id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              if (selectedParticipants.includes(user.id)) {
                                setSelectedParticipants(selectedParticipants.filter(id => id !== user.id));
                              } else {
                                setSelectedParticipants([...selectedParticipants, user.id]);
                              }
                            }}
                            className="flex items-center gap-2"
                          >
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="text-[10px]">{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{user.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Create Event</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-5">
        <CardHeader className="pb-3">
          <CardTitle>
            {date ? (
              <div className="flex items-center justify-between">
                <span>Events for {format(date, 'PPPP')}</span>
                <Button variant="ghost" size="sm" onClick={() => setDate(new Date())}>
                  Today
                </Button>
              </div>
            ) : (
              'Select a date to view events'
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {eventsForSelectedDate.length > 0 ? (
            <div className="space-y-6">
              {eventsForSelectedDate.map((event) => (
                <div key={event.id} className="rounded-lg border p-4 transition-all hover:shadow-md">
                  <div className="flex flex-col space-y-2 md:flex-row md:items-start md:justify-between md:space-y-0">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                        <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {event.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{event.startTime} ({event.duration})</span>
                        </div>
                        <div>{event.location}</div>
                      </div>
                      {event.description && (
                        <p className="mt-2 text-sm">{event.description}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {event.participants.length} participant{event.participants.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex -space-x-2">
                          {event.participants.slice(0, 3).map((participantId) => {
                            const user = findUserById(participantId);
                            return (
                              <Avatar key={participantId} className="h-7 w-7 border-2 border-background">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback className="text-xs">
                                  {user ? getInitials(user.name) : 'U'}
                                </AvatarFallback>
                              </Avatar>
                            );
                          })}
                          {event.participants.length > 3 && (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                              +{event.participants.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">No events scheduled</h3>
              <p className="mb-4 mt-1 text-sm text-muted-foreground">
                There are no events scheduled for this date. Click the "Add New Event" button to create one.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  {/* Same dialog content as above */}
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingCalendar;
