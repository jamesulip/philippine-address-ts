"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  useAddress: () => useAddress
});
module.exports = __toCommonJS(src_exports);
var import_axios = __toESM(require("axios"));
var regions = [];
var provinces = [];
var municipalities = [];
function useAddress() {
  async function initializeRegions() {
    if (regions.length === 0) {
      const { data } = await import_axios.default.get("/json/regions.json");
      regions = data;
    }
    return regions;
  }
  async function initializeProvinces() {
    if (provinces.length === 0) {
      const { data } = await import_axios.default.get("/json/provinces.json");
      provinces = data;
    }
    console.log({ provinces });
    return provinces;
  }
  async function initializeMunicipalities() {
    if (municipalities.length === 0) {
      const { data } = await import_axios.default.get("/json/municipalities.json");
      municipalities = data;
    }
    return municipalities;
  }
  async function getRegions() {
    return await initializeRegions();
  }
  async function getProvinces() {
    return await initializeProvinces();
  }
  async function getMunicipalities() {
    return await initializeMunicipalities();
  }
  async function findRegion(regionId) {
    const regions2 = await getRegions();
    return regions2.find((region) => region.id === regionId);
  }
  async function findProvince(provinceId) {
    const provinces2 = await getProvinces();
    return provinces2.find((province) => province.id === provinceId);
  }
  async function findMunicipality(municipalityId) {
    const municipalities2 = await getMunicipalities();
    return municipalities2.find((municipality) => municipality.id === municipalityId);
  }
  async function searchRegions(query) {
    const regions2 = await getRegions();
    return regions2.filter((region) => region.name.toLowerCase().includes(query.toLowerCase()));
  }
  async function searchProvinces(query) {
    const provinces2 = await getProvinces();
    return provinces2.filter((province) => province.name.toLowerCase().includes(query.toLowerCase()));
  }
  async function searchMunicipalities(query) {
    const municipalities2 = await getMunicipalities();
    return municipalities2.filter((municipality) => municipality.name.toLowerCase().includes(query.toLowerCase()));
  }
  async function getRegionByProvinceId(provinceId) {
    const province = await findProvince(provinceId);
    return province ? findRegion(province.region_id) : void 0;
  }
  async function getRegionByMunicipalityId(municipalityId) {
    const municipality = await findMunicipality(municipalityId);
    if (municipality) {
      const province = await findProvince(municipality.province_id);
      return province ? findRegion(province.region_id) : void 0;
    }
    return void 0;
  }
  async function getProvinceByMunicipalityId(municipalityId) {
    const municipality = await findMunicipality(municipalityId);
    return municipality ? findProvince(municipality.province_id) : void 0;
  }
  async function getRegionProvinces(regionId) {
    const provinces2 = await getProvinces();
    return provinces2.filter((province) => province.region_id === regionId);
  }
  async function getProvinceMunicipalities(provinceId) {
    const municipalities2 = await getMunicipalities();
    return municipalities2.filter((municipality) => municipality.province_id === provinceId);
  }
  async function getRegionMunicipalities(regionId) {
    const provinces2 = await getRegionProvinces(regionId);
    const municipalities2 = await getMunicipalities();
    return municipalities2.filter((municipality) => provinces2.some((province) => province.id === municipality.province_id));
  }
  return {
    provinces,
    regions,
    municipalities,
    getRegionMunicipalities,
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
    getProvinceMunicipalities
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useAddress
});
//# sourceMappingURL=index.js.map