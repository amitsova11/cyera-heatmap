import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export const Loader = () => {
  return (
    <div className="loader">
      <CircularProgress color="secondary" />
      <Typography variant="body1">Loading data...</Typography>
    </div>
  );
};
