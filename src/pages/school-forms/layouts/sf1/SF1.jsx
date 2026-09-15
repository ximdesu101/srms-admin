import CardMetricsSF1 from "./layout/CardMetricsSF1";
import Templates from "./layout/Templates";
import TableSF1 from "./layout/TableSF1";
const SF1 = () => {
    return (
        <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <Templates/>
                <CardMetricsSF1/>
            </div>
            <TableSF1/>
        </div>
    )
}

export default SF1