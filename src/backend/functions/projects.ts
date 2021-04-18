/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Context } from 'aws-lambda';
import {
  routeMatcher,
  ApiRoute,
  Project,
  WbsNumber,
  ApiRouteFunction,
  exampleAllProjects,
  API_URL
} from 'utils';

// Fetch all projects
const getAllProjects: ApiRouteFunction = () => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exampleAllProjects)
  };
};

// Fetch the project for the specified WBS number
const getSingleProject: ApiRouteFunction = (params: { wbs: string }) => {
  const parseWbs: number[] = params.wbs.split('.').map((str) => parseInt(str));
  const parsedWbs: WbsNumber = {
    area: parseWbs[0],
    project: parseWbs[1],
    workPackage: parseWbs[2]
  };
  const requestedProject: Project | undefined = exampleAllProjects.find((prj: Project) => {
    return (
      prj.wbsNum.area === parsedWbs.area &&
      prj.wbsNum.project === parsedWbs.project &&
      prj.wbsNum.workPackage === parsedWbs.workPackage
    );
  });
  if (requestedProject === undefined) {
    return { statusCode: 404, body: 'Could not find the requested project.' };
  }
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestedProject)
  };
};

const routes: ApiRoute[] = [
  {
    path: `${API_URL}/projects`,
    httpMethod: 'GET',
    func: getAllProjects
  },
  {
    path: `${API_URL}/projects/:wbs`,
    httpMethod: 'GET',
    func: getSingleProject
  }
];

export async function handler(event: any, context: Context) {
  try {
    return routeMatcher(routes, event, context);
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}
