'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const AddPatientDialog = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const [step, setStep] = useState(1);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    id: '',
    testName: '',
    price: '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    advancePayment: '',
    discount: '',
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubmit = () => {
    console.log('Patient Details:', patientDetails);
    console.log('Payment Details:', paymentDetails);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Patient - Step {step} of 3</DialogTitle>
          <DialogDescription>
            {step === 1 && "Enter patient details and select a test."}
            {step === 2 && "Enter payment details and discount options."}
            {step === 3 && "Verify details and confirm booking."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input type="text" id="name" name="name" value={patientDetails.name} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                ID
              </Label>
              <Input type="text" id="id" name="id" value={patientDetails.id} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="testName" className="text-right">
                Test Name
              </Label>
              <Select onValueChange={(value) => setPatientDetails(prevState => ({ ...prevState, testName: value }))}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a test" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CBC">CBC - $50</SelectItem>
                  <SelectItem value="Lipid Panel">Lipid Panel - $75</SelectItem>
                  <SelectItem value="Comprehensive Metabolic Panel">Comprehensive Metabolic Panel - $100</SelectItem>
                </SelectContent>
              </Select>
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
                Discount
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
              <div><strong>Patient ID:</strong> {patientDetails.id}</div>
              <div><strong>Test Name:</strong> {patientDetails.testName}</div>
              <div><strong>Price:</strong> {patientDetails.price}</div>
              <div><strong>Advance Payment:</strong> {paymentDetails.advancePayment}</div>
              <div><strong>Discount:</strong> {paymentDetails.discount}</div>
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

export default AddPatientDialog;
