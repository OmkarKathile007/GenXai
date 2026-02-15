import { ProtectedRoute } from '@/components/features/auth';

export default function DashboardLayout({
  children,
}) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}