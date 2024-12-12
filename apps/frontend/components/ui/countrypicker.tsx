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

const CountryPicker: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<typeof countries[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = countries.find(c => c.countryCode === data.country);
        setSelectedCountry(country || US_COUNTRY);
      } catch (error) {
        setSelectedCountry(US_COUNTRY);
      }
    };
    detectCountry();
  }, []);

  if (!selectedCountry) return null;  // Don't render anything until we have a country

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
                  onSelect={() => {
                    setSelectedCountry(country);
                    setIsOpen(false);
                  }}
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
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone number"
        className="h-10 rounded-l-none border-l-0"
      />
    </div>
  );
};

export default CountryPicker;
