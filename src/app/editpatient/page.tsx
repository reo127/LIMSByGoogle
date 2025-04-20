"use client"
import React from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const EditPatientPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Edit Patient</h1>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">Patient Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Phone Number" />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name" />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" placeholder="Age" disabled />
              </div>
              <div>
                <Label htmlFor="sex">Sex</Label>
                <Input id="sex" placeholder="Sex" />
              </div>
              <div>
                <Label htmlFor="recommendedBy">Recommended By</Label>
                <Input id="recommendedBy" placeholder="Recommended By" />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Input id="status" placeholder="Status" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Payment Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tests">Number of Tests</Label>
                <Input id="tests" placeholder="Number of Tests" />
              </div>
              <div>
                <Label htmlFor="totalAmount">Total Amount</Label>
                <Input id="totalAmount" placeholder="Total Amount" />
              </div>
              <div>
                <Label htmlFor="advancePaid">Advance Paid</Label>
                <Input id="advancePaid" placeholder="Advance Paid" />
              </div>
              <div>
                <Label htmlFor="restAmount">Rest Amount</Label>
                <Input id="restAmount" placeholder="Rest Amount" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <Button>Update Payment</Button>
          <Button>Prepare Report</Button>
          <Button>Print Report</Button>
        </div>
      </div>
    </div>
  );
};

export default EditPatientPage;