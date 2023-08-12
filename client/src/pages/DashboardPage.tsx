import ProjectCard from "components/ProjectCard";
import ProjectCardSkeleton from "components/skeletons/ProjectCardSkeleton";
import { Skeleton } from "components/ui/skeleton";
import { getAllProjects } from "helpers/api/project";
import { useEffect, useState } from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  const [projects, setProjects] = useState<Partial<IProject>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const data = await getAllProjects();
    setTimeout(() => setLoading(false), 1000);
    setProjects(data.projects);
  };

  return (
    <div className="pt-20 px-8">
      <div className="text-3xl mb-8">Projects</div>
      <div className="grid grid-cols-4 gap-4">
        {loading
          ? Array(12)
              .fill(0)
              .map((_) => <ProjectCardSkeleton />)
          : projects.map((project) => <ProjectCard {...project} />)}
      </div>
      {loading && (
        <div className="mt-8 space-y-8">
          <Skeleton className="h-4 w-[100%]" />
          <Skeleton className="h-4 w-[100%]" />
          <Skeleton className="h-4 w-[100%]" />
          <Skeleton className="h-4 w-[100%]" />
          <Skeleton className="h-4 w-[100%]" />
          <Skeleton className="h-4 w-[100%]" />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
