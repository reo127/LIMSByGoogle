"use client"

import { useEffect, useState, useRef } from "react"
import { Check, ChevronRight, ChevronLeft, X, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Mock data for tests and referrals
const TESTS = [
  { id: 1, name: "CBC", price: 500 },
  { id: 2, name: "LFT", price: 800 },
  { id: 3, name: "Lipid Profile", price: 1200 },
  { id: 4, name: "Blood Sugar", price: 300 },
  { id: 5, name: "Thyroid Profile", price: 1500 },
  { id: 6, name: "Vitamin D", price: 1800 },
  { id: 7, name: "Vitamin B12", price: 1600 },
  { id: 8, name: "HbA1c", price: 900 },
]

const REFERRALS = [
  { id: 1, name: "Dr. Smith" },
  { id: 2, name: "Dr. Johnson" },
  { id: 3, name: "Dr. Williams" },
  { id: 4, name: "Dr. Brown" },
  { id: 5, name: "Dr. Jones" },
]

const DISCOUNTS = [
  { id: 1, name: "Senior Citizen", value: 10 },
  { id: 2, name: "Healthcare Worker", value: 15 },
  { id: 3, name: "Corporate", value: 20 },
  { id: 4, name: "Festival Offer", value: 5 },
]

interface AddPatientDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function AddPatientDialog({ open, setOpen }: AddPatientDialogProps) {
  const [step, setStep] = useState(1)
  const [patientData, setPatientData] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    gender: "male",
    referredBy: null as { id: number; name: string } | null,
    selectedTests: [] as { id: number; name: string; price: number }[],
    discounts: [] as { id: number; name: string; value: number }[],
    paymentMode: "cash",
    instituteName: "",
    authId: "",
    advancePayment: "",
  })
  const [openReferralSelect, setOpenReferralSelect] = useState(false)
  const [openTestSelect, setOpenTestSelect] = useState(false)
  const [openDiscountSelect, setOpenDiscountSelect] = useState(false)
  const [success, setSuccess] = useState(false)
  const [searchString, setSearchString] = useState("")
  const [filterTests, setFilterTests] = useState(TESTS)
  
  // Add refs for handling outside clicks
  const testInputRef = useRef(null)
  const testDropdownRef = useRef(null)

  // Calculate totals
  const totalAmount = patientData.selectedTests?.reduce((sum, test) => sum + test.price, 0) || 0
  const totalDiscount = patientData.discounts?.reduce((sum, discount) => sum + discount.value, 0) || 0
  const discountAmount = (totalAmount * totalDiscount) / 100
  const finalAmount = totalAmount - discountAmount

  // Add effect for handling outside clicks
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        openTestSelect &&
        testInputRef.current && 
        testDropdownRef.current &&
        !testInputRef.current.contains(event.target) && 
        !testDropdownRef.current.contains(event.target)
      ) {
        setOpenTestSelect(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openTestSelect])

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit form
      setSuccess(true)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleClose = () => {
    setOpen(false)
    // Reset form after closing
    setTimeout(() => {
      setStep(1)
      setSuccess(false)
      setPatientData({
        name: "",
        phoneNumber: "",
        age: "",
        gender: "male",
        referredBy: null,
        selectedTests: [],
        discounts: [],
        paymentMode: "cash",
        instituteName: "",
        authId: "",
        advancePayment: "",
      })
    }, 300)
  }

  const addTest = (test: { id: number; name: string; price: number }) => {
    if (!patientData.selectedTests?.some((t) => t.id === test.id)) {
      setPatientData({
        ...patientData,
        selectedTests: [...(patientData.selectedTests || []), test],
      })
    }
    // Don't close the popover here
  }

  const removeTest = (testId: number) => {
    setPatientData({
      ...patientData,
      selectedTests: patientData.selectedTests?.filter((test) => test.id !== testId) || [],
    })
  }

  const toggleDiscount = (discount: { id: number; name: string; value: number }) => {
    const exists = patientData.discounts?.some((d) => d.id === discount.id) || false

    if (exists) {
      setPatientData({
        ...patientData,
        discounts: patientData.discounts?.filter((d) => d.id !== discount.id) || [],
      })
    } else {
      setPatientData({
        ...patientData,
        discounts: [...(patientData.discounts || []), discount],
      })
    }
    // Don't close the popover here
  }

  const handleInputChange = (e: any) => {
    const newSearchString = e.target.value
    setSearchString(newSearchString)
    setOpenTestSelect(true)
    
    // Use the current input value from the event instead of the state
    const filteredTests = TESTS.filter((test) =>
      test.name.toLowerCase().includes(newSearchString.toLowerCase())
    );
    
    if(newSearchString.length === 0){
      setFilterTests(TESTS)
    } else {
      setFilterTests(filteredTests)
    }
  }

  const handleInputFocus = () => {
    setOpenTestSelect(true)
    setFilterTests(TESTS)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filterTests.length > 0) {
      e.preventDefault()
      // Select the first test in the filtered list
      addTest(filterTests[0])
      setOpenTestSelect(false)
      setSearchString("") // Clear the input after selection
    }
    
    // Add escape key to close dropdown but not dialog
    if (e.key === 'Escape') {
      e.stopPropagation() // Stop event propagation to prevent closing the dialog
      setOpenTestSelect(false)
    }
  }

  return (
    <Dialog 
      open={open} 
      onOpenChange={(newOpenState) => {
        // Only allow the dialog to close when explicitly set by our own controls
        if (open && newOpenState === false) {
          // Do nothing when trying to close dialog by clicking outside
          return;
        }
        setOpen(newOpenState)
      }}
    >
      <DialogContent 
        className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto"
        onEscapeKeyDown={(e) => {
          // Prevent closing on escape key
          e.preventDefault()
        }}
        onInteractOutside={(e) => {
          // Prevent closing when clicking outside
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>

        {/* Step indicators */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-medium",
                    step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && <div className={cn("w-12 h-1", step > stepNumber ? "bg-primary" : "bg-muted")} />}
              </div>
            ))}
          </div>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Patient Added Successfully</h3>
            <p className="text-muted-foreground mb-6">Patient record has been created and tests have been scheduled.</p>
            <Button onClick={handleClose}>Close</Button>
          </div>
        ) : (
          <>
            {/* Step 1: Patient Details and Tests */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side - Patient details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Patient Details</h3>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={patientData.name}
                      onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                      placeholder="Enter patient name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={patientData.phoneNumber}
                      onChange={(e) => setPatientData({ ...patientData, phoneNumber: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={patientData.age}
                      onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
                      placeholder="Enter age"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup
                      value={patientData.gender}
                      onValueChange={(value) => setPatientData({ ...patientData, gender: value })}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Referred By</Label>

                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select referred doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {REFERRALS.map((referral) => (
                            <SelectItem value={referral.name}
                              key={referral.id}
                              onSelect={() => {
                                setPatientData({ ...patientData, referredBy: referral.name })
                                setOpenReferralSelect(false)
                              }}
                            >{referral.name}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right side - Test selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Test Selection</h3>

                  <div className="space-y-2">
                    <Label>Select Tests</Label>
                    <div className="relative">
                      <Input
                        placeholder="Search tests..."
                        className="w-full"
                        ref={testInputRef}
                        onFocus={handleInputFocus}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        value={searchString}
                      />
                      {openTestSelect && (
                        <div
                          ref={testDropdownRef}
                          className="absolute w-full mt-1 rounded-lg border shadow-md bg-white z-50"
                        >
                          <Command shouldFilter={false}>
                            <CommandList>
                              <CommandEmpty>No test found.</CommandEmpty>
                              <CommandGroup>
                                {filterTests.map((test) => (
                                  <CommandItem
                                    key={test.id}
                                    onSelect={() => {
                                      addTest(test);
                                      setOpenTestSelect(false);
                                      setSearchString(""); // Clear search on selection
                                    }}
                                    className={cn(
                                      "flex items-center justify-between py-2 cursor-pointer hover:bg-accent",
                                      patientData.selectedTests?.some((t) => t.id === test.id) && "bg-accent"
                                    )}
                                  >
                                    <span>{test.name}</span>
                                    <span className="text-muted-foreground">₹{test.price}</span>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>                        
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border rounded-md p-4 min-h-[200px]">
                    <h4 className="text-sm font-medium mb-2">Selected Tests</h4>
                    {(patientData.selectedTests?.length || 0) === 0 ? (
                      <p className="text-muted-foreground text-sm">No tests selected</p>
                    ) : (
                      <div className="space-y-2">
                        {patientData.selectedTests?.map((test) => (
                          <div key={test.id} className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                            <span>{test.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">₹{test.price}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-destructive"
                                onClick={() => removeTest(test.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {(patientData.selectedTests?.length || 0) > 0 && (
                    <div className="text-right font-medium">Total: ₹{totalAmount}</div>
                  )}
                </div>
              </div>

            )}

            {/* Step 2: Payment Details */}
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side - Discount and Payment Mode */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Discount & Payment</h3>

                  <div className="space-y-2">
                    <Label>Select Discounts</Label>
                    <div className="relative">
                      <Input
                        placeholder="Search discounts..."
                        className="w-full"
                        value={patientData.discounts?.[0]?.name || ''}
                        onFocus={() => setOpenDiscountSelect(true)}
                        readOnly
                      />
                      {openDiscountSelect && (
                        <div
                          className="absolute w-full mt-1 rounded-lg border shadow-md bg-white z-50"
                        >
                          <Command shouldFilter={false}>
                            <CommandInput placeholder="Search discounts..." />
                            <CommandList>
                              <CommandEmpty>No discount found.</CommandEmpty>
                              <CommandGroup>
                                {DISCOUNTS.map((discount) => (
                                  <CommandItem
                                    key={discount.id}
                                    onSelect={() => {
                                      setPatientData({
                                        ...patientData,
                                        discounts: [discount] // Set single discount instead of array
                                      });
                                      setOpenDiscountSelect(false);
                                    }}
                                    className={cn(
                                      "flex items-center justify-between py-2 cursor-pointer hover:bg-accent",
                                      patientData.discounts?.[0]?.id === discount.id && "bg-accent"
                                    )}
                                  >
                                    <span>{discount.name}</span>
                                    <Badge variant="outline" className="ml-auto">
                                      {discount.value}%
                                    </Badge>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Mode of Payment</Label>
                  <RadioGroup
                    value={patientData.paymentMode}
                    onValueChange={(value) => setPatientData({ ...patientData, paymentMode: value })}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Cash</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi">UPI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paylater" id="paylater" />
                      <Label htmlFor="paylater">Pay Later</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online">Online Banking</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2 pt-4">
                  <Label>Institute Name</Label>
                  <Input
                    id="institute"
                    value={patientData.instituteName}
                    onChange={(e) => setPatientData({ ...patientData, instituteName: e.target.value })}
                    placeholder="Enter institute name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Authorization ID</Label>
                  <Input
                    id="authId"
                    value={patientData.authId}
                    onChange={(e) => setPatientData({ ...patientData, authId: e.target.value })}
                    placeholder="Enter authorization ID"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Confirm Patient Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Patient Details */}
                  <div className="border rounded-md p-4 space-y-3">
                    <h4 className="font-medium">Patient Information</h4>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Name:</div>
                      <div className="font-medium">{patientData.name || "Not provided"}</div>

                      <div className="text-muted-foreground">Phone:</div>
                      <div className="font-medium">{patientData.phoneNumber || "Not provided"}</div>

                      <div className="text-muted-foreground">Age:</div>
                      <div className="font-medium">{patientData.age || "Not provided"}</div>

                      <div className="text-muted-foreground">Gender:</div>
                      <div className="font-medium capitalize">{patientData.gender}</div>

                      <div className="text-muted-foreground">Referred By:</div>
                      <div className="font-medium">{patientData.referredBy?.name || "Not provided"}</div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="border rounded-md p-4 space-y-3">
                    <h4 className="font-medium">Payment Information</h4>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Total Amount:</div>
                      <div className="font-medium">₹{totalAmount}</div>

                      <div className="text-muted-foreground">Discount:</div>
                      <div className="font-medium">
                        {totalDiscount}% (₹{discountAmount})
                      </div>

                      <div className="text-muted-foreground">Final Amount:</div>
                      <div className="font-medium">₹{finalAmount}</div>

                      <div className="text-muted-foreground">Payment Mode:</div>
                      <div className="font-medium capitalize">{patientData.paymentMode}</div>

                      {patientData.paymentMode === "paylater" ? (
                        <>
                          <div className="text-muted-foreground">Institute:</div>
                          <div className="font-medium">{patientData.instituteName || "Not provided"}</div>

                          <div className="text-muted-foreground">Auth ID:</div>
                          <div className="font-medium">{patientData.authId || "Not provided"}</div>
                        </>
                      ) : (
                        <>
                          <div className="text-muted-foreground">Advance Payment:</div>
                          <div className="font-medium">₹{patientData.advancePayment || "0"}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Selected Tests */}
                <div className="border rounded-md p-4 space-y-3">
                  <h4 className="font-medium">Selected Tests</h4>

                  {(patientData.selectedTests?.length || 0) === 0 ? (
                    <p className="text-muted-foreground text-sm">No tests selected</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {patientData.selectedTests?.map((test) => (
                        <div key={test.id} className="flex justify-between bg-muted/50 p-2 rounded-md">
                          <span>{test.name}</span>
                          <span className="text-sm font-medium">₹{test.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Discounts */}
                {(patientData.discounts?.length || 0) > 0 && (
                  <div className="border rounded-md p-4 space-y-3">
                    <h4 className="font-medium">Applied Discounts</h4>

                    <div className="flex flex-wrap gap-2">
                      {patientData.discounts?.map((discount) => (
                        <Badge key={discount.id} variant="secondary">
                          {discount.name} ({discount.value}%)
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-end gap-4 mt-6">
              {step > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              ) : (
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              )}

              <Button onClick={handleNext}>
                {step === 3 ? "Create Patient" : "Next"}
                {step < 3 && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}