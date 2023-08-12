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
import { cn } from "utils";

interface Props extends Partial<IProject> {}

interface IStatus {
  status: "created" | "building" | "running" | "failed";
}

const Status = (props: IStatus) => {
  let className = "py-1 px-2 rounded inline capitalize";
  switch (props.status) {
    case "building":
      className = cn(className, "bg-yellow-600 text-black");
      break;
    case "running":
      className = cn(className, "bg-primary text-black");
      break;
    case "failed":
      className = cn(className, "bg-red-600 text-white");
      break;
    default:
      className = cn(className, "bg-blue-600 text-white");
      break;
  }
  return <div className={className}>{props.status}</div>;
};

const ProjectCard = (props: Props) => {
  return (
    <Link to={`/dashboard/project/${props._id}`}>
      <Card className="hover:scale-[98%] transition-all hover:bg-accent">
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
          <CardDescription>
            <Status status={props.status!} />
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ProjectCard;
