
const SF6 = () => (
    <SFUploadPage
        code="SF6"
        title="Summarized Report on Promotion and Level of Proficiency"
        description="School-wide consolidated summary of promotion, retention, and dropout data."
        purpose="SF6 is the school-level summary derived from all class-level SF5 records. It aggregates total enrolment, number promoted, retained, and dropped per grade level and presents school-wide promotion rates for submission to the Schools Division Office."
        acceptedTypes={[".xlsx", ".xls", ".pdf"]}
        instructions={[
            "Prepare SF6 only after all class-level SF5 records have been finalized.",
            "Figures must match the sum of all corresponding SF5 submissions.",
            "Include both male and female breakdowns for each category.",
            "Must be certified correct by the school head.",
            "Submit to the Division Office within the prescribed deadline.",
        ]}
    />
);

export default SF6;
