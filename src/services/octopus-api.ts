import axios from 'axios';

const OCTOPUS_API_BASE_URL = 'https://api.octopus.energy';
const ACCOUNT_NUMBER = import.meta.env.VITE_OCTOPUS_ENERGY_ACCOUNT_NUMBER || 'A-C733EB22';
const API_KEY = import.meta.env.VITE_OCTOPUS_API_KEY;

export interface Property {
  id: number;
  moved_in_at: string;
  moved_out_at: string | null;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  town: string;
  county: string;
  postcode: string;
  electricity_meter_points: any[];
}

export interface AccountProperties {
  number: string;
  properties: Property[];
}

export const getAccountProperties = async (): Promise<AccountProperties> => {
  try {
    const response = await axios.get<AccountProperties>(
      `${OCTOPUS_API_BASE_URL}/v1/accounts/${ACCOUNT_NUMBER}/`,
      {
        headers: {
          'Authorization': `Basic ${btoa(API_KEY + ':')}`
        }
      }
    );
    console.log('Account Properties:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching account properties:', error);
    throw error;
  }
};

getAccountProperties()
  .then(data => {
    console.log('Properties retrieved successfully:');
    console.log(`Account Number: ${data.number}`);
    console.log('Properties:');
    data.properties.forEach((property, index) => {
      console.log(`Property ${index + 1}:`);
      console.log(`  ID: ${property.id}`);
      console.log(`  Address: ${property.address_line_1}, ${property.town}, ${property.postcode}`);
      console.log(`  Moved in at: ${property.moved_in_at}`);
      console.log(`  Electricity meter points: ${property.electricity_meter_points.length}`);
    });
  })
  .catch(error => {
    console.error('Failed to retrieve properties:', error);
  });