import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GetDimensionsResponse } from '@/types/templates.types';
import { Badge } from "@/components/ui/badge";

type UploadActionsProps = {
    templateName: string;
    onTemplateNameChange: (name: string) => void;
    onCreate: () => void;
    dimensions: GetDimensionsResponse
    templateType: string
};

function UploadActions({ templateName, onTemplateNameChange, onCreate, dimensions, templateType }: UploadActionsProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>
                    Template Details
                </CardTitle>
            </CardHeader>
            <CardContent className="flex h-full flex-col gap-4">
                <Input
                    type="text"
                    value={templateName}
                    onChange={(e) => onTemplateNameChange(e.target.value)}
                    placeholder="Enter template name"
                />
    
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span>Width</span>
                        <span>{dimensions.width}px</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Height</span>
                        <span>{dimensions.height}px</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Type</span>
                        <Badge>{templateType.replace("image/", "").toUpperCase()}</Badge>
                    </div>

                    <div className="flex justify-between">
                        <span>Aspect</span>
                        <span>{dimensions.width}:{dimensions.height}</span>
                    </div>
                </div>

                <Button className="mt-auto" onClick={onCreate}>Create Template</Button>
            </CardContent>
        </Card>
    ) 
}

export default UploadActions