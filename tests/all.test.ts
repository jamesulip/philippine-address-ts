import { useAddress } from '../src/index';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useAddress', () => {
    let address: ReturnType<typeof useAddress>;

    beforeEach(() => {
        address = useAddress();
    });

    it('should fetch and return regions', async () => {
        const regions = [{ id: '1', name: 'Region 1' }];
        mockedAxios.get.mockResolvedValueOnce({ data: regions });

        const result = await address.getRegions();

        expect(result).toEqual(regions);
        expect(mockedAxios.get).toHaveBeenCalledWith('/json/regions.json');
    });

    it('should fetch and return provinces', async () => {
        const provinces = [{ id: '1', name: 'Province 1', region_id: '1' }];
        mockedAxios.get.mockResolvedValueOnce({ data: provinces });

        const result = await address.getProvinces();

        expect(result).toEqual(provinces);
        expect(mockedAxios.get).toHaveBeenCalledWith('/json/provinces.json');
    });

    it('should fetch and return municipalities', async () => {
        const municipalities = [{ id: '1', name: 'Municipality 1', province_id: '1' }];
        mockedAxios.get.mockResolvedValueOnce({ data: municipalities });

        const result = await address.getMunicipalities();

        expect(result).toEqual(municipalities);
        expect(mockedAxios.get).toHaveBeenCalledWith('/json/municipalities.json');
    });

    it('should find a region by id', async () => {
        const regions = [{ id: '1', name: 'Region 1' }];
        mockedAxios.get.mockResolvedValueOnce({ data: regions });

        const result = await address.findRegion('1');

        expect(result).toEqual(regions[0]);
    });

    it('should find a province by id', async () => {
        const provinces = [{ id: '1', name: 'Province 1', region_id: '1' }];
        mockedAxios.get.mockResolvedValueOnce({ data: provinces });

        const result = await address.findProvince('1');

        expect(result).toEqual(provinces[0]);
    });

    it('should find a municipality by id', async () => {
        const municipalities = [{ id: '1', name: 'Municipality 1', province_id: '1' }];
        mockedAxios.get.mockResolvedValueOnce({ data: municipalities });

        const result = await address.findMunicipality('1');

        expect(result).toEqual(municipalities[0]);
    });
    // getRegionMunicipalities
    it('should return municipalities of a region', async () => {
        const municipalities = [{ id: '1', name: 'Municipality 1', province_id: '1' }];
        mockedAxios.get.mockResolvedValueOnce({ data: municipalities });

        const result = await address.getRegionMunicipalities('1');

        expect(result).toEqual(municipalities);
    });
});