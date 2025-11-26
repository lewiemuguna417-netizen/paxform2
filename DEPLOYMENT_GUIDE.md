# PAXFORM Frontend Deployment Guide

## Application Overview

The PAXFORM frontend is a React TypeScript application built with Vite that provides:
- **Admin Authentication System** - Secure login/logout functionality
- **Real-time Dashboard** - Live appointment management with WebSocket updates
- **Admin Management** - Create and manage admin users
- **Appointment Management** - View, filter, and update appointment statuses
- **Real-time Notifications** - Live status updates across the dashboard

## Backend Integration

The frontend is configured to connect to your production backend:
- **Backend URL**: `https://datascrapex-job3-1070255625225.us-central1.run.app`
- **Frontend URL**: `https://lewis-paxform.netlify.app`

### API Endpoints Used
- Authentication: `/api/v1/auth/login`, `/api/v1/auth/register`, `/api/v1/auth/profile`
- Appointments: `/api/v1/appointments` (CRUD operations)
- Admin Management: `/api/v1/users/admin`, `/api/v1/users/admin/all`
- WebSocket: Real-time updates via WebSocket connection

## Deployment Instructions

### Option 1: Manual Deployment via Netlify Dashboard

1. **Build the application**:
   ```bash
   cd PAXFORM/frontend
   npm install
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "Add new site" → "Deploy manually"
   - Drag and drop the `dist` folder to the deployment area
   - Or connect your Git repository and deploy automatically

3. **Configure Environment Variables**:
   In Netlify dashboard → Site settings → Environment variables:
   ```
   VITE_BACKEND_URL=https://datascrapex-job3-1070255625225.us-central1.run.app
   VITE_API_URL=https://datascrapex-job3-1070255625225.us-central1.run.app/api/v1
   VITE_DEV_MODE=false
   ```

4. **Custom Domain Setup**:
   - In Netlify dashboard → Site settings → Domain management
   - Add custom domain: `lewis-paxform.netlify.app`
   - Update your domain DNS settings if needed

### Option 2: Netlify CLI Deployment

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

## Features Testing Checklist

After deployment, verify these features work correctly:

### ✅ Authentication Features
- [ ] Login page accessible at `/admin/login`
- [ ] Successful login redirects to dashboard
- [ ] Invalid credentials show error message
- [ ] Logout functionality works
- [ ] Protected routes redirect to login when not authenticated

### ✅ Dashboard Features
- [ ] Dashboard loads at `/admin/dashboard`
- [ ] Real-time connection status indicator visible
- [ ] Appointment statistics display correctly
- [ ] WebSocket connection established (green indicator)
- [ ] WebSocket reconnection works (yellow indicator)

### ✅ Appointment Management
- [ ] Appointments table displays data from backend
- [ ] Status filtering works (All, Upcoming, Completed, Cancelled)
- [ ] Sorting by date works (Oldest/Newest first)
- [ ] Status changes update immediately via WebSocket
- [ ] View appointment details dialog works
- [ ] Empty state displays when no appointments

### ✅ Admin Management
- [ ] "Admin Management" tab accessible
- [ ] List of admin users displays
- [ ] "Create Admin" button opens dialog
- [ ] Create admin form validation works
- [ ] New admin user appears in list after creation
- [ ] Admin count updates in statistics

### ✅ Real-time Features
- [ ] Connection status shows "Connected" (green)
- [ ] Status changes reflect immediately across dashboard
- [ ] Toast notifications appear for status updates
- [ ] Admin creation notifications work
- [ ] WebSocket reconnection attempts (yellow indicator)

## API Integration Testing

Test these backend communications:

### Authentication Flow
1. **Login Test**:
   - Email: `admin@paxform.com`
   - Password: `admin123`
   - Verify token storage and user data

2. **Admin Creation Test**:
   - Create new admin with email: `newadmin@paxform.com`
   - Password: `newpass123`
   - Verify new admin appears in admin list
   - Login with new credentials

### Real-time Updates Test
1. **Status Update Test**:
   - Change appointment status from dashboard
   - Verify change appears immediately
   - Check WebSocket connection status

2. **Multiple Admin Test**:
   - Create multiple admin users
   - Verify all appear in admin list
   - Test login with different admin accounts

## Troubleshooting

### Common Issues

1. **Build Fails**:
   - Check Node.js version (requires 18+)
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

2. **WebSocket Connection Issues**:
   - Verify backend WebSocket server is running
   - Check CORS configuration on backend
   - Verify frontend URL in WebSocket connection

3. **API Connection Issues**:
   - Verify backend URL is accessible
   - Check CORS settings on backend
   - Verify environment variables are set correctly

4. **Authentication Issues**:
   - Clear browser localStorage and retry
   - Check backend authentication endpoint
   - Verify JWT token validation

### Debug Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Check for vulnerabilities
npm audit

# Lint code
npm run lint
```

## Environment Configuration

The application uses environment variables configured in:
- `.env.production` for production builds
- `netlify.toml` for Netlify deployment settings

### Key Environment Variables
- `VITE_BACKEND_URL`: Backend API URL
- `VITE_API_URL`: API endpoint base URL
- `VITE_DEV_MODE`: Development mode flag

## Security Features

- JWT token-based authentication
- Protected routes with admin requirement
- Automatic token refresh and validation
- Secure WebSocket connection with authentication
- CORS protection headers configured
- XSS and clickjacking protection headers

## Performance Optimizations

- Code splitting for vendor libraries
- Lazy loading of components
- WebSocket connection management with reconnection
- React Query for efficient data caching
- Optimized build with Vite bundler

---

**Ready for deployment!** Your PAXFORM frontend is configured and tested for production use with real backend connectivity and all requested features.