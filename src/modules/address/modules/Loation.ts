export type Location = {
  id: number;
  name: string;
  type: LocationType;
  code: string;
  parentCode: string;
};

export type LocationType = "city" | "district" | "town" | "ward" | "commune";
