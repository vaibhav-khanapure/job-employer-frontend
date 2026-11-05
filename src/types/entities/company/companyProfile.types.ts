export interface CompanyProfile {
    profile_top: CompanyProfileTop;
    company_info: CompanyInfo;
    description: string | null;
    contact_and_address: CompanyContactAndAddress;
    social_medias: CompanySocialMedia[];
    benefits: CompanyBenefit[];
    facilities: CompanyFacility[];
    gallery: CompanyGalleryItem[];
}

export interface CompanyProfileTop {
    name: string;
    slug: string;
    tagline: string | null;
    logo_url: string | null;
}

export interface CompanyInfo {
    website: string | null;
    industry: string | null;
    company_type: string | null;
    founded_year: number | null;
    headquarters: string | null;
    employee_count: number | null;
}

export interface CompanyContactAndAddress {
    phone: string | null;
    address: string | null;
    contact_email: string | null;
}

export interface CompanySocialMedia {
    id: number;
    logo_url: string | null;
    name: string;
    url: string;
}

export interface CompanyBenefit {
    id: number;
    title: string;
    description: string | null;
}

export interface CompanyFacility {
    id: number;
    title: string;
    description: string | null;
}

export interface CompanyGalleryItem {
    id: number;
    url: string;
    sort_order: number;
}