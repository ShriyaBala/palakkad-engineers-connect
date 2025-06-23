# Member Search Functionality Setup

This document explains how to set up and use the member search functionality that connects to the user table in your Django backend.

## Backend Setup

### 1. API Endpoints Created

The following API endpoints have been added to your Django backend:

- `GET /api/members/` - Search members with query parameter
- `GET /api/members/all/` - Get all approved members

### 2. Database Models

The search functionality uses the existing `CustomUser` model with the following relevant fields:
- `username` (displayed as name)
- `email`
- `phone`
- `area`
- `unit`
- `qualification`
- `skills`
- `licenseNo`
- `panchayath`
- `role`
- `is_approved`
- `is_member`

### 3. Search Functionality

The search works across multiple fields:
- Name (username)
- Email
- Area
- Unit
- Qualification
- Skills
- License Number
- Panchayath

## Frontend Implementation

### 1. MemberSearch Component

The `MemberSearch` component in `frontend/src/components/MemberSearch.tsx` provides:
- Real-time search functionality
- Display of all member information
- Responsive grid layout
- Loading states and error handling
- Clear search functionality

### 2. Features

- **Auto-load**: Loads all members when the page loads
- **Search**: Search by any member detail
- **Responsive**: Works on mobile and desktop
- **Error handling**: Graceful error messages and retry functionality
- **Loading states**: Visual feedback during API calls

## Testing the Functionality

### 1. Create Test Data

To test the search functionality, you can create test members using the Django management command:

```bash
cd backend
python manage.py create_test_members
```

This will create 5 test members with different qualifications and areas.

### 2. Test Search Scenarios

Try searching for:
- Names: "john", "sarah", "mike"
- Areas: "Palakkad", "Ottapalam", "Shoranur"
- Qualifications: "Civil", "Architecture", "Electrical"
- Skills: "Design", "Development", "Management"

## Usage Instructions

### For Users:

1. Navigate to the Members page
2. The page will automatically load all approved members
3. Use the search box to find specific members
4. Search by name, email, area, unit, qualification, or skills
5. Click "Clear" to reset the search and show all members

### For Administrators:

1. Members must have `is_approved=True` and `is_member=True` to appear in search results
2. Use the Django admin panel to approve new members
3. Update member information through the admin panel

## API Response Format

The API returns member data in this format:

```json
[
  {
    "id": 1,
    "name": "John Engineer",
    "email": "john@example.com",
    "phone": "9876543210",
    "area": "Palakkad Town",
    "unit": "Palakkad Unit",
    "role": "member",
    "qualification": "B.Tech Civil Engineering",
    "skills": "Structural Design, Construction Management",
    "licenseNo": "KL123456",
    "panchayath": "Palakkad Municipality",
    "is_approved": true,
    "is_member": true
  }
]
```

## Troubleshooting

### Common Issues:

1. **No members showing**: Check if members have `is_approved=True` and `is_member=True`
2. **Search not working**: Verify the backend server is running
3. **API errors**: Check browser console for error messages
4. **Empty results**: Ensure the search query matches member data

### Debug Steps:

1. Check Django server logs for API errors
2. Verify database has approved members
3. Test API endpoints directly (e.g., `http://localhost:8000/api/members/all/`)
4. Check browser network tab for failed requests

## Future Enhancements

Potential improvements:
- Add filters by area, unit, or qualification
- Implement pagination for large member lists
- Add member profile pages
- Include member photos
- Add export functionality
- Implement advanced search with multiple criteria 