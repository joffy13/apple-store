import { ApiProperty } from "@nestjs/swagger";
import { ErrorResultType } from "./error-result.type";

export abstract class AllResultType<T> {
    @ApiProperty()
    error: ErrorResultType
    @ApiProperty()
    success: boolean
    @ApiProperty()
    res: T | null
}