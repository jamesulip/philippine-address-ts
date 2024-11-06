interface Region {
    id: string;
    name: string;
}
interface Province {
    id: string;
    name: string;
    region_id: string;
}
interface Municipality {
    id: string;
    name: string;
    province_id: string;
}
declare function useAddress(): {
    getRegions: () => Promise<Region[]>;
    getProvinces: () => Promise<Province[]>;
    getMunicipalities: () => Promise<Municipality[]>;
    findRegion: (regionId: string | number) => Promise<Region | undefined>;
    findProvince: (provinceId: string | number) => Promise<Province | undefined>;
    findMunicipality: (municipalityId: string | number) => Promise<Municipality | undefined>;
    searchRegions: (query: string) => Promise<Region[]>;
    searchProvinces: (query: string) => Promise<Province[]>;
    searchMunicipalities: (query: string) => Promise<Municipality[]>;
    getRegionByProvinceId: (provinceId: string | number) => Promise<Region | undefined>;
    getRegionByMunicipalityId: (municipalityId: string | number) => Promise<Region | undefined>;
    getProvinceByMunicipalityId: (municipalityId: string | number) => Promise<Province | undefined>;
    getRegionProvinces: (regionId: string | number) => Promise<Province[]>;
    getProvinceMunicipalities: (provinceId: string | number) => Promise<Municipality[]>;
};

export { useAddress };
