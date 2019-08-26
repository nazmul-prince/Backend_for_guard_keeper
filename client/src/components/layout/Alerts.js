import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';

const Alerts = props => {

    const alertContext = useContext(AlertContext);
    const { alerts } = alertContext;

    return (
        alerts.length > 0 && alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
               <i className="fas fa-info-circle" /> {alert.msg} 
            </div>
        ))
    )
}

Alerts.propTypes = {

};

export default Alerts;
