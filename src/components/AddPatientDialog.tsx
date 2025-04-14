'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const AddPatientDialog = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const [step, setStep] = useState(1);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    phoneNumber: '',
    age: '',
    gender: '',
    recommendedBy: '',
  });

  const [selectedTests, setSelectedTests] = useState<any[]>([]);

  const [paymentDetails, setPaymentDetails] = useState({
    advancePayment: '',
    discount: '',
  });

  // Dummy data
  const doctors = ['Dr. Smith', 'Dr. Jones', 'Dr. Williams', 'Dr. Brown'];
  const tests = [
    { id: '1', name: 'CBC', price: 50 },
    { id: '2', name: 'Lipid Panel', price: 75 },
    { id: '3', name: 'Comprehensive Metabolic Panel', price: 100 },
    { id: '4', name: 'Vitamin D Test', price: 60 },
    { id: '5', name: 'Iron Studies', price: 80 },
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTest = (test: any) => {
    setSelectedTests(prevState => [...prevState, test]);
  };

  const handleRemoveTest = (testId: string) => {
    setSelectedTests(prevState => prevState.filter(test => test.id !== testId));
  };

  const handleSubmit = () => {
    console.log('Patient Details:', patientDetails);
    console.log('Selected Tests:', selectedTests);
    console.log('Payment Details:', paymentDetails);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Patient - Step {step} of 3</DialogTitle>
          <DialogDescription>
            {step === 1 && "Enter patient details and select tests."}
            {step === 2 && "Enter payment details and discount options."}
            {step === 3 && "Verify details and confirm booking."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="flex gap-4 py-4">
            <div className="w-1/2 grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input type="text" id="name" name="name" value={patientDetails.name} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Phone Number
                </Label>
                <Input type="text" id="phoneNumber" name="phoneNumber" value={patientDetails.phoneNumber} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input type="text" id="age" name="age" value={patientDetails.age} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gender
                </Label>
                <Select onValueChange={(value) => setPatientDetails(prevState => ({ ...prevState, gender: value }))}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recommendedBy" className="text-right">
                  Referred by Doctor
                </Label>
                <Select onValueChange={(value) => setPatientDetails(prevState => ({ ...prevState, recommendedBy: value }))}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map(doctor => (
                      <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-1/2 grid gap-4">
              <Label>Tests</Label>
              <TestSelection tests={tests} onAddTest={handleAddTest} />
              <div>
                <Label>Selected Tests</Label>
                <ul>
                  {selectedTests.map(test => (
                    <li key={test.id} className="flex items-center justify-between">
                      {test.name} - ${test.price}
                      <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveTest(test.id)}>
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="advancePayment" className="text-right">
                Advance Payment
              </Label>
              <Input type="text" id="advancePayment" name="advancePayment" value={paymentDetails.advancePayment} onChange={handlePaymentChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount" className="text-right">
                Discount (%)
              </Label>
              <Input type="text" id="discount" name="discount" value={paymentDetails.discount} onChange={handlePaymentChange} className="col-span-3" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 py-4">
            <p>Please confirm the following details:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div><strong>Patient Name:</strong> {patientDetails.name}</div>
              <div><strong>Phone Number:</strong> {patientDetails.phoneNumber}</div>
              <div><strong>Age:</strong> {patientDetails.age}</div>
              <div><strong>Gender:</strong> {patientDetails.gender}</div>
              <div><strong>Referred by:</strong> {patientDetails.recommendedBy}</div>
              <div><strong>Selected Tests:</strong>
                <ul>
                  {selectedTests.map(test => (
                    <li key={test.id}>{test.name}</li>
                  ))}
                </ul>
              </div>
              <div><strong>Advance Payment:</strong> {paymentDetails.advancePayment}</div>
              <div><strong>Discount:</strong> {paymentDetails.discount}%</div>
            </div>
          </div>
        )}

        <DialogFooter>
          {step > 1 && (
            <Button type="button" variant="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit}>
              Confirm Booking
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TestSelection = ({ tests, onAddTest }: { tests: any[], onAddTest: (test: any) => void }) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Command className="rounded-md border">
      <CommandInput placeholder="Search tests..." value={value} onValueChange={setValue} />
      <CommandList>
        <CommandEmpty>No test found.</CommandEmpty>
        <CommandGroup heading="Tests">
          {tests.filter((test) => {
            return test.name.toLowerCase().includes(value.toLowerCase());
          }).map((test) => (
            <CommandItem key={test.id} onSelect={() => {
              onAddTest(test);
              setValue("");
            }}>
              {test.name}
              <CommandShortcut>${test.price}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export default AddPatientDialog;
