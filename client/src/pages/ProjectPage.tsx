import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "components/ui/button";

type Props = {};
type EnvField =
  | keyof IProjectForm
  | `env.${number}.key`
  | `env.${number}.value`;

const envSchema = z.object({
  key: z.string().nonempty({ message: "Key is required." }),
  value: z.string().nonempty({ message: "Value is required." }),
});

const formSchema = z.object({
  name: z.string().nonempty({ message: "Project Name is required." }),
  repository: z.string().nonempty({ message: "Repository is required." }),
  preBuildCommand: z
    .string()
    .nonempty({ message: "Pre build command is required" }),
  buildCommand: z.string().nonempty({ message: "Build command is required." }),
  startCommand: z.string().nonempty({ message: "Start command is required." }),
  env: z.array(envSchema),
});

const ProjectPage: React.FC = (props: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProjectForm>({
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray<IProjectForm>({
    control,
    name: "env",
  });

  const onSubmit: SubmitHandler<IProjectForm> = (data: IProjectForm) => {
    console.log(data);
  };

  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80">
      <Card className="w-[90%] lg:w-[60%]">
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Project Name</Label>
                <Input placeholder="Name" {...register("name")} />
                {errors.name && (
                  <p className="text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Repository Url</Label>
                <Input placeholder="Repository" {...register("repository")} />
                {errors.repository && (
                  <p className="text-red-600">{errors.repository.message}</p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Installation Script</Label>
                <Input
                  placeholder="Pre-build Command"
                  {...register("preBuildCommand")}
                />
                {errors.preBuildCommand && (
                  <p className="text-red-600">
                    {errors.preBuildCommand.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Build Script</Label>
                <Input
                  placeholder="Build Command"
                  {...register("buildCommand")}
                />
                {errors.buildCommand && (
                  <p className="text-red-600">{errors.buildCommand.message}</p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Run Script</Label>
                <Input
                  placeholder="Start Command"
                  {...register("startCommand")}
                />
                {errors.startCommand && (
                  <p className="text-red-600">{errors.startCommand.message}</p>
                )}
              </div>
            </div>

            <div className="text-xl flex gap-4 items-center">
              <h4>Environment Variables</h4>
              <Button
                variant="outline"
                className="bg-transparent border-primary rounded"
                type="button"
                onClick={() => append({ key: "", value: "" })}
              >
                <Plus />
              </Button>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex gap-4 items-center last:pb-6"
                  >
                    <Input
                      {...register(`env[${index}].key` as EnvField)}
                      placeholder="Key"
                      defaultValue={field.key}
                    />
                    <Input
                      {...register(`env[${index}].value` as EnvField)}
                      placeholder="Value"
                      defaultValue={field.value}
                    />

                    <Button variant="destructive" onClick={() => remove(index)}>
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-end lg:gap-4">
              <Button className="px-10" type="submit">
                Create
              </Button>
              <Button
                variant="outline"
                className="px-10 bg-transparent text-red-600 border-red-600"
                type="submit"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectPage;
