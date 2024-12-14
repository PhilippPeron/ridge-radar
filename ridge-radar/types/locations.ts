export interface Locations {
    last_modified: string;
    format_version: number;
    locations: Location[];
}

export interface Location {
    id: number;
    display_name: string;
    name: string;
    country: string;
    elevation: number;
    latitude: number;
    longitude: number;
    activities: string[];
    description: string;
}
