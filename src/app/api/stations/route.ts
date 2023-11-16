import { NextRequest } from "next/server";
import {
    BASE_URL,
    FuelType,
    fuelTypes,
    PARAM_API_KEY,
    PARAM_FUEL_TYPE,
    PARAM_LATITUDE,
    PARAM_LONGITUDE,
    PARAM_RADIUS,
    PARAM_SORT,
} from "@/model/tankerkoenig";
import {
    createErrorResponse,
    createSuccessResponse,
    StatusCode,
} from "@/helper/response";
import { StationsResponse } from "@/model";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;

    const latitude = params.get(PARAM_LATITUDE);
    const longitude = params.get(PARAM_LONGITUDE);
    const radius = params.get(PARAM_RADIUS) || "10";
    const fuelType = (params.get(PARAM_FUEL_TYPE) as FuelType) || "all";

    if (!fuelTypes.includes(fuelType)) {
        return createErrorResponse(
            `Invalid value for parameter='${PARAM_FUEL_TYPE}'.`,
            StatusCode.BadRequest,
        );
    }

    if (!latitude || !latitude.trim() || !longitude || !longitude.trim()) {
        return createErrorResponse(
            "Missing or empty coordinates.",
            StatusCode.BadRequest,
        );
    }

    const url = new URL(BASE_URL);
    url.searchParams.append(PARAM_LATITUDE, latitude);
    url.searchParams.append(PARAM_LONGITUDE, longitude);
    url.searchParams.append(PARAM_RADIUS, radius);
    url.searchParams.append(PARAM_FUEL_TYPE, fuelType);
    url.searchParams.append(PARAM_SORT, "dist");
    url.searchParams.append(PARAM_API_KEY, process.env.TANKERKOENIG_API_KEY);

    try {
        const response = await fetch(url.toString(), {
            next: {
                revalidate: 60 * 5, // Cache same requests for 5 minutes
            },
        });

        const results: StationsResponse = await response.json();
        if (results.status === "error") {
            throw new Error(results.message);
        }

        return createSuccessResponse(results);
    } catch (e: any) {
        console.error(e?.message || JSON.stringify(e));
        return createErrorResponse("A error occurred.");
    }
}
