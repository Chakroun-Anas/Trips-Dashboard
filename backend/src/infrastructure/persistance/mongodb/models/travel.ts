import {
  createSchema,
  Type,
  typedModel,
  ExtractDoc,
  ExtractProps,
} from "ts-mongoose";
import {
  NativeCountryName,
  DestinationCountryName,
  Gender,
} from "./../../../../domain/entities/index";

const genders = [...Object.keys(Gender)] as const;
const nativeCountries = [...Object.keys(NativeCountryName)] as const;
const destinationCountries = [...Object.keys(DestinationCountryName)] as const;

const TravelerSchema = createSchema({
  gender: Type.string({ required: true, enum: genders }),
  nativeCountry: Type.string({ required: true, enum: nativeCountries }),
  age: Type.number({ required: true }),
});
const TravelSchema = createSchema({
  traveler: Type.schema({ required: true }).of(TravelerSchema),
  destinationCountry: Type.string({
    required: true,
    enum: destinationCountries,
  }),
  date: Type.date({ required: true }),
});

export const TravelModel = typedModel("Travel", TravelSchema);
export type TravelDoc = ExtractDoc<typeof TravelerSchema>;
export type TravelProps = ExtractProps<typeof TravelerSchema>;
