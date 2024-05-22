"use client";

import Button from '@/components/common/buttons/Button';
import InputWithLable from '@/components/common/inputs/InputWithLable';
import { invalidEmail } from '@/lib/util/apiMessages';
import isValidEmail from '@/lib/util/emailChecker';
import { invalidContactNo } from '@/lib/util/toastMessages';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BecomeSeller: React.FC = () => {
    const [brandName, setBrandName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [contactNumber, setContactNumber] = useState<string | number>('');
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        //* Perform form validation
        const checkEmailValidation = isValidEmail(email);
        const isValidNumber = contactNumber.toString().length === 10;

        if (agreed) {
            if (!checkEmailValidation || !isValidNumber) {
                !checkEmailValidation && toast.error(invalidEmail);
                !isValidNumber && toast.error(invalidContactNo);
                return;
            };

            // Handle form submission
            console.log({ brandName, email, contactNumber });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Become a Seller</h2>
            <form onSubmit={ handleSubmit }>
                <InputWithLable
                    name='brandName'
                    lable='Brand Name'
                    value={ brandName }
                    onChange={ (e) => setBrandName(e.target.value) }
                    required
                />
                <InputWithLable
                    name='email'
                    lable='Official Email'
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    required
                />
                <InputWithLable
                    name='contactNumber'
                    lable='Contact Number'
                    value={ contactNumber }
                    onChange={ (e) => setContactNumber(Number(e.target.value)) }
                    required
                    inputType='number'
                />
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={ agreed }
                            onChange={ (e) => setAgreed(e.target.checked) }
                            className="form-checkbox h-5 w-5 text-indigo-600"
                            required
                        />
                        <span className="ml-2 text-sm text-gray-700">
                            I agree to the{ ' ' }
                            <span className="text-indigo-600 underline cursor-pointer">
                                terms and conditions
                            </span>
                        </span>
                    </label>
                </div>
                <div>
                    <Button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        text='Submit'
                        disabled={ !agreed }
                    />
                </div>
            </form>
        </div>
    );
};

export default BecomeSeller;
