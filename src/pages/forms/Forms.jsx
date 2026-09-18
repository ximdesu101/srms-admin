import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs";
import SchoolForms from "./school-forms/SchoolForms";

const Forms = () => {
    return (
        <Tabs defaultValue="school-forms">
            <TabsList className="w-full">
                <TabsTrigger 
                    value="school-forms"
                    className="data-[state=active]:bg-[#3e963f] data-[state=active]:text-white"
                >
                    School Forms
                </TabsTrigger>
                <TabsTrigger 
                    value="admin-forms"
                    className="data-[state=active]:bg-[#3e963f] data-[state=active]:text-white"
                >
                    Administrative Forms
                </TabsTrigger>
            </TabsList>

            <TabsContent value="school-forms">
                <SchoolForms />
            </TabsContent>
        </Tabs>
    )
}

export default Forms