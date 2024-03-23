import classNames from '@/lib/util/classNames';
import Link from 'next/link';
import React, { FC } from 'react';

interface I_SubLinks {
    headerText: string;
    closeSlider: () => void;
    headerIcon: React.ReactElement;
    subLinks: {
        text: string;
        link: string;
    }[];
    isSlider?: boolean;
};

const SubLinks: FC<I_SubLinks> = ({ closeSlider, headerText, headerIcon, subLinks, isSlider }) => {
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
                        onClick={ closeSlider }
                        href={ obj.link }
                        className={ classNames(
                            'cursor-pointer py-2 w-full text-sm',
                            isSlider ? 'hover:text-appTheme-500'
                                : "hover:bg-appTheme-50 hover:text-appTheme-700"
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