export interface Link {
    id: number;
    title: string;
    urls: {
        official: string;
        package: string;
        github: string;
    };
    bookmark: boolean;
    updated_at: string;
    created_at: string;
    og_data: {
        title: string;
        favicon: string;
        description: string;
        thumbnail_url: string;
    };
}
