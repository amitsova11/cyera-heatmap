import { useEffect, useState } from 'react';
import './styles.css';
import { Heatmap } from './components/Heatmap';
import { Loader } from './components/Loader';
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
  const [isLoadingCloudProviders, setIsLoadingCloudProviders] = useState(false);
  const [isLoadingScans, setIsLoadingScans] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const isLoading = isLoadingCloudProviders || isLoadingScans;

  const fetchCloudProviders = async () => {
    setIsLoadingCloudProviders(true);
    try {
      const response = await api.getCloudProviders();
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setCloudProviders(response.data);
      }
    } finally {
      setIsLoadingCloudProviders(false);
    }
  };

  const fetchScans = async () => {
    setIsLoadingScans(true);
    try {
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
    } finally {
      setIsLoadingScans(false);
    }
  };

  useEffect(() => {
    fetchCloudProviders();
  }, []);

  useEffect(() => {
    fetchScans();
  }, [year, selectedProviders]);

  useEffect(() => {
    document.body.classList.toggle('light-mode', isLightMode);

    return () => {
      document.body.classList.remove('light-mode');
    };
  }, [isLightMode]);

  const handleRetry = () => {
    setError(undefined);
    fetchCloudProviders();
    fetchScans();
  };

  return (
    <div className={`app${isLightMode ? ' light-mode' : ''}`}>
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
        <button
          type="button"
          className="theme-toggle-image-button"
          onClick={() => setIsLightMode((current) => !current)}
          aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <img
            className="theme-toggle-image"
            src={isLightMode ? '/dark-mode.png' : '/light-mode.jpg'}
            alt={isLightMode ? 'Dark mode icon' : 'Light mode icon'}
            height={24}
            width={24}
          />
        </button>
      </div>
      <div className="heatmap-container">
        {error ? (
          <ErrorScreen message={error.message} onRetry={handleRetry} />
        ) : isLoading ? (
          <Loader />
        ) : (
          <Heatmap scans={scans} />
        )}
      </div>
    </div>
  );
}