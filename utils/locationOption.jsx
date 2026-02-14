import { useMemo } from "react";
 import { useState, useEffect } from "react";
import { divisionData } from '../data/districtData';

/**
 * Division Options
 */
export const useDivisionOptions = (citiesData) =>
  useMemo(() => {
    if (!citiesData?.division) return [];

    return citiesData.division.map((division) => ({
      value: division.name,
      label: division.name,
    }));
  }, [citiesData]);

/**
 * District Options (depends on selected division)
 */
export const useDistrictOptions = (citiesData, selectedDivision) =>
  useMemo(() => {
    if (!selectedDivision || !citiesData?.division) return [];

    const division = citiesData.division.find(
      (d) => d.name === selectedDivision.value
    );

    if (!division) return [];

    return division.districts.map((district) => ({
      value: district.name,
      label: district.name,
    }));
  }, [citiesData, selectedDivision]);


export const useDivisionDistricts = (divisionData) => {
  const [selectedDivision, setSelectedDivision] = useState(null);

  const divisionOptions = divisionData.map((div) => ({
    label: div.division,
    value: div.division,
  }));

  // Derive districtOptions from selectedDivision instead of storing in state
  const districtOptions = selectedDivision
    ? divisionData
        .find((div) => div.division === selectedDivision.value)
        ?.districts.map((d) => ({ label: d.district, value: d.district })) || []
    : [];

  return { selectedDivision, setSelectedDivision, divisionOptions, districtOptions };
};
