import { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Toggable = forwardRef(({ children, buttonLabel }, ref) => {

    //Use state
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => setVisible(!visible);

    //Elementos que van a estar disponiibles para llamarlos fuera del componente
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    });

    return (
        <div className="toggable">
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>

            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>Cerrar</button>
            </div>
        </div>
    );
})

//PropTypes
Toggable.displayName = 'Toggable DisplayLabel'
Toggable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Toggable;