import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CircleIcon from '@mui/icons-material/Circle';
import HelpIcon from '@mui/icons-material/Help';

// css
import './statusIndicator.css';

export const statusIndicator = (status) => {
    if (status == "Available") {
        return (<div className='status_alignment'>
            <span className="avalilable"> {status}</span>
        </div>)
    } else if (status == "Unknown") {
        return (
            <div className='status_alignment'>
                <span className="Unknown"> {status}</span>
            </div>)
    } else if (status == "Degraded") {
        return (
            <div className='status_alignment'>
                <span className="Degraded"> {status}</span>
            </div>
        )
    } else if (status == "Unavailable") {
        return (
            <div className='status_alignment'>
                <span className="Unavailable"> {status}</span>
            </div>
        )
    }
}