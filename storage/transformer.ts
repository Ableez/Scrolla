// utils/transforms.ts

import { LearningPathWithRelations } from "#/server/schema.types";

export function transformAndInsertPath(
  pathWithRelations: LearningPathWithRelations[]
) {
  const paths = pathWithRelations.map((path) => ({
    id: path.id,
    slug: path.slug,
    title: path.title,
    description: path.description,
    imageUrl: path.imageUrl,
    isEnrolled: path.isEnrolled,
    percentComplete: path.percentComplete,
    wasRecommended: path.wasRecommended,
    suggestedCourseSlug: path.suggestedCourseSlug,
    createdAt: path.createdAt,
    updatedAt: path.updatedAt,
  }));

  //   const courses = pathWithRelations.flatMap(
  //     (path) =>
  //       path.courses?.map((course) => ({
  //         id: course.id,
  //         levelId: course.levelId,
  //         title: course.title,
  //         slug: course.slug,
  //         imageUrl: course.imageUrl,
  //         percentComplete: course.percentComplete,
  //         isUpdated: course.isUpdated,
  //         desktopOnly: course.desktopOnly,
  //         retiringOn: course.retiringOn,
  //       })) ?? []
  //   );

  const levels = pathWithRelations.flatMap(
    (path) =>
      path.levels?.map((level) => ({
        id: level.id,
        pathId: path.id,
        number: level.number,
      })) ?? []
  );

  return {
    paths,
    levels,
  };
}
