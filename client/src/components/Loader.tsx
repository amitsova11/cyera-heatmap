import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export const Loader = () => {
  return (
    <div
      style={{
        minHeight: '240px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
      }}
    >
      <CircularProgress color="secondary" />
      <Typography variant="body1">Loading data...</Typography>
    </div>
  );
};
