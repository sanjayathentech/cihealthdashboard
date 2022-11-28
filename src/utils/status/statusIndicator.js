import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CircleIcon from '@mui/icons-material/Circle';
import HelpIcon from '@mui/icons-material/Help';

// css
import './statusIndicator.css';

export const statusIndicator = (status) => {
    if (status == "Available") {
        return (<div className='status_alignment'>
            <CheckCircleIcon sx={{ color: 'green' }} /> &nbsp;
            <span className="avalilable"> {status}</span>
        </div>)
    } else if (status == "Unknown") {
        return (
            <div className='status_alignment'>
                <HelpIcon sx={{ color: '#a4a7ab' }} /> &nbsp;
                <span className="Unknown"> {status}</span>
            </div>)
    } else if (status == "Degraded") {
        return (
            <div className='status_alignment'>
                <CircleIcon sx={{ color: '#FFBF00' }} /> &nbsp;
                <span className="Degraded"> {status}</span>
            </div>
        )
    } else if (status == "Unavailable") {
        return (
            <div className='status_alignment'>
                <CancelIcon sx={{ color: 'red' }} /> &nbsp;
                <span className="Unavailable"> {status}</span>
            </div>
        )
    }
}