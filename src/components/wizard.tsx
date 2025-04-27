import React from "react";
import { 
  Accordion, 
  AccordionItem, 
  Button, 
  Input, 
  Select, 
  SelectItem, 
  Checkbox, 
  CheckboxGroup,
  Card,
  CardBody,
  addToast
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { WebsiteFormData } from "../types/website-form";
import { formOptions } from "../data/form-options";

interface WizardProps {
  formData: WebsiteFormData;
  onFormDataChange: (field: keyof WebsiteFormData, value: any) => void;
  onSubmit: () => void;
}

export const Wizard: React.FC<WizardProps> = ({ formData, onFormDataChange, onSubmit }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [selectedKeys, setSelectedKeys] = React.useState<Set<React.Key>>(new Set([`${currentStep}`]));
  const [isComplete, setIsComplete] = React.useState(false);

  const steps = [
    { id: "websiteType", label: "Website Type", required: true },
    { id: "websiteName", label: "Website Name", required: true },
    { id: "designStyle", label: "Design Style", required: true },
    { id: "primaryColor", label: "Primary Color", required: true },
    { id: "secondaryColor", label: "Secondary Color", required: true },
    { id: "fontChoice", label: "Font Choice", required: true },
    { id: "pageCount", label: "Page Count", required: true },
    { id: "keyFeatures", label: "Key Features", required: true },
    { id: "cmsRequired", label: "CMS Required", required: true },
    { id: "seoOptimization", label: "SEO Optimization", required: true },
    { id: "hostingOption", label: "Hosting Option", required: true },
  ];

  const isStepComplete = (stepIndex: number) => {
    const step = steps[stepIndex];
    const fieldName = step.id as keyof WebsiteFormData;
    const value = formData[fieldName];
    
    if (!step.required) return true;
    
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    
    if (fieldName === "pageCount" && value === "custom") {
      return !!formData.customPageCount;
    }
    
    return !!value;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setSelectedKeys(new Set([`${nextStep}`]));
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setSelectedKeys(new Set([`${prevStep}`]));
    }
  };

  const handleSelectionChange = (keys: Set<React.Key>) => {
    const newKey = Array.from(keys)[0];
    const newStep = parseInt(newKey as string);
    
    if (isStepComplete(currentStep) || newStep < currentStep) {
      setSelectedKeys(keys);
      setCurrentStep(newStep);
    } else {
      setSelectedKeys(new Set([`${currentStep}`]));
    }
  };

  const renderStepContent = (stepIndex: number) => {
    const step = steps[stepIndex];
    const fieldName = step.id as keyof WebsiteFormData;
    const options = formOptions[fieldName as keyof typeof formOptions] || [];

    switch (fieldName) {
      case "websiteName":
        return (
          <div className="space-y-4 max-w-md mx-auto">
            <h3 className="text-xl font-medium text-default-800 mb-4">What is your website name?</h3>
            <Input
              label="Website Name"
              placeholder="Enter your website name"
              value={formData.websiteName}
              onChange={(e) => onFormDataChange("websiteName", e.target.value)}
              className="w-full"
            />
          </div>
        );
        
      case "websiteType":
        return (
          <div className="space-y-4 max-w-md mx-auto">
            <h3 className="text-xl font-medium text-default-800 mb-4">What type of website do you need?</h3>
            <div className="grid grid-cols-1 gap-3">
              {options.map((option) => (
                <Card 
                  key={option.value}
                  isPressable
                  onPress={() => onFormDataChange(fieldName, option.value)}
                  className={`border-2 ${
                    formData[fieldName] === option.value 
                      ? "border-primary bg-primary-50" 
                      : "border-default-200"
                  }`}
                >
                  <CardBody className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData[fieldName] === option.value 
                          ? "border-primary" 
                          : "border-default-300"
                      }`}>
                        {formData[fieldName] === option.value && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case "designStyle":
      case "fontChoice":
      case "cmsRequired":
      case "seoOptimization":
      case "hostingOption":
        return (
          <div className="space-y-4 max-w-md mx-auto">
            <h3 className="text-xl font-medium text-default-800 mb-4">
              {`What ${step.label.toLowerCase()} would you prefer?`}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {options.map((option) => (
                <Card 
                  key={option.value}
                  isPressable
                  onPress={() => onFormDataChange(fieldName, option.value)}
                  className={`border-2 ${
                    formData[fieldName] === option.value 
                      ? "border-primary bg-primary-50" 
                      : "border-default-200"
                  }`}
                >
                  <CardBody className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData[fieldName] === option.value 
                          ? "border-primary" 
                          : "border-default-300"
                      }`}>
                        {formData[fieldName] === option.value && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case "pageCount":
        return (
          <div className="space-y-4 max-w-md mx-auto">
            <h3 className="text-xl font-medium text-default-800 mb-4">How many pages do you need?</h3>
            <div className="grid grid-cols-1 gap-3">
              {options.map((option) => (
                <Card 
                  key={option.value}
                  isPressable
                  onPress={() => onFormDataChange(fieldName, option.value)}
                  className={`border-2 ${
                    formData[fieldName] === option.value 
                      ? "border-primary bg-primary-50" 
                      : "border-default-200"
                  }`}
                >
                  <CardBody className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData[fieldName] === option.value 
                          ? "border-primary" 
                          : "border-default-300"
                      }`}>
                        {formData[fieldName] === option.value && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
            
            {formData.pageCount === "custom" && (
              <div className="mt-4">
                <Input
                  type="number"
                  label="Custom Page Count"
                  placeholder="Enter number of pages"
                  value={formData.customPageCount}
                  onChange={(e) => onFormDataChange("customPageCount", e.target.value)}
                  min={1}
                  className="w-full"
                />
              </div>
            )}
          </div>
        );
      
      case "primaryColor":
      case "secondaryColor":
        return (
          <div className="space-y-4 max-w-md mx-auto">
            <h3 className="text-xl font-medium text-default-800 mb-4">
              {`Choose your ${step.label.toLowerCase()} for the website`}
            </h3>
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-16 h-16 rounded-full border-2 ${
                    formData[fieldName] === option.value 
                      ? "border-black dark:border-white ring-2 ring-primary" 
                      : "border-default-200"
                  }`}
                  style={{ backgroundColor: option.value }}
                  onClick={() => onFormDataChange(fieldName, option.value)}
                  aria-label={option.label}
                >
                  {formData[fieldName] === option.value && (
                    <Icon 
                      icon="lucide:check" 
                      className="text-white mx-auto" 
                      width={24}
                      style={{
                        filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.5))"
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            <Input
              type="text"
              label="Or enter a custom color (hex code)"
              placeholder="#RRGGBB"
              value={formData[fieldName] as string}
              onChange={(e) => onFormDataChange(fieldName, e.target.value)}
              className="w-full"
            />
          </div>
        );
      
      case "keyFeatures":
        return (
          <div className="space-y-4 max-w-md mx-auto">
            <h3 className="text-xl font-medium text-default-800 mb-4">Which key features would you like?</h3>
            <CheckboxGroup
              value={formData.keyFeatures}
              onValueChange={(values) => onFormDataChange("keyFeatures", values)}
              className="gap-3"
            >
              {options.map((option) => (
                <Checkbox key={option.value} value={option.value} className="p-2">
                  {option.label}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderSummary = () => {
    return (
      <div className="space-y-6 p-4 bg-content1 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-primary">Your Website Configuration</h2>
        
        {steps.map((step) => {
          const fieldName = step.id as keyof WebsiteFormData;
          const value = formData[fieldName];
          
          if (fieldName === "customPageCount") return null;
          
          return (
            <div key={step.id} className="space-y-1">
              <h3 className="text-sm font-medium text-default-500">{step.label}</h3>
              {Array.isArray(value) ? (
                <div className="font-medium text-default-800">
                  {value.length > 0 
                    ? value.map(v => {
                        const option = formOptions[fieldName as keyof typeof formOptions]?.find(opt => opt.value === v);
                        return option ? option.label : v;
                      }).join(", ")
                    : "None selected"}
                </div>
              ) : (
                <div className="font-medium text-default-800">
                  {fieldName.includes("Color") ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: value as string }}></span>
                      {value || "Not selected"}
                    </div>
                  ) : fieldName === "pageCount" && value === "custom" ? (
                    `Custom: ${formData.customPageCount} pages`
                  ) : (
                    (() => {
                      if (fieldName === "websiteName") {
                        return value || "Not provided";
                      }
                      
                      const option = formOptions[fieldName as keyof typeof formOptions]?.find(opt => opt.value === value);
                      return option ? option.label : (value || "Not selected");
                    })()
                  )}
                </div>
              )}
            </div>
          );
        })}
        
        <div className="pt-4">
          <Button color="primary" onPress={onSubmit} className="w-full">
            Submit Configuration
          </Button>
          <Button 
            variant="flat" 
            onPress={() => {
              setIsComplete(false);
              setCurrentStep(0);
              setSelectedKeys(new Set(["0"]));
            }}
            className="w-full mt-2"
          >
            Edit Configuration
          </Button>
        </div>
      </div>
    );
  };

  if (isComplete) {
    return renderSummary();
  }

  return (
    <div className="bg-content1 rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">
            Step {currentStep + 1} of {steps.length}
          </h2>
          <span className="text-default-500 text-sm">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-default-100 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="py-6">
        {renderStepContent(currentStep)}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="flat"
          onPress={handlePrevious}
          isDisabled={currentStep === 0}
          startContent={<Icon icon="lucide:arrow-left" />}
        >
          Previous
        </Button>
        
        <Button
          color="primary"
          onPress={handleNext}
          isDisabled={!isStepComplete(currentStep)}
          endContent={
            currentStep < steps.length - 1 ? (
              <Icon icon="lucide:arrow-right" />
            ) : (
              <Icon icon="lucide:check" />
            )
          }
        >
          {currentStep < steps.length - 1 ? "Next" : "Review"}
        </Button>
      </div>
    </div>
  );
};
