
const SF7 = () => (
    <SFUploadPage
        code="SF7"
        title="School Personnel Data"
        description="Complete list of all teaching and non-teaching school personnel."
        purpose="SF7 is the official school staffing record. It lists all permanent, temporary, and contractual teaching and non-teaching personnel along with their positions, salary grades, specializations, and employment status. It is submitted to the Division Office annually."
        acceptedTypes={[".xlsx", ".xls", ".pdf", ".docx", ".doc"]}
        instructions={[
            "Include all personnel: teaching, non-teaching, permanent, and contractual.",
            "Verify all item numbers and salary grades before submitting.",
            "Update whenever there is a personnel movement (transfer, retirement, new hire).",
            "File must be signed by the school head.",
            "Submit at the start of the school year and whenever changes occur.",
        ]}
    />
);

export default SF7;
