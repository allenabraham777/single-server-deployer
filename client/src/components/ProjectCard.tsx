import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";
import { Link } from "react-router-dom";

interface Props extends Partial<IProject> {}

const ProjectCard = (props: Props) => {
  return (
    <Link to={`/dashboard/project/${props._id}`}>
      <Card>
        <CardHeader className="space-y-6">
          <CardTitle>{props.name}</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CardDescription className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {props.repository}
                </CardDescription>
              </TooltipTrigger>
              <TooltipContent>{props.repository}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ProjectCard;
