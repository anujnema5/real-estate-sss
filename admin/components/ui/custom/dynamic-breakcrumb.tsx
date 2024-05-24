import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import '@/utils/custom-prototypes'

const DashboardBreakcrumb = ({ params }: { params: string }) => {
    const pathnameArr = params.split('/');
    let dynamicRoutes = params[0];

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathnameArr?.map((path: string, index) => {
                    const lastIndex = pathnameArr.length - 1 === index;
                    dynamicRoutes += `/${path}`;
                    if (path) {
                        return (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href={`http://localhost:3000/${dynamicRoutes}`}
                                        className=""
                                        >
                                        {path.firstLetterCapital()}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {!lastIndex && <BreadcrumbSeparator />}
                            </>
                        )
                    }
                })}
            </BreadcrumbList>
        </Breadcrumb>

    )
}

export default DashboardBreakcrumb