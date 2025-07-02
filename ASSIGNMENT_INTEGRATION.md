# Assignment Management Integration Guide

This document explains how to integrate the frontend assignment system with your NestJS backend.

## Backend Setup Requirements

Make sure your NestJS backend is running on **port 8000** with the following endpoints:

### Assignment Controller Endpoints

1. **POST /assignments** - Create assignment with file uploads
   - Accepts multipart/form-data
   - Fields: title, description, courseId, dueDate, totalMarks, status, instructions
   - Files: attachments[] (up to 10 files, max 10MB each)

2. **GET /assignments** - Get all assignments
   - Optional query parameter: courseId

3. **GET /assignments/:id** - Get single assignment

4. **PATCH /assignments/:id** - Update assignment

5. **DELETE /assignments/:id** - Delete assignment

6. **POST /assignments/upload** - Alternative file upload endpoint
   - Accepts multipart/form-data
   - Files field: files[]

### Course Endpoints

1. **GET /courses** - Get all courses (for dropdown)
   - Returns: Array of {id, title, description?, instructor?}

## File Upload Configuration

Your backend should be configured to handle file uploads with these specifications:

```typescript
// File storage configuration example
export const fileStorageConfig = {
  dest: './uploads',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 10 // max 10 files
  },
  fileFilter: (req, file, cb) => {
    // Allow PDF, DOCX, and image files
    const allowedTypes = /\.(pdf|docx?|jpe?g|png|gif)$/i;
    if (allowedTypes.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
};
```

## Frontend Features

### Enhanced Assignment Creation
- ✅ Real-time backend connectivity check
- ✅ Course dropdown populated from backend API
- ✅ File upload with validation (max 10MB per file)
- ✅ Progress indicators and error handling
- ✅ Success feedback with auto-redirect
- ✅ Drag-and-drop file upload interface
- ✅ File size and type display
- ✅ Fallback to mock data when backend is unavailable

### API Integration Features
- ✅ Comprehensive error handling with user-friendly messages
- ✅ Proper TypeScript interfaces matching your DTOs
- ✅ FormData handling for multipart file uploads
- ✅ Connection status indicators
- ✅ Retry logic and fallback mechanisms

## Running the Application

1. **Start your NestJS backend** on port 8000
2. **Start the frontend** development server
3. **Navigate** to `/dashboard/lecturer/assignments/create`

The application will automatically detect if your backend is running and show connection status.

## Testing the Integration

1. **Create Assignment**: Fill out the form and upload files
2. **View Assignments**: Check `/dashboard/lecturer/assignments` to see created assignments
3. **Backend Verification**: Check your backend logs for incoming requests
4. **File Storage**: Verify files are saved in your configured upload directory

## Troubleshooting

### Backend Not Connected
- Verify your NestJS server is running on port 8000
- Check CORS configuration allows requests from your frontend
- Ensure all required endpoints are implemented

### File Upload Issues
- Check file size limits (max 10MB per file)
- Verify file type restrictions
- Ensure proper multipart/form-data handling in your controller

### TypeScript Errors
- Make sure all DTOs match the interfaces in the service
- Verify proper export/import statements
- Check for any missing dependencies

## Example Backend Controller

Your AssignmentsController should look similar to:

```typescript
@Controller('assignments')
export class AssignmentsController {
  @Post()
  @UseInterceptors(FilesInterceptor('attachments'))
  async create(
    @Body() createAssignmentDto: CreateAssignmentDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.assignmentsService.createWithFiles(createAssignmentDto, files);
  }

  @Get()
  findAll(@Query('courseId') courseId?: string) {
    if (courseId) {
      return this.assignmentsService.findByCourseId(courseId);
    }
    return this.assignmentsService.findAll();
  }
  
  // ... other endpoints
}
```

This integration provides a professional, production-ready assignment management system with proper error handling, file uploads, and real-time feedback.
