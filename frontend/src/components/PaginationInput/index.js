import React from 'react';
import { PrimaryButton } from '../Button';

import arrowLeftIcon from '../../assets/arrow-left.svg';
import arrowRightIcon from '../../assets/arrow-right.svg';
import './style.css';

export default function PaginationInput(props) {

    function goToNextPage() {
        props.setPage(props.page + 1);
    }

    function goToPreviousPage() {
        props.setPage(props.page - 1);
    }

    let previousButtonDisabled = props.page <= 1;
    let nextButtonDisabled = props.page >= props.numberOfPages;    

    return (
        <div className="pagination-group">
            <div>
                <PrimaryButton 
                    disabled={previousButtonDisabled}
                    onClick={goToPreviousPage} 
                    icon={arrowLeftIcon}/>
            </div>
            <div className="pagination-text">
                Página {props.page} de {props.numberOfPages}
            </div>
            <div>
                <PrimaryButton 
                    disabled={nextButtonDisabled}
                    onClick={goToNextPage} 
                    icon={arrowRightIcon}/>
            </div>
        </div>
    );
}