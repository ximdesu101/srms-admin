import CardMetrics from "./layout/CardMetrics";
import RequestTable from "./layout/RequestTable";
const DocumentRequest = () => {
    return (
        <div className="grid grid-cols-1 gap-4">
            <CardMetrics />
            <RequestTable/>
        </div>
    )
}

export default DocumentRequest