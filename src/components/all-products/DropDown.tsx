"use client";

import React, { useState } from 'react';

interface I_Dropdown {
    value: number;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<I_Dropdown> = ({ handleSelectChange, value }) => {
    return (
        <div className='h-fit w-fit'>
            <select
                value={ value }
                onChange={ handleSelectChange }
                className='py-2 pr-10 pl-2 rounded border duration-200 focus:outline-blue-500 cursor-pointer'
            >
                <option value={ 1 }>1</option>
                <option value={ 2 }>2</option>
                <option value={ 3 }>3</option>
                <option value={ 4 }>4</option>
            </select>
        </div>
    );
};

export default Dropdown;
