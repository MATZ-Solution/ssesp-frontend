import { useMemo } from 'react';

/**
 * Province options
 */
export const useProvinceOptions = (citiesData) =>
  useMemo(() => {
    return citiesData?.provinces?.map((province) => ({
      value: province.name,
      label: province.name,
    })) || [];
  }, [citiesData]);

/**
 * District options (depends on province)
 */
export const useDistrictOptions = (citiesData, selectedProvince) =>
  useMemo(() => {
    if (!selectedProvince) return [];

    const province = citiesData.provinces.find(
      (p) => p.name === selectedProvince.value
    );
    if (!province) return [];

    return province.districts.map((district) => ({
      value: district.name,
      label: district.name,
    }));
  }, [citiesData, selectedProvince]);

/**
 * City options (depends on province + district)
 */
export const useCityOptions = (
  citiesData,
  selectedProvince,
  selectedDistrict
) =>
  useMemo(() => {
    if (!selectedProvince || !selectedDistrict) return [];

    const province = citiesData.provinces.find(
      (p) => p.name === selectedProvince.value
    );
    if (!province) return [];

    const district = province.districts.find(
      (d) => d.name === selectedDistrict.value
    );
    if (!district) return [];

    return district.cities.map((city) => ({
      value: city,
      label: city,
    }));
  }, [citiesData, selectedProvince, selectedDistrict]);
