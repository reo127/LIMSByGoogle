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
import EaditPatient from './EaditPatient';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Icons } from './icons';

const itemsPerPage = 6;

const PatientDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy patient data
  const [patientData, setPatientData] = useState([
    { id: '1', name: 'John Doe', status: 'approved', date: '2024-01-15', paymentStatus: 'paid' },
    { id: '2', name: 'Jane Smith', status: 'pending', date: '2024-02-20', paymentStatus: 'pending' },
    { id: '3', name: 'Alice Johnson', status: 'rejected', date: '2024-03-10', paymentStatus: 'unpaid' },
    { id: '4', name: 'Bob Williams', status: 'approved', date: '2024-04-05', paymentStatus: 'paid' },
    { id: '5', name: 'Charlie Brown', status: 'pending', date: '2024-05-12', paymentStatus: 'pending' },
    { id: '6', name: 'Diana Miller', status: 'rejected', date: '2024-06-01', paymentStatus: 'unpaid' },
    { id: '7', name: 'Ethan Davis', status: 'approved', date: '2024-07-18', paymentStatus: 'paid' },
    { id: '8', name: 'Fiona Wilson', status: 'pending', date: '2024-08-25', paymentStatus: 'pending' },
    { id: '9', name: 'George Garcia', status: 'rejected', date: '2024-09-30', paymentStatus: 'unpaid' },
    { id: '10', name: 'Hannah Rodriguez', status: 'approved', date: '2024-10-08', paymentStatus: 'paid' },
    { id: '11', name: 'Ivy Martinez', status: 'pending', date: '2024-11-14', paymentStatus: 'pending' },
    { id: '12', name: 'Jack Anderson', status: 'rejected', date: '2024-12-22', paymentStatus: 'unpaid' },
    { id: '13', name: 'Karen Thompson', status: 'approved', date: '2025-01-03', paymentStatus: 'paid' },
    { id: '14', name: 'Liam White', status: 'pending', date: '2025-02-11', paymentStatus: 'pending' },
    { id: '15', name: 'Mia Harris', status: 'rejected', date: '2025-03-19', paymentStatus: 'unpaid' },
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
  const generatedPatients = filteredPatients;

  const getCurrentPageData = (patients: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return patients.slice(startIndex, endIndex);
  };

  const allCurrentPageData = getCurrentPageData(allPatients);
  const approvedCurrentPageData = getCurrentPageData(approvedPatients);
  const rejectedCurrentPageData = getCurrentPageData(rejectedPatients);
  const pendingCurrentPageData = getCurrentPageData(pendingPatients);
  const generatedCurrentPageData = getCurrentPageData(generatedPatients);

  const totalPagesAll = Math.ceil(allPatients.length / itemsPerPage);
  const totalPagesApproved = Math.ceil(approvedPatients.length / itemsPerPage);
  const totalPagesRejected = Math.ceil(rejectedPatients.length / itemsPerPage);
  const totalPagesPending = Math.ceil(pendingPatients.length / itemsPerPage);
  const totalPagesGenerated = Math.ceil(generatedPatients.length / itemsPerPage);

  const onPageChange = (tab: string, page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (patientId: string) => {
    setSelectedPatientId(patientId);
    setOpenEditDialog(true);
  };

  const renderTableContent = (patients: any[]) => (
    <Table>
      <TableCaption>A list of patient records.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Date of Entry</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow
            key={patient.id}
            onClick={() => handleRowClick(patient.id)}
            className="cursor-pointer hover:bg-muted"
          >
            <TableCell className="font-medium">{patient.id}</TableCell>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.date}</TableCell>
            <TableCell>
              <Badge variant={patient.paymentStatus === 'paid' ? 'success' : 'secondary'}>
                {patient.paymentStatus}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={patient.status === 'approved' ? 'success' : patient.status === 'pending' ? 'secondary' : 'destructive'}>
                {patient.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

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
        <Button onClick={() => setOpenAddDialog(true)}>
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
          <TabsTrigger value="generated" onClick={() => setCurrentPage(1)}>Generated</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {renderTableContent(allCurrentPageData)}
          {renderPagination(totalPagesAll, "all")}
        </TabsContent>
        <TabsContent value="approved">
          {renderTableContent(approvedCurrentPageData)}
          {renderPagination(totalPagesApproved, "approved")}
        </TabsContent>
        <TabsContent value="rejected">
          {renderTableContent(rejectedCurrentPageData)}
          {renderPagination(totalPagesRejected, "rejected")}
        </TabsContent>
        <TabsContent value="pending">
          {renderTableContent(pendingCurrentPageData)}
          {renderPagination(totalPagesPending, "pending")}
        </TabsContent>
        <TabsContent value="generated">
          {renderTableContent(generatedCurrentPageData)}
          {renderPagination(totalPagesGenerated, "generated")}
        </TabsContent>
      </Tabs>

      <AddPatientDialog open={openAddDialog} setOpen={setOpenAddDialog} />

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
          </DialogHeader>
          {selectedPatientId && <EaditPatient id={selectedPatientId} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientDashboard;