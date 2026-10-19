import { useState, useCallback } from "react";
import SharedCardMetrics from "./SharedCardMetrics";
import SharedTemplates from "./SharedTemplates";
import SharedTable from "./SharedTable";

/**
 * Shared layout for all School Forms (SF1–SF10).
 * Metrics:
 * - totalFiles  → live count of approved teacher submissions for this form
 * - lastUpdated → live last-updated date of the official template (blank if none)
 * - version     → kept from page props (not driven by submissions/template)
 */
const SharedSFLayout = ({
    formCode,
    formName,
    schoolYear,
    fileType,
    description,
    currentVersion,
    templateFileSize,
    lastUpdated,
    versions,
    metrics: initialMetrics,
}) => {
    const [approvedCount, setApprovedCount] = useState(null);
    // null = still loading template; false = loaded, no template; string = date value
    const [templateLastUpdated, setTemplateLastUpdated] = useState(null);
    const [templateLoaded, setTemplateLoaded] = useState(false);

    const handleCountChange = useCallback((count) => {
        setApprovedCount(count);
    }, []);

    const handleTemplateChange = useCallback((template) => {
        setTemplateLoaded(true);
        if (template?.updated_at || template?.last_updated) {
            setTemplateLastUpdated(
                template.updated_at || template.last_updated
            );
        } else {
            setTemplateLastUpdated(null);
        }
    }, []);

    const formatMetricDate = (value) => {
        if (!value) return null;
        try {
            const d = new Date(value);
            if (!Number.isNaN(d.getTime())) {
                return d.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                });
            }
        } catch {
            // ignore
        }
        return value;
    };

    const metrics = (initialMetrics || []).map((m) => {
        if (m.key === "totalFiles") {
            // Live approved-document count once loaded; show 0 when none
            if (approvedCount !== null) {
                return { ...m, value: approvedCount };
            }
            return { ...m, value: "…" };
        }

        if (m.key === "lastUpdated") {
            // Real template date only — never the static SF page fallback
            if (!templateLoaded) {
                return { ...m, value: "…" };
            }
            if (templateLastUpdated) {
                return {
                    ...m,
                    value: formatMetricDate(templateLastUpdated) || "—",
                };
            }
            return { ...m, value: "No template" };
        }

        // version (and any other keys) stay as provided by the SF page
        return m;
    });

    return (
        <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <SharedTemplates
                    formCode={formCode}
                    formName={formName}
                    schoolYear={schoolYear}
                    fileType={fileType}
                    description={description}
                    templateFileSize={templateFileSize}
                    currentVersion={currentVersion}
                    lastUpdated={lastUpdated}
                    versions={versions}
                    onTemplateChange={handleTemplateChange}
                />
                <SharedCardMetrics metrics={metrics} />
            </div>
            <SharedTable
                formCode={formCode}
                formName={formName}
                onCountChange={handleCountChange}
            />
        </div>
    );
};

export default SharedSFLayout;