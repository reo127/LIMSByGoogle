
'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PatientDashboard = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>
      <Tabs defaultvalue="all" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <p>All Patient Records</p>
        </TabsContent>
        <TabsContent value="approved">
          <p>Approved Patient Records</p>
        </TabsContent>
        <TabsContent value="rejected">
          <p>Rejected Patient Records</p>
        </TabsContent>
        <TabsContent value="pending">
          <p>Pending Patient Records</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDashboard;
