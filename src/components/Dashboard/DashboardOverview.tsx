import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, UserCheck, Activity } from 'lucide-react';

const mockStats = {
  master_admin: {
    totalUsers: 1247,
    totalOrganizations: 43,
    activeUsers: 1189,
    monthlyGrowth: 12.5
  },
  organization_admin: {
    totalUsers: 127,
    totalCustomers: 89,
    totalSuppliers: 34,
    activeUsers: 119
  },
  regular_user: {
    myTasks: 8,
    pendingApprovals: 3,
    recentActivities: 15,
    completedTasks: 42
  }
};

const recentActivities = [
  { id: 1, user: 'John Smith', action: 'Created new customer', time: '2 hours ago' },
  { id: 2, user: 'Jane Doe', action: 'Updated supplier information', time: '4 hours ago' },
  { id: 3, user: 'Mike Johnson', action: 'Completed task approval', time: '6 hours ago' },
  { id: 4, user: 'Sarah Wilson', action: 'Added new user to organization', time: '1 day ago' },
];

export const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) return null;

  const renderMasterAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.totalUsers')}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.master_admin.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{mockStats.master_admin.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.totalOrganizations')}
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.master_admin.totalOrganizations}</div>
            <p className="text-xs text-muted-foreground">
              +3 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.activeUsers')}
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.master_admin.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              95.3% active rate
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderOrganizationAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.organization_admin.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.organization_admin.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.organization_admin.totalSuppliers}</div>
            <p className="text-xs text-muted-foreground">+1 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.organization_admin.activeUsers}</div>
            <p className="text-xs text-muted-foreground">93.7% active</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRegularUserDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Tasks</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.regular_user.myTasks}</div>
            <p className="text-xs text-muted-foreground">2 due today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.regular_user.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.regular_user.recentActivities}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.regular_user.completedTasks}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('nav.dashboard')}</h2>
        <p className="text-muted-foreground">
          {t('dashboard.welcome')}, {user.first_name}! Here's what's happening today.
        </p>
      </div>

      {user.user_type === 'admin' && renderMasterAdminDashboard()}
      {user.user_type === 'organization' && renderOrganizationAdminDashboard()}
      {user.user_type === 'user' && renderRegularUserDashboard()}

      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <div className="text-sm text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};