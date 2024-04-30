import classNames from '@/lib/util/classNames';
import Link from 'next/link';
import React, { FC } from 'react';

type T_CurrentTab = '/profile' | '/profile/addresses' | '/profile/orders' | '/profile/coupons' | '/profile/review';

interface I_SubLinks {
    headerText: string;
    closeSlider: () => void;
    headerIcon: React.ReactElement;
    subLinks: {
        text: string;
        link: T_CurrentTab;
    }[];
    isSlider?: boolean;
    currentTab?: T_CurrentTab;
};

const SubLinks: FC<I_SubLinks> = ({ closeSlider, headerText, headerIcon, subLinks, isSlider, currentTab }) => {
    return (
        <div className='h-auto w-full border-b'>
            <div>
                <h3 className={ classNames(
                    "uppercase py-3 flex items-center",
                    isSlider ? 'text-slate-100'
                        : "text-zinc-500"
                ) }>
                    <span className='text-xl text-appTheme-600 px-3'>
                        { headerIcon }
                    </span>
                    <span className='font-medium text-base'>{ headerText }</span>
                </h3>
            </div>
            <div className='h-auto w-full flex flex-col capitalize items-center pb-2'>
                { subLinks.map(obj =>
                    <Link
                        key={ obj.link }
                        onClick={ () => closeSlider() }
                        href={ obj.link }
                        className={ classNames(
                            'cursor-pointer py-2 w-full text-sm duration-150 mb-1',
                            isSlider ? 'hover:text-appTheme-500 bg-opacity-5 hover:bg-appTheme-50 hover:bg-opacity-5'
                                : "hover:bg-appTheme-50 hover:text-appTheme-700",
                            currentTab === obj.link ? 'bg-appTheme-50 !text-appTheme-600' : ''
                        ) }
                    >
                        <span className='pl-7'>{ obj.text }</span>
                    </Link>
                ) }
            </div>
        </div>
    )
}

export default SubLinks;