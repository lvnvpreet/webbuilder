import React from "react";
import { Wizard } from "./components/wizard";
import { WebsiteFormData } from "./types/website-form";
import toast from 'react-hot-toast';

export default function App() {
  const [formData, setFormData] = React.useState<WebsiteFormData>({
    websiteType: "",
    websiteName: "",
    designStyle: "",
    primaryColor: "",
    secondaryColor: "",
    fontChoice: "",
    pageCount: "",
    customPageCount: "",
    keyFeatures: [],
    cmsRequired: "",
    seoOptimization: "",
    hostingOption: "",
  });

  const handleFormDataChange = (field: keyof WebsiteFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted with data:", formData);
    toast.success("Your website configuration has been saved.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-content1 to-content2 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Website Configuration Wizard</h1>
          <p className="text-default-600">Let's build your perfect website, one step at a time.</p>
        </div>
        
        <Wizard 
          formData={formData} 
          onFormDataChange={handleFormDataChange} 
          onSubmit={handleSubmit} 
        />
      </div>
    </div>
  );
}