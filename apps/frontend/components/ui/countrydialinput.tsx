"use client"

import * as React from "react"
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover' 
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command'
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import ReactCountryFlag from 'react-country-flag'
import { getCountries } from '@/app/utils/countries'

const countries = getCountries();
const US_COUNTRY = countries.find(c => c.countryCode === 'US')!;

interface CountryDialInputProps {
  onChange?: (value: string) => void;
}

const CountryDialInput: React.FC<CountryDialInputProps> = ({ onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState<typeof countries[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (selectedCountry) {
      onChange?.(value ? `${selectedCountry.dialCode}${value}` : '');
    }
  };

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setIsOpen(false);
    if (phoneNumber) {
      onChange?.(`${country.dialCode}${phoneNumber}`);
    }
  };

  useEffect(() => {
    const detectCountry = async () => {
      const cached = localStorage.getItem('userCountry');
      if (cached) {
        const country = countries.find(c => c.countryCode === cached);
        if (country) {
          handleCountrySelect(country);
          return;
        }
      }

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout after 2s')), 2000)
      );

      try {
        const response = await Promise.race([
          fetch('https://ipapi.co/json/'),
          timeoutPromise
        ]) as Response;
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const country = countries.find(c => c.countryCode === data.country);
        if (country) {
          localStorage.setItem('userCountry', country.countryCode);
          handleCountrySelect(country);
        } else {
          handleCountrySelect(US_COUNTRY);
        }
      } catch {
        handleCountrySelect(US_COUNTRY);
      }
    };
    detectCountry();
  }, []); // Only run on mount

  if (!selectedCountry) return null;

  return (
    <div className="relative flex items-center">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="flex h-10 items-center rounded-l-md border border-gray-200 bg-white px-4 pr-7"
          >
            <ReactCountryFlag 
              countryCode={selectedCountry.countryCode} 
              svg 
              className="mr-2"
              style={{
                width: '1.5em',
                height: '1.5em',
              }}
            />
            <span className="text-sm">{selectedCountry.dialCode}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search countries..." />
            <CommandList>
              {countries.map((country) => (
                <CommandItem 
                  key={country.countryCode} 
                  onSelect={() => handleCountrySelect(country)}
                >
                  <ReactCountryFlag 
                    countryCode={country.countryCode} 
                    svg 
                    className="mr-2 ml-2" 
                    style={{
                      width: '1.5em',
                      height: '1.5em',
                    }}
                  />
                  {country.name} ({country.dialCode})
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder="Phone number"
        className="h-10 rounded-l-none border-l-0"
      />
    </div>
  );
};

export default CountryDialInput; 