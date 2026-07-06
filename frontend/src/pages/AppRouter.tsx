import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { lazy, Suspense } from 'react'

// Lazy load pages
const LoginPage = lazy(() => import('./LoginPage'))
const RegisterPage = lazy(() => import('./RegisterPage'))
const DashboardPage = lazy(() => import('./DashboardPage'))
const DevicesPage = lazy(() => import('./DevicesPage'))
const DeviceDetailPage = lazy(() => import('./DeviceDetailPage'))
const FilesPage = lazy(() => import('./FilesPage'))
const NotificationsPage = lazy(() => import('./NotificationsPage'))
const SettingsPage = lazy(() => import('./SettingsPage'))
const AIPage = lazy(() => import('./AIPage'))
const AdminPage = lazy(() => import('./AdminPage'))

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
)

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/devices" element={
          <ProtectedRoute>
            <DevicesPage />
          </ProtectedRoute>
        } />
        <Route path="/devices/:deviceId" element={
          <ProtectedRoute>
            <DeviceDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/files" element={
          <ProtectedRoute>
            <FilesPage />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        <Route path="/ai" element={
          <ProtectedRoute>
            <AIPage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default AppRouter
