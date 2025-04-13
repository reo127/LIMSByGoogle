'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, UserPlus } from 'lucide-react';
import { format } from 'date-fns';
import AddPatientDialog from './AddPatientDialog';

const PatientDashboard = () => {
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>

      <div className="flex space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Search by Status"
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !fromDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fromDate && toDate ? (
                <>
                  {format(fromDate, "PPP")} - {format(toDate, "PPP")}
                </>
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-auto flex-col space-y-2 p-0">
            <Calendar
              mode="range"
              defaultMonth={fromDate}
              selected={{ from: fromDate, to: toDate }}
              onSelect={(date) => {
                if (date?.from) {
                  setFromDate(date.from);
                }
                if (date?.to) {
                  setToDate(date.to);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Tabs defaultvalue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <p>All Patient Records Content</p>
        </TabsContent>
        <TabsContent value="approved">
          <p>Approved Patient Records Content</p>
        </TabsContent>
        <TabsContent value="rejected">
          <p>Rejected Patient Records Content</p>
        </TabsContent>
        <TabsContent value="pending">
          <p>Pending Patient Records Content</p>
        </TabsContent>
      </Tabs>

      <Button onClick={() => setOpen(true)} className="mt-4">
        <UserPlus className="mr-2 h-4 w-4" />
        Add Patient
      </Button>

      <AddPatientDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default PatientDashboard;
