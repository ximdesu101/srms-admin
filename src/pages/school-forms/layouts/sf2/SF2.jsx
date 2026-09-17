import TemplatesSF2 from "./layout/TemplatesSF2"
import CardMetricsSF2 from "./layout/CardMetricsSF2"
import TableSF2 from "./layout/TableSF2"
const SF2 = () => {
    return (
        <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <TemplatesSF2 />
                <CardMetricsSF2 />
            </div>
            <TableSF2 />
        </div>
    )
}

export default SF2