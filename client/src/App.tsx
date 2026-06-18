import { useEffect, useState } from 'react';
import './styles.css';
import { Heatmap } from './components/Heatmap';
import { YearPicker } from './components/YearPicker';
import { CloudPrivderSelect } from './components/CloudPrivderSelect';
import { api } from './services/api';
import { CloudProviderDto } from '../../common/dtos/cloud-provider.dto';
import { ScanDto } from '../../common/dtos/scan.dto';
import { ApiError } from './types/api';
import { ErrorScreen } from './components/ErrorScreen';

export default function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [cloudProviders, setCloudProviders] = useState<CloudProviderDto[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [scans, setScans] = useState<ScanDto[]>([]);
  const [error, setError] = useState<ApiError>();

  const fetchCloudProviders = async () => {
    const response = await api.getCloudProviders();
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setCloudProviders(response.data);
    }
  };

  const fetchScans = async () => {
    const startDate = new Date(year, 0, 1).toISOString();
    const endDate = new Date(year + 1, 0, 1).toISOString();
    
    const response = await api.getScans({
      startDate,
      endDate,
      cloudProvidersIds: selectedProviders.length ? selectedProviders : undefined
    });

    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setScans(response.data);
    }
  };

  useEffect(() => {
    fetchCloudProviders();
  }, []);

  useEffect(() => {
    fetchScans();
  }, [year, selectedProviders]);

  const handleRetry = () => {
    setError(undefined);
    fetchCloudProviders();
    fetchScans();
  };

  return (
    <div className="app">
      <div className="filters">
        <YearPicker
          value={year}
          onChange={setYear}
          disableFuture
        />
        <CloudPrivderSelect
          options={cloudProviders.map(provider => ({
            displayName: provider.displayName,
            value: provider.id
          }))}
          onChange={setSelectedProviders}
          selectedOptions={selectedProviders}
        />
      </div>
      {error ? (
        <ErrorScreen message={error.message} onRetry={handleRetry} />
      ) : (
        <Heatmap scans={scans} />
      )}
    </div>
  );
}