export enum StatusCode {
    Ok = 200,
    BadRequest = 400,
    InternalError = 500,
}

export const createErrorResponse = (
    message: string,
    status = StatusCode.InternalError,
): Response => Response.json({ error: message }, { status });

export const createSuccessResponse = (result: any): Response =>
    Response.json(result, { status: StatusCode.Ok });
