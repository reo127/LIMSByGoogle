# **App Name**: LabWise

## Core Features:

- Patient Dashboard: Patient dashboard with tabs (All, Approved, Rejected, Pending) for patient record management.
- Patient Record Filtering: Advanced search and filter options (name, ID, status, date range) for efficient patient record retrieval.
- Patient Addition Wizard: Multi-step patient addition process: Patient details & test selection, payment & discount, and confirmation.
- Settings Management: Settings page for managing doctors, technicians, test price list (CSV upload/download), and lab details.
- Test Data Approval Workflow: Approval page with tabs (All, Approved, Rejected, Draft) for test data verification and approval by doctors.
- Transaction Dashboard: Transaction data dashboard for tracking booking transactions with search and date filtering.

## Style Guidelines:

- Primary color: Soft blue (#E6F0FF) to create a calm and professional environment.
- Secondary color: Light gray (#F5F5F5) for backgrounds and subtle contrasts.
- Accent color: Teal (#008080) for interactive elements and highlights.
- Clean and readable sans-serif fonts for content and UI elements.
- Consistent and clear icons from a library like FontAwesome or Material Icons.
- Sidebar navigation on the left, main content area on the right, and clear separation of sections with whitespace.

## Original User Request:
buils a lims lab management web app.
the app should a sidebar there user can navigate throw different features/components/pages. in the left side sidebar should come and in the right side all features should come. 
sidebar should have 4 features - patient dashboard, settings, approve, payments
the app should app billow features.
1) patient dashboard: there all the patient records should come. the dashboard should have tabs (all, approve, rejected, pending ), based on the tabs user can see records. there should be a search filter so that user can search my name, id, status, and there should be two calendar so that user can see reports in  a spasific time like ex 2-3-2025 to 2-4-2924 only one month reports user want to see.
you need to create another component to add patients, this add patient should be in three steps, first add patient details and test name (test name sill a searchable dropdown use should see test name and price) then in second step advance payment option and discount option and third step was carify details and confirm booking.
2) settings page: hare user should see and updated and create all the doctors list, technician list, test price list (it should be a csv download and upload field, the tests will be inside the csv file), lab details will be there also.
3) approve page: hare technician will add tests data and doctor will verify the data and approve or reject. so hare also a dashboard need like patient dashboard, with four tabs - all, approved, rejected, draft.
starting of the component the patient and report details will be there and in the bottom side the rests values will be there (that was input field there technician will fill the data and doctor will verify).
4) hare another dashboard need, transition data will be available hare after every booking. and same search filter and data filter.

tech stack: nextjs, javascript, tailwindCSS, any UI library (I prefer shadcn), zustand. 
color schema will be blue or green. the UI design should look good
  