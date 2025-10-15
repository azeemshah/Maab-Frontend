import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Plus, Search } from 'lucide-react';
import { Organization } from '@/contexts/AuthContext';
import { MainLayout } from '@/layout';

// Mock organizations data
const mockOrganizations: Organization[] = [];

export const OrganizationManagement: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{t('organizations.title')}</h2>
            <p className="text-muted-foreground">
              {t('organizations.subtitle')}
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t('organizations.addOrganization')}
          </Button>
        </div>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('common.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('organizations.name')}</TableHead>
                  <TableHead>{t('organizations.description')}</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>{t('organizations.website')}</TableHead>
                  <TableHead>{t('users.status')}</TableHead>
                  <TableHead>{t('users.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                
              </TableBody>
            </Table>
            
            {mockOrganizations.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No organizations found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};