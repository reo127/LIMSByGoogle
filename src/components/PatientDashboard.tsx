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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Icons } from './icons';

const itemsPerPage = 5;

const PatientDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy patient data
  const [patientData, setPatientData] = useState([
    { id: '1', name: 'John Doe', status: 'approved', date: '2024-01-15' },
    { id: '2', name: 'Jane Smith', status: 'pending', date: '2024-02-20' },
    { id: '3', name: 'Alice Johnson', status: 'rejected', date: '2024-03-10' },
    { id: '4', name: 'Bob Williams', status: 'approved', date: '2024-04-05' },
    { id: '5', name: 'Charlie Brown', status: 'pending', date: '2024-05-12' },
    { id: '6', name: 'Diana Miller', status: 'rejected', date: '2024-06-01' },
    { id: '7', name: 'Ethan Davis', status: 'approved', date: '2024-07-18' },
    { id: '8', name: 'Fiona Wilson', status: 'pending', date: '2024-08-25' },
    { id: '9', name: 'George Garcia', status: 'rejected', date: '2024-09-30' },
    { id: '10', name: 'Hannah Rodriguez', status: 'approved', date: '2024-10-08' },
    { id: '11', name: 'Ivy Martinez', status: 'pending', date: '2024-11-14' },
    { id: '12', name: 'Jack Anderson', status: 'rejected', date: '2024-12-22' },
    { id: '13', name: 'Karen Thompson', status: 'approved', date: '2025-01-03' },
    { id: '14', name: 'Liam White', status: 'pending', date: '2025-02-11' },
    { id: '15', name: 'Mia Harris', status: 'rejected', date: '2025-03-19' },
  ]);

  // Filter patient data based on search query and status
  const filteredPatients = patientData.filter(patient => {
    const searchStr = searchQuery.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchStr) ||
      patient.id.toLowerCase().includes(searchStr) ||
      patient.status.toLowerCase().includes(searchStr)
    );
  });

  const allPatients = filteredPatients;
  const approvedPatients = filteredPatients.filter(patient => patient.status === 'approved');
  const rejectedPatients = filteredPatients.filter(patient => patient.status === 'rejected');
  const pendingPatients = filteredPatients.filter(patient => patient.status === 'pending');

  const getCurrentPageData = (patients: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return patients.slice(startIndex, endIndex);
  };

  const allCurrentPageData = getCurrentPageData(allPatients);
  const approvedCurrentPageData = getCurrentPageData(approvedPatients);
  const rejectedCurrentPageData = getCurrentPageData(rejectedPatients);
  const pendingCurrentPageData = getCurrentPageData(pendingPatients);

  const totalPagesAll = Math.ceil(allPatients.length / itemsPerPage);
  const totalPagesApproved = Math.ceil(approvedPatients.length / itemsPerPage);
  const totalPagesRejected = Math.ceil(rejectedPatients.length / itemsPerPage);
  const totalPagesPending = Math.ceil(pendingPatients.length / itemsPerPage);

  const onPageChange = (tab: string, page: number) => {
    setCurrentPage(page);
  };


  const renderPagination = (totalPages: number, tab: string) => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-4 space-x-2">
        <Button
          onClick={() => onPageChange(tab, currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="icon"
        >
          <Icons.chevronLeft className="h-4 w-4" />
        </Button>
        <span>{currentPage} of {totalPages}</span>
        <Button
          onClick={() => onPageChange(tab, currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="icon"
        >
          <Icons.chevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };


  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Patient Dashboard</h1>
        <Button onClick={() => setOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <div className="flex space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Search by Name, ID, or Status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setCurrentPage(1)}>All</TabsTrigger>
          <TabsTrigger value="approved" onClick={() => setCurrentPage(1)}>Approved</TabsTrigger>
          <TabsTrigger value="rejected" onClick={() => setCurrentPage(1)}>Rejected</TabsTrigger>
          <TabsTrigger value="pending" onClick={() => setCurrentPage(1)}>Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Table>
            <TableCaption>A list of all patient records.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCurrentPageData.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.status}</TableCell>
                  <TableCell>{patient.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {renderPagination(totalPagesAll, "all")}
        </TabsContent>
        <TabsContent value="approved">
        <Table>
            <TableCaption>A list of approved patient records.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedCurrentPageData.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.status}</TableCell>
                  <TableCell>{patient.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {renderPagination(totalPagesApproved, "approved")}
        </TabsContent>
        <TabsContent value="rejected">
        <Table>
            <TableCaption>A list of rejected patient records.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rejectedCurrentPageData.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.status}</TableCell>
                  <TableCell>{patient.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {renderPagination(totalPagesRejected, "rejected")}
        </TabsContent>
        <TabsContent value="pending">
        <Table>
            <TableCaption>A list of pending patient records.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingCurrentPageData.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.status}</TableCell>
                  <TableCell>{patient.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {renderPagination(totalPagesPending, "pending")}
        </TabsContent>
      </Tabs>

      <AddPatientDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default PatientDashboard;
