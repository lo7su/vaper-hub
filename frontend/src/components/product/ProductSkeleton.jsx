import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

const ProductSkeleton = () => {
    return (
        <Card className="m-2">
            <CardHeader  floated={false} className=" h-40 m-1 mb-0 bg-gray-200 animate-pulse"><></></CardHeader>
            <CardBody>
                <div className="mb-2 flex items-center justify-between">
                    <div className="h-6 bg-gray-300 w-1/2 animate-pulse rounded"></div>
                    <div className="h-6 bg-gray-300 w-1/4 animate-pulse rounded"></div>
                </div>
                <div className="h-6 bg-gray-300 w-full animate-pulse rounded"></div>
            </CardBody>
            <CardFooter className="pt-0">
                <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none opacity-50 cursor-not-allowed animate-pulse" fullWidth={true} disabled>
                    Загрузка...
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductSkeleton;
