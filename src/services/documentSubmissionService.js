import api from "@/lib/axios";

export const GetDocumentSubmissions = async ({ page = 1, search = "", status = "All" } = {}) => {
    const response = await api.get("/admin/document-submissions", {
        params: { page, search, status },
    });
    return response.data;
};

export const GetDocumentSubmissionMetrics = async () => {
    const response = await api.get("/admin/document-submissions/metrics");
    return response.data;
};

export const GetDocumentSubmission = async (id) => {
    const response = await api.get(`/admin/document-submissions/${id}`);
    return response.data;
};

export const ApproveDocumentSubmission = async (id) => {
    const response = await api.post(`/admin/document-submissions/${id}/approve`);
    return response.data;
};

export const RequestRevision = async (id, revisionNote) => {
    const response = await api.post(`/admin/document-submissions/${id}/request-revision`, {
        revisionNote,
    });
    return response.data;
};

export const DownloadDocumentSubmission = (id) => {
    return `/api/admin/document-submissions/${id}/download`;
};