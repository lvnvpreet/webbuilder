export interface WebsiteFormData {
  websiteType: string;
  websiteName: string; // Added website name field
  designStyle: string;
  primaryColor: string;
  secondaryColor: string;
  fontChoice: string;
  pageCount: string;
  customPageCount?: string; // Added optional custom page count field
  keyFeatures: string[];
  cmsRequired: string;
  seoOptimization: string;
  hostingOption: string;
}