import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function ApproveTests({ setOpenEditDialog }: { setOpenEditDialog: (open: boolean) => void }) {
  // Initial state values
  const [formData, setFormData] = useState({
    patientId: "PT-1001",
    firstName: "John",
    lastName: "Doe",
    age: "38",
    gender: "Male",
    phone: "(555) 123-4567"
  })
  
  // Test values state
  const [testValues, setTestValues] = useState(Array(20).fill(""))
  
  // Comments state
  const [comments, setComments] = useState<{text: string, date: string, user: string}[]>([])
  const [newComment, setNewComment] = useState("")
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [testErrors, setTestErrors] = useState(Array(20).fill(false))

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }
  
  // Handle number only inputs
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    if (/^\d*$/.test(value)) {
      setFormData(prev => ({ ...prev, [id]: value }))
    }
  }
  
  // Handle test value changes
  const handleTestChange = (value: string, index: number) => {
    const newTestValues = [...testValues]
    newTestValues[index] = value
    setTestValues(newTestValues)
  }
  
  // Handle comment submission
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, {
        text: newComment,
        date: new Date().toLocaleString(),
        user: "Current User"
      }])
      setNewComment("")
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    // Validate patient details
    const newErrors: Record<string, boolean> = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.toString().trim()) {
        newErrors[key] = true
      }
    })
    
    // Validate test values
    const newTestErrors = testValues.map(value => !value.trim())
    
    setErrors(newErrors)
    setTestErrors(newTestErrors)
    
    if (Object.keys(newErrors).length === 0 && !newTestErrors.includes(true)) {
      console.log("Form submitted successfully", formData, testValues, comments)
      setOpenEditDialog(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Patient Details and Tests */}
      <div className="lg:col-span-2 space-y-6">
        {/* Patient Details Section */}
        <Card>
          <CardContent>
            <div className="space-y-6 mt-5">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="patientId" className="w-24">Patient ID</Label>
                  <Input 
                    id="patientId" 
                    value={formData.patientId} 
                    readOnly 
                    className="flex-1" 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="firstName" className="w-24">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange}
                    className={`flex-1 ${errors.firstName ? "border-red-500" : ""}`} 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="lastName" className="w-24">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange}
                    className={`flex-1 ${errors.lastName ? "border-red-500" : ""}`} 
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="age" className="w-24">Age</Label>
                  <Input 
                    id="age" 
                    value={formData.age} 
                    onChange={handleNumberInput}
                    className={`flex-1 ${errors.age ? "border-red-500" : ""}`} 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="gender" className="w-24">Gender</Label>
                  <Select 
                    value={formData.gender} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                  >
                    <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="phone" className="w-24">Phone</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone} 
                    onChange={handleNumberInput}
                    className={`flex-1 ${errors.phone ? "border-red-500" : ""}`} 
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tests Table Section */}
        <Card>
          <CardContent>
            <div className="overflow-x-auto mt-6">
              <div className="max-h-[300px] xl:max-h-[400px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference Range</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Test {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Input 
                            className={`w-64 ${testErrors[index] ? "border-red-500" : ""}`} 
                            value={testValues[index]} 
                            onChange={(e) => handleTestChange(e.target.value, index)}
                            placeholder="Enter value" 
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {index % 2 === 0 ? 'g/dL' : 'mmol/L'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {index % 2 === 0 ? '10.0 - 20.0' : '3.5 - 5.5'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Comments Section */}
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Comments</h3>
              <div className="space-y-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment here..."
                  className="min-h-[100px]"
                />
                <Button onClick={handleAddComment} className="w-full">
                  Add Comment
                </Button>
              </div>
              
              {/* Comments List */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>{comment.user}</span>
                        <span>{comment.date}</span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No comments yet</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Buttons */}
      <div className="lg:col-span-3 mt-6 flex justify-end gap-4">
        <Button variant="outline" onClick={() => setOpenEditDialog(false)}>Cancel</Button>
        <Button variant="destructive">Reject</Button>
        <Button variant="default">Approve</Button>
      </div>
    </div>
  )
}