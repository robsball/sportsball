import countryCodes, { CountryProperty } from 'country-codes-list';

interface CountryData {
  code: string;
  name: string;
  countryCode: string;
  dialCode: string;
}

export const getCountries = (): CountryData[] => {
  const countryData = countryCodes.customList('countryCode' as CountryProperty, 
    '{countryNameEn}|{countryCallingCode}'  // Using pipe as separator
  );
  
  return Object.entries(countryData).map(([countryCode, data]) => {
    const [name, dialCode] = data.split('|');  // Split on pipe instead of space
    return {
      countryCode,
      name,
      dialCode,
      code: dialCode.replace(/[^0-9+]/g, '')
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}; 