export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum NativeCountryName {
  USA = "USA",
  SPAIN = "SPAIN",
  ITALY = "ITALY",
  MOROCCO = "MOROCCO",
  CHINA = "CHINA",
}

export enum DestinationCountryName {
  FRANCE = "FRANCE",
  EGYPT = "EGYPT",
  JAPAN = "JAPAN",
  RUSSIA = "RUSSIA",
  TURKEY = "TURKEY",
}

export interface AgeRange {
  minAge: number;
  maxAge: number;
}

export enum FixedAgeRanges {
  "18_34" = "18_34",
  "35_50" = "35_50",
  "51_75" = "51_75",
  "+75" = "+75",
}

export interface Traveler {
  id: string;
  gender: Gender;
  nativeCountry: NativeCountryName;
  age: number;
}

export interface DestinationCountry {
  name: DestinationCountryName; // unique name
}

export interface Travel {
  traveler: Traveler;
  destinationCountry: DestinationCountry;
  date: Date;
}
