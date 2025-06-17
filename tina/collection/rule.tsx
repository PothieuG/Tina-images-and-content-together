import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Collection } from 'tinacms';

const RuleCollection: Collection = {
    label: 'Rules',
    name: 'rule',
    path: 'content/rules',
    format: 'mdx',
    ui: {
        router: ({ document }) => {
            return `/rules/${document._sys.breadcrumbs.join('/')}`;
        },
        filename: {
            showFirst: true,
            slugify: (values) => {
                const directoryName = values.title?.toLowerCase().split(' ').join('-');
                return `${directoryName}/rule`;
            },
        },
    },
    fields: [
        {
            type: 'string',
            label: 'Title',
            name: 'title',
            isTitle: true,
            required: true,
        },
        { type: 'datetime', name: 'date', label: 'Date', required: true },
        {
            type: 'reference',
            label: 'Author',
            name: 'author',
            collections: ['author'],
            ui: {
                optionComponent: (
                    props: {
                        name?: string;
                        avatar: string;
                    },
                    _internalSys: { path: string }
                ) => {
                    const { name, avatar } = props;
                    if (!name) return _internalSys.path;

                    return (
                        <p className='flex min-h-8 items-center gap-4'>
                            <Avatar>
                                {avatar && <AvatarImage src={avatar} alt={`${name} Profile`} />}
                                <AvatarFallback>
                                    {name
                                        .split(' ')
                                        .map((part) => part[0]?.toUpperCase() || '')
                                        .join('')}
                                </AvatarFallback>
                            </Avatar>
                            {name}
                        </p>
                    );
                },
            },
        },
        {
            type: 'object',
            label: 'Tags',
            name: 'tags',
            list: true,
            fields: [
                {
                    type: 'reference',
                    label: 'Tag',
                    name: 'tag',
                    collections: ['tag'],
                    ui: {
                        optionComponent: (
                            props: {
                                name?: string;
                            },
                            _internalSys: { path: string }
                        ) => props.name || _internalSys.path,
                    },
                },
            ],
            ui: {
                itemProps: (item) => {
                    return { label: item?.tag };
                },
            },
        },
        {
            type: 'rich-text',
            label: 'Body',
            name: '_body',
            templates: [],
            isBody: true,
        },
    ],
};

export default RuleCollection;
