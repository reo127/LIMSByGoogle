'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

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
    paymentMode: '',
  });

  const { toast } = useToast();

  // Dummy data
  const doctors = ['Dr. Smith', 'Dr. Jones', 'Dr. Williams', 'Dr. Brown'];
  const tests = [
    { id: '1', name: 'CBC', price: 50 },
    { id: '2', name: 'Lipid Panel', price: 75 },
    { id: '3', name: 'Comprehensive Metabolic Panel', price: 100 },
    { id: '4', name: 'Vitamin D Test', price: 60 },
    { id: '5', name: 'Iron Studies', price: 80 },
    { id: '6', name: 'Kidney Function Test', price: 90 },
    { id: '7', name: 'Liver Function Test', price: 85 },
    { id: '8', name: 'Thyroid Function Test', price: 110 },
    { id: '9', name: 'Urine Analysis', price: 40 },
    { id: '10', name: 'Electrolyte Panel', price: 70 },
  ];

  const handleNext = () => {
    if (step === 1) {
      if (!patientDetails.name || !patientDetails.phoneNumber || !patientDetails.age || !patientDetails.gender || !patientDetails.recommendedBy) {
        toast({
          title: "Error",
          description: "Please fill in all the patient details.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 2) {
      if (isNaN(Number(paymentDetails.discount)) || Number(paymentDetails.discount) < 0 || Number(paymentDetails.discount) > 100) {
        toast({
          title: "Error",
          description: "Discount must be a number between 0 and 100.",
          variant: "destructive",
        });
        return;
      }

      if (!/^\d{10}$/.test(patientDetails.phoneNumber)) {
        toast({
          title: "Error",
          description: "Please enter a valid 10-digit phone number.",
          variant: "destructive",
        });
        return;
      }
    }

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
    setSelectedTests(prevState => {
      if (prevState.find(t => t.id === test.id)) {
        return prevState;
      }
      return [...prevState, test];
    });
  };

  const handleRemoveTest = (testId: string) => {
    setSelectedTests(prevState => prevState.filter(test => test.id !== testId));
  };

  const handleSubmit = () => {
    console.log('Patient Details:', patientDetails);
    console.log('Selected Tests:', selectedTests);
    console.log('Payment Details:', paymentDetails);
    toast({
      title: "Success",
      description: "Patient added successfully.",
    });
    setOpen(false);
  };

  const calculateTotal = () => {
    return selectedTests.reduce((acc, test) => acc + test.price, 0);
  };

  const totalAmount = calculateTotal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=' '>
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
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={patientDetails.name}
                  onChange={handleInputChange}
                  className="col-span-3 rounded-md shadow-sm"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Phone Number
                </Label>
                <Input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={patientDetails.phoneNumber}
                  onChange={handleInputChange}
                  className="col-span-3 rounded-md shadow-sm"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input
                  type="text"
                  id="age"
                  name="age"
                  value={patientDetails.age}
                  onChange={handleInputChange}
                  className="col-span-3 rounded-md shadow-sm"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gender
                </Label>
                <Select onValueChange={(value) => setPatientDetails(prevState => ({ ...prevState, gender: value }))}>
                  <SelectTrigger className="col-span-3 rounded-md shadow-sm">
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
                  <SelectTrigger className="col-span-3 rounded-md shadow-sm">
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
              <Select onValueChange={(value) => {
                const test = tests.find(test => test.id === value);
                if (test) {
                  handleAddTest(test);
                }
              }}>
                <SelectTrigger className="w-full rounded-md shadow-sm">
                  <SelectValue placeholder="Select a test" />
                </SelectTrigger>
                <SelectContent className="max-h-64 overflow-auto">
                  <SelectScrollUpButton />
                  {tests.map(test => (
                    <SelectItem key={test.id} value={test.id}>{test.name} - ${test.price}</SelectItem>
                  ))}
                  <SelectScrollDownButton />
                </SelectContent>
              </Select>

              <div>
                <Label>Selected Tests</Label>
                <ScrollArea className="h-[150px] rounded-md border">
                  <div className="p-2">
                    {selectedTests.length > 0 ? (
                      <ul>
                        {selectedTests.map(test => (
                          <li key={test.id} className="flex items-center justify-between py-2">
                            {test.name} - ${test.price}
                            <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveTest(test.id)}>
                              Remove
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No tests selected.</p>
                    )}
                  </div>
                </ScrollArea>
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
              <Input
                type="text"
                id="advancePayment"
                name="advancePayment"
                value={paymentDetails.advancePayment}
                onChange={handlePaymentChange}
                className="col-span-3 rounded-md shadow-sm"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount" className="text-right">
                Discount (%)
              </Label>
              <Input
                type="text"
                id="discount"
                name="discount"
                value={paymentDetails.discount}
                onChange={handlePaymentChange}
                className="col-span-3 rounded-md shadow-sm"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentMode" className="text-right">
                Payment Mode
              </Label>
              <Select onValueChange={(value) => setPaymentDetails(prevState => ({ ...prevState, paymentMode: value }))}>
                <SelectTrigger className="col-span-3 rounded-md shadow-sm">
                  <SelectValue placeholder="Select Payment Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="creditCard">Credit Card</SelectItem>
                  <SelectItem value="debitCard">Debit Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="netBanking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Total Amount
              </Label>
              <div className="col-span-3 font-semibold">${totalAmount}</div>
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
              <div><strong>Payment Mode:</strong> {paymentDetails.paymentMode}</div>
              <div><strong>Total Amount:</strong> ${totalAmount}</div>
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

const SelectScrollUpButton = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="m12 19-7-7 7-7" />
    </svg>
  </div>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

const SelectScrollDownButton = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="m12 5 7 7-7 7" />
    </svg>
  </div>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";

export default AddPatientDialog;
