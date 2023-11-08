export type ScribbleApiKeys = {
    hashnode?: {
        key: string;
        username: string;
    };
    devto?: {
        key: string;
        username: string;
    };
    medium?: {
        key: string;
        username: string;
    }
    github?: {
        key: string;
        username: string;
    }
};


/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
type BaseCollectionRecord = {
    id: string;
    created: string;
    updated: string;
};

// https://pocketbase.io/docs/collections/#auth-collection
type AuthCollectionRecord = {
    id: string;
    created: string;
    updated: string;
    username: string;
    email: string;
    emailVisibility: boolean;
    verified: boolean;
};

// https://pocketbase.io/docs/collections/#view-collection
type ViewCollectionRecord = {
    id: string;
};

// utilities

type MaybeArray<T> = T | T[];

// ===== scribble_posts =====

export type ScribblePostsResponse = {
    title?: string;
    content?: string;
    contentMarkdown?: string;
    user_id?: string;
    status?: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'REPUBLISHED';
    tags?:string;
    publishingDetails?: any;
    devToArticleCoverImagePath?: string;
    devToArticleId?: string;
    devToBlogUrl?: string;
    hashNodeArticleCoverImagePath?: string;
    hashNodeArticleId?: string;
    hashNodeBlogUrl?: string;
    last_published_at?: string;
    mediumArticleId?: string;
    mediumBlogUrl?: string;
    post_media?: Array<string>;
    main_post_image?: string;
    description?: string;
    series?: string;
    published_at?: string;
} & BaseCollectionRecord;

export type ScribblePostsCreate = {
    title?: string;
    content?: string;
    contentMarkdown?: string;
    user_id?: string;
    status?: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'REPUBLISHED';
    tags?:string;
    publishingDetails?: any;
    devToArticleCoverImagePath?: string | URL;
    devToArticleId?: string;
    devToBlogUrl?: string | URL;
    hashNodeArticleCoverImagePath?: string | URL;
    hashNodeArticleId?: string;
    hashNodeBlogUrl?: string | URL;
    last_published_at?: string | Date;
    mediumArticleId?: string;
    mediumBlogUrl?: string | URL;
    post_media?: MaybeArray<string>;
    main_post_image?: string;
    description?: string;
    series?: string;
    published_at?: string | Date;
};

export type ScribblePostsUpdate = {
    title?: string;
    content?: string;
    contentMarkdown?: string;
    user_id?: string;
    status?: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'REPUBLISHED';
    tags?:string;
    publishingDetails?: any;
    devToArticleCoverImagePath?: string | URL;
    devToArticleId?: string;
    devToBlogUrl?: string | URL;
    hashNodeArticleCoverImagePath?: string | URL;
    hashNodeArticleId?: string;
    hashNodeBlogUrl?: string | URL;
    last_published_at?: string | Date;
    mediumArticleId?: string;
    mediumBlogUrl?: string | URL;
    post_media?: MaybeArray<string>;
    'post_media-'?: MaybeArray<string>;
    main_post_image?: string;
    description?: string;
    series?: string;
    published_at?: string | Date;
};

export type ScribblePostsCollection = {
    type: 'base';
    collectionId: '6itgi5d0trmi1yb';
    collectionName: 'scribble_posts';
    response: ScribblePostsResponse;
    create: ScribblePostsCreate;
    update: ScribblePostsUpdate;
    relations: {};
};

// ===== scribble_user =====

export type ScribbleUserResponse = {
    github_username?: string;
    linkedin_username?: string;
    country?: string;
    city?: string;
    phone?: string;
    langauges?: string;
    avatar?: string;
    about_me?: string;
    github_access_token?: string;
    keys?:ScribbleApiKeys;
} & AuthCollectionRecord;

export type ScribbleUserCreate = {
    github_username?: string;
    linkedin_username?: string;
    country?: string;
    city?: string;
    phone?: string;
    langauges?: string;
    avatar?: string;
    about_me?: string;
    github_access_token?: string;
    keys?:ScribbleApiKeys;
};

export type ScribbleUserUpdate = {
    github_username?: string;
    linkedin_username?: string;
    country?: string;
    city?: string;
    phone?: string;
    langauges?: string;
    avatar?: string;
    about_me?: string;
    github_access_token?: string;
    keys?:ScribbleApiKeys;
};

export type ScribbleUserCollection = {
    type: 'auth';
    collectionId: '51hjtt652zdrck6';
    collectionName: 'scribble_user';
    response: ScribbleUserResponse;
    create: ScribbleUserCreate;
    update: ScribbleUserUpdate;
    relations: {};
};

// ===== Schema =====

export type Schema = {
    scribble_posts: ScribblePostsCollection;
    scribble_user: ScribbleUserCollection;
};
