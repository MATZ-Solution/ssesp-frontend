import { useMemo } from "react";

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
