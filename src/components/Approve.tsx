'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
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

const Approve = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy test data
  const [testData, setTestData] = useState([
    { id: '101', patientName: 'Alice Smith', reportDate: '2024-07-20', status: 'approved', technician: 'John Doe', doctor: 'Dr. Smith' },
    { id: '102', patientName: 'Bob Johnson', reportDate: '2024-07-22', status: 'pending', technician: 'Jane Doe', doctor: '' },
    { id: '103', patientName: 'Charlie Brown', reportDate: '2024-07-24', status: 'rejected', technician: 'John Doe', doctor: 'Dr. Jones' },
    { id: '104', patientName: 'Diana Miller', reportDate: '2024-07-26', status: 'draft', technician: 'Jane Doe', doctor: '' },
    { id: '105', patientName: 'Ethan Davis', reportDate: '2024-07-28', status: 'approved', technician: 'John Doe', doctor: 'Dr. Smith' },
    { id: '106', patientName: 'Fiona Wilson', reportDate: '2024-07-30', status: 'pending', technician: 'Jane Doe', doctor: '' },
    { id: '107', patientName: 'George Garcia', reportDate: '2024-08-01', status: 'rejected', technician: 'John Doe', doctor: 'Dr. Jones' },
    { id: '108', patientName: 'Hannah Rodriguez', reportDate: '2024-08-03', status: 'draft', technician: 'Jane Doe', doctor: '' },
    { id: '109', patientName: 'Ivy Martinez', reportDate: '2024-08-05', status: 'approved', technician: 'John Doe', doctor: 'Dr. Smith' },
    { id: '110', patientName: 'Jack Anderson', reportDate: '2024-08-07', status: 'pending', technician: 'Jane Doe', doctor: '' },
    { id: '111', patientName: 'Karen Thompson', reportDate: '2024-08-09', status: 'rejected', technician: 'John Doe', doctor: 'Dr. Jones' },
    { id: '112', patientName: 'Liam White', reportDate: '2024-08-11', status: 'draft', technician: 'Jane Doe', doctor: '' },
    { id: '113', patientName: 'Mia Harris', reportDate: '2024-08-13', status: 'approved', technician: 'John Doe', doctor: 'Dr. Smith' },
    { id: '114', patientName: 'Noah Clark', reportDate: '2024-08-15', status: 'pending', technician: 'Jane Doe', doctor: '' },
    { id: '115', patientName: 'Olivia Lewis', reportDate: '2024-08-17', status: 'rejected', technician: 'John Doe', doctor: 'Dr. Jones' },
  ]);

  // Filter test data based on search query
  const filteredTestData = testData.filter(test => {
    const searchStr = searchQuery.toLowerCase();
    return (
      test.patientName.toLowerCase().includes(searchStr) ||
      test.id.toLowerCase().includes(searchStr) ||
      test.status.toLowerCase().includes(searchStr)
    );
  });

  const allTests = filteredTestData;
  const approvedTests = filteredTestData.filter(test => test.status === 'approved');
  const rejectedTests = filteredTestData.filter(test => test.status === 'rejected');
  const draftTests = filteredTestData.filter(test => test.status === 'draft');

  const getCurrentPageData = (tests: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return tests.slice(startIndex, endIndex);
  };

  const allCurrentPageData = getCurrentPageData(allTests);
  const approvedCurrentPageData = getCurrentPageData(approvedTests);
  const rejectedCurrentPageData = getCurrentPageData(rejectedTests);
  const draftCurrentPageData = getCurrentPageData(draftTests);

  const totalPagesAll = Math.ceil(allTests.length / itemsPerPage);
  const totalPagesApproved = Math.ceil(approvedTests.length / itemsPerPage);
  const totalPagesRejected = Math.ceil(rejectedTests.length / itemsPerPage);
  const totalPagesDraft = Math.ceil(draftTests.length / itemsPerPage);

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
      <h1 className="text-2xl font-bold mb-4">Test Data Approval</h1>

      <div className="flex space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Search by Patient Name, ID, or Status"
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
          <TabsTrigger value="draft" onClick={() => setCurrentPage(1)}>Draft</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Table>
            <TableCaption>A list of all test data.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Report Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Doctor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCurrentPageData.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.id}</TableCell>
                  <TableCell>{test.patientName}</TableCell>
                  <TableCell>{test.reportDate}</TableCell>
                  <TableCell>{test.status}</TableCell>
                  <TableCell>{test.technician}</TableCell>
                  <TableCell>{test.doctor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {renderPagination(totalPagesAll, "all")}
        </TabsContent>
        <TabsContent value="approved">
          <Table>
            <TableCaption>A list of approved test data.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Report Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Doctor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedCurrentPageData.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.id}</TableCell>
                  <TableCell>{test.patientName}</TableCell>
                  <TableCell>{test.reportDate}</TableCell>
                  <TableCell>{test.status}</TableCell>
                  <TableCell>{test.technician}</TableCell>
                  <TableCell>{test.doctor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {renderPagination(totalPagesApproved, "approved")}
        </TabsContent>
        <TabsContent value="rejected">
          <Table>
            <TableCaption>A list of rejected test data.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Report Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Doctor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rejectedCurrentPageData.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.id}</TableCell>
                  <TableCell>{test.patientName}</TableCell>
                  <TableCell>{test.reportDate}</TableCell>
                  <TableCell>{test.status}</TableCell>
                  <TableCell>{test.technician}</TableCell>
                  <TableCell>{test.doctor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {renderPagination(totalPagesRejected, "rejected")}
        </TabsContent>
        <TabsContent value="draft">
          <Table>
            <TableCaption>A list of test data in draft status.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Report Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Doctor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {draftCurrentPageData.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.id}</TableCell>
                  <TableCell>{test.patientName}</TableCell>
                  <TableCell>{test.reportDate}</TableCell>
                  <TableCell>{test.status}</TableCell>
                  <TableCell>{test.technician}</TableCell>
                  <TableCell>{test.doctor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {renderPagination(totalPagesDraft, "draft")}
        </TabsContent>
      </Tabs>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Test Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="technician-notes" className="block text-sm font-medium text-gray-700">Technician Notes</label>
            <Input type="text" id="technician-notes" placeholder="Enter notes" />
          </div>
          <div>
            <label htmlFor="doctor-verification" className="block text-sm font-medium text-gray-700">Doctor Verification</label>
            <Input type="text" id="doctor-verification" placeholder="Verify data" />
          </div>
        </div>
        <div className="mt-4">
          <Button>Approve</Button>
          <Button variant="destructive" className="ml-2">Reject</Button>
        </div>
      </div>
    </div>
  );
};

export default Approve;
