import api from "@/lib/axios";

/**
 * Fetch template metadata for a school form (SF1–SF10).
 * Returns null if no template is uploaded yet (404).
 */
export const GetTemplate = async (formCode) => {
    try {
        const response = await api.get(
            `/admin/school-forms/${encodeURIComponent(formCode)}/template`
        );
        return response.data.template ?? null;
    } catch (err) {
        if (err.response?.status === 404) {
            return null;
        }
        throw err;
    }
};

/**
 * Upload or replace the official Excel template for a form.
 * @param {string} formCode
 * @param {File} file
 */
export const UploadTemplate = async (formCode, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(
        `/admin/school-forms/${encodeURIComponent(formCode)}/template`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
};

/**
 * Download URL for the current template (requires auth header when fetched as blob).
 */
export const getTemplateDownloadUrl = (formCode) =>
    `/admin/school-forms/${encodeURIComponent(formCode)}/template/download`;

/**
 * Download template as a blob (authenticated).
 */
export const DownloadTemplate = async (formCode) => {
    const response = await api.get(
        `/admin/school-forms/${encodeURIComponent(formCode)}/template/download`,
        { responseType: "blob" }
    );
    return response;
};

/**
 * Fetch styled preview data (values + formatting) for a form's template.
 * Used to render the spreadsheet in its original visual form.
 * @param {string} formCode
 */
export const GetTemplatePreview = async (formCode) => {
    const response = await api.get(
        `/admin/school-forms/${encodeURIComponent(formCode)}/template/preview`
    );
    return response.data;
};