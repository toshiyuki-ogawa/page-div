import Papa from 'papaparse'
import addressSample from './default-address.txt?raw'

/**
 * get address list
 */
export function getDefaultAddressList(): string[][] {
  const csv = Papa.parse<string[]>(addressSample, {
    skipEmptyLines: true
  })
  return csv.data
}

// vi: se ts=2 sw=2 et:
