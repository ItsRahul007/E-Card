'use client';

import React from 'react';
import {
    Menu,
    Transition,
} from '@headlessui/react';
import classNames from '@/lib/util/classNames';
import Link from 'next/link';

const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '/seller/dashboard/settings' },
    { name: 'Sign out', href: '/logout' },
]

interface I_UserProfile {
    userAvatar: string;
}

const UserProfile: React.FC<I_UserProfile> = ({ userAvatar }) => {
    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <Menu.Button className="relative flex rounded-full bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                    <img className="h-8 w-8 rounded-full" src={ userAvatar } alt="" />
                </Menu.Button>
            </div>
            <Transition
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    { userNavigation.map((item) => (
                        <Menu.Item key={ item.href + 'user-profile-dropdown' }>
                            { ({ focus }: any) => (
                                <Link
                                    href={ item.href }
                                    className={ classNames(
                                        focus ? 'bg-zinc-100' : '',
                                        'block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50'
                                    ) }
                                >
                                    { item.name }
                                </Link>
                            ) }
                        </Menu.Item>
                    )) }
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default UserProfile;