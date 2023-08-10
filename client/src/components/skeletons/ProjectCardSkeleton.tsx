import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";

type Props = {};

const ProjectCardSkeleton = (props: Props) => {
  return (
    <Card>
      <CardHeader className="space-y-6">
        <CardTitle>
          <Skeleton className="h-8 w-[100%]" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-[100%]" />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ProjectCardSkeleton;
