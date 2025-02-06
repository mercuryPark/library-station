export interface Link {
    id: number;
    title: string;
    url: string;
    created_at: string;
    og_data: {
        title: string;
        favicon: string;
        description: string;
        thumbnail_url: string;
    };
}
