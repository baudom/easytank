import { NextRequest } from "next/server";
import {
    BASE_URL,
    NominatimLocation,
    PARAM_FORMAT,
    PARAM_FORMAT_TYPE,
    PARAM_SEARCH,
} from "@/model/nominatim";
import {
    createErrorResponse,
    createSuccessResponse,
    StatusCode,
} from "@/helper/response";

/**
 * Usage Policy: https://operations.osmfoundation.org/policies/nominatim
 * Copyright: https://www.openstreetmap.org/copyright
 */

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;

    const requestedLocation = params.get(PARAM_SEARCH);
    if (!requestedLocation || !requestedLocation.trim()) {
        return createErrorResponse(
            "Missing or empty location.",
            StatusCode.BadRequest,
        );
    }

    const url = new URL(BASE_URL);
    url.searchParams.append(PARAM_FORMAT, PARAM_FORMAT_TYPE);

    // Query only places in DE since tankerkoenig only supports germany places
    url.searchParams.append(PARAM_SEARCH, requestedLocation);

    try {
        const response = await fetch(url.toString(), {
            headers: { "User-Agent": process.env.NOMINATIM_USER_AGENT },
            next: {
                revalidate: 60 * 60 * 24 * 2, // Cache same requests for 48 hours
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching location='${requestedLocation}'`);
        }

        // TODO: Include only type=village?
        const results: NominatimLocation[] = await response.json();
        return createSuccessResponse(results.map(toMinified));
    } catch (e: any) {
        console.error(e?.message || JSON.stringify(e));
        return createErrorResponse("A error occurred.");
    }
}

const toMinified = ({
    licence,
    lat,
    lon,
    name,
    display_name,
}: NominatimLocation) => ({
    licence,
    lat,
    lon,
    name,
    display_name,
});
