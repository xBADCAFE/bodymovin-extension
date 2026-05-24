let _version: any;
const version_number = '4.8.0';

export function set(data: any): void {
  _version = data;
}

export function get(): string {
  return version_number;
}

export const bm_versionHelper = { set, get };
