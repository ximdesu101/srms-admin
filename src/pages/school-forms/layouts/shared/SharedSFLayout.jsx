import SharedCardMetrics from "./SharedCardMetrics";
import SharedTemplates from "./SharedTemplates";
import SharedTable from "./SharedTable";

/**
 * Shared layout for all School Forms (SF1–SF10).
 * Matches the original SF1 UI structure with unique data per form.
 *
 * @param {{
 *   formCode: string,
 *   formName: string,
 *   schoolYear?: string,
 *   fileType?: string,
 *   description?: string,
 *   currentVersion?: string,
 *   lastUpdated?: string,
 *   versions?: Array<{ value: string, label: string }>,
 *   metrics: Array<{ key: string, title: string, value: string|number }>,
 *   files: Array<object>
 * }} props
 */
const SharedSFLayout = ({
    formCode,
    formName,
    schoolYear,
    fileType,
    description,
    currentVersion,
    lastUpdated,
    versions,
    metrics,
    files,
}) => {
    return (
        <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <SharedTemplates
                    formCode={formCode}
                    formName={formName}
                    schoolYear={schoolYear}
                    fileType={fileType}
                    description={description}
                    currentVersion={currentVersion}
                    lastUpdated={lastUpdated}
                    versions={versions}
                />
                <SharedCardMetrics metrics={metrics} />
            </div>
            <SharedTable
                formCode={formCode}
                formName={formName}
                files={files}
            />
        </div>
    );
};

export default SharedSFLayout;