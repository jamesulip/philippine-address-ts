import axios from 'axios';

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

export function useAddress() {
    let regions: Region[] = [];
    let provinces: Province[] = [];
    let municipalities: Municipality[] = [];

    async function initializeRegions(): Promise<Region[]> {
        if (regions.length === 0) {
            const { data } = await axios.get<Region[]>('http://localhost:8200/json/regions.json');
            regions = data;
            return data;
        }
        return regions;
    }

    async function initializeProvinces(): Promise<Province[]> {
        if (provinces.length === 0) {
            const { data } = await axios.get<Province[]>('http://localhost:8200/json/provinces.json');
            provinces = data;
            return data;
        }
        return provinces;
    }

    async function initializeMunicipalities(): Promise<Municipality[]> {
        if (municipalities.length === 0) {
            const { data } = await axios.get<Municipality[]>('http://localhost:8200/json/municipalities.json');
            municipalities = data;
            return data;
        }
        return municipalities;
    }

    async function getRegions(): Promise<Region[]> {
        return await initializeRegions();
    }

    async function getProvinces(): Promise<Province[]> {
        return await initializeProvinces();
    }

    async function getMunicipalities(): Promise<Municipality[]> {
        return await initializeMunicipalities();
    }

    async function findRegion(regionId: string | number): Promise<Region | undefined> {
        const regions = await getRegions();
        return regions.find(region => region.id === regionId);
    }

    async function findProvince(provinceId: string | number): Promise<Province | undefined> {
        const provinces = await getProvinces();
        return provinces.find(province => province.id === provinceId);
    }

    async function findMunicipality(municipalityId: string | number): Promise<Municipality | undefined> {
        const municipalities = await getMunicipalities();
        return municipalities.find(municipality => municipality.id === municipalityId);
    }

    async function searchRegions(query: string): Promise<Region[]> {
        const regions = await getRegions();
        return regions.filter(region => region.name.toLowerCase().includes(query.toLowerCase()));
    }

    async function searchProvinces(query: string): Promise<Province[]> {
        const provinces = await getProvinces();
        return provinces.filter(province => province.name.toLowerCase().includes(query.toLowerCase()));
    }

    async function searchMunicipalities(query: string): Promise<Municipality[]> {
        const municipalities = await getMunicipalities();
        return municipalities.filter(municipality => municipality.name.toLowerCase().includes(query.toLowerCase()));
    }

    async function getRegionByProvinceId(provinceId: string | number): Promise<Region | undefined> {
        const province = await findProvince(provinceId);
        return province ? findRegion(province.region_id) : undefined;
    }

    async function getRegionByMunicipalityId(municipalityId: string | number): Promise<Region | undefined> {
        const municipality = await findMunicipality(municipalityId);
        if (municipality) {
            const province = await findProvince(municipality.province_id);
            return province ? findRegion(province.region_id) : undefined;
        }
        return undefined;
    }

    async function getProvinceByMunicipalityId(municipalityId: string | number): Promise<Province | undefined> {
        const municipality = await findMunicipality(municipalityId);
        return municipality ? findProvince(municipality.province_id) : undefined;
    }

    async function getRegionProvinces(regionId: string | number): Promise<Province[]> {
        const provinces = await getProvinces();
        return provinces.filter(province => province.region_id === regionId);
    }

    async function getProvinceMunicipalities(provinceId: string | number): Promise<Municipality[]> {
        const municipalities = await getMunicipalities();
        return municipalities.filter(municipality => municipality.province_id === provinceId);
    }

    return {
        getRegions,
        getProvinces,
        getMunicipalities,
        findRegion,
        findProvince,
        findMunicipality,
        searchRegions,
        searchProvinces,
        searchMunicipalities,
        getRegionByProvinceId,
        getRegionByMunicipalityId,
        getProvinceByMunicipalityId,
        getRegionProvinces,
        getProvinceMunicipalities,
    };
}
