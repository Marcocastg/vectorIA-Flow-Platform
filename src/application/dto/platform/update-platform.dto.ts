import { PartialType } from "@nestjs/mapped-types";
import { createPlatformDto } from "./create-platform.dto";


export class updatePlatformDto extends PartialType(createPlatformDto){
}