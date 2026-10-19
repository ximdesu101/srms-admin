import { useState, useCallback } from "react";
import SharedCardMetrics from "./SharedCardMetrics";
import SharedTemplates from "./SharedTemplates";
import SharedTable from "./SharedTable";

/**
 * Shared layout for all School Forms (SF1–SF10).
 * Matches the original SF1 UI structure with unique data per form.
 * Approved teacher-submitted documents are loaded dynamically for the form category.
 *
 * @param {{
 *   formCode: string,
 *   formName: string,
 *   schoolYear?: string,
 *   fileType?: string,
 *   description?: string,
 *   currentVersion?: string,
 *   lastUpdated?: string,
 *   templateFileSize?: string,
 *   versions?: Array<{ value: string, label: string }>,
 *   metrics?: Array<{ key: string, title: string, value: string|number }>,
 * }} props
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

    const handleCountChange = useCallback((count) => {
        setApprovedCount(count);
    }, []);

    const metrics = (initialMetrics || []).map((m) => {
        if (m.key === "totalFiles" && approvedCount !== null) {
            return { ...m, value: approvedCount };
        }
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
