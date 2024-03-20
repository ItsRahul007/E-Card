"use client";

import React, { useState } from 'react';

const Dropdown: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<number>(1);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(Number(event.target.value));
    };

    return (
        <div className='h-fit w-fit'>
            <select
                value={ selectedOption }
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
